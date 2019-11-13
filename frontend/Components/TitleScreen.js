import React, { Component } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Item, Label, Input } from 'native-base';

import CustomButton from './CustomButton';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

export default class TitleScreen extends Component {
    static navigationOptions = {    // 상단바 안보이게 하기
        header: null
    }
    constructor(props){
        super(props);
        this.state={email: '', password: '', loginResult: -1, token:''}
    }

    componentDidMount() {  // table이 없으면 create
        db.transaction(tx => {
            tx.executeSql(  //chatlog 저장하는 table 생성하기
                'CREATE TABLE if not exists token (access_token TEXT NOT NULL, PRIMARY KEY("access_token"))',
                [],
                null,
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))

        db.transaction( tx => {
            tx.executeSql(
                'SELECT * FROM token',
                [],
                (_, { rows: { _array }  }) => {    // TODO : 이 과정이 1초정도 걸리기 때문에 토큰이 있는 경우 타이틀 화면 갔다가 메인 페이지로 넘어가짐. 중간에 새로운 화면을 만들던지 해야할 듯.
                    if(_array.length) this.goMain();  // db에 토큰이 있는지 검사
                },
                (_,error) => console.error(error)
            );
        },(error) => console.error(error))
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


    dbSaveToken(token){
        db.transaction( tx => {
            tx.executeSql(
                'INSERT INTO token (access_token) values (?);',
                [token],
                null,
                (_,error) => console.error(error)   // sql문 실패 에러
            );
        },(error) => console.error(error))   // 트랜젝션 에러
    }
    onPressLogin(){
        if (this.state.email == ''){
            alert('Please enter your email.');
        }
        else if (this.state.password == ''){
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
            this.dbSaveToken(this.state.token);
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
        var url = 'http://101.101.160.185:3000/user/login';
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
            loginResult: responseJson.result,       // 실패시0 성공시1 
            token: responseJson.token
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
