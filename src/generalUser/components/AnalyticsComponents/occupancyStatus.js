import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
} from 'react-native';

//Main imports
import Icon from 'react-native-vector-icons/FontAwesome';
import getFacilityOccupancyColor from '../../utils/getFacilityOccupancyColor';


const OccupancyStatus =(props) => {
  let status = props.OccupancyStatus;

  return (
            <View style ={styles.container}>
               <Icon 
                    name="circle"
                    size={75} 
                    color= {getFacilityOccupancyColor(status)}/>
                <View style= {styles.statusContent}>
                    <Text style={styles.mainText}>OCCUPANCY STATUS: </Text>
                    <Text style={styles.statusText} >{status}</Text>
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
        fontWeight : '400',
        paddingVertical : 12,
        color: 'black'
    }, 

    statusText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 18,
        fontWeight : 'bold',
        paddingVertical : 12,
        color: 'black'

    }
  });



export default OccupancyStatus;
