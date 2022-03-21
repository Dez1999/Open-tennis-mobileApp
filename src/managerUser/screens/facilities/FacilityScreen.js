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
    RefreshControl

} from 'react-native';


//Imports
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

//const AddIcon = <Icon name="rocket" size={30} color="#900" />;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Main API
import { FacilityOwned_URL } from '../../../sharedComponents/services/ApiContext';

//Import test data
import { facilityDataTest } from '../../../generalUser/screens/Search/testDataSearch';


const DeviceScreen = ({navigation}) => {
    const [filteredData, setfilteredData] = useState([]);
    const [mainData, setMainData] = useState([]);
    const [search, setSearch] = useState('');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [unmounted, setUnounted] = useState(true);


    //Method: Retrieves all owned facilities by Manager
    const fetchAllFacilities = () => {
        setIsLoading(true);
        fetch(FacilityOwned_URL)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            console.log("unmounted:" + unmounted);
            setfilteredData(responseJson);
            setMainData(responseJson);
            setRefreshing(false);
            setIsLoading(false);
            setError(false);
        })
        .catch(err => {
            setIsLoading(false);
            // setError(err);
        }).done(() => {
          setUnounted(false);
          //alert("You have successfully updated the Facility")
      
      });
      }


    //Method: Filters out current list of facilities based on text value in search bar
    const searchFilter = (text) => {
        if (text) {
            const newData = mainData.filter((item) => {
                const itemData = item.name ?
                        item.name.toUpperCase()
                        : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setfilteredData(newData);
            setSearch(text);

        } else {
            setfilteredData(mainData);
            setSearch(text);
        }
    }

    //Method: Returns a touchable button for each item
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("FacilityIndividual_Page", {
              itemID: item.id, 
              itemOwnerId: item.ownerId,
              itemTitle: item.name, 
              itemCity: item.city,
              itemLatitude: item.latitude, 
              itemLongitude: item.longitude
            })
        }}> 
        <Item title={item.name} city={item.city}/>
        </TouchableOpacity>
      );

      //Method: returns the individual item for each facility
      const Item = ({ title, city }) => (
        <View style={styles.itemStyle}>
            <View>
                <Text style={styles.listItemTextMain}>{title}</Text>
                <Text style={styles.listItemTextSub}>{city} </Text>
           </View>
        </View>
      );
   
    
    //Method: Returns item view separator
    const ItemSeparatorView = () => {
        return (
            <View
                style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
            >

            </View>
        )
    }

    //Method: Renders list of facilities based on the current state
    const renderList = () =>{
        
      //Check if the data is currently being fetched
      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200, backgroundColor: 'white' }}>
            <ActivityIndicator size="large" color="#82CB76" />
          </View>
        );
      }

      //Check if there is an error while fetching the data
      if (error) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Error fetching data... Check your network connection!
            </Text>
          </View>
        );
      }
        return (
              <FlatList   
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={renderItem}

              >
              </FlatList>

            );
     };


     useEffect(() => {

      fetchAllFacilities();      
       return () => {

       }

      }, []);


    return(
        <View style ={styles.container}>
            <SafeAreaView style={{flexDirection: 'column', backgroundColor: 'white'}}>
                    <View style={{flex: 1, position: 'absolute', backgroundColor: 'white', width: '100%', marginBottom: '75%'}}>
                        <TextInput
                            style={styles.textInputStyle}
                            value ={search}
                            placeholder="Search Here"
                            underlineColorAndoird="transparent"
                            onChangeText={(text) => searchFilter(text)}
                            >

                        </TextInput>
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Icon.Button
                                    name="plus"
                                    color='black'
                                    size={30}
                                    backgroundColor="white"
                                    onPress={() => navigation.navigate("FacilityCreate_Page")}
                                >
                                    <Text style={{fontSize: 15, color: 'black'}}>Add facility</Text>
                                    
                                </Icon.Button>
                                <TouchableOpacity
                                    onPress={()=> fetchAllFacilities()}
                                  
                                 
                                 >
                                  <Ionicons
                                      name="refresh"
                                      size={37}
                                      color = "black"
                                    >

                                  </Ionicons>
                                </TouchableOpacity>
                              
                        </View>             
                    </View>
                    <View style={{marginTop: '25%'}}>
                          {renderList()}
                    </View>

            </SafeAreaView>
  
            </View>
        

    );
}

const styles = StyleSheet.create({
    container : {
      backgroundColor: "white",
      padding: 10, 
      height: '100%'
      
    },  
    itemStyle: {
        flexDirection: 'column',
        marginTop: 10,
        borderRadius: 13,
        padding: 15,
        flexDirection: 'row',
        justifyContent : 'flex-start',
        alignItems: 'center',
        backgroundColor: '#82CB76',
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
    textInputStyle: {
        height: 40, 
        borderWidth: 1, 
        paddingLeft: 20, 
        margin: 5, 
        borderRadius: 15,
        borderColor: 'black', 
        backgroundColor: '#E2F1DB'
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






  });

  export default DeviceScreen;