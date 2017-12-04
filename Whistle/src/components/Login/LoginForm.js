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
            <View style={styles.buttonView}>
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
       marginTop: '10%'
    },

    textInputSection: {
        width: '100%',
        padding: '5%',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center'
    },
  
    buttonView: {
        marginTop:'20%'
    },
  
    button: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#34495e',
      paddingHorizontal: 100,
      
    },
  
    buttonText: {
      padding: 20,
      fontSize: 20,
      color: 'white'
    },

    password: {
        textAlign: 'center',
        marginTop: '10%',
        opacity: 0.8
    }

})