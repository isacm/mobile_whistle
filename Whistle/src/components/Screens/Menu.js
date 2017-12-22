import React, { Component } from 'react';
import { StackNavigator, TabNavigator} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import SettingsScreen from './SettingsScreen';
import NotificationsScreen from './NotificationsScreen';
import CalendarScreen from './CalendarScreen';

  var menuScreenNavigator = TabNavigator({
    Settings : { screen : SettingsScreen },
    Notifications : { screen : NotificationsScreen},
    Calendar : { screen : CalendarScreen},
  },
    { 
      tabBarPosition : 'bottom',
      swipeEnabled : true,
      tabBarOptions: {
        activeTintColor : 'white',
        inactiveTintColor : 'darkgrey',
        activeBackgroundColor : '#2c3e50',
        inactiveBackgroundColor : '#2c3e50',
        labelStyle: {
          fontSize : 14,
          padding: 0
        }
      }
      
});

  menuScreenNavigator.navigationOptions = {
    title : "Menu"
  };

  export default menuScreenNavigator;