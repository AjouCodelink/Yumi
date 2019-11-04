import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'native-base';

export default class SettingTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-settings' style={{color: tintColor}} />
        )
    }
    constructor(props){
        super(props);
        this.state = {
            data : [
                {icon :"md-text", name: "Contect Us", key: "contect"},
                {icon :"md-exit", name: "Log Out", key: "logout"},
                {icon :"md-log-out", name: "Close my account", key: "leave"},
                {icon :"md-alarm", key: "a"},
                {icon :"md-backspace", key: "b"},
                {icon :"md-card", key: "c"},
                {icon :"md-desktop", key: "d"},
                {icon :"md-exit", key: "e"},
                {icon :"md-finger-print", key: "f"},
                {icon :"md-glasses", key: "g"},
                {icon :"md-home", key: "h"},
                {icon :"md-images", key: "i"},
                {icon :"logo-javascript", key: "j"},
                {icon :"md-key", key: "k"},
                {icon :"md-lock", key: "l"},
                {icon :"md-mail", key: "m"},
                {icon :"md-notifications", key: "n"},
                {icon :"md-options", key: "o"},
                {icon :"md-paw", key: "p"},
                {icon :"md-quote", key: "q"},
                {icon :"md-rainy", key: "r"},
                {icon :"md-search", key: "s"},
                {icon :"md-text", key: "t"},
                {icon :"md-unlock", key: "u"},
                {icon :"md-volume-mute", key: "v"},
                {icon :"ios-wifi", key: "w"},
                {icon :"logo-xbox", key: "x"},
                {icon :"logo-youtube", key: "y"},
            ]
        }
    }
    renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(item.key)}>
                <Text style={style.row}>
                    <Icon name={item.icon} style={{color: "#ddd", fontSize: 28}}/>  {item.name}
                </Text>
        </TouchableOpacity>)
    }
    render() {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <Text style={style.font_header}>Settings</Text>
                </View>
                <View style={style.content}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
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
        alert("you press logout");
    }
    onPressContect() {
        alert("you press Contect");
    }
    onPressLeave() {
        alert("you press Leave");
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
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
        alignItems: 'flex-start',
    },
    row: {
        width: 700,
        flex: 1,
        fontSize: 25,
        paddingLeft: '4%',
        marginTop: '2%',
        marginBottom: '1%',
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