import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import {Icon, Input, Left, Right, Body} from 'native-base';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import Chatbox_my from './Chatbox_my';
import Chatbox_other from './Chatbox_other';
import ChatroomSideMenu from './Chatroom-SideMenu';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class Chatroom extends Component {
    state = {
        message: '',
        chatlog: [{
                time: new Date(),
                message: "ㅎㅇㅎㅇ용",
                userID: 'Danggai',
            },{
                time: new Date(),
                message: "여기 저만있음???",
                userID: 'Danggai',
            },{
                time: new Date(),
                message: "님들???",
                userID: 'Danggai',
            },{
                time: new Date(),
                message: "ㅠ",
                userID: 'Danggai',
            }   ],
    }
    renderDrawer = () => {
        return (
            <View>
                <ChatroomSideMenu/>
            </View>
        );
    };
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <DrawerLayout
                ref={ drawer => this.drawer = drawer }
                drawerWidth={250}
                drawerPosition={DrawerLayout.positions.Right}
                drawerType='front'
                drawerBackgroundColor="#ddd"
                renderNavigationView={this.renderDrawer}>
                <View style={style.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.goback()}>
                            <Icon name='md-arrow-round-back' style={{color: '#999', fontSize: 30}}/>
                        </TouchableOpacity>
                    </Left>
                    <View style={{justifyContent: 'flex-start'}}>
                        <Text style={[style.font_header]}>chatroom
                            <Text style={{fontSize:15, color: '#ee0'}}>  20</Text>
                        </Text>
                    </View>
                    <Right>
                        <TouchableOpacity onPress={() => this.drawer.openDrawer()}>
                            <Icon name='md-menu' style={{color: '#999', fontSize: 30}}/>
                        </TouchableOpacity>
                    </Right>
                </View>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={80} style={style.container}>
                    <ScrollView
                        ref={scrollView => {
                            this.scrollView = scrollView;
                        }}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollTo({
                                x: 0,
                                y: contentHeight + contentHeight - screenHeight,
                                animated: true,
                        })}}
                        style={{width: '100%'}}>
                        {
                            this.state.chatlog.map( chatlog => chatlog.userID == 0 ?(
                                <View style={style.my_chat}>
                                    <Chatbox_my data={chatlog}/>
                                </View>
                            ) : (
                                <View style={style.other_chat}>
                                    <Chatbox_other data={chatlog}/>
                                </View>
                            ))
                        }
                    </ScrollView>
                    <View style={style.inputPlace}>
                        <Input onChangeText={(message) => this.setState({message})} value={this.state.message}
                            placeholder='Enter message' style={{marginLeft: 6, fontSize: 16}}/>
                        <TouchableOpacity onPress={() => this._onPressSend()}>
                            <Icon name='md-send' style={{color: '#333', marginRight: 10, fontSize: 30}}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </DrawerLayout>
        );
    }
    _onPressSend(){
        if (this.state.message == ''){
            
        } else {
            const newchat = {
                time: new Date(),
                message: this.state.message,
                userID: 0,
            }   
            this.setState(prevState => ({
                chatlog: [
                    ...prevState.chatlog, // 기존 메시지 목록
                    newchat
                ]
            }));
            this.setState({message: ''})
        }
    };
    handleBackButton = () => {  // 뒤로가기 누르면 전 탭으로 돌아감
        goback()
    };
}

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width:'100%',
        height: 78,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 8,
        backgroundColor: '#555',
    },
    font_header: {
        color: 'white',
        fontSize: 35,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    my_chat: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
    },
    other_chat: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
    },
    inputPlace: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#888',
        borderWidth: 0,
    },
    font_main: {
        color: '#aaa',
        fontSize: 20,
        alignItems: 'center',
    },
});