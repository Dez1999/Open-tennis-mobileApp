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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FacilityIndividual = ({navigation}) => {
    //Form Variables
    const [facilityID, setFacilityID] = useState("");
    const [facilityName, setFacilityName] = useState("");
    const [facilityCity, setFacilityCity] = useState("");
    const [facilityOwner, setFacilityOwner] = useState("");
    const [ facilityCompany, setFacilityCompany] = useState("");


    useEffect(() => {

        setFacilityName("Carleton Heights Community Center");
        setFacilityOwner("John Manager");
        setFacilityCity("Ottawa");
        setFacilityCompany("City of Ottawa")
        
      }, []);

    //Method: Get Devices from Facility
    const fetchDevices = () => {

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
                        onPress={() => alert("Go Back to Facilities Screen")}
                        >
                                    
                    </Icon.Button>
                    <Icon.Button
                        name="edit"
                        color='black'
                        size={30}
                        backgroundColor="white"
                        onPress={() => alert("Go to Edit Facility Page")}
                        >
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#0B5B13'}}>EDIT</Text>
                                    
                    </Icon.Button>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{facilityName}</Text>

                    <View>
                        <Text style={styles.subText}>Owner: {facilityOwner}</Text>
                        <Text style={styles.subText}>Company: {facilityCompany}</Text>
                        <Text style={styles.subText}>City: {facilityCity}</Text>
                    </View>
                    <View 
                        style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        paddingTop: 5
                  }}
                  >
                    </View>
                </View>
                
                <View style={{marginTop: 10, marginLeft: 5}}>
                    
                    <Text style={{fontWeight:'bold', color: 'black', fontSize: 17}}>DEVICES</Text>

                    {fetchDevices()}
                    
            
                </View>

              
                    <TouchableOpacity style={styles.addButton}>
                        <Icon.Button
                            name="plus-circle"
                            color='#2D0C57'
                            size={60}
                            backgroundColor="white"
                            onPress={() => alert("Add New Device")}
                            >
                           
                                        
                        </Icon.Button>
                    </TouchableOpacity>
                    
             
                
                       
             
                    

            </SafeAreaView>
  
        </View>
    );
}

export default FacilityIndividual;


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
        paddingLeft: 5,

    },
    titleText: {
        color: '#0B5B13',
        fontSize: 25, 
        fontWeight: '700'

    },
    subText: {
        color: 'black', 
    }, 
    addButton: {
        position: 'absolute', 
        bottom: 0, 
        right: 0
    }

});