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
    FlatList
} from 'react-native';
import {useState, useEffect} from "react";

//Icon imports
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OccupancyStatus =(props) => {
  let status = props.OccupancyStatus;

  const getOccupancy = () => {
    if(status == 'Free'){
      return '#28B625'
    }
    else if (status == 'Busy'){
      return '#D32E2E'
    }
    else if (status == 'Avg'){
      return '#F9B70F'
    }
    else{
      return '#696A6D' // Not occupancy status
    }

  }


  const getOccupancyText = () => {
    if(status == 'Free'){
        return 'FREE'
      }
      else if (status == 'Busy'){
        return 'BUSY'
      }
      else if (status == 'Avg'){
        return 'MODERATELY BUSY'
      }
      else{
        return 'NOT AVAILABLE' // Not occupancy status
      }

  }
  return (
            <View style ={styles.container}>
               <Icon 
                    name="circle"
                    size={75} 
                    color= {getOccupancy('Free')}/>
                <View style= {styles.statusContent}>
                    <Text style={styles.mainText}>OCCUPANCY STATUS: </Text>
                    <Text style={styles.statusText} >{getOccupancyText()}</Text>
                </View>
                
              
            </View>
    
  );


}
const styles = StyleSheet.create({
    container : {
      paddingTop: 20,
      alignItems: 'center', 
      justifyContent: 'center', 

    },  

    statusContent: {
        flexDirection: 'row',
    },

    mainText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 16,
        fontWeight : '200',
        paddingVertical : 12,
        color: 'black'
    }, 

    statusText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 16,
        fontWeight : 'bold',
        paddingVertical : 12,
        color: 'black'

    }
  });



export default OccupancyStatus;
