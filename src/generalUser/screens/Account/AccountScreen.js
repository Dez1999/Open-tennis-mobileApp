import AsyncStorage from '@react-native-community/async-storage';
import React, {Component, useEffect, useState} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    TouchableOpacity,
    TouchableHighlight,
    Alert, 
} from 'react-native';
//import {} from 'react-navigation';
import { AuthContext } from '../../../sharedComponents/Context/Context';
import Logo from '../../components/Logo';

//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Indvidual phone heights and widths
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const AccountScreen = ({navigation}) => {
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [testAppUserRole, setTestAppUserRole] = useState("");
  const [userDecision, setUserDecision] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const loginData = `username=${userName}&password=Occupancy2022`;


  let appUserUrl = "http://52.229.94.153:8080/appUser";
  let appFacilityUrl = "http://52.229.94.153:8080/facility";

  const { signOut } = React.useContext(AuthContext);

  const readUserName = async () => {
    try {
      const uName = await AsyncStorage.getItem('userName');
      setUserName(uName);
      const userRole = await AsyncStorage.getItem('userRole');
      setTestAppUserRole(userRole);

      const userDecision = await AsyncStorage.getItem('managerDecision');
      setUserDecision(userDecision);

  
    }catch (e) {
      console.log("Failed to retrieve userName");
    }
  }

  const readUserToken = async () => {
    try {
      const uToken = await AsyncStorage.getItem('userToken');
      setUserToken(uToken);
  
    }catch (e) {
      console.log("Failed to retrieve userToken");
    }
  }

  //Fetch user Info from database
  const getUserInfo = async () => {
    try{

      fetch(appUserUrl, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json, text/plain, */*, application/x-www-form-urlencoded',  // It can be used to overcome cors errors
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
        json: true,
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
          .then((resData) => {
            setFirstName(resData.firstName);
            setLastName(resData.lastName);
            //setAppUserRole(resData.appUserRole);
            setUserEmail(resData.email);
            console.log("User FirstName: " + resData.firstName);
            console.log("User LastName: " + resData.lastName);
            console.log("User Role: " + resData.appUserRole);
            console.log("User Email: " + resData.email);

          })
            .catch(error => {
              console.log(error);
              alert(error);
            })

    }catch (e) {
    console.log("Failed to GET user info from database")
    }

  }

   

  
//   useEffect(() => {
//     readUserName();
//     readUserToken();
 //    getUserInfo();
 //  }, [getUserInfo])

  return (              
            <View style ={styles.container}>
                    <View style = {styles.topContent}>
                    <Logo imageHeight={50} imageWidth={50}/> 
                      <TouchableOpacity
                              onPress={() => alert("Edit Screen")}
                              >
                              <Icon
                                name="edit"
                                color='black'
                                size={35}
                                >             
                              </Icon>
                      </TouchableOpacity>
                    </View>


                    <View style={styles.containerSecondary}> 
                      <Text style = {styles.userText}>{firstName} {lastName}</Text>  
                      <Text style = {styles.emailText}>{userEmail}</Text> 
                      <Text style = {styles.emailText}>Role: {testAppUserRole}</Text> 
                      <Text style = {styles.emailText}>Decision: {userDecision}</Text> 
                    </View>

                    <View style={styles.contentContainer} >
                     <View
                          style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                          }}
                        />
                      <TouchableHighlight style={styles.buttonContainer} activeOpacity={0.6} underlayColor="#FDF9F6"
                        onPress={() => navigation.navigate('Location')}>
                          <View style={styles.butHighContainer}>
                            <Ionicons 
                                  name="location"  
                                  size={35} 
                                  color= '#403ECD'/>
                            <Text style = {styles.itemText}>Location</Text> 
                          </View>
                      </TouchableHighlight>
                      <View
                          style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                          }}
                        />
                      <TouchableHighlight style={styles.buttonContainer} activeOpacity={0.6} underlayColor="#FDF9F6"
                        onPress={() => navigation.navigate('Notification')}>
                          <View style={styles.butHighContainer}>
                            <Ionicons 
                                  name="notifications"  
                                  size={35} 
                                  color= '#403ECD'/>    
                            <Text style = {styles.itemText}>Notifications</Text> 
                          </View>
                      </TouchableHighlight>
                      <View
                          style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                          }}
                        />
                      <TouchableHighlight style={styles.buttonContainer} activeOpacity={0.6} underlayColor="#FDF9F6"
                        onPress={() => navigation.navigate('Feedback')}>
                          <View style={styles.butHighContainer}>
                                <Icon
                                  name="comment"  
                                  size={35} 
                                  color= '#403ECD'/> 
                            <Text style = {styles.itemText}>Feedback</Text> 
                          </View>
                      </TouchableHighlight>
                      <View
                          style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                          }}
                        />
                      <TouchableHighlight style={styles.buttonContainer} activeOpacity={0.6} underlayColor="#FDF9F6"
                        onPress={() => {signOut()}}
                        >
                          <View style={styles.butHighContainer}>
                            <IconMat 
                                  name="logout-variant"
                                  size={35} 
                                  color= '#eb1428'/>
                            <Text style = {styles.logoutText}>Logout</Text> 
                          </View>
                      </TouchableHighlight>
                      <View
                          style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                          }}
                        />
                    </View>
                    
                    
            </View>
    
  );
 }





const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      padding: 5,
      width: windowWidth, 
      height: windowHeight
    },  
    containerSecondary: {
      flexDirection: 'column',
    },

    containerTitle: {
      justifyContent: 'center', 
      alignItems: 'center',
    },

    topContent: {
      flexDirection: 'row',
      padding: 5, 
      justifyContent: 'space-between',
 
     },

    contentContainer: {
      justifyContent: 'space-between',
      padding: 35, 
    },

    buttonContainer: {
      paddingVertical : 12, 
    },

    butHighContainer: {
      flexDirection: 'row',
      marginLeft: 3
    },

    mainText: {
        fontSize: 32,
        fontWeight : 'bold',
        paddingVertical : 6,
        color: 'black'
    }, 

    userText: {
      textAlign: 'left',
      paddingLeft: 15,
      fontSize: 24,
      fontWeight : 'bold',
      color: '#0B5B13'

    },

    emailText: {
      paddingLeft: 15, 
      color: "black",
      fontSize: 15
    },

    itemText: {
      color: 'black',
      fontSize: 23,
      paddingLeft: 13
      
    }, 

    logoutText: {
      color: '#eb1428', 
      fontSize: 23, 
      paddingLeft: 13
    }

   
  });



export default AccountScreen;
