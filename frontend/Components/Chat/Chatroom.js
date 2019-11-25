import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions, YellowBox, BackHandler} from 'react-native';
import {Icon, Input, Left, Right} from 'native-base';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import Chatbox_my from './chatbox/mychat';
import Chatbox_other from './chatbox/otherchat';
import Chatbox_quizbot from './chatbox/quizbot';
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
                if (data.user_email == this.state.myEmail || data.user_email == 'PopQuizBot') {
                    db_Add(data);
                } else {
                    translate(data, responseJson.langCode);
                }
            })
        }

        translate = (data, code) =>{
            var url = 'https://openapi.naver.com/v1/language/translate';
            fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'token': 'token',
                    'X-Naver-Client-Id': 'ejNDp9aQ1y_evnFX0gTg',
                    'X-Naver-Client-Secret': 'E1xo6lz3Yx'
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
                    db_Add(data);
                } else {
                    data.transMessage = responseJson.message.result.translatedText;
                    db_Add(data);
                }
            })
        }

        db_Add = (newChat) => {
            this.chatLogAdd(newChat)
            db.transaction( tx => {
                tx.executeSql(
                    'INSERT INTO chatLog (user_email, cr_id, Time, message, transMessage, answer) values (?, ?, ?, ?, ?, ?);',
                    [newChat.user_email, newChat.cr_id, newChat.Time, newChat.message, newChat.transMessage, newChat.answer],
                    null,
                    null   // sql문 실패 에러
                );
            },null)          // 트랜젝션 에러
            db.transaction(tx => {
                tx.executeSql(  
                    'UPDATE crList SET lastMessage = ?, lastTime = ? WHERE cr_id = ?',
                    [newChat.message, newChat.Time, this.state.cr_id],
                    null,
                    (_,error) => console.error(error)
                )
            })
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
            db_Add(newQuiz)
            console.log(newQuiz)
        }
    };

    state = {
        cr_id: '',
        cr_name: '',
        message: '',
        myEmail: '',
        myLanguage: '',
        favorite: undefined,
        chatLog:[], // 채팅로그
        userlist:[], // 유저 목록
        token: '',
        key: 0,
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
        this.state.favorite = navigation.getParam('favorite', undefined);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.socket.emit('JOIN_ROOM', {cr_id:this.state.cr_id, myEmail:this.state.myEmail})
        this.db_read_chatLog();
    }

    componentDidMount() {
        this._getParticipants();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    renderDrawer = () => {
        return (
            <View>
                <ChatroomSideMenu goBack={() => this.props.navigation.goBack(null)} userlist={this.state.userlist} cr_id={this.state.cr_id} favorite={this.state.favorite}/>
            </View>
        );
    };

    _onPressSend(){
        this.messageInput.current._root.clear();
        if (this.state.message.length != 0){
            const newChat = {
                user_email: this.state.myEmail,
                cr_id: this.state.cr_id,
                Time: Date(),
                message: this.state.message,
            }
            this.setState({message: ''});    
            this.socket.emit('SEND_MESSAGE', newChat);
        }
    }

    _sendPopQuizWon = (answer) => { // 임시로 만든 함수입니다. 이후 팝퀴즈 연동이 완성되면 반드시 삭제해주세요.
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
            this.db_cr_memNumUpdate(responseJson.length)
        })
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

    db_read_chatLog = () => {        // DB 내의 채팅 로그 읽어오기
        db.transaction( tx => {
            tx.executeSql(
                'SELECT * FROM chatLog WHERE cr_id = ? LIMIT 200',  //  일단 200개만 읽어오도록
                [this.state.cr_id],
                (_, { rows: { _array }  }) => this.setState({ chatLog: _array }),
                (_,error) => console.error(error)
            )
        },(error) => console.error(error)
        )
    };

    chatLogAdd = (newChat) => {
        this.setState({
            chatLog: [...this.state.chatLog, newChat],
        })
    }

    handleBackButton = () => {  // 뒤로가기 누르면 전 탭으로 돌아감
        this._goBack()
    };

    _goBack = () => {    // 전 화면을 리로드하며 goback을 묶어서 수행하는 함수
        this.props.navigation.state.params.onNavigateBack(this.state.cr_id)
        this.props.navigation.goBack()
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
                            : ( chat.user_email != 'PopQuizBot' 
                                ? (<View key={this.state.key++} style={style.other_chat}>
                                    <Chatbox_other data={chat}/>
                                </View>)
                                : (<View key={this.state.key++} style={style.other_chat}>
                                    <Chatbox_quizbot data={chat} _sendPopQuizWon={this._sendPopQuizWon}/>
                                </View>)
                            )
                        ))}
                    </ScrollView>
                    <View style={style.inputPlace}>
                        <Input onChangeText={(message) => this.setState({message})}
                            ref={this.messageInput}
                            onSubmitEditing={() => {this._onPressSend();}}  // 엔터눌러도 입력되도록 함
                            value={this.state.message}
                            placeholder='Enter message'
                            style={{marginLeft: 6, fontSize: 16}}/>
                        <TouchableOpacity onPress={() => this._onPressSend()}>
                            <Icon name='md-send' style={{color: '#555', marginRight: 10, fontSize: 30}}/>
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
        paddingTop: 30,
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
    inputPlace: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        borderWidth: 0,
    },
    font_main: {
        color: '#aaa',
        fontSize: 20,
        alignItems: 'center',
    },
});
