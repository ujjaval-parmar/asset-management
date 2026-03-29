import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import { colors } from '../../constants/theme';
import { styles } from './styles';

export const AssetDetailsScreen = ({ navigation, route }: any) => {
  const { assetId } = route.params;
  
  const [asset, setAsset] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!assetId) return;

    // Listen to changes for the specific asset
    const unsubscribeAsset = firestore()
      .collection('assets')
      .doc(assetId)
      .onSnapshot(doc => {
        if (doc && doc.data()) {
          setAsset({ id: doc.id, ...doc.data() });
        }
      });

    // Listen to this asset's assignment history
    const unsubscribeAssignments = firestore()
      .collection('assignments')
      .where('assetId', '==', assetId)
      .onSnapshot(async (assignmentSnapshot) => {
        if (assignmentSnapshot && !assignmentSnapshot.empty) {
          const assignmentsPromises = assignmentSnapshot.docs.map(async (assignDoc) => {
            const assignmentData = assignDoc.data();
            let empName = assignmentData.employeeName || 'Unknown';
            
            // Optionally try to fetch the employee's fresh name if it has an ID
            if (assignmentData.employeeId) {
              try {
                const empDoc = await firestore().collection('employees').doc(assignmentData.employeeId).get();
                if (empDoc && empDoc.data() && empDoc.data()?.name) {
                  empName = empDoc.data()?.name;
                }
              } catch (e) {}
            }

            return {
              id: assignDoc.id,
              employeeName: empName,
              assignedDate: assignmentData.assignedDate,
              returnedDate: assignmentData.returnedDate,
              status: assignmentData.status,
            };
          });

          const resolvedHistory = await Promise.all(assignmentsPromises);
          // Sort historically (newest first assuming dates are firestore timestamps)
          resolvedHistory.sort((a, b) => {
            const dateA = a.assignedDate?.seconds || 0;
            const dateB = b.assignedDate?.seconds || 0;
            return dateB - dateA; // Descending
          });
          setHistory(resolvedHistory);
        } else {
          setHistory([]);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching assignments:", error);
        setLoading(false);
      });

    return () => {
      unsubscribeAsset();
      unsubscribeAssignments();
    };
  }, [assetId]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'good': return { bg: { backgroundColor: '#E8F5E9' }, text: '#2E7D32' };
      case 'bad': return { bg: { backgroundColor: '#FFEBEE' }, text: '#C62828' };
      case 'repair': return { bg: { backgroundColor: '#FFF3E0' }, text: '#EF6C00' };
      case 'lost': return { bg: { backgroundColor: '#EEEEEE' }, text: '#616161' };
      default: return { bg: { backgroundColor: '#E8F5E9' }, text: '#2E7D32' };
    }
  };

  const formatDate = (dateValue: any) => {
    if (!dateValue) return 'N/A';
    if (typeof dateValue.toDate === 'function') {
      return dateValue.toDate().toLocaleDateString();
    }
    return String(dateValue);
  };

  if (loading || !asset) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  const { bg, text } = getStatusColor(asset.status);
  const model = asset.properties?.brandModel || asset.properties?.accessoryType || 'Unknown Model';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< "}Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Asset Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddEditAsset', { assetId: asset.id })}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Main Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.assetTag}>{asset.assetTag || 'NO-TAG'}</Text>
              <Text style={styles.assetType}>
                {(asset.type || 'Unknown').toUpperCase()} • {asset.isAvailable ? 'Available' : 'Assigned'}
              </Text>
            </View>
            <View style={[styles.statusBadge, bg]}>
              <Text style={[styles.statusText, { color: text }]}>{asset.status || 'Good'}</Text>
            </View>
          </View>
        </Card>

        {/* Action Button */}
        {asset.isAvailable ? (
          <Button 
            title="Assign Asset" 
            style={styles.actionButton}
            onPress={() => {}}
          />
        ) : (
          <Button 
            title="Return Asset" 
            variant="outline" 
            style={styles.actionButton}
            onPress={() => {}}
          />
        )}

        {/* Properties Section */}
        <Text style={styles.sectionTitle}>Specifications</Text>
        <Card style={styles.infoCard}>
          <View style={styles.propertyRow}>
            <Text style={styles.propertyLabel}>Model</Text>
            <Text style={styles.propertyValue}>{model}</Text>
          </View>
          {asset.properties?.serialNumber && (
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>Serial Number</Text>
              <Text style={styles.propertyValue}>{asset.properties.serialNumber}</Text>
            </View>
          )}
          {asset.properties?.imei1 && (
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>IMEI 1</Text>
              <Text style={styles.propertyValue}>{asset.properties.imei1}</Text>
            </View>
          )}
          {asset.properties?.imei2 && (
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>IMEI 2</Text>
              <Text style={styles.propertyValue}>{asset.properties.imei2}</Text>
            </View>
          )}
          {asset.properties?.simNumber && (
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>SIM Number</Text>
              <Text style={styles.propertyValue}>{asset.properties.simNumber}</Text>
            </View>
          )}
          <View style={[styles.propertyRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.propertyLabel}>Ownership</Text>
            <Text style={styles.propertyValue}>{(asset.ownership || 'Company').toUpperCase()}</Text>
          </View>
        </Card>

        {/* Assignment History */}
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Assignment History ({history.length})</Text>
          
          {history.length === 0 ? (
            <Text style={{ color: colors.textLight, marginTop: 8 }}>No assignment history found.</Text>
          ) : (
            history.map((record) => (
              <ListItem
                key={record.id}
                title={`Assigned to ${record.employeeName}`}
                subtitle={`From: ${formatDate(record.assignedDate)} ${record.returnedDate ? `• To: ${formatDate(record.returnedDate)}` : '• Active'}`}
                style={styles.historyItem}
              />
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
