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
import { BackgroundImage } from 'react-native-elements/dist/config';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FacilityPhotos =(props) => {
  let status = props.OccupancyStatus;



  useEffect = (() => {
      //Todo

  }), [];


  return (
            <BackgroundImage>

            </BackgroundImage>
    
  );


}
const styles = StyleSheet.create({
    container : {
      alignItems: 'center', 
      justifyContent: 'center', 
      marginTop: '60%'

    },  
    backgroundImage: {
        height: windowHeight/6
  
    },
  });



export default FacilityPhotos;
