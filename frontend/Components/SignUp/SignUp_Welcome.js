import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';

export default class SignUp_Welcome extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state={email: ''}
    }
    handleSummit = (e) => {
        this.props.onCreate(this.state);
        this.setState({
            email: ''
        })
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.title}>
                    <Text style={style.font_title}>Welcome!</Text>
                </View>
                <View style={style.content}>
                    <View style={style.content}>
                        <Text style={style.font_main}>Yumi is an open chatting application for{"\n"} students studying abroad.</Text>
                    </View>
                    <View style={style.content}>
                        <Text style={style.font_main}>(대충 그럴싸한 설명 하는 글1)</Text>
                    </View>
                    <View style={style.content}>
                        <Text style={style.font_main}>(대충 지 잘난거 자랑 하는 글2)</Text>
                    </View>
                    <Text style={style.font_main}>Now, press the next button.</Text>
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
                            onPress={() => this.goSignUp_EmailAuth()}/>
                    </View>
                </View>
            </View>
        )
    }
    goTitle(){
        this.props.navigation.navigate('Title');
    }
    goSignUp_EmailAuth(){
        this.props.navigation.navigate('SignUp_EmailAuth');
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
