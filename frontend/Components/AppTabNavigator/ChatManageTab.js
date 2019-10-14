import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export default class ChatManageTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-add-circle' style={{color: tintColor}} />
        )
    }
    render() {
        return (
            <View style={style.container}>
                <Text style={style.font_title}>ChatManageTab</Text>
                <Text style={style.font_main}>You can create, search, and receive</Text>
                <Text style={style.font_main}>recommendations for chat rooms.</Text>
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
    font_title: {
        color: 'white',
        fontSize: 30,
        alignItems: 'center',
    },
    font_main: {
        color: '#aaa',
        fontSize: 15,
        alignItems: 'center',
    },
});