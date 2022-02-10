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

const DeviceIndividual = ({navigation}) => {
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


    useEffect(() => {

        setFacilityID("12351513");
        setDeviceID("235esagd");

        setFacilityName("Carleton Heights Community Center");
        setFacilityOwner("John Manager");
        setDeviceName("CHeights_Device_1_Left");
        setDeviceLatitude("45.424721");
        setDeviceLongitude("-75.695000");
        setAreasMonitored(2);
        
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
                        <Text style={styles.subText}>Facility: {facilityName}</Text>
                        <Text style={styles.subText}>Manager: {facilityOwner}</Text>
                        <Text style={styles.subText}>Latitude: {deviceLatitude}</Text>
                        <Text style={styles.subText}>Longitude: {deviceLongitude}</Text>
                        <Text style={styles.subText}>Areas Monitored: {areasMonitored}</Text>
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
                            Area 1: 2, Area 2: 3, Time: 19:00 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 18:50 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 18:40 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 18:30 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 18:20 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 18:10 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 18:00 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 17:50 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 17:40 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 17:30 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 17:20 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 17:10 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 17:00 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 16:50 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 16:40 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 16:30 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 16:20 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 16:10 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 16:00 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 15:50 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 15:40 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 15:30 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 15:20 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 15:10 Est, Date: June 3rd, 2022
                            Area 1: 2, Area 2: 3, Time: 15:00 Est, Date: June 3rd, 2022
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