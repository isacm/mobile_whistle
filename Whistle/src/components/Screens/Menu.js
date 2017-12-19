import React, { Component } from 'react';
import { StackNavigator,} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';

export default class Menu extends Component {
    static navigationOptions = {
      title: 'Menu',
      headerStyle: {
        backgroundColor : '#212121'
      },
      headerTitleStyle : {
        color : '#fff',
        textAlign : 'center'
      }
    };
    constructor(props) {
      super(props);
      this.state = {text: ''};
    } 
  
    render() {
      return ( 
        <View>
            <Text There is a blue square
            />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    
  })
  