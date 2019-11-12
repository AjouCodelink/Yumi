import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import {Icon, Input, Left, Right} from 'native-base';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import Chatbox_my from './Chatbox_my';
import Chatbox_other from './Chatbox_other';
import ChatroomSideMenu from './Chatroom-SideMenu';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("Sqlite/db.db");

const screenHeight = Math.round(Dimensions.get('window').height);
const io = require('socket.io-client');

export default class Chatroom extends Component {
    constructor(props){
        super(props);
        this.socket = io('http://101.101.160.185:3000'); 
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
            //console.log(this.state.chatlog);
        });
        const addMessage = data => {
            console.log(data);
            this.setState({chatlog:[...this.state.chatlog, data]});
            
        };
    };

    static navigationOptions = {
        header: null
    }

    state = {
        cr_id: 0,
        message: '',
        myEmail: 'donggi9313@naver.com',
        chatlog:[],
    }

    renderDrawer = () => {
        return (
            <View>
                <ChatroomSideMenu/>
            </View>
        );
    };

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM chatLog;',[],
                //'SELECT * FROM chatLog WHERE ch_id = ? LIMIT count(CASE WHEN ch_id = ? THEN 1 END)-30, 30;', [this.state.ch_id, this.state.ch_id],
                (success) => console.log(success),
                (error) => console.error(error)
            );
        });
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <DrawerLayout
                ref={ drawer => this.drawer = drawer }
                drawerWidth={300}
                drawerPosition={DrawerLayout.positions.Right}
                drawerType='front'
                drawerBackgroundColor="#555"
                renderNavigationView={this.renderDrawer}>
                <View style={style.header}>
                    <Left>
                        <TouchableOpacity onPress={() => goBack(null)}>
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
                        onContentSizeChange={(contentWidth, contentHeight) => {     // 자동 스크롤
                            this.scrollView.scrollTo({
                                x: 0,
                                y: contentHeight + contentHeight - screenHeight,
                                animated: true,
                            })
                        }}
                        style={{width: '100%'}}>
                        {
                            this.state.chatlog.map( chatlog => chatlog.user_email == this.state.myEmail ?(   // 말풍선 만들기
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

    dbAdd() {
        db.transaction( tx => {
            tx.executeSql(
                'INSERT INTO chatLog (user_email, cr_id, Time, message) values (?, ?, ?, ?)',
                [this.state.user_email, this.state.cr_id, this.state.Time, this.state.message],
                (success) => console.log(success),
                (error) => console.error(error)
            );
        })
    }

    _onPressSend(){
        if (this.state.message != ''){
            const newchat = {
                user_email: this.state.myEmail,
                cr_id: this.state.cr_id,
                Time: new Date(),
                message: this.state.message,
            }
            this.setState(prevState => ({
                chatlog: [
                    ...prevState.chatlog, // 기존 메시지 목록
                    newchat
                ]
            }));
            this.dbAdd()
            this.socket.emit('SEND_MESSAGE', newchat);
            this.setState({message: ''});    
        }
    }

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
