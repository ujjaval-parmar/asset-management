import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Modal, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { colors } from '../../constants/theme';
import { styles } from './styles';

export const EmployeeDetailsScreen = ({ route, navigation }: any) => {
  const { employeeId } = route.params;

  const [employee, setEmployee] = useState<any>(null);
  const [assignedAssets, setAssignedAssets] = useState<any[]>([]);
  
  // Modal states
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedAssetForStatus, setSelectedAssetForStatus] = useState<any>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    // 1. Employee Detail Listener
    const subscriberEmployee = firestore()
      .collection('employees')
      .doc(employeeId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot && documentSnapshot.data()) {
          setEmployee({ id: documentSnapshot.id, ...documentSnapshot.data() });
        }
      });

    // 2. Assigned Assets Listener
    const subscriberAssignments = firestore()
      .collection('assignments')
      .where('employeeId', '==', employeeId)
      .where('status', '==', 'active')
      .onSnapshot(async assignmentSnapshot => {
        if (assignmentSnapshot && !assignmentSnapshot.empty) {
          const assetsPromises = assignmentSnapshot.docs.map(async (assignDoc) => {
            const assignmentData = assignDoc.data();
            const assetDoc = await firestore().collection('assets').doc(assignmentData.assetId).get();
            
            if (assetDoc && assetDoc.data()) {
              return {
                assignmentId: assignDoc.id,
                ...assignmentData,
                ...assetDoc.data(), // Merge asset tags, models, etc.
              };
            }
            return null;
          });

          const resolvedAssets = (await Promise.all(assetsPromises)).filter(a => a !== null);
          setAssignedAssets(resolvedAssets);
        } else {
          setAssignedAssets([]);
        }
      });

    return () => {
      subscriberEmployee();
      subscriberAssignments();
    };
  }, [employeeId]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedAssetForStatus) return;
    setIsUpdatingStatus(true);
    
    // Optimistic UI Update for instant feedback on EmployeeDetailsScreen
    setAssignedAssets(prev => prev.map(a => 
      a.assignmentId === selectedAssetForStatus.assignmentId 
        ? { ...a, status: newStatus } 
        : a
    ));

    try {
      await firestore()
        .collection('assets')
        .doc(selectedAssetForStatus.assetId)
        .update({ 
          status: newStatus, 
          updatedAt: firestore.FieldValue.serverTimestamp() 
        });
      
      setStatusModalVisible(false);
      setSelectedAssetForStatus(null);
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Failed to update asset status.");
      
      // Revert optimistic update on failure (optional, but good practice)
      // We would ideally keep track of previous state, but a simple refresh strategy or allowing user to try again is fine.
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'good': return { bg: { backgroundColor: '#E8F5E9' }, text: '#2E7D32' };
      case 'bad': return { bg: { backgroundColor: '#FFEBEE' }, text: '#C62828' };
      case 'repair': return { bg: { backgroundColor: '#FFF3E0' }, text: '#EF6C00' };
      case 'lost': return { bg: { backgroundColor: '#EEEEEE' }, text: '#616161' };
      default: return { bg: { backgroundColor: '#E8F5E9' }, text: '#2E7D32' };
    }
  };

  if (!employee) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
          <Text>Loading Employee Details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< "}Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddEditEmployee', { employeeId: employee.id })}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Employee Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.employeeName}>{employee.name}</Text>
              <Text style={styles.employeeDate}>Joined: {employee.joiningDate?.toDate ? employee.joiningDate.toDate().toLocaleDateString() : (employee.joiningDate || 'N/A')}</Text>
            </View>
            <View style={[styles.statusBadge, employee.status === 'Active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{employee.status || 'Active'}</Text>
            </View>
          </View>
        </Card>

        {/* Action Button */}
        <Button 
          title="+ Assign Asset (Coming Soon)" 
          onPress={() => {}} 
          style={styles.actionButton}
        />

        {/* Assigned Assets List */}
        <Text style={styles.sectionTitle}>Assigned Assets ({assignedAssets.length})</Text>

        {assignedAssets.map((asset) => {
          const { bg, text } = getStatusColor(asset.status);
          return (
          <TouchableOpacity 
            key={asset.assignmentId}
            activeOpacity={0.7}
            onPress={() => {
              setSelectedAssetForStatus(asset);
              setStatusModalVisible(true);
            }}
          >
            <Card style={styles.assetCard}>
              <View style={styles.assetHeader}>
                <Text style={styles.assetTag}>{asset.assetTag || 'Unknown Tag'}</Text>
                <View style={[styles.statusBadge, bg]}>
                  <Text style={[styles.statusText, { color: text }]}>{asset.status || 'Good'}</Text>
                </View>
              </View>
              <Text style={styles.assetModel}>
                {asset.properties?.brandModel || asset.properties?.accessoryType || 'Unknown Model'}
              </Text>
              <Text style={styles.assetType}>{(asset.type || 'Unknown Type').toUpperCase()}</Text>
            </Card>
          </TouchableOpacity>
        )})}
      </ScrollView>

      {/* Asset Status Modal */}
      <Modal
        visible={statusModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Asset Status</Text>
            
            {['Good', 'Bad', 'Repair', 'Lost'].map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.modalOption}
                disabled={isUpdatingStatus}
                onPress={() => handleStatusUpdate(opt)}
              >
                <Text style={[
                  styles.modalOptionText, 
                  selectedAssetForStatus?.status === opt && { color: colors.primary, fontWeight: 'bold' }
                ]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              disabled={isUpdatingStatus}
              onPress={() => {
                setStatusModalVisible(false);
                setSelectedAssetForStatus(null);
              }}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};
