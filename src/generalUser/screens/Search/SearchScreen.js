import React, {useState, useEffect} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    ScrollView,
    TouchableOpacity, 
    ActivityIndicator, 
    FlatList
} from 'react-native';
//import {} from 'react-navigation';

//import MapView from "react-native-maps";
//import Marker from "react-native-maps";
import SearchComponent from '../../components/Search/SearchComponent';
import FlatListDemo3 from '../../components/Search/FlatListDemo3';
import Filterbar from '../../components/Search/filterBar';
import SelectDropdown from 'react-native-select-dropdown';


//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import _forEach from 'lodash/forEach';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


//APIs 
const allFacilitiesURL = "http://52.229.94.153:8080/facility";
const getFilteredFacilitiesDistance = "http://52.229.94.153:8080/facility/filters?latitude=45.3876&longitude=-75.6976&city=OTTAWA&range=3&unit=K";
const requestFilteredDistanceFacilities = "http://52.229.94.153:8080/facility/filters?";
const getDeviceInFacility = "http://52.229.94.153:8080/device/inFacility/";

//Testing data for FlatList
const dataFacilities = [
  {id:'1', title: 'Windsor Park', type: 'Tennis', distance: '1', numCourts:'4', occupancy: "Free"},
  {id:'2', title: 'Carleton Heights Park', type: 'Tennis', distance: '2', numCourts:'4', occupancy: "Busy"},
  {id:'3', title: 'Steve Maclean Park', type: 'Tennis', distance: '3', numCourts:'4', occupancy: "Busy"},
  {id:'4', title: 'TangleWood Park', type: 'Tennis', distance: '4', numCourts:'4', occupancy: "Avg"},
  {id:'5', title: 'Arnott Park', type: 'Tennis', distance: '5', numCourts:'4', occupancy: "Free"},
  {id:'6', title: 'Mooneys Bay Park', type: 'Tennis', distance: '6', numCourts:'4', occupancy: "Busy"}, 
  {id:'7', title: 'Pineglen Park', type: 'Tennis', distance: '7', numCourts:'4', occupancy: "Free"},
  {id:'8', title: 'Celebration Park', type: 'Tennis', distance: '5', numCourts:'4', occupancy: "Busy"},
  {id:'9', title: 'Lexington Park', type: 'Tennis', distance: '7', numCourts:'4', occupancy: "NA"},
  {id:'10', title: 'Kaladar Park', type: 'Tennis', distance: '8', numCourts:'4', occupancy: "Free"},
  {id:'11', title: 'Owl Park', type: 'Tennis', distance: '4.3', numCourts:'4', occupancy: "Free"},

];

const deviceDataTest = [
  {
      "id": 1,
      "ownerId": 2,
      "facilityId": 1,
      "name": "Sample Data Cam",
      "authorizationId": "1OCC9876543210",
      "inUse": true,
      "areasMonitored": 3,
      "deviceType": "Tennis",
      "currOccupancy": [
          0,
          0,
          0
      ]
  },
  {
      "id": 2,
      "ownerId": 2,
      "facilityId": 1,
      "name": "Test Upload Cam",
      "authorizationId": "2OCC9876543210",
      "inUse": true,
      "areasMonitored": 1,
      "deviceType": "Tennis",
      "currOccupancy": [
          0
      ]
  }
]

const deviceDataTest_Farm = [
  {
      "id": 3,
      "ownerId": 2,
      "facilityId": 2,
      "name": "Sample Data Cam",
      "authorizationId": "1OCC9876543210",
      "inUse": true,
      "areasMonitored": 3,
      "deviceType": "Tennis",
      "currOccupancy": [
          0,
          0,
          0
      ]
  },
  {
      "id": 4,
      "ownerId": 2,
      "facilityId": 2,
      "name": "Test Upload Cam",
      "authorizationId": "2OCC9876543210",
      "inUse": true,
      "areasMonitored": 1,
      "deviceType": "Tennis",
      "currOccupancy": [
          0
      ]
  }
]

const deviceDataTest_Central = [
  {
      "id": 3,
      "ownerId": 2,
      "facilityId": 3,
      "name": "Sample Data Cam",
      "authorizationId": "1OCC9876543210",
      "inUse": true,
      "areasMonitored": 3,
      "deviceType": "Basketball",
      "currOccupancy": [
          0,
          0,
          0
      ]
  },
  {
      "id": 4,
      "ownerId": 2,
      "facilityId": 2,
      "name": "Test Upload Cam",
      "authorizationId": "2OCC9876543210",
      "inUse": true,
      "areasMonitored": 1,
      "deviceType": "Basketball",
      "currOccupancy": [
          0
      ]
  }
]

const facilityDataTest = [
  {
      "id": 1,
      "ownerId": 2,
      "name": "Lyndwood Tennis Club",
      "city": "MISSISSAUGA",
      "latitude": 43.57663,
      "longitude": -79.57103
  },
  {
    "id": 2,
    "ownerId": 2,
    "name": "Farm Park",
    "city": "MISSISSAUGA",
    "latitude": 43.62663,
    "longitude": -79.57103
},
{
  "id": 3,
  "ownerId": 2,
  "name": "Central Park",
  "city": "MISSISSAUGA",
  "latitude": 43.62663,
  "longitude": -79.57103
},
{
  "id": 4,
  "ownerId": 2,
  "name": "State Park",
  "city": "MISSISSAUGA",
  "latitude": 43.62663,
  "longitude": -79.57103
},
{
"id": 5,
"ownerId": 2,
"name": "Nature Park",
"city": "MISSISSAUGA",
"latitude": 43.62663,
"longitude": -79.57103
}
]

const RealData = [{"city": "OTTAWA", "id": 2, "latitude": 45.39809298, "longitude": -75.7187955, "name": "Fairmont Park", "ownerId": 1}, {"city": "OTTAWA", "id": 14, "latitude": 45.36995756, "longitude": -75.71272797, "name": "Lexington Park", "ownerId": 1}, {"city": "OTTAWA", "id": 16, "latitude": 45.36636475, "longitude": -75.6903175, "name": "Mooney's Bay Park", "ownerId": 1}, {"city": "OTTAWA", "id": 17, "latitude": 45.40732253, "longitude": -75.67255487, "name": "Brantwood Park", "ownerId": 1}, {"city": "OTTAWA", "id": 25, "latitude": 45.39413572, "longitude": -75.6756819, "name": "Windsor Park Ottawa", "ownerId": 1}, {"city": "OTTAWA", "id": 38, "latitude": 45.37240286, "longitude": -75.67258409, "name": "Kaladar Park", "ownerId": 1}, {"city": "OTTAWA", "id": 59, "latitude": 45.40598845, "longitude": -75.69657087, "name": "Chamberlain Park", "ownerId": 1}]






const screenName = 'Account';





const SearchScreen = ({navigation}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const [mainFacilityData, setMainFacilityData] = useState("");
  const [filteredFacilityData, setFilteredFacilityData] = useState("");
  const [distFilteredData, setDistFilteredData] = useState("");
  const [favourited, setFavourited] = useState(true);

  //Filter List
  const [facilityTypeFilterList, setFacilityTypeFilter] = useState([]);
  const [occupancyStatusFilterList, setOccupancyStatusFilter] = useState([]);
  const [distanceFilterList, setDistanceFilter] = useState([]);
  const [cityFilterList, setCityFilter] = useState([]);

  const [facilityTypeFilterChoice, setFacilityTypeFilterChoice] = useState("TENNIS");
  const [occupancyStatusFilterChoice, setOccupancyStatusFilterChoice] = useState("FREE");
  const [distanceFilterChoice, setDistanceFilterChoice] = useState("");
  const [distanceFilterUnitChoice, setDistanceFilterUnitChoice] = useState("K");
  const [cityFilterChoice, setCityFilterChoice] = useState("");

  //User Location
  const [userLatitude, setuserLatitude] = useState("45.3876");
  const [userLongitude, setUserLongitude] = useState("-75.6976");

  const setFilterLists = () => {
    setFacilityTypeFilter(["TENNIS", "BASKETBALL", "SWIMMING"]);
    setOccupancyStatusFilter(["FREE", "MODERATELY BUSY", "BUSY", "All Occupancy"]);
    setDistanceFilter(["1 km", "2 km", "3 km", "5 km", "10 km", "15 km", "20 km", "No Range"]);
    setCityFilter(["OTTAWA", "MISSISSAUGA"]);
  }

  //Fetch All facilities from database
  const getFacilities = async () => {
    try{

      fetch(allFacilitiesURL, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json, text/plain, */*, application/x-www-form-urlencoded',  // It can be used to overcome cors errors
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
        json: true,
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
          .then((resData) => {
            setMainFacilityData(resData);
            setFilteredFacilityData(resData);
            console.log(resData);

          })
            .catch(error => {
              console.log(error);
              alert(error);
            })

    }catch (e) {
    console.log("Failed to GET Facilities from database")
    }
  }

  //Fetch filtered facilities from database -> By Distance
  const getFilteredFacilities_Range = async (range, cityChoice) => {
    const getFacilityData_Range = `latitude=${userLatitude}&longitude=${userLongitude}&city=${cityFilterChoice}&range=15&unit=${distanceFilterUnitChoice}`;
    const getFacilityURL = requestFilteredDistanceFacilities + getFacilityData_Range;
    console.log("Get Distance Filtered Facility URL: " + getFacilityURL);
    //${distanceFilterChoice}


    const testFetch = `http://52.229.94.153:8080/facility/filters?latitude=${userLatitude}&longitude=${userLongitude}&city=${cityChoice}&range=${range}&unit=K`;
    console.log("Test: " + testFetch);

    setIsLoading(true);

    try{
      fetch(testFetch, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json, text/plain, */*, application/x-www-form-urlencoded',  // It can be used to overcome cors errors
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
        json: true,
      })
        .then(response => {
          console.log("Response data: " + response);
          return response.json();
        })
          .then((resData) => {
            setFilteredFacilityData(resData);
            setMainFacilityData(resData);
            console.log(resData);
            setIsLoading(false);
            setError(false);

          })
            .catch(error => {
              setError(true);
              console.log(error);
              alert(error);
            })

    }catch (e) {
    console.log("Failed to GET Facilities from database")
    }
  }

  useEffect(() => {
    //getFacilities();
    setFilterLists();
    //setDistanceFilterChoice("20 km");
    //setCityFilterChoice("OTTAWA");
    //getFilteredFacilities_Range(20, "OTTAWA");
    getFacilities();
  }, [])

  const handleFavourites = () => {
    setFavourited(!favourited);
  };

  const getOccupancy = (t) => {
    // console.log(t);
    if(t == 'Free'){
      return '#28B625'
    }
    else if (t == 'Busy'){
      return '#D32E2E'
    }
    else if (t == 'Avg'){
      return '#F9B70F'
    }
    else {
      return '#696A6D' //Not available
    }

  }

  const handleTypeUpdate = (deviceTypeTarget) => {
    //handleCityUpdate(cityFilterChoice);
    //handleRangeUpdate(distanceFilterChoice);
    //Use Filtered Facility Data
    //Set Target Device Type

    //Iterate through each Facility and call their devices to see what
    // type of devices are available for the Facility
    
    //1. Loop through the filtered data and call the API to get current devices in the Facility. Note the Facility ID
    //2. Loop through devices and get a list of Device Types
    //3. If the device type matches the target device type then add the facility ID to a list, then go to next Facility
    //4. After iterating through all the Facilities and their devices, compare the filtered list with the Facility ID list
    //   and create a new list with the type of facilities and then set it equal to the filteredFacilityData
    //5. Render the data in the Flatlist

    const selectedFacilityTypeList = [];
    setIsLoading(true);

    //Iterate through the Facility Data
    filteredFacilityData.forEach(element => {
        //Call API for each Facility Devices
        const deviceFacilityURL = getDeviceInFacility + element.id;
        console.log(deviceFacilityURL);
        axios.get(deviceFacilityURL).then(res => {
            var deviceData = res.data;
            var selected = false;
            console.log("Device Data: " + deviceData);

            //Iterate through the device list and push Facility element to list if it contains the target device type
            deviceData.forEach(elementDevice => {
                console.log("Device Target" + deviceTypeTarget);
                let elementType = (elementDevice.deviceType).toUpperCase();
                console.log(elementType);
                if (elementType == deviceTypeTarget && selected ==false){
                    console.log("Element: " + element.name);
                    //Create a new list containing the filtered type Facilities
                    selectedFacilityTypeList.push(element);
                    selected = true;
                }
            });
        })
        .then(response => {
          setMainFacilityData(selectedFacilityTypeList);
          setIsLoading(false);
          console.log(selectedFacilityTypeList);

        })
        .catch(error => console.log(error));
    });

  }

  const handleRangeUpdate = (range) => {

    var rangeChoice;
    var cityChoice = cityFilterChoice;

    //Set to max range for filter
    if (range =="No Range") {
      if (cityFilterChoice ==""){
        getFacilities();
      }
      else {
        rangeChoice = 500;
        setDistanceFilterChoice(500);
        //Call API to get filtered Facilities
        getFilteredFacilities_Range(rangeChoice, cityChoice);

      }
    }
    else {
      if (cityFilterChoice == ""){
        cityChoice = "OTTAWA";
        setCityFilterChoice(cityChoice);
      }
      //Update main Data list with updated filter
      var numRange = range.replace(' km','');
      console.log("NumRange: " + numRange);   //prints: 123
      setDistanceFilterChoice(numRange);
      rangeChoice = numRange;

      //Call API to get filtered Facilities
      getFilteredFacilities_Range(rangeChoice, cityChoice);
    }
    
  }

  const handleCityUpdate = (city) => {
    setCityFilterChoice(city);
    if (distanceFilterChoice == ""){
      setDistanceFilterChoice("500");
      getFilteredFacilities_Range(500, city);

    }
    else {
      getFilteredFacilities_Range(distanceFilterChoice, city);

    }
  }

  const handleOccupancyUpdate = (occupancyTarget) => {

      //Iterate through the Facility Data
    filteredFacilityData.forEach(element => {
      //Call API for each Facility Devices
      const deviceFacilityURL = getDeviceInFacility + element.id;
      console.log(deviceFacilityURL);
      let selectedFacilityOccupancyList = [];
      let selectedDevicesOccupancyList = [];

      axios.get(deviceFacilityURL).then(res => {
          var deviceData = res.data;
          var selected = false;
          console.log("Device Data: " + deviceData);

          //Iterate through the device list and push Facility element to list if it contains the target Occupancy Status       
          deviceData.forEach(elementDevice => {
              console.log("Device Occupancy Target: " + occupancyTarget);
              let elementType = (elementDevice.deviceType).toUpperCase();
              console.log(elementType);
              if (elementType == facilityTypeFilterChoice){
                  //console.log("Element: " + element.name);
                  selectedDevicesOccupancyList.push(elementDevice.currOccupancy);
                  //selectedFacilityTypeList.push(element);
              }
          }
          
          );

          //1. Find total number of free courts
          var totalZeros;
          totalZeros = selectedDevicesOccupancyList.filter(z => z === 0).length;
          console.log("Facility : " + element.id + ". Num Empty Areas: " + totalZeros);
          
          //2. Calculate length of Array List
          var numDeviceAreas = selectedDevicesOccupancyList.length;
          console.log("Facility : " + element.id + ". Num Device Areas: " + numDeviceAreas);

          //2. Calculate Occupancy Status 
          var status = totalZeros / numDeviceAreas;


          //3. Filter into Occupancy Status Categories
          var facilityStatus; 

          if (status == 0){
            //Facility is Free
            facilityStatus = "FREE";
          }

          else if (status > 0 && status < 0.60){
            //Facility is Moderately Busy
            facilityStatus = "MODERATELEY BUSY";
          }
          else if (status > 0.59 &&  status < 1.1){
            //Facility is Busy
            facilityStatus = "BUSY";
          }
          else {
            //Facility status is Not available
            facilityStatus = "NOT AVAILABLE";
          }

          //Check if Facility Meets the requirements
          if (facilityStatus == occupancyTarget){
              //Add Facility to Selected List
              selectedFacilityOccupancyList.push(element);


          }
          
         //Calculate Facility Occupancy with each Device
         console.log("Facility : " +element.id + ". Facility Status = " + facilityStatus + ". Status% = " + status);
         console.log("Selected Facility Occupancy: " + selectedFacilityOccupancyList)
      })
      .then(response => {
        setMainFacilityData(selectedFacilityOccupancyList);
        setIsLoading(false);
        //console.log(selectedFacilityTypeList);

      })
      .catch(error => console.log(error));
  });

  }

  const renderFacilities = () =>{
        
    //Check if the data is currently being fetched
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#82CB76" />
        </View>
      );
    }

    //Check if there is an error while fetching the data
    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, textAlign:'center'}}>
            Error fetching data... Check your network connection!
          </Text>
        </View>
      );
    }
      return (

        // <FlatListDemo3 marginLeft={9} data={distFilteredData} navigation={navigation}/>
        <View style ={styles.container} style ={{
          marginLeft: 9}}>
        <FlatList
            style = {styles.flatListStyle}
            data={mainFacilityData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {navigation.navigate('Analytics')}}> 
                <View style={styles.listItem}>

                      <Icon 
                        name="star"  
                        size={27} 
                        color= {favourited ? 'yellow' : 'white'}/>
        

                  <View style = {styles.SecondaryContent}>
                    <Text style={styles.listItemTextMain}>{item.name}</Text>
                    <Text style={styles.listItemTextSub}>{item.city}   |   {item.type}type:TODO  |   {item.distance}Dist:(todo)1km</Text>
                  </View>

                  <IconMat
                      style = {{position: 'absolute', right: 10}}
                      name="circle"
                      size = {45}
                      color= {getOccupancy(item.occupancy)}
                      ></IconMat>
                </View>
               </TouchableOpacity>
            )}
          />
      </View>

          );
   };
  

  return (
          
            <View style ={styles.container}>
                    <View style = {styles.searchContainer}>
                        <SearchComponent
                           marginLeft={10} 
                           marginRight={10} 
                           flex={3}
                        /> 
                        {/* <TouchableOpacity
                            onPress={() => alert('FILTER')}
                            >
                          <Ionicons 
                              name ="options"
                              size={35} 
                              color= 'black'/>
                        </TouchableOpacity> */}
                    </View>
                    <View >
                        <Text style={{alignSelf: 'flex-start', fontSize: 20, color: 'black', fontWeight: 'bold'}}>Filters: </Text>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                                >
                                <SelectDropdown
                          
                                        data={facilityTypeFilterList}
                                        style={{ animated: true, fontSize: 14}} 
                                        buttonStyle={styles.buttonStyleDropdown} 
                                        defaultButtonText="Type"
                                        dropdownStyle={styles.dropdownStyle}
                                        onSelect={(selectedItem, index) => {
                                            setFacilityTypeFilterChoice(selectedItem);
                                            handleTypeUpdate(selectedItem);
                                            console.log(selectedItem, index);
                                        }}
                                    />
                                <SelectDropdown
                                    data={occupancyStatusFilterList}
                                    style={{animated: true, fontSize: 20}} 
                                    buttonStyle={styles.buttonStyleDropdown} 
                                    defaultButtonText="Occupancy"
                                    dropdownStyle={styles.dropdownStyle}
                                    onSelect={(selectedItem, index) => {
                                        setOccupancyStatusFilterChoice(selectedItem);
                                        handleOccupancyUpdate(selectedItem);
                                        console.log(selectedItem, index);
                                    }}
                                >
                                  </SelectDropdown>
                                <SelectDropdown
                                    data={distanceFilterList}
                                    style={{animated: true, fontSize: 20}} 
                                    buttonStyle={styles.buttonStyleDropdown} 
                                    defaultButtonText="Range (Km)"
                                    dropdownStyle={styles.dropdownStyle}
                                    onSelect={(selectedItem, index) => {
                                        handleRangeUpdate(selectedItem);
                                        console.log(selectedItem, index);
                                    }}
                                />
                                <SelectDropdown
                                    data={cityFilterList}
                                    style={{animated: true, fontSize: 20}} 
                                    buttonStyle={styles.buttonStyleDropdown} 
                                    defaultButtonText="City"
                                    dropdownStyle={styles.dropdownStyle}
                                    dropdownIconPosition={"left"}
                                    onSelect={(selectedItem, index) => {
                                        handleCityUpdate(selectedItem);
                                        console.log(selectedItem, index);
                                    }}
                                />
                                

                        </ScrollView>

                      </View>
                    
                     {renderFacilities()}
                    
                    {/*
                    <ScrollView styles= {styles.scrollContainer}>
                      <Text style = {styles.mainText}>{'Search'}</Text>   
                      <TouchableOpacity>
                        <Text style = {styles.facilityItem}>Modal for Test Facility</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style = {styles.facilityItem}>More Results</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style = {styles.facilityItem}>Map FullScreen</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style = {styles.facilityItem}>Modal for Test Facility</Text>
                      </TouchableOpacity>

                      </ScrollView>
                    */}
                    {/*}
                      <MapView
                          loadingEnabled
                          style={styles.map}
                          initialRegion={{
                          latitude: 45.421532,
                          longitude: -75.697189,
                          latitudeDelta: 0.0722,
                          longitudeDelta: 0.0421,
                          }}
                          
                      >
                      </MapView>
                        */}

                   
                    
            </View>
    
  );

}

const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      flex: 1,
      // alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingTop: 10

    },  

    mainText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 18,
        fontWeight : 'bold',
        paddingVertical : 12,
        color: 'black'
    }, 

    facilityItem: {
       flex: 1,
       color: '#0B1961',
       textAlignVertical: 'center', 
       textAlign : 'center', 
       justifyContent : 'center',
       fontSize: 14,
       paddingVertical : 12,

    }, 
    map: {
      ...StyleSheet.absoluteFillObject,
      flex: 0,
      alignItems: "center",
      justifyContent: "flex-end",

      height: Dimensions.get("window").height/3.2,
      marginTop: 400,
      width: Dimensions.get('window').width,
      

    },

    scrollContainer: {
      flex: 1,
      paddingBottom: 900,
      marginBottom: 900,

    }, 

    searchContainer: {
      flexDirection: 'row',
      padding: 3,
      paddingRight: 5
    }, 
    flatListStyle: {
      height: '80%', 
      flexGrow: 0

    },

    mainText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 18,
        fontWeight : 'bold',
        paddingVertical : 12,
        color: 'black'
    }, 
    listItem: {
      marginTop: 10,
      borderRadius: 13,
      padding: 10,
      flexDirection: 'row',
      justifyContent : 'flex-start',
      alignItems: 'center',
      backgroundColor: '#93E591',
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
    buttonStyleDropdown: {
      marginLeft: 1,
      backgroundColor: '#BBCBF5',
      color: 'black',
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: 70,
      height: 40
    }

    

   
  });



export default SearchScreen;
