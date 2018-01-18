import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity, Image } from 'react-native';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';

export default class CalendarScreen extends Component {
    static navigationOptions = {
      title: 'CALENDAR',
      tabBarLabel: 'Calendar',
      headerTintColor: 'black',
      tabBarIcon: ({ tintColor }) => (tintColor == 'white' ?
        <Image source={require('./ScreenImages/calendar.png')}
          style={{ width: 22, height: 22 }} />
        :
        <Image source={require('./ScreenImages/inactivecalendar.png')}
          style={{ width: 22, height: 22 }} />
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
    this.state = { text: 'calendar' };
  }

  render() {
    return (
      <ContentLoader primaryColor="grey"
        secondaryColor="darkgrey"
        duration={2100}
        height={2000}
        width={600}>
        <Rect x="12" y="80" rx="5" ry="5" width="50" height="65" />
        <Rect x="72" y="80" rx="5" ry="5" width="50" height="65" />
        <Rect x="132" y="80" rx="5" ry="5" width="50" height="65" />
        <Rect x="192" y="80" rx="5" ry="5" width="50" height="65" />
        <Rect x="252" y="80" rx="5" ry="5" width="50" height="65" />
        <Rect x="312" y="80" rx="5" ry="5" width="50" height="65" />
        <Rect x="12" y="160" rx="5" ry="5" width="50" height="65" />
        <Rect x="72" y="160" rx="5" ry="5" width="50" height="65" />
        <Rect x="132" y="160" rx="5" ry="5" width="50" height="65" />
        <Rect x="192" y="160" rx="5" ry="5" width="50" height="65" />
        <Rect x="252" y="160" rx="5" ry="5" width="50" height="65" />
        <Rect x="312" y="160" rx="5" ry="5" width="50" height="65" />
        <Rect x="12" y="240" rx="5" ry="5" width="50" height="65" />
        <Rect x="72" y="240" rx="5" ry="5" width="50" height="65" />
        <Rect x="132" y="240" rx="5" ry="5" width="50" height="65" />
        <Rect x="192" y="240" rx="5" ry="5" width="50" height="65" />
        <Rect x="252" y="240" rx="5" ry="5" width="50" height="65" />
        <Rect x="312" y="240" rx="5" ry="5" width="50" height="65" />
        <Rect x="12" y="320" rx="5" ry="5" width="50" height="65" />
        <Rect x="72" y="320" rx="5" ry="5" width="50" height="65" />
        <Rect x="132" y="320" rx="5" ry="5" width="50" height="65" />
        <Rect x="192" y="320" rx="5" ry="5" width="50" height="65" />
        <Rect x="252" y="320" rx="5" ry="5" width="50" height="65" />
        <Rect x="312" y="320" rx="5" ry="5" width="50" height="65" />
        <Rect x="12" y="400" rx="5" ry="5" width="50" height="65" />
        <Rect x="72" y="400" rx="5" ry="5" width="50" height="65" />
        <Rect x="132" y="400" rx="5" ry="5" width="50" height="65" />
        <Rect x="192" y="400" rx="5" ry="5" width="50" height="65" />
        <Rect x="252" y="400" rx="5" ry="5" width="50" height="65" />
        <Rect x="312" y="400" rx="5" ry="5" width="50" height="65" />
      </ContentLoader>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
})
