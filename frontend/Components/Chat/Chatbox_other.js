import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button, Thumbnail } from 'native-base';

class ContactInfo extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={style.content}>
                <Thumbnail circular backgroundColor="#fff" style={style.thumbnail}
                    source={require('../../assets/default_thumbnail.png')}/>
                <View>
                    <Text style={style.text_name}>{data.userID} </Text>
                    <Button info style={style.messageBox}>
                        <Text style={style.text_message}> {data.message} </Text>
                    </Button>
                </View>
                <Text style={style.text_time}>  {data.time.getHours()}:{data.time.getMinutes()}</Text>
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
        height: 47,
        width: 47,
        marginRight: 10
    },
    messageBox: {
        backgroundColor: "#bbb",
        borderRadius: 5
    },
    text_name: {
        fontSize : 18,
        color: '#fff',
        marginBottom: 5,
    },
    text_time: {
        fontSize : 13,
        color: '#ddd',
    },
    text_message: {
        fontSize: 15,
    },
})

export default ContactInfo;