import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    ImageBackground, 
    Dimensions, 
    Button,
    TouchableOpacity, 
} from 'react-native';
//import {} from 'react-navigation';


class FeedbackScreen extends Component {

constructor(props) {
   super(props);

   }

render() {
  return (
            <View style ={styles.container}>
                    <Text style = {styles.mainText}>{'Feedback'}</Text>   
                    <TouchableOpacity
                      onPress={() => this.props.navigation.goBack()}>
                        <Text style = {styles.itemText}>Go Back</Text> 
                    </TouchableOpacity>
                    
            </View>
  );
 }

}



const styles = StyleSheet.create({
    container : {
      backgroundColor: "#FDF9F6",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },  

    mainText: {
        textAlignVertical: 'center', 
        textAlign : 'center', 
        justifyContent : 'center',
        fontSize: 18,
        fontWeight : 'bold',
        paddingVertical : 12,
        color: 'black'
    }, 

   
  });



export default FeedbackScreen;
