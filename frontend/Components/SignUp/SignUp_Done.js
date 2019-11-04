import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';

export default class SignUp_Done extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            loginResult: -1
        }
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
                    <View style={style.content}>
                        <Text style={style.font_main}>All sign up procedures are complete!</Text>
                    </View>
                    <View style={style.content}>
                        <Text style={style.font_main}>Your chosen interest is used only to{"\n"}recommend a suitable chat room for you.</Text>
                    </View>
                    <Text style={style.font_main}>Press the 'Done' button and experience Yumi.</Text>
                </View>
                <View style={style.footer}>
                    <View style={style.footer_backbutton}>
                    </View>
                    <View style={style.footer_nextbutton}>
                        <CustomButton
                            title={'Done'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={() => this.pressDone()}/>
                    </View>
                </View>
            </View>
        )
    }
    pressDone(){
        this.submit();
        setTimeout(() => {this.checkLoginResult();}, 250);
    }
    goMain(){
        this.props.navigation.navigate('Main');
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
    },
});
