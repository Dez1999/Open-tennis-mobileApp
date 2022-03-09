import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    TouchableOpacity, 
    FlatList, 
    TextInput
} from 'react-native';
import {useState, useEffect} from "react";
import axios from 'axios';
//import {} from 'react-navigation';

import SearchComponent from '../../components/Search/SearchComponent';

//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//API URL
const viewFavouritesURL = "http://52.229.94.153:8080/facility/favourite";

const data = [
  {id:'1', title: 'Windsor Park', type: 'Tennis', distance: '1', numCourts:'4', occupancy: "Free", address: "1B Windsor Ave, Ottawa" },
  {id:'2', title: 'Carleton Heights Park', type: 'Tennis', distance: '2', numCourts:'4', occupancy: "Busy", address: "1665 Apeldoorn Ave, Ottawa, ON K2C 1V6" },
  {id:'3', title: 'Steve Maclean Park', type: 'Tennis', distance: '3', numCourts:'4', occupancy: "Busy", address: "4175 Spratt Rd, Gloucester, ON K1V 1T6" },
  {id:'4', title: 'TangleWood Park', type: 'Tennis', distance: '4', numCourts:'4', occupancy: "Avg", address: "30 Woodfield Dr, Nepean, ON K2G 3Y5" },
  {id:'5', title: 'Arnott Park', type: 'Tennis', distance: '5', numCourts:'4', occupancy: "Free", address: "691 Hartman Crescent, Ottawa, ON K1V 7E9" },
  {id:'6', title: 'Mooneys Bay Park', type: 'Tennis', distance: '6', numCourts:'4', occupancy: "Busy", address: "2960 Riverside Dr., Ottawa, ON K1V 8N4" }, 
  {id:'7', title: 'Pineglen Park', type: 'Tennis', distance: '7', numCourts:'4', occupancy: "Free", address: "22 Brisbane Rd, Nepean, ON K2E 5X1" },
  {id:'8', title: 'Celebration Park', type: 'Tennis', distance: '5', numCourts:'4', occupancy: "NA", address: "200 Central Park Drive, Ottawa	" },
  {id:'9', title: 'Lexington Park', type: 'Tennis', distance: '7', numCourts:'4', occupancy: "Avg", address: "1404 Lexington Street, Ottawa" },
  {id:'10', title: 'Kaladar Park', type: 'Tennis', distance: '8', numCourts:'4', occupancy: "Free", address: "2554 Kaladar Avenue, Ottawa" },
  {id:'11', title: 'Dogwood Park and Munster Hamlet Community Centre', type: 'Tennis', distance: '4.3', numCourts:'4', occupancy: "Free", address: "2890 Munster Road, Goulbourn" },

]


const FavouritesScreen =({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [favourited, setFavourited] = useState(true);
  const [favouritesData, setFavouritesData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState('');

  let apiUrl = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=20';

  
  const getFacilities = () => {
    setIsLoading(true);
    axios.get(viewFavouritesURL).then((res) => {
      if (res.data.length > 0) {
        setFavouritesData(res.data);
        setfilteredData(res.data);
        setIsLoading(false);
        console.log(res.data);
      } else {
        setFavouritesData([]);
        setfilteredData([]);
        setErr("No facilities found");
        setIsLoading(false);
      }
    });
  };

  const renderPosts = ({item}) => {
    return (
      <View>
        <Text>{item.id}. {item.title}</Text>
        <Text>{item.username}</Text>
      </View>
    )
  }

  useEffect(() => {
    getFacilities()

  }, [])

  const searchFilter = (text) => {
    if (text) {
        const newData = favouritesData.filter((item) => {
            const itemData = item.name ?
                    item.name.toUpperCase()
                    : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        setfilteredData(newData);
        setSearch(text);

    } else {
        setfilteredData(favouritesData);
        setSearch(text);
    }
}

  


  const handleFavourites = () => {
    setFavourited(!favourited);
  };

  const getOccupancy = (t) => {
    console.log(t);
    if(t == 'Free'){
      return '#28B625'
    }
    else if (t == 'Busy'){
      return '#D32E2E'
    }
    else if (t == 'Avg'){
      return '#F9B70F'
    }
    else {
      return '#696A6D' //Not available
    }

  }

  return (
            <View style ={styles.container}>
              <TextInput
                style={styles.textInputStyle}
                value ={search}
                placeholder="Search Favourite Facilities..."
                underlineColorAndoird="transparent"
                onChangeText={(text) => searchFilter(text)}>
              </TextInput>
              <FlatList
                  data={filteredData}
                  keyExtractor={item => item.id}
                  onRefresh= {() => getFacilities()}
                  refreshing={isLoading}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {navigation.navigate('Analytics', {
                      facilityId: item.id, 
                      title: item.name, 
                      itemLatitude: item.latitude, 
                      itemLongitude: item.longitude,
                      occupancy: item.occupancy,
                      address: item.address, 
                      itemInitSelectedType: "ANY",
                    })}}> 
                      <View style={styles.listItem}>
                        
                          <IconMat
                            name="star"
                            size = {27}
                            color= {favourited ? 'yellow' : 'white'}
                            />   
                        

                        <View style = {styles.SecondaryContent}>
                          <Text style={styles.listItemTextMain}>{item.name}</Text>
                          <Text style={styles.listItemTextSub}>{item.city}</Text>
                        </View>

                        <IconMat
                            style = {{position: 'absolute', right: 10}}
                            name="circle"
                            size = {45}
                            color= {getOccupancy(item.occupancy)}
                            >
                            
                        </IconMat>
                      </View>
                     </TouchableOpacity>
                  )}
                />
            </View>
    
  );


}



const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      flex: 1,
      marginTop: 10, 
      alignItems: 'center', 
    },  
    listItem: {
      marginTop: 10,
      borderRadius: 13,
      padding: 10,
      flexDirection: 'row',
      justifyContent : 'flex-start',
      alignItems: 'center',
      backgroundColor: '#93E591',
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
    listItemTextMain: {
      fontSize: 18, 
      color: '#000000', 
      fontWeight: 'bold', 
      paddingTop: 4
    }, 
    listItemTextSub: {
        fontSize: 14, 
        color: '#000000', 
        paddingTop: 3
    
    }, 
    listItemTextDiv: {
      fontSize: 20, 
      color: '#000000', 
      fontWeight: 'bold', 
    }, 

    SecondaryContent: {
      flexDirection: 'column',
      marginTop: -12, 
      paddingLeft: 5, 
      paddingTop: 5,
      marginRight: 45, 
      marginLeft: 10
    }, 
    textInputStyle: {
      height: 40, 
      borderWidth: 1, 
      paddingLeft: 20, 
      width: '90%',
      borderRadius: 15,
      borderColor: 'black', 
      backgroundColor: '#E2F1DB'
  },


  });



export default FavouritesScreen;
