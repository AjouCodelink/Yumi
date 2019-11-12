import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import {Icon, Input, Left, Right, Body} from 'native-base';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import Chatbox_my from './Chatbox_my';
import Chatbox_other from './Chatbox_other';
import ChatroomSideMenu from './Chatroom-SideMenu';

const screenHeight = Math.round(Dimensions.get('window').height);
const io = require('socket.io-client');

export default class Chatroom extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: '',
            chatlog: [{
                time: "09:13",
                message: "ㅎㅇㅎㅇ용",
                userID: 'Danggai',
            },{
                time: "09:14",
                message: "여기 저만있음???",
                userID: 'Danggai',
            },{
                time: "09:14",
                message: "님들???",
                userID: 'Danggai',
            },{
                time: "09:14",
                message: "ㅠ",
                userID: 'Danggai',
            }],
        }
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
        const { goBack } = this.props.navigation;
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
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollTo({
                                x: 0,
                                y: contentHeight + contentHeight - screenHeight,
                                animated: true,
                        })}}
                        style={{width: '100%'}}>
                        {
                            this.state.chatlog.map( chatlog => chatlog.userID == 0 ?( // 채팅 올라오는 곳. userID가 0이면 내 챗으로 됨
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
        if (this.state.message != ''){
            const newchat = {
                time: "09:14",
                message: this.state.message,
                userID: 0,
               //roomID: 
               //TODO : 내장디비를 통해서 roomID를 받아와야함 -> 채팅룸 구분하여 채팅 가능
            }
            this.socket.emit('SEND_MESSAGE', newchat);
            this.setState({message: ''});    
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
