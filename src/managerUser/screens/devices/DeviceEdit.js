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

const editDeviceURL = 'https://mywebsite.com/endpoint/';
const deleteDeviceURL = 'https://mywebsite.com/endpoint/';

const DeviceEdit = ({navigation}) => {
    //Form Variables
    const [facilityName, setFacilityName] = useState("");
    const [deviceID, setDeviceId] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");



    //Method: Post Facility to the database
    const updateDevice = () => {
        let successfullPost = false;
        fetch(editDeviceURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deviceID: deviceID, 
                deviceName: deviceName,
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

        })
        .catch(error => {
            alert(error);
        })
        .done(() => {
            if (successfullPost){
                alert("You have successfully updated the Device")
            }
            else {
                alert("Error: Device was not updated. Please try again")
            }

        });

    }

    //Method: Delete Device from database
    const deleteFacility = () => {
        let successfullPost = false;
        fetch(deleteDeviceURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deviceID: deviceID, 
                deviceName: deviceName,
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

        })
        .catch(error => {
            alert(error);
        })
        .done(() => {
            if (successfullPost){
                alert("You have successfully deleted the Device")
            }
            else {
                alert("Error: Device was not deleted. Please try again")
            }

        });

    }

    useEffect(() => {

        setFacilityName("Carleton Heights Community Center");
        setDeviceName("Ottawa");
        setDeviceId('29oo_12');
        setDeviceType("Tennis");
        
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
                        onPress={() => alert("Go Back to Indivual Facility Screen")}
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
                    <Text style ={styles.fieldText}>Device Id:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={deviceID}
                        placeholder={deviceID}
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setDeviceID(text)}
                    
                    ></TextInput>
                    <Text style ={styles.fieldText}>Device Name:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={deviceName}
                        placeholder={deviceName}
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setDeviceName(text)}
                    
                    ></TextInput>
                    <Text style ={styles.fieldText}>Device Type:</Text>
                    <ModalDropdown options={['Tennis', 'Basketball', 'Hockey']} style={{animated: true}} defaultValue = 'Tennis' isFullWidth={true}/>

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
      backgroundColor: 'white'

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
    }
});