import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, ActivityIndicator, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity, Image, ScrollView} from 'react-native';
import ContentLoader from 'react-native-content-loader';
import {Icon} from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body, Right} from 'native-base';
import { Circle, Rect } from 'react-native-svg';
import api from './api'
import Loading from '../Loading'

export default class NotificationsScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {text: 'notifications',
                    loaded: false,
                    notifications: [],
                    games: [],
                    game: null,
                    notificationsDetails: []}
      Loading.load(v => this.setState({loaded: true}));
    }
    

    componentWillMount() {

      api.getDesignationsByRefereeId('5a74b09292f00d13dde6a099').then((res) =>{
        this.setState({
          notifications: res
        })

        this.state.notifications.map((result, index) => {
          api.getGameByDesignation(result.gameId).then((gameres) =>{
            this.setState({
              game: gameres
            })
            api.getTeam(this.state.game.home_teamId).then((homeres) =>{
              this.setState({
                home: homeres
              })
            })
            api.getTeam(this.state.game.guest_teamId).then((guestres) =>{
              this.setState({
                guest: guestres
              })
              var notifDetail= {notificationId: result.id, gameid: result.gameId, date: this.state.game.date, home: this.state.home.name, guest: this.state.guest.name}
              this.state.notificationsDetails.push(notifDetail)
            })
          })
         })
      });


    }

    getGameInfo(){
      for(var i =0; i<this.state.notifications.length;i++){
        api.getGamesByDesignation(this.state.notifications[i].gameId).then((gameres) =>{
          this.setState({
            game: gameres
          })
          this.state.games.push(this.state.game.date);
        })
      }
    }

    renderContentLoader(){
      return (
        <ContentLoader primaryColor="#2b2b2b"
            secondaryColor="#1a1a1a"
            duration={2000}
            height={2000}
            width={600}>
            <Rect x="10" y="30" rx="5" ry="5" width="80" height="100" />
            <Rect x="100" y="35" rx="5" ry="4" width="265" height="12" />
            <Rect x="100" y="55" rx="5" ry="4" width="265" height="12" />
            <Rect x="100" y="75" rx="5" ry="4" width="265" height="12" />
            <Rect x="10" y="160" rx="5" ry="5" width="80" height="100" />
            <Rect x="100" y="165" rx="5" ry="4" width="265" height="12" />
            <Rect x="100" y="185" rx="5" ry="4" width="265" height="12" />
            <Rect x="100" y="205" rx="5" ry="4" width="265" height="12" />
            <Rect x="10" y="290" rx="5" ry="5" width="80" height="100" />
            <Rect x="100" y="295" rx="5" ry="4" width="265" height="12" />
            <Rect x="100" y="315" rx="5" ry="4" width="265" height="12" />
            <Rect x="100" y="335" rx="5" ry="4" width="265" height="12" />
            <Rect x="10" y="420" rx="5" ry="5" width="80" height="100" />
            <Rect x="100" y="425" rx="5" ry="4" width="265" height="12" />
            <Rect x="100" y="445" rx="5" ry="4" width="265" height="12" />
            <Rect x="100" y="465" rx="5" ry="4" width="265" height="12" />
                
          

          </ContentLoader>
      );
    }

    renderNotifications(item, index) {
      return (
        <Card key={item.notificationId} >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationDetail', { notificationid: item.notificationId, userid: "5a74b09292f00d13dde6a099", gameid: item.gameid, status: item.isaccepted})} underlayColor="#DCDCDC" >
                      <CardItem style={{backgroundColor: '#2b2b2b' }}>
                        <Left>
                          <Icon color= "white" name="md-information-circle" size={30} type="ionicon" />
                          <Body>
                            <Text style={styles.headerText}>{item.date.split('T')[0]}</Text>
                          </Body>
                        </Left>
                        <Right>
                          <Icon color="white" name="chevron-thin-right" size={20} type = "entypo" />
                        </Right>
                      </CardItem>
                      </TouchableOpacity>
                      <CardItem style={{ backgroundColor: '#FFCC00'}}>
                        <Body>
                          <Text style={styles.noteText}>COMPETIÇÃO: CNS Série A</Text>
                          <Text style ={styles.gameText}>
                          {item.home + ' VS ' + item.guest}
                          </Text>
                          <Text style={styles.noteText}>Campo Manuel Machado, Viana do Castelo</Text>
                        </Body>
                      </CardItem>
                </Card>
      )
    };

  
    render() {
       if(!this.state.loaded){
        return(
            <View style={[styles.container]}>
              {this.renderContentLoader()}
            </View>);
        }
       else{
        return ( 
          <ScrollView style={styles.container}>
          <Container style={styles.container}>
            <Content style={styles.cardcontainer}>
              {this.state.notificationsDetails.map((result, index) => {
                return this.renderNotifications(result, index);
              })}
              </Content>
          </Container>
          </ScrollView>
        )
      }
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a',
    },
    headerText: {
      fontSize: 15,
      color :"white",
      fontWeight: 'bold',
    },
    gameText : {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#2b2b2b",
      alignItems: 'center'
    },
     noteText: {
      fontSize: 13,
      fontWeight: 'bold',
       color: "#2b2b2b",
      alignItems: 'center'
    },

    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },

    cardcontainer: {
      padding:8,
      backgroundColor: '#1a1a1a',
    }
  })