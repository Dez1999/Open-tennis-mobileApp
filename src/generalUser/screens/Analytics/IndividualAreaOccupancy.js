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
    FlatList, 
    BackgroundImage, 
    Image
} from 'react-native';
import {useState, useEffect} from "react";

//Icon imports
import Icon from 'react-native-vector-icons/FontAwesome';
import IndOccupancyStatus from './IndOccupancyStatus';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Import Images
const swimmingType = require('../../images/swimming_area.jpg');
const tennisType = require('../../images/tennis-court-dimensions.jpg');
const basketballType = require('../../images/Basketball-court.png');
 
let image = "";

const IndividualAreaOccupancy =(props) => {
  let status = props.OccupancyStatus;
  let occupancyListTest = props.currOccupancyList;
  let occupancyList = [0,4,0,0];
  let deviceType = props.targetDevice;
  const [occupancyListData, setOccupancyData] = useState([]);
  const [occupancyStatusReal, setOccupancuStatus] = useState("");
  const [targetDevice, setTargetDevice] = useState("");



  useEffect(() => {
    console.log("Occupancy List: " + occupancyListTest);
    setTargetDevice(props.targetDevice);
    console.log("Target Device (Inidvidual):" + props.targetDevice);
    setOccupancyData(props.currOccupancyList);
  }, [])
  




  calculateOccupancy = (item) => {
      if (item > 0){
          return "BUSY"
      }
      else {
          return "FREE"
      }
  }

  const item = ({item}) => {
    return (
        <View style={{flexDirection:'column', justifyContent:'center', padding: 5, backgroundColor: '#E2F1DB'}}>
            {/* <ImageBackground source={image} resizeMode="cover">
                <Text style={styles.text}>Inside</Text>
            </ImageBackground> */}
            
                <ImageBackground source={image} style={styles.backgroundImage}>
                    <IndOccupancyStatus OccupancyStatus= {calculateOccupancy(item)}></IndOccupancyStatus> 
                </ImageBackground>

            <View style={styles.dataField}>
                {/* <BackgroundImage source = {image} style={styles.backgroundImage}/> */}
                <Text style ={styles.rowText}>Count: {item}</Text>
            </View>
        </View>
    )
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

  if(props.targetDevice == "ANY"){
    return (
        <View style={styles.unavailableContent}>
          <Text style={styles.unavailableText}>This Facility is unavailable for Occupancy Tracking</Text>
        </View>
    )
  }

  //Convert List into individual data points
  const arr = occupancyListTest;
  console.log(arr);
  // To flat single level array
  const flatOccupancyList = arr.reduce((acc, val) => {
    return acc.concat(val)
  }, []);
  console.log(flatOccupancyList);


  //Change Image Background depending on Device Type
  if(deviceType == "TENNIS"){
    image = tennisType;
  }

  if(deviceType == "BASKETBALL"){
    image = basketballType;
  }

  if(deviceType == "SWIMMING"){
    image = swimmingType;
  }




  return (
          <View style = {styles.mainContainer}>
            <Text style={{textAlign: 'left', color: '#0B5B13', fontSize: 17, fontWeight: 'bold', padding: 10}}>REAL-TIME OCCUPANCY</Text>
            <View style ={styles.container}>
               {/* <Icon 
                    name="circle"
                    size={75} 
                    color= {getOccupancy('Free')}/>
                <View style= {styles.statusContent}>
                    <Text style={styles.mainText}>OCCUPANCY STATUS: </Text>
                    <Text style={styles.statusText} >{getOccupancyText()}</Text>
                </View> */}
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
