import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Block } from 'galio-framework';
import { BlurView } from 'expo-blur';

// Here be the screens of the app:
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

import theme from '../constants/Theme';

const Tab = createBottomTabNavigator();

export default function Screens() {
  return (
    <Tab.Navigator
      initialRouteName="Scan"
      tabBarOptions={{
        activeTintColor: theme.COLORS.PRIMARY,
        style: {
          borderTopWidth: 0,
        },
      }}

    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (({ color, size }) => (<Icon name="aperture" family="feather" size={size} color={color} />)),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (({ color, size }) => (<Icon name="user" family="feather" size={size} color={color} />)),
        }}
      />
    </Tab.Navigator>
  );
}
