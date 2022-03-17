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

//Import Camera
import {RNCamera} from 'react-native-camera';

const CodeScanner = ({navigation, route}) => {

    const {facility_id, facility_title} = route.params;

    const [facilityID, setFacilityID] = useState("");
    const [facilityName, setFacilityName] = useState("");
    const [authDeviceCode, setAuthDeviceCode] = useState("");
    const [isBarCodeRead, setisBarCodeRead] = useState(false);
    const [isAuthCodeRead, setIsAuthCodeRead] = useState(false);


    useEffect(() => {
        //Set variables from Facility Name and ID
        setFacilityName(facility_title);
        setFacilityID(facility_id);
        console.log("facility: " + facility_id + ", " + facility_title);
        
      }, []);

    readBarCode = (e) => {
        if (!isBarCodeRead) {
            setisBarCodeRead(true);
            setAuthDeviceCode(e.data);
            setIsAuthCodeRead(true);
            console.log(e.data);
        } 
    }

    ReScanBarCode = () => {
        setIsAuthCodeRead(false);
        setAuthDeviceCode("");
        setisBarCodeRead(false);
    }

    renderBottomSection = () => {
        if (!isAuthCodeRead) {
            return(
                <View style ={styles.bottomResultArea}>
                    <Text style={styles.instructionText}>Please Scan the QR Code of the Device</Text>
                </View>
            )
        }
        else {
            return (
                <View style ={styles.bottomResultArea}>
                    <Text style={styles.codeText}>Code: {authDeviceCode}</Text>
                    <View style={styles.resultBottomView}>
                        <TouchableOpacity
                            style={styles.reScanButton}
                            onPress={() => ReScanBarCode()}
                        >
                            <Text style={styles.buttonText}>Re-Scan</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => navigation.navigate("DeviceCreate_Page", {
                                itemID: facilityID, 
                                itemTitle: facilityName, 
                                device_authID: authDeviceCode
                            })
                            }
                            >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    }

    return (
        <View style ={styles.container}>
            <SafeAreaView style={{backgroundColor:'white', height: '100%', flexgrow: 1}}>
                <View style = {styles.topContent}>
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
                            name="sign-in"
                            color='black'
                            size={30}
                            backgroundColor="white"
                            onPress={() => navigation.navigate("DeviceCreate_Page", {
                                itemID: facilityID, 
                                itemTitle: facilityName, 
                                device_authID: authDeviceCode
                            })
                            }
                            >
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>Add Code 
                            Manually</Text>
                                        
                        </Icon.Button>
                    </View>
                    <View style={{flex:1, marginBottom: 5}}>
                        <Text style={{textAlign: 'center', fontSize: 25, color: 'black', fontWeight: 'bold'}}>Add Device</Text>
                    </View>
                </View>
                <View style={{flex:0}}>
                   
                </View>

                <View style={{flex: 12, flexDirection: 'column'}}>
           
                    <View style={styles.camera}>
                        <RNCamera
                            ref={ref => {
                                camera = ref;
                            }}
                            captureAudio={false}
                            style ={{ 
                                width: '100%',
                                height: 500, 
                                overflow: 'hidden'
                            }}
                            onBarCodeRead={( barcode ) => {
                                readBarCode(barcode);
                            }}
                            >
                        </RNCamera> 

                    </View> 
                    <View style={styles.bottomHeader}>

                            {renderBottomSection()}
    
                   </View>
                </View>
                
                       
            </SafeAreaView>
            
  
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'white', 
        padding: 5, 
  
      }, 
      topContent:{
        flexDirection: 'column', 
        flex: 2.5, 
      },
      header: {
          flexDirection: 'row', 
          justifyContent: 'space-between', 
  
      }, 
      title: {
          backgroundColor: 'white',
          justifyContent: 'center',  
          alignItems: 'center', 
          flex: 1
      },
      subHeader: {
          backgroundColor: 'grey',
          justifyContent: 'center', 
          flex: 0
  
      },
      camera: {
          flex: 1,
          height: 400
      },
      bottomHeader: {
          flex: 0.4, 
          width: '90%',
          marginRight: 20, 
          marginLeft: 20, 
          backgroundColor: '#CFD9C8', 
          borderRadius: 10, 
          borderWidth: 2, 
          borderColor: 'black'

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
      resultBottomView: {
          justifyContent: 'space-between', 
          flexDirection: 'row', 
      }, 
      instructionText: {
          textAlign: 'center', 
          fontSize: 25, 
          color: '#CD3400'

      }, 
      resultText: {
          textAlign: 'center', 
          fontSize: 18
      }, 
      reScanButton: {
          backgroundColor: "#CD2323",
          borderRadius: 10, 
          padding: 5

      }, 
      confirmButton: {
          backgroundColor: "#2A49B6", 
          borderRadius: 10, 
          padding: 5

      }, 
      buttonText: {
          fontSize: 30, 
          color: 'white'
      }, 
      codeText: {
          fontSize: 20, 
          color: 'black', 
          textAlign: 'center', 
          paddingBottom: 25
      }, 
      bottomResultArea: {
          padding: 10, 
          height: '90%', 
          justifyContent: 'center'

      }
});

export default CodeScanner;

