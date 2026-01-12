import React, { useEffect } from 'react';
import {
  LogBox,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Route from './src/Route/Route';
import Splashscreen from './src/common/reusableComponent/Spalshscreen';
import { persistor, store } from './src/Redux/store';
import { LanguageProvider } from "./src/context/LanguageProvider";
import "./src/i18n";
import { NavigationContainer } from '@react-navigation/native';

const AppContent = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={false}
      />

      <Route />
    </SafeAreaView>
  );
};

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Splashscreen />} persistor={persistor}>
        <SafeAreaProvider>
           <NavigationContainer>
          <AppContent />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
