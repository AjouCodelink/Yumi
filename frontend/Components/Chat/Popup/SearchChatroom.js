import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { Button, Item, Label, Input } from 'native-base'

export default class SearchChatroom extends Component {
    constructor(props){
        super(props)
    }

    state = {
        display: this.props.display
    }

    sectionChange = (value) => {
        this.setState({
            selectedSection: value,
            selectedGroup: 'noValue'
        })
    }

    groupChange = (value) => {
        this.setState({
            selectedGroup: value, 
        })
    }

    _onPressClose = () => {
        this.popupClose()
    }

    _onPressChatroom = (item) => {
        const new_room = {
            interest: {
                section: item.selectedSection,
                group: item.selectedGroup,
            },
            name: this.state.new_cr_name,
        }
        var url = 'http://101.101.160.185:3000/chatroom/creation';
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
            this.props.pushNewRoom(responseJson)
        })
        ToastAndroid.show('The room join is complete.', ToastAndroid.SHORT);
        this.popupClose()
    }

    popupClose = () => {
        this.props.displayChange('none');
    }

    render() {
        return (
            <View style={[style.container, {display: this.props.display}]}>
                <View style={[style.backGround, {display: this.props.display}]}>
                    <View style={style.content}>
                        <Text style={style.font_Title}>Searched Chatrooms</Text>
                        <ScrollView style={{width: '90%', height: '50%'}}>
                            {this.props.array.length != 0
                                ? (this.props.array.map( chatroom => (
                                    <View style={style.chatroom} key={chatroom.cr_id}>
                                        <Text style={style.font_cr_name}>{chatroom.cr_name}</Text>
                                        <Text style={style.font_cr_intertest}>{chatroom.interest.section} - {chatroom.interest.group}</Text>
                                    </View>
                                ))) : (
                                    <View>
                                        <Text style={style.font_cr_name}>No Room Found.</Text>
                                    </View>
                                )
                            }
                        </ScrollView>
                        <TouchableOpacity>
                            <Button onPress={() => this._onPressClose()} style={{backgroundColor: '#bbb', width: 80, justifyContent: 'center', margin: 15,}}>
                                <Text>Close</Text>
                            </Button>
                        </TouchableOpacity>
                    </View>
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
        width: '80%',
        height: '70%',
        borderRadius: 20,
        backgroundColor: 'rgba(44,44,44,0.90)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatroom: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        backgroundColor: 'rgba(44,44,44,0.90)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    font_Title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ddd',
        margin: 15,
    },
    font_cr_name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ddd',
    },
    font_cr_intertest: {
        fontSize: 14,
        color: '#ddd',
    },
})