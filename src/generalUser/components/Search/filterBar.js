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
    ScrollView, 
} from 'react-native';
import {useState, useEffect} from "react";
import axios from 'axios';


//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Testing Data for Analytics Page
//Testing data
const individualData = [
  {id:'12412', title: 'Windsor Park', type: 'Tennis', distance: '1', occupancy: "Free"},
]

const Filterbar =(props, {navigation}) => {

  //Filter List
  const [facilityTypeFilterList, setFacilityTypeFilter] = useState([]);
  const [occupancyStatusFilterList, setOccupancyStatusFilter] = useState([]);
  const [distanceFilterList, setDistanceFilter] = useState([]);
  const [cityFilterList, setCityFilter] = useState([]);

  const [facilityTypeFilterChoice, setFacilityTypeFilterChoice] = useState("TENNIS");
  const [occupancyStatusFilterChoice, setOccupancyStatusFilterChoice] = useState("FREE");
  const [distanceFilterChoice, setDistanceFilterChoice] = useState("10");
  const [distanceFilterUnitChoice, setDistanceFilterUnitChoice] = useState("K");
  const [cityFilterChoice, setCityFilterChoice] = useState("OTTAWA");

  const setFilterLists = () => {
    setFacilityTypeFilter(["TENNIS", "BASKETBALL", "SWIMMING"]);
    setOccupancyStatusFilter(["FREE", "MODERATELY BUSY", "BUSY", "ALL"]);
    setDistanceFilter(["2", "3", "5", "10", "None"]);
    setCityFilter(["OTTAWA", "MISSISSAUGA"]);
  }

  useEffect(() => {
    setFilterLists();
  }, [])

  return (
            <SafeAreaView  >
            <View style ={styles.container}>
                <Text style={{alignSelf: 'flex-start', fontSize: 20, color: 'black', fontWeight: 'bold'}}>Filters: </Text>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                        >
                        <SelectDropdown
                  
                                data={facilityTypeFilterList}
                                style={{ animated: true, fontSize: 14}} 
                                buttonStyle={styles.buttonStyleDropdown} 
                                defaultButtonText="Type"
                                dropdownStyle={styles.dropdownStyle}
                                onSelect={(selectedItem, index) => {
                                    setFacilityTypeFilterChoice(selectedItem);
                                    console.log(selectedItem, index);
                                }}
                            />
                        <SelectDropdown
                            data={occupancyStatusFilterList}
                            style={{animated: true, fontSize: 20}} 
                            buttonStyle={styles.buttonStyleDropdown} 
                            defaultButtonText="Occupancy"
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(selectedItem, index) => {
                                setOccupancyStatusFilterChoice(selectedItem);
                                console.log(selectedItem, index);
                            }}
                        >
                          </SelectDropdown>
                        <SelectDropdown
                            data={distanceFilterList}
                            style={{animated: true, fontSize: 20}} 
                            buttonStyle={styles.buttonStyleDropdown} 
                            defaultButtonText="Range (km)"
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(selectedItem, index) => {
                                setDistanceFilterChoice(selectedItem);
                                console.log(selectedItem, index);
                            }}
                        />
                        <SelectDropdown
                            data={cityFilterList}
                            style={{animated: true, fontSize: 20}} 
                            buttonStyle={styles.buttonStyleDropdown} 
                            defaultButtonText="City"
                            dropdownStyle={styles.dropdownStyle}
                            dropdownIconPosition={"left"}
                            onSelect={(selectedItem, index) => {
                                setCityFilterChoice(selectedItem);
                                console.log(selectedItem, index);
                            }}
                        />
                        

                </ScrollView>

            </View>
            </SafeAreaView>
    
  );


}



const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
    },  
    buttonStyleDropdown: {
        marginHorizontal: 3,
        // width: 90,
        backgroundColor: '#BBCBF5',
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 70,
        height: 40

      },

      dropdownStyle: {
        backgroundColor: '#BBCBF5',
        width: '40%',
        borderColor: '#0C4B16',
        borderWidth: 2,
        borderRadius: 20,

      },


  });



export default Filterbar;
