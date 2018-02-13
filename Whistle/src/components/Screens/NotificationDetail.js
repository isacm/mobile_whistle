import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { RefreshControl, Platform, Linking, StyleSheet, Modal, ActivityIndicator, ScrollView, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
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
           refreshing: false,
           justificationinput: "",
           rejectinput: "",
           modalVisible: false, 
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
           longitude: null,
           gamenotifications: [],
           referees: [],
           notstate: null,
           notjustification: null,
           stadiumname: null
        }  
        Loading.load(v => this.setState({loaded: true}));
    } 

    componentWillMount() {
        console.log(api.getGameByDesignation(this.props.navigation.state.params.gameid));
        api.getGameByDesignation(this.props.navigation.state.params.gameid).then((gameres) => {
            this.setState({
                gamedate: gameres.date,
                gamehour: gameres.time,
                teamhome: gameres.home_teamId,
                teamaway: gameres.guest_teamId,
            })
            api.getTeam(this.state.teamhome).then((reshome) => {
                this.setState({
                    teamhomename: reshome.name,
                    longitude: reshome.localization.lng,
                    latitude: reshome.localization.lat,
                    leagueid: reshome.leagueId,
                    stadiumname: reshome.stadium
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
        api.getDesignationsByGameid(this.props.navigation.state.params.gameid).then((notifications) => {
            this.setState({
                gamenotifications : notifications
            })
            this.state.gamenotifications.map((result, index) => {    
                if(this.props.navigation.state.params.notificationid != result.id){
                    api.getReferee(result.refereeId).then((referee) => {
                            this.state.referees.push(referee);
                    })
                } else {
                    this.setState({
                        notstate: result.isAccepted,
                        notjustification: result.justification
                    })
                }
            })
        });
   
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.refresh();
        this.setState({refreshing: false});
      }

    refresh(){
        console.log(api.getGameByDesignation(this.props.navigation.state.params.gameid));
        api.getGameByDesignation(this.props.navigation.state.params.gameid).then((gameres) => {
            this.setState({
                gamedate: gameres.date,
                gamehour: gameres.time,
                teamhome: gameres.home_teamId,
                teamaway: gameres.guest_teamId,
            })
            api.getTeam(this.state.teamhome).then((reshome) => {
                this.setState({
                    teamhomename: reshome.name,
                    longitude: reshome.localization.lng,
                    latitude: reshome.localization.lat,
                    leagueid: reshome.leagueId,
                    stadiumname: reshome.stadium
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
        api.getDesignationsByGameid(this.props.navigation.state.params.gameid).then((notifications) => {
            this.setState({
                gamenotifications : notifications
            })
            this.state.gamenotifications.map((result, index) => {    
                if(this.props.navigation.state.params.notificationid != result.id){
                    api.getReferee(result.refereeId).then((referee) => {
                            this.state.referees.push(referee);
                    })
                } else {
                    this.setState({
                        notstate: result.isAccepted,
                        notjustification: result.justification
                    })
                }
            })
        });
   
    }

    

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    _pressAcceptReason() {
        this.setModalVisible(false);
    }

    openCorrespondingMap(lat, long) {
        openMap({ latitude: lat, longitude: long });
    }

    status(){
        if (this.state.notstate) { return 'ACCEPTED' }
        if ((!this.state.notstate) && (this.state.notjustification === undefined)) { return 'AWAITING RESPONSE' }
        else { return 'REJECTED' }
    }

    acceptNomination() {
        api.acceptDesignation(this.props.navigation.state.params.notificationid).then((resnot) =>{

        if (typeof resnot.error === 'undefined') {
            setTimeout(() => {
                Alert.alert(
                    'Confirmed',
                    'Please inform if your availability changes',
                    [
                        { text: 'OK', onPress: () => console.log('OK pressed'), style: 'cancel' }
                    ],
                    { cancelable: false })
            }, 200)
        }
        else {
            setTimeout(() => {
                Alert.alert(
                    'Something went wrong',
                    'Try again',
                    [
                        { text: 'OK', onPress: () => console.log('OK pressed'), style: 'cancel' }
                    ],
                    { cancelable: false })
            }, 200)
        }
    })
    }

    rejectNomination(string) {
        api.refuseDesignation(this.props.navigation.state.params.notificationid, string).then((resnot) => {


        if (typeof resnot.error === 'undefined') {
            setTimeout(() => {
                Alert.alert(
                    'Submitted',
                    'Your nomination was cancelled',
                    [
                        { text: 'OK', onPress: () => console.log('OK pressed'), style: 'cancel' }
                    ],
                    { cancelable: false })
            }, 200)
        }
        else {
            setTimeout(() => {
                Alert.alert(
                    'Something went wrong',
                    'Try again',
                    [
                        { text: 'OK', onPress: () => console.log('OK pressed'), style: 'cancel' }
                    ],
                    { cancelable: false })
            }, 200)
        }
    })
}


    renderStatus = () => {
        return(
        <View style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Text style={styles.headertext}> STATUS </Text>
            <Text style={styles.actualtext}> {this.status()} </Text>
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
            <Text style={styles.actualtext}> League | {this.state.leaguename} </Text>
                <Text style={styles.teamtext}> H | {this.state.teamhomename} </Text>
                <Text style={styles.teamtext}> A | {this.state.teamawayname} </Text>
        </View> 
        )
    }
    renderEntourage = () => {
        return(
        <View style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Text style={styles.headertext}> ASSISTANTS </Text>
        </View> 
        )
    }
    renderAssistent(result, index) {
        return(
            <Content key={result.id}>
                <Card style={styles.assistentContainer}>
                    <View style={styles.buttoncontainer}>
                        <Text style={styles.assistenttext}>{result.username}</Text>
                        <TouchableOpacity underlayColor="#dcdcdc" onPress={() => this.props.navigation.navigate('SelectedProfile', {assistentid: result.id})}>
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
                <Text style={styles.actualtext}> {this.state.stadiumname} </Text> 

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

    renderModal = () => {

        return (

            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { alert("Modal has been closed.") }}>
                <View style={styles.overlay}>

                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.headermodal}>Submit your justification</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <TextInput underlineColorAndroid='transparent'
                                ref="RejectInput"
                                autoCorrect={true}
                                style={styles.rejectInputSection}
                                blurOnSubmit={false}
                                autoFocus={true}
                                multiline={true}
                                placeholder="REASON"
                                placeholderTextColor="#FFF" 
                                returnKeyType="done"
                                onChangeText={(rejectinput) => this.setState({ rejectinput })}
                                value={this.state.rejectinput}
                                onSubmitEditing={(event) => { this.setModalVisible(!this.state.modalVisible) }}
                            />
                        </View>

                    </View>
                    <View style={styles.modalFooter}>
                    <View style={styles.modalbuttoncontainer}>
                        <TouchableOpacity style={styles.modalButtons} onPress={() => { this.setModalVisible(!this.state.modalVisible) }} underlayColor="#2b2b2b">
                            <Icon color="white" name="close" size={40} type="MaterialCommunityIcons" />                        
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButtons} onPress={() => { this.setModalVisible(!this.state.modalVisible), this.rejectNomination(this.state.rejectinput) }} underlayColor="#2b2b2b">
                            <Icon color="white" name="send" size={40} type="material-icons" />
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                </View>
            </Modal>
        )
    }

    renderInitialButtons = () => {
        return(
        <Card style={styles.cardContainer}>
            <View style={styles.twobuttoncontainer}>
                    <TouchableOpacity onPress={() => this.acceptNomination()} underlayColor="#dcdcdc">
                    <Icon color="#FFCC00" name="check" size={30} type="evil-icons" />
                    <Text style={styles.buttontext} > CONFIRM </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setModalVisible(true)} underlayColor="#dcdcdc" >
                    <Icon color="#FFCC00" name="close" size={30} type="evil-icons" />
                    <Text style={styles.buttontext} > REJECT </Text>
                </TouchableOpacity>
            </View>
        </Card>
        
        )
    }

    renderCancelButton = () => {
        return ( 
            <TouchableOpacity onPress={() => this.setModalVisible(true)} underlayColor="#dcdcdc">
            <Card style={styles.cardContainer}>
                <View style={styles.itemcontainer}>
                    <View style={styles.icomcontainer}>
                        <Icon color="#FFCC00" name="block" size={40} type="material-icons" />
                    </View>
                    <View style={styles.namecontainer}>
                        <Text style={styles.items}> CANCEL CONFIRMATION </Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
        )
    }

    renderVariableButtons = () => {

        if ((!this.state.notstate) && (this.state.notjustification === undefined)){
            return(this.renderInitialButtons())
        } 
        else {
            if ((this.state.notstate)) {
                return(this.renderCancelButton())
            }  
            else {
                return(<View/>)
            }
        } 
    }

    render() {
        console.log(this.props.navigation.state.params.stadiumname);

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
                <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                    />
                  }>
                    {this.renderModal()}
                    {this.renderStatus()}
                    {this.renderDate()}
                    {this.renderHour()}
                    {this.renderGame()}
                    {this.renderEntourage()}
                    {this.state.referees.map((result, index) => {
                        return this.renderAssistent(result, index)})}
                    {this.renderMap()}
                    {this.renderVariableButtons()}
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
            fontSize: 20,
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
        modalbuttoncontainer: {
            padding: "3%",
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#1a1a1a'
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
            color: '#FFCC00'
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
        horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
          },

        map: {
            marginTop: '5%',
            width: 380,
            height: 200,
        },

        rejectInputSection: {
            width: '90%',
            padding: '6%',
            textAlign: 'center',
            color: '#FFFFFF',
            textAlignVertical: 'top',
            backgroundColor: '#2b2b2b',
            borderRadius: 5
        },

        modalContainer: {
            backgroundColor: '#1a1a1a',
            marginTop: '30%',
            margin: 10,

        },

        modalView: {
        },

        modalBody: {
            alignItems: "center",
            marginTop: '2%',
            paddingLeft: 5,
            flexDirection: 'column',
            marginBottom: '2%',
            justifyContent: 'center',
            marginBottom: 20,
            borderRadius: 30,

        },

        modalFooter: {
            margin: '5%',
            marginTop: '5%',
            marginBottom: '10%'

        },

        text: {
            margin: '8%',
            fontSize: 20,
            color: 'white'
        },

        headermodal: {
            color: 'white',
            margin: '5%',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: "center"
        },

        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.8)'
        }
    })