import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    TouchableOpacity, 
    Statusbar
} from 'react-native';
//import {} from 'react-navigation';

import Logo from '../../components/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen =({navigation}) => {
   const [top, setTop] = React.useState(true);

  return (
            <View style ={styles.container}>
                <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    
                    <Logo title='Open Tennis' marginTop={20} imageHeight={110} imageWidth={100}/> 
                    <Text style = {styles.mainText}>{'Privacy Preserving Public Tennis Court \n Occupancy Tracking System for the \n City of Ottawa'}</Text>
                    <TouchableOpacity style={styles.aboutButton}
                    onPress={() => navigation.navigate('About')}
                    >
                         <Text style={styles.aboutButtonText}>ABOUT</Text>
                    </TouchableOpacity>

                    <ImageBackground
                        source = {require('../../images/tennisCourtBackground.jpg')}
                        style = {styles.backgroundStyle} >
                    </ImageBackground>    
                </SafeAreaView>  
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

    signupButton: {
        color:'#3E4982',
        fontSize:16,
        fontWeight:'bold'

    }, 

    mainText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 18,
        fontWeight : 'bold',
        paddingVertical : 12,
        color: 'black'
    }, 

    backgroundStyle: {
        flex:6, 
        justifyContent: 'center',
        alignItems: 'center',
        height: (Dimensions.get('window').height *0.7),
        width: Dimensions.get('window').width,
    }, 
    aboutButton: {
        width: 100,
        borderRadius: 25,
        marginVertical: 5, 
        paddingVertical: 1, 
    },

    aboutButtonText: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#1E1862', 
        textAlign:'center', 
        textDecorationLine: 'underline'
    }, 

    button: {
        width: 300,
        backgroundColor: '#3ECD4C',
        borderRadius: 10,
        marginVertical: 20, 
        marginTop: 160,
        paddingVertical: 17
    },

    buttonText: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#FFFFFF', 
        textAlign:'center', 
        

    }
   
  });



export default HomeScreen;
