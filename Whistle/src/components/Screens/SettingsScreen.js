import React, { Component } from 'react';
import { StackNavigator, TabNavigator} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity, Image } from 'react-native';

export default class SettingsScreen extends Component {
    static navigationOptions = {
      tabBarLabel: 'Settings',
      tabBarIcon : ({tintColor}) => ( tintColor == 'white' ?
        <Image source={require('./ScreenImages/settings.png')}
                style={{width: 22, height: 22}}/>
        :
        <Image source={require('./ScreenImages/settingsdisabled.png')}
                style={{width: 22, height: 22}}/>
      ),
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
