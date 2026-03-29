import { NavigatorScreenParams } from '@react-navigation/native';

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
