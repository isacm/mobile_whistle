import React, { Component } from 'react';
import { StackNavigator, TabNavigator} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';

export default class CalendarScreen extends Component {
    static navigationOptions = {
      title: 'Calendar',
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
        <View style = {styles.container}>
            <Text There is a blue square
            />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#2980b9'
    },
  })
