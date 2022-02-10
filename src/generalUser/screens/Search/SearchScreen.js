import React, {useState, useEffect} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    ScrollView,
    TouchableOpacity, 
} from 'react-native';
//import {} from 'react-navigation';

//import MapView from "react-native-maps";
//import Marker from "react-native-maps";
import SearchComponent from '../../components/Search/SearchComponent';
import FlatListDemo3 from '../../components/Search/FlatListDemo3';


//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Testing data for FlatList
const dataFacilities = [
  {id:'1', title: 'Windsor Park', type: 'Tennis', distance: '1', numCourts:'4', occupancy: "Free"},
  {id:'2', title: 'Carleton Heights Park', type: 'Tennis', distance: '2', numCourts:'4', occupancy: "Busy"},
  {id:'3', title: 'Steve Maclean Park', type: 'Tennis', distance: '3', numCourts:'4', occupancy: "Busy"},
  {id:'4', title: 'TangleWood Park', type: 'Tennis', distance: '4', numCourts:'4', occupancy: "Avg"},
  {id:'5', title: 'Arnott Park', type: 'Tennis', distance: '5', numCourts:'4', occupancy: "Free"},
  {id:'6', title: 'Mooneys Bay Park', type: 'Tennis', distance: '6', numCourts:'4', occupancy: "Busy"}, 
  {id:'7', title: 'Pineglen Park', type: 'Tennis', distance: '7', numCourts:'4', occupancy: "Free"},
  {id:'8', title: 'Celebration Park', type: 'Tennis', distance: '5', numCourts:'4', occupancy: "Busy"},
  {id:'9', title: 'Lexington Park', type: 'Tennis', distance: '7', numCourts:'4', occupancy: "NA"},
  {id:'10', title: 'Kaladar Park', type: 'Tennis', distance: '8', numCourts:'4', occupancy: "Free"},
  {id:'11', title: 'Owl Park', type: 'Tennis', distance: '4.3', numCourts:'4', occupancy: "Free"},

];

const screenName = 'Account';





const SearchScreen = ({navigation}) => {
  const [err, setErr] = useState("");

  //Fetch user Info from database
  const getFacilities = async () => {
    try{

      fetch(appFacilityUrl, {
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
            console.log(resData);

          })
            .catch(error => {
              console.log(error);
              alert(error);
            })

    }catch (e) {
    console.log("Failed to GET Facilities from database")
    }
  }

  useEffect(() => {
    //getFacilities();
  }, [getFacilities])
  

  return (
          
            <View style ={styles.container}>
                    <View style = {styles.searchContainer}>
                        <SearchComponent
                           marginLeft={10} 
                           marginRight={50} 
                           flex={3}
                        /> 
                        <TouchableOpacity
                            onPress={() => alert('FILTER')}
                            >
                          <Ionicons 
                              name ="options"
                              size={35} 
                              color= 'black'/>
                        </TouchableOpacity>
                    </View>
                    {err ? 
                      <Text color='red'>{err}</Text>
                      :
                      <FlatListDemo3 marginLeft={9} data={dataFacilities} navigation={navigation}/>

                        }
                    
                    {/*
                    <ScrollView styles= {styles.scrollContainer}>
                      <Text style = {styles.mainText}>{'Search'}</Text>   
                      <TouchableOpacity>
                        <Text style = {styles.facilityItem}>Modal for Test Facility</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style = {styles.facilityItem}>More Results</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style = {styles.facilityItem}>Map FullScreen</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style = {styles.facilityItem}>Modal for Test Facility</Text>
                      </TouchableOpacity>

                      </ScrollView>
                    */}
                    {/*}
                      <MapView
                          loadingEnabled
                          style={styles.map}
                          initialRegion={{
                          latitude: 45.421532,
                          longitude: -75.697189,
                          latitudeDelta: 0.0722,
                          longitudeDelta: 0.0421,
                          }}
                          
                      >
                      </MapView>
                        */}

                   
                    
            </View>
    
  );

}

const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingTop: 10

    },  

    mainText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 18,
        fontWeight : 'bold',
        paddingVertical : 12,
        color: 'black'
    }, 

    facilityItem: {
       flex: 1,
       color: '#0B1961',
       textAlignVertical: 'center', 
       textAlign : 'center', 
       justifyContent : 'center',
       fontSize: 14,
       paddingVertical : 12,

    }, 
    map: {
      ...StyleSheet.absoluteFillObject,
      flex: 0,
      alignItems: "center",
      justifyContent: "flex-end",

      height: Dimensions.get("window").height/3.2,
      marginTop: 400,
      width: Dimensions.get('window').width,
      

    },

    scrollContainer: {
      flex: 1,
      paddingBottom: 900,
      marginBottom: 900,

    }, 

    searchContainer: {
      flexDirection: 'row',
      padding: 3,
      paddingRight: 5
    }

    

   
  });



export default SearchScreen;
