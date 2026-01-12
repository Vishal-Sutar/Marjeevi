import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colorPrimary from '../../../colorsList/ColorList';
import {
  UserStackHome,
  UserStackVisit,
  UserStackPerformance,
  UserStackStock,
  UserStackProfile
} from './UserStacks'; 

import Home from '../TabScreen/Home'
import Profile from '../TabScreen/Profile'
import Performance from '../TabScreen/Performance'
import Visits from '../TabScreen/Visits'


const Tab = createBottomTabNavigator();

const TabStackuser = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 70 },
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor: colorPrimary, 
        tabBarInactiveTintColor: 'gray',     
      }}

    >
      <Tab.Screen
        name="Home"
        component={UserStackHome}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Farmer"
        component={UserStackVisit}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>👥</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Buy"
        component={UserStackPerformance}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>🛒</Text>
          ),
        }}
      />

       <Tab.Screen
        name="Stock"
        component={UserStackStock}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>📊</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={UserStackProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStackuser;

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
  },
});