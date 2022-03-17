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

//Imports
import Icon from 'react-native-vector-icons/FontAwesome';
import getOccupancyColorInd from '../../utils/getOccupancyColorInd';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const IndOccupancyStatus =(props) => {
  let status = props.OccupancyStatus;

  return (
            <View style ={styles.container}>
               <Icon 
                    name="circle"
                    size={75} 
                    color= {getOccupancyColorInd(status)}/>              
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
