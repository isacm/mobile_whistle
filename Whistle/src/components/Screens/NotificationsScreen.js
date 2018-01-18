import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity, Image} from 'react-native';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';

export default class NotificationsScreen extends Component {
    static navigationOptions = {
      title : 'NOTIFICATIONS',
      tabBarLabel: 'Notifications',
      headerTintColor: 'black',
      tabBarIcon : ({tintColor}) => ( tintColor == 'white' ?
        <Image source={require('./ScreenImages/notifications.png')}
                style={{width: 22, height: 22}}/>
        :
        <Image source={require('./ScreenImages/inactivenotifications.png')}
                style={{width: 22, height: 22}}/>
      ),
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
      this.state = {text: 'notifications'};
    } 
  
    render() {
      return ( 
        <ContentLoader primaryColor="grey"
          secondaryColor="darkgrey"
          duration={2100}
          height={2000}
          width={600}>
          <Rect x="10" y="10" rx="5" ry="5" width="60" height="65" />
          <Rect x="75" y="15" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="35" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="55" rx="5" ry="4" width="290" height="12" />
          <Rect x="10" y="90" rx="5" ry="5" width="60" height="65" />
          <Rect x="75" y="95" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="115" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="135" rx="5" ry="4" width="290" height="12" />
          <Rect x="10" y="170" rx="5" ry="5" width="60" height="65" />
          <Rect x="75" y="175" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="195" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="215" rx="5" ry="4" width="290" height="12" />
          <Rect x="10" y="250" rx="5" ry="5" width="60" height="65" />
          <Rect x="75" y="255" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="275" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="295" rx="5" ry="4" width="290" height="12" />
          <Rect x="10" y="330" rx="5" ry="5" width="60" height="65" />
          <Rect x="75" y="335" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="355" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="375" rx="5" ry="4" width="290" height="12" />
          <Rect x="10" y="410" rx="5" ry="5" width="60" height="65" />
          <Rect x="75" y="415" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="435" rx="5" ry="4" width="290" height="12" />
          <Rect x="75" y="455" rx="5" ry="4" width="290" height="12" />

        </ContentLoader>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
  })
