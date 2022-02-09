/**
 * Open Tennis Application
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import ManagerApp from './src/managerUser/managerApp';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
//import 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

import ManagerTabScreen from './src/managerUser/navigation/managerNav';



const App = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <StatusBar barStyle={'light-content'} />
            <ManagerApp/>
      </NavigationContainer>
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 5,
    paddingHorizontal: 5,
  },

});

export default App;
