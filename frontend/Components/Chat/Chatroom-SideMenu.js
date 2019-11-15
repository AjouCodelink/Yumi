import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';

export default class Chatroom_SideMenu extends Component {
    constructor(props){
        super(props);
        this.state={
            bookmark: false, notification: true,
            users: [],
        }
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <View style={style.iconBox}>
                        <TouchableOpacity onPress={() => this._onPressBookmark()}>
                                {this.state.bookmark == true
                                    ?<Icon name='md-star' style={style.icon}/>
                                    :<Icon name='md-star-outline' style={style.icon}/>
                                }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressNoti()}>
                                {this.state.notification == true
                                    ?<Icon name='md-notifications' style={style.icon}/>
                                    :<Icon name='md-notifications-off' style={style.icon}/>
                                }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressExit()}>
                            <Icon name='md-exit' style={style.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={style.toolBox}>
                        <TouchableOpacity onPress={() => this._onPressCamera()}>
                            <View style={style.tool}>
                                <Icon name='md-camera' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Camera</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressPicture()}>
                            <View style={style.tool}>
                                <Icon name='md-images' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Pictures</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressRecom()}>
                            <View style={style.tool}>
                                <Icon name='md-locate' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Place Recommend</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.userList}>
                        <ScrollView>
                            {this.state.users.map( user => (
                                <Text style={style.tool_text}>{user.nickname}</Text>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
    _onPressBookmark() {
        this.setState({
            bookmark: !this.state.bookmark
        })
    }
    _onPressNoti() {
        this.setState({
            notification: !this.state.notification
        })
    }
    _onPressExit() {
        alert("You pressed Exit.")
    }
    _onPressPicture() {
        alert("You pressed Picture.")
    }
    _onPressRecom() {
        alert("You pressed Recom.")
    }
    _onPressCamera() {
        alert("You pressed Camera.")
    }
}

const style = StyleSheet.create({
    container: {
        paddingTop: 40,
        width: 300,
        height: '100%',
        justifyContent: 'flex-start',
        backgroundColor: '#444',
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBox: {
        width: '100%',
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        borderBottomWidth: 2,
        borderBottomColor: '#555',
    },
    icon: {
        color: '#ddd',
        fontSize: 50,
    },
    toolBox: {
        width: '100%',
        paddingLeft: 20,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        borderBottomColor: '#555',
    },
    tool: {
        marginTop: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tool_icon: {
        color: '#ddd',
        fontSize: 45,
    },
    tool_text: {
        color: '#ddd',
        fontSize: 25,
    },
    userList: {
        width: '100%',
        paddingTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    user: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})