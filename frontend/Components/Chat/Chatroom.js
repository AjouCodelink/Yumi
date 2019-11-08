import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Input, Drawer} from 'native-base';

import Chatbox_my from './Chatbox_my';
import ChatroomSideMenu from './ChatroomSideMenu';

export default class Chatroom extends Component {
    state = {
        message: '',
        chatlog: [],
    }

    static navigationOptions = {
        headerTitle: () => (
            <Text style={style.font_header}>chatroom name
                <Text style={{fontSize:15, color: '#ee0'}}>  20</Text>
            </Text>
        ),
        headerRight: () => ( <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='md-menu' style={{color: '#ddd', marginRight: 18, fontSize: 35}} /> 
            </TouchableOpacity>
        ),
        headerTintColor: '#ddd',
        headerStyle: { backgroundColor: '#555', },
    }
    render() {
        return (
            <Drawer ref={(ref) => { this.drawer = ref; }}
                content={<ChatroomSideMenu />}
                onClose={() => this.closeDrawer} 
                panCloseMask={1}>
                <View style={style.container}>
                    <View style={style.content}>
                        {/*원래 스크롤뷰 있던 자리인데 스크롤뷰 말고 다른 드래그 뷰 찾아야함.*/}
                            {
                                this.state.chatlog.map( chatlog => (
                                    <View style={style.my_chat}>
                                        <Chatbox_my data={chatlog}/>
                                    </View>
                                ))
                            }
                        
                    </View>
                    <View style={style.inputPlace}>
                        <Input onChangeText={(message) => this.setState({message})} value={this.state.message}
                            placeholder='Enter message' style={{marginLeft: 6, fontSize: 16}}/>
                        <TouchableOpacity onPress={() => this._onPressSend()}>
                            <Icon name='md-send' style={{color: '#333', marginRight: 10, fontSize: 30}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Drawer>
        );
    }
    _onPressSend(){
        if (this.state.message == ''){
            
        } else {
            const newchat = {
                time: new Date(),
                message: this.state.message,
                sendUser: 1,
            }   
            this.setState(prevState => ({
                chatlog: [
                    ...prevState.chatlog, // 기존 메시지 목록
                    newchat
                ]
            }));
            this.setState({message: ''})
        }
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    handleBackButton = () => {  // 뒤로가기 누르면 전 탭으로 돌아감
        goback()
    }
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
        height:'12%',
        justifyContent: 'flex-end',
        paddingLeft: '4%',
        paddingBottom: '1.1%',
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
        alignItems: 'flex-end',
    },
    other_chat: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
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