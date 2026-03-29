import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import { colors } from '../../constants/theme';
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
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{summaryData.totalEmployees}</Text>
            <Text style={styles.summaryLabel}>Employees</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{summaryData.totalAssets}</Text>
            <Text style={styles.summaryLabel}>Total Assets</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{summaryData.assignedAssets}</Text>
            <Text style={styles.summaryLabel}>Assigned</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{summaryData.availableAssets}</Text>
            <Text style={styles.summaryLabel}>Available</Text>
          </Card>
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
                subtitle={`Assigned: ${activity.date?.toDate ? activity.date.toDate().toLocaleDateString() : (activity.date || 'N/A')}`}
                onPress={() => navigation.navigate('EmployeeDetails', { employeeId: activity.employeeId })}
              />
            ))
          )}
        </View>

        {/* Insights */}
        <Text style={styles.sectionTitle}>Insights</Text>
        <Card style={styles.insightCard}>
          <View style={styles.insightRow}>
            <Text style={styles.insightLabel}>Assets in Repair:</Text>
            <Text style={styles.insightValueError}>{insights.repair}</Text>
          </View>
          <View style={[styles.insightRow, styles.lastInsightRow]}>
            <Text style={styles.insightLabel}>Lost Assets:</Text>
            <Text style={styles.insightValueWarning}>{insights.lost}</Text>
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
};
