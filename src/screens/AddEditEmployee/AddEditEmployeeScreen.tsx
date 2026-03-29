import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { colors } from '../../constants/theme';
import { styles } from './styles';

export const AddEditEmployeeScreen = ({ navigation, route }: any) => {
  const employeeId = route.params?.employeeId;
  const isEditing = !!employeeId;

  const [name, setName] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [systemOwner, setSystemOwner] = useState('IT Admin');
  const [status, setStatus] = useState('Active');
  
  const [errors, setErrors] = useState<{name?: string, joiningDate?: string}>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      firestore()
        .collection('employees')
        .doc(employeeId)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot && documentSnapshot.data()) {
            const data = documentSnapshot.data();
            setName(data?.name || '');
            setJoiningDate(data?.joiningDate?.toDate ? data.joiningDate.toDate().toLocaleDateString() : (data?.joiningDate || ''));
            setSystemOwner(data?.systemOwner || '');
            setStatus(data?.status || 'Active');
          }
          setFetching(false);
        })
        .catch(error => {
          console.error("Error fetching employee details: ", error);
          setFetching(false);
        });
    }
  }, [isEditing, employeeId]);

  const handleSave = async () => {
    // Basic Validation
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!joiningDate.trim()) newErrors.joiningDate = 'Joining Date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await firestore().collection('employees').doc(employeeId).update({
          name,
          joiningDate,
          systemOwner,
          status,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        await firestore().collection('employees').add({
          name,
          joiningDate,
          systemOwner,
          status,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }
      setLoading(false);
      Alert.alert(
        "Success", 
        `Employee ${isEditing ? 'updated' : 'added'} successfully!`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      setLoading(false);
      console.error("Error saving employee to Firestore: ", error);
      Alert.alert("Error", "Failed to save employee data.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} disabled={loading}>
          <Text style={[styles.backButtonText, loading && { opacity: 0.5 }]}>{"< "}Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Employee' : 'Add Employee'}</Text>
        <View style={{ width: 40 }} /> {/* Spacer */}
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        {fetching ? (
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
              <Input
                label="Full Name *"
                placeholder="e.g. John Doe"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({...errors, name: undefined});
                }}
                error={errors.name}
              />

              <Input
                label="Joining Date *"
                placeholder="e.g. Jan 15, 2023"
                value={joiningDate}
                onChangeText={(text) => {
                  setJoiningDate(text);
                  if (errors.joiningDate) setErrors({...errors, joiningDate: undefined});
                }}
                error={errors.joiningDate}
              />

              <Input
                label="System Owner"
                placeholder="e.g. IT Admin"
                value={systemOwner}
                onChangeText={setSystemOwner}
              />

              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Status</Text>
                <View style={styles.statusOptions}>
                  <TouchableOpacity
                    style={[styles.statusOption, status === 'Active' && styles.statusOptionSelected]}
                    onPress={() => setStatus('Active')}
                  >
                    <Text style={[styles.statusOptionText, status === 'Active' && styles.statusOptionTextSelected]}>
                      Active
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusOption, status === 'Inactive' && styles.statusOptionSelected]}
                    onPress={() => setStatus('Inactive')}
                  >
                    <Text style={[styles.statusOptionText, status === 'Inactive' && styles.statusOptionTextSelected]}>
                      Inactive
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </ScrollView>

            <View style={styles.footer}>
              <Button 
                title="Cancel" 
                variant="outline" 
                style={styles.footerButton} 
                onPress={() => navigation.goBack()}
                disabled={loading}
              />
              <Button 
                title={loading ? "Saving..." : "Save"} 
                style={styles.footerButton} 
                onPress={handleSave}
                loading={loading}
                disabled={loading}
              />
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
