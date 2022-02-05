import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    Image
} from 'react-native';

const Logo2 = (props) => {

        return(
            <View style={{marginTop: props.marginTop, alignItems: 'center', justifyContent: 'center', flexgrow: 1}}>
                <Image source={require('../images/TennisLogo_edited.jpg')}
                    style={{ width: props.imageWidth, height: props.imageHeight }} />
                <Text style ={styles.logoText}>{props.title}</Text>
            </View>
        )
    
}

const styles = StyleSheet.create({

    logoText: {
        marginVertical: 4,
        fontSize: 30,
        fontWeight: 'bold',
        color:'rgba(0, 0, 0, 1)'
    }
})

export default Logo2;