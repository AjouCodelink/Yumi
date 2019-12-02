import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
import CustomButton from '../CustomButton';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

export default class Done extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    goTitle(){
        RootNavigator('Title')
    }
    render() {
        const {navigation} = this.props;
        this.state.email = navigation.getParam('email', 'No Email');
        this.state.password = navigation.getParam('password', 'No Password');
        return (
            <View style={style.container}>
                <View style={style.title}>
                    <Text style={style.font_title}>Thank you!</Text>
                </View>
                <View style={style.content}>
                    <View style={[style.content, {justifyContent: 'space-around'}]}>
                        <Text style={style.font_main}>All sign up procedures are complete!</Text>
                        <Text style={style.font_main}>Your chosen interest is used only to{"\n"}recommend a suitable chat room for you.</Text>
                    </View>
                    <Text style={style.font_main}>Press the 'Done' button go to main screen.</Text>
                </View>
                <View style={style.footer}>
                    <View style={style.footer_backbutton}>
                    </View>
                    <View style={style.footer_nextbutton}>
                        <CustomButton
                            title={'Done'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={() => this.goTitle()}/>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '18%',
        paddingBottom: '5%',
        backgroundColor: '#333',
    },
    header: {
        width:'100%',
        height:'5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width:'100%',
        height:'15%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    footer: {
        width:'100%',
        height:'8%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer_backbutton: {
        width:'40%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: '15%',
    },
    footer_nextbutton: {
        width:'40%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '15%',
    },
    font_title: {
        color: 'white',
        fontSize: 40,
    },
    font_main: {
        color: '#aaa',
        fontSize: 20,
        textAlign: 'center',
    },
});
