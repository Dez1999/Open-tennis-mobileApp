import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {useState} from "react";
//Icons imports
//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import {faSearch, faWindowClose, faTimesCircle, faStar} from '@fortawesome/free-solid-svg-icons';

const SearchComponent = (props) => {
    const[term, setTerm] = useState("");

    
    return (
        <View style={{
            flex: props.flex,
            backgroundColor: "#E2F1DB", 
            flexDirection: "row", 
            justifyContent: "space-between",
            paddingBottom: 13, 
            borderRadius: 15,
            paddingTop: 3, 
            marginLeft: props.marginLeft, 
            marginRight: props.marginRight,
            width: '100%'
        }}>
            
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
        size: 23
    }, 

    searchInputStyle: {
        flex: 1, 
        fontSize: 18, 
        paddingVertical: 0, 
        margin: 0, 
        color: "black"
    }
})

export default SearchComponent;