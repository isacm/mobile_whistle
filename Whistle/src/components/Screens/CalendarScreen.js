import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import api from './api'


export default class CalendarScreen extends Component {
    static navigationOptions = {
      title: 'Calendar',
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
      },
      
  };
  constructor(props) {
    super(props);
    this.state = { text: 'calendar',
                   loading: true,
                   items: {},
                   notifications: [],
                   games: [],
                   game: null,
                   home: null,
                   away: null,
                   gamesByDay: [] };
  }

  componentWillMount() {
    api.getDesignationsByRefereeId('AB1').then((res) =>{
      this.setState({
        notifications: res
      })

      this.state.notifications.map((result, index) => {
        if(result.isAccepted){
          api.getGameByDesignation(result.gameId).then((gameres) =>{
            this.setState({
              game: gameres
            })
            api.getTeam(this.state.game.home_teamId).then((homeres) => {
              this.setState({
                home: homeres.name
              })
              api.getTeam(this.state.game.guest_teamId).then((guestres) => {
                this.setState({
                  away: guestres.name
              
                })
                var gameDet= {notid: result.id, gameid: result.gameId, isAccepted: result.isAccepted, date: this.state.game.date, time: this.state.game.time.substring(0, 5), home: this.state.home, guest: this.state.away }
                this.state.games.push(gameDet);
              })
            })
          })
        }
      })
    })
    
  }

  state = { index: 0 }
  updateIndex = (index) => { this.setState({ index }) }

  render() {
    var today = new Date();
    var date= parseInt(today.getMonth()+1) + "-"+  today.getDate() +"-"+ today.getFullYear();
    return (
      <View style={styles.container}>
        <Agenda
          style={styles.container}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'01-30-2018'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          theme={{
            backgroundColor: '#2b2b2b',
            calendarBackground: '#1a1a1a',
            dayTextColor:'white',
            selectedDayBackgroundColor: '#FFCC00',
            selectedDayTextColor: '#2b2b2b',
            selectedDotColor: '#2b2b2b',
            dotColor: '#FFCC00',
            calendarListBackground: '#1a1a1a',
            //agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'white'
          }}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#666'},
          //    '2017-05-09': {textColor: '#666'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -50; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        this.state.games.map((result, index) => { 
          if(result.date == strTime){
            this.state.gamesByDay.push(result);
          }
        })
        this.state.items[strTime] = [];
        this.state.gamesByDay.map((result, index) => {
            this.state.items[strTime].push({
              notid: result.notid,
              gameid: result.gameid,
              isAccepted: result.isAccepted,
              hour: result.time,
              home: result.home,
              guest: result.guest,
              height: Math.max(50, 100)
            });
        })
        this.state.gamesByDay = [];
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationDetail', { notificationid: item.notid, userid: "AB1", gameid: item.gameid, status: item.isaccepted})}>
        <View style={[styles.item, {height: item.height}]} key={item.notid}>
          <View style={styles.viewhour}>
            <Text style={styles.hour}>{item.hour}</Text>
          </View>
          <View style={styles.teams}>
            <Text style={styles.hour}>{item.home}</Text>
            <Text style={styles.hour}>VS</Text>
            <Text style={styles.hour}>{item.guest}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text style={styles.empty}>You have no games on this day!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30,
  },
  hour: {
    padding: 5
  },
  viewhour:{
    width: '30%'
  },
  teams:{
    width: '70%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  empty:{
    color: 'white'
  }
});