import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'native-base';

class ContactInfo extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={style.content}>
                <Text style={style.text_time}>{data.time}  </Text>
                <Button info style={style.messageBox}>
                    <Text style={style.text_message}> {data.message} </Text>
                </Button>
            </View>
        );
    }
}


const style = StyleSheet.create({
    content: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginLeft: '30%',
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    messageBox: {
        backgroundColor: "#ee3",
        borderRadius: 5,
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