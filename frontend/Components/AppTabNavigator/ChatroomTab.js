import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Icon } from 'native-base';

export default class ChatroomTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-chatboxes' style={{color: tintColor}} />
        )
    }

    constructor(props) {
        super(props);
        this.state = { clicked: true };
    }
    _clicked = () => this.setState({ clicked: false });

    render() {
        return (
            <View style={style.container}>
                <Text style={style.font_title}>ChatroomTab</Text>
                <Text style={style.font_main}>You can see the kind of rooms you belong to.</Text>
                {
                    this.state.clicked
                        ? <Button title="TEST BUTTON" onPress={this._clicked}/>
                        : <Text style={style.font_main}>Pressed!</Text>
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