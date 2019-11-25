import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native'
import { Button, } from 'native-base'

import Games from '../../SignUp/Interest/Games';
import Sports from '../../SignUp/Interest/Sports';
import Foods from '../../SignUp/Interest/Foods';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class EditInterest extends Component {
    constructor(props){
        super(props)
    }

    state = {
        token: this.props.token,
        interests: [],
        display: this.props.display
    }

    interAdd = (newSection, newGroup, newKey) => {
        const pervInterests = this.state.interests;
        this.setState({
            interests: pervInterests.concat({section : newSection, group: newGroup, key: newKey})
        });
    }

    interRemove = (remKey) => {
        const pervInterests = this.state.interests;
        this.setState({
            interests: pervInterests.filter(inter => inter.key !== remKey)
        });
    }

    _onPressCancel = () => {
        this.popupClose()
    }

    _onPressAdmit = () => {
        var url = 'http://101.101.160.185:3000/user/profile/interests';
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            'x-access-token': this.props.token
            }),
            body: JSON.stringify({
                "interests": this.state.interests
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            if(responseJson.result == true){
                this.popupClose()
                ToastAndroid.show('Your changes have been saved.', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Failed to save. Please check the network.', ToastAndroid.SHORT);
            }
        })
    }

    popupClose = () => {
        this.setState({
            interests: [],
        })
        this.props.displayChange('none');
    }

    render() {
        return (
            <View style={style.container}>
                <View style={[style.backGround, {display: this.props.display}]}>
                    <View style={style.content}>
                        <Text style={style.font_Title}>Edit Interests</Text>
                        <ScrollView style={{width: 260, height: screenHeight*0.57}}>
                            <Foods interAdd={this.interAdd} interRemove={this.interRemove}/>
                            <Games interAdd={this.interAdd} interRemove={this.interRemove}/>
                            <Sports interAdd={this.interAdd} interRemove={this.interRemove}/>
                        </ScrollView>
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
        height: screenHeight*0.8,
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