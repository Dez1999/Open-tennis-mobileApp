import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Dimensions,TouchableOpacity,
Button,Alert,Image,ImageBackground,StatusBar} from 'react-native';

import Logo from '../../components/Logo';
import { AuthContext } from '../../../sharedComponents/Context/Context';


const SignupDemo = ({navigation}) => {
    const [data, setData] = React.useState ({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true


    });

    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data, 
                username: val, 
                check_textInputChange: true

            })
        } else {
            setData({
                ...data, 
                username: val, 
                check_textInputChange: false

            })
        }
    }

    const handlePasswordChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data, 
                password: val, 
                check_textInputChange: true

            })
        } else {
            setData({
                ...data, 
                password: val, 
                check_textInputChange: false

            })
        }
    }

    const handleFirstnameChange = (val) => {
      if (val.length != 0) {
          setData({
              ...data, 
              firstname: val, 
              check_textInputChange: true

          })
      } else {
          setData({
              ...data, 
              firstname: val, 
              check_textInputChange: false

          })
      }
   }

   const handleLastnameChange = (val) => {
    if (val.length != 0) {
        setData({
            ...data, 
            lastname: val, 
            check_textInputChange: true

        })
    } else {
        setData({
            ...data, 
            lastname: val, 
            check_textInputChange: false

        })
    }
 }


  return (
    <View style ={styles.container}>
                <Logo title= 'Welcome to Open Tennis' marginTop={120} imageHeight={80} imageWidth={80}/>
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="First Name"
                        placeholderTextColor = '#000000'
                        onChangeText={(val) => handleFirstnameChange(val)}/>  
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="First Name"
                        placeholderTextColor = '#000000'
                        onChangeText={(val) => handleLastnameChange(val)}/>
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Email"
                        placeholderTextColor = '#000000'
                        onChangeText={(val) => textInputChange(val)}/>
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor = '#000000'
                        onChangeText={(val) => handlePasswordChange(val)}/>
                    <TouchableOpacity 
                        //onPress={() => this.onClickListener('sign_in')}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>

  
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('SignInDemo')}
                    style={{
                        backgroundColor: "#FDF9F6", 
                        padding: 1, 
                        width:'30%', 
                        borderRadius: 5, 
                        }}>
                        <Text style= {{fontSize: 16, color:'#3E4982', fontWeight: 'bold'}}> Sign In Here</Text>
  
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
        marginVertical:5
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



export default SignupDemo;
