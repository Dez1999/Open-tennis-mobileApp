import React, {useState, useEffect, useCallback} from 'react';

//Screen Imports
import MainTabScreen from './Navigation/MainTabs/MainTabScreen';
import FavouritesProvider from '../Providers/FavouritesProvider';


const GeneralUserApp = () => {
    return(
      <FavouritesProvider>
        <MainTabScreen/>
      </FavouritesProvider>
    )
}

export default GeneralUserApp;

