import React, { Component } from 'react';
import { ToastAndroid, View, Text, StyleSheet, Linking, Alert  } from 'react-native';
import { Button, Thumbnail } from 'native-base';

export default class otherchat extends Component {
    constructor() {
        super();
    }

    state = {
        translateEnable: true
    }

    _LongPress = (transMessage) => {
        if (transMessage == null) {
            ToastAndroid.show("This message cannot be translated.", ToastAndroid.SHORT)
            return
        } else{
            this.setState({
                translateEnable: !this.state.translateEnable
            })
        }
    }

    render() {
        const data = this.props.data;
        return (
            <View>
                <Text style={style.text_name}>{data.user_email}</Text>
                    {
                        (this.state.translateEnable == true && data.transMessage != null)
                        ? (
                        <View style={style.content}>
                            <Thumbnail backgroundColor="#fff" style={style.thumbnail}
                                source={require('../../../assets/default_thumbnail.png')}/>
                            <Button style={[style.messageBox,{backgroundColor: '#9f9'}]} onLongPress={() => this._LongPress(data.transMessage)}>
                                <Text style={style.text_message}>{data.transMessage} </Text>
                            </Button>
                            <View style={style.time_container}>
                                <Text style={style.text_time}>  translated</Text>
                                <Text style={style.text_time}>  {data.Time.toString().substr(16, 5)}</Text>
                            </View>
                        </View>)
                        : (
                        <View style={style.content}>
                            <Thumbnail backgroundColor="#fff" style={style.thumbnail}
                                source={require('../../../assets/default_thumbnail.png')}/>
                            <Button style={[style.messageBox,{backgroundColor: '#ccc'}]} onLongPress={() => this._LongPress(data.transMessage)}>
                                <Text style={style.text_message}>{data.message} </Text>
                            </Button>
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
        paddingBottom: 5,
    },
    thumbnail: {
        height: 45,
        width: 45,
        marginRight: 10,
        borderRadius: 45 * 0.4,
    },
    messageBox: {
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 6
    },
    text_name: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        fontSize : 16,
        color: '#000',
        paddingLeft: 65,
        paddingTop: 5,
        marginBottom: 5,
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
