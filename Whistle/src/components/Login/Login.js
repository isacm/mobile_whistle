import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, KeyboardAvoidingView,TextInput, Button, TouchableHighlight, Alert, TouchableOpacity  } from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';
import Menu from '../Screens/Menu';
import SettingsScreen from '../Screens/SettingsScreen';

export default class Login extends Component {
  static navigationOptions = {
    title: '',
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
    this.state = {text: ''};
  } 
  _onPressButton() {
    Alert.alert('Wrong Username or Password')
  }

  render() {
    const { navigate } = this.props.navigation;
    return ( 
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <Image style={styles.logo} source={require('../../images/blacktext.png')}/>
            
            <View style={styles.formContainer}>
              <View>
                <TextInput underlineColorAndroid='transparent'
                style={styles.textInputSection}
                placeholder="USERNAME"
                returnKeyType="next"
                onChangeText={(text) => this.setState({text})}
                />

                <TextInput underlineColorAndroid='transparent'
                    style={styles.textInputSection}
                    secureTextEntry={true}
                    placeholder="PASSWORD"
                    returnKeyType="done"
                    onChangeText={(text) => this.setState({text})}
                />
                </View>

                <View style={styles.buttonView}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Menu')} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.password}> Forgot your password? </Text>
                </View>
            </View>
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
    flex:1,
    marginTop: '20%',
    aspectRatio:1.8,
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
      marginTop:'10%',
      alignItems:'center'
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
  }
})

const navigator = StackNavigator ({
  Home: {screen: Login},
  Menu: {screen: Menu},
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('Whistle', () => navigator);