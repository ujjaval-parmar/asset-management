import React from 'react';
import { View, Text, Button } from 'react-native';
import { useEmployeeDetailsViewModel } from './useEmployeeDetailsViewModel';
import { styles } from './styles';

export const EmployeeDetailsScreen = ({ navigation, route }: any) => {
  const viewModel = useEmployeeDetailsViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EmployeeDetails Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
