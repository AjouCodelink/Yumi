import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import CustomButton from './CustomButton';

export default class TitleScreen extends Component {
    static navigationOptions = {    // 상단바 안보이게 하기
        header: null
    }
    constructor(props){
        super(props);
        this.state={email: '', password: ''}
    }
    render() {
        return (
            <View style={style.container}>
                <Image
                    style={{height:'50%', width:'50%', resizeMode:'contain'}}
                    source={require('../assets/Titleimage.png')}/>
                <View style={style.content}>
                    <TextInput
                        style={{height: 40, width: 300, backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                        placeholder="Email Address"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                    />
                    <Text style={{fontSize: 10}}>        </Text>
                    <TextInput
                        style={{height: 40, width: 300, backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>
                <View style={style.footer}>
                    <View style={style.footer_backbutton}>
                        <CustomButton
                            title={'Sign up'}
                            titleColor={'#ddd'}
                            buttonColor={'#000'}
                            onPress={() => this.goSignUp0()}/>
                    </View>
                    <View style={style.footer_nextbutton}>
                        <CustomButton
                            title={'Log In'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={ () => this.goMain() }/>
                    </View>
                </View>
            </View>
        );
    }
    goMain(){
        this.props.navigation.navigate('Main');
    }
    goSignUp0(){
        this.props.navigation.navigate('SignUp0');
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 200,
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
        width:'75%',
        height:'9%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444'
    },
    footer_backbutton: {
        width:'75%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: '10%',
    },
    footer_nextbutton: {
        width:'75%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '10%',
    },
    });