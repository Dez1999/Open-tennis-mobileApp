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

const App = () => {

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
        <View style={styles.sectionContainer}>
          <ManagerApp/>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 5,
    paddingHorizontal: 5,
  },

});

export default App;
