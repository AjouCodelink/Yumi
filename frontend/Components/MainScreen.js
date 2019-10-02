import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation'; 
import { createBottomTabNavigator } from 'react-navigation-tabs'; 

import ChatroomTab from './AppTabNavigator/ChatroomTab'
import InvitedTab from './AppTabNavigator/InvitedTab'
import SettingTab from './AppTabNavigator/SettingTab'

const AppTabNavigator = createBottomTabNavigator({
  ChatroomTab: { screen: ChatroomTab },
  InvitedTab: { screen: InvitedTab },
  SettingTab: { screen: SettingTab }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
  /*static navigationOptions = {
    title: '상단바',
  }*/
  render() {
    return (
      <View style={styles.container}>
        <Text>MainScreen</Text>
      </View>
    );
  }  render() {
    return <AppTabContainet/>; // AppTabContainet 컴포넌트를 리턴한다.
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});