import React from "react";
import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import {
  UserStackHome,
  UserStackVisit,
  UserStackPerformance,
  UserStackProfile,
} from "./FPOStack";

const Tab = createBottomTabNavigator();

const TabStackuser = () => {
  const { t } = useTranslation(); // 🌍

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 70 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={UserStackHome}
        options={{
          tabBarLabel: t("tabs.home"),
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="FarmerTab"
        component={UserStackVisit}
        options={{
          tabBarLabel: t("tabs.farmers"),
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>👥</Text>
          ),
        }}
      />

      <Tab.Screen
        name="InventoryTab"
        component={UserStackPerformance}
        options={{
          tabBarLabel: t("tabs.inventory"),
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>🛒</Text>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={UserStackProfile}
        options={{
          tabBarLabel: t("tabs.profile"),
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
