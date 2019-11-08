import React, { Component } from 'react';
import { StyleSheet, Text, View, ToastAndroid, BackHandler } from 'react-native';
import { Icon } from 'native-base';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; 
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';

import ChatManageTab from './AppTabNavigator/ChatManageTab'
import ChatroomTab from './AppTabNavigator/ChatroomTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SettingTab from './AppTabNavigator/SettingTab'
import Chatroom from './Chat/Chatroom';

const chatNavigator = createStackNavigator({
    ChatroomTab: ChatroomTab,
    Chatroom: Chatroom,
});

const ChatContainet = createAppContainer(chatNavigator)

class chatScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-chatboxes' style={{color: tintColor}} />
        ),
    }
    render() {
        return <ChatContainet/>; 
    }
}

const AppTabNavigator = createMaterialTopTabNavigator({
    ProfileTab: ProfileTab,
    ChatroomTab: chatScreen, 
    ChatManageTab: ChatManageTab,
    SettingTab: SettingTab,
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
    style: {
        backgroundColor: '#888',
    },
    iconStyle: {height:25},
    activeTintColor: '#222',
    inactiveTintColor: '#ddd',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,   // 하단바 아이콘으로 보이게 하기
    }
});

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
    constructor (props) {
        super(props);
    }
    static navigationOptions = {    // 상단바 안보이게 하기
        header: null
    }
    render() {
        return <AppTabContainet/>; 
    }
    componentDidMount() {   // 뒤로가기 눌렀을 때
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {    // 해제
        this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {  // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (this.exitApp == undefined || !this.exitApp) {
            ToastAndroid.show('Press once more to exit.', ToastAndroid.SHORT);
            this.exitApp = true;
            this.timeout = setTimeout(
                () => {
                    this.exitApp = false;
                },
                2000                // 2초
            );
        } else {
            clearTimeout(this.timeout);
            BackHandler.exitApp();  // 앱 종료
        }
        return true;
    }
};