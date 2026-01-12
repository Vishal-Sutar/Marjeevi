import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import Splashscreen from '../common/reusableComponent/Spalshscreen';
import BindAuth from '../screens/Auth/BindAuth';
import BindUser from '../screens/Auth/BindUser';

enableScreens(true); // REQUIRED for RN 0.83

const Stack = createNativeStackNavigator();

const Route = () => {
  const { userData } = useSelector((state) => state.auth);

  // console.log(userData)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
  
        {isLoading ? (
         <Splashscreen/>
        ) : userData == null ? (
         <BindAuth/>
        ) : (
          <BindUser />
        )}
     
    </>
  );
};

export default Route;

const styles = StyleSheet.create({});
