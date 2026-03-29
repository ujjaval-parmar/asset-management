import React from 'react';
import { View, Text, Button } from 'react-native';
import { useProfileViewModel } from './useProfileViewModel';
import { styles } from './styles';

export const ProfileScreen = ({ navigation, route }: any) => {
  const viewModel = useProfileViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
