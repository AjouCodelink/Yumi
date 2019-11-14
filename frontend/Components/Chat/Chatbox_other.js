import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, Alert  } from 'react-native';
import { Button, Thumbnail } from 'native-base';

export default class Chatbox_other extends Component {
    render() {
        const data = this.props.data;
        return (
            <View>
                <Text style={style.text_name}>{data.user_email} </Text>
                <View style={style.content}>
                    <Thumbnail circular backgroundColor="#fff" style={style.thumbnail}
                        source={require('../../assets/default_thumbnail.png')}/>
                    <View>
                        <Button style={style.messageBox} onPress={onPressTextBox(data.message)}>
                            <Text style={style.text_message}> {data.message} </Text>
                        </Button>
                    </View>
                    <Text style={style.text_time}>  {data.Time.toString().substr(16, 5)}</Text>
                </View>
            </View>
        );
    }

    onPressTextBox(message) {
        Alert.alert(
            'Translate?',
            'If you press OK button, you will be redirected to Papago translator.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    Linking.openURL('https://papago.naver.com/?sk=auto&tk=en&st='+message);   // 이후 연락 가능한 페이지로 연동해야함
                }},
            ],
            {cancelable: false},
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
        marginRight: 10
    },
    messageBox: {
        backgroundColor: "#bbb",
        borderRadius: 6
    },
    text_name: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        fontSize : 16,
        color: '#fff',
        paddingLeft: 65,
        paddingTop: 5,
        marginBottom: 5,
    },
    text_time: {
        fontSize : 12,
        color: '#ddd',
    },
    text_message: {
        fontSize: 15,
    },
})
