import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import NotificationsScreen from './NotificationsScreen';
import CalendarScreen from './CalendarScreen';
import ProfileScreen from './Profile/ProfileScreen';
import SettingsScreen from './SettingsScreen';

  var menuScreenNavigator = TabNavigator({
    Notifications : { screen : NotificationsScreen },
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


  menuScreenNavigator.navigationOptions = {
  };

  export default menuScreenNavigator;