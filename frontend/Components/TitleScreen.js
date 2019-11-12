import React, { Component } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Item, Label, Input } from 'native-base';

import CustomButton from './CustomButton';

export default class TitleScreen extends Component {
    static navigationOptions = {    // 상단바 안보이게 하기
        header: null
    }
    constructor(props){
        super(props);
        this.state={email: '', password: '', loginResult: -1}
    }
    render() {
        return (
            <View style={style.container}>
                <Image
                    style={{height:'50%', width:'50%', resizeMode:'contain'}}
                    source={require('../assets/Titleimage.png')}/>
                <KeyboardAvoidingView behavior='padding' style={style.content}>
                    <Item style={{height: 53}} floatingLabel>
                        <Label style={{color: '#999'}}>Email Address</Label>
                        <Input style={{fontSize: 18, color: '#ddd', paddingLeft: 5}} onChangeText={(email) => this.setState({email})}/>
                    </Item>
                    <Item style={{height: 53, marginTop: 10}} floatingLabel>
                        <Label style={{color: '#999'}}>Password</Label>
                        <Input style={{fontSize: 18, color: '#ddd', paddingLeft: 5}} onChangeText={(password) => this.setState({password})}/>
                    </Item>
                </KeyboardAvoidingView>
                <View style={style.footer}>
                    <View style={style.footer_backbutton}>
                        <CustomButton
                            title={'Sign up'}
                            titleColor={'#ddd'}
                            buttonColor={'#000'}
                            onPress={() => this.goSignup_Welcome()}/>
                        <CustomButton
                            title={'chatroom'}
                            titleColor={'#ddd'}
                            buttonColor={'#000'}
                            onPress={() => this.goChatroom()}/>
                    </View>
                    <View style={style.footer_nextbutton}>
                    <CustomButton
                            title={'Log In'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={ () => this.onPressLogin()}/>
                    <CustomButton
                            title={'go main'}
                            titleColor={'#000'}
                            buttonColor={'#393'}
                            onPress={ () => this.goMain()}/>
                    </View>
                </View>
            </View>
        );
    }
    onPressLogin(){
        if (this.state.email == ''){
            alert('Please enter your email.');
        } else if (this.state.email.indexOf('@') == -1 || this.state.email.indexOf('.ac.kr') == -1) {
            alert("Please enter a valid email address. The email address must include '@' and must end with 'ac.kr'")
        } else if (this.state.password == ''){
            alert('Please enter your password.');
        } else {
            this.submit();
            setTimeout(() => {this.checkLoginResult();}, 250);
        }
    }
    checkLoginResult(){
        if (this.state.loginResult == 0) {           // 잘못된 사용자 정보
            alert("Email or password is incorrect.")
            this.state.loginResult = -1
        } else if (this.state.loginResult == 1) {    // 로그인 성공
            this.goMain();
        } else {                                     // 서버 전송 오류
            alert("Failed to login. Please try again.")
        }
    }
    goChatroom(){
        this.props.navigation.navigate('Chatroom');
    }
    goSignup_Welcome(){
        this.props.navigation.navigate('SignUp_Welcome');
    }
    goMain(){
        this.props.navigation.navigate('Main');
    }
    submit(){
        var user= {}
        user.email = this.state.email
        user.password = this.state.password
        console.log(user);
        var url = 'http://101.101.160.185:3000/login/auth';
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
            loginResult: responseJson.result     // 실패시0 성공시1 
        }));
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '30%',
        paddingBottom: '10%',
        backgroundColor: '#444',
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
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        width: '78%',
        height: '9%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444'
    },
    footer_backbutton: {
        width:'43%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: '13%',
    },
    footer_nextbutton: {
        width:'43%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '13%',
    },
    });
