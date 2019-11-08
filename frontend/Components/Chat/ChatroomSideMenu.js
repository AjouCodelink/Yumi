import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Input} from 'native-base';

export default class ChatroomSideMenu extends Component {
    render() {
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <Text style={style.font_main}>asdasdasdasdsad</Text>
                </View>
            </View>
        );
    }   
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

module.exports = ChatroomSideMenu;