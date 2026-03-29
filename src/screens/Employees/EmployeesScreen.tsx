import React from 'react';
import { View, Text, Button } from 'react-native';
import { useEmployeesViewModel } from './useEmployeesViewModel';
import { styles } from './styles';

export const EmployeesScreen = ({ navigation, route }: any) => {
  const viewModel = useEmployeesViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employees Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
