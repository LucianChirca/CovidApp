import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Here be the screens of the app:
import ScanScreen from './ScanScreen';

const Tab = createBottomTabNavigator();

export default function Screens() {
  return (
    <Tab.Navigator
      initialRouteName="Scan"
    >
      <Tab.Screen name="Scan" component={ScanScreen} />
    </Tab.Navigator>
  );
}
