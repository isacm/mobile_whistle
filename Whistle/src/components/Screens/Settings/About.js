import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { List, Icon } from 'react-native-elements';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';

export default class About extends Component {
  static navigationOptions = {
    title: 'About',
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
        <Text style={styles.text} > Whistle Platform </Text>
        <Text style={styles.version} > Version 1.0.0 </Text>
        <Image style={styles.logo} source={require('../../../images/white.png')}/>
        <View style={styles.itemcontainer}>
            <Icon name='copyright' type='font-awesome' color='#545454'/>
            <Text style={styles.inc} > 2017-2018 Whistle Inc.</Text>
        </View>
        <Text style={styles.inc} > All rights reserved.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a',

    },

    logo: {
        aspectRatio:1.7,
        resizeMode: 'cover',
        height:null,
        width:null,
        justifyContent: 'center'
      },

      text: {
          fontSize: 30,
          marginTop: '40%',
          textAlign: 'center',
          color: 'white',
          justifyContent: 'center',
      },

      version:{
        marginTop: '2%',
        fontSize: 20,
        textAlign: 'center',
        color: '#545454',
      },

      inc:{
        textAlign: 'center',
        color: '#545454',
      },

      itemcontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a'
      },

})