import React, { Component } from 'react';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';

import ChatroomTab from '../Chat/ChatroomTab';
import Chatroom from '../Chat/Chatroom';

const chatNavigator = createStackNavigator({
    ChatroomTab: ChatroomTab,
    Chatroom: Chatroom,
    }, {
    initialRouteName: 'ChatroomTab'
    }
);

const ChatContainet = createAppContainer(chatNavigator)

export default class ChatScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-chatboxes' style={{color: tintColor}} />
        ),
    }
    render() {
        return <ChatContainet/>; 
    }
}