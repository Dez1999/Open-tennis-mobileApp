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

//Icon imports
import Icon from 'react-native-vector-icons/FontAwesome';

//Indvidual phone heights and widths
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const InfoOccupancyStatus = (props) => {
  return (              
     <View style = {styles.container}>
       <View style={styles.statusContainer}>
        <Icon 
            name="circle"
            size={props.circleSize} 
            color= {props.color}/>
         <View style={styles.textContainer}>
             <Text style={styles.itemText}>{props.description}</Text>
          </View>
       </View>
     </View>         
  );
 }





const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FFFFFF",
      marginLeft: 20, 
      marginRight: 20,
      marginBottom: 20

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

    statusContainer: {
      flexDirection: 'row',
      width: windowWidth,
 
     },

    textContainer: {
      flex: 1,
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center', 
      alignItems: 'center',

    }, 

    titleText: {
      textAlign: 'left',
      paddingLeft: 5,
      fontSize: 18,
      fontWeight : 'bold',

    },

    itemText: {
      textAlign: 'center',
      color: '#0B5B13',
      fontSize: 18,
      paddingLeft: 18, 
      paddingRight: 35
    }, 


   
  });



export default InfoOccupancyStatus;
