import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { colors } from '../../constants/theme';
import { styles } from './styles';

export const AddEditAssetScreen = ({ navigation, route }: any) => {
  const assetId = route.params?.assetId;
  const isEditing = !!assetId;

  // Base Identity
  const [assetTag, setAssetTag] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('Laptop');
  const [status, setStatus] = useState('Good');
  const [ownership, setOwnership] = useState('Employee');
  
  // Conditional Props
  const [serialNumber, setSerialNumber] = useState('');
  const [imei1, setImei1] = useState('');
  const [imei2, setImei2] = useState('');
  const [simNumber, setSimNumber] = useState('');
  
  const [errors, setErrors] = useState<{model?: string}>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [initialValues, setInitialValues] = useState<any>(null);

  const ASSET_TYPES = ['Laptop', 'Mobile', 'Hardware', 'Accessory'];
  const OWNERSHIP_TYPES = ['Employee', 'Office'];

  useEffect(() => {
    if (!isEditing) {
      setInitialValues({
        assetTag: '',
        model: '',
        type: 'Laptop',
        ownership: 'Employee',
        status: 'Good',
        serialNumber: '',
        imei1: '',
        imei2: '',
        simNumber: '',
      });
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) {
      firestore()
        .collection('assets')
        .doc(assetId)
        .get()
        .then(doc => {
          if (doc && doc.data()) {
            const data = doc.data();
            setAssetTag(data?.assetTag || '');
            setModel(data?.properties?.brandModel || data?.properties?.accessoryType || '');
            
            let finalType = 'Laptop';
            if (data?.type) {
              let mappedType = data.type.charAt(0).toUpperCase() + data.type.slice(1);
              if (mappedType === 'Desktop' || mappedType === 'Monitor') {
                mappedType = 'Hardware';
              } else if (!ASSET_TYPES.includes(mappedType)) {
                mappedType = 'Accessory'; // Catch-all for imported types like 'Stand', 'Mouse', etc.
              }
              finalType = mappedType;
              setType(mappedType);
            }
            
            const fetchedOwnership = data?.ownership ? data.ownership.charAt(0).toUpperCase() + data.ownership.slice(1) : 'Employee';
            setOwnership(fetchedOwnership);
            
            setStatus(data?.status || 'Good');
            
            // Nested Properties
            const fetchedSN = data?.properties?.serialNumber || '';
            const fetchedImei1 = data?.properties?.imei1 || '';
            const fetchedImei2 = data?.properties?.imei2 || '';
            const fetchedSim = data?.properties?.simNumber || '';

            setSerialNumber(fetchedSN);
            setImei1(fetchedImei1);
            setImei2(fetchedImei2);
            setSimNumber(fetchedSim);

            setInitialValues({
              assetTag: data?.assetTag || '',
              model: data?.properties?.brandModel || data?.properties?.accessoryType || '',
              type: finalType,
              ownership: fetchedOwnership,
              status: data?.status || 'Good',
              serialNumber: fetchedSN,
              imei1: fetchedImei1,
              imei2: fetchedImei2,
              simNumber: fetchedSim,
            });
          }
          setFetching(false);
        })
        .catch(error => {
          console.error("Error fetching asset details: ", error);
          setFetching(false);
        });
    }
  }, [isEditing, assetId]);

  const handleSave = async () => {
    // Basic Validation
    const newErrors: any = {};
    if (!model.trim()) newErrors.model = 'Model is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    // Dynamically build clean properties object based purely on current Type mapped correctly.
    const cleanType = type.toLowerCase();
    const cleanOwnership = ownership.toLowerCase();
    let computedProperties: any = { brandModel: model };

    if (cleanType === 'laptop') {
      if (serialNumber) computedProperties.serialNumber = serialNumber;
    } else if (cleanType === 'mobile') {
      if (imei1) computedProperties.imei1 = imei1;
      if (imei2) computedProperties.imei2 = imei2;
      if (simNumber) computedProperties.simNumber = simNumber;
    } else if (cleanType === 'accessory') {
      computedProperties = { accessoryType: model };
    }

    try {
      if (isEditing) {
        await firestore().collection('assets').doc(assetId).update({
          assetTag: assetTag.trim() || null, // Natively null if deliberately empty
          type: cleanType,
          ownership: cleanOwnership,
          status,
          properties: computedProperties,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        await firestore().collection('assets').add({
          assetTag: assetTag.trim() || null,
          type: cleanType,
          ownership: cleanOwnership,
          status,
          isAvailable: true,
          properties: computedProperties,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      }
      setLoading(false);
      Alert.alert(
        "Success", 
        `Asset ${isEditing ? 'updated' : 'added'} successfully!`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      setLoading(false);
      console.error("Error saving asset: ", error);
      Alert.alert("Error", "Failed to save asset data.");
    }
  };

  const isDirty = initialValues ? (
    assetTag !== initialValues.assetTag ||
    model !== initialValues.model ||
    type !== initialValues.type ||
    ownership !== initialValues.ownership ||
    status !== initialValues.status ||
    serialNumber !== initialValues.serialNumber ||
    imei1 !== initialValues.imei1 ||
    imei2 !== initialValues.imei2 ||
    simNumber !== initialValues.simNumber
  ) : false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} disabled={loading}>
          <Text style={[styles.backButtonText, loading && { opacity: 0.5 }]}>{"< "}Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Asset' : 'New Asset'}</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        {fetching ? (
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
              
              <Text style={styles.statusLabel}>Hardware Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScrollView}>
                {[type, ...ASSET_TYPES.filter(t => t !== type)].map(t => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.typeOption, type === t && styles.typeOptionSelected]}
                    onPress={() => setType(t)}
                  >
                    <Text style={[styles.typeOptionText, type === t && styles.typeOptionTextSelected]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Input
                label={type === 'Accessory' ? "Accessory Name *" : "Make / Model *"}
                placeholder={
                  type === 'Accessory' ? "e.g. Wireless Mouse, Stand, Headphone" :
                  type === 'Hardware' ? "e.g. Dell Desktop, LG 24 Monitor" :
                  "e.g. MacBook Pro 16"
                }
                value={model}
                onChangeText={(text) => {
                  setModel(text);
                  if (errors.model) setErrors({...errors, model: undefined});
                }}
                error={errors.model}
              />

              <Input
                label="Asset Tag (Optional)"
                placeholder="Leaves Blank if not deployed"
                value={assetTag}
                onChangeText={setAssetTag}
              />

              {/* Conditional Inputs */}
              {type === 'Laptop' && (
                <Input
                  label="Serial Number"
                  placeholder="e.g. C02XABCD123"
                  value={serialNumber}
                  onChangeText={setSerialNumber}
                />
              )}

              {type === 'Mobile' && (
                <>
                  <Input
                    label="IMEI 1"
                    placeholder="Enter IMEI 1"
                    value={imei1}
                    onChangeText={setImei1}
                  />
                  <Input
                    label="IMEI 2"
                    placeholder="Enter IMEI 2 (Optional)"
                    value={imei2}
                    onChangeText={setImei2}
                  />
                  <Input
                    label="SIM Number"
                    placeholder="Enter associated SIM"
                    value={simNumber}
                    onChangeText={setSimNumber}
                  />
                </>
              )}

              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Intended Ownership</Text>
                <View style={styles.statusOptions}>
                  {OWNERSHIP_TYPES.map(own => (
                     <TouchableOpacity
                       key={own}
                       style={[styles.statusOption, ownership === own && styles.statusOptionSelected]}
                       onPress={() => setOwnership(own)}
                     >
                       <Text style={[styles.statusOptionText, ownership === own && styles.statusOptionTextSelected]}>
                         {own}
                       </Text>
                     </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Physical Status</Text>
                <View style={styles.statusOptions}>
                  {['Good', 'Bad', 'Repair', 'Lost'].map(st => (
                     <TouchableOpacity
                       key={st}
                       style={[styles.statusOption, status === st && styles.statusOptionSelected]}
                       onPress={() => setStatus(st)}
                     >
                       <Text style={[styles.statusOptionText, status === st && styles.statusOptionTextSelected]}>
                         {st}
                       </Text>
                     </TouchableOpacity>
                  ))}
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
                disabled={loading || !isDirty}
              />
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
