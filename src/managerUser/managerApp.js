import React from 'react';
import {
    Text, 
    View, 
    StatusBar, 
} from 'react-native';

import HomeMan from './screens/home/HomeScreen';
import FacilityScreen from './screens/facilities/FacilityScreen';
import DeviceScreen from './screens/devices/DeviceScreen';
import FacilityCreate from './screens/facilities/FacilityCreate';
//import FacilityIndividual from './screens/facilities/facilityIndividual';
const ManagerApp = () => {
    return(

            <FacilityCreate/>

    )
}

export default ManagerApp;