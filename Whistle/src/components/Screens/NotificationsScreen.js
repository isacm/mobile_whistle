import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, ActivityIndicator, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity, Image, ScrollView} from 'react-native';
import ContentLoader from 'react-native-content-loader';
import {Icon} from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body, Right} from 'native-base';
import { Circle, Rect } from 'react-native-svg';
import api from './api'

export default class NotificationsScreen extends Component {
    static navigationOptions = {
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
      }
    };
    constructor(props) {
      super(props);
      this.state = {text: 'notifications',
                    loading: true,
                    notifications: [],
                    games: [],
                    game: null, 
                    notificationsDetails: []}
    }
    

    componentWillMount() {

      api.getDesignationsByRefereeId('AB1').then((res) =>{
        this.setState({
          notifications: res
        })

        this.state.notifications.map((result, index) => {
          api.getGamesByDesignation(result.gameId).then((gameres) =>{
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
              var notifDetail= {date: this.state.game.date, home: this.state.home, guest: this.state.guest}
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

    renderNotifications(item, index) {
      return (
        <Card key={item.date} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationDetail')} underlayColor="#DCDCDC" >
                      <CardItem style={{backgroundColor: '#2b2b2b' }}>
                        <Left>
                          <Icon color= "white" name="md-information-circle" size={40} type="ionicon" />
                          <Body>
                            <Text style={styles.headerText}>{this.state.notificationsDetails.length}</Text>
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
                          VIANENSE FC - CANELAS FC
                          </Text>
                          <Text style={styles.noteText}>Campo Manuel Machado, Viana do Castelo</Text>
                        </Body>
                      </CardItem>
                </Card>
      )
    };

  
    render() {
      console.log(this.state.notificationsDetails);
      if(this.state.loading){
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
      fontSize: 23,
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