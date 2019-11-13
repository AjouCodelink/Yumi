import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {Icon} from 'native-base';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db');

export default class ChatroomTab extends Component {
    static navigationOptions = {
        header: null,
    }
    
    constructor(props) {
        super(props);
        this.token = '',
        this.email = '',
        this.array = [],
        this.state = {
            arrayHolder: [],
            textInput_Holder_Theme: '',
            textInput_Holder_ID: '',
            isAlertVisible: false,
        }    
    }

    submit(inputText){
        this.setState({isAlertVisible: false})
        this.setState({textInput_Holder_Theme:inputText})
        console.log(this.state.textInput_Holder_Theme)
        this.createRoom()
    }
    ddd(){
        console.log("function called!");
    }

    componentDidMount() {
        this.setState({ arrayHolder: [...this.array] })

        db.transaction(tx => {
            tx.executeSql(  //chatlog 저장하는 table 생성하기
                'CREATE TABLE if not exists chatroom (cr_id TEXT NOT NULL, email TEXT NOT NULL, Theme TEXT NOL NULL, PRIMARY KEY("cr_id", "email"))',
                [],
                null,
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))

        db.transaction( tx => {
            tx.executeSql(
                'SELECT * FROM token',
                [],
                (_, { rows: { _array }  }) => { 
                    this.token = _array[0].access_token;
                    this.email = _array[0].user_email;
                },
                (_,error) => console.error(error)
            );
        },(error) => console.error(error))
        
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * from chatroom where email = ?',
                [this.email],
                (_, { rows: { _array }  }) => {    
                    for(var i=0; i<_array.length; i++){
                        this.array.push({
                            title: _array[i].Theme,
                            roomID: _array[i].cr_id
                        });
                    }
                    this.setState({ arrayHolder: [...this.array] })
                },
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
    }

    createRoom = () => { // 키워드를 입력하여 버튼을 누르면 서버에 방을 만들고 방 번호를 출력해줌.
        var interest = {};
        interest.interest = this.state.textInput_Holder_Theme;
        var url = 'http://101.101.160.185:3000/chatroom/creation';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(interest),
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            'x-access-token': this.token
            //다른 search에서만 쓰면 안된다. 
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            
            this.insertChatRoom(responseJson.chatroom_id);
            console.log(responseJson);
        })
    };

    insertChatRoom = (chatroom_id) => { // 여기에다 ROOMtitle 이냐 RoomID냐에 따라 push 를 다르게 지정 
        this.array.push({
            title : this.state.textInput_Holder_Theme,
            roomID: chatroom_id});
        this.setState({ arrayHolder: [...this.array] })

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO chatroom (cr_id, email, Theme) values (?,?,?)',
                [chatroom_id, this.email, this.state.textInput_Holder_Theme],
                null,
                (_,error) => console.error(error)
            )
        },(error) => console.error(error))
    }
    a = ()=>{
        
    }
    _onPressChatroom = (item) => {
        this.props.navigation.navigate('Chatroom', {
            title: item.title,
            cr_id: item.roomID,
        });
    }

    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "#607D8B",
            }}/>
        );
    }

    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}/>
                <DialogInput
                    isDialogVisible = {this.state.isAlertVisible}
                    title={"Create Chatroom"}
                    message={"Type Theme"}
                    hintInput ={"Theme"}
                    submitInput={ (inputText) => { this.submit(inputText)}}
                    closeDialog={ (inputText) => {this.setState({isAlertVisible:false})}}/>
                <FlatList
                    data={this.state.arrayHolder}
                    width='85%'
                    extraData={this.state.arrayHolder}
                    keyExtractor = {(item, index) => String(index)}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this._onPressChatroom(item)}>
                            <Text style={styles.item}>
                                # {item.title}{'\n'}# roomID: {item.roomID}
                            </Text>
                        </TouchableOpacity>
                    }
                />
                <View style={styles.febContainer}>
                    <TouchableOpacity
                        onPress={()=> this.setState({isAlertVisible:true})} 
                        activeOpacity={0.7} 
                        style={styles.feb} >
                        <Icon name='chatboxes' style={{color: '#FFF'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection : "row",
        width:'100%',
        height:'8%',
        justifyContent: 'flex-end',
        paddingLeft: '4%',
        paddingBottom: '1.1%',
        backgroundColor: '#333',
    },
    container : {
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1,
        backgroundColor : '#333'
    },
    item : {
        flexDirection : 'row',
        borderWidth : 1, 
        borderColor : '#333',
        backgroundColor: '#fff',
        borderRadius: 7,
        padding : 10,
        fontSize : 18,
        height : 77,
    },
    textInputStyle:{
        textAlign : 'center',
        height: 40,
        width: '85%',
        borderWidth : 1, 
        borderColor : '#4CAF50',
        borderRadius: 7,
        marginTop : 12,
        color : '#fff',
    },
    febContainer: {
        flex: 2,
        width: '100%',
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }, 
    feb: {
        backgroundColor: '#47C83E',
        width: 50,
        height: 50,
        marginRight: 40,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 90,
    }, 
    button : {
        width : '85%',
        height: 40,
        padding : 10,
        backgroundColor : '#222',
        borderRadius : 8,
        marginTop: 10
    },
    buttonText : {
        color : '#fff',
        textAlign : 'center',
    },
});