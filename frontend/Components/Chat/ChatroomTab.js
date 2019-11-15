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
        .catch(error => console.log('Error: ', error))
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
        .catch(error => console.log('Error: ', error))
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

    leaveChatRoom = (roomID) => { // 방 나가기
        this.setState(prevState => {
            const index = prevState.arrayHolder.findIndex(holder => holder.roomID === roomID);
            prevState.arrayHolder.splice(index, 1);
            return ({
                arrayHolder: [...prevState.arrayHolder]
            })
        });
        //todo: 근데 arrayHolder만 건드려서 그런가 방이 추가하면 다시 돌아오는 버그가 있음ㅠ
        //나중에 유용하면 이용하시고 아니면 삭제해주세요ㅠ
        //서버와도 연동해서 방에서 나가기 구현해야함.
    }

    _longPressChatroom = (roomID) => {  // 채팅방 꾹 누르면
        Alert.alert(
            'Exit?',
            'Press the OK button to exit the chat room.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    this.leaveChatRoom(roomID);
                }},
            ],
            {cancelable: false},
        );
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
        .catch(error => console.log('Error: ', error))
        //.then(responseJson => console.log(responseJson));
    }

    GetItem(item) {
        Alert.alert(item);
    }
    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <Text style={styles.font_header}>ChatRoom</Text>
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
                        <TouchableOpacity activeOpacity={0.5} onLongPress={() => this._longPressChatroom(item.roomID)}
                            onPress={() => this._onPressChatroom(item)}>
                            <View style={styles.item}>
                                <Text style={styles.item_font}>
                                    # {item.title}{'\n'}# roomID: {item.roomID}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
                <View style={styles.febContainer}>
                    <TouchableOpacity    // 같은 ID로 채팅 컴포넌트 사용 위해서 임시로 만든 버튼입니다. 추후 채팅방 입장이 완료되면 삭제해주세요.
                        onPress={()=> this.insertChatRoom('111','ADMIN')} 
                        activeOpacity={0.7} 
                        style={styles.button_suggest}
                        >
                        <Icon name='md-aperture' style={{color: '#222'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.suggestRoom()} 
                        activeOpacity={0.7} 
                        style={styles.button_suggest}
                        >
                        <Icon name='paw' style={{color: '#222'}}/>
                    </TouchableOpacity>
                </View>
                {
                    (this.state.isSearchVisible == true) ? (
                    <View style = {styles.searchBarConatiner}>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search..."
                            value={this.state.search}
                            onChangeText={(search) => this.setState({search})}
                        />
                        <TouchableOpacity
                            style={styles.searchButton} 
                            onPress={()=>this.searchRoomByKeyword()}>
                            <Icon name='ios-search' style={{color: '#FFF'}}/>
                        </TouchableOpacity>
                    </View> 
                    ):(<View style = {styles.hide}></View>)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'center',
        backgroundColor : '#333'
    },
    header: {
        flexDirection : "row",
        width:'100%',
        height: 74,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginBottom: 15,
        backgroundColor: '#888',
    },
    font_header: {
        color: 'white',
        alignItems: 'center',
        fontSize: 42,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    hide : {
    },
    febContainer: {
        flex: 2,
        flexDirection : 'row',
        width: '100%',
        height: 50,
        marginTop: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    button_search:{
        width:  50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        borderRadius: 50,
        backgroundColor: '#33AAFF',
    },
    button_create: {
        width:  50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        borderRadius: 50,
        backgroundColor: '#44DD44',
    }, 
    button_suggest : {
        width:  50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:  50,
        marginBottom: 60,
        borderRadius: 50,
        backgroundColor: '#eeee33',
    },
    item : {
        padding : 10,
        justifyContent : 'center',
        borderWidth : 1, 
        borderRadius: 7,
        borderColor : '#333',
        backgroundColor: '#fff',
    },
    item_font : {
        fontSize : 16,
    },
    textInputStyle:{
        width: '85%',
        height: 40,
        textAlign : 'center',
        color : '#fff',
        borderWidth : 1, 
        borderRadius: 7,
        borderColor : '#4CAF50',
        marginTop : 12,
    },
    searchBarConatiner: {
        position : 'absolute',
        flex: 3,
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'center',
        alignItems : "stretch",
        marginTop: 90,
        paddingLeft: 15,
    },
    searchBar:{
        width: "75%",
        height: 40,
        fontSize:18,
        color: '#ddd',
        backgroundColor:'rgba(0, 0, 0, 0.8)',
        paddingLeft: 10,
        borderRadius: 5,
    },
    searchButton:{
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft :15,
        marginRight: 15,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
    }
})