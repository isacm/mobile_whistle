import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import { StackNavigator,} from 'react-navigation';

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
            placeholder="USERNAME"
            onChangeText={(text) => this.setState({text})}
            />

            <TextInput 
                style={styles.textInputSection}
                secureTextEntry={true}
                placeholder="PASSWORD"
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
       marginTop: '15%'
    },

    textInputSection: {
        width: '100%',
        marginTop: '5%',
        padding: '5%',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25
    },
  
    buttonView: {
        marginTop:'10%'
    },
  
    button: {
      width: '100%',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 100
      
    },
  
    buttonText: {
      padding: 10,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2980b9',
      opacity: 0.8
    },

    password: {
        textAlign: 'center',
        marginTop: '20%',
        opacity: 0.8
    }

})