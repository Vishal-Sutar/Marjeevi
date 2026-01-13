import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FarmerHome from './farmerScreen/FarmerHome';
import MarketPlace from './farmerScreen/MarketPlace';
import MyListing from './farmerScreen/MyListing';
import FarmerProfile from './farmerScreen/FarmerProfile';
import Documents from './farmerScreen/Documents';
import CreateListing from './farmerScreen/CreateListing';
import ScreenOne from './FarmerProfile/ScreenOne';
import ScreenSecond from './FarmerProfile/ScreenSecond';
import ScreenThird from './FarmerProfile/ScreenThird';
import ScreenFourth from './FarmerProfile/ScreenFourth';
import MyFarms from './farmerScreen/MyFarms ';

const Stack = createNativeStackNavigator();

// ✅ define color (or import if you already have it)
const colorPrimary = '#2E7D32';

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colorPrimary} />
  </View>
);

export const FarmerStackHome = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={FarmerHome} />
        <Stack.Screen name="Documents" component={Documents} />
        <Stack.Screen name="MyFarms" component={MyFarms} />
        <Stack.Screen name="CreateListing" component={CreateListing} />
        <Stack.Screen name="FarmerProfile" component={FarmerProfile} />
        <Stack.Screen name="PersonalDetails" component={ScreenOne} />
        <Stack.Screen name="AddressDetails" component={ScreenSecond} />
        <Stack.Screen name="FarmerCategory" component={ScreenThird} />
        <Stack.Screen name="CropsGrown" component={ScreenFourth} />
      </Stack.Navigator>
    </Suspense>
  );
};

export const FarmerStackMarket = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MarketPlace" component={MarketPlace} />
      </Stack.Navigator>
    </Suspense>
  );
};

export const FarmerStackListing = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyListing" component={MyListing} />
        <Stack.Screen name="CreateListing" component={CreateListing} />
      </Stack.Navigator>
    </Suspense>
  );
};

export const FarmerStackProfile = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FarmerProfile" component={FarmerProfile} />
        <Stack.Screen name="PersonalDetails" component={ScreenOne} />
        <Stack.Screen name="AddressDetails" component={ScreenSecond} />
        <Stack.Screen name="FarmerCategory" component={ScreenThird} />
        <Stack.Screen name="CropsGrown" component={ScreenFourth} />
      </Stack.Navigator>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
