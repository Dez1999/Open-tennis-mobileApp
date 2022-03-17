import React, {useState, useEffect, useCallback} from 'react';

import axios from 'axios';

//API URL
import { removeFavouriteURL, viewFavouritesURL } from '../sharedComponents/services/ApiContext';


import { FavouritesContext } from '../sharedComponents/Context/Context';

const FavouritesProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);

  const add = useCallback(favourite => setFavourites(current => [...current, favourite]), [setFavourites]);

  const remove = useCallback(unfavouriteID => {

    let removeURL = removeFavouriteURL + `${unfavouriteID}`;
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

 export default FavouritesProvider;