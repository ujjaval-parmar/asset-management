import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAddEditEmployeeViewModel } from './useAddEditEmployeeViewModel';
import { styles } from './styles';

export const AddEditEmployeeScreen = ({ navigation, route }: any) => {
  const viewModel = useAddEditEmployeeViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AddEditEmployee Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
