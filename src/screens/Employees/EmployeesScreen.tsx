import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input } from '../../components/Input/Input';
import { ListItem } from '../../components/ListItem/ListItem';
import { colors } from '../../constants/theme';
import { styles } from './styles';

export const EmployeesScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState<any[]>([]);
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

    return () => unsubscribe();
  }, []);

  const filteredEmployees = employees.filter(emp =>
    (emp.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => {
    const joined = item.joiningDate?.toDate ? item.joiningDate.toDate().toLocaleDateString() : (item.joiningDate || 'N/A');
    const designation = item.designation || 'No Designation';

    return (
      <ListItem
        title={item.name || 'Unknown'}
        subtitle={`Role: ${designation}\nJoined: ${joined}`}
        rightElement={
          <View style={[styles.statusBadge, item.status === 'Active' ? styles.statusActive : styles.statusInactive]}>
            <Text style={styles.statusText}>{item.status || 'Active'}</Text>
          </View>
        }
        onPress={() => navigation.navigate('EmployeeDetails', { employeeId: item.id })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Input
          placeholder="Search employees..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={filteredEmployees}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddEditEmployee')}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
