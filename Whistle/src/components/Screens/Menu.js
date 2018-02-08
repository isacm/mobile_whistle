import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { StyleSheet, Image, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import NotificationsScreen from './NotificationsScreen';
import CalendarScreen from './CalendarScreen';
import ProfileScreen from './Profile/ProfileScreen';
import SettingsScreen from './SettingsScreen';


  const menuScreenNavigator = TabNavigator({
    Notification : { screen : NotificationsScreen,
        navigationOptions: ({ navigation }) => {
          return {
            title : 'Notifications',
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
            },
          }
      }},
    Calendar : { screen : CalendarScreen },
    Profile : { screen : ProfileScreen },
    Settings: { screen: SettingsScreen },
  },
    { 
      tabBarPosition : 'bottom',
      swipeEnabled : true,
      tabBarOptions: {
        activeTintColor : 'white',
        inactiveTintColor : 'black',
        activeBackgroundColor: '#2b2b2b',
        inactiveBackgroundColor: '#FFCC00',
        labelStyle: {
          fontSize : 14,
          padding: 0
        }
      }
      
});


  menuScreenNavigator.navigationOptions = ({ navigation }) => {
    return {
      id: navigation.state.params.id,
    }
  };

  export default menuScreenNavigator;