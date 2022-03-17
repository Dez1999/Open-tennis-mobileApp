import React, {useState, useEffect} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    Dimensions, 
    TouchableOpacity, 
    FlatList, 
    ActivityIndicator, 
    TextInput, 
    SafeAreaView

} from 'react-native';

//Imports
import Icon from 'react-native-vector-icons/FontAwesome';

//DropDown import
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Import API
import { getDataBetweenDatesURL } from '../../../sharedComponents/services/ApiContext';

const DeviceIndividual = ({navigation, route}) => {
    //Route Params
    const { facility_Name, facility_ID, itemID, itemTitle, itemAreas, device_Type, current_Occupancy} = route.params;

    //Main Variables
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [isDataEmpty, setIsDataEmpty] = useState(false);


    //Form Variables
    const [facilityID, setFacilityID] = useState("");
    const [deviceID, setDeviceID] = useState("");
    const [facilityName, setFacilityName] = useState("");
    const [facilityOwner, setFacilityOwner] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [deviceLatitude, setDeviceLatitude] = useState("");
    const [deviceLongitude, setDeviceLongitude] = useState("");
    const [areasMonitored, setAreasMonitored] = useState("");
    const [deviceType, setDeviceType] = useState("");

    //Occupancy Details
    const [areaReferencesData, setAreaReferencesData] = useState([]);
    const [targetReferenceArea, setTargetReferenceArea] = useState("");
    const [occupancyData, setOccupancyData] = useState("");


    useEffect(() => {

        setFacilityID(facility_ID);
        setDeviceID(itemID);
        setFacilityName(facility_Name);
        setDeviceName(itemTitle);
        setAreasMonitored(itemAreas);
        handleNumberRefAreas();
        setTargetReferenceArea(0);
        getAreaData(0);

      }, []);

    useEffect(() => {
        setTimeout(() => {
            if (targetReferenceArea == ""){
                getAreaData(0);
            }
            else {
                getAreaData(targetReferenceArea);
            }
            
        }, 300000);
    }, []);


    const handleNumberRefAreas = () => {
        let areasRefList = [];

        for(let i = 0; i < itemAreas; i++){
            let item = "Area " + (i+1);
            areasRefList.push(item);
        }
        console.log(areasRefList);

        setAreaReferencesData(areasRefList);
    }


    const getAreaData = (numRef) => {

        //Set current date and time (including the starting date)
        const startDate = "2022-02-01";
        const toDate = moment().utcOffset('+05:00').format('YYYY-MM-DD');
        const toTime = moment().utcOffset('+05:00').format('HH:mm:ss');


        const details = `fromDateTime=${startDate}T01:00:00&ToDateTime=${toDate}T${toTime}&deviceId=${itemID}&referenceNumber=${numRef}`;
        const deviceDataPath = getDataBetweenDatesURL + details;

        console.log("Area Monitored Data URL: " + deviceDataPath);
        setIsLoading(true);
        setIsDataEmpty(false);
        
        fetch(deviceDataPath,{
            method: 'Get',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            setOccupancyData(responseJson);
            setTargetReferenceArea(numRef);
            setIsLoading(false);

            if (responseJson && responseJson.length > 0) {
                setIsDataEmpty(false);
            }
            else {
                setIsDataEmpty(true);
            }
        })
        .catch(err => {
            setIsLoading(false);
            alert(err);
        }).done(() => { 
          //alert("You have successfully updated the Facility")
      
      });
    }

    const item = ({item}) => {
        return (
            <View style={{flexDirection:'row'}}>
                <View style={styles.dataField}>
                    <Text style ={styles.rowText}>{item.date}</Text>
                </View>
                <View style={styles.dataField}>
                    <Text style ={styles.rowText}>{item.time}</Text>
                </View>
                <View style={styles.dataField}>
                    <Text style ={styles.rowText}>{item.dayOfWeek}</Text>
                </View>
                <View style={styles.dataField}>
                    <Text style={{textAlign:'center', color: 'black'}} >{item.count}</Text>
                </View>
            </View>
        )
    }

    //Method: Get Devices from Facility
    const displayOccupancyData = () => {
        //Check if the data is currently being fetched
        if (isDataEmpty) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18}}>
                     There is no data for this Area. 
                    </Text>
                </View>
                );

        }
        if (isLoading) {
            return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#82CB76" />
            </View>
            );
        }

        //Check if there is an error while fetching the data
        if (isError) {
            return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18}}>
                Error fetching data...
                </Text>
            </View>
            );
        }
        return (

                <FlatList
                    data = {occupancyData}
                    renderItem={item}
                    keyExtractor={(item, index) => index.toString()}
                        >
                </FlatList>
  
    
            );

    }




    const handleAreaChange=(reference) => {
        //Extract Reference number
        //Update main Data list with updated filter
        var numRef = reference.replace('Area ','');
        numRef = numRef - 1;
        console.log("Reference Number: " + numRef);  


        //Set new target reference ID
        setTargetReferenceArea(reference);

        //Fetch Data for Selected Monitored Reference Area
        getAreaData(numRef);

    }



    return(
        <View style ={styles.container}>
            <SafeAreaView style={{backgroundColor:'white', height: '100%'}}>
                <View style = {styles.header}>
                     <Icon.Button
                        name="arrow-left"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => navigation.goBack()}
                        >
                                    
                    </Icon.Button>
                    <Icon.Button
                        name="edit"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => navigation.navigate("DeviceEdit_Page", {
                            facility_Name: facilityName, 
                            device_Name: deviceName, 
                            device_Type: deviceType, 
                            numAreas: areasMonitored, 
                            facility_Id: facilityID, 
                            device_ID: deviceID
                          })}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>EDIT</Text>
                                    
                    </Icon.Button>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{deviceName}</Text>

                    <View>
                        <Text style={styles.subText}>Facility: {facility_Name}</Text>
                        <Text style={styles.subText}>FacilityID: {facility_ID}</Text>
                        <Text style={styles.subText}>Areas Monitored: {areasMonitored}</Text>
                        <Text style={styles.subText}>Device Type: {device_Type}</Text>
                    </View>
                    <View 
                        style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingTop: 5
                  }}
                  >
                    </View>
                </View>

                <View style={{marginTop: 10, marginLeft: 5, flexDirection: 'row'}}>
                    <Text style={styles.selectText}>Select Monitored Area: </Text>
                    <SelectDropdown
                            data={areaReferencesData}
                            style={{animated: true, fontSize: 20}} 
                            buttonStyle={styles.buttonStyle} 
                            defaultButtonText="Area 1"
                            dropdownStyle={styles.dropdownStyle}
                            
                            onSelect={(selectedItem, index) => {
                                handleAreaChange(selectedItem);
                                console.log(selectedItem, index);
                            }}
                        />

                </View>
                
                <View style={{marginTop: 10, marginLeft: 5}}>
                    
                    <Text style={{fontWeight:'bold', color: 'white', fontSize: 17}}>Occupancy Data</Text>                    
            
                </View>
                    <View style= {styles.occupancyData}>
                            
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.headerField}>
                                <Text style={styles.headerText}>Date</Text>
                            </View>
                            <View style={styles.headerField}>
                                <Text style={styles.headerText}>Time (24 Hr)</Text>
                            </View>
                            <View style={styles.headerField}>
                                <Text style={styles.headerText}>Day</Text>
                            </View>
                            <View style={styles.headerField}>
                                <Text style={styles.headerText}>Occupancy Count</Text>
                            </View>
                        </View>
  
                        {displayOccupancyData()}

                    </View>                    

            </SafeAreaView>
  
        </View>
    );
}

export default DeviceIndividual;


const styles = StyleSheet.create ({
    container: {
      backgroundColor: 'white', 
      padding: 10

    }, 
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between'

    }, 
    title: {
        justifyContent: 'center',  
        paddingLeft: 5,

    },
    titleText: {
        color: '#0B5B13',
        fontSize: 25, 
        fontWeight: '700'

    },
    subText: {
        color: 'black', 
    }, 
    occupancyData: { 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center',
        textAlign: 'center', 

        height: '60%'

    }, 
    selectText: {
        fontSize: 18, 
        color: 'black', 
        fontWeight: 'bold'

    },
    buttonStyle: {
        width: '50%',
        height: '140%',
        backgroundColor: '#3ECD4C',
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 12

      },

      dropdownStyle: {
        width: '50%',
        borderColor: '#0C4B16',
        borderWidth: 2,

      },
      headerText: {
          color: 'black', 
          fontSize: 15, 
          fontWeight:'bold'
      },
      headerField: {
        width: '25%', 
        backgroundColor:'#629AEF', 
        bordercolor: 'black', 
        borderWidth: 2,
      },
      rowText: {
          color: 'black', 

      }, 
      dataField: {
        width: '25%', 
        backgroundColor:'white', 
        bordercolor: 'black', 
        borderWidth: 2, 

      }

});