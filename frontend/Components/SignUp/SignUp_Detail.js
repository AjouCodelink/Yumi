import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, } from 'react-native';
import { ListItem } from 'react-native-elements';
import CustomButton from '../CustomButton';

var interests = ({
    interest: {
        section: { type: String },
        group: { type: String },
    }
});

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
                <View style={style.content}>

                        <Text style={{fontSize:18, color:'#999', textAlign:'left'}}>Your Email:</Text>
                        <Text style={{fontSize:20, color:'white', textAlign:'left'}}> {this.state.email}{"\n"}</Text>
                        <TextInput
                            style={{height: 40, width: '90%', backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                        />
                        <Text style={style.font_main}> Password must be between 8 and 16 characters.{"\n"}</Text>
                        <TextInput
                            style={{height: 40, width: '90%', backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                            placeholder="Confirm Password"
                            value={this.state.password_check}
                            onChangeText={(password_check) => this.setState({password_check})}
                        />
                        <Text style={style.font_main}> Please enter same as your password.{"\n"}</Text>
                        <TextInput
                            style={{height: 40, width: '90%', backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                            placeholder="Nickname"
                            value={this.state.nickname}
                            onChangeText={(nickname) => this.setState({nickname})}
                        />
                        <Text style={style.font_main}> The nickname must be between 2 and 20 characters.{"\n"}</Text>

                </View>
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
                            title={'Done'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={() => this.pressDone()}/>
                    </View>
                </View>
            </View>
        )
    }
    goTitle(){
        this.props.navigation.navigate('Title');
    }
    goMain(){
        this.props.navigation.navigate('Main');
    }
    pressDone(){
        this.passwordCheck();
        this.nicknameCheck();
        if (this.state.passwordChecked == 1 && this.state.nicknameChecked == 1) {
            this.goMain()
        } else {
            this.state.passwordChecked = 0
            this.state.nicknameChecked = 0
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
    submit(){
        var user = {}
        user.email = this.state.email
        user.password = this.state.password
        user.nickname = this.state.nickname
        user.interests = this.state.interests
        console.log(user);
        var url = 'http://101.101.160.185:3000/signup/save-user';
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
        paddingTop: '13%',
        justifyContent: 'flex-start',
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
