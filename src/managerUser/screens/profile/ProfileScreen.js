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
import Logo2 from '../../assets/images/Logo2';




const ProfileScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userRole, setUserRole] = useState("");
    const [ownerID, setOwnerID] = useState("");
    const [companyID, setCompanyID] = useState("");
    const [numFacilitiesOwned, setNumFacilitiesOwned] = useState("");
    const [numDeviceOwned, setNumDevicesOwned] = useState("");






    useEffect(() => {
        setFirstName("John");
        setLastName("Doe");
        setUserRole("Facility Manager");
        setOwnerID("1223bfs");
        setCompanyID("222886g");
        setNumFacilitiesOwned("5");
        setNumDevicesOwned("10");

    }, []);

    return (
        <View style ={styles.container}>
            <SafeAreaView style={{backgroundColor:'white', height: '100%'}}>
                <View style = {styles.header}>
                    <Logo2 marginTop={10} imageHeight={100} imageWidth={100}/> 
                    <TouchableOpacity
                        style ={{padding: 10}}
                        onPress={() => navigation.navigate("ProfileEdit_Page")}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>EDIT</Text>


                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{firstName} {lastName}</Text>
                </View>

                <View style={styles.profileInfo}>
                    <Text>Role: {userRole}</Text>
                    <Text>OwnerID: {ownerID}</Text>
                    <Text>Company ID: {companyID}</Text>
                    <Text>Number of Facilities Owned: {numFacilitiesOwned}</Text>
                    <Text>Number of Devices: {numDeviceOwned}</Text>

                </View>

                    <IconMat.Button
                            name="logout"
                            color='#CD2323'
                            size={25}
                            style = {styles.logoutButton}
                            backgroundColor="white"
                            onPress={() => alert("Logout User")} 
                                                       > 
                         <Text style={{color: '#CD2323', fontSize: 25}}>Logout</Text>               
                    </IconMat.Button>
                   

                    

            </SafeAreaView>
  
        </View>
        

    );
}


const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'white'
  
      },
      header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 


    },
    profileInfo:{
        padding: 10, 
        justifyContent: 'space-between'


    },

    logoutButton: {
        marginTop: 30,
        bottom: 0, 
        right: 0, 
        flexDirection: 'row'

    }, 
    titleText: {
        color: '#0B5B13', 
        fontSize: 35, 
        fontWeight: 'bold'

    },


});

export default ProfileScreen;