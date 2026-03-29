const fs = require('fs');
const path = require('path');

const baseDir = '/Users/apple/Desktop/asset_management/AssetManagement/src';

const dirs = [
  'navigation',
  'screens',
  'components',
  'components/ErrorScreen',
  'components/Toast',
  'types',
  'styles',
  'utils',
  'assets'
];

dirs.forEach(d => {
  fs.mkdirSync(path.join(baseDir, d), { recursive: true });
});

const screens = [
  'Dashboard', 'Employees', 'EmployeeDetails', 'AddEditEmployee',
  'Assets', 'AssetDetails', 'AddEditAsset', 'Profile'
];

screens.forEach(s => {
  const sDir = path.join(baseDir, 'screens', s);
  fs.mkdirSync(sDir, { recursive: true });
  
  fs.writeFileSync(path.join(sDir, `${s}Screen.tsx`), `import React from 'react';
import { View, Text, Button } from 'react-native';
import { use${s}ViewModel } from './use${s}ViewModel';
import { styles } from './styles';

export const ${s}Screen = ({ navigation, route }: any) => {
  const viewModel = use${s}ViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${s} Screen</Text>
      <Button title="Go Back" onPress={() => navigation.canGoBack() && navigation.goBack()} />
    </View>
  );
};
`);

  fs.writeFileSync(path.join(sDir, `use${s}ViewModel.ts`), `import { useState } from 'react';

export const use${s}ViewModel = () => {
  const [loading, setLoading] = useState(false);
  return { loading };
};
`);

  fs.writeFileSync(path.join(sDir, `styles.ts`), `import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
`);
});

fs.writeFileSync(path.join(baseDir, 'types', 'navigation.ts'), `import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Dashboard: undefined;
  Employees: undefined;
  Assets: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  EmployeeDetails: { employeeId: string };
  AddEditEmployee: { employeeId?: string };
  AssetDetails: { assetId: string };
  AddEditAsset: { assetId?: string };
};
`);

fs.writeFileSync(path.join(baseDir, 'navigation', 'BottomTabNavigator.tsx'), `import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import { DashboardScreen } from '../screens/Dashboard/DashboardScreen';
import { EmployeesScreen } from '../screens/Employees/EmployeesScreen';
import { AssetsScreen } from '../screens/Assets/AssetsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Employees" component={EmployeesScreen} />
      <Tab.Screen name="Assets" component={AssetsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
`);

fs.writeFileSync(path.join(baseDir, 'navigation', 'RootNavigator.tsx'), `import React from 'react';
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
`);

fs.writeFileSync(path.join(baseDir, 'components', 'Toast', 'Toast.tsx'), `import React from 'react';
import { View, Text } from 'react-native';

export const Toast = () => <View><Text>Toast</Text></View>;
`);

fs.writeFileSync(path.join(baseDir, 'components', 'ErrorScreen', 'ErrorScreen.tsx'), `import React from 'react';
import { View, Text } from 'react-native';

export const ErrorScreen = () => <View><Text>Error!</Text></View>;
`);

fs.writeFileSync(path.join(baseDir, 'utils', 'responsive.ts'), `import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Placeholders for dynamic font size and width/height until you provide the files
export const vw = (percent: number) => (width * percent) / 100;
export const vh = (percent: number) => (height * percent) / 100;
export const responsiveFontSize = (size: number) => size;
`);

console.log('Successfully scaffolding UI MVVM screens and components!');
