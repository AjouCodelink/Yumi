import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Item, Label, Input } from 'native-base';

import CustomButton from '../CustomButton';

export default class SignUp_EmailAuth extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state={email: '', clientAuthcode: '', serverAuthcode: 'admin',
        emailHideness: 'flex', authHideness: 'none', nextHideness: 'none', authSuccess: 0, mailSendResult: -1}
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}/>
                <View style={style.title}>
                    <Text style={style.font_title}>E-mail authentication</Text>
                </View>
                <KeyboardAvoidingView behavior='padding' style={[style.content, {display: this.state.emailHideness}]}>
                    <View style={style.input_place}>
                        <View style={style.input}>
                            <Item style={{height: 53, marginBottom: 20}} floatingLabel>
                                <Label style={{color: '#999'}}>Email Address</Label>
                                <Input style={{fontSize: 18, color: '#ddd'}} onChangeText={(email) => this.setState({email})}/>
                            </Item>
                        </View>
                        <View style={style.auth_button}>
                            <CustomButton
                                title={'Send'}
                                titleColor={'#000'}
                                buttonColor={'#ddd'}
                                onPress={() => {this.onPressEmail();}}/>
                        </View>
                    </View>
                    <Text style={style.font_main}>  You must use school e-mail.</Text>
                    <Text style={style.font_main}>    ex) example@ajou.ac.kr{"\n"}{"\n"}</Text>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior='padding' style={[style.content, {display: this.state.authHideness}]}>
                    <Text style={{fontSize: 17, color: '#aaa'}}> Your email address :</Text>
                    <Text style={{fontSize: 20, color: '#ddd'}}>  {this.state.email}{"\n"}</Text>
                    <View style={style.input_place}>
                        <View style={style.input}>
                            <Item style={{height: 53, marginBottom: 20}} floatingLabel>
                                <Label style={{color: '#999'}}>Authentication number</Label>
                                <Input style={{fontSize: 18, color: '#ddd'}} onChangeText={(clientAuthcode) => this.setState({clientAuthcode})}/>
                            </Item>
                        </View>
                        <View style={style.auth_button}>
                            <CustomButton
                                title={'Check'}
                                titleColor={'#000'}
                                buttonColor={'#ddd'}
                                onPress={() => {this.onPressAuth();}}/>
                        </View>
                    </View>
                    <Text style={style.font_main}>  The authentication number is 6 digits.{"\n"}</Text>
                    {/*<Text style={style.font_main}>  현재 서버에 전송된 인증번호: {this.state.serverAuthcode}</Text>*/}
                </KeyboardAvoidingView>
                <View style={[style.content, {display: this.state.nextHideness}]}>
                    <Text style={{fontSize: 17, color: '#aaa'}}> Your email address :</Text>
                    <Text style={{fontSize: 20, color: '#ddd'}}>  {this.state.email}{"\n"}</Text>
                    <Text style={{fontSize: 20, color: '#ddd'}}>   Email authentication completed.{"\n"}   Please press Next.</Text>
                </View>
            <View style={style.footer}>
                <View style={style.footer_backbutton}>
                    <CustomButton
                        title={'Back'}
                        titleColor={'#ddd'}
                        buttonColor={'#000'}
                        onPress={() => this.goTitle()}/>
                </View>
                <View style={style.footer_nextbutton}>
                    <CustomButton
                        title={'Next'}
                        titleColor={'#000'}
                        buttonColor={'#ddd'}
                        onPress={() => this.onPressNext()}/>
                </View>
            </View>
        </View>
        )
    }
    onPressEmail(){
        if(this.state.email == '') {    // 메일주소 입력X
            alert("Please enter your email address.")
        } else if (this.state.email.indexOf('@') == -1 || this.state.email.indexOf('.ac.kr') == -1) {   // 메일주소 유효성검사
            alert("Please enter a valid email address. The email address must include '@' and must end with 'ac.kr'")
        } else {
            this.submit();
            this.setState({
                emailHideness: 'none',
                authHideness: 'flex'
            })
            setTimeout(() => {this.checkMailResult();}, 3500);
        }
    }
    onPressAuth(){
        if(this.state.serverAuthcode == '') {                                  // 인증번호 입력X
            alert("Please enter the authentication number.")
        } else if(this.state.serverAuthcode == this.state.clientAuthcode) {    // 인증 완료
            this.setState({
                authSuccess: 1,
                authHideness: 'none',
                nextHideness: 'flex'
            });
            alert("Your email address is authenticated. Thank you.")
        } else {                                                               // 인증 실패
            alert("Invalid authentication number. Please check again.")
        }
    }
    onPressNext(){
        if(this.state.authSuccess == 1){      // 메일인증 완료
            this.goSignUp_Detail();
        } else {                              // 메일인증 아직 안했음
            alert("Please proceed with email address authentication first.");
        }
    }
    checkMailResult(){
        if (this.state.mailSendResult == 0) {           // 중복된 메일주소
            this.setState({
                emailHideness: 'flex',
                authHideness: 'none'
            })
            alert("Duplicate email address.")
            this.state.mailSendResult = -1
        } else if (this.state.mailSendResult == 1) {    // 전송 성공
            alert("We sent you an email. Please check your email and enter your authentication number.")
        } else {                                        // 서버 내 전송 오류
            this.setState({
                emailHideness: 'flex',
                authHideness: 'none'
            })
            alert("Failed to send email. Please try again.")
        }
    }
    goTitle(){
        this.props.navigation.navigate('Title');
    }
    goSignUp_Detail(){
        this.props.navigation.navigate('SignUp_Detail', {
            email: this.state.email,
        });
    }
    submit(){
        var email= {}
        email.email = this.state.email
        console.log(email);
        var url = 'http://101.101.160.185:3000/signup/send-email';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(email),
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => this.setState({
            serverAuthcode: responseJson.number,
            mailSendResult: responseJson.result     // 실패시-1 중복시0 성공시1
        }));
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '12%',
        paddingBottom: '6%',
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
        width: '85%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    input_place: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width:'70%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    auth_button: {
        width:'30%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '5%'
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
