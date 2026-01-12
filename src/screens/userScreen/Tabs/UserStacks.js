import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../TabScreen/Home'
import Profile from '../TabScreen/Profile'
import Visits from '../TabScreen/Visits'
import Performance from '../TabScreen/Performance'
import Stock from '../TabScreen/Stock'
import HomeSecond from "../TabScreen/HomeSecond"


const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colorPrimary} />
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
            <Stack.Screen name="HomeSecond" component={HomeSecond} />
          
     
     
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


export const UserStackStock = () => {

  return (

    <Suspense fallback={<LoadingIndicator />}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
    
            <Stack.Screen name="Stock" component={Stock} />
          
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
          
            {/* <Stack.Screen name="PropertyListDetail" component={PropertyListDetail} /> */}
     
     
    </Stack.Navigator>
    </Suspense>
  );
};

