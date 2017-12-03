import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert } from 'react-native';

export default class LoginForm extends Component {
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
            <View>
                <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </View>
                </TouchableHighlight>

                <Text style={styles.password}> Forgot your password? </Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
       marginTop: '30%'
    },

    textInputSection: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        textAlign: 'center',
        opacity: 0.8,
        alignSelf: 'center'
    },
  
    loginButtonSection: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
  
    button: {
      marginTop: '20%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#34495e',
      paddingHorizontal: 100
    },
  
    buttonText: {
      padding: 20,
      fontSize: 20,
      color: 'white'
    },

    password: {
        textAlign: 'center',
        marginTop: '15%',
        opacity: 0.8
    }

})