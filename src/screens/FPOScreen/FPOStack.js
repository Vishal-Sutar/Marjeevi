import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from './FpoScreen/Home';
import Profile from './FpoScreen/Profile';
import Visits from './FpoScreen/Visits';
import Performance from './FpoScreen/Performance';
import Ledger from './FpoScreen/Ledger';
import FieldCropMapping from './FpoScreen/FieldCropMapping';
import SchemesSubsidies from './FpoScreen/SchemesSubsidies';


const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#2563EB" />
  </View>
);


export const UserStackHome = () => {
//   const BottomhomeTab = React.lazy(() => import('../TabScreen/Home'));
  return (

    <Suspense fallback={<LoadingIndicator />}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
    
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Ledger" component={Ledger} />
          
    </Stack.Navigator>
    </Suspense>
  );
};


export const UserStackVisit = () => {

  return (

    <Suspense fallback={<LoadingIndicator />}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
    
            <Stack.Screen name="Visits" component={Visits} />
          
            {/* <Stack.Screen name="PropertyListDetail" component={PropertyListDetail} /> */}
     
     
    </Stack.Navigator>
    </Suspense>
  );
};



export const UserStackPerformance = () => {

  return (

    <Suspense fallback={<LoadingIndicator />}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
    
            <Stack.Screen name="Performance" component={Performance} />
          
            {/* <Stack.Screen name="PropertyListDetail" component={PropertyListDetail} /> */}
     
     
    </Stack.Navigator>
    </Suspense>
  );
};



export const UserStackProfile= () => {

  return (

    <Suspense fallback={<LoadingIndicator />}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
    
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="FieldCropMapping" component={FieldCropMapping} />
            <Stack.Screen name="SchemesSubsidies" component={SchemesSubsidies} />
          
            {/* <Stack.Screen name="PropertyListDetail" component={PropertyListDetail} /> */}
     
     
    </Stack.Navigator>
    </Suspense>
  );
};

