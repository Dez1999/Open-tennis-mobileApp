import React, {useState, useEffect} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    ScrollView,
    TouchableOpacity, 
    ActivityIndicator, 
    FlatList, 
    Modal, 
    TextInput
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
import { color, set } from 'react-native-reanimated';

//Import User Location
import GetLocation  from 'react-native-get-location';

//Import Current Time
import moment from 'moment';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//import Modal
// import {Modal, Portal, Provider, Button, Menu, Divider} from 'react-native-paper';


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


const SearchScreen = ({navigation}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');



  const [mainFacilityData, setMainFacilityData] = useState("");
  const [filteredFacilityData, setFilteredFacilityData] = useState("");
  const [distFilteredData, setDistFilteredData] = useState("");
  const [favourited, setFavourited] = useState(false);
  

  //Filter List
  const [facilityTypeFilterList, setFacilityTypeFilter] = useState([]);
  const [occupancyStatusFilterList, setOccupancyStatusFilter] = useState([]);
  const [distanceFilterList, setDistanceFilter] = useState([]);
  const [cityFilterList, setCityFilter] = useState([]);

  const [facilityTypeFilterChoice, setFacilityTypeFilterChoice] = useState("ANY");
  const [occupancyStatusFilterChoice, setOccupancyStatusFilterChoice] = useState("All Occupancy");
  const [distanceFilterChoice, setDistanceFilterChoice] = useState("3 km");
  const [distanceFilterUnitChoice, setDistanceFilterUnitChoice] = useState("K");
  const [cityFilterChoice, setCityFilterChoice] = useState("OTTAWA");
  const [filterCurrentChoice, setFilterCurrentChoice] = useState("");

  //User Location
  const [userLatitude, setuserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const [userLocationError, setuserLocationError] = useState(null);

  //Modal constants
  // define a state variable to store the modal's visible state
  const [visible, setVisible] = React.useState(false);

  // methods that handle a component's visibility state
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //Testing Performance
  var performanceTime = 0;
  var startTime = 0;
  var endTime = 0;
  var rangeFetchCount = 0;
  var typeFetchCount = 0;
  var occupancyFetchCount = 0;


  const setFilterLists = () => {
    setFacilityTypeFilter(["TENNIS", "BASKETBALL", "SWIMMING", "ANY"]);
    setOccupancyStatusFilter(["FREE", "MODERATELY BUSY", "BUSY", "All Occupancy"]);
    setDistanceFilter(["1 km", "2 km", "3 km", "5 km", "10 km", "15 km", "20 km", "No Range"]);
    setCityFilter(["OTTAWA", "MISSISSAUGA"]);
  }

  const getUserLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      console.log(location);
      setuserLatitude(location.latitude);
      setUserLongitude(location.longitude);
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    })
  }

  const handleFavourites = () => {
    setFavourited(!favourited);
    //Call to favourites API to compare

  };

  const searchFilter = (text) => {
    if (text) {
        const newData = filteredFacilityData.filter((item) => {
            const itemData = item.name ?
                    item.name.toUpperCase()
                    : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        setMainFacilityData(newData);
        setSearch(text);

    } else {
        setMainFacilityData(filteredFacilityData);
        setSearch(text);
    }
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
            setFilteredFacilityData(resData);
            setMainFacilityData(resData);
            
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


  useEffect(() => {
    //getFacilities();
    setFilterLists();

    //getUserLocation();

    //getFacilities();
    handleFilterSubmit();

  }, [])


  //Handle when a use applies the filters to search function
  handleFilterSubmit = async () => {
    rangeFetchCount = 0;
    typeFetchCount = 0;
    occupancyFetchCount = 0;
    startTime = moment().utcOffset('+05:00').format('HH:mm:ss');
    console.log("Start Time of FilterSubmit: " + startTime);
    //Set Loading to True
    setIsLoading(true);

    //Set Local Variables
    let selectedRange = distanceFilterChoice;
    let selectedCity = cityFilterChoice;

    //Filter by Range and City simulateneously
    const facility_RC = await getFilteredFacilities_Range(selectedRange, selectedCity);

  }

  //Fetch filtered facilities from database -> By Distance
  const getFilteredFacilities_Range = async (range, cityChoice) => {
    //Increase Count for Fetch:
    rangeFetchCount++;
    //Update main Data list with updated filter
    var numRange;
    if (range == "No Range"){
      numRange = 500;

    }
    else {
      numRange = range.replace(' km','');
      console.log("NumRange: " + numRange);   //prints: 123
      //setDistanceFilterChoice(numRange);
    }

    //Temp Filtered Dataset
    let tempDataset = [];

    //Get User Location
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      console.log(location);
      setuserLatitude(location.latitude);
      setUserLongitude(location.longitude);
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    })


    const getURLFetch = `http://52.229.94.153:8080/facility/filters?latitude=${userLatitude}&longitude=${userLongitude}&city=${cityChoice}&range=${numRange}&unit=K`;
    console.log("Test: " + getURLFetch);

    setError(null);


      fetch(getURLFetch, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json, text/plain, */*, application/x-www-form-urlencoded',  // It can be used to overcome cors errors
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
        json: true,
      })
        .then(response => {
          //console.log(response);
          return response.json();
        })
          .then((resData) => {
            //setFilteredFacilityData(resData);
            //setMainFacilityData(resData);
            tempDataset = resData;
            //console.log(tempDataset);
            //setIsLoading(false);
            setError(false);

          })
            .catch(error => {
              setError(true);
              console.log(error);
              alert("Sorry something went wrong. Unable to retrieve facilities.");
            }) 
            .done(() => {
              console.log("Facility Type Choice: " + facilityTypeFilterChoice);
              handleTypeUpdate(facilityTypeFilterChoice, tempDataset);
          });

  }

  const handleTypeUpdate = (deviceTypeTarget, tempFilteredData) => {
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

    //Increase coutn for type Fetch
    typeFetchCount++;
    occupancyFetchCount = 0;

    let selectedFacilityTypeList = [];
    //console.log("Temp Filtered Data Length at TypeUpdate: " + tempFilteredData.length);

    //Do Nothing and go to OccupancyStatusFilter
      
    // }
    if (tempFilteredData && tempFilteredData.length == 0){
      //Filtered dataset is empty thus directly pass it to Occupancy Status Filter to handle it
      handleOccupancyUpdate(occupancyStatusFilterChoice, tempFilteredData);
      console.log("Facility Type Update (Before Filtering): Dataset is Empty");
      //setIsLoading(false);
    }
    else if (deviceTypeTarget == "ANY"){
        //Keep all facilities in filtered dataset and do not filter by device type
        //Let OccupancyStatusUpdate() handle this
        handleSpecialOccupancyStatusUpdate(occupancyStatusFilterChoice, tempFilteredData);
        console.log("HandleTypeUpdate: ANY");

    }
    else {

      console.log(tempFilteredData);

      //Iterate through the Filtered Facility Data
      tempFilteredData.forEach(element => {
          //Call API for each Facility Devices
          const deviceFacilityURL = getDeviceInFacility + element.id;
          //console.log(deviceFacilityURL);
          axios.get(deviceFacilityURL).then(res => {
              var deviceData = res.data;
              var selected = false;
              //console.log("Device Data: " + deviceData);

              //Iterate through the device list and push Facility element to list if it contains the target device type
              deviceData.forEach(elementDevice => {
                  //console.log("Device Target" + deviceTypeTarget);
                  //console.log(elementType);
                  let elementType = elementDevice.deviceType;
                  if(elementType == "SwimmingPool"){
                        elementType = "SWIMMING";
                  }
                  elementType = (elementType).toUpperCase();

                  //If Device contains deviceTypeTarget and they haven't been selected yet then add to selectedFacilityTypeList
                  if (elementType == deviceTypeTarget && selected ==false){
                      //console.log("Element: " + element.name);
                      //Create a new list containing the filtered type Facilities
                      selectedFacilityTypeList.push(element);
                      selected = true;
                  }
              });
          })
          .then(response => {

            //Now Request Occupancy Filtered Choice
            handleOccupancyUpdate(occupancyStatusFilterChoice, selectedFacilityTypeList);
            //console.log("Facility Type Update After Type Filtering");
            
            //console.log(selectedFacilityTypeList);

          })
          .catch(error => console.log(error));
      });

    }
    
  }

  const handleSpecialOccupancyStatusUpdate = (occupancyTarget, tempFilteredData) => {

    //Increase count for Special Occupancy Fetch
    occupancyFetchCount++;

    let selectedFacilityOccupancyList = [];


    //Note: tempFilteredData != Empty, Facility Type = Any, Occupancy Status = [Free, Moderately Busy, Busy, All Occupancy]

    //Iterate through the Facility Data
    tempFilteredData.forEach(element => {
      //Call API for each Facility Devices
      const deviceFacilityURL = getDeviceInFacility + element.id;

      //Initialize selected Device List
      let selectedDevicesOccupancyList = [];

      axios.get(deviceFacilityURL).then(res => {
        var deviceData = res.data;

        //Check if deviceData is empty
        if (deviceData.length == 0){
          //If Devicedata is empty then directly add the facility to the selectedFacilityList
          console.log("SpecialOccupancy: ARRAY is EMPTY");
          var facilityStatus; 
          facilityStatus = "NOT AVAILABLE";
          var jsonObject = {city: element.city, id: element.id, latitude: element.latitude, longitude: element.longitude, name: element.name, ownerId: element.ownerId, occupancy: facilityStatus, selectedType: facilityTypeFilterChoice}
          selectedFacilityOccupancyList.push(jsonObject);
        }
        else {
          //Iterate through the device list and push Facility element to list if it contains the target Occupancy Status       
          deviceData.forEach(elementDevice => {
            //console.log("Device Occupancy Target: " + occupancyTarget);
            let elementType = elementDevice.deviceType;
            if(elementType == "SwimmingPool"){
                  elementType = "SWIMMING";
            }
            elementType = (elementType).toUpperCase();
            //console.log(elementType);
            if (elementType == facilityTypeFilterChoice || facilityTypeFilterChoice == "ANY"){
                //console.log("Element: " + element.name);
                selectedDevicesOccupancyList.push(elementDevice.currOccupancy);
                //selectedFacilityTypeList.push(element);
            }
           }
         );
          //Calculate Facility Occupancy with each Device in each specific Facility
          //facilityStatus = getFacilityStatus(selectedDevicesOccupancyList, element);

          //Iterate through selectedDeviceOccupancy List and convert to individual fields
          const arr = selectedDevicesOccupancyList;
          console.log(arr);

          // To flat single level array
          const flatOccupancyList = arr.reduce((acc, val) => {
            return acc.concat(val)
          }, []);

          //console.log(flatOccupancyList);

          //1. Find total number of free areas
          var totalZeros;
          totalZeros = flatOccupancyList.filter(z => z === 0).length;
          console.log("Facility : " + element.id + ". Num Empty Areas: " + totalZeros);
          
          //2. Calculate length of Array List
          var numDeviceAreas = flatOccupancyList.length;
          console.log("Facility : " + element.id + ". Num Device Areas: " + numDeviceAreas);

          //2. Calculate Occupancy Status 
          var status = totalZeros / numDeviceAreas;
          console.log("Facility Status: " + status);


          //3. Filter into Occupancy Status Categories
          var facilityStatus; 

          if (status > 0.79){
            //Facility is Free
            facilityStatus = "FREE";
          }

          else if (status > 0.4 && status < 0.80){
            //Facility is Moderately Busy
            facilityStatus = "MODERATELEY BUSY";
          }
          else if (status >= 0 &&  status <= 0.4){
            //Facility is Busy
            facilityStatus = "BUSY";
          }
          else {
            //Facility status is Not available
            facilityStatus = "NOT AVAILABLE";
          }

          console.log("Facility Status (Words):" + facilityStatus);

          //Check if Facility Meets the requirements
          if (facilityStatus == occupancyTarget || occupancyTarget == "All Occupancy"){
              //Add Facility to Selected List
              //Create element object and add to selectedFacilityOccupancyList
              console.log("MATCH OCCUPANCY");
              var jsonObject = {city: element.city, id: element.id, latitude: element.latitude, longitude: element.longitude, name: element.name, ownerId: element.ownerId, occupancy: facilityStatus, selectedType: facilityTypeFilterChoice, indOccupancyList: flatOccupancyList}
              selectedFacilityOccupancyList.push(jsonObject);
          }

        }

      })
      .then(response => {
        //console.log(selectedFacilityOccupancyList);
        setFilteredFacilityData(selectedFacilityOccupancyList);
        setMainFacilityData(selectedFacilityOccupancyList);
        setIsLoading(false);
        endTime = moment().utcOffset('+05:00').format('HH:mm:ss');
        performanceTime = endTime - startTime;
        console.log("Start Time of FilterSubmit: " + startTime);
        console.log("End Time of FilterSubmit: " + endTime);

      })
      .catch(error => console.log(error));
    });
    


  }

  const handleOccupancyUpdate = (occupancyTarget, tempFilteredData) => {

    //Increase count for Special Occupancy Fetch


    let selectedFacilityOccupancyList = [];

    //Check if TempFilteredData is empty
    if (tempFilteredData.length == 0){
      //Do Nothing and set mainDataset to tempFilteredData, then set Loading to false
      setFilteredFacilityData(tempFilteredData);
      setMainFacilityData(tempFilteredData);
      setIsLoading(false);
      endTime = moment().utcOffset('+05:00').format('HH:mm:ss');
      performanceTime = endTime - startTime;
      console.log("Start Time of FilterSubmit: " + startTime);
      console.log("End Time of FilterSubmit: " + endTime);

    }
    else {
      //Iterate through the Facility Data
      occupancyFetchCount++;
      tempFilteredData.forEach(element => {
        //Call API for each Facility Devices
        const deviceFacilityURL = getDeviceInFacility + element.id;
        //console.log(deviceFacilityURL);
        let selectedDevicesOccupancyList = [];

        axios.get(deviceFacilityURL).then(res => {
            var deviceData = res.data;
            //console.log("Device Data: " + deviceData);

            //Iterate through the device list and push Facility element to list if it contains the target Occupancy Status       
            deviceData.forEach(elementDevice => {
                //console.log("Device Occupancy Target: " + occupancyTarget);
                let elementType = elementDevice.deviceType;
                if(elementType == "SwimmingPool"){
                      elementType = "SWIMMING";
                }
                elementType = (elementType).toUpperCase();
                //console.log(elementType);
                if (elementType == facilityTypeFilterChoice){
                    //console.log("Element: " + element.name);
                    selectedDevicesOccupancyList.push(elementDevice.currOccupancy);
                    //selectedFacilityTypeList.push(element);
                }
            }
            
            );
            
          //Calculate Facility Occupancy with each Device in each specific Facility

          //Iterate through selectedDeviceOccupancy List and convert to individual fields
          const arr = selectedDevicesOccupancyList;
          //console.log(arr);

          // To flat single level array
          const flatOccupancyList = arr.reduce((acc, val) => {
            return acc.concat(val)
          }, []);

          //console.log(flatOccupancyList);

          //1. Find total number of free areas
          var totalZeros;
          totalZeros = flatOccupancyList.filter(z => z === 0).length;
          //console.log("Facility : " + element.id + ". Num Empty Areas: " + totalZeros);
          
          //2. Calculate length of Array List
          var numDeviceAreas = flatOccupancyList.length;
          //console.log("Facility : " + element.id + ". Num Device Areas: " + numDeviceAreas);

          //2. Calculate Occupancy Status 
          var status = totalZeros / numDeviceAreas;
          //console.log("Facility Status: " + status);


          //3. Filter into Occupancy Status Categories
          var facilityStatus; 

          if (status > 0.79){
            //Facility is Free
            facilityStatus = "FREE";
          }

          else if (status > 0.4 && status < 0.80){
            //Facility is Moderately Busy
            facilityStatus = "MODERATELEY BUSY";
          }
          else if (status >= 0 &&  status <= 0.4){
            //Facility is Busy
            facilityStatus = "BUSY";
          }
          else {
            //Facility status is Not available
            facilityStatus = "NOT AVAILABLE";
          }

          //console.log("Facility Status (Words):" + facilityStatus);

          //Check if Facility Meets the requirements
          if (facilityStatus == occupancyTarget || occupancyTarget == "All Occupancy"){
              //Add Facility to Selected List
              //Create element object and add to selectedFacilityOccupancyList
              var jsonObject = {city: element.city, id: element.id, latitude: element.latitude, longitude: element.longitude, name: element.name, ownerId: element.ownerId, occupancy: facilityStatus, selectedType: facilityTypeFilterChoice, indOccupancyList: flatOccupancyList}
              selectedFacilityOccupancyList.push(jsonObject);
          }
          //console.log("Facility : " +element.id + ". Facility Status = " + facilityStatus + ". Status% = " + status);
          //console.log("Selected Facility Occupancy: " + selectedFacilityOccupancyList)
        })
        .then(response => {
          //console.log(selectedFacilityOccupancyList);
          setFilteredFacilityData(selectedFacilityOccupancyList);
          setMainFacilityData(selectedFacilityOccupancyList);

          endTime = moment().utcOffset('+05:00').format('HH:mm:ss');
          performanceTime = endTime - startTime;
          console.log("Start Time of FilterSubmit: " + startTime);
          console.log("End Time of FilterSubmit: " + endTime);

          console.log("-------------------------------------------------\n RangeFetchCount = " + rangeFetchCount + "\n TypeFetchCount = " + 
                      typeFetchCount + "\noccupancyfetch Count = " + occupancyFetchCount + 
                      "\n------------------------------------------------");

        })
        .catch(error => console.log(error))
        .done(() => {
            setIsLoading(false);
            //  setTimeout(function() {setIsLoading(false);}, 5000);
        })
      });
    }

  }

  
  const getCurrentOccupancy = (t) => {
     // console.log(t);
    if(t == 'FREE'){
      return '#28B625'
    }
    else if (t == 'BUSY'){
      return '#D32E2E'
    }
    else if (t == 'MODERATELEY BUSY'){
      return '#F9B70F'
    }
    else {
      return '#696A6D' //Not available
    }

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
        <View style ={styles.container}>
        <FlatList
            style = {styles.flatListStyle}
            data={mainFacilityData}
            keyExtractor={item => item.id}
            onRefresh= {() => handleFilterSubmit()}
            refreshing={isLoading}
            windowSize={3}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {navigation.navigate('Analytics', {
                facilityId: item.id, 
                title: item.name, 
                occupancy: item.occupancy,
                itemLatitude: item.latitude, 
                itemLongitude: item.longitude, 
                itemInitSelectedType: item.selectedType, 
                allFacilityTypeFilterList: facilityTypeFilterList
              })}}> 
                <View style={styles.listItem}>

                      <Icon 
                        name="star"  
                        size={27} 
                        color= {favourited ? 'yellow' : 'white'}/>        

                  <View style = {styles.SecondaryContent}>
                    <Text style={styles.listItemTextMain}>{item.name}</Text>
                    <Text style={styles.listItemTextSub}>{item.city}   |   Type: {item.selectedType}  </Text>
                  </View>

                  <IconMat
                      style = {{position: 'absolute', right: 10}}
                      name="circle"
                      size = {45}
                      color= {getCurrentOccupancy(item.occupancy)}
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
                        {/* <SearchComponent
                           marginLeft={10} 
                           marginRight={10} 
                           flex={3}
                        />  */}
                        <View style={{
                            flex: 2,
                            backgroundColor: "#E2F1DB", 
                            flexDirection: "row", 
                            borderRadius: 15,
                            marginLeft: 10, 
                            marginRight: 10,
                            height: 40
                        }}>
                            <Icon name="search" size={20} style={styles.iconSearchStyle}/>
                            <TextInput
                                placeholder="Search Facilities..."
                                placeholderTextColor="#463F3F"
                                style={styles.SearchInputStyle}
                                value ={search}
                                underlineColorAndoird="transparent"
                                onChangeText={(text) => searchFilter(text)}
                                               
                                />
                        </View>
                        <TouchableOpacity
                            onPress={() => showModal()}
                            >
                          <Ionicons 
                              name ="options"
                              size={35} 
                              color= 'black'/>
                        </TouchableOpacity>
                    </View>
                      <Modal visible={visible}>
                        <View style={styles.modal}>
                          <View style={{alignItems: 'flex-end'}}>
                              <TouchableOpacity
                                  style = {{alignItems: 'flex-end'}}
                                  onPress={() => hideModal()}
                                  >
                                <Ionicons 
                                    name ="close"
                                    size={35} 
                                    color= 'black'/>
                              </TouchableOpacity>
                          </View>
                          <Text style = {{textAlign: 'center', fontSize: 35, fontWeight: 'bold', color: '#0B5B13'}}>
                            Filter Facilities
                          </Text>
                          <View style={styles.filterOptions}>
                              <View style = {styles.itemModal}>

                                <Text style = {styles.filterText}>Select Facility Type:</Text>
                                        
                                <SelectDropdown
                                            data={facilityTypeFilterList}
                                            style={{ animated: true, fontSize: 14}} 
                                            buttonStyle={styles.buttonStyleDropdown} 
                                            defaultButtonText={facilityTypeFilterChoice}
                                            dropdownStyle={styles.dropdownStyle}
                                            onSelect={(selectedItem, index) => {
                                                setFacilityTypeFilterChoice(selectedItem);
                                                //handleTypeUpdate(selectedItem);
                                                console.log(selectedItem, index);
                                            }}
                                />

                              </View>
                              <View style = {styles.itemModal}>

                                <Text style = {styles.filterText}>Occupanct Status:</Text>
                                        
                                <SelectDropdown
                                        data={occupancyStatusFilterList}
                                        style={{animated: true, fontSize: 20}} 
                                        buttonStyle={styles.buttonStyleDropdown} 
                                        defaultButtonText={occupancyStatusFilterChoice}
                                        dropdownStyle={styles.dropdownStyle}
                                        onSelect={(selectedItem, index) => {
                                            setOccupancyStatusFilterChoice(selectedItem);
                                            console.log(selectedItem, index);
                                        }}
                                    >
                                      </SelectDropdown>

                              </View>
                              <View style = {styles.itemModal}>

                                <Text style = {styles.filterText}>Distance (Km):</Text>
                                        
                                <SelectDropdown
                                        data={distanceFilterList}
                                        style={{animated: true, fontSize: 20}} 
                                        buttonStyle={styles.buttonStyleDropdown} 
                                        defaultButtonText={distanceFilterChoice}
                                        dropdownStyle={styles.dropdownStyle}
                                        onSelect={(selectedItem, index) => {
                                            setDistanceFilterChoice(selectedItem);
                                            console.log(selectedItem, index);
                                        }}
                                    />

                              </View>
                              <View style = {styles.itemModal}>

                                <Text style = {styles.filterText}>City Choice:</Text>
                                        
                                <SelectDropdown
                                        data={cityFilterList}
                                        style={{animated: true, fontSize: 20}} 
                                        buttonStyle={styles.buttonStyleDropdown} 
                                        defaultButtonText={cityFilterChoice}
                                        dropdownStyle={styles.dropdownStyle}
                                        dropdownIconPosition={"left"}
                                        onSelect={(selectedItem, index) => {
                                            setCityFilterChoice(selectedItem);
                                            console.log(selectedItem, index);
                                        }}
                                    />

                              </View>
                         </View>
                         <View style={{alignItems: 'center', marginTop: 60}}>
                              <TouchableOpacity
                                  style = {styles.filterSubmitButton}
                                  onPress={() => {
                                    hideModal();
                                    handleFilterSubmit();
                                  
                                  }
                                }
                                  >
                                <Text style ={{color:'white', fontSize: 30, fontWeight: 'bold'}}>Apply</Text>
                              </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
                    
                     {renderFacilities()}


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
      paddingTop: 10, 
      paddingLeft: 2,

    },  
    containerStyle: {
      flex: 1, 
      backgroundColor: 'white', 
      padding: 24

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

    searchContainer: {
      flexDirection: 'row',
      padding: 3,
      paddingRight: 5
    }, 
    flatListStyle: {
      height: '100%', 
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
      marginLeft: 5,
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
    }, 
    itemModal: {
      flexDirection: 'row', 
      justifyContent: 'center', 
      margin: 20
    }, 
    textModal: {
      fontSize: 20, 
      fontWeight: 'bold'

    }, 
    filterOptions: {
      justifyContent: 'space-evenly', 
      marginTop: '20%', 
      alignItems: 'center'
    }, 
    filterText: {
      fontSize: 18, 
      fontWeight: 'bold', 
      color: 'black', 
      padding: 10
    }, 
    filterSubmitButton: {
      backgroundColor: '#2D0C57', 
      borderWidth: 2, 
      borderRadius: 40, 
      padding: 7

    }, 
    iconSearchStyle: {
      marginTop:8, 
      marginHorizontal: 8, 
      color: "black", 
      
  }, 

  searchInputStyle: {
      flex: 1, 
      fontSize: 16, 
      paddingVertical: 0, 
      margin: 0, 
      color: "black"
  }

    

   
  });



export default SearchScreen;
