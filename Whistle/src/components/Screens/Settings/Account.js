import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';

export default class Account extends Component {
  static navigationOptions = {
    title: 'Account',
    headerTintColor: '#1a1a1a',
    headerStyle: {
      backgroundColor: '#FFCC00'
    },
    headerTitleStyle : {
      color : '#000',
      textAlign : 'center'
    }
};
  constructor(props) {
    super(props);
    this.state = {text: ''};
  } 

  render(){
    return(
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
})