import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDashboardViewModel } from './useDashboardViewModel';
import { styles } from './styles';

export const DashboardScreen = ({ navigation, route }: any) => {
  const viewModel = useDashboardViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
