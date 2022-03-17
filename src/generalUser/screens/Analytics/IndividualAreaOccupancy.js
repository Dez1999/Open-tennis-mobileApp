import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    FlatList, 
} from 'react-native';
import {useState, useEffect} from "react";

//Main imports
import Icon from 'react-native-vector-icons/FontAwesome';
import IndOccupancyStatus from './IndOccupancyStatus';
import calculateOccupancyInd from '../../utils/calculateOccupancyInd'; //Used to calculate if Area is Free or Busy
import convertArrayToFlat from '../../utils/convertArrayToFlat';
import getImageTypeFacility from '../../utils/getImageTypeFacility';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 
let image = "";

const IndividualAreaOccupancy =(props) => {
  let status = props.OccupancyStatus;
  let occupancyListMain = props.currOccupancyList;
  let occupancyList = [0,4,0,0];
  let deviceType = props.targetDevice;
  const [occupancyListData, setOccupancyData] = useState([]);
  const [targetDevice, setTargetDevice] = useState("");



  useEffect(() => {
    console.log("Occupancy List: " + occupancyListMain);
    setTargetDevice(props.targetDevice);
    console.log("Target Device (Inidvidual):" + props.targetDevice);
    setOccupancyData(props.currOccupancyList);
  }, [])
  

  const item = ({item}) => {
    return (
        <View style={{flexDirection:'column', justifyContent:'center', padding: 5, backgroundColor: '#E2F1DB'}}>
            
                <ImageBackground source={image} style={styles.backgroundImage}>
                    <IndOccupancyStatus OccupancyStatus= {calculateOccupancyInd(item)}></IndOccupancyStatus> 
                </ImageBackground>

            <View style={styles.dataField}>
                <Text style ={styles.rowText}>Count: {item}</Text>
            </View>
        </View>
    )
}

  if(props.targetDevice == "ANY"){
    return (
        <View style={styles.unavailableContent}>
          <Text style={styles.unavailableText}>This Facility is unavailable for Occupancy Tracking</Text>
        </View>
    )
  }

  

  //Convert List into individual data points
  const flatOccupancyList = convertArrayToFlat(occupancyListMain);

  //Get correct Image for deviceType
  image = getImageTypeFacility(deviceType);





  return (
          <View style = {styles.mainContainer}>
            <Text style={{textAlign: 'left', color: '#0B5B13', fontSize: 17, fontWeight: 'bold', padding: 10}}>REAL-TIME OCCUPANCY</Text>
            <View style ={styles.container}>
                  <FlatList
                    numColumns={3} 
                    columnWrapperStyle={styles.row}
                    nestedScrollEnabled
                    data = {flatOccupancyList}
                    renderItem={item}
                    keyExtractor={(item, index) => index.toString()}
                        >
                   </FlatList>
                
            </View>
            </View>
    
  );


}
const styles = StyleSheet.create({
    container : {
      alignItems: 'center', 
      justifyContent: 'flex-start', 

    },  
    mainContainer: {
      marginTop: 20

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

    }, 
    backgroundImage: {
        height: '100%',
        justifyContent: 'center', 
  
      },
      image: {
        flex: 1,
        justifyContent: "center"
      },
      row: {
        flex: 1,
        justifyContent: "space-around", 
    }, 
    backgroundImage: {
        resizeMode: 'cover', // or 'stretch'
        height: 200, 
        width: 100
      }, 
    rowText:{
        width: '100%', 
        textAlign: 'center', 
        color: 'black'
    },
    dataField: { 
        backgroundColor:'white', 
        bordercolor: 'black', 
        borderWidth: 2, 
      }, 
    imageContent: {
        height: 200, 
        width: 100, 
    }, 
    unavailableContent: {
      justifyContent: 'center',
      marginTop: '30%'

    }, 
    unavailableText: {
      textAlign: 'center', 
      fontWeight: 'bold', 
      fontSize: 20, 
      color: 'red'
    }

  });



export default IndividualAreaOccupancy;
