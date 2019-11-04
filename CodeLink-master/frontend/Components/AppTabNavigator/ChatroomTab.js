import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {Icon} from 'native-base';

export default class ChatroomTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='md-chatboxes'
                style={{
                    color: tintColor
                }}/>
        )
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.font_header}>Chatrooms</Text>
                </View>
                <View style={style.content}>
                    <Text style={style.font_main}>You can see the kind of rooms you belong to.</Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        width:'100%',
        height:'12%',
        justifyContent: 'flex-end',
        paddingLeft: '4%',
        paddingBottom: '1.1%',
        backgroundColor: '#555',
    },
    font_header: {
        color: 'white',
        fontSize: 42,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    font_main: {
        color: '#aaa',
        fontSize: 20,
        alignItems: 'center',
    },
});