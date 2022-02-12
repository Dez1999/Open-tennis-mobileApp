/**
 * Open Tennis Application
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//Import Screens
import ManagerApp from './src/managerUser/managerApp';
import GeneralUserApp from './src/generalUser/generalUserApp';
import CoreStackScreen from './src/sharedComponents/screens/Log_Reg_Screens';
import ManagerDecision from './src/managerUser/screens/managerDecision/managerDecision';

//Import Utilities
import {ActivityIndicator} from 'react-native-paper';
import Logo from './src/generalUser/components/Logo';

//Import Data Storing packages
import { AuthContext } from './src/sharedComponents/Context/Context';
import AsyncStorage from '@react-native-community/async-storage';

//Import Navigations
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';


//Login Authentication
var loginUrl = 'http://52.229.94.153:8080/login';
var userInfoUrl = 'http://52.229.94.153:8080/appUser';


const App = () => {
  const [userRole, setUserRole] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [usertoken, setUserToken] = React.useState(null);
  const [userFetchSuccess, setUserFetchSuccess] = React.useState(false);

  const initialLoginState = {
    isLoading:true,
    userName: null, 
    userToken: null,
    role: null,
    managerDecision: null,
  }

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN': //User has just opened up the app
        return{
          ...prevState, 
          userToken: action.token,
          managerDecision: action.managerDecision,
          role: action.role,
          isLoading: false,
        };
      case 'LOGIN':    //User has Logged in
        return{
          ...prevState,
          userName: action.id,
          role: action.role,
          userToken: action.token, 
          isLoading: false,
        };
      case 'LOGOUT':  //User has Logged out
        return{
          ...prevState,
          userName: null, 
          userToken: null, 
          role: null,
          isLoading: false,
          managerDecision: null
        };
      case 'REGISTER': //User has registered
        return{
          ...prevState,
          userName: action.id,
          userToken: action.token, 
          isLoading: false,

        };
      case 'MANAGERROLE': //User has selected manager role
        return{
          ...prevState,
          managerDecision: "MANAGER",
          isLoading: false,

        };

      case 'GENERALROLE': //User has selected general role
        return{
          ...prevState,
          managerDecision: "GENERAL",
          isLoading: false,

        };
    }
  };

   //Using Reducer for login State
   const[loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);




  //User Authentication 
  const authContext = React.useMemo(() => ({
    signIn: async(userName, passWord) => {

     const loginData = `username=${userName}&password=${passWord}`;
     setUsername(userName);



     //formData.delete('username');
     /*
     formData.append('username', userName);
     formData.append('password', passWord);
     console.log(formData.toString());
     */

     console.log(loginData);

     let userToken;
     userToken = null;

     
     let successful = false;
     console.log("Successful Variable before Fetch: " + successful);
     fetch(loginUrl, {
       method: 'POST', 
       headers: {
         'Accept': 'application/json, text/plain, */*, application/x-www-form-urlencoded',  // It can be used to overcome cors errors
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
       },
       credentials: 'include',
       body: loginData,
       json: true,
     })
     
     .then(response => {
           console.log(response);
           return response.json();
         })
       .then((resData) => {
         //console.log(re);
         //console.log(resData.headers.get('set-cookie'));
         //console.log(resData);

         //console.log(resData.message + ' Test 2' + resData.authentication); //Testing response from database server
         //if (resData.authentication === true) {
           //User exists
           //"JIDSession=" + response.headers.get('set-cookie')
           
         if (resData.authentication) {
             try{
               console.log("Message: " + resData.message + ', \nAuthentication: ' + resData.authentication);
               alert("Message: " + resData.message + ', \nAuthentication: ' + resData.authentication); //Testing response from database server
               //alert('Authentication Successful');

               successful = true;
               
               userToken = 'fakeToken';
               setUserToken(userToken);
               AsyncStorage.setItem('userToken', userToken);
               
               

             } catch(e){
               console.log(e);
               alert(e + "Catch 1");
             }
       
            }
         
         //}
         else {
           //user does not exists
           alert("User does not exists");
         }
       })
       .catch(error => {
           alert(error);
       })
       .done(()=>{
         //If user has successfully logged in then set token and relevant information in AsyncStorage
         console.log("Successful variable after Fetch: " + successful);
         if (successful) {
           try {
             setTimeout(
               function() {
                 fetchUser()
                   //AsyncStorage.setItem('userToken', userToken);
                   //dispatch({type: 'LOGIN', id:userName, token: userToken, role: userRole});
                   console.log("Username: " + loginState.userName + ", LoginState Role: " + loginState.role + ", Decision: " + loginState.managerDecision + ", User Token: " + loginState.userToken);

                   /*
                 //Store the userToken into AsyncStorage (global variable for whole app)
                   AsyncStorage.setItem('userToken', userToken); 
                   //AsyncStorage.setItem('userName', userName);
                   console.log('user token: ' , userToken);


                   
                   //Fetch user information
                   console.log('*****BEFORE FETCH USER******');
                   //const userFectch = await fetchUser();
                   //fetchUser();
                   
                   console.log('*****AFTER FETCH USER******');
                   dispatch({type: 'LOGIN', id:userName, token: userToken, role: userRole});
                   console.log("Username: " + loginState.userName + ", LoginState Role: " + loginState.role + ", Decision: " + loginState.managerDecision + ", User Token: " + loginState.userToken);
                   */

                 }
               .bind(this),
               500
             );
           //fetchUser();
           /*

           //Store the userToken into AsyncStorage (global variable for whole app)
           AsyncStorage.setItem('userToken', userToken); 
           //AsyncStorage.setItem('userName', userName);
           console.log('user token: ' , userToken);


           
           //Fetch user information
           console.log('*****BEFORE FETCH USER******');
           //const userFectch = await fetchUser();
           //fetchUser();
           
           console.log('*****AFTER FETCH USER******');
           dispatch({type: 'LOGIN', id:userName, token: userToken, role: userRole});
           console.log("Username: " + loginState.userName + ", LoginState Role: " + loginState.role + ", Decision: " + loginState.managerDecision + ", User Token: " + loginState.userToken);

           */

           // dispatch({type: 'LOGIN', id:userName, token: userToken, role: userRole});
           //console.log("Username: " + loginState.userName + ", LoginState Role: " + loginState.role + ", Decision: " + loginState.managerDecision);
           }catch (err){
             console.log("Login: " + err)
           }

         }
         

       
        });




      //setUserToken('ADGASDG');
      //setIsLoading(false);
      //*** This is where you POST to the database to get information
      /*
      if (userName == 'user1234' && passWord == 'pass') {
       try{
          userToken = 'fakeToken';
          await AsyncStorage.setItem('userToken', userToken)
          await AsyncStorage.setItem('userName', userName)

        } catch(e){
         console.log(e);
        }
       
      }

      let userRole = "Manager";      
      console.log('user token: ' , userToken);
      dispatch({type: 'LOGIN', id:userName, token: userToken, role: userRole});
      
      */
    }, 
    signOut: async() => {
      //setUserToken(null);
      //setIsLoading(false);
      console.log("Before Logged out, User Token: " + loginState.userToken + ", User decision: " + loginState.managerDecision);
      try{
       //Remove the userToken from AsyncStorage
       await AsyncStorage.removeItem('userToken');
       await AsyncStorage.removeItem('managerDecision');
       await AsyncStorage.removeItem('userRole');

      } catch(e){
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
      console.log("After Logged out, User Token: " + initialLoginState.userToken + ", User decision: " + initialLoginState.managerDecision);
    },
    signUp: () => {
      setUserToken('SDDASG');
      setIsLoading(false);
    },
    managerRole: async() => {
     let userDecisionStored;
     
     try{
       //Set manager decision in storage
       await AsyncStorage.setItem('managerDecision', "MANAGER");
       userDecisionStored = await AsyncStorage.getItem('managerDecision');


      } catch(e){
        console.log(e);
      }
     dispatch({type: 'MANAGERROLE'});
     console.log("Manager Role, Manager Role Chosen: " + initialLoginState.managerDecision);
     console.log("Manager Role, Manager Role Stored: " + userDecisionStored);
     

   },
    generalRole: async() => {
     let userDecisionStored;
     try{
       //Set manager decision in storage
       await AsyncStorage.setItem('managerDecision', "GENERAL");
       userDecisionStored = await AsyncStorage.getItem('managerDecision');

      } catch(e){
        console.log(e);
      }
     dispatch({type: 'GENERALROLE'});
     console.log("General Role, Manager role Chosen: " + initialLoginState.managerDecision);
     console.log("Manager Role, Manager Role Stored: " + userDecisionStored);
   },
    
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false);
      let userToken;
      let userRoleStored;
      let managerOption;
      userToken = null;
      //fetchUser();
      try{
       //Retrieve the userToken from AsyncStorage
       userToken = await AsyncStorage.getItem('userToken');

       //Retrieve User role
       userRoleStored = await AsyncStorage.getItem('userRole');


       //Retrieve User Decision
       managerOption = await AsyncStorage.getItem('managerDecision');

      } catch(e){
        console.log(e);
      }
      console.log('user token: ' , userToken);
      console.log('User Role: ' + userRoleStored + "  Manager Decision: " + managerOption);
      dispatch({type: 'RETRIEVE_TOKEN', token: "Hey", managerDecision: managerOption, role: "MANAGER"});
      
    }, 1000);
  }, []);


  if (loginState.isLoading) {
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator color='#3ECD4C' size= "large" animating={true}/>
      </View>

    );
  }

 




  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
            <StatusBar barStyle={'light-content'} />
              {(() => {
                if (loginState.userToken != null){
                  //User is a Manager and needs to make a decision to where they want to go
                  if(loginState.role == 'MANAGER' && (loginState.managerDecision == null)) {
                      return (
                         <ManagerDecision/>
                     )
                  }
                  //Manager User decides to go to Manager App
                  else if (loginState.role == "MANAGER" && loginState.managerDecision == "MANAGER"){
                    return (
                      <ManagerApp/>
                     )
                  }
                   //Otherwise bring user to General app
                  return <GeneralUserApp/>

                }
                //Login and registration
                return <CoreStackScreen/>;
              })()}
               
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>

  );
};




{(() => {
  //Check if user is logged in
  if(loginState.userToken != null) {

     //User is a Manager and needs to make a decision to where they want to go
     if(loginState.role == 'MANAGER' && (loginState.managerDecision == null)) {
         return (
           <View><Text>Manager Decision</Text></View>
         )
     }
     //Manager User decides to go to Manager App
     else if (loginState.role == "MANAGER" && loginState.managerDecision == "MANAGER"){
         return (
           <ManagerApp/>
         )
     }
     //Otherwise bring user to General app
     else {
         return (
           <GeneralUserApp/>
         )
     }
  }
  //User is not logged in
  else {
    <CoreStackScreen/>
  }

})}



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 5,
    paddingHorizontal: 5,
  },

});

export default App;
