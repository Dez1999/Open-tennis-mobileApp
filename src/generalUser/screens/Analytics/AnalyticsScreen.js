import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    TouchableOpacity, 
    Linking, 
    Platform, 
    FlatList
} from 'react-native';
import {useState, useEffect} from "react";

//Import Icons
import {faStar, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
//import '@fortawesome/fontawesome-free/css/all.min.css';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Import Images
const image = require('../../images//ParkImages/PinecrestPark.jpg');


//Import Analytic Components
import OccupancyStatus from '../../components/AnalyticsComponents/occupancyStatus';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import _forEach from 'lodash/forEach';


//Indvidual phone heights and widths
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//API URL
const addFavouriteURL = "http://52.229.94.153:8080/facility/favourite/add/";
const removeFavouriteURL = "http://52.229.94.153:8080/facility/favourite/remove/";
const viewFavouritesURL = "http://52.229.94.153:8080/facility/favourite";
const getDeviceInFacility = "http://52.229.94.153:8080/device/inFacility/";


//Testing Data for Analytics Page
//Testing data
const individualData = [
  {id:'12412', title: 'Windsor Park', longitude: '45.3943', latitude: '75.6761', type: 'Tennis', distance: '1', openStatus: "CLOSED", occupancy: "Free", address: "1B Windsor Ave, Ottawa" },
]
const parkAddress = 'Winsdor Park, 1B Windsor Ave, Ottawa';
const longitude = '-75.676044';
const latitude = '45.394457';


const AnalyticsScreen = ({navigation, route}) => {
  //const [posts, setPosts] = useState([]);
  //const [data, setData] = useState([]);
  const {facilityId, title, numCourts, occupancy, address} = route.params; //Passes params from previous page

  const [favourited, setFavourited] = useState(false);
  const [occupancyListData, setOccupancyData] = useState("");
  const [occupancyStatusReal, setOccupanyStatusReal] = useState("");
  const [facilityTypeFilterChoice, setFacilityTypeFilterChoice] = useState("TENNIS");
  let deviceNum = 0;

  //Method: Add Facility to Favourites
  const addToFavourites = () => {
    const selectedFacility = `${facilityId}`;
    const addFacilityFavURL = addFavouriteURL + selectedFacility;
    console.log("Add facility Device URL: " + addFacilityFavURL);
    
    let successfullPost = true;
    fetch(addFacilityFavURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(response => {
        return response.json();
    })
    .then((resJSON) => {
        //TODO
        //Currently no response from the backend

    })
    .catch(error => {
        console.log(error);
    })
    .done(() => {

        console.log("You have successfully added a new Facility to favourites");

    });

}

//Method: Post Facility to the database
const removeFromFavourites = () => {
  const selectedFacility = `${facilityId}`;
  const removeFacilityFavURL = removeFavouriteURL + selectedFacility;
  console.log("Remove facility Device URL: " + removeFacilityFavURL);

  
  let successfullPost = true;
  fetch(removeFacilityFavURL, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      credentials: 'include'
  })
  .then(response => {
      return response.json();
  })
  .then((resJSON) => {
      //TODO
      //Currently no response from the backend

  })
  .catch(error => {
      console.log(error);
  })
  .done(() => {

      console.log("You have successfully removed a Facility to Favourites");

  });

}

//Get Current Occupancy of Facility
const getOccupancy = () => {

  let Occupancycolor = '#696A6D';

  //Call API for each Facility Devices
  const deviceFacilityURL = getDeviceInFacility + facilityId;
  //console.log(deviceFacilityURL);
  let selectedDevicesOccupancyList = [];

  axios.get(deviceFacilityURL).then(res => {
      var deviceData = res.data;

      //Iterate through the device list and push Facility element to list if it contains the target Occupancy Status       
      deviceData.forEach(elementDevice => {
          //console.log("Device Occupancy Target: " + occupancyTarget);
          let elementType = (elementDevice.deviceType).toUpperCase();
          //console.log(elementType);
          console.log("Facility Filter Choice: " + facilityTypeFilterChoice);
          if (elementType == facilityTypeFilterChoice){
              selectedDevicesOccupancyList.push(elementDevice.currOccupancy);
              //selectedFacilityTypeList.push(element);
          }
      }
      
      );

  })
  .then(response => {
    console.log("Device: " +selectedDevicesOccupancyList)
    calculateOccupancy(selectedDevicesOccupancyList);
    setOccupancyData(selectedDevicesOccupancyList);

  })
  .catch(error => console.log(error))
  .done(() => {
    //return Occupancycolor;
});

}

const calculateOccupancy = (occupancyList) => {

if (occupancyList.length == 0){
  setOccupanyStatusReal("Not Available") //Not available

}
else {
  //1. Find total number of free courts
  var totalZeros;
  totalZeros = occupancyList.filter(z => z === 0).length;
  //console.log("Device : " + item.id + ". Num Empty Areas: " + totalZeros);
  
  //2. Calculate length of Array List
  var numDeviceAreas = occupancyList.length;
  //console.log("Device : " + item.id + ". Num Device Areas: " + numDeviceAreas);

  //2. Calculate Occupancy Status 
  var status = totalZeros / numDeviceAreas;


  //3. Filter into Occupancy Status Categories
  var facilityStatus; 

  if (status == 0){
    //Facility is Free
    facilityStatus = "Free";
    setOccupanyStatusReal(facilityStatus);
  }

  else if (status > 0 && status < 0.60){
    //Facility is Moderately Busy
    facilityStatus = "Avg";
    setOccupanyStatusReal(facilityStatus);
  }
  else if (status > 0.59 &&  status < 1.1){
    //Facility is Busy
    facilityStatus = "Busy";
    return '#F9B70F'
  }
  else {
    //Facility status is Not available
    facilityStatus = "NOT AVAILABLE";
    setOccupanyStatusReal(facilityStatus)
  }
}
}


  const handleFavourites = () => {
    setFavourited(!favourited);
    if (!favourited){
      //Add Facility to Favourite List
      addToFavourites();
    }
    else {
      removeFromFavourites();
    }
  };

  const url = Platform.select({
    ios: "maps:" + latitude + "," + longitude + "?q=" + latitude + "+" + longitude,
    android: "geo:" + latitude + "," + longitude + "?q=" + address
  });


  useEffect(() => {
    getOccupancy();
    setFacilityTypeFilterChoice("TENNIS");
  }, [])

  const item = ({item}) => {
    deviceNum++;
    return (
        <View style={{flexDirection:'row', justifyContent:'center'}}>
            <View style={styles.dataField}>
                <Text>Device {deviceNum}</Text>
                <Text style ={styles.rowText}>Areas: {item}</Text>
            </View>
        </View>
    )
}

  return (
            <View style ={styles.container}>
                <View style ={styles.containerHeader}>
                  <BackgroundImage source = {image} style={styles.backgroundImage}>
                  
                  <View style = {styles.topContent}>
                      <TouchableOpacity
                              onPress={() => navigation.goBack()}
                              >
                              <Icon
                                name="arrow-left"
                                color='black'
                                size={35}
                                >             
                              </Icon>
                      </TouchableOpacity>
                      <View style = {styles.midTopContent}>
                          {individualData.map(i => (<Text key="{i}" style = {styles.facilityTypeText}>{i.type} Facility</Text>))}
  
                      </View>
                      
                      <TouchableOpacity
                              onPress={() => handleFavourites()}
                              >
                              <Icon
                                name="star"
                                size={35} 
                                border = '1px solid #333'
                                color= {favourited ? 'yellow' : 'white'}/>
                      </TouchableOpacity>
                 </View>
                  
                  <View style={styles.botTopContent}>
                    <TouchableOpacity
                      style={styles.mapsButton}
                        
                      onPress={() => Linking.openURL(url)}
                      >
                        <Text style = {styles.buttonText}>GO</Text>
                              
                    </TouchableOpacity>

                  </View>

                  
                  
                 </BackgroundImage>
                 <View style = {styles.titleContent}>
                    <Text style = {styles.titleText}>{title}</Text>
                    <Text style = {styles.addressText}>{address}</Text>
                 </View>

              <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    paddingTop: 5
                  }}
                />
              </View>


              {/* <ScrollView> */}
                <View style ={{
                    flexGrow: 1,

                  }}
                  >
                  <OccupancyStatus OccupancyStatus= {occupancyStatusReal}></OccupancyStatus> 
                  <Text style={{textAlign: 'center', color: 'black', fontSize: 17, fontWeight: 'bold', padding: 10}}>Current Monitored Areas</Text>
                  <FlatList
                    data = {occupancyListData}
                    renderItem={item}
                    keyExtractor={(item, index) => index.toString()}
                        >
                   </FlatList>
                </View>

              {/* </ScrollView> */}

              

              
             
            </View>
    
  );
 

}



const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FFFFFF",
      flex: 1,
      width: windowWidth
    },  

    backgroundImage: {
      height: windowHeight/6

    },

    containerHeader : {
      width: windowWidth
    },  

    topContent: {
     flexDirection: 'row',
     padding: 5

    },

    midTopContent: {
        paddingRight: 72, 
        paddingLeft: 72, 
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },

    titleContent: {
      width: windowWidth/1.22, 
      marginLeft: 5, 
      marginRight: 20, 

    },

    botTopContent: {
      flexDirection: 'row', 

    },

    tabContent: {
      flex: 1,
      flexDirection: 'row', 
      width: '100%', 
      alignItems: 'center', 
      justifyContent: 'center'

    },

    facilityTypeText: {
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 18,
        fontWeight : '700',
        paddingVertical : 1,
        color: 'black'
    }, 
    secondaryText: {
      color: '#D32E2E', 
      fontWeight: '700', 
      textAlign : 'center', 
      justifyContent : 'center',
      fontSize: 15
    }, 

    titleText: {
      color: 'black', 
      fontSize: 26, 
      fontWeight: '900', 
    }, 

    addressText: {
      fontSize: 14, 
      color: '#000000', 
      fontWeight: '500', 
    }, 

    buttonText: {
      color: '#FFFFFF', 
      fontWeight: 'bold', 
      fontSize: 21

    },

    mapsButton: {
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#28B625', 
      borderRadius: 15, 
      height: 35,
      width: 60,
      position: 'absolute', 
      right: 6, 
      top: windowHeight/25
      
     
    }, 
    rowText: {
      color: 'black', 
      fontSize: 18,
      textAlign: 'center'

  }, 
   dataField: {
    width: '75%', 
    backgroundColor:'white', 
    bordercolor: 'black', 
    borderWidth: 2, 

  }

   
  });



export default AnalyticsScreen;
