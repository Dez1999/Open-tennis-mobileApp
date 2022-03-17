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
    KeyboardAvoidingView

} from 'react-native';

//Imports
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import SelectDropdown from 'react-native-select-dropdown';

//API URL
import { editDeviceURL, deleteDeviceURL } from '../../../sharedComponents/services/ApiContext';

const DeviceEdit = ({navigation, route}) => {
    //Route Params
    const {facility_Name, device_Name, device_Type, numAreas, facility_Id, device_ID} = route.params;



    // facility_Name: facilityName, 
    // device_Name: deviceName, 
    // device_Type: deviceType, 
    // numAreas: areasMonitored, 
    // facility_Id: facilityID, 
    // device_ID: deviceID


    //Form Variables
    const [facilityName, setFacilityName] = useState("");
    const [deviceID, setDeviceId] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");



    //Method: Update Device information to the database
    const updateDevice = () => {

        const updateDeviceData = `${deviceID}?name=${deviceName}`;
        console.log("Update device data:" + updateDeviceData);
        const putDeviceURL = editDeviceURL + updateDeviceData;
        console.log("Update Device URL: " + putDeviceURL);

        fetch(putDeviceURL, {
            method: 'PUT',
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
            //Figure out if the update POST was successful or not, then update the successful variable

        })
        .catch(error => {
            console.log(error);
        })
        .done(() => {
            alert("You have successfully updated the Device")
            navigation.navigate("FacilityScreen_Page");
        
        });

    }

    //Method: Delete Facility from database
    const deleteFacility = () => {
        const deleteDeviceParams = `${deviceID}`;
        const deleteDevicePath = deleteDeviceURL + deleteDeviceParams;
        console.log("deletedeviceParams: " + deleteDeviceParams)
        console.log("DeleteDevicePath: " + deleteDeviceURL)
        console.log("Delete Device URL: " + deleteDevicePath);
        

        fetch(deleteDevicePath, {
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
            //Figure out if the update POST was successful or not, then update the successful variable

        })
        .catch(error => {
            //alert(error);
        })
        .done(() => {
            alert("You have successfully deleted the Device")
            navigation.navigate("FacilityScreen_Page");

        });

    }    

    useEffect(() => {

        setFacilityName(facility_Name);
        setDeviceName(device_Name);
        setDeviceId(device_ID);
        setDeviceType(device_Type);
        
      }, []);


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
                        name="save"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => updateDevice()}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>SAVE DEVICE</Text>
                                    
                    </Icon.Button>
                </View>
                <View style={styles.subHeader}>
                    <Text style={styles.facilityText}>{facilityName}</Text>
                </View>
                <View 
                        style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingTop: 5, 
                        marginBottom: 10
                  }}
                  ></View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Edit Device</Text>
                </View>

                <View>
                    <Text style ={styles.fieldText}>Device Name:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={deviceName}
                        placeholder="Enter Device Name here"
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setDeviceName(text)}
                    
                    ></TextInput>

                </View>
                

                    <TouchableOpacity style={styles.deleteButton}>
                        <IconMat.Button
                            name="delete"
                            color='#CD2323'
                            size={60}
                            backgroundColor="white"
                            onPress={() => alert("Are you sure you want to delete this Device?")}                            >
                            
                                            
                    </IconMat.Button>
                </TouchableOpacity>
             
                
                       
             
                    

            </SafeAreaView>
  
        </View>
    );
}

export default DeviceEdit;


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
        alignItems: 'center'
    },
    subHeader: {
        justifyContent: 'center'

    },
    titleText: {
        color: 'black', 
        fontSize: 25, 
        fontWeight: 'bold'

    },
    facilityText: {
        fontSize: 20, 
        fontWeight: '400', 
        color: '#7B8574'

    },
    textInputStyle: {
        height: 40, 
        borderWidth: 1, 
        paddingLeft: 20, 
        margin: 5, 
        borderColor: 'black', 
        backgroundColor: '#E2F1DB'

    }, 
    fieldText: {
        fontSize: 20, 
        color: 'black'
    }, 
    deleteButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9999)',
        position: 'absolute', 
        bottom: 0, 
        right: 0
    }, 
    dropdown_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        width: '95%',
        height: '90%',
        backgroundColor: '#E2F1DB',
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      dropdown_2_dropdown: {
        width: '90%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 3,
      },
});