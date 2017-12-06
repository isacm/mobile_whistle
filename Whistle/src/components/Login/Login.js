import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  _onPressButton() {
    Alert.alert('Wrong password!')
  }

  render() {
    return ( 
      <View style={styles.container}>

            <Image style={styles.logo} source={require('../../images/whitetext.png')}/>
{/*  
      		<TextInput
      			style={styles.textInputSection}
          		placeholder="Username"
          		onChangeText={(text) => this.setState({text})}
        	/>

          	<TextInput 
          		style={styles.textInputSection}
          		placeholder="Password"
          		onChangeText={(text) => this.setState({text})}
        	/>

        	<TouchableHighlight onPress={this._onPressButton} underlayColor="white">
            	<View style={styles.button}>
            		<Text style={styles.buttonText}>Login</Text>
          		</View>
          	</TouchableHighlight>
*/}
            <View>
                <LoginForm/>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2980b9'
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
    aspectRatio:1.2,
    resizeMode: 'contain',
    width:100,
    height:100

  }
})


// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Login);