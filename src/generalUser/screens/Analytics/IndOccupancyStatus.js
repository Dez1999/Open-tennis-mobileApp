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

const IndOccupancyStatus =(props) => {
  let status = props.OccupancyStatus;

  const getOccupancy = () => {
    if(status == 'FREE'){
      return '#28B625'
    }
    else if (status == 'BUSY'){
      return '#D32E2E'
    }
    else{
      return '#696A6D' // Not occupancy status
    }

  }

  return (
            <View style ={styles.container}>
               <Icon 
                    name="circle"
                    size={75} 
                    color= {getOccupancy()}/>              
            </View>
    
  );


}
const styles = StyleSheet.create({
    container : {
      alignItems: 'center', 
      justifyContent: 'center', 
      marginTop: '60%'

    },  
  });



export default IndOccupancyStatus;
