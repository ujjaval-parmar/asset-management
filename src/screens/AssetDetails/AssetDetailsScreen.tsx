import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert, Modal, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import { Input } from '../../components/Input/Input';
import Toast from 'react-native-toast-message';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { getRelativeVerificationTime, formatDate } from '../../utils/dateUtils';
import { styles } from './styles';

export const AssetDetailsScreen = ({ navigation, route }: any) => {
  const { assetId } = route.params;
  
  const [asset, setAsset] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReturning, setIsReturning] = useState(false);

  // Assignment Modal States
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [assetTagInput, setAssetTagInput] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  // Verification Modal State
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<string>('Good');
  const [verifyNote, setVerifyNote] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

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
              assignedDate: assignmentData.assignedDate || assignmentData.assignedAt,
              returnedDate: assignmentData.returnedDate || assignmentData.returnedAt,
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
      case 'good': return { bg: { backgroundColor: colors.success + '15' }, text: colors.success };
      case 'bad': return { bg: { backgroundColor: colors.error + '15' }, text: colors.error };
      case 'repair': return { bg: { backgroundColor: colors.secondary + '15' }, text: colors.secondary };
      case 'lost': return { bg: { backgroundColor: colors.warning + '15' }, text: colors.warning };
      default: return { bg: { backgroundColor: colors.success + '15' }, text: colors.success };
    }
  };

  const verification = asset ? getRelativeVerificationTime(asset.lastCheckedDate) : { text: '', needsVerification: false };

  const handleVerifyAsset = async () => {
    if (!asset) return;
    setIsVerifying(true);
    try {
      await firestore()
        .collection('assets')
        .doc(asset.id)
        .update({
          status: verifyStatus,
          lastCheckedDate: firestore.FieldValue.serverTimestamp(),
          lastCheckedNote: verifyNote.trim(),
          updatedAt: firestore.FieldValue.serverTimestamp()
        });
      setVerifyModalVisible(false);
      setVerifyStatus('Good');
      setVerifyNote('');
      Toast.show({
        type: 'success',
        text1: 'Verified!',
        text2: 'Asset condition logged successfully.',
        position: 'bottom'
      });
    } catch (e) {
      console.error("Failed to verify asset", e);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Failed to save verification status.',
        position: 'bottom'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReturnAsset = async () => {
    const activeAssignment = history.find(h => !h.returnedDate);
    const assignmentId = activeAssignment?.id || asset?.currentAssignmentId;

    if (!assignmentId) {
      Alert.alert('Notice', 'No active assignment could be found. Resetting availability manually.');
    }

    Alert.alert(
      "Confirm Return",
      "Are you sure you want to retrieve this asset? This resets it to the available inventory.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          style: 'destructive',
          onPress: async () => {
            setIsReturning(true);
            try {
              if (assignmentId) {
                await firestore().collection('assignments').doc(assignmentId).update({
                  status: 'returned',
                  returnedDate: firestore.FieldValue.serverTimestamp(),
                  conditionIn: asset.status || 'Good'
                });
              }

              await firestore().collection('assets').doc(asset.id).update({
                isAvailable: true,
                assetTag: null,
                currentAssignmentId: null,
                updatedAt: firestore.FieldValue.serverTimestamp()
              });

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
              setIsReturning(false);
            }
          }
        }
      ]
    );
  };

  const openAssignModal = async () => {
    setAssignModalVisible(true);
    try {
      const employeesSnapshot = await firestore()
        .collection('employees')
        .where('status', '==', 'Active')
        .get();
        
      const empList: any[] = [];
      employeesSnapshot.forEach(doc => {
        empList.push({ id: doc.id, ...doc.data() });
      });
      setEmployees(empList);
    } catch (e) {
      console.error(e);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not load active employees.',
        position: 'bottom'
      });
    }
  };

  const handleAssignAssetFromDetails = async () => {
    if (!selectedEmployee || !asset) return;
    if (!assetTagInput.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please enter an Asset Tag for deployment.',
        position: 'bottom'
      });
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
        assetId: asset.id,
        employeeId: selectedEmployee.id,
        employeeName: selectedEmployee.name,
        assignedDate: firestore.FieldValue.serverTimestamp(),
        returnedDate: null,
        status: 'active',
        conditionOut: asset.status || 'Good',
        notes: 'Assigned via Asset Details screen'
      });

      await firestore().collection('assets').doc(asset.id).update({
        isAvailable: false,
        assetTag: trimmedTag,
        currentAssignmentId: newAssignmentRef.id,
        updatedAt: firestore.FieldValue.serverTimestamp()
      });

      setAssignModalVisible(false);
      setSelectedEmployee(null);
      setAssetTagInput('');
      Toast.show({
        type: 'success',
        text1: 'Assigned!',
        text2: `Asset deployed to ${selectedEmployee.name}.`,
        position: 'bottom'
      });
    } catch (error) {
      console.error('Error assigning asset:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to complete assignment.',
        position: 'bottom'
      });
    } finally {
      setIsAssigning(false);
    }
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

        {/* Verification Card */}
        <Card style={{ marginBottom: spacing.m, backgroundColor: verification.needsVerification ? colors.error + '10' : colors.surface, borderColor: verification.needsVerification ? colors.error : 'transparent', borderWidth: verification.needsVerification ? 1 : 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: verification.needsVerification ? colors.error : colors.text }}>Condition Verification</Text>
            {asset.lastCheckedDate && (
              <Text style={{ fontSize: 13, color: verification.needsVerification ? colors.error : colors.primary, fontWeight: '500' }}>
                {verification.text}
              </Text>
            )}
          </View>
          {verification.needsVerification && (
            <Text style={{ fontSize: 13, color: colors.error, fontWeight: 'bold', marginBottom: 8 }}>
              NEED TO VERIFY CONDITION
            </Text>
          )}
          {asset.lastCheckedNote ? (
            <Text style={{ fontSize: 14, color: colors.textLight, marginBottom: 12, fontStyle: 'italic' }}>
              " {asset.lastCheckedNote} "
            </Text>
          ) : (
            <Text style={{ fontSize: 14, color: colors.textLight, marginBottom: 12 }}>
              {asset.lastCheckedDate ? 'No notes provided during last specific verification.' : 'Asset has not been explicitly verified recently.'}
            </Text>
          )}
          <Button 
            title="Verify Condition" 
            variant="outline"
            onPress={() => {
              setVerifyStatus(asset.status || 'Good');
              setVerifyModalVisible(true);
            }} 
          />
        </Card>

        {/* Action Button */}
        {asset.isAvailable ? (
          <Button 
            title="Assign Asset" 
            style={styles.actionButton}
            onPress={openAssignModal}
          />
        ) : (
          <Button 
            title={isReturning ? "Returning..." : "Return Asset"} 
            variant="outline" 
            style={styles.actionButton}
            onPress={handleReturnAsset}
            disabled={isReturning}
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
              <Card key={record.id} style={{ marginBottom: spacing.m, borderLeftWidth: 4, borderLeftColor: record.returnedDate ? colors.textLight : colors.success }}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.text}}>{record.employeeName}</Text>
                <Text style={{color: colors.success, marginTop: 6, fontSize: 13, fontWeight: '500'}}>
                  Deployed: {formatDate(record.assignedDate)}
                </Text>
                {record.returnedDate && (
                  <Text style={{color: colors.textLight, marginTop: 2, fontSize: 13, fontWeight: '500'}}>
                    Returned: {formatDate(record.returnedDate)}
                  </Text>
                )}
                {!record.returnedDate && (
                  <Text style={{color: colors.primary, marginTop: 2, fontSize: 13, fontWeight: 'bold'}}>
                    Currently Active
                  </Text>
                )}
              </Card>
            ))
          )}
        </View>

      </ScrollView>

      {/* Verify Modal */}
      {verifyModalVisible && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text}}>Verify Condition</Text>
              <TouchableOpacity onPress={() => setVerifyModalVisible(false)}>
                <Text style={{color: colors.textLight, fontSize: 28, fontWeight: '300', marginTop: -4}}>×</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 8 }}>Physical Condition</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {['Good', 'Repair', 'Bad', 'Lost'].map(statusOption => (
                <TouchableOpacity
                  key={statusOption}
                  onPress={() => setVerifyStatus(statusOption)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: verifyStatus === statusOption ? colors.primary : colors.border,
                    backgroundColor: verifyStatus === statusOption ? colors.primary + '15' : colors.surface,
                  }}
                >
                  <Text style={{ 
                    color: verifyStatus === statusOption ? colors.primary : colors.textLight,
                    fontWeight: verifyStatus === statusOption ? '600' : '400'
                  }}>
                    {statusOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Input
              label="Verification Note (Optional)"
              placeholder="e.g. Needs cleaning but works perfectly"
              value={verifyNote}
              onChangeText={setVerifyNote}
            />

            <Button 
              title={isVerifying ? "Saving..." : "Save Verification"}
              onPress={handleVerifyAsset}
              loading={isVerifying}
              disabled={isVerifying}
              style={{ marginTop: 8, marginBottom: 20 }}
            />
          </View>
        </View>
      )}

      {/* Assign Modal */}
      <Modal
        visible={assignModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setAssignModalVisible(false);
          setSelectedEmployee(null);
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Employee</Text>
            <TouchableOpacity onPress={() => {
              setAssignModalVisible(false);
              setSelectedEmployee(null);
            }}>
              <Text style={styles.backButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          {!selectedEmployee ? (
            <FlatList
              data={employees}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: spacing.m }}
              ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: spacing.xl, color: colors.textLight }}>No active employees found.</Text>}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedEmployee(item)}>
                  <ListItem
                    title={item.name}
                    subtitle={[item.designation || 'No Designation']}
                    rightElement={<Text style={{ color: colors.primary, fontWeight: '600' }}>Select</Text>}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={{ padding: spacing.m }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: spacing.m }}>
                Deploy to {selectedEmployee.name}
              </Text>
              
              <Input
                label="Generate Asset Tag *"
                placeholder="Ex. MOB-001"
                value={assetTagInput}
                onChangeText={setAssetTagInput}
              />
              
              <Button
                title={isAssigning ? "Deploying..." : "Confirm Deployment"}
                onPress={handleAssignAssetFromDetails}
                loading={isAssigning}
                disabled={isAssigning}
                style={{ marginTop: spacing.m }}
              />
              <Button
                title="Back to List"
                variant="outline"
                style={{ marginTop: spacing.m }}
                onPress={() => setSelectedEmployee(null)}
                disabled={isAssigning}
              />
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
