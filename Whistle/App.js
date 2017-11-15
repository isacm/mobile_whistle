import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert } from 'react-native';

export default class LotsOfStyles extends Component {
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
      		<Text style={styles.yellow}>Whistle</Text>

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

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  yellow: {
  	textAlign: 'center',
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 40,
    padding: 100
  },

  textInputSection: {
  	width: '70%',
  	alignItems: 'center',
  	textAlign: 'center',
  	padding: 15,
  	alignSelf: 'center'
  },

  loginButtonSection: {
      width: '100%',
      height: '20%',
      justifyContent: 'center',
      alignItems: 'center'
  },

  button: {
    marginBottom: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },

  buttonText: {
    padding: 20,
    fontSize: 20,
    color: 'white'
  }

})


// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => LotsOfStyles);