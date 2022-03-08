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
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';

const postFacilityURL = 'https://mywebsite.com/endpoint/';

const ProfileEdit = ({navigation}) => {
    //Form Variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");




    //Method: Post Facility to the database
    const updateProfile = () => {
        let successfullPost = false;
        fetch(postFacilityURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName, 
                lastName: lastName
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
            alert("Sorry, something went wrong");
        })
        .done(() => {
            if (successfullPost){
                alert("You have successfully edited your profile")
            }
            else {
                alert("Error: Profile was not updated. Please try again")
            }

        });

    }


    useEffect(() => {
        setFirstName("John");
        setLastName("Doe")


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
                        onPress={() => updateProfile()}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>SAVE PROFILE</Text>
                                    
                    </Icon.Button>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Edit Profile</Text>
                </View>

                <View>
                    <Text style ={styles.fieldText}>First Name:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={firstName}
                        placeholder={firstName}
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setFirstName(text)}
                    
                    ></TextInput>
                    <Text style ={styles.fieldText}>Last Name:</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        value ={lastName}
                        placeholder={lastName}
                        underlineColorAndoird="transparent"
                        onChangeText={(text) => setLastName(text)}
                    
                    ></TextInput>

                    

                </View>

                <TouchableOpacity style={styles.deleteButton}>
                        <IconMat.Button
                            name="delete"
                            color='#CD2323'
                            size={60}
                            backgroundColor="white"
                            onPress={() => alert("Are you sure you want to delete your profile?")}                            >                
                    </IconMat.Button>
                </TouchableOpacity>

                    

            </SafeAreaView>
  
        </View>
    );
}

export default ProfileEdit;


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
    }, 
    deleteButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9999)',
        position: 'absolute', 
        bottom: 0, 
        right: 0
    }
});