import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Item, Label, Input } from 'native-base';

import CustomButton from '../CustomButton';

export default class SignUp_Detail extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            password_check: '',
            nickname: '',
            passwordChecked: 0, nicknameChecked: 0,
        }
    }
    render() {
        const {navigation} = this.props;
        this.state.email = navigation.getParam('email', 'No Email');
        return (
            <View style={style.container}>
                <View style={style.header}/>
                <View style={style.title}>
                    <Text style={style.font_title}>Enter Details</Text>
                </View>
                <KeyboardAvoidingView behavior='padding' style={style.content}>
                    <Text style={{fontSize:18, color:'#999', textAlign:'left'}}>Your Email:</Text>
                    <Text style={{fontSize:20, color:'white', textAlign:'left'}}> {this.state.email}{"\n"}</Text>
                    <Item style={{height: 53}} floatingLabel>
                        <Label style={{color: '#999'}}>Password</Label>
                        <Input style={{fontSize: 18, color: '#ddd'}} onChangeText={(password) => this.setState({password})}/>
                    </Item>
                    <Text style={style.font_main}>  Password must be between 8 and 16 characters.{"\n"}</Text>
                    <Item style={{height: 53}} floatingLabel>
                        <Label style={{color: '#999'}}>Confirm Password</Label>
                        <Input style={{fontSize: 18, color: '#ddd'}} onChangeText={(password_check) => this.setState({password_check})}/>
                    </Item>
                    <Text style={style.font_main}>  Please enter same as your password.{"\n"}</Text>
                    <Item style={{height: 53}} floatingLabel>
                        <Label style={{color: '#999'}}>Nickname</Label>
                        <Input style={{fontSize: 18, color: '#ddd'}} onChangeText={(nickname) => this.setState({nickname})}/>
                    </Item>
                    <Text style={style.font_main}>  The nickname must be between 2 and 20 characters.{"\n"}</Text>
                </KeyboardAvoidingView>
                <View style={style.footer}>
                    <View style={style.footer_backbutton}>
                        <CustomButton
                            title={'Title'}
                            titleColor={'#ddd'}
                            buttonColor={'#000'}
                            onPress={() => this.goTitle()}/>
                    </View>
                    <View style={style.footer_nextbutton}>
                        <CustomButton
                            title={'Next'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={() => this.pressNext()}/>
                    </View>
                </View>
            </View>
        )
    }
    goTitle(){
        this.props.navigation.navigate('Title');
    }
    goSignUp_Interest(){
        this.props.navigation.navigate('SignUp_Interest', {
            email: this.state.email,
            password: this.state.password,
            nickname: this.state.nickname,
        });
    }
    pressNext(){
        this.setState({
            passwordChecked: 0,
            nicknameChecked: 0
        })
        this.passwordCheck();
        this.nicknameCheck();
        if (this.state.passwordChecked == 1 && this.state.nicknameChecked == 1) {
            this.goSignUp_Interest()
        }
    }
    passwordCheck(){
        if (this.state.password == '') {
            alert("Please enter your password.")
        } else if (this.state.password_check == '') {
            alert("Please enter your confirm password.")
        } else if (this.state.password != this.state.password_check) {
            alert("The two passwords you entered are different.")
        } else if (String(this.state.password).length > 16 || String(this.state.password).length < 8) {
            alert("Password is too long or too short.")
        } else {
            this.state.passwordChecked = 1
        }
    }
    nicknameCheck(){
        if (this.state.nickname == '') {
            alert("Please enter your nickname.")
        } else if (String(this.state.nickname).length> 20 || String(this.state.nickname).length < 2) {
            alert("Nickname is too long or too short.")
        } else {
            this.state.nicknameChecked = 1
        }
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
        justifyContent: 'center',
        alignItems: 'flex-start',
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
