import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Icon, Thumbnail } from 'native-base';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Chatroom_SideMenu extends Component {
    constructor(props){
        super(props);
        this.state={
            favorite: this.props.favorite,
            notification: true,
            key: 0,
        }
    }

    _onPressFavorite() {
        if(this.state.favorite == undefined || this.state.favorite == null || this.state.favorite == 0) {
            this.setState({favorite: 1})
            this.db_changeFavorite(1)
        } else {
            this.setState({favorite: 0})
            this.db_changeFavorite(0)
        }
    
    }

    db_changeFavorite = (state) => {
        db.transaction(tx => {
            tx.executeSql(  
                'UPDATE crList SET favorite = ? WHERE cr_id = ?',
                [state, this.props.cr_id],
                null,
                (_,error) => console.error(error)
            )
        })
    }

    _onPressNoti() {
        this.setState({
            notification: !this.state.notification
        })
    }
    _onPressExit = () => {
        this.props.goBack()
    }
    _onPressPicture() {
        alert("You pressed Picture.")
    }
    _onPressRecom() {
        alert("You pressed Recom.")
    }
    _onPressCamera() {
        alert("You pressed Camera.")
    }

    render() {
        this.userlist = this.props.userlist
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <View style={style.iconBox}>
                        <TouchableOpacity onPress={() => this._onPressFavorite()}>
                                {this.state.favorite == 1
                                    ?<Icon name='md-star' style={style.icon}/>
                                    :<Icon name='md-star-outline' style={style.icon}/>
                                }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressNoti()}>
                                {this.state.notification == true
                                    ?<Icon name='md-notifications' style={style.icon}/>
                                    :<Icon name='md-notifications-off' style={style.icon}/>
                                }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressExit()}>
                            <Icon name='md-exit' style={style.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={style.toolBox}>
                        <TouchableOpacity onPress={() => this._onPressCamera()}>
                            <View style={style.tool}>
                                <Icon name='md-camera' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Camera</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressPicture()}>
                            <View style={style.tool}>
                                <Icon name='md-images' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Pictures</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressRecom()}>
                            <View style={style.tool}>
                                <Icon name='md-locate' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Place Recommend</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.userList}>
                        <ScrollView>
                            {this.userlist.map( user => (user.thumbnailURL == null || user.thumbnailURL == ''
                                ? (<View style={style.user} key={this.state.key++}>
                                    <Thumbnail backgroundColor="#fff" style={style.user_thumbnail}
                                        source={require('../../assets/default_thumbnail.png')}/>
                                    <Text style={style.user_name}>{user.nickname}</Text>
                                    </View>
                                ) : (<View style={style.user} key={this.state.key++}>
                                    <Thumbnail backgroundColor="#fff" style={style.user_thumbnail}
                                        source={{ uri: this.state.thumbnailURL }}/>
                                    <Text style={style.user_name}>{user.nickname}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: screenWidth*0.6,
        justifyContent: 'flex-start',
        backgroundColor: '#444',
    },
    content: {
        width: '100%',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBox: {
        width: '100%',
        height: 80,
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        borderBottomWidth: 2,
        borderBottomColor: '#555',
    },
    icon: {
        color: '#ddd',
        fontSize: 50,
    },
    toolBox: {
        width: '100%',
        height: 240,
        paddingLeft: 15,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        borderBottomColor: '#555',
    },
    tool: {
        marginTop: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tool_icon: {
        color: '#ddd',
        fontSize: 45,
    },
    tool_text: {
        color: '#ddd',
        fontSize: 25,
    },
    userList: {
        width: '100%',
        height: screenHeight-80-240-90, //iconbox height - toolbox height - 105
        paddingTop: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    user: {
        width: screenWidth*0.6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
    },
    user_thumbnail: {
        height: 44,
        width: 44,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 44*0.4,
    },
    user_name: {
        color: '#ddd',
        fontSize: 24,
        paddingBottom: 1,
    },
})