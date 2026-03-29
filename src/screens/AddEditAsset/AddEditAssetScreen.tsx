import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAddEditAssetViewModel } from './useAddEditAssetViewModel';
import { styles } from './styles';

export const AddEditAssetScreen = ({ navigation, route }: any) => {
  const viewModel = useAddEditAssetViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AddEditAsset Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
