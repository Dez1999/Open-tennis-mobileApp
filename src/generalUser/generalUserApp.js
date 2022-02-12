import React from 'react';
import {
    Text, 
    View, 
    StatusBar, 
} from 'react-native';

//Screen Imports
import AboutScreen from './screens/About/AboutScreen';

import AccountScreen from './screens/Account/AccountScreen';
import LocationScreen from './screens/Account/LocationScreen';
import FeedbackScreen from './screens/Account/FeedbackScreen';
import NotificationsScreen from './screens/Account/NotificationsScreen';

import AnalyticsScreen from './screens/Analytics/AnalyticsScreen';

import FavouritesScreen from './screens/Favourites/FavouritesScreen';

import HomeScreen from './screens/Home/HomeScreen';

import SigninDemo from './screens/Login/SigninDemo';
import SignupDemo from './screens/Registration/SignupDemo';

import SearchScreen from './screens/Search/SearchScreen';
import MainTabScreen from './Navigation/MainTabs/MainTabScreen';


//Drawer navigator
//import { createDrawerNavigator } from '@react-navigation/drawer';
//import DrawerSectionNav from './Navigation/Drawer/DrawerSection';


//const Drawer = createDrawerNavigator();


const GeneralUserApp = () => {
    return(
        <MainTabScreen/>
    )
}

export default GeneralUserApp;





//Account Stack Screen
const AccountStackScreen = ({navigator}) => (
    <AccountStack.Navigator screenOptions={{
          headerShown: true,
          headerTransparent:true,
          headerStyle: {
            backgroundColor: '#3ECD4C',
          }, 
          headerTintColor: '#3ECD4C',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
    }}>
           <AccountStack.Screen name = "Account" component ={AccountScreen} options={{
             headerShown:false, 
            }}/>
            <AccountStack.Screen name = "Location" component ={LocationScreen} options={{
             headerShown:false, 
            }}/>
            <AccountStack.Screen name = "Notification" component ={NotificationsScreen} options={{
             headerShown:false, 
            }}/>
            <AccountStack.Screen name = "Feedback" component ={FeedbackScreen} options={{
             headerShown:false, 
            }}/>
    </AccountStack.Navigator>
  );
  
  //About Stack Screen
  const AboutStackScreen = ({navigator}) => (
    <AboutStack.Navigator screenOptions={{
          headerShown: true,
          headerTransparent:true,
          headerStyle: {
            backgroundColor: '#3ECD4C',
          }, 
          headerTintColor: '#3ECD4C',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
    }}>
           <AboutStack.Screen name = "About" component ={AboutScreen} options={{
             headerShown:false, 
            }}/>
    </AboutStack.Navigator>
  );