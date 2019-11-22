import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { Button, Item, Icon, Label, Input, Left, Body, Right} from 'native-base'

export default class SearchedChatrooms extends Component {
    constructor(props){
        super(props)
    }

    state = {
        display: this.props.display,
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

    _onPressChatroom = (new_room) => {
        var url = 'http://101.101.160.185:3000/chatroom/entrance/'+new_room.cr_id;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
            }),
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson=>{
            console.log(new_room),
            this.props.pushNewRoom(new_room.cr_name, new_room.cr_id, new_room.interest)
        })
        ToastAndroid.show('Chat room join complete.', ToastAndroid.SHORT);
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
                                    <TouchableOpacity key={chatroom.cr_id} onPress={() => this._onPressChatroom(chatroom)}> 
                                        <View style={style.chatroom}>
                                            <Text style={style.font_cr_name}>{chatroom.cr_name}</Text>
                                            <Text style={style.font_cr_intertest}> #{chatroom.interest.section} #{chatroom.interest.group}</Text>
                                            <Icon name='md-people' style={{position : 'absolute', right:10, fontSize: 14, color: '#333'}}>
                                                <Text style={{fontSize: 12, color: '#333'}}> 14</Text>
                                            </Icon>
                                        </View>
                                    </TouchableOpacity> 
                                ))) : (
                                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={style.font_foundNoCR}>No Room Found.</Text>
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
        height: '80%',
        borderRadius: 20,
        backgroundColor: 'rgba(44,44,44,0.90)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatroom: {
        width: '100%',
        height: 55,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
        marginBottom: 14,
    },
    font_Title: {
        width: '80%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ddd',
        margin: 15,
    },
    font_cr_name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    font_foundNoCR: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ddd',
    },
    font_cr_intertest: {
        fontSize: 12,
        color: '#333',
    },
})