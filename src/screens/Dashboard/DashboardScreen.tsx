import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import { colors, spacing } from '../../constants/theme';
import { styles } from './styles';

export const DashboardScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({
    totalEmployees: 0,
    totalAssets: 0,
    assignedAssets: 0,
    availableAssets: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [insights, setInsights] = useState({ repair: 0, lost: 0 });
  const [availableStock, setAvailableStock] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // We can use Promise.all to load initial data counts
    const loadDashboardData = async () => {
      try {
        const empSnap = await firestore().collection('employees').get();
        const assetsSnap = await firestore().collection('assets').get();
        const assignsSnap = await firestore().collection('assignments').get();

        const totalEmployees = empSnap.size;
        const totalAssets = assetsSnap.size;
        const assignedAssets = assignsSnap.size;
        
        let repairCount = 0;
        let lostCount = 0;

        // Optionally, check asset statuses
        assetsSnap.forEach(doc => {
          const status = doc.data().status;
          if (status === 'Repair') repairCount++;
          if (status === 'Lost') lostCount++;
        });

        setSummaryData({
          totalEmployees,
          totalAssets,
          assignedAssets,
          availableAssets: totalAssets - assignedAssets,
        });

        setInsights({ repair: repairCount, lost: lostCount });

        // Calculate Available Stock by Type
        const stock: { [key: string]: number } = {};
        assetsSnap.forEach(doc => {
          const data = doc.data();
          if (data.isAvailable) {
            const type = (data.type || 'Other').toLowerCase();
            const category = (data.category || '').toLowerCase();
            
            // Normalize names for better display
            let group = type.charAt(0).toUpperCase() + type.slice(1);
            if (group === 'Hardware') group = 'Equipment';
            
            stock[group] = (stock[group] || 0) + 1;
          }
        });
        setAvailableStock(stock);

        // Load recent activity
        const recentSnap = await firestore()
          .collection('assignments')
          .orderBy('assignedDate', 'desc')
          .limit(5)
          .get();
        
        const activitiesPromises = recentSnap.docs.map(async (doc) => {
          const data = doc.data();
          const empDoc = await firestore().collection('employees').doc(data.employeeId).get();
          const assetDoc = await firestore().collection('assets').doc(data.assetId).get();
          
          return {
            id: doc.id,
            employee: empDoc && empDoc.data() ? empDoc.data()?.name : 'Unknown Employee',
            asset: assetDoc && assetDoc.data() ? (assetDoc.data()?.assetTag || 'Unknown Asset') : 'Unknown Asset',
            date: data.assignedDate,
            employeeId: data.employeeId,
          };
        });

        const activities = await Promise.all(activitiesPromises);
        setRecentActivity(activities);

      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      loadDashboardData();
    });

    loadDashboardData(); // Initial load
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Dashboard</Text>

        {/* Summary Details */}
        <View style={styles.summaryGrid}>
          <TouchableOpacity 
            style={styles.summaryCard} 
            onPress={() => navigation.navigate('Employees', { initialFilter: 'All' })}
          >
            <Card style={{ alignItems: 'center', width: '100%' }}>
              <Text style={styles.summaryValue}>{summaryData.totalEmployees}</Text>
              <Text style={styles.summaryLabel}>Employees</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.summaryCard}
            onPress={() => navigation.navigate('Assets', { initialFilter: 'All' })}
          >
            <Card style={{ alignItems: 'center', width: '100%' }}>
              <Text style={styles.summaryValue}>{summaryData.totalAssets}</Text>
              <Text style={styles.summaryLabel}>Total Assets</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.summaryCard}
            onPress={() => navigation.navigate('Assets', { initialFilter: 'Assigned' })}
          >
            <Card style={{ alignItems: 'center', width: '100%' }}>
              <Text style={styles.summaryValue}>{summaryData.assignedAssets}</Text>
              <Text style={styles.summaryLabel}>Assigned</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.summaryCard}
            onPress={() => navigation.navigate('Assets', { initialFilter: 'Available' })}
          >
            <Card style={{ alignItems: 'center', width: '100%' }}>
              <Text style={styles.summaryValue}>{summaryData.availableAssets}</Text>
              <Text style={styles.summaryLabel}>Available</Text>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <Button 
            title="Add Employee" 
            onPress={() => navigation.navigate('AddEditEmployee')}
            style={styles.actionButton}
          />
          <Button 
            title="Add Asset" 
            variant="secondary"
            onPress={() => navigation.navigate('AddEditAsset')}
            style={styles.actionButton}
          />
        </View>

        {/* Available Stock Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.m }}>
          <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Available Stock</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Assets', { initialFilter: 'Available' })}>
            <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '600' }}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginBottom: spacing.l }}
          contentContainerStyle={{ paddingVertical: 4 }}
        >
          {Object.keys(availableStock).length === 0 ? (
            <Card style={{ minWidth: 150, padding: spacing.m, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.textLight, fontSize: 13 }}>No Stock Available</Text>
            </Card>
          ) : (
            Object.entries(availableStock)
              .sort((a, b) => b[1] - a[1]) // Sort by count desc
              .map(([type, count]) => (
              <TouchableOpacity 
                key={type} 
                onPress={() => navigation.navigate('Assets', { initialFilter: 'Available', searchQuery: type })}
              >
                <Card style={{ minWidth: 110, marginRight: spacing.m, alignItems: 'center', paddingVertical: spacing.m }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>{count}</Text>
                  <Text style={{ fontSize: 12, color: colors.textLight, marginTop: 4, fontWeight: '600' }}>{type}</Text>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {recentActivity.length === 0 ? (
            <Text style={{ color: colors.textLight }}>No recent activities found.</Text>
          ) : (
            recentActivity.map((activity) => (
              <ListItem
                key={activity.id}
                title={`${activity.employee} - ${activity.asset}`}
                subtitle={[`Assigned: ${activity.date?.toDate ? activity.date.toDate().toLocaleDateString() : (activity.date || 'N/A')}`]}
                onPress={() => navigation.navigate('EmployeeDetails', { employeeId: activity.employeeId })}
              />
            ))
          )}
        </View>

        {/* Insights */}
        <Text style={styles.sectionTitle}>Insights</Text>
        <Card style={styles.insightCard}>
          <TouchableOpacity 
            style={styles.insightRow}
            onPress={() => navigation.navigate('Assets', { initialFilter: 'Repair' })}
            disabled={insights.repair === 0}
            activeOpacity={insights.repair === 0 ? 1 : 0.7}
          >
            <Text style={styles.insightLabel}>Assets in Repair:</Text>
            <Text style={styles.insightValueError}>{insights.repair}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.insightRow, styles.lastInsightRow]}
            onPress={() => navigation.navigate('Assets', { initialFilter: 'Lost' })}
            disabled={insights.lost === 0}
            activeOpacity={insights.lost === 0 ? 1 : 0.7}
          >
            <Text style={styles.insightLabel}>Lost Assets:</Text>
            <Text style={styles.insightValueWarning}>{insights.lost}</Text>
          </TouchableOpacity>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
};
