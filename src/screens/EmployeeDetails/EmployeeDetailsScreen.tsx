import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Modal, Alert, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import Toast from 'react-native-toast-message';
import { ListItem } from '../../components/ListItem/ListItem';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { getRelativeVerificationTime } from '../../utils/dateUtils';
import { styles } from './styles';

export const EmployeeDetailsScreen = ({ route, navigation }: any) => {
  const { employeeId } = route.params;

  const [employee, setEmployee] = useState<any>(null);
  const [assignedAssets, setAssignedAssets] = useState<any[]>([]);
  const [historyAssets, setHistoryAssets] = useState<any[]>([]);
  
  // Status Modal states
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedAssetForStatus, setSelectedAssetForStatus] = useState<any>(null);
  const [pendingStatusUpdate, setPendingStatusUpdate] = useState<string | null>(null);
  const [pendingStatusNote, setPendingStatusNote] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Assignment Modal states
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [availableAssets, setAvailableAssets] = useState<any[]>([]);
  const [selectedAvailableAsset, setSelectedAvailableAsset] = useState<any>(null);
  const [assetTagInput, setAssetTagInput] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

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

    // 2. Active Assigned Assets Listener
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
                ...assetDoc.data(),
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

    // 3. Historical Returned Assets Listener
    const subscriberHistory = firestore()
      .collection('assignments')
      .where('employeeId', '==', employeeId)
      .where('status', '==', 'returned')
      .onSnapshot(async historySnapshot => {
        if (historySnapshot && !historySnapshot.empty) {
          const historyPromises = historySnapshot.docs.map(async (doc) => {
            const assignmentData = doc.data();
            const assetDoc = await firestore().collection('assets').doc(assignmentData.assetId).get();
            return {
              historyId: doc.id,
              ...assignmentData,
              ...(assetDoc && assetDoc.data() ? assetDoc.data() : {})
            };
          });

          const resolvedHistory = await Promise.all(historyPromises);
          // Sort descending by returned date
          resolvedHistory.sort((a: any, b: any) => (b.returnedDate?.seconds || 0) - (a.returnedDate?.seconds || 0));
          setHistoryAssets(resolvedHistory);
        } else {
          setHistoryAssets([]);
        }
      });

    return () => {
      subscriberEmployee();
      subscriberAssignments();
      subscriberHistory();
    };
  }, [employeeId]);

  const openAssignModal = async () => {
    setAssignModalVisible(true);
    try {
      const availableSnapshot = await firestore()
        .collection('assets')
        .where('isAvailable', '==', true)
        .get();
        
      const availList: any[] = [];
      availableSnapshot.forEach(doc => {
        availList.push({ id: doc.id, ...doc.data() });
      });
      setAvailableAssets(availList);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not load available assets.');
    }
  };

  const handleAssignAsset = async () => {
    if (!selectedAvailableAsset) return;
    if (!assetTagInput.trim()) {
      Alert.alert('Validation Error', 'You must provide a permanent Asset Tag upon deployment.');
      return;
    }

    setIsAssigning(true);
    try {
      // 1. Uniqueness check for Asset Tag
      const trimmedTag = assetTagInput.trim();
      const existingTagQuery = await firestore()
        .collection('assets')
        .where('assetTag', '==', trimmedTag)
        .get();

      if (!existingTagQuery.empty) {
        setIsAssigning(false);
        Toast.show({
          type: 'error',
          text1: 'Duplicate Tag',
          text2: `Asset Tag "${trimmedTag}" is already in use.`,
          position: 'bottom'
        });
        return;
      }

      const newAssignmentRef = firestore().collection('assignments').doc();
      await newAssignmentRef.set({
        assetId: selectedAvailableAsset.id,
        employeeId: employee.id,
        employeeName: employee.name,
        assignedDate: firestore.FieldValue.serverTimestamp(),
        returnedDate: null,
        status: 'active',
        conditionOut: selectedAvailableAsset.status || 'Good',
        notes: 'Assigned via Mobile UI'
      });

      await firestore().collection('assets').doc(selectedAvailableAsset.id).update({
        isAvailable: false,
        assetTag: assetTagInput.trim(),
        currentAssignmentId: newAssignmentRef.id,
        updatedAt: firestore.FieldValue.serverTimestamp()
      });

      setAssignModalVisible(false);
      setSelectedAvailableAsset(null);
      setAssetTagInput('');
      Toast.show({
        type: 'success',
        text1: 'Deployed successfully',
        text2: 'Asset bound perfectly to the Employee profile!',
        position: 'bottom'
      });
    } catch (error) {
      console.error('Error assigning asset:', error);
      Toast.show({
        type: 'error',
        text1: 'Assignment Failed',
        text2: 'Failed to assign the selected hardware.',
        position: 'bottom'
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const handleReturnAsset = async () => {
    if (!selectedAssetForStatus) return;
    
    Alert.alert(
      "Confirm Return",
      "Are you sure you want to retrieve this asset? This resets it to the inventory and strips its active tag.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Retrieve", 
          style: 'destructive',
          onPress: async () => {
            setIsUpdatingStatus(true);
            try {
              await firestore().collection('assignments').doc(selectedAssetForStatus.assignmentId).update({
                status: 'returned',
                returnedDate: firestore.FieldValue.serverTimestamp(),
                conditionIn: selectedAssetForStatus.status 
              });

              await firestore().collection('assets').doc(selectedAssetForStatus.assetId).update({
                isAvailable: true,
                assetTag: null, 
                currentAssignmentId: null,
                updatedAt: firestore.FieldValue.serverTimestamp()
              });

              setStatusModalVisible(false);
              setSelectedAssetForStatus(null);
              setPendingStatusUpdate(null);
              
              Toast.show({
                type: 'success',
                text1: 'Returned successfully',
                text2: 'Asset safely returned to inventory.',
                position: 'bottom'
              });
            } catch (err) {
              console.error(err);
              Toast.show({
                type: 'error',
                text1: 'Return Failed',
                text2: 'Failed to safely return hardware.',
                position: 'bottom'
              });
            } finally {
              setIsUpdatingStatus(false);
            }
          }
        }
      ]
    );
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedAssetForStatus || !newStatus) return;
    setIsUpdatingStatus(true);
    
    // Store backup for rollback
    const previousAssets = [...assignedAssets];
    
    setAssignedAssets(prev => prev.map(a => 
      a.assignmentId === selectedAssetForStatus.assignmentId 
        ? { ...a, status: newStatus, lastCheckedDate: new Date(), lastCheckedNote: pendingStatusNote } 
        : a
    ));

    try {
      await firestore()
        .collection('assets')
        .doc(selectedAssetForStatus.assetId)
        .update({ 
          status: newStatus,
          lastCheckedDate: firestore.FieldValue.serverTimestamp(),
          lastCheckedNote: pendingStatusNote.trim(),
          updatedAt: firestore.FieldValue.serverTimestamp() 
        });
      
      setStatusModalVisible(false);
      setSelectedAssetForStatus(null);
      setPendingStatusUpdate(null);
      setPendingStatusNote('');
      Toast.show({
        type: 'success',
        text1: 'Verified!',
        text2: 'Condition status logged successfully.',
        position: 'bottom'
      });
    } catch (error) {
      console.error("Error updating status:", error);
      // Rollback optimistic update
      setAssignedAssets(previousAssets);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Failed to commit updates to database. Changes reverted.',
        position: 'bottom'
      });
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

  const formatDate = (dateValue: any) => {
    if (!dateValue) return 'N/A';
    if (typeof dateValue.toDate === 'function') {
      return dateValue.toDate().toLocaleDateString();
    }
    if (dateValue._seconds) {
      return new Date(dateValue._seconds * 1000).toLocaleDateString();
    }
    return String(dateValue);
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

  // Calculate Verification Ratio
  const totalAssigned = assignedAssets.length;
  let verifiedCount = 0;
  assignedAssets.forEach(a => {
    const v = getRelativeVerificationTime(a.lastCheckedDate);
    if (!v.needsVerification) {
      verifiedCount++;
    }
  });

  let verificationText = '';
  let isWarning = false;
  if (totalAssigned > 0) {
    if (verifiedCount === totalAssigned) {
      verificationText = `All ${totalAssigned} Verified`;
    } else {
      verificationText = `${verifiedCount}/${totalAssigned} Verified\n(Action Needed)`;
      isWarning = true;
    }
  } else {
    verificationText = '0 Assigned';
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
        {/* Employee Info */}
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.employeeName}>{employee.name}</Text>
              <Text style={styles.employeeDate}>Joined: {formatDate(employee.joiningDate)}</Text>
            </View>
            <View style={[styles.statusBadge, employee.status === 'Active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{employee.status || 'Active'}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 13, color: colors.textLight, marginBottom: 4 }}>Active Assets</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>{assignedAssets.length}</Text>
            </View>
            <View style={{ width: 1, backgroundColor: colors.border, marginHorizontal: 8 }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 13, color: colors.textLight, marginBottom: 4 }}>History</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{historyAssets.length}</Text>
            </View>
            <View style={{ width: 1, backgroundColor: colors.border, marginHorizontal: 8 }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 13, color: colors.textLight, marginBottom: 4 }}>Compliance</Text>
              <Text style={{ fontSize: 13, textAlign: 'center', fontWeight: 'bold', color: isWarning ? colors.error : (totalAssigned > 0 ? colors.success : colors.text) }}>
                {verificationText}
              </Text>
            </View>
          </View>
        </Card>

        {/* Action Button */}
        <Button 
          title="+ Assign Hardware Deployment" 
          onPress={openAssignModal} 
          style={styles.actionButton}
        />

        {/* Active Assignments */}
        <Text style={styles.sectionTitle}>Active Equipment ({assignedAssets.length})</Text>

        {assignedAssets.length === 0 ? (
          <Text style={{color: colors.textLight, fontStyle: 'italic', marginBottom: spacing.m}}>No hardware currently assigned.</Text>
        ) : (
          assignedAssets.map((asset) => {
            const { bg, text } = getStatusColor(asset.status);
            return (
            <TouchableOpacity 
              key={asset.assignmentId}
              activeOpacity={0.7}
              onPress={() => {
                setSelectedAssetForStatus(asset);
                setPendingStatusUpdate(asset.status || 'Good');
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
                
                {/* Secondary Identifiers */}
                <View style={{ marginTop: 2, marginBottom: 4 }}>
                  {asset.properties?.serialNumber && (
                    <Text style={{ fontSize: 13, color: colors.textLight }}>S/N: {asset.properties.serialNumber}</Text>
                  )}
                  {asset.properties?.imei1 && (
                    <Text style={{ fontSize: 13, color: colors.textLight }}>IMEI: {asset.properties.imei1}</Text>
                  )}
                  <Text style={{ fontSize: 13, color: colors.textLight }}>Owner: {asset.ownership ? (asset.ownership.charAt(0).toUpperCase() + asset.ownership.slice(1)) : 'Employee'}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                  <Text style={styles.assetType}>{(asset.type || 'Unknown Type').toUpperCase()}</Text>
                  {(() => {
                    const verification = getRelativeVerificationTime(asset.lastCheckedDate);
                    if (verification.needsVerification && asset.lastCheckedDate) {
                       return (
                         <Text style={{ fontSize: 12, color: colors.error, fontWeight: 'bold' }}>
                           NEED TO VERIFY
                         </Text>
                       );
                    } else if (asset.lastCheckedDate) {
                       return (
                         <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '500' }}>
                           Verified: {verification.text}
                         </Text>
                       );
                    }
                    return (
                      <Text style={{ fontSize: 12, color: colors.error, fontWeight: 'bold' }}>
                         NEED TO VERIFY
                      </Text>
                    );
                  })()}
                </View>
                {asset.lastCheckedNote ? (
                  <Text style={{ fontSize: 13, color: colors.textLight, marginTop: 4, fontStyle: 'italic' }}>
                    Note: {asset.lastCheckedNote}
                  </Text>
                ) : null}
              </Card>
            </TouchableOpacity>
          )})
        )}

        {/* Past History */}
        <View style={{marginTop: spacing.l}}>
          <Text style={styles.sectionTitle}>Deployment History ({historyAssets.length})</Text>
          {historyAssets.length === 0 ? (
            <Text style={{color: colors.textLight, fontStyle: 'italic', marginBottom: spacing.xl}}>No past hardware records found.</Text>
          ) : (
            historyAssets.map((historyRecord) => {
              const modelName = historyRecord.properties?.brandModel || historyRecord.properties?.accessoryType || 'Unknown Hardware';
              return (
                <Card key={historyRecord.historyId} style={{ marginBottom: spacing.m, borderLeftWidth: 4, borderLeftColor: colors.textLight }}>
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.text}}>{modelName}</Text>
                  <Text style={{color: colors.textLight, marginTop: 4, fontSize: 13}}>
                    Type: {(historyRecord.type || '').toUpperCase()}
                  </Text>
                  <Text style={{color: colors.success, marginTop: 6, fontSize: 12, fontWeight: '500'}}>
                    Assigned: {formatDate(historyRecord.assignedDate || historyRecord.assignedAt)}
                  </Text>
                  <Text style={{color: colors.textLight, marginTop: 2, fontSize: 12, fontWeight: '500'}}>
                    Returned: {formatDate(historyRecord.returnedDate)}
                  </Text>
                </Card>
              );
            })
          )}
          <View style={{ height: 40 }}/>
        </View>
      </ScrollView>

      {/* Asset Status & Actions Modal */}
      <Modal
        visible={statusModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setStatusModalVisible(false);
          setPendingStatusUpdate(null);
          setPendingStatusNote('');
        }}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text}}>Asset Specifications</Text>
                {selectedAssetForStatus && (
                  <TouchableOpacity
                    onPress={() => {
                      setStatusModalVisible(false);
                      setPendingStatusUpdate(null);
                      setPendingStatusNote('');
                      navigation.navigate('AddEditAsset', { assetId: selectedAssetForStatus.assetId });
                    }}
                    style={{ marginLeft: 12, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: colors.primary + '15', borderRadius: 4 }}
                  >
                    <Text style={{color: colors.primary, fontWeight: '600', fontSize: 13}}>Edit Asset</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity onPress={() => { setStatusModalVisible(false); setPendingStatusUpdate(null); setPendingStatusNote(''); }}>
                <Text style={{color: colors.textLight, fontSize: 28, fontWeight: '300', marginTop: -4}}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedAssetForStatus && (
                <View style={{ marginBottom: spacing.l, padding: spacing.m, backgroundColor: colors.background, borderRadius: borderRadius.m, borderWidth: 1, borderColor: colors.border }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: spacing.m }}>
                    {selectedAssetForStatus.properties?.brandModel || selectedAssetForStatus.properties?.accessoryType || 'Unknown Model'}
                  </Text>
                  
                  <View style={localStyle.propRow}>
                    <Text style={localStyle.propLabel}>Asset Tag</Text>
                    <Text style={localStyle.propValue}>{selectedAssetForStatus.assetTag || 'N/A'}</Text>
                  </View>

                  <View style={localStyle.propRow}>
                    <Text style={localStyle.propLabel}>Category</Text>
                    <Text style={localStyle.propValue}>{(selectedAssetForStatus.type || '').toUpperCase()}</Text>
                  </View>

                  {selectedAssetForStatus.properties?.serialNumber && (
                    <View style={localStyle.propRow}>
                        <Text style={localStyle.propLabel}>Serial Number</Text>
                        <Text style={localStyle.propValue}>{selectedAssetForStatus.properties.serialNumber}</Text>
                    </View>
                  )}
                  {selectedAssetForStatus.properties?.imei1 && (
                    <View style={localStyle.propRow}>
                        <Text style={localStyle.propLabel}>IMEI 1</Text>
                        <Text style={localStyle.propValue}>{selectedAssetForStatus.properties.imei1}</Text>
                    </View>
                  )}
                  {selectedAssetForStatus.properties?.imei2 && (
                    <View style={localStyle.propRow}>
                        <Text style={localStyle.propLabel}>IMEI 2</Text>
                        <Text style={localStyle.propValue}>{selectedAssetForStatus.properties.imei2}</Text>
                    </View>
                  )}
                  {selectedAssetForStatus.properties?.simNumber && (
                    <View style={localStyle.propRow}>
                        <Text style={localStyle.propLabel}>SIM Number</Text>
                        <Text style={localStyle.propValue}>{selectedAssetForStatus.properties.simNumber}</Text>
                    </View>
                  )}
                  <View style={localStyle.propRow}>
                    <Text style={localStyle.propLabel}>Ownership</Text>
                    <Text style={localStyle.propValue}>
                        {selectedAssetForStatus.ownership ? (selectedAssetForStatus.ownership.charAt(0).toUpperCase() + selectedAssetForStatus.ownership.slice(1)) : 'Employee'}
                    </Text>
                  </View>
                  <View style={[localStyle.propRow, { marginBottom: 0 }]}>
                    <Text style={localStyle.propLabel}>Current Status</Text>
                    <Text style={localStyle.propValue}>{selectedAssetForStatus.status || 'Good'}</Text>
                  </View>
                </View>
              )}

              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: spacing.m }}>Update Condition</Text>
              
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: spacing.l}}>
                {['Good', 'Bad', 'Repair', 'Lost'].map((opt) => {
                  const isSelected = pendingStatusUpdate === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      activeOpacity={0.7}
                      style={{
                        width: '48%',
                        paddingVertical: spacing.m,
                        marginBottom: spacing.s,
                        borderRadius: borderRadius.s,
                        borderWidth: 1,
                        borderColor: isSelected ? colors.primary : colors.border,
                        backgroundColor: isSelected ? colors.primary + '15' : colors.background,
                        alignItems: 'center'
                      }}
                      onPress={() => setPendingStatusUpdate(opt)}
                    >
                      <Text style={{ 
                        fontSize: 14, 
                        fontWeight: isSelected ? 'bold' : '500',
                        color: isSelected ? colors.primary : colors.text 
                      }}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Input
                label="Verification Note (Optional)"
                placeholder="e.g. Screen has a minor scratch, works fine"
                value={pendingStatusNote}
                onChangeText={setPendingStatusNote}
              />

              <Button 
                title={isUpdatingStatus ? "Verifying..." : "Verify & Update Status"} 
                onPress={() => handleStatusUpdate(pendingStatusUpdate!)}
                loading={isUpdatingStatus}
                disabled={isUpdatingStatus || !pendingStatusUpdate}
                style={{ marginBottom: spacing.l }}
              />

              <Button
                title="⟲ Return to Inventory" 
                variant="outline"
                onPress={handleReturnAsset}
                disabled={isUpdatingStatus}
                style={{ borderColor: colors.error, marginBottom: 40 }}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Assign Hardware Modal */}
      <Modal
        visible={assignModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setAssignModalVisible(false);
          setSelectedAvailableAsset(null);
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Inventory Selection</Text>
            <TouchableOpacity onPress={() => {
              setAssignModalVisible(false);
              setSelectedAvailableAsset(null);
            }}>
              <Text style={styles.backButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          {!selectedAvailableAsset ? (
            <FlatList
              data={availableAssets}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: spacing.m, paddingBottom: 100 }}
              ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: spacing.xl, color: colors.textLight }}>No available assets found.</Text>}
              renderItem={({ item }) => {
                const model = item.properties?.brandModel || item.properties?.accessoryType || 'Unknown Model';
                return (
                  <TouchableOpacity onPress={() => setSelectedAvailableAsset(item)}>
                    <ListItem
                      title={model}
                      subtitle={[`Category: ${item.type || 'N/A'}`]}
                      rightElement={<Text style={{ color: colors.primary, fontWeight: '600' }}>Assign</Text>}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View style={{ padding: spacing.m }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: spacing.m }}>
                Confirming Deployment
              </Text>
              <Card style={{ marginBottom: spacing.l }}>
                <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 4 }}>
                  {selectedAvailableAsset.properties?.brandModel || selectedAvailableAsset.properties?.accessoryType || 'Unknown'}
                </Text>
                <Text style={{ color: colors.textLight }}>Type: {(selectedAvailableAsset.type || 'N/A').toUpperCase()}</Text>
                {selectedAvailableAsset.properties?.serialNumber && <Text style={{ color: colors.textLight }}>S/N: {selectedAvailableAsset.properties.serialNumber}</Text>}
              </Card>

              <Input
                label="Generate Asset Tag *"
                placeholder="Ex. MOB-001"
                value={assetTagInput}
                onChangeText={setAssetTagInput}
              />
              
              <Button
                title={isAssigning ? "Deploying..." : "Publish Assignment"}
                onPress={handleAssignAsset}
                loading={isAssigning}
                disabled={isAssigning}
              />
              <Button
                title="Back to List"
                variant="outline"
                style={{ marginTop: spacing.m }}
                onPress={() => setSelectedAvailableAsset(null)}
                disabled={isAssigning}
              />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  propRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  propLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  propValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  }
});
