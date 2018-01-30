import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import { Card, Icon } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Tel from './Tel'
import Email from './Email'
import Separator from './Separator'

export default class SelectedProfile extends Component {
    static navigationOptions = {
        title: 'Selected Profile',
        tabBarLabel: 'Profile',
        headerTintColor: 'black',
        tabBarIcon: ({ tintColor }) => (tintColor == 'white' ?
            <Image source={require('../ScreenImages/activeprofile.png')}
                style={{ width: 22, height: 22 }} />
            :
            <Image source={require('../ScreenImages/inactiveprofile.png')}
                style={{ width: 22, height: 22 }} />
        ),
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
        this.state = { text: 'profile' };
    }

    renderHeader = () => {
      {/* const {
          avatar,
          avatarBackground,
          name,
          address: { city, country },
        } = this.props */}
    
        return (
          <View style={styles.headerContainer}>
             <View style={styles.headerColumn}>
              <Image style={styles.userImage} source={require('../ScreenImages/nelsonparente.png')}/>
            <Text style={styles.userNameText}>Nelson Parente</Text>
                <View style={styles.userAddressRow}>
                  <View>
                    <Icon
                      name="place"
                      underlayColor="transparent"
                      color="white"
                    />
                  </View>
                  <View style={styles.userCityRow}>
                    <Text style={styles.userCityText}>
                      Viana do Castelo, Portugal  {/*{city}, {country}*/}
                    </Text>
                  </View>
              </View>
            </View>
          </View>
        )
      }


      renderEmail = () => {
        return(
          <View
          Style={styles.emailContainer}>
            {/*contentContainerStyle={styles.emailContainer}
            dataSource={this.state.emailDS}
        renderRow={({ email, id, name }, _, k) => {*/}
                <Email
                  key='bbb'
                  index='0'
                  name='email'
                  email='sunga.nelso@ebay.com'
                  onPressEmail={this.onPressEmail}
                />
          </View>
        )
      }

      renderTel = () => {
        return(
          
        <View Style={styles.telContainer}>
          {/*dataSource={this.state.telDS}
          renderRow={({ id, name, number }, _, k) => {*/}
            {/*return (*/}
              <Tel
                key='aaa'
                index='0'
                name='mobile'
                number='969696969'
                onPressSms={this.onPressSms}
                onPressTel={this.onPressTel}
              />
            {/*})
          }*/}
  
          </View>
        )

          
        }

      render() {
        return (
          <ScrollView style={styles.scroll}>
              <Card containerStyle={styles.cardContainer}>
                {this.renderHeader()}
                
              </Card>
              <Card containerStyle={styles.cardContainer}>
              {this.renderTel()}
              </Card>
              {this.Separator}
              <Card containerStyle={styles.cardContainer}>
              {this.renderEmail()}
              </Card>
          </ScrollView>
        )
      }
    
}

const styles = StyleSheet.create({

    cardContainer: {
      backgroundColor: '#2b2b2b',
      borderWidth: 0,
      flex: 1,
      margin: '6%',
      padding: 0,
    },

    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
      },
      headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 35,
      },
      headerContainer: {backgroundColor: '#1a1a1a',
      },
      headerColumn: {
        overflow: 'hidden',
        borderRadius:10,
        backgroundColor: '#1a1a1a',
        marginBottom: '10%',
        ...Platform.select({
          ios: {
            alignItems: 'center',
            elevation: 1,
            marginTop: -1,
          },
          android: {
            alignItems: 'center',
          },
        }),
      },
      placeIcon: {
        color: '#1a1a1a',
        fontSize: 26,
      },
      scroll: {
        flex: 1,
        backgroundColor: '#1a1a1a',
      },
      telContainer: {
        flex: 1,
        paddingTop: 20,
      },

      userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      userCityRow: {
        backgroundColor: 'transparent',
      },
      userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
      },
      userImage: {
        borderColor: '#1a1a1a',
        backgroundColor: '#1a1a1a',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
      },
      userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
      },

      user: {
         borderRadius:50
      }
  })
