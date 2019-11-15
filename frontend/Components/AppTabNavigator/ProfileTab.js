import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Icon, Thumbnail } from 'native-base';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

const screenHeight = Math.round(Dimensions.get('window').height);

export default class ProfileTab extends Component {
    state = {
        myEmail: '',
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-person' style={{color: tintColor}} />
        ),
    }

    componentWillMount() {
        db.transaction(tx => {
            tx.executeSql(  // token에서 user_email 읽어오기
                'SELECT user_email FROM token',
                [],
                (_, { rows: { _array }  }) =>     
                    (_array != []) ? this.setState({myEmail: _array[0].user_email}) :
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.topsideContainer}>
                    <Text style={style.font_header}>My Profile{"\n"}123123</Text>
                </View>
                <View style={style.downsideContainer}>
                    <Text style={style.font_nickname}>내 닉네임</Text>
                    <Text style={style.font_ID}>{this.state.myEmail}</Text>
                </View>
                <Thumbnail circle backgroundColor="#fff" style={style.thumbnail}
                    source={{ uri: 'https://steemitimages.com/u/anpigon/avatar' }}/>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    topsideContainer: {
        width: '100%',
        height: '60%',
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    font_header: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    downsideContainer: {
        width: '100%',
        height: '40%',
        paddingTop: 110,
        backgroundColor: '#555',
        alignItems: 'center',
    },
    thumbnail: {
        flex: 2,
        position : 'absolute',
        top: '50%',
        height: screenHeight*0.2,
        width: screenHeight*0.2,
        borderRadius: screenHeight*0.08,
    },
    font_nickname: {
        color: '#ddd',
        fontSize: 40,
        fontWeight: 'bold',
    },
    font_ID: {
        color: '#ddd',
        fontSize: 30,
    },
});