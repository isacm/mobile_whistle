import React, { Component } from 'react';
import { AppRegistry, StyleSheet, AppState, Text, View, Image, KeyboardAvoidingView, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { List, Icon } from 'react-native-elements';
import Menu from '../Screens/Menu';
import Account from '../Screens/Settings/Account';
import Notifications from '../Screens/Settings/Notifications';
import About from '../Screens/Settings/About';
import Contacts from '../Screens/Settings/Contacts';
import Help from '../Screens/Settings/Help';
import NotificationDetail from '../Screens/NotificationDetail';
import SelectedProfile from '../Screens/Profile/SelectedProfile';
import PushController from '../PushController'
import SettingsScreen from '../Screens/SettingsScreen';
import api from '../Screens/api';
import PushNotification from 'react-native-push-notification';

export default class Login extends Component {
  static navigationOptions = {
    title: '',
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
      text: '', seconds: 5,
      usernameinput: '', pass: ''
    };
  }
  _onPressButton() {
    api.getReferee().then((resref) => {
      this.setState({
        referees: resref,
        user: resref[6].id,
        pass: resref[6].password
      })
      if (this.state.usernameinput == this.state.user) {
        this.props.navigation.navigate('Menu');
      }
      else {
        this.refs.PasswordInput.setNativeProps({ text: '' })
        Alert.alert(
          'Invalid credentials',
          'Try again',
          [
            { text: 'OK', onPress: () => console.log('OK pressed'), style: 'cancel' }
          ],
          { cancelable: false });
      }
    })
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

  }

  componentWillMount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (AppState === 'background') {
      PushNotification.localNotificationSchedule({
        message: "My Notification Message", // (required)
        date: new Date(Date.now() + (this.state.seconds * 1000)) // in 60 secs
      });
    }
    {/*if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
  this.setState({appState: nextAppState});*/}
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <Image style={styles.logo} source={require('../../images/blacktext.png')} />

        <View style={styles.formContainer}>
          <View>
            <TextInput underlineColorAndroid='transparent'
              ref="UsernameInput"
              autoCorrect={false}
              style={styles.textInputSection}
              placeholder="USERNAME"
              returnKeyType="next"
              onChangeText={(usernameinput) => this.setState({ usernameinput })}
              value={this.state.usernameinput}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={(event) => { this.refs.PasswordInput.focus(); }}
            />

            <TextInput underlineColorAndroid='transparent'
              ref = "PasswordInput"
              autoCorrect={false}
              style={styles.textInputSection}
              secureTextEntry={true}
              placeholder="PASSWORD"
              returnKeyType="done"
              onChangeText={(text) => this.setState({ text })}
              value={this.state.passwordinput}
            />
          </View>

          <View style={styles.buttonView}>
            <TouchableHighlight onPress={() => this._onPressButton()} underlayColor="#FFCC00">
              <View style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </View>
            </TouchableHighlight>
            <TouchableOpacity underlayColor="#FFCC00">
              <Text style={styles.inc}> Forgot your password? </Text>
            </TouchableOpacity>
          </View>
        </View>
        <PushController />
      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFCC00'
  },

  title: {
    textAlign: 'center',
    color: '#2c3e50',
    fontWeight: 'bold',
    fontSize: 40,
    padding: '20%'
  },

  logo: {
    flex: 1,
    marginTop: '20%',
    aspectRatio: 1.8,
    resizeMode: 'cover'
  },

  formContainer: {
    marginTop: '10%'
  },

  textInputSection: {
    width: '100%',
    marginTop: '5%',
    padding: '5%',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10
  },

  buttonView: {
    marginTop: '10%',
    alignItems: 'center',
    marginBottom: '10%'
  },

  button: {
    borderRadius: 10,
    padding: '2%',
    justifyContent: 'center',
    backgroundColor: '#1a1a00',
    paddingHorizontal: '30%'
  },

  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFCC00',
    opacity: 0.8
  },

  password: {
    textAlign: 'center',
    marginTop: '10%',
    opacity: 0.8
  },
  inc: {
    marginTop: '10%',
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
  }

})

const navigator = StackNavigator({
  Home: { screen: Login },
  Menu: { screen: Menu },
  Account: { screen: Account },
  Help: { screen: Help },
  Contacts: { screen: Contacts },
  Notifications: { screen: Notifications },
  About: { screen: About },
  NotificationDetail: { screen: NotificationDetail },
  SelectedProfile: { screen: SelectedProfile }
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('Whistle', () => navigator);