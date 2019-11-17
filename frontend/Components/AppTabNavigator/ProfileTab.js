import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { Icon, Thumbnail } from 'native-base';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

const screenHeight = Math.round(Dimensions.get('window').height);

export default class ProfileTab extends Component {
    state = {
        myEmail: '',
        myNickname: 'My nickname',
        myThumbnailURL: 'https://search4.kakaocdn.net/argon/600x0_65_wr/CPagPGu3ffd', // 이후 기본 URL로 연동해야함.
        isAlertVisible: false,
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-person' style={{color: tintColor}}/>
        ),
    }

    componentWillMount() {
        db.transaction(tx => {
            tx.executeSql(  // token에서 user_email 읽어오기
                'SELECT user_email FROM token',
                [],
                (_, { rows: { _array }  }) =>     
                    (_array != []) ? this.setState({myEmail: _array[0].user_email}) :
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
    }

    _changeNickname = (inputText) => {
        this.setState({myNickname: inputText})
        alert("Changed! (이후 서버로 보내야함)")
    }

    _onPressThumbnail() {
        alert("you pressed Thumbnail Edit.")
    }

    _onPressStatusMessage() {
        alert("you pressed Status Message Edit.") // 상메 안쓰니 곧 대체될 컴포넌트
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
                    <View style={{justifyContent: 'center', width: '80%', flexDirection:'row', alignItems: 'flex-end'}}> 
                        <Text style={style.font_header}>여기엔 뭐넣을지 추천좀;{"\n"}빈칸 너무 어색할거같은뎅ㅜ</Text>
                        <TouchableOpacity
                            onPress= {() => this._onPressStatusMessage()}>
                            <Icon name='md-create' style={{fontSize: 25, margin: 10, color: 'white'}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.downsideContainer}>
                    <View style={{flexDirection:'row', alignItems: 'flex-end', marginLeft: 25}}> 
                        <Text style={style.font_nickname}>{this.state.myNickname}</Text>
                        <TouchableOpacity onPress= {() => this.setState({isAlertVisible: true})}>
                            <Icon name='md-create' style={{fontSize: 25, margin: 10, color: 'white'}} />
                        </TouchableOpacity>
                    </View>
                    <Text style={style.font_email}>{this.state.myEmail}</Text>
                </View>
                <TouchableOpacity
                    style={style.thumbnailContainer}
                    onPress= {() => this._onPressThumbnail()}
                    activeOpacity= {0.8}>
                    <Thumbnail circle backgroundColor="#fff" style={style.thumbnail}
                        source={{ uri: this.state.myThumbnailURL }}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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
        paddingTop: 110,
        backgroundColor: '#555',
        alignItems: 'center',
    },
    thumbnailContainer: {
        flex: 2,
        position : 'absolute',
        top: '50%',
    },
    thumbnail: {
        height: screenHeight*0.2,
        width: screenHeight*0.2,
        borderWidth: 4,
        borderColor: '#333',
        borderRadius: (screenHeight*0.2)*0.4,
    },
    font_nickname: {
        color: '#ddd',
        fontSize: 40,
        fontWeight: 'bold',
    },
    font_email: {
        color: '#ddd',
        fontSize: 24,
    },
});