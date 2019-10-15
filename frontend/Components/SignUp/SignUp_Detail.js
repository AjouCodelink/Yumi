import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';

export default class SignUp_Detail extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state={
            email: 'Sample_email@ajou.ac.kr', 
            password: '', 
            password_check: '',
            name: '',

    }
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}/>
                <View style={style.title}>
                    <Text style={style.font_title}>Enter Details</Text>
                </View>
                <View style={style.content}>
                    <Text style={{fontSize:18, color:'#aaa', textAlign:'left'}}>Your Email:</Text>
                    <Text style={{fontSize:18, color:'white', textAlign:'left'}}>  {this.state.email}{"\n"}</Text>
                    <TextInput
                        style={{height: 40, width: 300, backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <Text style={style.font_main}> Password must be at least 8 characters long.{"\n"}</Text>
                    <TextInput
                        style={{height: 40, width: 300, backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                        placeholder="Confirm Password"
                        value={this.state.password_check}
                        onChangeText={(password_check) => this.setState({password_check})}
                    />
                    <Text style={style.font_main}> Please enter the same value as your password.{"\n"}</Text>
                    <TextInput
                        style={{height: 40, width: 300, backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                        placeholder="Nickname"
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                    />
                    <Text style={style.font_main}> The nickname must be between 2 and 10 characters.{"\n"}</Text>
                </View>
                <View style={style.footer}>
                    <View style={style.footer_backbutton}>
                        <CustomButton
                            title={'Back'}
                            titleColor={'#ddd'}
                            buttonColor={'#000'}
                            onPress={() => this.goSignUp_EmailAuth()}/>
                    </View>
                    <View style={style.footer_nextbutton}>
                        <CustomButton
                            title={'Done'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={() => this.goMain()}/>
                    </View>
                </View>
            </View>
        )
    }
    goSignUp_EmailAuth(){
        this.props.navigation.navigate('SignUp_EmailAuth');
    }
    goMain(){
        this.props.navigation.navigate('Main');
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 100,
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
        width:'70%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: '15%',
    },
    footer_nextbutton: {
        width:'70%',
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
