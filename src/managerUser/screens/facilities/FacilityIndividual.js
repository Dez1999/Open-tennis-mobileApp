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


const data = [
    {id:'1', title: 'CHEIGHTS -Tennis - 1st Half', areasMonitored: 2},
    {id:'2', title: 'CHEIGHTS - Tennis - 2nd Half', areasMonitored: 2}
  
  ]

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
    
      const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            alert("Device Name: " + item.title + ", Areas Monitored: " + item.areasMonitored)
        }}> 
        <Item title={item.title} numAreas={item.areasMonitored}/>
        </TouchableOpacity>
      );

      const Item = ({ title, numAreas }) => (
        <View style={styles.itemStyle}>
            <View>
                <Text style={styles.listItemTextMain}>{title}</Text>
                <Text style={styles.listItemTextSub}>Areas Monitored: {numAreas} </Text>
           </View>
        </View>
      );

    const ItemSeparatorView = () => {
        return (
            <View
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            >

            </View>
        )
    }

    //Method: Get Devices from Facility
    const fetchDevices = () => {
        return (
            <FlatList   
              data={data}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={renderItem}

            >
            </FlatList>

        );

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
                    
                    <Text style={{fontWeight:'bold', color: 'black', fontSize: 17}}>TENNIS</Text>

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
    }, 
    listItemTextMain: {
        fontSize: 15, 
        color: '#000000', 
        fontWeight: 'bold', 
        paddingTop: 4
      }, 
      listItemTextSub: {
          fontSize: 16, 
          color: '#000000', 
          paddingTop: 3
      
      },
      itemStyle: {
        flexDirection: 'column',
        marginTop: 10,

        padding: 15,
        flexDirection: 'row',
        justifyContent : 'flex-start',
        alignItems: 'center',
        backgroundColor: '#A4BADA',
        borderColor: 'black',
        width: windowWidth - 20, 
  
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
        width: 3,
        height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3,
    }, 

});