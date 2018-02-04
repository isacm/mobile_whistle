import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { List, Icon } from 'react-native-elements';
import CalendarScreen from './CalendarScreen';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';
import settingsData from './SettingsData';


class SettingsItem extends Component{ 
  
    render() {
      
      return (
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Account')} underlayColor="#DCDCDC">
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
      title: 'Settings',
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
                    loading: true,};

    } 

    _logoutButton() {
      Alert.alert(
        'Logout',
        'Do you want to logout?',
        [
          {text: 'Logout', onPress: () =>  this.reset()},
          {text: 'Cancel', style: 'cancel'},
        ],
        { cancelable: false }
      )
    }

    reset(){
      return this.props
                 .navigation
                 .dispatch(NavigationActions.reset(
                   {
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Home'})
                      ]
                    }));
    }

  
    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScrollView style={styles.container}>
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={settingsData}
                renderItem={({ item, index }) => {
                  if(item.name=='Logout'){
                    return (<TouchableHighlight onPress={() => this._logoutButton()} underlayColor="#DCDCDC">
                      <View style={styles.itemcontainer}>
                        <View style={styles.icomcontainer}> 
                          <Icon reverse name={item.key} type={item.type} color='#2b2b2b'/>
                        </View>
                        <View style={styles.namecontainer}> 
                          <Text style={styles.items}> {item.name} </Text>
                        </View> 
                      </View>
                    </TouchableHighlight>);
                  }
                  else{
                    return (<TouchableHighlight onPress={() => this.props.navigation.navigate(item.name)} underlayColor="#DCDCDC">
                    <View style={styles.itemcontainer}>
                      <View style={styles.icomcontainer}> 
                        <Icon reverse name={item.key} type={item.type} color='#2b2b2b'/>
                      </View>
                      <View style={styles.namecontainer}> 
                        <Text style={styles.items}> {item.name} </Text>
                      </View> 
                    </View>
                  </TouchableHighlight>);
                  }
                }}
              />
            </List>
          </ScrollView>);
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

  