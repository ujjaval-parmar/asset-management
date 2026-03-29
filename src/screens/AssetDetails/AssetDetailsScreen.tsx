import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAssetDetailsViewModel } from './useAssetDetailsViewModel';
import { styles } from './styles';

export const AssetDetailsScreen = ({ navigation, route }: any) => {
  const viewModel = useAssetDetailsViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AssetDetails Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
