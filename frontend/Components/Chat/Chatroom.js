import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar, ScrollView, Dimensions, YellowBox, BackHandler} from 'react-native';
import {Icon, Input, Left, Right} from 'native-base';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import Chatbox_my from './chatbox/mychat';
import Chatbox_other from './chatbox/otherchat';
import Chatbox_quizbot from './chatbox/quizbot';
import Chatbox_notice from './chatbox/notice';
import ChatroomSideMenu from './Chatroom-SideMenu';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const io = require('socket.io-client');

YellowBox.ignoreWarnings([  // 강제로 에러 안뜨게 하기
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export default class Chatroom extends Component {
    constructor(props){
        super(props);
        this.handleBackButtonClick = this._goBack.bind(this);
        this.messageInput = React.createRef();
        this.socket = io('http://101.101.160.185:3000');
        this.socket.on('RECEIVE_MESSAGE', function(data){
            // TODO : 자동번역을 할지 말지 선택하게 만들어서 자동번역 해주기
            //console.log(data);
            detection(data);
        });
        detection=(data)=>{
            var url = 'https://openapi.naver.com/v1/papago/detectLangs';
            fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'token': 'token',
                    'X-Naver-Client-Id': 'IuGRSsZ3UK4K5zUzgFfl',
                    'X-Naver-Client-Secret': 'GnNTiflknE'
                }),
                body: JSON.stringify({
                    "query":data.message
                })
            })
            .then(response => response.json())
            .catch(error => console.error('Error: ', error))
            .then(responseJson => {
                //console.log(responseJson)
                if (data.user_email == this.state.myEmail) { // 내 메시지면 스킵
                    return
                } else if (data.user_email == 'PopQuizBot' || data.user_email == 'notice' || data.answer=='#image') {  // 팝퀴즈봇, 공지, 이미지면 디비에 추가
                    db_chatLogAdd(data);
                }  else {    // 아니면 번역
                    translate(data, responseJson.langCode);
                }
            })
        }

        translate = (data, code) =>{
            var url = 'https://openapi.naver.com/v1/papago/n2mt';
            fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'token': 'token',
                    'X-Naver-Client-Id': 'uwR54w31oloY23abXfCg',
                    'X-Naver-Client-Secret': '2OeufRbdBQ'
                }),
                body: JSON.stringify({
                    "source": code,
                    "target": this.state.myLanguage,
                    "text": data.message
                })
            })
            .then(response => response.json())
            .catch(error => console.error('Error: ', error))
            .then(responseJson => {
                if (responseJson.message == undefined) {
                    db_chatLogAdd(data);
                } else {
                    data.transMessage = responseJson.message.result.translatedText;
                    db_chatLogAdd(data);
                }
            })
        }

        db_chatLogAdd = (newChat) => {
            db.transaction( tx => {
                tx.executeSql(
                    'INSERT INTO chatLog (user_email, cr_id, Time, message, transMessage, answer) values (?, ?, ?, ?, ?, ?);',
                    [newChat.user_email, newChat.cr_id, newChat.Time, newChat.message, newChat.transMessage, newChat.answer],
                    null,
                    null,   // sql문 실패 에러
                )
            },null)          // 트랜젝션 에러
            db.transaction(tx => {
                tx.executeSql(  
                    'UPDATE crList SET lastMessage = ?, lastTime = ? WHERE cr_id = ?',
                    [newChat.message, newChat.Time, this.state.cr_id],
                    null,
                    (_,error) => console.error(error)
                )
            }, null)
            this.state.lastTime = newChat.Time; // (정상현) 코드
            this.chatLogAdd(newChat)
        }

        this.socket.on('RECEIVE_QUIZ', function(quiz){
            receivePopQuiz(quiz.question, quiz.answer);
        })

        receivePopQuiz= (question, answer)=>{ // 서버로부터 팝퀴즈 받으면 DB에 넣는 작업
            const newQuiz = {
                user_email: 'PopQuizBot',
                cr_id: this.state.cr_id,
                Time: Date(),
                message: question,
                answer: answer,
            }
            db_chatLogAdd(newQuiz)
        }

    };

    state = {
        cr_id: '',
        cr_name: '',
        message: '',
        myEmail: '',
        myLanguage: '',
        CRsection: '',
        favorite: undefined,
        chatLog:[], // 채팅로그
        userlist:[], // 유저 목록
        user_image: [],
        token: '',
        autoTrans: true,
        key: 0,
        lastTime :'', // (정상현) 뿌잉뿌잉
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        const { navigation } = this.props;
        this.state.cr_id = navigation.getParam('cr_id', '-1'),
        this.state.cr_name = navigation.getParam('cr_name', 'No cr_name')
        this.state.memNum = navigation.getParam('memNum', '?')
        this.state.myEmail = navigation.getParam('myEmail', '');
        this.state.myNickname = navigation.getParam('myNickname', '');
        this.state.myLanguage = navigation.getParam('myLanguage', 'en');
        this.state.CRsection = navigation.getParam('section', 'No section');
        this.state.favorite = navigation.getParam('favorite', undefined);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.socket.emit('JOIN_ROOM', {cr_id:this.state.cr_id, myEmail:this.state.myEmail})
        this._getParticipants();
    }

    componentDidMount() {
        this.db_readChatLog();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    renderDrawer = () => {
        return (
            <View>
                <ChatroomSideMenu
                    goBack={() => this.props.navigation.goBack(null)}
                    exitCR={() => this.props.navigation.state.params.exitChatRoom(this.state.cr_id)}
                    sendImage={(url => this.sendImage(url))}
                    userlist={this.state.userlist}
                    cr_id={this.state.cr_id}
                    favorite={this.state.favorite}/>
            </View>
        );
    };

    _onPressSend () {
        this.messageInput.current._root.clear();
        if (this.state.message.length != 0){
            const newChat = {
                user_email: this.state.myEmail,
                cr_id: this.state.cr_id,
                Time: Date(),
                message: this.state.message,
            }
            this.socket.emit('SEND_MESSAGE', newChat);
            db_chatLogAdd(newChat)
        }
    }

    sendImage (url) {
        const newChat = {
            user_email: this.state.myEmail,
            cr_id: this.state.cr_id,
            Time: Date(),
            message: url,
            answer: '#image'
        }
        this.socket.emit('SEND_MESSAGE', newChat);
        db_chatLogAdd(newChat)
    }

    _sendPopQuizWon = (answer) => { // TODO : 임시로 만든 함수입니다. 이후 팝퀴즈 연동이 완성되면 반드시 삭제해주세요.
        const correctAlert = {
            user_email: 'PopQuizBot',
            cr_id: this.state.cr_id,
            Time: Date(),
            message: '🏆 '+this.state.myNickname+' got the right answer! The correct answer is '+answer+'.',
        }
        this.socket.emit('SEND_MESSAGE', correctAlert);
    }

    _getParticipants() {
        var url = 'http://101.101.160.185:3000/chatroom/participants/'+this.state.cr_id;
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            }),
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            this.setState({userlist: responseJson}),
            this.setImages(this.state.userlist);
            this.db_cr_memNumUpdate(responseJson.length)
        })
    }
    setImages(userlist){
        for(var i=0; i<userlist.length; i++){
            var email = userlist[i].email;
            var img_path = userlist[i].img_path;
            
            this.setState({
                user_image: [...this.state.user_image, {email, img_path}],
            })
        }
    }
    db_cr_memNumUpdate = (new_memNum) => {      // DB에 바뀐 인원 수 저장 
        db.transaction(tx => {
            tx.executeSql(  
                'UPDATE crList SET memNum = ? WHERE cr_id = ?',
                [new_memNum, this.state.cr_id],
                null,
                (_,error) => console.error(error)
            )
        })
    }

    db_readChatLog = () => {   // DB 내의 채팅 로그 읽어오기
        db.transaction( tx => {
            tx.executeSql(
                'SELECT * FROM chatLog WHERE cr_id = ? LIMIT 200',  //  일단 200개만 읽어오도록
                [this.state.cr_id],
                (_, { rows: { _array }  }) => {
                    if(_array.length){ /* (정상현) TODO : 처음 들어간 뒤 아무 말도 안하고 나갔을 경우는 어떻게 할지 예외 처리
                                        *  방 들어감 -> 바로 나감(방에 입장된 상태) -> 다른 사람들이 채팅을 침 -> 로컬에는 저장 안된 상태기 때문에
                                        *  이프문을 통과할 수 없음 -> 서버에서 최근 채팅 기록을 받아올 수 없음
                                        */
                        _array.map((chat) => {
                            chat.thumbnailURL = this.findImage(chat.user_email);
                        })
                        this.setState({ chatLog: _array })
                        this.state.lastTime = _array[_array.length - 1].Time; // (정상현) 가장 최근에 있는 채팅 메세지의 시간을 저장함
                        this.getRecentChatList(); // (정상현) 가장 최근 시간 이후에 채팅 온 메세지들을 불러옴
                    }
                },
                (_,error) => console.error(error)
            )
        },(error) => console.error(error)
        )
    };
    
    getRecentChatList(){ // (정상현) 가장 최근 시간 이후에 채팅 온 메세지들을 불러옴
        var url = 'http://101.101.160.185:3000/chatroom/log';
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            }),
            body:JSON.stringify({
                cr_id: this.state.cr_id,
                last_message: this.state.lastTime
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => { 
            if(responseJson.chatlog.length) this.db_recentChatLogAdd(responseJson._id, responseJson.chatlog);
        })
    }

    db_recentChatLogAdd(cr_id, chatlog){ // (정상현) 최근 채팅 디비에 저장하기
        for(var i=0; i<chatlog.length; i++){
            var chat = chatlog[i];
            chat.Time = chat.time;
            this.db_add(cr_id, chat, chatlog.length, i);
        }
    }

    db_add(cr_id, chat, length, i){ /* (정상현) 포문 안에서 디비에 저장 안되서 함수로 따로 빼버림. db_chatLogAdd와 비슷함.
                                    *         TODO : 하나 하나 저장하고 렌더 해주는 방식이기 때문에 새로운 채팅 올라오는 부분이 굉장히 느림. 개선할 필요가 있음
                                    */
        db.transaction( tx => {
            tx.executeSql(
                'INSERT INTO chatLog (user_email, cr_id, Time, message, transMessage, answer) values (?, ?, ?, ?, ?, ?);',
                [chat.user_email, cr_id, chat.time, chat.message, chat.message, chat.answer], // TODO : transMessage 넣기 (정상현)
                () => {this.chatLogAdd(chat)},
                null,   // sql문 실패 에러
            )
        },null)

        if(i == length-1){
            db.transaction(tx => {
                tx.executeSql(  
                'UPDATE crList SET lastMessage = ?, lastTime = ? WHERE cr_id = ?',
                    [chat.message, chat.time, this.state.cr_id],
                    null,
                    (_,error) => console.error(error)
                )
            }, null)
        }  
    }

    chatLogAdd = (newChat) => {
        if (this.state.chatLog[this.state.chatLog.length-1] == newChat) return  // 중복된 메시지가 서버에서 전송될 때
        var img_path = this.findImage(newChat.user_email);
        newChat.thumbnailURL = img_path;
        this.setState({
            chatLog: [...this.state.chatLog, newChat],
        })
    }

    _goBack = () => {    // 전 화면을 리로드하며 goback을 묶어서 수행하는 함수
        this.socket.emit('LEAVE_ROOM');
        this.props.navigation.state.params.onNavigateBack(this.state.cr_id)
        this.props.navigation.goBack()
    }
    findImage(email){
        var images = this.state.user_image;

        for(var i=0; i<images.length; i++){
            if(images[i].email == email){
                return images[i].img_path;
            }  
        }
    }

    render() {
        return (
            <DrawerLayout
                ref={ drawer => this.drawer = drawer }
                drawerWidth={screenWidth*0.6}
                drawerPosition={DrawerLayout.positions.Right}
                drawerType='front'
                drawerBackgroundColor="#555"
                renderNavigationView={this.renderDrawer}>
                <View style={style.header}>
                    <Left>
                        <TouchableOpacity onPress={() => {this._goBack()}}>
                            <Icon name='md-arrow-round-back' style={{color: '#999', fontSize: 30}}/>
                        </TouchableOpacity>
                    </Left>
                    <View style={{justifyContent: 'flex-start'}}>
                        <Text style={[style.font_header]}>{this.state.cr_name}
                            <Text style={{fontSize:15, color: '#ee0'}}>  {this.state.userlist.length}</Text>
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
                        {this.state.chatLog.map( chat => (chat.user_email == this.state.myEmail    // 말풍선 만들기
                            ? (<View key={this.state.key++} style={style.my_chat}>
                                <Chatbox_my data={chat}/>
                            </View>)
                            : ( chat.user_email == 'notice' 
                                ? (<View key={this.state.key++} style={style.notice_chat}>
                                    <Chatbox_notice data={chat}/>
                                </View>)
                                : ( chat.user_email != 'PopQuizBot' 
                                    ? (<View key={this.state.key++} style={style.other_chat}>
                                        <Chatbox_other data={chat} userList={this.state.userlist} section={this.state.CRsection}/>
                                    </View>)
                                    : (<View key={this.state.key++} style={style.other_chat}>
                                        <Chatbox_quizbot data={chat} _sendPopQuizWon={this._sendPopQuizWon}/>
                                    </View>)
                                )
                            )
                        ))}
                    </ScrollView>
                    <View style={style.inputPlace}>
                        <Input onChangeText={(message) => this.setState({message})}
                            ref={this.messageInput}
                            onSubmitEditing={() => this._onPressSend()}  // 엔터눌러도 입력되도록 함
                            value={this.state.message}
                            placeholder='Enter message'
                            style={{fontSize: 16}}/>
                        <TouchableOpacity onPress={() => this._onPressSend()}>
                            <Icon name='md-send' style={{color: '#555', fontSize: 30}}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </DrawerLayout>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width:'100%',
        height: 78,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight+5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 8,
        backgroundColor: '#333',
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
    notice_chat: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    inputPlace: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        paddingRight: 10,
        paddingLeft: 10,
        borderWidth: 0,
    },
    font_main: {
        color: '#aaa',
        fontSize: 20,
        alignItems: 'center',
    },
});