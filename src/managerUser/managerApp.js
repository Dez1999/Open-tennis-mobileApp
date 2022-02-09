import React from 'react';
import {
    Text, 
    View, 
    StatusBar, 
} from 'react-native';

import HomeMan from './screens/home/HomeScreen';
import FacilityScreen from './screens/facilities/FacilityScreen';
import FacilityCreate from './screens/facilities/FacilityCreate';
import FacilityIndividual from './screens/facilities/FacilityIndividual';
import FacilityEdit from './screens/facilities/FacilityEdit';
import DeviceCreate from './screens/devices/DeviceCreate';
import DeviceIndividual from './screens/devices/DeviceIndividual';
import DeviceEdit from './screens/devices/DeviceEdit';
import ProfileEdit from './screens/profile/ProfileEdit';
import ProfileScreen from './screens/profile/ProfileScreen';
import ManagerTabScreen from './navigation/managerNav';
const ManagerApp = () => {
    return(

            <ManagerTabScreen/>

    )
}

export default ManagerApp;