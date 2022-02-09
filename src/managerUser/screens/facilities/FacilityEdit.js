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

const editFacilityURL = 'https://mywebsite.com/endpoint/';
const deleteFacilityURL = 'https://mywebsite.com/endpoint/';

const FacilityEdit = ({navigation}) => {
    //Form Variables
    const [facilityName, setFacilityName] = useState("");
    const [facilityCity, setFacilityCity] = useState("");
    const [facilityLatitude, setFacilityLatitude] = useState("");
    const [facilityLongitude, setFacilityLongitude] = useState("");



    //Method: Post Facility to the database
    const updateFacility = () => {
        let successfullPost = false;
        fetch(editFacilityURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                facilityName: facilityName, 
                facilityCity: facilityCity
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
                alert("You have successfully updated the Facility")
            }
            else {
                alert("Error: Facility was not updated. Please try again")
            }

        });

    }

    //Method: Delete Facility from database
    const deleteFacility = () => {
        let successfullPost = false;
        fetch(deleteFacilityURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                facilityName: facilityName, 
                facilityCity: facilityCity
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
                alert("You have successfully deleted the Facility")
            }
            else {
                alert("Error: Facility was not deleted. Please try again")
            }

        });

    }

    useEffect(() => {

        setFacilityName("Carleton Heights Community Center");
        setFacilityCity("Ottawa");
        setFacilityLatitude('45.24721');
        setFacilityLongitude('-75.695000');
        
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
                        onPress={() => updateFacility()}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>SAVE FACILITY</Text>
                                    
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
                    <Text style={styles.titleText}>Edit Facility</Text>
                </View>

                <View>
                <Text style ={styles.fieldText}>Facility Name:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={facilityName}
                        placeholder="Facility Name Here"
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setFacilityName(text)}
                    
                    ></TextInput>
                    <Text style ={styles.fieldText}>Facility City:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={facilityCity}
                        placeholder="Facility City Here"
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setFacilityCity(text)}
                    
                    ></TextInput>
                    <Text style ={styles.fieldText}>Latitude:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={facilityLatitude}
                        placeholder="Facility Latitude Here"
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setFacilityLatitude(text)}
                    
                    ></TextInput>
                    <Text style ={styles.fieldText}>Longitude:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={facilityLongitude}
                        placeholder="Facility Longitude Here"
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setFacilityLongitude(text)}
                    
                    ></TextInput>

                </View>
                

                    <TouchableOpacity style={styles.deleteButton}>
                        <IconMat.Button
                            name="delete"
                            color='#CD2323'
                            size={60}
                            backgroundColor="white"
                            onPress={() => alert("Are you sure you want to delete this Facility? This will also delete all of the Facility's devices.")}                            >
                            
                                            
                    </IconMat.Button>
                </TouchableOpacity>
             
                
                       
             
                    

            </SafeAreaView>
  
        </View>
    );
}

export default FacilityEdit;


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
        fontSize: 20, 
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
        margin: 1, 
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
    }
});