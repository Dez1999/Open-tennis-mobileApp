
import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {useState} from "react";
//Icons imports
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchComponent = (props) => {
    const[term, setTerm] = useState("");

    
    return (
        <View style={{
            flex: props.flex,
            backgroundColor: "#E2F1DB", 
            flexDirection: "row", 
            justifyContent: "space-between",
            paddingBottom: 7, 
            borderRadius: 15,
            paddingTop: 3, 
            marginLeft: props.marginLeft, 
            marginRight: props.marginRight
        }}>
            <Icon name="search" size={20} style={styles.iconStyle}/>
            <TextInput
                placeholder="Search Facilities..."
                placeholderTextColor="#463F3F"
                style={styles.searchInputStyle}
                value={term}
                onChangeText={(newText) => {
                    setTerm(newText);

                }}
                onEndEditing={() => {
                    console.log(term);
                }}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        marginTop:8, 
        marginHorizontal: 8, 
        color: "black", 
        
    }, 

    searchInputStyle: {
        flex: 1, 
        fontSize: 16, 
        paddingVertical: 0, 
        margin: 0, 
        color: "black"
    }
})

export default SearchComponent;