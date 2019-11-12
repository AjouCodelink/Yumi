import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Icon } from 'native-base';

export default class SettingTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-settings' style={{color: tintColor}} />
        ),
    }

    constructor(props){
        super(props);
        this.state = {
            data : [
                {icon :"md-text", name: "Contect Us", key: "contect"},
                {icon :"md-exit", name: "Log Out", key: "logout"},
                {icon :"md-log-out", name: "Close my account", key: "leave"},
            ]
        }
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(item.key)}>
                <Text style={style.row}>
                    <Icon name={item.icon} style={{color: "#ddd", fontSize: 28}}/>  {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderItem}
                        onEndReachedThreshold={1}/>
                </View>
            </View>
        )
    }
    _onPress(key) {
        if (key == "logout") {
            this.onPressLogout()
        } else if (key == "contect") {
            this.onPressContect()
        } else if (key == "leave") {
            this.onPressLeave()
        }
    }
    onPressLogout() {
        this.props.navigation.navigate('TitleScreen');
    }
    onPressContect() {
        Linking.openURL('http://google.com');   // 이후 연락 가능한 페이지로 연동해야함
    }
    onPressLeave() {
        alert("you press Leave");
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#333',
    },
    font_header: {
        color: 'white',
        fontSize: 42,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    row: {
        width: 700,
        flex: 1,
        fontSize: 25,
        paddingLeft: 20,
        marginTop: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#333",
        color: "#eee",
        alignItems: 'center',
    },
    font_main: {
        color: '#aaa',
        fontSize: 20,
        alignItems: 'center',
    },
});