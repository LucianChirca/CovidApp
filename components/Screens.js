import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Block } from 'galio-framework';
import { BlurView } from 'expo-blur';

// Here be the screens of the app:
import ScanScreen from './ScanScreen';
import HistoryScreen from './HistoryScreen';

import theme from '../constants/Theme';

const Tab = createBottomTabNavigator();

export default function Screens() {
  return (
    <Tab.Navigator
      initialRouteName="Scan"
      tabBarOptions={{
        activeTintColor: theme.COLORS.PRIMARY,
      }}

    >
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: (({ color, size }) => (<Icon name="aperture" family="feather" size={size} color={color} />)),
        }}
      />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}
