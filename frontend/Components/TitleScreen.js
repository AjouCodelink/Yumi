import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Item, Label, Input, Button, Spinner } from 'native-base';

import * as SQLite from 'expo-sqlite';
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
            spinnerOpacity: 0,
        }
    }
    componentWillMount() {
        this.setState({
            email: '',
            password: '',
            loginResult: -1,
        })
    }
    dbSaveUserData(responseJson){
        if (this.state.loginResult != 1) {return}
        token = responseJson.token
        userInfo = responseJson.userInfo
        crList = responseJson.userInfo.chatroom
        crUserList = responseJson.save_chatroom
        console.log(crUserList)
        db.transaction( tx => {
            tx.executeSql(          // token 저장
                'INSERT INTO token (access_token, user_email) values (?,?);',
                [token, this.state.email],
                null,
                (_,error) => console.error(error)
            ),
            tx.executeSql(          // 유저정보 저장
                'INSERT INTO userInfo (email, nickname, address, language, thumbnailURL) values (?,?,?,?,?);',
                [this.state.email, userInfo.nickname, userInfo.address, userInfo.language, userInfo.img_path],
                null,
                (_,error) => console.error(error)
            )
        }),(error) => console.error(error);   // 트랜젝션 에러
        for(var i=0; i<crList.length; i++){
            const cr = crList[i]
            let memNum 
            for (var j=0; j<crUserList.length; j++){
                if (crUserList[j] == null) continue;
                if (crUserList[j]._id == cr.cr_id) {
                    memNum = crUserList[j].participants.length
                    break;
                }
            }
            db.transaction( tx => {
                tx.executeSql(          // 채팅방목록 저장
                    'INSERT INTO crList (cr_id, cr_name, section, _group, memNum, favorite) values (?,?,?,?,?,0);',
                    [cr.cr_id, cr.name, cr.interest.section, cr.interest.group, memNum],
                    null,
                    (_,error) => console.error(error)
                );
            },(error) => console.error(error))   // 트랜젝션 에러
        }
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
            setTimeout(() => {this.checkLoginResult();}, 300);
        }
    }
    checkLoginResult(){
        this.setState({spinnerOpacity: 0})
        if (this.state.loginResult == 0) {           // 잘못된 사용자 정보
            alert("Email or password is incorrect.")
            this.state.loginResult = -1
        } else if (this.state.loginResult == 1) {    // 로그인 성공
            this.goMain();
        } else {                                     // 서버 전송 오류
            alert("Failed to login. Please try again.")
        }
    }
    goSignup(){
        this.props.navigation.navigate('SignUp');
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
        .then(responseJson => {
            this.setState({loginResult: responseJson.result}),
            this.dbSaveUserData(responseJson)
        });
    }
    
    render() {
        return (
            <View style={style.container}>
                <Image
                    style={{ height: '60%', width: '70%', resizeMode:'contain'}}
                    source={require('../assets/Titleimage.png')}/>
                <KeyboardAvoidingView behavior='padding' style={style.content}>
                    <Item style={{height: 53, borderColor:'#222'}} floatingLabel>
                        <Label style={{color: '#555'}}>Email Address</Label>
                        <Input style={{fontSize: 18, color: '#000', paddingLeft: 5}} onChangeText={(email) => this.setState({email})}/>
                    </Item>
                    <Item style={{height: 53, borderColor:'#222', marginTop: 20}} floatingLabel>
                        <Label style={{color: '#555'}}>Password</Label>
                        <Input secureTextEntry={true} style={{fontSize: 18, color: '#000', paddingLeft: 5}} onSubmitEditing={() => {this.onPressLogin();}} onChangeText={(password) => this.setState({password})}/>
                    </Item>
                </KeyboardAvoidingView>
                <View style={style.footer}>
                    <Button style={[style.button, {backgroundColor: '#bbb'}]} onPress={() => this.goSignup()}>
                        <Text style={style.text_button}>Sign Up</Text>
                    </Button>
                    <Button style={[style.button, {backgroundColor: '#36ee36'}]} onPress={() => this.onPressLogin()}>
                        <Text style={style.text_button}>Log In</Text>
                    </Button>
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
        backgroundColor: '#fff',
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
    },
    button: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        marginLeft: '13%',
        marginRight: '13%',
        borderRadius: 20,
    },
    text_button: {
        padding: 10,
        fontSize: 18,
    },
    });
