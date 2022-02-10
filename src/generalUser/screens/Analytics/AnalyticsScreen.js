import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    TouchableOpacity, 
    Linking, 
    Platform, 
} from 'react-native';
import {useState, useEffect} from "react";

//Import Icons
import {faStar, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
//import '@fortawesome/fontawesome-free/css/all.min.css';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Import Images
const image = require('../../images//ParkImages/PinecrestPark.jpg');


//Import Analytic Components
import OccupancyStatus from '../../components/AnalyticsComponents/occupancyStatus';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ScrollView } from 'react-native-gesture-handler';


//Indvidual phone heights and widths
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Testing Data for Analytics Page
//Testing data
const individualData = [
  {id:'12412', title: 'Windsor Park', longitude: '45.3943', latitude: '75.6761', type: 'Tennis', distance: '1', openStatus: "CLOSED", occupancy: "Free", address: "1B Windsor Ave, Ottawa" },
]
const parkAddress = 'Winsdor Park, 1B Windsor Ave, Ottawa';
const longitude = '-75.676044';
const latitude = '45.394457';


const AnalyticsScreen = ({navigation, route}) => {
  //const [posts, setPosts] = useState([]);
  //const [data, setData] = useState([]);
  const {facilityId, title, numCourts, occupancy, address} = route.params; //Passes params from previous page

  const [favourited, setFavourited] = useState(true);


  const handleFavourites = () => {
    setFavourited(!favourited);
  };

  const url = Platform.select({
    ios: "maps:" + latitude + "," + longitude + "?q=" + latitude + "+" + longitude,
    android: "geo:" + latitude + "," + longitude + "?q=" + address
  });

  return (
            <View style ={styles.container}>
                <View style ={styles.containerHeader}>
                  <BackgroundImage source = {image} style={styles.backgroundImage}>
                  
                  <View style = {styles.topContent}>
                      <TouchableOpacity
                              onPress={() => navigation.goBack()}
                              >
                              <Icon
                                name="arrow-left"
                                color='black'
                                size={35}
                                >             
                              </Icon>
                      </TouchableOpacity>
                      <View style = {styles.midTopContent}>
                          {individualData.map(i => (<Text key="{i}" style = {styles.facilityTypeText}>{i.type} Facility</Text>))}
  
                      </View>
                      
                      <TouchableOpacity
                              onPress={() => handleFavourites()}
                              >
                              <Icon
                                name="star"
                                size={35} 
                                border = '1px solid #333'
                                color= {favourited ? 'yellow' : 'white'}/>
                      </TouchableOpacity>
                 </View>
                  
                  <View style={styles.botTopContent}>
                    <TouchableOpacity
                      style={styles.mapsButton}
                        
                      onPress={() => Linking.openURL(url)}
                      >
                        <Text style = {styles.buttonText}>GO</Text>
                              
                    </TouchableOpacity>

                  </View>

                  
                  
                 </BackgroundImage>
                 <View style = {styles.titleContent}>
                    <Text style = {styles.titleText}>{title}</Text>
                    <Text style = {styles.addressText}>{address}</Text>
                 </View>

              <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    paddingTop: 5
                  }}
                />
              </View>


              <ScrollView>
                <View style ={{
                    flexGrow: 1,

                  }}
                  >
                  <OccupancyStatus OccupancyStatus= {occupancy}></OccupancyStatus> 
                </View>

              </ScrollView>

              

              
             
            </View>
    
  );
 

}



const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FFFFFF",
      flex: 1,
      width: windowWidth
    },  

    backgroundImage: {
      height: windowHeight/6

    },

    containerHeader : {
      width: windowWidth
    },  

    topContent: {
     flexDirection: 'row',
     padding: 5

    },

    midTopContent: {
        paddingRight: 72, 
        paddingLeft: 72, 
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1
    },

    titleContent: {
      width: windowWidth/1.22, 
      marginLeft: 5, 
      marginRight: 20, 

    },

    botTopContent: {
      flexDirection: 'row', 

    },

    tabContent: {
      flex: 1,
      flexDirection: 'row', 
      width: '100%', 
      alignItems: 'center', 
      justifyContent: 'center'

    },

    facilityTypeText: {
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 18,
        fontWeight : '700',
        paddingVertical : 1,
        color: 'black'
    }, 
    secondaryText: {
      color: '#D32E2E', 
      fontWeight: '700', 
      textAlign : 'center', 
      justifyContent : 'center',
      fontSize: 15
    }, 

    titleText: {
      color: 'black', 
      fontSize: 26, 
      fontWeight: '900', 
    }, 

    addressText: {
      fontSize: 14, 
      color: '#000000', 
      fontWeight: '500', 
    }, 

    buttonText: {
      color: '#FFFFFF', 
      fontWeight: 'bold', 
      fontSize: 21

    },

    mapsButton: {
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#28B625', 
      borderRadius: 15, 
      height: 35,
      width: 60,
      position: 'absolute', 
      right: 6, 
      top: windowHeight/25
      
     
    }

   
  });



export default AnalyticsScreen;
