import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { BottomTabNavigator } from './BottomTabNavigator';
import { EmployeeDetailsScreen } from '../screens/EmployeeDetails/EmployeeDetailsScreen';
import { AddEditEmployeeScreen } from '../screens/AddEditEmployee/AddEditEmployeeScreen';
import { AssetDetailsScreen } from '../screens/AssetDetails/AssetDetailsScreen';
import { AddEditAssetScreen } from '../screens/AddEditAsset/AddEditAssetScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} />
      <Stack.Screen name="AddEditEmployee" component={AddEditEmployeeScreen} />
      <Stack.Screen name="AssetDetails" component={AssetDetailsScreen} />
      <Stack.Screen name="AddEditAsset" component={AddEditAssetScreen} />
    </Stack.Navigator>
  );
};
