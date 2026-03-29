import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { colors } from '../../constants/theme';
import { styles } from './styles';

export const AddEditEmployeeScreen = ({ navigation, route }: any) => {
  const employeeId = route.params?.employeeId;
  const isEditing = !!employeeId;

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [systemOwner, setSystemOwner] = useState('IT Admin');
  const [status, setStatus] = useState('Active');
  
  const [errors, setErrors] = useState<{name?: string, joiningDate?: string}>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [initialValues, setInitialValues] = useState<any>(null);

  const PRESET_DESIGNATIONS = [
    'HR',
    'PHP Developer',
    'PHP Developer Intern',
    'ReactJS Developer',
    'ReactJS Developer Intern',
    'Shopify Developer',
    'Shopify Developer Intern',
    'React Native Developer',
    'React Native Developer Intern'
  ];

  useEffect(() => {
    if (!isEditing) {
      setInitialValues({
        name: '',
        email: '',
        phone: '',
        designation: '',
        department: '',
        location: '',
        joiningDate: '',
        systemOwner: 'IT Admin',
        status: 'Active',
      });
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) {
      firestore()
        .collection('employees')
        .doc(employeeId)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot && documentSnapshot.data()) {
            const data = documentSnapshot.data();
            const fetchedState = {
              name: data?.name || '',
              email: data?.email || '',
              phone: data?.phone || '',
              designation: data?.designation || '',
              department: data?.department || '',
              location: data?.location || '',
              joiningDate: data?.joiningDate?.toDate ? data.joiningDate.toDate().toLocaleDateString() : (data?.joiningDate || ''),
              systemOwner: data?.systemOwner || '',
              status: data?.status || 'Active',
            };

            setName(fetchedState.name);
            setEmail(fetchedState.email);
            setPhone(fetchedState.phone);
            setDesignation(fetchedState.designation);
            setDepartment(fetchedState.department);
            setLocation(fetchedState.location);
            setJoiningDate(fetchedState.joiningDate);
            setSystemOwner(fetchedState.systemOwner);
            setStatus(fetchedState.status);

            setInitialValues(fetchedState);
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
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        designation: designation.trim(),
        department: department.trim(),
        location: location.trim(),
        joiningDate: joiningDate.trim(),
        systemOwner: systemOwner.trim(),
        status,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      if (isEditing) {
        await firestore().collection('employees').doc(employeeId).update(payload);
      } else {
        await firestore().collection('employees').add({
          ...payload,
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

  const isDirty = initialValues ? (
    name !== initialValues.name ||
    email !== initialValues.email ||
    phone !== initialValues.phone ||
    designation !== initialValues.designation ||
    department !== initialValues.department ||
    location !== initialValues.location ||
    joiningDate !== initialValues.joiningDate ||
    systemOwner !== initialValues.systemOwner ||
    status !== initialValues.status
  ) : false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} disabled={loading}>
          <Text style={[styles.backButtonText, loading && { opacity: 0.5 }]}>{"< "}Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Employee' : 'New Employee'}</Text>
        <View style={{ width: 40 }} />
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
              
              <Text style={[styles.statusLabel, { fontSize: 16, marginBottom: 12 }]}>Personal Information</Text>
              
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
                label="Email Address"
                placeholder="e.g. john.doe@company.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Phone Number"
                placeholder="e.g. +1 555-0198"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <Text style={[styles.statusLabel, { fontSize: 16, marginBottom: 12, marginTop: 16 }]}>Corporate Identity</Text>

              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 4 }}>Designation</Text>
                <Menu>
                  <MenuTrigger>
                    <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: colors.surface, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: designation ? colors.text : colors.textLight, fontSize: 16 }}>
                        {designation || "Select a designation"}
                      </Text>
                      <Text style={{ color: colors.textLight, fontSize: 12 }}>▼</Text>
                    </View>
                  </MenuTrigger>
                  <MenuOptions customStyles={{ optionsContainer: { borderRadius: 8, marginTop: 45, maxHeight: 250, padding: 8 }}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {PRESET_DESIGNATIONS.map((desig) => (
                        <MenuOption 
                          key={desig} 
                          onSelect={() => setDesignation(desig)}
                          customStyles={{ optionWrapper: { padding: 12 } }}
                        >
                          <Text style={{ fontSize: 16, color: colors.text }}>{desig}</Text>
                        </MenuOption>
                      ))}
                    </ScrollView>
                  </MenuOptions>
                </Menu>
              </View>

              <Input
                label="Department"
                placeholder="e.g. Engineering"
                value={department}
                onChangeText={setDepartment}
              />

              <Input
                label="Location / Office"
                placeholder="e.g. New York HQ"
                value={location}
                onChangeText={setLocation}
              />

              <Input
                label="System Owner"
                placeholder="e.g. IT Admin"
                value={systemOwner}
                onChangeText={setSystemOwner}
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

              <View style={[styles.statusContainer, { marginTop: 16 }]}>
                <Text style={styles.statusLabel}>Employment Status</Text>
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
                title={loading ? "Saving..." : "Save Profile"} 
                style={styles.footerButton} 
                onPress={handleSave}
                loading={loading}
                disabled={loading || !isDirty}
              />
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
