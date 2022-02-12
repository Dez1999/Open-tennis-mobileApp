import React from 'react';
import {
    StatusBar, 
    View, 
    Dimensions
}
from "react-native";

//Imports
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';

//Import Profile Screens 
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileEdit from '../screens/profile/ProfileEdit';

//Import Facility Screens
import FacilityScreen from '../screens/facilities/FacilityScreen';
import FacilityCreate from '../screens/facilities/FacilityCreate';
import FacilityIndividual from '../screens/facilities/FacilityIndividual';
import FacilityEdit from '../screens/facilities/FacilityEdit';

//Import Device Screens
import DeviceCreate from '../screens/devices/DeviceCreate';
import DeviceIndividual from '../screens/devices/DeviceIndividual';
import DeviceEdit from '../screens/devices/DeviceEdit';

//Import Home Screen
import HomeMan from '../screens/home/HomeScreen';

//Navigation Imports
import { createStackNavigator } from '@react-navigation/stack';
//import 'react-native-gesture-handler'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Stacks
const FacilityStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const HomeManagerStack = createStackNavigator();

//Create Bottom Tab Navigator
const Tab = createMaterialBottomTabNavigator();



//Bottom Tab Navigation

const ManagerTabScreen = () => (

    <Tab.Navigator
      initialRouteName="HomeManager_Screen"
      activeColor="#2D0C57" 
      inactiveColor = "#ffffff"
      shifting = {true}
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
        name="Facility_Screen"
        component={FacilityStackScreen}
        options={{
          tabBarLabel: 'Facilities',
          tabBarIcon: ({ color }) => (
            <Icon name="folder" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeManager_Screen"
        component={HomeManagerStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile_Screen"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>

)




const FacilityStackScreen = ({navigator}) => (
    <FacilityStack.Navigator screenOptions={{
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
           <FacilityStack.Screen name = "FacilityScreen_Page" component ={FacilityScreen} options={{
             headerShown:false, 
            }}/>
            <FacilityStack.Screen name = "FacilityIndividual_Page" component ={FacilityIndividual} options={{
             headerShown:false, 
            }}/>
            <FacilityStack.Screen name = "FacilityEdit_Page" component ={FacilityEdit} options={{
             headerShown:false, 
            }}/>
            <FacilityStack.Screen name = "FacilityCreate_Page" component ={FacilityCreate} options={{
             headerShown:false, 
            }}/>
            <FacilityStack.Screen name = "DeviceIndividual_Page" component ={DeviceIndividual} options={{
             headerShown:false, 
            }}/>
            <FacilityStack.Screen name = "DeviceCreate_Page" component ={DeviceCreate} options={{
             headerShown:false, 
            }}/>
            <FacilityStack.Screen name = "DeviceEdit_Page" component ={DeviceEdit} options={{
             headerShown:false, 
            }}/>

    </FacilityStack.Navigator>
    );



    const ProfileStackScreen = ({navigator}) => (
        <ProfileStack.Navigator screenOptions={{
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
               <ProfileStack.Screen name = "Profile_Page" component ={ProfileScreen} options={{
                 headerShown:false, 
                }}/>
                <ProfileStack.Screen name = "ProfileEdit_Page" component ={ProfileEdit} options={{
                 headerShown:false, 
                }}/>

        </ProfileStack.Navigator>
        );


    const HomeManagerStackScreen = ({navigator}) => (
        <HomeManagerStack.Navigator screenOptions={{
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
               <HomeManagerStack.Screen name = "HomeManager_Page" component ={HomeMan} options={{
                 headerShown:false, 
                }}/>

        </HomeManagerStack.Navigator>
        );

export default ManagerTabScreen;


