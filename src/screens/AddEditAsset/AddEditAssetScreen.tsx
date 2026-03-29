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

  const [assetTag, setAssetTag] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('laptop');
  const [serialNumber, setSerialNumber] = useState('');
  const [status, setStatus] = useState('Good');
  
  const [errors, setErrors] = useState<{assetTag?: string, model?: string}>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

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
            setType(data?.type || 'laptop');
            setStatus(data?.status || 'Good');
            setSerialNumber(data?.properties?.serialNumber || '');
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
    if (!assetTag.trim()) newErrors.assetTag = 'Asset Tag is required';
    if (!model.trim()) newErrors.model = 'Model is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await firestore().collection('assets').doc(assetId).update({
          assetTag,
          type,
          status,
          'properties.brandModel': model,
          'properties.serialNumber': serialNumber,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        await firestore().collection('assets').add({
          assetTag,
          type,
          status,
          isAvailable: true,
          properties: {
            brandModel: model,
            serialNumber,
          },
          createdAt: firestore.FieldValue.serverTimestamp(),
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} disabled={loading}>
          <Text style={[styles.backButtonText, loading && { opacity: 0.5 }]}>{"< "}Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Asset' : 'Add Asset'}</Text>
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
              <Input
                label="Asset Tag *"
                placeholder="e.g. LAP-001"
                value={assetTag}
                onChangeText={(text) => {
                  setAssetTag(text);
                  if (errors.assetTag) setErrors({...errors, assetTag: undefined});
                }}
                error={errors.assetTag}
              />

              <Input
                label="Make / Model *"
                placeholder="e.g. MacBook Pro 16"
                value={model}
                onChangeText={(text) => {
                  setModel(text);
                  if (errors.model) setErrors({...errors, model: undefined});
                }}
                error={errors.model}
              />

              <Input
                label="Category / Type"
                placeholder="e.g. Laptop"
                value={type}
                onChangeText={setType}
              />
              
              <Input
                label="Serial Number"
                placeholder="e.g. C02XABCD123"
                value={serialNumber}
                onChangeText={setSerialNumber}
              />

              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Availability Status</Text>
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
                disabled={loading}
              />
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
