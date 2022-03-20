import React, { useContext } from 'react';
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
    FlatList, 
    Number, 
    LogBox
} from 'react-native';
import {useState, useEffect} from "react";

//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


//Import Images
const image = require('../../images//ParkImages/PinecrestPark.jpg');

//Import Analytic Components
import OccupancyStatus from '../../components/AnalyticsComponents/occupancyStatus';
import IndividualAreaOccupancy from './IndividualAreaOccupancy';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import _forEach from 'lodash/forEach';
import SelectDropdown from 'react-native-select-dropdown';
import convertArrayToFlat from '../../utils/convertArrayToFlat';
import calculateFacilityStatus from '../../utils/calculateFacilityStatus';

//Import Favourites function
import { FavouritesContext } from '../../../sharedComponents/Context/Context';

//Geocoding
import Geocoder from 'react-native-geocoding';
import { API_KEY } from '../../../sharedComponents/services/key';


//Indvidual phone heights and widths
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//API URL
import { getDevicesURL, addFavouriteURL } from '../../../sharedComponents/services/ApiContext';


//Testing Data for Analytics Page
//Testing data
const individualData = [
  {id:'12412', title: 'Windsor Park', longitude: '45.3943', latitude: '75.6761', type: 'Tennis', distance: '1', openStatus: "CLOSED", occupancy: "Free", address: "1B Windsor Ave, Ottawa" },
]
const parkAddress = 'Winsdor Park, 1B Windsor Ave, Ottawa';
const longitude = '-75.676044';
const latitude = '45.394457';


const AnalyticsScreen = ({navigation, route}) => {
  const {favourites, add, getFavourites, remove} = useContext(FavouritesContext);
  //const [posts, setPosts] = useState([]);
  //const [data, setData] = useState([]);
  const {facilityId, ownerId, facilityCity, title, numCourts, occupancy, address, itemLatitude, itemLongitude, itemIndOccupancyList, itemInitSelectedType, allFacilityTypeFilterList, itemFavourited} = route.params; //Passes params from previous page

  const [favourited, setFavourited] = useState(false);
  const [occupancyListData, setOccupancyData] = useState([]);
  const [occupancyStatusReal, setOccupanyStatusReal] = useState("");
  const [facilityTypeFilterChoice, setFacilityTypeFilterChoice] = useState("");
  const [facilityAddress, setFacilityAddress] = useState("");
  const [selectedDeviceType, setSelectedDeviceType] = useState(null);
  const [facilityDeviceTypeList, setFacilityDeviceTypeList] = useState("");

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

      var jsonObject = {city: facilityCity, id: facilityId, latitude: itemLatitude, longitude: itemLongitude, name: title, ownerId: ownerId};
      add(jsonObject);
      console.log("You have successfully added a new Facility to favourites");

    });

}

//Method: Post Facility to the database
const removeFromFavourites = async () => {
  const selectedFacility = `${facilityId}`;

  await remove(selectedFacility);
  getFavourites();
  
}

const getFacilityStatusUpdate = async (itemInitSelectedType) => {
    if (itemInitSelectedType  == "ANY"){
      //Check Facility Devices to select the correct device type to initiate
      //Get device List
      //Call API for each Facility Devices
      const deviceFacilityURL = getDevicesURL + facilityId;
      let isTypeChosen = false;
      let selectedDeviceType = itemInitSelectedType;

      axios.get(deviceFacilityURL).then(res => {
        var deviceData = res.data;

        //Check if DeviceList is Empty
        if (deviceData.length == 0){
           //Do Nothing
           setFacilityTypeFilterChoice(itemInitSelectedType);
           console.log("DeviceType (ANY-Empty Device Data): " + itemInitSelectedType);
        }
        else {
          //Iterate to find the next deviceTypeChoice
          console.log("getDeviceType (Not Empty)");
          for (var i = 0; i < allFacilityTypeFilterList.length - 1; i++ ){
            //Iterate through the device list and select the facility type to use 
            console.log(i);    
            console.log(allFacilityTypeFilterList[i]);
            deviceData.forEach(elementDevice => {
              //console.log("Device Occupancy Target: " + occupancyTarget);
              let elementType = elementDevice.deviceType;
              if(elementType == "SwimmingPool"){
                    elementType = "SWIMMING";
              }
              elementTypeCap = (elementType).toUpperCase();
              //console.log(elementType);
              if (elementTypeCap == allFacilityTypeFilterList[i] && !isTypeChosen){
                console.log("Success: Device Type = " + elementTypeCap);
                isTypeChosen = true;
                selectedDeviceType = elementTypeCap;
                setFacilityTypeFilterChoice(elementTypeCap);
                setSelectedDeviceType(elementTypeCap);
                return;
              }
            
            }
           );

           if (isTypeChosen){
             return;
           }

          }
        }  
      })
      .then(response => {
        getOccupancy(selectedDeviceType);
        console.log("DeviceType (ANY): " + facilityTypeFilterChoice);
    
      })
      .catch(error => console.log(error))
      .done(() => {
        //return Occupancycolor;
      });

    }
    else {
      setFacilityTypeFilterChoice(itemInitSelectedType);
      setSelectedDeviceType(itemInitSelectedType);
      console.log("DeviceType (Specific): " + itemInitSelectedType);
      getOccupancy(itemInitSelectedType);

    }
}

//Retrieve Location of the Facility
const getLocation = async () => {
      Geocoder.init(API_KEY);

      Geocoder.from(itemLatitude, itemLongitude)
    .then(json => {
        var addressComponent = json.results[0].formatted_address;
    console.log(addressComponent);
          setFacilityAddress(addressComponent);
    })
    .catch(error => console.warn(error));
    }

//Get Current Occupancy of Facility
const getOccupancy = (selectedDeviceType) => {

  //Call API for each Facility Devices
  const deviceFacilityURL = getDevicesURL + facilityId;
  //console.log(deviceFacilityURL);
  let selectedDevicesOccupancyList = [];

  axios.get(deviceFacilityURL).then(res => {
      var deviceData = res.data;

      //Iterate through the device list and push Facility element to list if it contains the target Occupancy Status       
      deviceData.forEach(elementDevice => {
          //console.log("Device Occupancy Target: " + occupancyTarget);
          let elementType = elementDevice.deviceType;
            if(elementType == "SwimmingPool"){
                  elementType = "SWIMMING";
            }
          elementType = (elementType).toUpperCase();
          //console.log(elementType);
          console.log("Facility Filter Choice: " + selectedDeviceType);
          if (elementType == selectedDeviceType){
              selectedDevicesOccupancyList.push(elementDevice.currOccupancy);
              //selectedFacilityTypeList.push(element);
          }
      }
      
      );

  })
  .then(response => {
    console.log("Device: " + selectedDevicesOccupancyList)
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
      setOccupanyStatusReal("NOT AVAILABLE") //Not available

    }
    else {
    //Calculate Facility Occupancy with each Device in each specific Facility
          // To flat single level array
          const flatOccupancyList = convertArrayToFlat(occupancyList);

          //Calculate Facility Occupancy with each Device in each specific Facility
          var facilityStatus = calculateFacilityStatus(flatOccupancyList);

          setOccupanyStatusReal(facilityStatus);

          
    }
}


const getFacilityTypeList = async () => {

    //Get device List
    let facilityDevicesTypeList = [];
    //Call API for each Facility Devices
    const deviceFacilityURL = getDevicesURL + facilityId;

    axios.get(deviceFacilityURL).then(res => {
      var deviceData = res.data;

      //Check if DeviceList is Empty
      if (deviceData.length == 0){
         //Do Nothing
         
      }
      else {
        //Iterate to find all types in Facility
        for (var i = 0; i < allFacilityTypeFilterList.length - 1; i++ ){
          //Iterate through the device list and select the facility type to use 
          console.log(i);    
          console.log(allFacilityTypeFilterList[i]);
          deviceData.forEach(elementDevice => {
            //console.log("Device Occupancy Target: " + occupancyTarget);
            let elementType = elementDevice.deviceType;
            if(elementType == "SwimmingPool"){
                  elementType = "SWIMMING";
            }
            elementTypeCap = (elementType).toUpperCase();
            //console.log(elementType);
            if (elementTypeCap == allFacilityTypeFilterList[i]){
              facilityDevicesTypeList.push(elementTypeCap);
              console.log("Facility Types: " + facilityDevicesTypeList);
            }
          
          }
         );
        }
      }
    })
    .then(response => {
      var uniqueArray = facilityDevicesTypeList.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      })
      console.log("Facility Types (Remove Duplicates): " + uniqueArray);

      setFacilityDeviceTypeList(uniqueArray);
  
    })
    .catch(error => console.log(error))
    .done(() => {
      //return Occupancycolor;
    });

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
    android: "geo:" + latitude + "," + longitude + "?q=" + facilityAddress
  });


  useEffect(() => {
    getLocation();
    getFacilityStatusUpdate(itemInitSelectedType);
    getFacilityTypeList();
    setFavourited(itemFavourited);
    console.log("Is Facility Favourited: " + favourited);
  }, [])




const handleTypeChange = (selectedType) => {
  getFacilityStatusUpdate(selectedType);
}

const handleFacilityRefresh = () => {
  if (facilityTypeFilterChoice != "ANY" && facilityTypeFilterChoice != ""){
    return(
      <View style = {styles.refreshContent}>
          <TouchableOpacity
              onPress={()=> getFacilityStatusUpdate(selectedDeviceType)}
          >
            <Ionicons
              name="refresh"
              size={37}
              color = "black"
            >

            </Ionicons>
          </TouchableOpacity>
      </View>
    )
  }

}

const facilityTypeSelection = () => {
  if (facilityTypeFilterChoice != "ANY" && facilityTypeFilterChoice != ""){
    return(
      <View style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20, padding: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#0B5B13'}}>Available Facility Types: </Text>
        <SelectDropdown
            data={facilityDeviceTypeList}
            style={{animated: true, fontSize: 20}} 
            buttonStyle={styles.buttonStyle} 
            defaultButtonText={facilityTypeFilterChoice}
            dropdownStyle={styles.dropdownStyle}
                            
            onSelect={(selectedItem, index) => {
                handleTypeChange(selectedItem);
                console.log(selectedItem, index);
             }}
          />
      </View>
    )
  }
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
                          {individualData.map(i => (<Text key="{i}" style = {styles.facilityTypeText}>{selectedDeviceType} FACILITY</Text>))}
  
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
                   <View>
                     <Text style = {styles.titleText}>{title}</Text>
                     <Text style = {styles.addressText}>{facilityAddress}</Text>
                   </View>
                    
                    {handleFacilityRefresh()}
                    
                 </View>
                 

              <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    paddingTop: 5
                  }}
                />
              </View>


              <ScrollView>
                <View style ={{
                    flexGrow: 1,

                  }}
                  >
                    {facilityTypeSelection()}
                  
                  <OccupancyStatus OccupancyStatus= {occupancyStatusReal}></OccupancyStatus> 
                  <IndividualAreaOccupancy currOccupancyList={occupancyListData} targetDevice ={facilityTypeFilterChoice}/>
                </View>

              </ScrollView>

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
        paddingRight: 30, 
        paddingLeft: 30, 
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },

    titleContent: {
      width: windowWidth, 
      marginLeft: 5, 
      marginRight: 10, 
      flexDirection: 'row',
      justifyContent: 'space-between'

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
      fontSize: 12, 
      color: '#000000', 
      fontWeight: '500', 
      width: '100%'
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
    refreshContent: {
      justifyContent: 'center', 

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

  }, 
  buttonStyle: {
    height: 35,
    width: '45%',
    backgroundColor: '#6DC1DB',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 12

  },

  dropdownStyle: {
    width: '43%',
    borderColor: '#0C4B16',
    borderWidth: 2,

  },

   
  });



export default AnalyticsScreen;
