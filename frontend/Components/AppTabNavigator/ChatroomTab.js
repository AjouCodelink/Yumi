import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
                <Text style={style.font_title}>ChatroomTab</Text>
                <Text style={style.font_main}>You can see the kind of rooms you belong to.</Text>
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
    font_title: {
        color: 'white',
        fontSize: 30,
        alignItems: 'center'
    },
    font_main: {
        color: '#aaa',
        fontSize: 15,
        alignItems: 'center'
    }
});