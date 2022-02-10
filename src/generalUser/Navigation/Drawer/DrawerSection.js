import React from 'react';
import { View, StyleSheet} from 'react-native';
import { 
    Title,  
    Drawer, 
    Text, 
} from 'react-native-paper';
import Logo from '../../components/Logo';

//Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
    DrawerContentScrollView,
    DrawerItem, 
} from '@react-navigation/drawer';

import { AuthContext } from '../../../sharedComponents/Context/Context';



/*Displays the Items in the Drawer Navigator */
export default function DrawerSectionNav(props) {


    return (
        <View style={{flex:1, backgroundColor: '#FDF9F6'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.menuSection}>
                        <View style= {{flexDirection: 'row', marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                            <Logo imageHeight={110} imageWidth={100}/>
                        </View>
                        <View style= {{marginLeft: 15, flexDirection: 'column'}}>
                            <Title style={styles.title}>Menu</Title>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerItem
                                icon={ () => ( <Icon name="home" size={27} color={color}  onPress={() => { props.navigation.navigate('Home') }} /> )} 
                                label={ () => ( <Text style={{color: 'black', fontSize: 18}}>Home</Text>) }
                                onPress={() => { props.navigation.navigate('Home') }}
                                >
                        </DrawerItem> 
                        <DrawerItem
                                icon={ () => ( <Icon name="user" size ={27} color='black' onPress={() => { props.navigation.navigate('Account') }} /> )} 
                                label={ () => ( <Text style={{color: 'black', fontSize: 18}}>Account</Text>) }
                                onPress={() => { props.navigation.navigate('Account') }}
                                >
                        </DrawerItem> 
                        <DrawerItem
                                icon={ () => ( <Icon icon="info-circle" size ={27} color='black' onPress={() => { props.navigation.navigate('About') }} /> )} 
                                label={ () => ( <Text style={{color: 'black', fontSize: 18}}>About</Text>) }
                                onPress={() => { props.navigation.navigate('About') }}
                                >
                        </DrawerItem> 
                    </Drawer.Section>
                  
                </View>

            </DrawerContentScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    }, 
    menuSection: {
        paddingLeft: 0
    }, 
    title: {
        fontSize: 30, 
        marginTop: 1, 
        fontWeight: 'bold',
    }, 
    section: {
        flexDiretcion: 'row',
        alignItems: 'center', 
        marginRight: 15,
    }, 
    drawerSection: {
        marginTop: 15,
    },
})

