import React, { Component } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Item, Label, Input, Spinner } from 'native-base';
import * as SQLite from 'expo-sqlite';

import CustomButton from './CustomButton';

const db = SQLite.openDatabase('db.db');

export default class TitleScreen extends Component {
    static navigationOptions = {    // 상단바 안보이게 하기
        header: null
    }
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            loginResult: -1,
            token:'',
            spinnerOpacity: 0,
        }
    }
    componentWillMount() {
        this.setState({
            email: '',
            password: '',
            loginResult: -1,
            token:''})
    }
    dbSaveToken(token){
        db.transaction( tx => {
            tx.executeSql(
                'INSERT INTO token (access_token, user_email) values (?,?);',
                [token, this.state.email],
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
            this.setState({spinnerOpacity: 1})
            this.submit();
            setTimeout(() => {this.checkLoginResult();}, 500);
        }
    }
    checkLoginResult(){
        this.setState({spinnerOpacity: 0})
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
    goSignup_Welcome(){
        this.props.navigation.navigate('SignUp_Welcome');
    }
    goMain(){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
        });
        this.props.navigation.dispatch(resetAction);
    }
    submit(){
        var user= {}
        user.email = this.state.email
        user.password = this.state.password
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
    
    render() {
        return (
            <View style={style.container}>
                <Image
                    style={{height: '65%', width:'80%', resizeMode:'contain'}}
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
                    </View>
                    <View style={style.footer_nextbutton}>
                    <CustomButton
                            title={'Log In'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={ () => this.onPressLogin()}/>
                    </View>
                </View>
                <Spinner size={80} style={{opacity: this.state.spinnerOpacity, flex: 3, position: "absolute", bottom: '50%'}}color='#ddd'/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: '12%',
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
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    footer: {
        width: '78%',
        height: '8%',
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
