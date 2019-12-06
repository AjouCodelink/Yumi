import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class mychat extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={style.content}>
                <Text style={style.text_time}>{data.Time.toString().substr(16, 5)}  </Text>
                {data.answer != '#image'
                    ? (<View style={style.messageBox}>
                        <Text style={style.text_message}> {data.message} </Text>
                    </View>)
                    : (<View style={style.imageBox}>
                        <Image style={{width:width*0.60, height: width*0.60, resizeMode:'contain'}} source={{ uri: 'http://101.101.160.185:3000/images/'+data.message }}/>
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
        justifyContent: 'flex-end',
        marginLeft: '30%',
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
    },
    messageBox: {
        paddingTop: 8,
        paddingBottom: 8,
        padding: 5,
        backgroundColor: "#ee3",
        borderRadius: 6,
    },
    imageBox: {
        padding: 10,
        backgroundColor: "#ee3",
        borderRadius: 6,
    },
    text_time: {
        fontSize : 12,
        color: '#000',
    },
    text_message: {
        fontSize: 15,
    },
})