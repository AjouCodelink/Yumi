import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
import DialogInput from 'react-native-dialog-input';
import { Icon, Thumbnail, Spinner } from 'native-base';

import EditAddress from '../ProfileEdit/EditAddress'
import EditInterest from '../ProfileEdit/EditInterest'
import EditLanguage from '../ProfileEdit/EditLanguage'

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');
const screenHeight = Math.round(Dimensions.get('window').height);
export default class ProfileTab extends Component {
    state = {
        myEmail: '',
        myNickname: 'LOADING',
        myThumbnailURL: 'https://search4.kakaocdn.net/argon/600x0_65_wr/CPagPGu3ffd', // 이후 기본 URL로 연동해야함.
        isAlertVisible: false,
        token: '',
        spinnerOpacity: 1,
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
                        }),
                        this._getNickname()
                    )
                },
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
    }

    _getNickname() {
        var url = 'http://101.101.160.185:3000/user/profile';
        fetch(url, {
            method: 'GET',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'x-access-token': this.state.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {this.setState({myNickname : responseJson.nickname, spinnerOpacity: 0})})
    }//

    _changeNickname = (newNickname) => {
        this.setState({spinnerOpacity: 1})
        var url = 'http://101.101.160.185:3000/user/profile/nickname/'+newNickname;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.state.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {this.setState({myNickname : responseJson.nickname})})
        this.setState({spinnerOpacity: 0})
    }

    _onPressThumbnail() {
        this._pickImage()
        alert("you pressed Thumbnail Edit.")
    }

    // _pickImage = async () => {
    //     let photo = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //     });
    //     if (!photo.cancelled) {
    //         const newPhoto = new FormData();
    //         newPhoto.append('uri', photo.uri)
    //         newPhoto.append('name', this.state.myEmail+'_thumbnail.jpg')
    //         newPhoto.append('type', photo.type)
    //         //this._uploadImage(newPhoto)
    //         this.setState({ myThumbnailURL: result.uri });
    //     }
    // };

    _uploadImage = (newPhoto) => {
        var url = 'http://101.101.160.185:3000/user/profile/upload';
        fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            }),
            body: newPhoto
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
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
                    <Image
                        style={{height:'100%', width:'100%', opacity: 0.2, resizeMode:'cover'}}
                        source={{ uri: this.state.myThumbnailURL }}/>
                </View>
                <View style={style.downsideContainer}>
                    <View style={{flexDirection:'row', alignItems: 'flex-end', marginLeft: 25}}> 
                        <Text style={style.font_nickname}>{this.state.myNickname}</Text>
                        <TouchableOpacity onPress= {() => this.setState({isAlertVisible: true})}>
                            <Icon name='md-create' style={{fontSize: 22, margin: 8, color: 'white'}} />
                        </TouchableOpacity>
                    </View>
                    <Text style={style.font_email}>{this.state.myEmail}</Text>
                </View>
                <View style={style.febContainer}>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this._displayAddr('flex')}>
                        <Icon name='md-pin' style={{fontSize: 32, margin: 4, color: 'white'}} />
                        <Text style={style.font_feb}>Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this._displayInter('flex')}>
                        <Icon name='md-cafe' style={{fontSize: 32, margin: 4, color: 'white'}} />
                        <Text style={style.font_feb}>Interests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this._displayLang('flex')}>
                        <Icon name='md-sync' style={{fontSize: 32, margin: 4, color: 'white'}} />
                        <Text style={style.font_feb}>Language</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={style.thumbnailContainer}
                    onPress= {() => this._onPressThumbnail()}
                    activeOpacity= {0.8}>
                    <Thumbnail circle backgroundColor="#ddd" style={style.thumbnail}
                        source={{ uri: this.state.myThumbnailURL }}/>
                </TouchableOpacity>
                <EditAddress token={this.state.token} displayChange={this._displayAddr} display={this.state.editAddrDisplay}/>
                <EditInterest token={this.state.token} displayChange={this._displayInter} display={this.state.editInterDisplay}/>
                <EditLanguage token={this.state.token} displayChange={this._displayLang} display={this.state.editLangDisplay}/>
                <Spinner size={80} style={{opacity: this.state.spinnerOpacity, flex: 4, position: "absolute", bottom: '43%'}}color='#999'/>
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
        backgroundColor: '#333',
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
        backgroundColor: '#555',
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
        color: '#ddd',
        fontSize: 14,
    },
    thumbnail: {
        height: screenHeight*0.2,
        width: screenHeight*0.2,
        borderWidth: 4,
        borderColor: '#333',
        borderRadius: (screenHeight*0.2)*0.4,
    },
    font_nickname: {
        color: '#eee',
        fontSize: 40,
        fontWeight: 'bold',
    },
    font_email: {
        color: '#aaa',
        fontSize: 24,
    },
});