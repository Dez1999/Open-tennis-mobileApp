import React, {Component, useContext} from 'react';
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
    TextInput
} from 'react-native';
import {useState, useEffect} from "react";
import axios from 'axios';
//import {} from 'react-navigation';

//Main Imports
import { FavouritesContext } from '../../../sharedComponents/Context/Context';
import getFacilityOccupancyColor from '../../utils/getFacilityOccupancyColor';
import convertArrayToFlat from '../../utils/convertArrayToFlat';
import calculateFacilityStatus from '../../utils/calculateFacilityStatus';

//Import Icons
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//API URL
import { viewFavouritesURL, getDevicesURL } from '../../../sharedComponents/services/ApiContext';

//Import testing data
import data from './testingData';


const FavouritesScreen =({navigation}) => {
  const {favourites} = useContext(FavouritesContext);
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [favourited, setFavourited] = useState(true);
  const [favouritesData, setFavouritesData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [facilityTypeFilterList, setFacilityTypeFilter] = useState([]);
  const [search, setSearch] = useState('');

  const getFacilities = () => {
    setIsLoading(true);
    axios.get(viewFavouritesURL).then((res) => {
      if (res.data.length > 0) {
        setFavouritesData(res.data);
        setfilteredData(res.data);
        setIsLoading(false);
        console.log(res.data);
      } else {
        setFavouritesData([]);
        setfilteredData([]);
        setErr("No facilities found");
        setIsLoading(false);
      }
    });
  };

  //Method: Retrieves individual users favourite facilities
  const getFavoritedFacilities = () => {

    let selectedFacilityOccupancyList = [];

    //Check if TempFilteredData is empty
    if (favourites.length == 0){
      //Do Nothing, then set Loading to false
      setFavouritesData(favourites);
      setfilteredData(favourites);
      setIsLoading(false);

    }
    else {
      //Iterate through the Facility Data
      favourites.forEach(element => {
        //Call API for each Facility Devices
        const deviceFacilityURL = getDevicesURL + element.id;
        //console.log(deviceFacilityURL);
        let selectedDevicesOccupancyList = [];

        axios.get(deviceFacilityURL).then(res => {
            var deviceData = res.data;

            //Iterate through the device list and push Facility element to list if it contains the target Occupancy Status       
            deviceData.forEach(elementDevice => {
               selectedDevicesOccupancyList.push(elementDevice.currOccupancy);

            }
            );
            

          // To flat single level array
          const flatOccupancyList = convertArrayToFlat(selectedDevicesOccupancyList);

          //Calculate Facility Occupancy with each Device in each specific Facility
          var facilityStatus = calculateFacilityStatus(flatOccupancyList);


          //Create new jsonObject for the Facility
          var jsonObject = {city: element.city, ownerId: element.ownerId, id: element.id, latitude: element.latitude, longitude: element.longitude, name: element.name, ownerId: element.ownerId, occupancy: facilityStatus, selectedType: "ANY", indOccupancyList: flatOccupancyList, isfavourited: true}
          selectedFacilityOccupancyList.push(jsonObject);

        })
        .then(response => {
          //console.log(selectedFacilityOccupancyList);
          setFavouritesData(selectedFacilityOccupancyList);
          setfilteredData(selectedFacilityOccupancyList);
        })
        .catch(error => console.log(error))
        .done(() => {
            setIsLoading(false);
            //  setTimeout(function() {setIsLoading(false);}, 5000);
        })
      });
    }

  }

  useEffect(() => {
    setFacilityTypeFilter(["TENNIS", "BASKETBALL", "SWIMMING", "ANY"]);
    getFavoritedFacilities();

  }, [])

  //Method: Filters out current list of facilities based on text value in search bar
  const searchFilter = (text) => {
    if (text) {
        const newData = favouritesData.filter((item) => {
            const itemData = item.name ?
                    item.name.toUpperCase()
                    : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        setfilteredData(newData);
        setSearch(text);

    } else {
        setfilteredData(favouritesData);
        setSearch(text);
    }
}

  return (
            <View style ={styles.container}>
              <View style = {styles.searchContainer}>
                  <TextInput
                    style={styles.textInputStyle}
                    value ={search}
                    placeholder=" Search Favourite Facilities..."
                    underlineColorAndoird="transparent"
                    onChangeText={(text) => searchFilter(text)}>
                  </TextInput>
                  <TouchableOpacity
                      onPress={()=> getFavoritedFacilities()}
                  >
                      <Ionicons
                        name="refresh"
                        size={37}
                        color = "black"
                      >

                      </Ionicons>
                  </TouchableOpacity>
              </View>
              <FlatList
                  data={filteredData}
                  keyExtractor={item => item.id}
                  onRefresh= {() => getFavoritedFacilities()}
                  refreshing={isLoading}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {navigation.navigate('Analytics', {
                      facilityId: item.id, 
                      ownerId: item.ownerId,
                      facilityCity: item.city,
                      title: item.name, 
                      itemLatitude: item.latitude, 
                      itemLongitude: item.longitude,
                      occupancy: item.occupancy,
                      address: item.address, 
                      itemInitSelectedType: "ANY",
                      itemFavourited: item.isfavourited,
                      allFacilityTypeFilterList: facilityTypeFilterList

                    })}}> 
                      <View style={styles.listItem}>
                        
                          <IconMat
                            name="star"
                            size = {27}
                            color= {favourited ? 'yellow' : 'white'}
                            />   
                        <View style = {styles.SecondaryContent}>
                          <Text style={styles.listItemTextMain}>{item.name}</Text>
                          <Text style={styles.listItemTextSub}>{item.city}</Text>
                        </View>

                        <IconMat
                            style = {{position: 'absolute', right: 10}}
                            name="circle"
                            size = {45}
                            color= {getFacilityOccupancyColor(item.occupancy)}
                            >
                            
                        </IconMat>
                      </View>
                     </TouchableOpacity>
                  )}
                />
            </View>
    
  );


}



const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      flex: 1,
      marginTop: 10, 
      alignItems: 'center', 
    },  
    listItem: {
      marginTop: 10,
      borderRadius: 13,
      padding: 10,
      flexDirection: 'row',
      justifyContent : 'flex-start',
      alignItems: 'center',
      backgroundColor: '#93E591',
      borderColor: 'black',
      width: windowWidth - 20, 

      shadowColor: 'rgb(0, 0, 0)',
      shadowOffset: {
      width: 3,
      height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 3,
    },
    listItemTextMain: {
      fontSize: 18, 
      color: '#000000', 
      fontWeight: 'bold', 
      paddingTop: 4
    }, 
    listItemTextSub: {
        fontSize: 14, 
        color: '#000000', 
        paddingTop: 3
    
    }, 
    listItemTextDiv: {
      fontSize: 20, 
      color: '#000000', 
      fontWeight: 'bold', 
    }, 

    SecondaryContent: {
      flexDirection: 'column',
      marginTop: -12, 
      paddingLeft: 5, 
      paddingTop: 5,
      marginRight: 45, 
      marginLeft: 10
    }, 
    textInputStyle: {
      height: 40, 
      borderWidth: 1, 
      paddingLeft: 10, 
      width: '90%',
      marginLeft: 5,
      borderRadius: 15,
      borderColor: 'black', 
      backgroundColor: '#E2F1DB'
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 3,
    paddingRight: 5
  }, 


  });



export default FavouritesScreen;
