import React from 'react';
import {StatusBar, View, Dimensions} from "react-native";
//Icons imports
import Icon from 'react-native-vector-icons/FontAwesome';

//Bottotm tabs Navigator
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Main Screens
import HomeScreen from '../../screens/Home/HomeScreen';
import AboutScreen from '../../screens/About/AboutScreen';

import FavouritesScreen from '../../screens/Favourites/FavouritesScreen';
import AnalyticsScreen from '../../screens/Analytics/AnalyticsScreen';

import SearchScreen from '../../screens/Search/SearchScreen';

import AccountScreen from '../../screens/Account/AccountScreen';
import LocationScreen from '../../screens/Account/LocationScreen';
import FeedbackScreen from '../../screens/Account/FeedbackScreen';
import NotificationsScreen from '../../screens/Account/NotificationsScreen';


import { createStackNavigator } from '@react-navigation/stack';

const SearchStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const FavouriteStack = createStackNavigator();


//Navigation imports
import 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();

//Bottom Tab Navigation
const MainTabScreen = () => (

    <Tab.Navigator
      initialRouteName="HomePage"
      activeColor="#2D0C57" 
      inactiveColor = "#ffffff"
      barStyle={{ backgroundColor: '#3ECD4C'}}
      tabBarOptions={{
        tabBarHideOnKeyboard: true, 
        style: { position: 'absolute' }, 
        sceneAnimationEnabled: false, 
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }
     }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Icon name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavouritesTab"
        component={FavoutiteStackScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color }) => (
            <Icon name="star" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={AccountStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>

)

export default MainTabScreen;


//Search Stack
const SearchStackScreen = ({navigator}) => (
  <SearchStack.Navigator screenOptions={{
        headerShown: true,
        headerTransparent:true,
        headerStyle: {
          backgroundColor: '#3ECD4C',
        }, 
        headerTintColor: '#3ECD4C',
        headerTitleStyle: {
          fontWeight: 'bold'
        },

  }}>
         <SearchStack.Screen name = "Search" component ={SearchScreen} options={{
           headerShown:false, 
          }}/>
          <FavouriteStack.Screen name = "Analytics" component ={AnalyticsScreen} options={{
             headerShown:false, 
            }}/>
  
  </SearchStack.Navigator>
  );

  //Favourites Stack
  const FavoutiteStackScreen = ({navigator}) => (
    <FavouriteStack.Navigator screenOptions={{
          headerShown: true,
          headerTransparent:true,
          headerStyle: {
            backgroundColor: '#3ECD4C',
          }, 
          headerTintColor: '#3ECD4C',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
  
    }}>
           <FavouriteStack.Screen name = "Favourite" component ={FavouritesScreen} options={{
             headerShown:false, 
            }}/>
            <FavouriteStack.Screen name = "Analytics" component ={AnalyticsScreen} options={{
             headerShown:false, 
            }}/>
    
    </FavouriteStack.Navigator>
    );


 


//Home Stack
const HomeStackScreen = ({navigator}) => (
<HomeStack.Navigator screenOptions={{
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
       <HomeStack.Screen name = "Home" component ={HomeScreen} options={{
         headerShown:false, 
         title: 'Open Tennis'}}/>
        <HomeStack.Screen name = "About" component ={AboutScreen} options={{
         headerShown:false, 
         title: 'Open Tennis'}}/>
</HomeStack.Navigator>
);





//Secondary Stack Screens
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

