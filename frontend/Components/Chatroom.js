import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Input} from 'native-base';

import {Drawer} from './Drawer';

export default class Chatroom extends Component {
    constructor(props){
        super(props);
        this.state={
            message: '',
        }
    }
    static navigationOptions = {
        headerTitle: () => (
            <Text style={style.font_header}>chatroom name
                <Text style={{fontSize:15, color: '#ee0'}}>  20</Text>
            </Text>
        ),
        headerRight: () => ( <Icon name='md-menu' style={{color: '#ddd', marginRight: 18, fontSize: 35}} /> ),
        headerTintColor: '#ddd',
        headerStyle: { backgroundColor: '#555', },
    }
    render() {
        return (
            <View style={style.container}>
                <Drawer/>>
                <View style={style.content}>
                    <Text style={style.font_main}>채팅 목록이 준내 올라올 예정임ㅎㅎ{"\n"}{this.state.message}</Text>
                </View>
                <View style={style.chatPlace}>
                    <Input onChangeText={(message) => this.setState({message})} value={this.state.message}
                        placeholder='Enter message' style={{marginLeft: 6, fontSize: 16}}/>
                    <TouchableOpacity onPress={() => this.onPressSend()}>
                        <Icon name='md-send' style={{color: '#333', marginRight: 10, fontSize: 30}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    onPressSend(){
        if (this.state.message == ''){
            
        } else {
            //this.submit();
            this.setState({message: ''})
        }
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
        fontSize: 35,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatPlace: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#888',
        borderWidth: 0,
    },
    font_main: {
        color: '#aaa',
        fontSize: 20,
        alignItems: 'center',
    },
});