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
    SafeAreaView, 
    SectionList

} from 'react-native';

//Imports
import Icon from 'react-native-vector-icons/FontAwesome';

//API URL
const postFacilityURL = 'https://mywebsite.com/endpoint/';
const getDevicesURL = 'http://52.229.94.153:8080/device/inFacility/';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const data = [
    {id:'1', title: 'CHEIGHTS -Tennis - 1st Half', areasMonitored: 2},
    {id:'2', title: 'CHEIGHTS - Tennis - 2nd Half', areasMonitored: 2}
  
  ]


const dataREAL = [
    {id: 3, ownerId: 1, facilityId: 2,
    name: "Device_Far_1",
    authorizationId: "16906220214084426226",
    inUse: true,
    areasMonitored: 0,
    deviceType: "SwimmingPool",
    currOccupancy: []
    },
    {
        id: 4,
        ownerId: 1,
        facilityId: 2,
        name: "Device_Far_Right",
        authorizationId: "4185022021408470626",
        inUse: true,
        areasMonitored: 3,
        deviceType: "SwimmingPool",
        currOccupancy: [
            0,
            0,
            0
        ]
    },
    {
        id: 5,
        ownerId: 1,
        facilityId: 2,
        name: "Device_Far_Left",
        authorizationId: "29442220214091243243",
        inUse: true,
        areasMonitored: 1,
        deviceType: "Tennis",
        currOccupancy: [
            0
        ]
    }
  
]

const FacilityIndividual = ({navigation, route}) => {

    //Route Params
    const { itemID, itemTitle, itemOwnerId, itemCity, itemLatitude, itemLongitude } = route.params;
    // itemID: item.id, 
    // itemOwnerId: item.ownerId,
    // itemTitle: item.name, 
    // itemCity: item.city,
    // itemLatitude: item.latitude, 
    // itemLongitude: item.longitude

    //Form Variables
    const [facilityID, setFacilityID] = useState("");
    const [facilityName, setFacilityName] = useState("");
    const [facilityCity, setFacilityCity] = useState("");
    const [facilityLatitude, setFacilityLatitude] = useState("");
    const [facilityLongitude, setFacilityLongitude] = useState("");


    const [facilityOwner, setFacilityOwner] = useState("");
    const [facilityCompany, setFacilityCompany] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [unmounted, setUnounted] = useState(true);

    const [allDevicesData, setAllDevices] = useState([]);


    //Retreive the Devices in the Facility
    const fetchDevices = () => {

        const selectedFacility = `${itemID}`;
        const fetchDevicePath = getDevicesURL + selectedFacility;
        console.log("Fetch all devices in Facility URL: " + fetchDevicePath);

        setIsLoading(true);
        fetch(fetchDevicePath,{
            method: 'Get',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     facilityName: facilityName, 
            //     facilityCity: facilityCity
            // }),
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            console.log("unmounted:" + unmounted);
            setAllDevices(responseJson);
            console.log(responseJson);
            //setRefreshing(false);
            setIsLoading(false);
            setError(false);
        })
        .catch(err => {
            setIsLoading(false);
            // setError(err);
        }).done(() => {
          setUnounted(false);
          //alert("You have successfully updated the Facility")
      
      });

    }


    useEffect(() => {

        //Fetch Devices in Facility
        fetchDevices();

        
        setFacilityID(itemID);
        setFacilityName(itemTitle);
        setFacilityCity(itemCity);
        setFacilityLatitude(itemLatitude);
        setFacilityLongitude(itemLongitude);
        setFacilityOwner("John Manager");
        setFacilityCompany("City of Ottawa")
        console.log("Facility ID: " + itemID);
        
      }, []);
    
      const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("DeviceIndividual_Page", {
                facility_Name: itemTitle,
                facility_ID: itemID,
                itemID: item.id, 
                itemTitle: item.name,
                itemAreas: item.areasMonitored,
                device_Type: item.deviceType,
                current_Occupancy: item.currOccupancy
              })
        }}> 
        <Item title={item.name} numAreas={item.areasMonitored} device_type={item.deviceType}/>
        </TouchableOpacity>
      );

      const Item = ({ title, numAreas, device_type }) => (
        <View style={styles.itemStyle}>
            <View>
                <Text style={styles.listItemTextMain}>{title}</Text>
                <Text style={styles.listItemTextSub}>Areas Monitored: {numAreas} </Text>
                <Text style={styles.listItemTextSub}>Device Type: {device_type} </Text>
           </View>
        </View>
      );

    const ItemSeparatorView = () => {
        return (
            <View
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            >

            </View>
        )
    }

    //Method: Get Devices from Facility
    const displayDevices = () => {
        return (
            <FlatList   
              data={allDevicesData}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={renderItem}

            >
            </FlatList>

        );

    }


//alert("Create new facility! Note just call FacilityCraete when ready")

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
                        onPress={() => navigation.navigate("FacilityEdit_Page", {
                            itemID: itemID, 
                            itemOwnerId: itemOwnerId,
                            itemTitle: itemTitle, 
                            itemCity: itemCity,
                            itemLatitude: itemLatitude, 
                            itemLongitude: itemLongitude
                          })}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>EDIT</Text>
                                    
                    </Icon.Button>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{facilityName}</Text>

                    <View>
                        <Text style={styles.subText}>City: {facilityCity}</Text>
                        <Text style={styles.subText}>Latitude: {facilityLatitude}</Text>
                        <Text style={styles.subText}>Longitude: {facilityLongitude}</Text>
                        {/* <Text style={styles.subText}>Owner: {facilityOwner}</Text>
                        <Text style={styles.subText}>Company: {facilityCompany}</Text> */}
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
                    
                    <Text style={{fontWeight:'bold', color: 'black', fontSize: 17, textAlign: 'center'}}>Devices</Text>
                    {/* <SectionList
                        sections={allDevicesData}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item title={item.name} numAreas={item.areasMonitored} />}
                        renderSectionHeader={({ section: { deviceType } }) => (
                            <Text style={styles.header}>{deviceType}</Text>
                        )}
                    /> */}

                    {displayDevices()}
                    
            
                </View>

              
                    <TouchableOpacity style={styles.addButton}>
                        <Icon.Button
                            name="plus-circle"
                            color='#2D0C57'
                            size={60}
                            backgroundColor="white"
                            onPress={() => navigation.navigate("QRScanner_Page", {
                                facility_id: facilityID, 
                                facility_title: facilityName
                              })
                            }
                            >
                           
                                        
                        </Icon.Button>
                    </TouchableOpacity>
                    
             
                
                       
             
                    

            </SafeAreaView>
  
        </View>
    );
}

export default FacilityIndividual;


const styles = StyleSheet.create ({
    container: {
      backgroundColor: 'white', 
      padding: 5

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
    addButton: {
        position: 'absolute', 
        bottom: 0, 
        right: 0
    }, 
    listItemTextMain: {
        fontSize: 20, 
        color: '#000000', 
        fontWeight: 'bold', 
        paddingTop: 2
      }, 
      listItemTextSub: {
          fontSize: 16, 
          color: '#000000', 
          paddingTop: 3
      
      },
      itemStyle: {
        flexDirection: 'column',
        marginTop: 10,

        padding: 12,
        flexDirection: 'row',
        justifyContent : 'flex-start',
        alignItems: 'center',
        backgroundColor: '#A4BADA',
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

});