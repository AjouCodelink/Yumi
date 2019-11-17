import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Spinner } from 'native-base';
import CustomButton from '../CustomButton';

import Games from './Interest/Games';
import Sports from './Interest/Sports';
import Foods from './Interest/Foods';

export default class SignUp_Interest extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            nickname: '',
            interests: [],
            signUpResult: -1,
            spinnerOpacity: 0,
        }
    }
    goSignUp_Detail(){
        this.props.navigation.navigate('SignUp_Detail');
    }
    goSignUp_Done(){
        this.props.navigation.navigate('SignUp_Done', {
            email: this.state.email,
            password: this.state.password,
        });
    }
    pressDone(){
        this.submit();
        this.setState({spinnerOpacity: 1})
        setTimeout(() => {this.checkSignUpResult(), this.setState({spinnerOpacity: 0})}, 3000);
    }
    checkSignUpResult(){
        if (this.state.signUpResult == 1) {    // 회원가입 성공
            this.goSignUp_Done();
        } else {                                      // 서버 전송 오류
            alert("Failed to Sign up. Please try again.")
        }
    }
    interAdd = (newSection, newGroup, newKey) => {
        const pervInterests = this.state.interests;
        this.setState({
            interests: pervInterests.concat({section : newSection, group: newGroup, key: newKey})
        });
    }
    interRemove = (remKey) => {
        const pervInterests = this.state.interests;
        this.setState({
            interests: pervInterests.filter(inter => inter.key !== remKey)
        });
    }
    submit(){
        var user = {}
        user.email = this.state.email
        user.password = this.state.password
        user.nickname = this.state.nickname
        user.interests = this.state.interests
        var url = 'http://101.101.160.185:3000/user/signup';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => this.setState({
            signUpResult: responseJson.result     // 실패시0 성공시1 
        }));
    }
    render() {
        const {navigation} = this.props;
        this.state.email = navigation.getParam('email', 'No Email');
        this.state.password = navigation.getParam('password', 'No Password');
        this.state.nickname = navigation.getParam('nickname', 'No Nickname');
        return (
            <View style={style.container}>
                <View style={style.header}/>
                <View style={style.title}>
                    <Text style={style.font_title}>Enter Interest</Text>
                </View>
                <View style={style.content}>
                    <ScrollView> 
                        <Foods interAdd={this.interAdd} interRemove={this.interRemove}/>
                        <Games interAdd={this.interAdd} interRemove={this.interRemove}/>
                        <Sports interAdd={this.interAdd} interRemove={this.interRemove}/>
                    </ScrollView>
                </View>
                <View style={style.footer}>
                    <View style={style.footer_backbutton}>
                        <CustomButton
                            title={'Back'}
                            titleColor={'#ddd'}
                            buttonColor={'#000'}
                            onPress={() => this.goSignUp_Detail()}/>
                    </View>
                    <View style={style.footer_nextbutton}>
                        <CustomButton
                            title={'Next'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={() => this.pressDone()}/>
                    </View>
                </View>
                <Spinner size={80} style={{opacity: this.state.spinnerOpacity, flex: 3, position: "absolute", bottom: '50%'}}color='#ddd'/>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '12%',
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
        width: '75%',
        paddingBottom: '3%',
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
        fontSize: 14,
    },
});
