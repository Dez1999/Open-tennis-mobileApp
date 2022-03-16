import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  ImageBackground, 
  Dimensions, 
  ScrollView,
  TouchableOpacity, 
  ActivityIndicator, 
  FlatList, 
  Modal, 
  TextInput
} from 'react-native';

import axios from 'axios';

//API URL
const viewFavouritesURL = "http://52.229.94.153:8080/facility/favourite";
const removeFavourite = "http://52.229.94.153:8080/facility/favourite/remove/";

//Screen Imports
import MainTabScreen from './Navigation/MainTabs/MainTabScreen';

import { FavouritesContext } from '../sharedComponents/Context/Context';

const FavouritesProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);

  const add = useCallback(favourite => setFavourites(current => [...current, favourite]), [setFavourites]);

  const remove = useCallback(unfavouriteID => {

    let removeURL = removeFavourite + `${unfavouriteID}`;
    console.log("Favourites before Removal: of ID " + unfavouriteID + "   " + favourites);
    console.log(removeURL);

    axios.delete(removeURL).then((res) => {
      getFavourites();
    })
    .catch(error => console.log(error));
  }
 )


  const getFavourites = () => {
    axios.get(viewFavouritesURL).then((res) => {
      if (res.data.length > 0) {
        setFavourites(res.data);
      } else {
        setFavourites([]);
      }
      console.log(res.data);
  
    })
    .catch(error => console.log(error));
  };


  useEffect(() => {
    getFavourites();
  }, [])

  return (
    <FavouritesContext.Provider value= {{favourites, add, getFavourites, remove}}>
      {children}
    </FavouritesContext.Provider>
  )
 }


const GeneralUserApp = () => {
    return(
      <FavouritesProvider>
        <MainTabScreen/>
      </FavouritesProvider>
    )
}

export default GeneralUserApp;

