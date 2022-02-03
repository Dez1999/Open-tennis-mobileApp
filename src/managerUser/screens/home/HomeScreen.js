import React from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    Dimensions, 
    ImageBackground

} from 'react-native';


//Imports
import Logo from '../../../generalUser/components/Logo';


const HomeMan = ({navigation}) => {
    return(
        <View style ={styles.container}>
                <SafeAreaView style={{justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{flex: 2}}>
                        <Logo title='Open Tennis' marginTop={20} imageHeight={110} imageWidth={100}/> 
                        <Text style = {styles.mainText}>{'MANAGER'}</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <ImageBackground
                            source = {require('../../../generalUser/images/tennisCourtBackground.jpg')}
                            style = {styles.backgroundStyle} >
                        </ImageBackground>  
                    </View>   
                </SafeAreaView>  
            </View>
        

    );
}

const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      alignItems: 'center',
      justifyContent: 'center',
    },  

    mainText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 26,
        fontWeight : 'bold',
        paddingVertical : 12,
        color: '#0B5B13'
    }, 

    backgroundStyle: {
        width: undefined, 
        height: '60%', 
        justifyContent: 'center',
        alignItems: 'center',
        height: (Dimensions.get('window').height *1.2)/2,
        width: Dimensions.get('window').width,
    }, 

  });

  export default HomeMan;