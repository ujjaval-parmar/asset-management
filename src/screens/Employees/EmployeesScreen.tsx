import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Users, Plus } from 'lucide-react-native';
import firestore from '@react-native-firebase/firestore';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { ListItem } from '../../components/ListItem/ListItem';
import { colors } from '../../constants/theme';
import { getRelativeVerificationTime } from '../../utils/dateUtils';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export const EmployeesScreen = ({ navigation, route }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (route.params?.initialFilter) {
      setStatusFilter(route.params.initialFilter);
    }
  }, [route.params?.initialFilter]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('employees')
      .onSnapshot((querySnapshot) => {
        const empList: any[] = [];
        if (querySnapshot) {
          querySnapshot.forEach(documentSnapshot => {
            empList.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
        }
        setEmployees(empList);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching employees: ", error);
        setLoading(false);
      });

    const unsubscribeAssignments = firestore()
      .collection('assignments')
      .where('status', '==', 'active')
      .onSnapshot((snap) => {
        if (snap && !snap.empty) {
          setAssignments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setAssignments([]);
        }
      });

    const unsubscribeAssets = firestore()
      .collection('assets')
      .onSnapshot((snap) => {
        if (snap) {
          setAssets(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      });

    return () => {
      unsubscribe();
      unsubscribeAssignments();
      unsubscribeAssets();
    };
  }, []);

  const filteredEmployees = employees.filter(emp => {
    const query = searchQuery.toLowerCase().trim();
    const nameMatch = (emp.name || '').toLowerCase().includes(query);
    const emailMatch = (emp.email || '').toLowerCase().includes(query);
    
    if (!nameMatch && !emailMatch) return false;

    // Status Filter
    const cleanFilter = statusFilter.toLowerCase();
    if (cleanFilter === 'all') return true;
    return (emp.status || '').toLowerCase() === cleanFilter;
  });

  const renderItem = ({ item }: { item: any }) => {
    const joined = item.joiningDate?.toDate ? item.joiningDate.toDate().toLocaleDateString() : (item.joiningDate || 'N/A');
    const designation = item.designation || 'No Designation';

    // Verification Logic
    const employeeAssignments = assignments.filter(a => a.employeeId === item.id);
    const assignedAssetIds = employeeAssignments.map(a => a.assetId);
    const employeeAssets = assets.filter(a => assignedAssetIds.includes(a.id));
    
    const totalAssets = employeeAssets.length;
    let verifiedCount = 0;
    
    employeeAssets.forEach(asset => {
      const v = getRelativeVerificationTime(asset.lastCheckedDate);
      if (!v.needsVerification) {
        verifiedCount++;
      }
    });

    let verificationText = '';
    let isWarning = false;

    if (totalAssets > 0) {
      if (verifiedCount === totalAssets) {
        verificationText = `All ${totalAssets} Verified`;
      } else {
        verificationText = `${verifiedCount}/${totalAssets} Verified`;
        isWarning = true;
      }
    } else {
      verificationText = 'No Assets assigned';
    }

    return (
      <ListItem
        title={item.name || 'Unknown'}
        subtitle={[
          `Role: ${designation}`,
          `Joined: ${joined}`
        ]}
        rightElement={
          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <View style={[styles.statusBadge, item.status === 'Active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{item.status || 'Active'}</Text>
            </View>
            <Text style={{ 
              fontSize: 10, 
              marginTop: 4, 
              fontWeight: 'bold', 
              color: isWarning ? colors.error : (totalAssets > 0 ? colors.primary : colors.textLight) 
            }}>
              {verificationText.toUpperCase()}
            </Text>
          </View>
        }
        onPress={() => navigation.navigate('EmployeeDetails', { employeeId: item.id })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Employee Directory</Text>
        <Input
          placeholder="Search employees..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={{ marginBottom: 12 }}
        />

       <View>
         <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContentContainer}
        >
          {[
            { label: 'All', count: employees.length },
            { label: 'Active', count: employees.filter(e => (e.status || '').toLowerCase() === 'active').length },
            { label: 'Inactive', count: employees.filter(e => (e.status || '').toLowerCase() === 'inactive').length },
          ].map((item) => (
            <TouchableOpacity 
              key={item.label}
              style={[styles.chip, statusFilter === item.label && styles.chipSelected]}
              onPress={() => setStatusFilter(item.label)}
            >
              <Text style={[styles.chipText, statusFilter === item.label && styles.chipTextSelected]}>
                {item.label} ({item.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
       </View>

        <View style={styles.statsRow}>
          <Card style={styles.statsCard}>
            <Text style={styles.statsValue}>{employees.length}</Text>
            <Text style={styles.statsLabel}>Total</Text>
          </Card>
          <Card style={[styles.statsCard, { borderColor: colors.success + '40', borderWidth: 1 }]}>
            <Text style={[styles.statsValue, { color: colors.success }]}>{employees.filter(e => e.status === 'Active').length}</Text>
            <Text style={styles.statsLabel}>Active</Text>
          </Card>
          <Card style={[styles.statsCard, { borderColor: colors.error + '40', borderWidth: 1 }]}>
            <Text style={[styles.statsValue, { color: colors.error }]}>{employees.filter(e => e.status === 'Inactive' || e.status === 'Resigned').length}</Text>
            <Text style={styles.statsLabel}>Inactive</Text>
          </Card>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={filteredEmployees}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={{ flex: 1 }}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Users size={48} color={colors.border} />
                <Text style={styles.emptyTitle}>No Employees Found</Text>
                <Text style={styles.emptyText}>
                  No employees match "{searchQuery}". Try searching by a different name.
                </Text>
              </View>
            }
          />
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddEditEmployee')}
        >
          <Plus size={30} color={colors.surface} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
