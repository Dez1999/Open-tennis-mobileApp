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

const postFacilityURL = 'https://mywebsite.com/endpoint/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DeviceIndividual = ({navigation, route}) => {
    //Route Params
    const { facility_Name, facility_ID, itemID, itemTitle, itemAreas, device_Type, current_Occupancy} = route.params;
    // facillityId: facilityID,
    //             itemID: item.id, 
    //             itemTitle: item.name,
    //             itemAreas: item.areasMonitored,
    //             itemType: item.deviceType


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

    const [currOccupancy, setCurrOccupancy] = useState("");


    useEffect(() => {

        setFacilityID(facility_ID);
        setDeviceID(itemID);

        setFacilityName(facility_Name);
        setFacilityOwner("John Manager");
        setDeviceName(itemTitle);
        setDeviceLatitude("45.424721");
        setDeviceLongitude("-75.695000");
        setAreasMonitored(itemAreas);
        
      }, []);

    //Method: Get Devices from Facility
    const fetchOccupancyData = () => {

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
                
                <View style={{marginTop: 10, marginLeft: 5}}>
                    
                    <Text style={{fontWeight:'bold', color: 'black', fontSize: 17}}>Occupancy Data</Text>

                    {fetchOccupancyData()}
                    
            
                </View>
                    <View style= {styles.occupancyData}>
                        <Text style = {{fontWeight: 'bold'}}>

                        </Text>


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
        bordercolor: 'black', 
        borderWidth: 2, 
        padding: 5, 
        justifyContent: 'center', 
        alignContent: 'center', 
        textAlign: 'center'


    }

});