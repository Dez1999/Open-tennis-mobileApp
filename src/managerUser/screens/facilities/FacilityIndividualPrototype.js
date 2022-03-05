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



//Custom Window Sizes
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
    }, 
    {
        id: 10,
        ownerId: 1,
        facilityId: 2,
        name: "Device_Far_Right",
        authorizationId: "29442220214091243243",
        inUse: true,
        areasMonitored: 1,
        deviceType: "BasketBall",
        currOccupancy: [
            0
        ]
    }
  
]


const tennisDeviceData = [{title: "Tennis", data: []}];
    const basketballDeviceData = [{title: "Basketball", data: [{
        id: 10,
        ownerId: 1,
        facilityId: 2,
        name: "Device_Far_Right",
        authorizationId: "29442220214091243243",
        inUse: true,
        areasMonitored: 1,
        deviceType: "BasketBall",
        currOccupancy: [
            0
        ]
    }]}];
    const swimmingDeviceData = [{title: "Swimming Pool", data: [{id: 3, ownerId: 1, facilityId: 2,
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
        id: 20,
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
    }
    , 
    {
        id: 21,
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
    }]}];

const FacilityIndividualPrototype = ({navigation, route}) => {

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
    const [isDataReady, setIsDataReady] = useState(false);

    //Device Type List
    const [allDevicesData, setAllDevices] = useState([]);
    const tennisData = [];
    const basketballData = [];
    const swimmingData = [];
    const [hasTennisList, setHasTennisList] = useState(false);
    const [hasBasketballList, setHasBasketballList] = useState(false);
    const [hasSwimmingList, setHasSwimmingList] = useState(false);

    

    //Device Categories
    const deviceTypeList = ["Tennis", "BasketBall", "SwimmingPool"];


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
          handleDeviceTypeLists();
          //alert("You have successfully updated the Facility")
      
      });

    }

    handleDeviceTypeLists = () => {
        if (!isLoading){
            //1. Call server to get types of devices
            //2. Create a list for each device type from server
            //3. Iterate through all devices in Facility and if the devuce Type matches the name of the Device list name then add the object to the list
            //4. Cycle through each new list and 
            //Iterate through the device list and push Facility element to list if it contains the target device type
            dataREAL.forEach(elementDevice => {
                let elementType = elementDevice.deviceType;
                console.log(elementType);
                if (elementType == deviceTypeList[0]){
                    console.log( deviceTypeList[0] + ": " + elementDevice.name);
                    //Add to tennis List
                    tennisData.push(elementDevice);
                    setHasTennisList(true);
                    console.log("Tennis data_: " + tennisData.length);
                }
                else if (elementType == deviceTypeList[1]){
                    console.log( deviceTypeList[1] + ": " + elementDevice.name);
                    //Add to Basketball List
                    basketballData.push(elementDevice);
                    setHasBasketballList(true);
                    console.log("Basketball data_: " + basketballData.length);
                   
                }
                else if (elementType == deviceTypeList[2]){
                    console.log( deviceTypeList[2] + ": " + elementDevice.name);
                    //Add to Swimming List
                    swimmingData.push(elementDevice);
                    console.log(swimmingData);
                    setHasSwimmingList(true);
                    console.log("Swimming data_: " + swimmingData.length);
                }
            });
            console.log(tennisDeviceData.data);
            tennisDeviceData.data = tennisData;
            console.log(tennisDeviceData.data);
            basketballDeviceData["data"] = basketballData;
            console.log(basketballDeviceData.data);
            swimmingDeviceData.data = swimmingData;
            console.log(swimmingDeviceData.data);
            console.log("Tennis data: " + tennisDeviceData.length);
            console.log("Basketball data: " + basketballDeviceData.length);
            console.log("Swimming data: " + swimmingDeviceData.length);
            setIsDataReady(true);
            console.log("Data is ready: " + isDataReady);
            setIsLoading(true);

        }
    }


    useEffect(() => {

        //Fetch Devices in Facility
        //fetchDevices();
        setIsLoading(true);
        handleDeviceTypeLists();
        
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
        console.log('Tennis: ' + hasTennisList +", Basketball: " + hasBasketballList + ", Swimming: " + hasSwimmingList)
        console.log("****Data is ready: " + isDataReady);
        console.log(tennisDeviceData.data);
        console.log("*Basketball data: " + basketballDeviceData.length);
        console.log("*Swimming data: " + swimmingDeviceData.length);
        if(isDataReady){
            if (hasTennisList && hasBasketballList && hasSwimmingList){
                return (
                    <SectionList
                                sections={[...tennisDeviceData, ...basketballDeviceData, ...swimmingDeviceData]}
                                keyExtractor={item =>item.id}
                                renderItem={({ item }) => <TouchableOpacity onPress={() => {
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
                                </TouchableOpacity>}
                                renderSectionHeader={({section}) => (
                                    <View >
                                        <Text style={styles.sectionTitleText}>{section.title}</Text>
                                    </View>
                                    
                                )}
                    /> 
                    // <FlatList   
                    //   data={allDevicesData}
                    //   keyExtractor={(item, index) => index.toString()}
                    //   ItemSeparatorComponent={ItemSeparatorView}
                    //   renderItem={renderItem}

                    // >
                    // </FlatList>

                );
            }
            else if (hasTennisList && hasBasketballList){
                return (
                    <SectionList
                                sections={[...tennisDeviceData, ...basketballDeviceData]}
                                keyExtractor={item =>item.id}
                                renderItem={({ item }) => <TouchableOpacity onPress={() => {
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
                                </TouchableOpacity>}
                                renderSectionHeader={({section}) => (
                                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                                )}
                    /> 

                );
            }
            else if (hasTennisList && hasSwimmingList){
                return (
                    <SectionList
                                sections={[...tennisDeviceData, ...swimmingDeviceData]}
                                keyExtractor={item =>item.id}
                                renderItem={({ item }) => <TouchableOpacity onPress={() => {
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
                                </TouchableOpacity>}
                                renderSectionHeader={({section}) => (
                                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                                )}
                    /> 

                );
            }
            else if (hasBasketballList && hasSwimmingList){
                return (
                    <SectionList
                                sections={[ ...basketballDeviceData, ...swimmingDeviceData]}
                                keyExtractor={item =>item.id}
                                renderItem={({ item }) => <TouchableOpacity onPress={() => {
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
                                </TouchableOpacity>}
                                renderSectionHeader={({section}) => (
                                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                                )}
                    /> 

                );
            }
            else if (hasTennisList){
                return (
                    <SectionList
                                sections={[...tennisDeviceData]}
                                keyExtractor={item =>item.id}
                                renderItem={({ item }) => <TouchableOpacity onPress={() => {
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
                                </TouchableOpacity>}
                                renderSectionHeader={({section}) => (
                                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                                )}
                    /> 

                );
            }
            else if (hasBasketballList){
                return (
                    <SectionList
                                sections={[...basketballDeviceData]}
                                keyExtractor={item =>item.id}
                                renderItem={({ item }) => <TouchableOpacity onPress={() => {
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
                                </TouchableOpacity>}
                                renderSectionHeader={({section}) => (
                                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                                )}
                    /> 
                );
            }
            else if (hasSwimmingList){
                return (
                    <SectionList
                                sections={[...swimmingDeviceData]}
                                keyExtractor={item =>item.id}
                                renderItem={({ item }) => <TouchableOpacity onPress={() => {
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
                                </TouchableOpacity>}
                                renderSectionHeader={({section}) => (
                                    <Text style={styles.sectionTitleText}>{section.title}</Text>
                                )}
                    /> 
                );
            }
        }

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
                
                <View style={{marginTop: 10, marginLeft: 5, height: '72%'}}>
                    
                    <Text style={{fontWeight:'bold', color: 'black', fontSize: 17, textAlign: 'center'}}>Devices</Text>
                    {/* <SectionList
                        sections={[...tennisDeviceData, ...basketballDeviceData, ...swimmingDeviceData]}
                        keyExtractor={item =>item.id}
                        renderItem={({ item }) => <Item title={item.name} numAreas={item.areasMonitored} device_type={item.deviceType}/>}
                        renderSectionHeader={({section}) => (
                            <Text style={styles.header}>{section.deviceType}</Text>
                        )}
                    />  */}

                    {/*
                        1. Call server to get types of devices
                        2. Create a list for each device type from server
                        3. Iterate through all devices in Facility and if the devuce Type matches the name of the Device list name then add the object to the list
                        4. Cycle through each new list and 
                    */}

                    {displayDevices()}
               
                    
            
                </View>

              
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={() => navigation.navigate("QRScanner_Page", {
                            facility_id: facilityID, 
                            facility_title: facilityName
                          })
                        }
                    
                    >
                        <Icon
                            name="plus-circle"
                            color='#2D0C57'
                            size={60}
                            // backgroundColor="white"
                            
                            >           
                        </Icon>
                    </TouchableOpacity>

            </SafeAreaView>
  
        </View>
    );
}

export default FacilityIndividualPrototype;


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
        right: 0, 
        
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
    sectionTitleText: {
        fontSize: 25, 
        color: 'black', 
        fontWeight: 'bold', 
        backgroundColor:'#C7EAD1', 
        borderColor: 'black', 
        marginRight:5,
        marginTop: 15

    }

});