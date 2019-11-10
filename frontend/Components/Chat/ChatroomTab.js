import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Icon, Button} from 'native-base';

export default class ChatroomTab extends Component {
    static navigationOptions = {
        header: null,
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <Text style={style.font_header}>Chatrooms</Text>
                    <Button bordered light onPress={this._onPressChatroom}><Text style={style.chatroom_name}> Chatroom1 </Text></Button>
                    <Button bordered light onPress={this._onPressChatroom}><Text style={style.chatroom_name}> Chatroom2 </Text></Button>
                </View>
            </View>
        );
    }
    _onPressChatroom = () => {
        this.props.navigation.navigate('Chatroom');
    }
    
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#333',
    },
    header: {
        width:'100%',
        height: 88,
        justifyContent: 'flex-end',
        paddingLeft: '4%',
        paddingBottom: 5,
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
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatroom_name: {
        color: '#ddd',
        fontSize: 18,
        alignItems: 'center',
    },
});