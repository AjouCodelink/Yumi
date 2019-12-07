import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
            token: '',
            myEmail: '',
        }
    }

    componentWillMount() {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM token',
                [],
                (_, { rows: { _array }  }) => {
                    if(_array != []) (
                        this.setState({
                            myEmail: _array[0].user_email, 
                            token: _array[0].access_token
                        })
                    )
                },
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
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
        Alert.alert(
            'Exit?',
            'Press the OK button to exit this chat room.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    this.props.exitCR();
                    this.props.goBack();
                }},
            ],
            {cancelable: false},
        );
    }

    _onPressPicture = async () => {
        let photo = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });
        if (!photo.cancelled) {
            const newPhoto = new FormData();
            newPhoto.append("file", {
                name: this.state.myEmail+'.jpg',
                type: "image/jpeg",
                uri: photo.uri
            });
            this._uploadImage(newPhoto);
        }
    };

    _onPressCamera() {
        alert("You pressed Camera.")
    }

    _uploadImage = (file) => {
        var url = 'http://101.101.160.185:3000/images/upload';
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'multipart/form-data',
                'x-access-token': this.state.token
            }),
            body: file
        }).then(response => response.json())
        .catch(error => console.error(error))
        .then(responseJson => {
            this.props.sendImage(responseJson.filename)
        })
    }

    render() {
        this.userlist = this.props.userlist;
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
                    </View>
                    <View style={style.userList}>
                        <ScrollView>
                            {this.userlist.map( user => (user.img_path == null || user.img_path == ''
                                ? (<View style={style.user} key={this.state.key++}>
                                    <Thumbnail backgroundColor="#fff" style={style.user_thumbnail}
                                        source={require('../../assets/default_thumbnail.png')}/>
                                    <Text style={style.user_name}>{user.nickname}</Text>
                                    </View>
                                ) : (<View style={style.user} key={this.state.key++}>
                                    <Thumbnail backgroundColor="#fff" style={style.user_thumbnail}
                                        source={{ uri: 'http://101.101.160.185:3000/images/' + user.img_path}}/>
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