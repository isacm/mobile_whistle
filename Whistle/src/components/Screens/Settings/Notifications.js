import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import { StyleSheet, ListView, Modal, Button, Text, View, TextInput, TouchableHighlight, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { List, Icon } from 'react-native-elements';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


export default class Notifications extends Component {
  static navigationOptions = {
    title: 'Notifications',
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
      modalVisible: false ,       
      dataSource: ds.cloneWithRows(['Notifications pop-up', 'Notifications with sound', 'Vibration']),
    };
  } 

  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _pressAcceptReason(){
    this.setModalVisible(false);
  }

  render(){
    var radio_props = [
        {label: 'De-activate                  ', value: 0 },
        {label: 'Just when screen On', value: 1 },
        {label: 'Just when screen Off', value: 2 },
        {label: 'Always On                    ', value: 3 }
      ];
    return (
        <View style={styles.container}>
            <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <View style={styles.modalContainer}>
            <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                    <Text style={styles.notification}>Notifications</Text>
                </View>
                <View style={styles.modalBody}>
                    <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    buttonColor={'#FFCC00'}
                    selectedButtonColor={'#FFCC00'}
                    labelStyle={{fontSize: 20, color: 'white'}}
                    buttonSize={10}
                    buttonOuterSize={30}
                    isSelected={this.state.is_active_index === 2}
                    onPress={(value) => {this.setState({value:value}); this.setModalVisible(!this.state.modalVisible)}}
                    />
                </View>
                <View style={styles.modalFooter}>
                    <TouchableHighlight style={styles.modalButtons} onPress={() => {this.setModalVisible(!this.state.modalVisible)}} underlayColor="#2b2b2b">
                    <Text style={styles.cancel}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
            </View>
            </Modal>
            <ListView style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => 
                <TouchableOpacity onPress={() => this.setModalVisible(true)} underlayColor="#DCDCDC">
                    <Text style={styles.text}>{rowData}</Text>
                </TouchableOpacity>
            }
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a'
    },

    modalContainer: {
        backgroundColor: '#2b2b2b',
        marginTop: '50%',
        margin: 15, 
        
    },

    modalView: {
    },

    modalBody:{
        margin: '5%',
        flexDirection: 'column',
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 30,
    },

    modalFooter: {
        margin: '5%',
    },

    cancel: {
        textAlign: 'right',
        fontSize: 20,
        color: '#545454'
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

    notification: {
        color: 'white',
        margin: '5%',
        fontSize: 25
    }
})