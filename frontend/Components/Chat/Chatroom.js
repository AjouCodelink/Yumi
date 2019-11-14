import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import {Icon, Input, Left, Right} from 'native-base';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import Chatbox_my from './Chatbox_my';
import Chatbox_other from './Chatbox_other';
import ChatroomSideMenu from './Chatroom-SideMenu';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

const screenHeight = Math.round(Dimensions.get('window').height);
const io = require('socket.io-client');

export default class Chatroom extends Component {
    constructor(props){
        super(props);
    };

    componentWillMount() {
        this.socket = io('http://101.101.160.185:3000');     
        this.socket.on('RECEIVE_MESSAGE', function(data){
            console.log(RECEIVE_MESSAGE)
            this.dbAdd(data);
        });
    }

    static navigationOptions = {
        header: null
    }

    state = {
        cr_id: 0,
        cr_name: '',
        message: '',
        myEmail:'',
        chatlog:[], // 채팅로그
        key: 0,
    }
    
    componentDidMount() {  // table이 없으면 create
        db.transaction(tx => {
            tx.executeSql(  // token에서 user_email 읽어오기
                'SELECT user_email FROM token',
                [],
                (_, { rows: { _array }  }) =>     
                    (_array != []) ? (this.state.myEmail = _array[0].user_email) :
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
        this.dbUpdate();
    }

    render() {
        const { goBack } = this.props.navigation;
        const { navigation } = this.props;
        this.state.cr_id = navigation.getParam('cr_id', '-1');
        this.state.cr_name = navigation.getParam('title', 'No cr_name');
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
                        <Text style={[style.font_header]}>{this.state.cr_name}
                            <Text style={{fontSize:15, color: '#ee0'}}>  인원수</Text>
                        </Text>
                    </View>
                    <Right>
                        <TouchableOpacity onPress={() => this.drawer.openDrawer()}>
                            <Icon name='md-menu' style={{color: '#999', fontSize: 30}}/>
                        </TouchableOpacity>
                    </Right>
                </View>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={0} style={style.container}>
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
                        {this.state.chatlog.map( chatlog => chatlog.user_email == this.state.myEmail ?(   // 말풍선 만들기
                            <View key={this.state.key++} style={style.my_chat}>
                                <Chatbox_my data={chatlog}/>
                            </View>
                        ) : (
                            <View key={this.state.key++} style={style.other_chat}>
                                <Chatbox_other data={chatlog}/>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={style.inputPlace}>
                        <Input onChangeText={(message) => this.setState({message})}
                            onSubmitEditing={() => {this._onPressSend();}}  // 엔터눌러도 입력되도록 함
                            value={this.state.message}
                            placeholder='Enter message'
                            style={{marginLeft: 6, fontSize: 16}}/>
                        <TouchableOpacity onPress={() => this._onPressSend()}>
                            <Icon name='md-send' style={{color: '#333', marginRight: 10, fontSize: 30}}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </DrawerLayout>
        );
    }

    renderDrawer = () => {
        return (
            <View>
                <ChatroomSideMenu/>
            </View>
        );
    };

    dbAdd(newchat) {
        db.transaction( tx => {
            tx.executeSql(
                'INSERT INTO chatLog (user_email, cr_id, Time, message) values (?, ?, ?, ?);',
                [newchat.user_email, newchat.cr_id, newchat.Time, newchat.message],
                null,
                (_,error) => console.error(error)   // sql문 실패 에러
            );
        },(error) => console.error(error))   // 트랜젝션 에러
        this.dbUpdate()
    }

    dbUpdate = () => {        // DB 내의 채팅 로그 읽어오기
        db.transaction( tx => {
            tx.executeSql(
                'SELECT * FROM chatLog WHERE cr_id = ? LIMIT 200',  //  일단 200개만 읽어오도록
                [this.state.cr_id],
                (_, { rows: { _array }  }) => this.setState({ chatlog: _array }),
                (_,error) => console.error(error)
            )
        },(error) => console.error(error)
        )
    };

    _onPressSend(){
        if (this.state.message != ''){
            const newchat = {
                user_email: this.state.myEmail,
                cr_id: this.state.cr_id,
                Time: Date(),
                message: this.state.message,
            }
            this.dbAdd(newchat)
            this.socket.emit('SEND_MESSAGE', newchat);
            this.setState({message: null});    
        }
    }

    handleBackButton = () => {  // 뒤로가기 누르면 전 탭으로 돌아감
        goback()
    };
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
        fontSize: 30,
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
