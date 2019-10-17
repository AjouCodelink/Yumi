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
                <Text style={style.font_title}>ProfileTab</Text>
                <Text style={style.font_main}>You can manage your profile.</Text>
                <Text/>
                {
                    this.state.clicked
                        ? <Button title="TEST BUTTON" onPress={this._clicked}/>
                        : fetch('http://101.101.160.185:3000/signup/save-user', { // (Test) RESTFul api POST 메소드
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({email:"tkdgusl94@naver.com", password:"codelink", nickname:"jeong"})
                        })
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    font_title: {
        color: 'white',
        fontSize: 30,
        alignItems: 'center',
    },
    font_main: {
        color: '#aaa',
        fontSize: 15,
        alignItems: 'center',
    },
});