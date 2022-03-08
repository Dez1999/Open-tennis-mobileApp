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
import { AuthContext } from '../../../sharedComponents/Context/Context';

const appUserUrl = 'http://52.229.94.153:8080/appUser';




const ProfileScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userEmail, setUserEmail] = useState("");



    const [ownerID, setOwnerID] = useState("");
    const [companyID, setCompanyID] = useState("");
    const [numFacilitiesOwned, setNumFacilitiesOwned] = useState("");
    const [numDeviceOwned, setNumDevicesOwned] = useState("");



    //Global App functions for the user to choose the section of the app 
    const { generalRole } = React.useContext(AuthContext);
    const { signOut } = React.useContext(AuthContext);

    //Fetch user Info from database
  const getUserInfo = async () => {
    try{

      fetch(appUserUrl, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json, text/plain, */*, application/x-www-form-urlencoded',  // It can be used to overcome cors errors
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
        json: true,
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
          .then((resData) => {
            setFirstName(resData.firstName);
            setLastName(resData.lastName);
            setUserRole(resData.appUserRole);
            setUserEmail(resData.email);
            console.log("User FirstName: " + resData.firstName);
            console.log("User LastName: " + resData.lastName);
            console.log("User Role: " + resData.appUserRole);
            console.log("User Email: " + resData.email);

          })
            .catch(error => {
              console.log(error);
              alert("Sorry, something went wrong. Unable to retrieve user information.");
            })

    }catch (e) {
    console.log("Failed to GET user info from database")
    }

  }



    useEffect(() => {

        getUserInfo();
        // setFirstName("John");
        // setLastName("Doe");
        // setUserRole("Facility Manager");
        setOwnerID("1223bfs");
        setCompanyID("222886g");
        setNumFacilitiesOwned("5");
        setNumDevicesOwned("10");

    }, []);

    return (
        <View style ={styles.container}>
            <SafeAreaView style={{backgroundColor:'white', height: '100%'}}>
                <View style = {styles.header}>
                    <Logo2 marginTop={10} imageHeight={100} imageWidth={90}/> 
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
                    <View style = {styles.itemContent}>
                            <Text style = {styles.itemText}>Role: </Text>
                            <Text style = {styles.itemTextSub}>{userRole}</Text>
                    </View>
                    <View style = {styles.itemContent}>
                            <Text style = {styles.itemText}>OwnerID: </Text>
                            <Text style = {styles.itemTextSub}>{ownerID}</Text>
                    </View>
                    <View style = {styles.itemContent}>
                            <Text style = {styles.itemText}>CompanyID: </Text>
                            <Text style = {styles.itemTextSub}>{companyID}</Text>
                    </View>
                    <View style = {styles.itemContent}>
                            <Text style = {styles.itemText}>Number of Facilities Owned: </Text>
                            <Text style = {styles.itemTextSub}>{numFacilitiesOwned}</Text>
                    </View>
                    <View style = {styles.itemContent}>
                            <Text style = {styles.itemText}>Number of Devices: </Text>
                            <Text style = {styles.itemTextSub}>{numDeviceOwned}</Text>
                    </View>
                </View>

                <View style = {styles.bottomContent}>
                    <IconMat.Button
                            name="account-switch"
                            color='#5458B4'
                            size={30}
                            backgroundColor="white"
                            onPress={() => {generalRole()}} 
                                                       > 
                         <Text style={{color: '#5458B4', fontSize: 20}}>Switch to General User App </Text>               
                    </IconMat.Button>

                    <IconMat.Button
                            name="logout"
                            color='#CD2323'
                            size={30}
                            style = {styles.logoutButton}
                            backgroundColor="white"
                            onPress={() => {signOut()}} 
                                                       > 
                         <Text style={{color: '#CD2323', fontSize: 20}}>Logout</Text>               
                    </IconMat.Button>
                </View>
                   

                    

            </SafeAreaView>
  
        </View>
        

    );
}


const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'white', 
        padding: 5
  
      },
      header: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 


    },
    profileInfo:{
        alignContent: 'center',
        justifyContent: 'space-between', 
        padding: 10

    },

    logoutButton: {
        bottom: 0, 
        right: 0, 
        flexDirection: 'row', 
        

    }, 
    titleText: {
        color: '#0B5B13', 
        fontSize: 35, 
        fontWeight: 'bold', 
        paddingBottom: 5, 
        textAlign: 'center'


    },
    itemText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 23,
        paddingLeft: 13, 
        paddingBottom: 5
    }, 
    itemTextSub: {
        color: 'black',
        fontSize: 23,

    },
    bottomContent: {
        width: '100%',
        justifyContent: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Align at bottom of screen
        }, 
    itemContent: {
        flexDirection: 'row'
    }


});

export default ProfileScreen;