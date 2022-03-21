//import AsyncStorage from '@react-native-community/async-storage';
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
import InfoOccupancyStatus from '../../components/InfoOccupancyStatus';

//Icon imports
import Icon from 'react-native-vector-icons/FontAwesome';

//Indvidual phone heights and widths
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const AboutScreen = ({navigation}) => {

  return (              
            <View style ={styles.container}>
                    <View style = {styles.topContent}>
                        <Icon.Button
                            name="arrow-left"
                            color='black'
                            size={35}
                            backgroundColor="white"
                            onPress={() => navigation.goBack()}
                            >
                                    
                        </Icon.Button>

                      <Text style={styles.pageText}>ABOUT</Text>
                      <Text style={styles.pageText}></Text>

                    </View>
                    
                    <View style = {styles.containerTitle}>
                      <Text style={styles.titleText}>Occupancy Status Info</Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <InfoOccupancyStatus circleSize={70} color={'#28B625'} description={'The Facility has an occupancy status of Free'}/>
                      <InfoOccupancyStatus circleSize={70} color={'#F9B70F'} description={'The Facility has an occupancy status of Moderately Occupied'}/>
                      <InfoOccupancyStatus circleSize={70} color={'#D32E2E'} description={'The Facility has an occupancy status of Busy'}/>
                      <InfoOccupancyStatus circleSize={70} color={'#696A6D'} description={'The Facility is currently not displaying the occupancy status'}/>
                    </View>

                    
            </View>
    
  );
 }





const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FFFFFF",
      padding: 5,
      width: windowWidth, 
      height: windowHeight
    },  
    containerSecondayr: {
      flexDirection: 'column',
    },

    topContent: {
      flexDirection: 'row',
      padding: 5, 
      justifyContent: 'space-between',
 
     },

    containerTitle: {
      flexDirection: 'row',
      padding: 5, 
      marginTop: 10,
      justifyContent: 'space-between',
    },

    contentContainer: {
      justifyContent: 'space-between',
      padding: 35, 
    },

    statusContainer: {
      marginTop: 5


    },

    titleText: {
      textAlign: 'left',
      paddingLeft: 5,
      fontSize: 18,
      fontWeight : 'bold',

    },

    pageText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 23,
      paddingLeft: 13
      
    }, 

    

   
  });



export default AboutScreen;
