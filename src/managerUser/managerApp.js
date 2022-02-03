import React from 'react';
import {
    Text, 
    View, 
    StatusBar, 
} from 'react-native';

import HomeMan from './screens/home/HomeScreen';
//import FacilityScreen from './screens/facilities/FacilitiesScreen';
//import FacilityIndividual from './screens/facilities/facilityIndividual';
const ManagerApp = () => {
    return(
        <View>
            <HomeMan/> 
         {/*<FacilityScreen/>*/}
        </View>
        
        

    )
}

export default ManagerApp;