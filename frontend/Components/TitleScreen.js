import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import CustomButton from './CustomButton';
import Animation from 'lottie-react-native';

export default class TitleScreen extends Component {
    static navigationOptions = {    // 상단바 안보이게 하기
        header: null
    }
    componentDidMount() {
    this.animation.play();
    }
    render() {
        return (
            <View style={style.container}>
                <View>
                <Animation
                resizeMode='cover'
//                source={require('./LottieAnimation/title.json')}
                ref={animation => {
                this.animation = animation;
                }}
                style={{
                width: '100%',
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center'
                }}
                loop={true}
                />
                </View>
                <View style={style.content}></View>
                <View style={style.footer}>
                <CustomButton
                    buttonColor={'#ddd'}
                    titleColor={'#000'}
                    title={'Sign up'}
                    onPress={() => this.goSignUp1()}/>
                <CustomButton
                    buttonColor={'#000'}
                    titleColor={'#fff'}
                    title={'Log In'}
                    //onPress={() => alert('이메일/비밀번호 입력 받아야함.')}/>
                    onPress={ () => this.goMainScreen() }/>
                </View>
            </View>
        );
    }
    goMainScreen(){
        this.props.navigation.navigate('Main');
    }
    goSignUp1(){
        this.props.navigation.navigate('SignUp1');
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        width:'100%',
        height:'20%',
    },
    });