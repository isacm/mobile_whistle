import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { Platform, Linking, StyleSheet, Modal, ActivityIndicator, ScrollView, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
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
        }  
        Loading.load(v => this.setState({loaded: true}));
    } 

    componentWillMount() {
        console.log(api.getGameByDesignation(this.props.navigation.state.params.gameid));
        api.getGameByDesignation(this.props.navigation.state.params.gameid).then((gameres) => {
            this.setState({
                gamedate: gameres.date,
                gamehour: gameres.hora,
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
        api.getDesignationsByGameid(this.props.navigation.state.params.gameid).then((notifications) => {
            this.setState({
                gamenotifications : notifications
            })
            this.state.gamenotifications.map((result, index) => {
                if(this.props.navigation.state.params.notificationid != result.id){
                    api.getReferee(result.refereeId).then((referee) => {
                            this.state.referees.push(referee);
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
        if(this.props.navigation.state.params.status){ return 'ACCEPTED'}
        else{ return 'AWAITING RESPONSE'}
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
            <Text style={styles.actualtext}> League: {this.state.leaguename} </Text>
                <Text style={styles.teamtext}> H: {this.state.teamhomename} </Text>
                <Text style={styles.teamtext}> A: {this.state.teamawayname} </Text>
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
                        <Text style={styles.assistenttext}>  
                        {result.username}
                        </Text>
                    
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
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.headermodal}>Reject Nomination</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <TextInput underlineColorAndroid='transparent'
                                ref="RejectInput"
                                autoCorrect={false}
                                style={styles.rejectInputSection}
                                blurOnSubmit={false}
                                autoFocus={true}
                                multiline={true}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="REASON"
                                returnKeyType="default"
                                onChangeText={(rejectinput) => this.setState({ rejectinput })}
                                value={this.state.rejectinput}
                                onSubmitEditing={(event) => { this.setModalVisible(!this.state.modalVisible) }}
                            />
                        </View>
                        <TouchableOpacity style={styles.modalButtons} onPress={() => { this.setModalVisible(!this.state.modalVisible), this.rejectNomination(this.state.rejectinput) }} underlayColor="#2b2b2b">
                            <Icon color="white" name="mail" size={50} type="entypo" />
                        </TouchableOpacity>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.modalButtons} onPress={() => { this.setModalVisible(!this.state.modalVisible) }} underlayColor="#2b2b2b">
                                <Icon color="white" name="chevron-thin-down" size={30} type="entypo" />
                            </TouchableOpacity>
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
                    {this.renderModal()}
                    {this.renderStatus()}
                    {this.renderDate()}
                    {this.renderHour()}
                    {this.renderGame()}
                    {this.renderEntourage()}
                    {this.state.referees.map((result, index) => {
                        return this.renderAssistent(result, index)})}
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

        rejectInputSection: {
            width: '90%',
            padding: '5%',
            alignItems: 'center',
            textAlign: 'center',
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 10
        },

        modalContainer: {
            backgroundColor: '#1a1a1a',
            marginTop: '30%',
            margin: 15,

        },

        modalView: {
        },

        modalBody: {
            margin: '5%',
            flexDirection: 'column',
            alignItems: "center",
            marginBottom: 60,
            borderRadius: 30,
        },

        modalFooter: {
            margin: '5%',
        },

        text: {
            margin: '8%',
            fontSize: 20,
            color: 'white'
        },

        separator: {
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: '#8E8E8E',
        },

        headermodal: {
            color: 'white',
            margin: '5%',
            fontSize: 20,
            textAlign: "center"
        },
    })