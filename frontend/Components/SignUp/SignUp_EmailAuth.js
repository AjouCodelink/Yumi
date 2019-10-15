import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';

export default class SignUp_EmailAuth extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props);
        this.state={email: ''}
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}/>
                <View style={style.title}>
                    <Text style={style.font_title}>E-mail authentication</Text>
                </View>
                <View style={style.content}>
                        <TextInput
                            style={{height: 40, width: 300, backgroundColor:'#888',  fontSize:18, borderRadius: 5, paddingLeft: 9}}
                            placeholder="Email Address"
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                        />
                    <Text style={style.font_main}>  You must use school e-mail.{"\n"}</Text>
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
                            onPress={() => this.goSignUp_Detail()}/>
                    </View>
                </View>
            </View>
        )
    }
    goTitle(){
        this.props.navigation.navigate('Title');
    }
    goSignUp_Detail(){
        this.props.navigation.navigate('SignUp_Detail');
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
