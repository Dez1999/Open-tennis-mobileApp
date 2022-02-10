import React from 'react';

//Navigation Imports
import { createStackNavigator } from '@react-navigation/stack';
import SigninDemo from '../../generalUser/screens/Login/SigninDemo';
import SignupDemo from '../../generalUser/screens/Registration/SignupDemo';

//Stacks
const CoreStack = createStackNavigator();


 //Logged out of app screens : login and signup screens
 const CoreStackScreen = ({navigator}) => (
    <CoreStack.Navigator screenOptions={{
          headerShown: false,
          headerTransparent:true,
          headerStyle: {
            backgroundColor: '#3ECD4C',
          }, 
          headerTintColor: '#3ECD4C',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
    }}>
           <CoreStack.Screen name = "SignInDemo" component ={SigninDemo} options={{
             headerShown:false, 
            }}/>
            <CoreStack.Screen name = "SignUpDemo" component ={SignupDemo} options={{
             headerShown:false, 
            }}/>
            
    </CoreStack.Navigator>
  );


  export default CoreStackScreen;