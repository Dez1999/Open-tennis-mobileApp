import React from 'react';
import {

    Text, 
    View, 
    TouchableOpacity
} from 'react-native';

import { AuthContext } from '../../../sharedComponents/Context/Context';
import Logo from '../../../generalUser/components/Logo';

const ManagerDecision = () => {




    //Global App functions for the user to choose the section of the app 
    const { managerRole } = React.useContext(AuthContext);
    const { generalRole } = React.useContext(AuthContext);


    return (
        <View style={{flex: 1, padding: 20, flexDirection: "column"}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                  <Logo title='Open Tennis' marginTop={50} imageHeight={110} imageWidth={100}/> 
            </View>
          
            <View style={{flex: 2, justifyContent:'center', alignItems:'center', paddingTop: 30}}>
                <Text style={{color: '#0B5B13', fontSize: 25, textAlign:'center'}}>Welcome! Please select which role you would like to proceed as:</Text>
            </View>
              
                      
           <View style={{flex: 2, alignItems:'center', padding: 20}}>
                <TouchableOpacity 
                    onPress={() => {managerRole()}}
                    style={{margin: 20, backgroundColor: "#5D85ED", alignItems: 'center', padding: 10, borderRadius: 50}}>
                    <Text style={{color: '#000', fontSize: 25, textAlign:'center'}}>Manager Role</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {generalRole()}}
                    style = {{magrin: 20, backgroundColor: "#2BC769", alignItems: 'center', padding: 10, borderRadius: 50}}>
                    <Text style={{color: '#000', fontSize: 25, textAlign:'center'}}>General User Role</Text>
                </TouchableOpacity>
            </View>
        </View>


    )
};

export default ManagerDecision;
