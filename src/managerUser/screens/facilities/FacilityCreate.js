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

const FacilityCreate = ({navigation}) => {
    //Form Variables
    const [facilityID, setFacilityID] = useState("");
    const [facilityName, setFacilityName] = useState("");
    const [facilityCity, setFacilityCity] = useState("");



    //Method: Post Facility to the database
    const createFacility = () => {
        let successfullPost = false;
        fetch(postFacilityURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                facilityID: facilityID,
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
            //Figure out if the post was successful or not, then update the successful variable

        })
        .catch(error => {
            alert(error);
        })
        .done(() => {
            if (successfullPost){
                alert("You have successfully created a Facility")
            }
            else {
                alert("Error: facility was not created. Please try again")
            }

        });

    }


//alert("Create new facility! Note just call FacilityCraete when ready")

    return(
        <View style ={styles.container}>
            <SafeAreaView>
                <View style = {styles.header}>
                     <Icon.Button
                        name="arrow-left"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => alert("Go Back to Facility Screen")}
                        >
                                    
                    </Icon.Button>
                    <Icon.Button
                        name="save"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => createFacility()}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>CREATE</Text>
                                    
                    </Icon.Button>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Create New Facility</Text>
                </View>

                <View>
                    <Text style ={styles.fieldText}>Facility Id:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={facilityID}
                        placeholder="Facility ID Here"
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setFacilityID(text)}
                    
                    ></TextInput>
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

                </View>
                
                       
             
                    

            </SafeAreaView>
  
        </View>
    );
}

export default FacilityCreate;


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
    titleText: {
        color: 'black', 
        fontSize: 25, 
        fontWeight: 'bold'

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
    }
});