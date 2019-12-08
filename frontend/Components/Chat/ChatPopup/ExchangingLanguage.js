import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { Button, Item, Label, Input, Switch } from 'native-base'

import LanguagePicker from '../../SignUp/Language/LanguagePicker'

export default class ExchangingLanguage extends Component {
    constructor(props){
        super(props)
    }

    state = {
        selectedLanguage: 'noValue',
        new_cr_name: '',
        search_create: false, // false=search, true=create
        display: this.props.display
    }

    languageChange = (value) => {
        this.setState({
            selectedLanguage: value, 
        })
    }

    _onPressCancel = () => {
        this.popupClose()
    }

    _onPressCreate = () => {
        if (this.state.selectedLanguage == 'noValue') {
            ToastAndroid.show('Please select target language.', ToastAndroid.SHORT)
            return
        } else if (this.state.selectedLanguage == this.props.myLanguage) {
            ToastAndroid.show('Origin language is same with target language.', ToastAndroid.SHORT)
            return
        } else if (this.state.new_cr_name ==  '') {
            ToastAndroid.show('Please input Room name.', ToastAndroid.SHORT)
            return
        }
        const new_room = {
            name: this.state.new_cr_name,
            language: this.state.selectedLanguage,
        }
        var url = 'http://101.101.160.185:3000/chatroom/exchange-language/creation';
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
            }),
            body: JSON.stringify(new_room)
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson=>{
            this.props.pushNewRoom(responseJson.cr_name, responseJson.cr_id, responseJson.interest, '1')
            ToastAndroid.show('Chat room creation complete.', ToastAndroid.SHORT)
            this.popupClose()
        })
    }

    popupClose = () => {
        this.setState({
            selectedLanguage: 'noValue',
            new_cr_name: '',
        })
        this.props.displayChange('none');
    }

    _onPressSwitch = () => {
        this.setState({search_create: !this.state.search_create})
    }

    render() {
        return (
            <View style={[style.container, {display: this.props.display}]}>
                <View style={[style.backGround, {display: this.props.display}]}>
                    { this.state.search_create == false
                        ? (<View style={[style.content, {height: 350}]}>
                            <Text style={style.font_Title}>Language Exchange</Text>
                            <Text style={style.font_detail}>Auto translation disabled in this room.</Text>
                            <View style={{flexDirection: 'row', justifyContent:'center', margin:10}}>
                                <Text style={style.font_default}>Search </Text>
                                <Switch value={this.state.search_create} onChange={() => this._onPressSwitch()}/>
                                <Text style={style.font_default}> Create</Text>
                            </View>
                            <View style={{height: 45, width: 250}}>
                                <LanguagePicker valueChange={this.languageChange}/>
                            </View>
                            <Text style={[style.font_detail, {width: 234, marginTop: 5, marginBottom: 10}]}>Target Language</Text>
                            <View style={style.pickerContainer}>
                                <TouchableOpacity>
                                    <Button onPress={() => this._onPressCancel()} style={{backgroundColor: '#bbb', width: 80, justifyContent: 'center', marginRight:20}}>
                                        <Text>Cancel</Text>
                                    </Button>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Button onPress={() => this.props.exLangSearch(this.state.selectedLanguage)} style={{backgroundColor: '#4d4', width: 80, justifyContent: 'center', marginLeft:20}}>
                                        <Text>Search</Text>
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )
                        : (<View style={[style.content, {height: 400}]}>
                            <Text style={style.font_Title}>Language Exchange</Text>
                            <Text style={style.font_detail}>Auto translation disabled in this room.</Text>
                            <View style={{flexDirection: 'row', justifyContent:'center', margin:10}}>
                                <Text style={style.font_default}>Search </Text>
                                <Switch value={this.state.search_create} onChange={() => this._onPressSwitch()}/>
                                <Text style={style.font_default}> Create</Text>
                            </View>
                            <View style={{height: 45, width: 250}}>
                                <LanguagePicker valueChange={this.languageChange}/>
                            </View>
                            <Text style={[style.font_detail, {width: 234, marginTop: 5, marginBottom: 10}]}>Target Language</Text>
                            <Item style={{height: 48, width: 250, marginTop: 15}} floatingLabel>
                                <Label style={{color: '#aaa'}}> Room name</Label>
                                <Input style={{fontSize: 16, color: '#ddd', paddingLeft: 8}} onChangeText={(new_cr_name) => this.setState({new_cr_name})}/>
                            </Item>
                            <View style={style.pickerContainer}>
                                <TouchableOpacity>
                                    <Button onPress={() => this._onPressCancel()} style={{backgroundColor: '#bbb', width: 80, justifyContent: 'center', marginRight:20}}>
                                        <Text>Cancel</Text>
                                    </Button>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Button onPress={() => this._onPressCreate()} style={{backgroundColor: '#4d4', width: 80, justifyContent: 'center', marginLeft:20}}>
                                        <Text>Create</Text>
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                        )}
                </View>
            </View>
        )   
    }
}

const style = StyleSheet.create({
    container: {
        flex: 4,
        position : 'absolute',
        width: '100%',
        height: '100%',
    },
    backGround: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
        width: 300,
        borderRadius: 20,
        backgroundColor: 'rgba(44,44,44,0.90)',
        justifyContent: 'center',
        alignItems: 'center',   
    },
    font_Title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ddd',
        marginTop: 5,
    },
    font_detail: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 12,
    },
    font_default: {
        fontSize: 16,
        color: '#ddd',
    },
    pickerContainer: {
        flexDirection : 'row',
        margin: 35,
        justifyContent: 'center',
    },
})