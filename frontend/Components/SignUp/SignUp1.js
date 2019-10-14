import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import CustomButton from '../CustomButton';

export default class signup1 extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}></View>
                <View style={style.content}>
                    <Text style={style.font_title}>Signup1</Text>
                    <Text style={style.font_main}>Performs email authentication.</Text>
                </View>
                <View style={style.footer}>
                <CustomButton
                    buttonColor={'#ddd'}
                    titleColor={'#000'}
                    title={'Sign up'}
                    onPress={() => this.goSignUp2()}/>
                </View>
            </View>
        )
    }
    goSignUp2(){
        this.props.navigation.navigate('SignUp2');
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
    header: {
        width:'100%',
        height:'9%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width:'100%',
        height:'18%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        width:'100%',
        height:'20%',
    },
});