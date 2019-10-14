import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import CustomButton from '../CustomButton';

export default class signup2 extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={style.container}>
                <Text style={style.font_title}>Signup2</Text>
                <Text style={style.font_main}>Enter information such as profile pictures, nicknames, passwords, interests, and more.</Text>
            </View>
        )
    }
    goMain(){
        this.props.navigation.navigate('Main');
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