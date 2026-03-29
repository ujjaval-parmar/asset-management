import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAssetsViewModel } from './useAssetsViewModel';
import { styles } from './styles';

export const AssetsScreen = ({ navigation, route }: any) => {
  const viewModel = useAssetsViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assets Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
