import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; 
import { createAppContainer } from 'react-navigation';

import ChatroomTab from './AppTabNavigator/ChatroomTab'
import InvitedTab from './AppTabNavigator/InvitedTab'
import SettingTab from './AppTabNavigator/SettingTab'

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

export default class MainScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return <AppTabContainet/>; // AppTabContainet 컴포넌트를 리턴한다.
    }
};