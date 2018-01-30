import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';

export default class NotificationDetail extends Component {
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
        this.state = { text: 'NotificationDetail' };
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
            <Text style={styles.actualtext}> 21/02/2018 </Text>
        </View>)
    }
    renderHour= () => {
        return (
            <View style={{ marginTop: "5%", marginLeft: "5%" }}>
                <Text style={styles.headertext}> HOUR </Text>
                <Text style={styles.actualtext}> 10:30 GAME START </Text>
            </View>)
    }

    renderGame = () => {
        return(
        <View style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Text style={styles.headertext}> GAME </Text>
            <Text style={styles.actualtext}> CNS Série A </Text>
            <Text style={styles.actualtext}> SC VIANENESE - CANELAS FC </Text>
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
            <Card style={styles.assistentContainer}>
                <View style={styles.twobuttoncontainer}>
                        <Text style={styles.assistenttext} > Artur Ladrão Dias </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectedProfile')} underlayColor="#dcdcdc" >
                        <Icon color="#FFCC00" name="chevron-thin-right" size={30} type="entypo" />
                    </TouchableOpacity>
                </View>
            </Card>
        )
    }
    renderMap = () => {
        return (
        <View style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Text style={styles.headertext}> LOCATION </Text>
        </View>
        )

    }
    renderInitialButtons = () => {
        return(
        <Card style={styles.cardContainer}>
            <View style={styles.twobuttoncontainer}>
                <TouchableOpacity underlayColor="#dcdcdc">
                    <Icon color="#FFCC00" name="check" size={40} type="evil-icons" />
                    <Text style={styles.buttontext} > CONFIRM </Text>
                </TouchableOpacity>
                <TouchableOpacity underlayColor="#dcdcdc" >
                    <Icon color="#FFCC00" name="close" size={40} type="evil-icons" />
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
        return (
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
                {/*{this.renderCancelButton()}*/}
            </ScrollView>
        
        )
    }}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#1a1a1a',
           
        },
        buttontext: {
            color : "#FFCC00", 
            fontSize: 20, 
            fontWeight: "bold"
        },
        buttoncancel: {
            color: "#FFCC00",
            fontSize: 15,
            fontWeight: "bold"
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
            fontSize: 25,
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
            fontSize: 18,
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
            marginTop: "5%",
        },
        assistentContainer: {
            backgroundColor: '#2b2b2b',
            borderWidth: 0,
            flex: 1,
            margin: '6%',
            marginTop: "4%",
            padding: 0,
        },
        exampleImage: {
            borderColor: '#1a1a1a',
            backgroundColor: '#1a1a1a',
            justifyContent: 'center',
            borderWidth: 3,
            height: 220,
            width: "80%",
        },
     
    
    })