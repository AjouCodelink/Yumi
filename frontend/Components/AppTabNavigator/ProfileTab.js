import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DialogInput from 'react-native-dialog-input';
import { Icon, Thumbnail, Spinner } from 'native-base';
import axios from 'axios';
import * as Permissions from 'expo-permissions';

//import EditAddress from './ProfilePopup/EditAddress'
import EditInterest from './ProfilePopup/EditInterest'
import EditLanguage from './ProfilePopup/EditLanguage'

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');
const screenHeight = Math.round(Dimensions.get('window').height);
export default class ProfileTab extends Component {
    state = {
        myEmail: '',
        myNickname: '',
        myAddress: '',
        myLanguage: '',
        myThumbnailURL: null, // 이후 기본 URL로 연동해야함.
        isAlertVisible: false,
        token: '',
        spinnerDisplay: 'flex',
        editAddrDisplay: 'none',
        editInterDisplay: 'none',
        editLangDisplay: 'none',
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-person' style={{color: "#00D8FF"}}/>
        ),
    }

    componentWillMount() {
        db.transaction(tx => {
            tx.executeSql(  // token에서 user_email 읽어오기
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
            ),
            tx.executeSql(  // userInfo에서 정보
                'SELECT * FROM userInfo',
                [],
                (_, { rows: { _array }  }) => {
                    if(_array != []) (
                        this.setState({
                            myNickname: _array[0].nickname,
                            myAddress: _array[0].address,
                            myLanguage: _array[0].language,
                            myThumbnailURL: _array[0].thumbnailURL, //이후 썸네일 구현되면 연동
                            spinnerDisplay: 'none',
                        })
                    )
                },
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
    }

    _changeNickname = (newNickname) => {
        var url = 'http://101.101.160.185:3000/user/profile/nickname/'+newNickname;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.state.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {this.setState({myNickname : responseJson.nickname}),
            db.transaction(tx => {
                tx.executeSql(  // DB에 바뀐 닉네임 저장
                    'UPDATE userInfo SET nickname = ?',
                    [responseJson.nickname],
                    null,
                    (_,error) => console.error(error)
                )
            })
        })
    }

    _onPressThumbnail() {
        this._pickImage()
        alert("you pressed Thumbnail Edit.")
    }

    _pickImage = async () => {
        let photo = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });
        if (!photo.cancelled) {
            const newPhoto = new FormData();
            
            newPhoto.append("file", {
                name: 'photo.jpg',
                type: "image/jpeg",
                uri: photo.uri
            });
            
            this._uploadImage(newPhoto);
        }
    };

    _uploadImage = (file) => {
        var url = 'http://101.101.160.185:3389/images/upload'; // 프로필 사진 서버에 업로드 시켜주는 코드
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'multipart/form-data',
                'x-access-token': this.state.token
            }),
            body:file
        }).then(response => response.json())
        .catch(error => console.error(error))
        .then(responseJson => {console.log(responseJson)})
        
    }

    _displayAddr = (display) => {
        this.setState({editAddrDisplay: display})
    }

    _displayInter = (display) => {
        this.setState({editInterDisplay: display})
    }

    _displayLang = (display) => {
        this.setState({editLangDisplay: display})
    }

    render() {
        return (
            <View style={style.container}>
                <DialogInput
                    isDialogVisible = {this.state.isAlertVisible}
                    title={"Change Nickname"}
                    message={'Now your nickname is ['+this.state.myNickname+']'}
                    hintInput ={"New Nickname"}
                    submitInput={ (inputText) => {this._changeNickname(inputText), this.setState({isAlertVisible:false})}}
                    closeDialog={ () => {this.setState({isAlertVisible:false})} }/>
                <View style={style.topsideContainer}>
                    {(this.state.myThumbnailURL == 'img_path' || this.state.myThumbnailURL == null)
                    ? <Image style={{height:'100%', width:'100%', opacity: 0.2, resizeMode:'cover'}} source={require('../../assets/default_thumbnail.png')}/>
                    : <Image style={{height:'100%', width:'100%', opacity: 0.2, resizeMode:'cover'}} source={{ uri: this.state.myThumbnailURL }}/>}
                </View>
                <View style={style.downsideContainer}>
                    <View style={{flexDirection:'row', alignItems: 'flex-end', marginLeft: 25}}> 
                        <Text style={style.font_nickname}>{this.state.myNickname}</Text>
                        <TouchableOpacity onPress= {() => this.setState({isAlertVisible: true})}>
                            <Icon name='md-create' style={{fontSize: 22, margin: 8, color: '#444'}} />
                        </TouchableOpacity>
                    </View>
                    <Text style={style.font_email}>{this.state.myEmail}</Text>
                </View>
                <View style={style.febContainer}>
                    {/*<TouchableOpacity style={{alignItems: 'center'}} onPress={() => this._displayAddr('flex')}>
                        <Icon name='md-pin' style={{fontSize: 32, margin: 4, color: '#444'}} />
                        <Text style={style.font_feb}>Address</Text>
                    </TouchableOpacity>*/}
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this._displayInter('flex')}>
                        <Icon name='md-cafe' style={{fontSize: 32, margin: 4, color: '#444'}} />
                        <Text style={style.font_feb}>Interests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this._displayLang('flex')}>
                        <Icon name='md-sync' style={{fontSize: 32, margin: 4, color: '#444'}} />
                        <Text style={style.font_feb}>Language</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={style.thumbnailContainer}
                    onPress= {() => this._onPressThumbnail()}
                    activeOpacity= {0.8}>
                    {(this.state.myThumbnailURL == 'img_path' || this.state.myThumbnailURL == null)
                    ? <Thumbnail backgroundColor="#ddd" style={style.thumbnail} source={require('../../assets/default_thumbnail.png')}/>
                    : <Thumbnail backgroundColor="#ddd" style={style.thumbnail} source={{ uri: this.state.myThumbnailURL }}/>}
                </TouchableOpacity>
                {/*<EditAddress token={this.state.token} displayChange={this._displayAddr} display={this.state.editAddrDisplay}/>*/}
                <EditInterest token={this.state.token} displayChange={this._displayInter} display={this.state.editInterDisplay}/>
                <EditLanguage token={this.state.token} displayChange={this._displayLang} display={this.state.editLangDisplay}/>
                <Spinner size={80} style={{display: this.state.spinnerDisplay, flex: 4, bottom: '50%'}} color='#555'/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    topsideContainer: {
        width: '100%',
        height: '60%',
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    font_header: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    downsideContainer: {
        width: '100%',
        height: '40%',
        paddingTop: screenHeight*0.11,
        borderTopWidth: 1,
        borderTopColor: '#222',
        backgroundColor: '#e8e8e8',
        alignItems: 'center',
    },
    thumbnailContainer: {
        flex: 2,
        position : 'absolute',
        top: '49%',
    },
    febContainer: {
        flex: 2,
        position : 'absolute',
        width: '80%',
        top: '88%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    font_feb: {
        color: '#333',
        fontSize: 14,
    },
    thumbnail: {
        height: screenHeight*0.2,
        width: screenHeight*0.2,
        borderWidth: 2,
        borderColor: '#222',
        borderRadius: (screenHeight*0.2)*0.4,
    },
    font_nickname: {
        color: '#222',
        fontSize: 40,
        fontWeight: 'bold',
    },
    font_email: {
        color: '#777',
        fontSize: 24,
    },
});