import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, Alert, ScrollView } from 'react-native';
import { Icon, ListItem, List } from 'native-base';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

export default class SettingTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-settings' style={{color: "#646464"}} />
        ),
    }

    constructor(props){
        super(props);
        this.state = {
            contect: [
                {icon :"md-text", name: "Contect Us", key: "contect"},
            ], config: [
                {icon :"md-document", name: "Clear Chating Logs", key: "deleteChatLog"},
                {icon :"md-exit", name: "Log Out", key: "logout"},
                {icon :"md-log-out", name: "Close my account", key: "leave"},
            ]
        }
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
                            'DELETE FROM token',
                            [],
                            null,
                            (_,error) => console.error(error)
                        ),
                        tx.executeSql(
                            'DELETE FROM userInfo',
                            [],
                            null,
                            (_,error) => console.error(error)
                        ),
                        tx.executeSql(
                            'DELETE FROM crList',
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
        Linking.openURL('http://google.com');
        // todo: 이후 연락 가능한 페이지로 연동
    }

    onPressLeave() {
        alert("you press Leave");
        // todo: 회원탈퇴 api 연동
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
                        ),
                        tx.executeSql(
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

    _renderItem = (item) => {
        return (
            <ListItem style={style.menu} key={item.key}  onPress={() => this._onPress(item.key)}>
                <Icon style={style.icon_menu} name={item.icon}/>
                <Text style={style.font_menu}>{item.name}</Text>
            </ListItem>
        )
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <ScrollView style={{width: '100%'}}>
                        <List>
                            <ListItem itemDivider style={style.first_divider} key={'A'}>
                                <Text style={style.font_divider}>Contact</Text>
                            </ListItem>       
                            {this.state.contect.map( item => this._renderItem(item))}
                            <ListItem itemDivider style={style.divider} key={'B'}>
                                <Text style={style.font_divider}>Account Management</Text>
                            </ListItem>
                            {this.state.config.map( item => this._renderItem(item))}
                        </List>
                    </ScrollView>
                </View>
            </View>
        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
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
    first_divider: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 3,
        borderColor: "#bbb",
        backgroundColor: '#eee',
        paddingLeft: 15,
        alignItems: 'center',
    },
    divider: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 3,
        borderColor: "#bbb",
        backgroundColor: '#eee',
        marginTop: 20,
        paddingLeft: 15,
        alignItems: 'center',
    },
    font_divider: {
        fontSize: 25,
        color: "#000",
    },
    menu: {
        width: '100%',
        borderBottomWidth: 2,
        borderColor: "#bbb",
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon_menu: {
        width: 38,
        fontSize: 24,
        color: "#555",
        justifyContent: 'center',
    },
    font_menu: {
        fontSize: 20,
        color: "#444",
    },
});