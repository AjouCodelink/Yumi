import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; 
import { createAppContainer } from 'react-navigation';

import ChatroomTab from './Components/AppTabNavigator/ChatroomTab'
import InvitedTab from './Components/AppTabNavigator/InvitedTab'
import SettingTab from './Components/AppTabNavigator/SettingTab'

const AppTabNavigator = createMaterialTopTabNavigator({
  Chatroom: { screen: ChatroomTab },
  Invited: { screen: InvitedTab },
  Setting: { screen: SettingTab }
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions: {
    style: {
      backgroundColor: '#888',
    }
    ,
    iconStyle: {height:25},
    activeTintColor: '#222',
    inactiveTintColor: '#fff',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,   // 하단바 아이콘으로 보이게 하기
  }
});


const AppTabContainet = createAppContainer(AppTabNavigator);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MainScreen</Text>
      </View>
    );
  }  render() {
    return <AppTabContainet/>; // AppTabContainet 컴포넌트를 리턴한다.
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
