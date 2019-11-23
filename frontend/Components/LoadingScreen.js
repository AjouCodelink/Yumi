import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Spinner } from 'native-base';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

export default class LoadingScreen extends Component {
    static navigationOptions = {    // 상단바 안보이게 하기
        header: null
    }

    constructor(props){
        super(props);
        db.transaction(tx => {
            tx.executeSql(          // token 저장하는 table 생성하기
                'CREATE TABLE if not exists token (access_token TEXT NOT NULL, user_email TEXT NOT NULL, PRIMARY KEY("access_token"))',
                [],
                null,
                (_,error) => console.error(error)
            ),
            tx.executeSql(          // userInfo 저장하는 table 생성하기 // 이메일, 닉네임, 주소, 언어, 프사URL
                'CREATE TABLE if not exists userInfo (email TEXT NOT NULL, nickname TEXT NOT NULL, address TEXT NOT NULL, language TEXT NOT NULL, thumbnailURL TEXT, PRIMARY KEY("email"))',
                [],
                null,
                (_,error) => console.error(error)
            ),
            tx.executeSql(          // 채팅방 목록 저장하는 table 생성하기 // 채팅방ID, 채팅방이름, 대분류, 소분류, 인원, 마지막 메세지, 마지막 메세지 시간
                'CREATE TABLE if not exists crList (cr_id TEXT NOT NULL, cr_name TEXT NOT NULL, section TEXT NOT NULL, _group TEXT NOT NULL, memNum INTEGER, lastMessage TEXT, lastTime TEXT, PRIMARY KEY("cr_id"))',
                [],
                null,
                (_,error) => console.error(error)
            ),
            tx.executeSql(          // 채팅 로그 저장하는 table 생성하기 /// 말한 사람 이메일, 채팅방 ID, 시간, 메세지, (팝퀴즈일경우)정답
                'CREATE TABLE if not exists chatLog (user_email TEXT NOT NULL, cr_id INTEGER NOT NULL, Time TEXT NOT NULL, message TEXT NOT NULL, answer TEXT, PRIMARY KEY("user_email","cr_id","Time"))',
                [],
                null,
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
    }

    componentWillMount(){
        db.transaction(tx => {
            tx.executeSql(          // token 확인
                'SELECT * FROM token',
                [],
                (_, { rows: { _array }  }) => {
                    (_array.length)
                    ? this.goMain()        // db에 토큰이 있으면 메인으로
                    : this.goTitle()       // 없으면 타이틀로
                },
                (_,error) => console.error(error)
            );
        },(error) => console.error(error))
    }

    goMain(){
        this.props.navigation.navigate('Main');
    }
    goTitle(){
        this.props.navigation.navigate('Title');
    }

    render() {
        return (
            <View style={style.container}>
                <Spinner size={80} style={{display:'flex', flex: 3, position: "absolute"}}color='#ddd'/>
                <Text style={style.loadingFont}>Loading</Text>
                <TouchableOpacity style={style.stopClick} onPress={() => this.goTitle()}>
                    <Text style={style.stopClickFont}>If screen frozen, press here.</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '15%',
        backgroundColor: '#444',
    },
    loadingFont: {
        fontSize: 35,
        color: '#ddd',
        fontWeight: 'bold',
    },
    stopClick: {
        flex: 2,
        position : 'absolute',
        bottom: '25%',
    },
    stopClickFont: {
        fontSize: 20,
        color: '#aaa',
    },
});
