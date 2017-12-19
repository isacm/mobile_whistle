import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, TouchableOpacity } from 'react-native';
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
    );
  }
}

const styles = StyleSheet.create({
    container: {
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
        marginTop:'15%',
        alignItems:'center'
    },
  
    button: {
      borderRadius: 10,
      padding: '2%',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: '30%'
      
    },
  
    buttonText: {
      textAlign: 'center',
      padding: 10,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2980b9',
      opacity: 0.8
    },

    password: {
        textAlign: 'center',
        marginTop: '10%',
        opacity: 0.8
    }

})