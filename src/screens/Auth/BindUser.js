import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TabStackuser from '../userScreen/Tabs/Stack';
import Tabfarmer from '../farmer/Tabfarmer'
import { getUserData } from '../../Redux/Storage';
import TabFPO from "../../screens/FPOScreen/TabFPO";

const BindUser = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      try {
        const user = await getUserData();
        console.log(user)
        setRole(user || 'staff'); // fallback
      } catch (error) {
        console.log('Error fetching role:', error);
        setRole('user');
      } finally {
        setLoading(false);
      }
    };

    getRole();
  }, []);

 
  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </SafeAreaView>
    );
  }

  // 🔹 Role based rendering
  const renderByRole = () => {
    switch (role) {
      case 'farmer':
        return <Tabfarmer />;
      case 'staff':
         return <TabStackuser />;
          case 'fpo':
      default:
          return <TabFPO />;
       
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderByRole()}
    </SafeAreaView>
  );
};

export default BindUser;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
