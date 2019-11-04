import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'native-base';

export default class ProfileTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-person' style={{color: tintColor}} />
        )
    }
    constructor(props) {
        super(props);
        this.state = {
            clicked: true
        };
    }
    _clicked = () => this.setState({clicked: false});
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.font_header}>Profile</Text>
                </View>
                <View style={style.title}></View>
                <View style={style.content}>
                    <Text style={style.font_main}>You can manage your profile.</Text>
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