import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, ListView, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { List, Icon } from 'react-native-elements';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';

export default class Help extends Component {
  static navigationOptions = {
    title: 'Help',
    headerTintColor: '#1a1a1a',
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Frequent questions', 'Terms and policy of privacy', 'Support and Services']),
    };
  } 

  render() {
    return (
      <ListView style={styles.container}
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <TouchableOpacity underlayColor="#DCDCDC"><Text style={styles.text}>{rowData}</Text></TouchableOpacity>}
      renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
    />
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a'
    },

    text:{
      margin: '8%',
      fontSize: 20,
      color: 'white'
    },

    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
    },
})