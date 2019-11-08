import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Icon, Button} from 'native-base';

export default class ChatroomTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => ( <Icon name='md-person' style={{color: tintColor}} />
    ),
        header: null,
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.font_header}>Chatrooms</Text>
                </View>
                <View style={style.content}>
                    <Button block bordered light onPress={this._onPressChatroom}><Text style={style.chatroom_name}> Chatroom1 </Text></Button>
                    <Button block bordered light onPress={this._onPressChatroom}><Text style={style.chatroom_name}> Chatroom2 </Text></Button>
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
        flex: 2,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center'
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
        alignItems: 'flex-start',
    },
    chatroom_name: {
        color: '#ddd',
        fontSize: 18,
        alignItems: 'center',
    },
});