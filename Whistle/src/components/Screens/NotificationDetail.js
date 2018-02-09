import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { Platform, Linking, StyleSheet, ActivityIndicator, ScrollView, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import api from './api';
import Loading from '../Loading'
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import openMap from 'react-native-open-maps';

export default class NotificationDetail extends Component {
    state = {loaded: false}
    static navigationOptions = {
        title: 'Notification',
        headerTintColor: '#1a1a1a',
        headerStyle: {
            backgroundColor: '#FFCC00'
        },
        headerTitleStyle: {
            color: '#000',
            textAlign: 'center'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
           gameid: null,
           league: null,
           referees: [],
           teamhome : null,
           teamhomename : null,
           teamaway : null,
           teamawayname: null,
           leagueid: null,
           leaguename: null,
           latitude: null,
           longitude: null
        }  
        Loading.load(v => this.setState({loaded: true}));
    } 

    componentWillMount() {

        api.getGameByDesignation(this.props.navigation.state.params.gameid).then((gameres) => {
            this.setState({
                gamedate: gameres.date.split('T')[0],
                gamehour: gameres.date.split('T')[1].split('.')[0],
                teamhome: gameres.home_teamId,
                teamaway: gameres.guest_teamId,
            })
            api.getTeam(this.state.teamhome).then((reshome) => {
                this.setState({
                    teamhomename: reshome.name,
                    longitude: reshome.localization.lng,
                    latitude: reshome.localization.lat,
                    leagueid: reshome.leagueId,
                })
                api.getLeagues(this.state.leagueid).then((resleague) => {
                    this.setState({
                        leaguename: resleague.name,
                    })
                }) 
            })
            api.getTeam(this.state.teamaway).then((resaway) => {
                this.setState({
                    teamawayname: resaway.name,
                })
            })    
                              
    });
    }

    openCorrespondingMap(lat, long) {
        openMap({ latitude: lat, longitude: long });
    }

    renderStatus = () => {
        return(
        <View style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Text style={styles.headertext}> STATUS </Text>
            <Text style={styles.actualtext}> AWAITING RESPONSE </Text>
        </View>)
    }
    renderDate = () => {
        return (
            <View style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Text style={styles.headertext}> DATE </Text>
            <Text style={styles.actualtext}> 
                {this.state.gamedate}
            </Text>
        </View>)
        //if(bababa != undefined)
    }
    renderHour= () => {
        return (
            <View style={{ marginTop: "5%", marginLeft: "5%" }}>
                <Text style={styles.headertext}> HOUR </Text>
                <Text style={styles.actualtext}> {this.state.gamehour} </Text>
            </View>)
    }

    renderGame = () => {
        return(
        <View style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Text style={styles.headertext}> GAME </Text>
            <Text style={styles.actualtext}> League: {this.state.leaguename} </Text>
                <Text style={styles.teamtext}> H: {this.state.teamhomename} </Text>
                <Text style={styles.teamtext}> A: {this.state.teamawayname} </Text>
        </View> 
        )
    }
    renderEntourage = () => {
        return(
        <View style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Text style={styles.headertext}> ASSISTENTS </Text>
        </View> 
        )
    }
    renderAssistent = () => {
        return(
            <Content>
                <Card style={styles.assistentContainer}>
                    <View style={styles.buttoncontainer}>
                        <Text style={styles.assistenttext}>  
                        {this.state.name1}
                        </Text>
                    
                        <TouchableOpacity underlayColor="#dcdcdc" onPress={() => this.props.navigation.navigate('SelectedProfile')}>
                            <Icon color="#FFCC00" name="chevron-thin-right" size={20} type="entypo" />               
                        </TouchableOpacity>
                        </View>
                </Card>
            </Content>
        )
    }
    renderMap = () => {
        return (
        <View style={{ marginTop: "5%", marginLeft: "5%",}}>
            <Text style={styles.headertext}> LOCATION </Text>
                <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.openCorrespondingMap(this.state.latitude, this.state.longitude) }>

                <MapView style={styles.map}
                    
                    initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        }}>
                    </Marker>
                </MapView>
                </TouchableOpacity>
                </View>
        </View>
        )

    }
    renderInitialButtons = () => {
        return(
        <Card style={styles.cardContainer}>
            <View style={styles.twobuttoncontainer}>
                <TouchableOpacity underlayColor="#dcdcdc">
                    <Icon color="#FFCC00" name="check" size={30} type="evil-icons" />
                    <Text style={styles.buttontext} > CONFIRM </Text>
                </TouchableOpacity>
                <TouchableOpacity underlayColor="#dcdcdc" >
                    <Icon color="#FFCC00" name="close" size={30} type="evil-icons" />
                    <Text style={styles.buttontext} > REJECT </Text>
                </TouchableOpacity>
            </View>
        </Card>
        
        )
    }

    renderCancelButton = () => {
        return ( 
        <TouchableOpacity underlayColor="#dcdcdc">
            <Card style={styles.cardContainer}>
                <View style={styles.itemcontainer}>
                    <View style={styles.icomcontainer}>
                        <Icon color="#FFCC00" name="block" size={50} type="material-icons" />
                    </View>
                    <View style={styles.namecontainer}>
                        <Text style={styles.items}> CANCEL CONFIRMATION </Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
        )
    }

    render() {
        console.log(this.props.navigation.state.params.userid);
        console.log(this.props.navigation.state.params.notificationid);
        if(!this.state.loaded){
            return(
                <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#FFCC00" />
                </View>);
        }
        else{
        return (
                //{this.newRender()}
                <ScrollView style={styles.container}>
                    {this.renderStatus()}
                    {this.renderDate()}
                    {this.renderHour()}
                    {this.renderGame()}
                    {this.renderEntourage()}
                    {this.renderAssistent()}
                    {this.renderAssistent()}
                    {this.renderMap()}
                    {this.renderInitialButtons()}
                    {/*this.renderCancelButton()*/}
                </ScrollView>
        )
    }
    }}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#1a1a1a',
           
        },
        buttontext: {
            color : "#FFCC00", 
            fontSize: 15, 
            fontWeight: "bold"
        },
        buttoncancel: {
            color: "#FFCC00",
            fontSize: 15,
            fontWeight: "bold"
        },
        contentContainer:{
         padding:8,
         backgroundColor: '#1a1a1a',
        },
        viewstyle: {
            flex: 1,
            marginLeft: "5%",
            marginTop: "100%",
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start'  
        },
        viewcancel: {
            flex: 1,
            marginLeft: "5%",
            marginTop: "100%",
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        headertext: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: "2%"
        },
        assistenttext: {
            color: "#DCDCDC",
            fontSize: 20,
            fontWeight: "bold"
        },
        actualtext: {
            color: "#DCDCDC",
            fontSize: 15,
            marginBottom: "2%",
            fontWeight: "bold"
        },
        teamtext: {
            color: "#DCDCDC",
            fontSize: 15,
            fontWeight: "bold"
        },
        itemcontainer: {
            padding: "3%",
            paddingLeft: "2%",
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2b2b2b'
        },
        twobuttoncontainer: {
            padding: "3%",
            paddingLeft: "2%",
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#2b2b2b'
        },
        buttoncontainer: {
            padding: "3%",
            paddingLeft: "2%",
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#2b2b2b'
        },
        iconcontainer: {
            flex: 1,
        },
        namecointainer: {
            flex: 1,
        },
        items: {
            fontSize: 20,
            fontWeight: "bold",
            paddingLeft: "5%",
            justifyContent: 'center',
            textAlign: 'center',
            color: '#DCDCDC'
        },
        cardContainer: {
            backgroundColor: '#2b2b2b',
            borderWidth: 0,
            flex: 1,
            margin: '6%',
            padding: 8,
            marginTop: "5%",
        },
        assistentContainer: {
            backgroundColor: '#2b2b2b',
            borderWidth: 0,
            flex: 1,
            margin: '20%',
            marginTop: "4%",
        },
        exampleImage: {
            borderColor: '#1a1a1a',
            backgroundColor: '#1a1a1a',
            justifyContent: 'center',
            borderWidth: 3,
            height: 220,
            width: "80%",
        },
     
        horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
          },

            map: {
                width: 300,
                height: 250,
            },
    })