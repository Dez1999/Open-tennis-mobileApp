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

const postFacilityURL = 'http://52.229.94.153:8080/facility';

const FacilityCreate = ({navigation}) => {
    //Form Variables
    const [facilityName, setFacilityName] = useState("");
    const [facilityCity, setFacilityCity] = useState("");
    const [facilityLatitude, setFacilityLatitude] = useState("");
    const [facilityLongitude, setFacilityLongitude] = useState("");



    //Method: Post Facility to the database
    const createFacility = () => {
        let successfullPost = true;
        fetch(postFacilityURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: facilityName, 
                city: facilityCity, 
                latitude: facilityLatitude,
                longitude: facilityLongitude,
            }),
            credentials: 'include'
        })
        .then(response => {
            return response.json();
        })
        .then((resJSON) => {
            //TODO
            //Currently no response from the backend

        })
        .catch(error => {
            console.log(error);
        })
        .done(() => {

            alert("You have successfully created a new Facility");
            navigation.goBack();

        });

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
                
                       
             
                    

            </SafeAreaView>
  
        </View>
    );
}

export default FacilityCreate;


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
    titleText: {
        color: 'black', 
        fontSize: 25, 
        fontWeight: 'bold'

    },
    textInputStyle: {
        height: 40, 
        borderWidth: 1, 
        paddingLeft: 20, 
        margin: 3, 
        borderColor: 'black', 
        backgroundColor: '#E2F1DB'

    }, 
    fieldText: {
        fontSize: 17, 
        color: 'black'
    }
});