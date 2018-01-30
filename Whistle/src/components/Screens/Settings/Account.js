import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { List, Icon } from 'react-native-elements';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';

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