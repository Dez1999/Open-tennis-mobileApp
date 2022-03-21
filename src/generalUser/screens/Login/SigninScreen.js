import React, {Component, useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Dimensions,TouchableOpacity,
Button,Alert,Image,ImageBackground,StatusBar} from 'react-native';

import Logo from '../../components/Logo';
import { AuthContext } from '../../../sharedComponents/Context/Context';


const SigninDemo = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


     //Method: AuthContext method that is called from main app to sign the user into the app
    const { signIn } = React.useContext(AuthContext);


    //Method: Handles the user's username and password to sign into the app
    const loginHandle = () => {
        //signIn(username,  password);
        console.log("---------------Log in Attempt --------------- \n"); 
        console.log("Credentials: username: " + username + ", password: " + password);
        if (username.trim()!=="" && password.trim()!==""){
            console.log("No Missing Credentials: username: " + username + ", password: " + password);
            signIn(username, password);
        }else {
            console.log("Missing Credentials: username: " + username + ", password: " + password);
                Alert.alert(
                    "Missing Credentials",
                    "Please enter all necessary information",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
            }          
    }


  return (
    <View style ={styles.container}>
                <Logo title= 'Welcome to Open Tennis' marginTop={105} imageHeight={110} imageWidth={100}/>
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Email"
                        placeholderTextColor = '#000000'
                        onChangeText={(emailvalue) => setUsername(emailvalue)}/>
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor = '#000000'
                        onChangeText={(val) => setPassword(val)}/>
                    <TouchableOpacity 
                        onPress={() => {loginHandle(username, password)}}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

  
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('SignUpDemo')}
                    style={{
                        backgroundColor: "#FDF9F6", 
                        padding: 1, 
                        width:'30%', 
                        borderRadius: 5, 
                        }}>
                        <Text style= {{fontSize: 16, color:'#3E4982', fontWeight: 'bold'}}> Sign Up Here</Text>
  
                 </TouchableOpacity>
                </View>                
            </View>
    
  );
 }






const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    signupTextCont : {
        flexGrow:1, 
        alignItems: 'flex-end', 
        justifyContent:'center',
        paddingVertical: 16, 
        flexDirection: 'row',

    }, 
    signupText: {
        color:'rgba(0, 0, 0, 0.8)',
        fontSize:16
    }, 

    signupButton: {
        color:'#3E4982',
        fontSize:16,
        fontWeight:'bold'

    }, 
    inputBox: {
        width: 300,
        backgroundColor:'#E2F1DB', 
        borderRadius: 25, 
        paddingHorizontal: 16, 
        fontSize: 16,
        color:'#000000', 
        marginVertical:10
    },

    button: {
        width: 100,
        backgroundColor: '#3ECD4C',
        borderRadius: 25,
        marginVertical: 10, 
        paddingVertical: 12
    },

    buttonText: {
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#000000', 
        textAlign:'center'

    }
   
  });



export default SigninDemo;
