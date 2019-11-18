import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Alert } from 'react-native';
import { Icon } from 'native-base';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

export default class SettingTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-settings' style={{color: tintColor}} />
        ),
    }

    constructor(props){
        super(props);
        this.state = {
            data : [
                {icon :"md-text", name: "Contect Us", key: "contect"},
                {icon :"md-document", name: "Clear Chating Logs", key: "deleteChatLog"},
                {icon :"md-exit", name: "Log Out", key: "logout"},
                {icon :"md-log-out", name: "Close my account", key: "leave"},
            ]
        }
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(item.key)}>
                <View style={style.menu}>
                    <Icon style={style.icon_menu} name={item.icon}/>
                    <Text style={style.font_menu}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _onPress(key) {
        if (key == "logout") {
            this.onPressLogout()
        } else if (key == "contect") {
            this.onPressContect()
        } else if (key == "leave") {
            this.onPressLeave()
        } else if (key == "deleteChatLog") {
            this.onPressDeleteChatLog()
        }
    }

    onPressLogout() {
        Alert.alert(
            'Really?',
            'Press the Logout button to log out.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'LogOut', onPress: () => {
                    db.transaction(tx => {
                        tx.executeSql(
                            'DROP TABLE token',
                            [],
                            null,
                            (_,error) => console.error(error)
                        )
                    },(error) => console.error(error))
                    RootNavigator('Loading')
                }},
            ],
            {cancelable: false},
        );
    }
    
    onPressContect() {
        Linking.openURL('http://google.com');   // 이후 연락 가능한 페이지로 연동해야함
    }

    onPressLeave() {
        alert("you press Leave");
    }

    onPressDeleteChatLog() {
        Alert.alert(
            'Really?',
            'Press OK to delete all chat logs.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    db.transaction(tx => {
                        tx.executeSql(
                            'DROP TABLE chatLog',
                            [],
                            null,
                            (_,error) => console.error(error)
                        )
                        tx.executeSql(          // chatlog 저장하는 table 생성하기
                            'CREATE TABLE if not exists chatLog (user_email TEXT NOT NULL, cr_id INTEGER NOT NULL, Time TEXT NOT NULL, message TEXT NOT NULL, answer TEXT, PRIMARY KEY("user_email","cr_id","Time"))',
                            [],
                            null,
                            (_,error) => console.error(error)
                        )
                    },(error) => console.error(error))
                    alert('All chat logs have been removed.')
                }},
            ],
            {cancelable: false},
        );
    }

    
    render() {
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderItem}
                        onEndReachedThreshold={1}/>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#333',
    },
    font_header: {
        color: 'white',
        fontSize: 42,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    menu: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#333",
        alignItems: 'center',
    },
    icon_menu: {
        width: 38,
        marginLeft: 18,
        fontSize: 28,
        color: "#ddd",
        justifyContent: 'center',
    },
    font_menu: {
        fontSize: 25,
        color: "#eee",
    },
});