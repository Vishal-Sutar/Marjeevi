import React from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import Images from "../../assets/Images/Images";

import {
  FarmerStackHome,
  FarmerStackMarket,
  FarmerStackListing,
  FarmerStackProfile,
} from "./FarmerStacks";

const Tab = createBottomTabNavigator();

const ACTIVE_COLOR = "#2E7D32";
const INACTIVE_COLOR = "#999";

const Tabfarmer = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
      }}
    >
      {/* HOME */}
      <Tab.Screen
        name="FarmerHomeTab"
        component={FarmerStackHome}
        options={{
          tabBarLabel: t("farmer_tabs.home"),
          tabBarIcon: ({ focused }) => (
            <Image
              source={Images.Home}
              style={[
                styles.iconLarge,
                { tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* MARKETPLACE */}
      <Tab.Screen
        name="FarmerMarketTab"
        component={FarmerStackMarket}
        options={{
          tabBarLabel: t("farmer_tabs.marketplace"),
          tabBarIcon: ({ focused }) => (
            <Image
              source={Images.Market}
              style={[
                styles.icon,
                { tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* LISTINGS */}
      <Tab.Screen
        name="FarmerListingTab"
        component={FarmerStackListing}
        options={{
          tabBarLabel: t("farmer_tabs.listings"),
          tabBarIcon: ({ focused }) => (
            <Image
              source={Images.Listings}
              style={[
                styles.icon,
                { tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="FarmerProfileTab"
        component={FarmerStackProfile}
        options={{
          tabBarLabel: t("farmer_tabs.profile"),
          tabBarIcon: ({ focused }) => (
            <Image
              source={Images.Login}
              style={[
                styles.icon,
                { tintColor: focused ? ACTIVE_COLOR : INACTIVE_COLOR },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabfarmer;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  icon: {
    width: 28,
    height: 28,
  },
  iconLarge: {
    width: 36,
    height: 36,
  },
});
