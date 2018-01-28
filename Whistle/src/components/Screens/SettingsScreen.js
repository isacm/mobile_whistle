import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { List, Icon } from 'react-native-elements';
import CalendarScreen from './CalendarScreen';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';
import settingsData from './SettingsData';


class SettingsItem extends Component{
  _onPressButton() {
    Alert.alert('atum')
  }
  
    render() {
      return (
        <TouchableHighlight onPress={this._onPressButton} underlayColor="#DCDCDC">
          <View style={styles.itemcontainer}>
            <View style={styles.icomcontainer}> 
              <Icon reverse name={this.props.item.key} type={this.props.item.type} color='#2b2b2b'/>
            </View>
            <View style={styles.namecontainer}> 
              <Text style={styles.items}> {this.props.item.name} </Text>
            </View> 
          </View>
        </TouchableHighlight>
      );
    }
}

export default class SettingsScreen extends Component {
    static navigationOptions = {
      title: 'SETTINGS',
      tabBarLabel: 'Settings',
      headerTintColor: 'black',
      tabBarIcon : ({tintColor}) => ( tintColor == 'white' ?
        <Image source={require('./ScreenImages/settings.png')}
                style={{width: 22, height: 22}}/>
        :
        <Image source={require('./ScreenImages/inactivesettings.png')}
                style={{width: 22, height: 22}}/>
      ),
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
      this.state = {text: 'settings',
                    loading: true};

    } 

  
    render() {
      return (
        <View style={styles.container}>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={settingsData}
              renderItem={({ item, index }) => {
                return (<SettingsItem item={item} index={index}> </SettingsItem>);
              }}
            />
          </List>
        </View>);
  }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a'
    },

    itemcontainer:{
      padding : "3%",
      paddingLeft : "2%",
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1a1a1a'
    },

    iconcontainer:{
      flex: 1,
    },

    namecointainer:{
      flex: 1,
    },

    items: {
        fontSize: 20,
        paddingLeft : "5%",
        justifyContent: 'center',
        textAlign: 'center',
        color : '#DCDCDC'
    }

  })


  