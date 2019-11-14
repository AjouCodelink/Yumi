import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput,Button } from 'react-native';
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
            isAlertVisible: false,
            isSearchVisible: false,
            search : '',
        }    
    }

    submit(inputText){
        this.setState({isAlertVisible: false})
        this.createRoom(inputText);
    }

    componentDidMount() {
        this.setState({ arrayHolder: [...this.array] })
        db.transaction( tx => {
            tx.executeSql(
                'SELECT * FROM token',
                [],
                (_, { rows: { _array }  }) => { 
                    this.token = _array[0].access_token;
                    this.email = _array[0].user_email;
                    this.getChatRoomList();
                },
                (_,error) => console.error(error)
            );
        },(error) => console.error(error))
    }

    getChatRoomList(){
        var url = 'http://101.101.160.185:3000/chatroom/list';
        fetch(url, {
            method: 'GET',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            'x-access-token': this.token
            //다른 search에서만 쓰면 안된다. 
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            for(var i=0; i<responseJson.length; i++){ // TODO : 이거 포문으로 했는데 혹시 map으로 할 수 있으면 수정 좀 해주셈
                this.array.push({
                    title: responseJson[i].interest,
                    roomID: responseJson[i].cr_id
                })
                this.setState({arrayHolder: [...this.array]})
            }
        })
    }

    createRoom = (inputText) => { // 키워드를 입력하여 버튼을 누르면 서버에 방을 만들고 방 번호를 출력해줌.
        var url = 'http://101.101.160.185:3000/chatroom/creation/'+inputText;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            'x-access-token': this.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            this.insertChatRoom(responseJson.chatroom_id, responseJson.interest);
        })
    };

    insertChatRoom = (chatroom_id, interest) => { // 여기에다 ROOMtitle 이냐 RoomID냐에 따라 push 를 다르게 지정
        this.array.push({
            title : interest,
            roomID: chatroom_id});
        this.setState({ arrayHolder: [...this.array] })

        // db.transaction(tx => {
        //     tx.executeSql(
        //         'INSERT INTO chatroom (cr_id, email, Theme) values (?,?,?)',
        //         [chatroom_id, this.email, this.state.textInput_Holder_Theme],
        //         null,
        //         (_,error) => console.error(error)
        //     )
        // },(error) => console.error(error))
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
    suggestRoom(){
        Alert.alert("Room suggest Pressed");
    }
    searchBarShow(){
        this.setState({isSearchVisible: !this.state.isSearchVisible});

    }
    searchRoomByKeyword(){
        //Alert 또는 popup으로 채팅방 결과 띄워주기
        var url = 'http://101.101.160.185:3000/chatroom/search/'+this.state.search;
        fetch(url, {
            method: 'GET',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        //.then(responseJson => console.log(responseJson));
    }

    GetItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <Text style={styles.font_title}>ChatRoom</Text>
                    <View style={styles.febContainer}>
                        <TouchableOpacity
                            onPress={()=> this.setState({isAlertVisible:true})} 
                            activeOpacity={0.7} 
                            style={styles.button_create} >
                            <Icon name='chatbubbles' style={{color: '#FFF'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={()=> this.searchBarShow()} 
                            activeOpacity={0.7} 
                            style={styles.button_search} >
                            <Icon name='ios-search' style={{color: '#FFF'}}/>
                    </TouchableOpacity>
                    </View>
                    </View>

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
                            onPress={()=> this.suggestRoom()} 
                            activeOpacity={0.7} 
                            style={styles.button_suggest}
                            >
                            <Icon name='paw' style={{color: '#FFF'}}/>
                    </TouchableOpacity>
                </View>
                {
                    (this.state.isSearchVisible == true) ? (
                    <View style = {styles.search}>
                    <TextInput
                        style={{height: 40, width: "75%", backgroundColor:'#666',  fontSize:18, borderRadius: 5,paddingLeft: 10}}
                        placeholder="Search..."
                        value={this.state.search}
                        onChangeText={(search) => this.setState({search})}
                    />
                    <TouchableOpacity
                        style={{backgroundColor: '#384850',width: 40, height: 40, borderRadius: 40, justifyContent : 'center', alignItems : 'center',
                                marginLeft :15,marginRight: 15, backgroundColor:'#AAA'}} 
                        onPress={()=>this.searchRoomByKeyword()}
                    >
                        <Icon name='ios-search' style={{color: '#FFF'}}/>
                    </TouchableOpacity>
                    </View> 
                    ) :(<View style = {styles.hide}></View>)
                    }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        justifyContent : 'flex-start',
        alignItems : 'center',
        flex : 1,
        backgroundColor : '#333'
    },
    header: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection : "row",
        width:'100%',
        height: 110,
        backgroundColor: '#888',
    },
    font_title: {
        marginTop: 10,
        marginLeft: 15,
        color: 'white',
        fontSize: 35,
        alignItems: 'center',
        fontWeight: 'bold',
        },
    search: {
        marginTop: 65,
        position : 'absolute',
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems : "stretch",
        paddingTop: 50,
        paddingLeft : 20,
        width:'100%',
        
    },
    hide : {
    },
    febContainer: {
        flexDirection : 'row',
        marginTop: 20,
        flex: 2,
        width: '100%',
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    button_search:{
        width:  50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#0054FF',
        alignItems: 'center',
        borderRadius: 50,
        marginRight: 50,

    },
    button_create: {
        width:  50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#1DDB16',
        alignItems: 'center',
        marginRight: 20,
        borderRadius: 50,
    }, 
    button_suggest : {
        backgroundColor: '#FFE400',
        width:  50,
        height: 50,
        marginRight:  50,
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
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

});
