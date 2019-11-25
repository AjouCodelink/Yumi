import React, { Component } from 'react';
import { ToastAndroid, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'

import DoPicker from '../../SignUp/Address/DoPicker'
import CityPicker from '../../SignUp/Address/CityPicker'

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

export default class EditAddress extends Component {
    constructor(props){
        super(props)
    }

    state = {
        selectedDo: 'noValue',
        selectedCity: 'noValue',
        address: '',
        display: this.props.display
    }

    doChange = (value) => {
        this.setState({
            selectedDo: value,
            selectedCity: 'noValue'
        })
    }

    cityChange = (value) => {
        this.setState({
            selectedCity: value, 
            address: this.state.selectedDo+' '+value
        })
    }

    _onPressCancel = () => {
        this.popupClose()
    }

    _onPressAdmit = () => {
        if (this.state.selectedCity= 'noValue') {
            ToastAndroid.show('Please select language.', ToastAndroid.SHORT)
            return
        }
        var url = 'http://101.101.160.185:3000/user/profile/address/'+this.state.address;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            'x-access-token': this.props.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            if(responseJson.result == true){
                db.transaction(tx => {
                    tx.executeSql(  // DB에 바뀐 닉네임 저장
                        'UPDATE userInfo SET address = ?',
                        [this.state.address],
                        null,
                        (_,error) => console.error(error)
                    )
                })
                this.popupClose()
                ToastAndroid.show('Your changes have been saved.', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Failed to save. Please check the network.', ToastAndroid.SHORT);
            }
        })
    }

    popupClose = () => {
        this.setState({
            selectedDo: 'noValue',
            selectedCity: 'noValue',
            address: '',
        })
        this.props.displayChange('none');
    }

    render() {
        return (
            <View style={style.container}>
                <View style={[style.backGround, {display: this.props.display}]}>
                    <View style={style.content}>
                        <Text style={style.font_Title}>Edit Address</Text>
                        <View style={{height: 45, width: 250, margin:10}}>
                            <DoPicker valueChange={this.doChange}/>
                        </View>
                        <View style={{height: 45, width: 250}}>
                            <CityPicker selectedDo={this.state.selectedDo} valueChange={this.cityChange}/>
                        </View>
                        <View style={style.pickerContainer}>
                            <TouchableOpacity >
                                <Button onPress={() => this._onPressCancel()} style={{backgroundColor: '#bbb', width: 80, justifyContent: 'center', marginRight:20}}>
                                    <Text>Cancel</Text>
                                </Button>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Button onPress={() => this._onPressAdmit()} style={{backgroundColor: '#4d4', width: 80, justifyContent: 'center', marginLeft:20}}>
                                    <Text>Admit</Text>
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )   
    }
}

const style = StyleSheet.create({
    container: {
        flex: 3,
        width: '100%',
        height: '100%',
        position : 'absolute',
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
        height: 350,
        borderRadius: 20,
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    font_Title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ddd',
        margin: 15,
    },
    pickerContainer: {
        flexDirection : 'row',
        margin: 35,
        justifyContent: 'center',
    },
})