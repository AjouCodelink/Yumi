import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';

export default class Welcome extends Component {
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
    goTitle(){
        RootNavigator('Title')
    }
    goSignUp_EmailAuth(){
        this.props.navigation.navigate('SignUp_EmailAuth');
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.title}>
                    <Text style={style.font_title}>Welcome!</Text>
                </View>
                <View style={[style.content, {justifyContent: 'space-between'}]}>
                    <Text style={style.font_main}>Yumi is a chat and information service application for exchange students.</Text>
                    <Text style={style.font_main}>Create an open chat room with topics that interest you.</Text>
                    <Text style={style.font_main}>or perform one-on-one language exchanges with your preferred language.</Text>
                    <Text style={style.font_main}>In addition, information for exchange students can be provided at a glance.</Text>
                    <Text style={style.font_main}>Now, press the next button.</Text>
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
                            title={'Next'}
                            titleColor={'#000'}
                            buttonColor={'#ddd'}
                            onPress={() => this.goSignUp_EmailAuth()}/>
                    </View>
                </View>
            </View>
        )
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
    title: {
        width:'100%',
        height:'15%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    content: {
        flex: 1,
        width:'80%',
        alignItems: 'center',
    },
    footer: {
        width:'100%',
        height:'8%',
        padding: 5,
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
        color: '#ccc',
        fontSize: 20,
        textAlign: 'center',
    },
});
