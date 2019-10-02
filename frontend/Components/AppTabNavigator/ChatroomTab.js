import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ChatroomTab extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text>ChatroomTab</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#484848',
        alignItems: 'center',
        justifyContent: 'center',
    }
});