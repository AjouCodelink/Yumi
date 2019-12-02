import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class notice extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <Text style={style.text_message}> - {data.message} - </Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    content: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#777',
        padding: 3,
        margin: 5,
    },
    text_message: {
        color: '#555',
        fontSize: 14,
    },
})