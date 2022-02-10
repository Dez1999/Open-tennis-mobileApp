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
    FlatList
} from 'react-native';
import {useState, useEffect} from "react";
import axios from 'axios';


//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Testing Data for Analytics Page
//Testing data
const individualData = [
  {id:'12412', title: 'Windsor Park', type: 'Tennis', distance: '1', occupancy: "Free"},
]

const FlatListDemo3 =(props, {navigation}) => {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");
  const [term, setTerm] = useState("");
  const [favourited, setFavourited] = useState(true);


  /*
  let apiUrl = 'https://randomuser.me/api/?seed=${seed}&page=${page}&results=20';

  const getPosts = (t) => {
    axios.get('https://randomuser.me/api/?seed=${seed}&page=${page}&results=20').then((res) => {
      if (res.data.length > 0) {
        setPosts(res.data);
      } else {
        setPosts([]);
        setErr("No facility found");
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
    getPosts(term)

  }, [term])

  */


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
//Testing Data for Analytics Page
//Testing data
const individualData = [
  {id:'12412', title: 'Windsor Park', type: 'Tennis', distance: '1', occupancy: "Free"},
]
  return (
            <View style ={styles.container} style ={{
                marginTop: props.marginTop,
                marginLeft: props.marginLeft}}>
              <FlatList
                  style = {styles.flatListStyle}
                  data={props.data}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {navigation.navigate('Analytics')}}> 
                      <View style={styles.listItem}>
                        <TouchableOpacity
                            onPress={() => handleFavourites()}
                            >
                            <Icon 
                              name="star"  
                              size={27} 
                              color= {favourited ? 'yellow' : 'white'}/>
                        </TouchableOpacity>

                        <View style = {styles.SecondaryContent}>
                          <Text style={styles.listItemTextMain}>{item.title}</Text>
                          <Text style={styles.listItemTextSub}>{item.type}   |   Courts: {item.numCourts}   |   {item.distance} km   </Text>
                        </View>

                        <IconMat
                            style = {{position: 'absolute', right: 10}}
                            name="circle"
                            size = {45}
                            color= {getOccupancy(item.occupancy)}
                            ></IconMat>
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
      marginTop: 50, 
      alignItems: 'center', 
    },  
    flatListStyle: {
      height: 300, 
      flexGrow: 0

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
    listItem: {
      marginTop: 10,
      borderRadius: 13,
      padding: 10,
      flexDirection: 'row',
      justifyContent : 'flex-start',
      alignItems: 'center',
      backgroundColor: '#93E591',
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
    }

  });



export default FlatListDemo3;
