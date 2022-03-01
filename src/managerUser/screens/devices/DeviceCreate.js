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
    KeyboardAvoidingView, 
    DropDown
 

} from 'react-native';

//Imports
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';

//DropDown import
import SelectDropdown from 'react-native-select-dropdown';

//Import Screen
import CodeScanner from './CodeScanner';
import {RNCamera} from 'react-native-camera';

const registerDeviceURL = 'http://52.229.94.153:8080/device/register';
const getDeviceTypesURL = 'http://52.229.94.153:8080/device/types';
const areasMonitoredOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DeviceCreate = ({navigation, route}) => {
    //Route Params
    const { itemID, itemTitle, device_authID} = route.params;



    //Form Variables
    const [facilityName, setFacilityName] = useState("");
    const [facilityId, setFacilityId] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [authorizationId, setAuthorizationId] = useState("");
    const [areasMonitored, setAreasMonitored] = useState("");

    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);


    //Fetch Device Options
    const getDeviceTypes = () => {
        fetch(getDeviceTypesURL, {
            method: 'Get',
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
            //Set Device Type Options 
            setDeviceTypeOptions(resJSON);
            console.log(resJSON);

        })
        .catch(error => {
            console.log(error);
        })
        .done(() => {

        });
    }



    //Method: Register a Device in Facility
    const registerDevice = () => {
        console.log("facilityId: " + facilityId +
            ", name: " +  deviceName +
            ", authorizationId: " + authorizationId +
            " areasMonitored: " + areasMonitored +
            ", deviceType: " +  deviceType)

        let successfullPost = false;
        let errorMessage = "";
        fetch(registerDeviceURL, {
            method: 'Put',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                facilityId: facilityId, 
                name: deviceName,
                authorizationId: authorizationId,
                areasMonitored: areasMonitored,
                deviceType: deviceType, 
            }),
            credentials: 'include'
        })
        .then(response => {
            return response.json();
        })
        .then((resJSON) => {
            //TODO
            //Figure out if the update POST was successful or not, then update the successful variable
            console.log(resJSON);
            if (resJSON.error == "Internal Server Error"){
                errorMessage = "Error: Device was not create. Please enter the correct Authentication code";
                successfullPost = false;
            }
            else if (resJSON.error == "Bad Request"){
                errorMessage = "Error: Device was not created. Please make sure all fields are filled.";
                successfullPost = false;
            }
            else {
                successfullPost = true;
            }

        })
        .catch(error => {
            console.log(error);
            console.log("Error");
            successfullPost = false;
            errorMessage = error;
            console.log(error.SyntaxError);
            if (error == "SyntaxError: JSON Parse error: Unexpected end of input") {
                successfullPost = true;
                
            }
        })
        .done(() => {
            if (successfullPost){
                alert("You have successfully added the Device to the Facility");
                navigation.navigate("FacilityScreen_Page");
            }
            else {
                alert(errorMessage);
            }

        });

    }

    useEffect(() => {
        //Get request to get types of available devices
        getDeviceTypes();

        //Set variables from Facility Name and ID
        setFacilityName(itemTitle);
        setFacilityId(itemID);
        setAuthorizationId(device_authID);
        
      }, []);

    


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
                        name="save"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => registerDevice()}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>ADD DEVICE</Text>
                                    
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
                    <Text style={styles.titleText}>Create New Device</Text>
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
                    <Text style ={styles.fieldText}>Authorization ID:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={authorizationId}
                        placeholder="Enter Device Authorization ID here"
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setAuthorizationId(text)}
                    
                    ></TextInput>
                    <Text style ={styles.fieldText}>Device Type:</Text>
                    <SelectDropdown
                        data={deviceTypeOptions}
                        style={{animated: true, fontSize: 20}} 
                        buttonStyle={styles.buttonStyle} 
                        defaultButtonText="Select Device Type"
                        dropdownStyle={styles.dropdownStyle}
                        onSelect={(selectedItem, index) => {
                            setDeviceType(selectedItem);
                            console.log(selectedItem, index);
                        }}
                    />
                    <Text style ={styles.fieldText}>Areas Monitored:</Text>
                    <SelectDropdown
                        data={areasMonitoredOptions}
                        style={{animated: true, fontSize: 20, backgroundColor: 'green'}} 
                        buttonStyle={styles.buttonStyle} 
                        isFullWidth={true}
                        defaultButtonText="Select number of Areas"
                        dropdownStyle={styles.dropdownStyle}
                        onSelect={(selectedItem, index) => {
                            setAreasMonitored(selectedItem);
                            console.log(selectedItem, index);
                        }}
                    ></SelectDropdown>
                   
                </View>    
                       
            </SafeAreaView>
  
        </View>
    );
}

export default DeviceCreate;


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
        fontSize: 20, 
        fontWeight: 'bold'

    },
    facilityText: {
        fontSize: 20, 
        fontWeight: '400', 
        color: '#7B8574'

    },
    textInputStyle: {
        fontSize: 18,
        height: '13%', 
        borderWidth: 1, 
        paddingLeft: 20, 
        paddingRight: 20,
        margin: 7, 
        borderColor: 'black', 
        backgroundColor: '#E2F1DB'

    }, 
    fieldText: {
        fontSize: 17, 
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
      buttonStyle: {
        marginHorizontal: 6,
        width: '97%',
        backgroundColor: '#E2F1DB',
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',

      },

      dropdownStyle: {
        backgroundColor: '#84EA95',
        width: '90%',
        borderColor: '#0C4B16',
        borderWidth: 2,
        borderRadius: 20,

   
      },

});