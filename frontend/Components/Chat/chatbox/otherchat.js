import React, { Component } from 'react';
import { ToastAndroid, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Thumbnail } from 'native-base';

const { height, width } = Dimensions.get('window');

export default class otherchat extends Component {
    constructor(props) {
        super(props);
        this.state={
            translated: true,
            nickname: '',
            thumbnailURL: '',
            email: this.props.data.user_email,
        }
        if (this.props.section == 'Exchanging Language') {
            this.state.translated= false
        }
        for (var i=0; i<this.props.userList.length; i++) {
            if (this.state.email == this.props.userList[i].email) {
                this.state.nickname = this.props.userList[i].nickname
                this.state.thumbnailURL = this.props.userList[i].img_path
                break
            }
        }
    }

    ComponentWillMount() {
        if (this.props.section == 'Exchanging Language') {
            this.setState({translated: false})
        }
        for (var i=0; i<this.props.userList.length; i++) {
            if (this.state.email == this.props.userList[i].email) {
                this.setState({nickname : this.props.userList[i].nickname})
            }
        }
    }

    _onPress = (transMessage) => {
        if (transMessage == null) {
            ToastAndroid.show("This message cannot be translated.", ToastAndroid.SHORT)
            return
        } else{
            this.setState({
                translated: !this.state.translated
            })
        }
    }
    
    render() {
        const data = this.props.data;
        return (
            <View>
                <Text style={style.text_name}>{this.state.nickname}</Text>
                    {
                        (this.state.translated == true && data.transMessage != null)
                        ? (
                        <View style={style.content}>
                            <Thumbnail backgroundColor="#fff" style={style.thumbnail}
                                source={{uri:'http://101.101.160.185:3000/images/'+this.state.thumbnailURL}}/>
                            <TouchableOpacity activeOpacity={0.5} style={[style.messageBox,{backgroundColor: '#9f9'}]} onPress={() => this._onPress(data.transMessage)}>
                                <Text style={style.text_message}>{data.transMessage} </Text>
                            </TouchableOpacity>
                            <View style={style.time_container}>
                                <Text style={style.text_time}>  translated</Text>
                                <Text style={style.text_time}>  {data.Time.toString().substr(16, 5)}</Text>
                            </View>
                        </View>)
                        : (
                        <View style={style.content}>
                            <Thumbnail backgroundColor="#fff" style={style.thumbnail}
                                source={{uri:'http://101.101.160.185:3000/images/'+this.state.thumbnailURL}}/>
                            {data.answer == '#image'
                                ? (
                                    <View style={[style.imageBox,{backgroundColor: '#ccc'}]}>
                                        <Image style={{width:width*0.60, height: width*0.60, resizeMode:'contain'}} source={{ uri: 'http://101.101.160.185:3000/images/'+data.message }}/>
                                    </View>)
                                : (
                                    <TouchableOpacity activeOpacity={0.5} style={[style.messageBox,{backgroundColor: '#ccc'}]} onPress={() => this._onPress(data.transMessage)}>
                                        <Text style={style.text_message}>{data.message} </Text>
                                    </TouchableOpacity>
                                )
                            }
                            <View>
                                <Text style={style.text_time}>  {data.Time.toString().substr(16, 5)}</Text>
                            </View>
                        </View>)
                    }
                </View>
        );
    }
}

const style = StyleSheet.create({
    content: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginRight: '30%',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    thumbnail: {
        height: 45,
        width: 45,
        marginRight: 10,
        borderRadius: 45 * 0.4,
    },
    messageBox: {
        marginTop: 25,
        paddingTop: 8,
        paddingBottom: 8,
        padding: 5,
        borderRadius: 6
    },
    imageBox: {
        marginTop: 25,
        padding: 10,
        borderRadius: 6,
    },
    text_name: {
        position : 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        fontSize : 16,
        color: '#000',
        top: 5,
        left: 66,
    },
    text_message: {
        fontSize: 15,
    },
    time_container: {
        alignItems: 'stretch'
    },
    text_time: {
        fontSize : 12,
        color: '#222',
    },
})
