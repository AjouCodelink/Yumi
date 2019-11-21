import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail,Icon,Button,Fab, Spinner} from 'native-base';
import DialogInput from 'react-native-dialog-input';

import CreateChatroom from './Popup/CreateChatroom'

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
        this._id = '',
        this.searcharray = [],
        this.array = [],
        this.state = {
            active : false,
            arrayHolder: [],
            searcharrayHolder: [],
            textInput_Holder_Theme: '',
            isAlertVisible: false,
            isSearchVisible: false,
            isSearchListVisible : false,
            search : '',
            createChatroomDisplay: 'none',
            spinnerOpacity: 1,
        }
    }
    submit(inputText){
        this.setState({isAlertVisible: false})
        this.createRoom(inputText);
    }

    componentWillMount() {
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
            'x-access-token': this.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            for(var i=0; i<responseJson.length; i++){
                this.array.push({
                    title: responseJson[i].name,
                    roomID: responseJson[i].cr_id
                })

                this.setState({arrayHolder: [...this.array], spinnerOpacity: 0}
                )
            }
        })
    }
    createRoom = (inputText) => { // 키워드를 입력하여 버튼을 누르면 서버에 방을 만들고 방 번호를 출력해줌.
        var url = 'http://101.101.160.185:3000/chatroom/creation/'+inputText;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type' : 'application/json',
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

    }

    exitChatRoom = (roomID) => { // 방 나가기
        var url = 'http://101.101.160.185:3000/chatroom/exit/'+roomID;
        fetch(url, {
            method: 'POST',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token' : 'token',
            'x-access-token': this.token
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            this.setState(prevState => {
                const index = prevState.arrayHolder.findIndex(holder => holder.roomID === roomID);
                prevState.arrayHolder.splice(index, 1);
                return ({
                    arrayHolder: [...prevState.arrayHolder]
                })
            });
        })

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
                    this.exitChatRoom(roomID);
                }},
            ],
            {cancelable: false},
        );
    }
    _onPressChatroom = (item) => {
        this.props.navigation.navigate('Chatroom', {
            title: item.title,
            cr_id: item.roomID,
            myEmail : this.email
        });
    }
    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: 1,
                width: "100%",
                
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
        this.searcharray.splice(0,100) //searchlist 초기화값이 100인 이유는동일한 chatlist 검색 결과가 최대 100개라고 가정
        this.state.searcharrayHolder.splice(0,100)
        this.setState({isSearchListVisible: !this.state.isSearchListVisible});
        var url = 'http://101.101.160.185:3000/chatroom/search/'+this.state.search;
        fetch(url, {
            method: 'GET',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => {
            // for(var i=0;i<responseJson.length;i++)
            // {
            //     this.searcharray.push({
            //         title: responseJson[i].interest,
            //         roomID: responseJson[i]._id
            //     })  
                    
            // }
            // this.setState({searcharrayHolder: [...this.searcharray]})
            console.log(responseJson);
        })
    }

    GetItem(item) {
        Alert.alert(item);
    }

    _displayCreateCR = (display) => {
        this.setState({createChatroomDisplay: display})
    }

    render() {
        {/*========헤더부분===========*/}
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <Button light 
                style = {{width : "100%",height :"100%"}}>
                    <View style={styles.febContainer}>
                    </View>
                </Button>
                </View>
                {/*방생성 Dialog*/}
                <DialogInput
                    isDialogVisible = {this.state.isAlertVisible}
                    title={"Create Chatroom"}
                    message={"Type Theme"}
                    hintInput ={"Theme"}
                    submitInput={ (inputText) => { this.submit(inputText)}}
                    closeDialog={ (inputText) => {this.setState({isAlertVisible:false})}}/>
                {/*=========flatlist 부분===========*/}
                <Button success style ={{width: '100%'}}>
                <Text 
                style = {{fontSize : 16, marginLeft : 15,color :"#fff"}}>My Chatroom</Text>
                </Button>
                { (this.state.isSearchListVisible == false) ? (
                <FlatList
                        data={this.state.arrayHolder}
                        width='100%'
                        extraData={this.state.arrayHolder}
                        keyExtractor = {(item, index) => String(index)}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>(
                                <ListItem avatar
                                activeOpacity={0.5} onLongPress={() => this._longPressChatroom(item.roomID)}
                                onPress={() => this._onPressChatroom(item)}
                                >
                                <Left>
                                <Thumbnail
                                style={{width: 50, height: 45}} 
                                source={{ uri: 'https://search4.kakaocdn.net/argon/600x0_65_wr/CPagPGu3ffd' }} />
                                </Left>
                                <Body>
                                <Text># {item.title}</Text>
                                <Text note>chatRoom message</Text>
                                </Body>
                                <Right>
                                <Text note>3:43 pm</Text>
                                </Right>
                                </ListItem>
                        )}
                />):(<FlatList
                        data={this.state.searcharrayHolder}
                        width='100%'
                        extraData={this.state.searcharrayHolder}
                        keyExtractor = {(item, index) => String(index)}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item }) =>
                        <ListItem avatar
                                activeOpacity={0.5} onLongPress={() => this._longPressChatroom(item.roomID)}
                                onPress={() => this._onPressChatroom(item)}
                                >
                                <Left>
                                <Thumbnail
                                style={{width: 50, height: 45}} 
                                source={{ uri: 'https://search4.kakaocdn.net/argon/600x0_65_wr/CPagPGu3ffd' }} />
                                </Left>
                                <Body>
                                <Text>#{item.title}</Text>
                                <Text note>chatRoom message</Text>
                                </Body>
                                <Right>
                                <Text note>3:43 pm</Text>
                                </Right>
                                </ListItem>
                    
                    }
                />)
                }      
            <Button info style ={{width: '100%'}}>  
                <Text style = {{ fontSize : 16,marginLeft : 15 , color: '#fff'}}>Chatroom Suggest</Text></Button>
            <List style ={{width: '100%'}}>
            <ListItem avatar>
            <Left>
                <Thumbnail
                style={{width: 50, height: 45}}  
                source={{ uri: 'https://search4.kakaocdn.net/argon/600x0_65_wr/CPagPGu3ffd' }} />
            </Left>
            <Body>
                <Text>Game-Overwatch</Text>
                <Text note>RyusungRyoung looks happy</Text>
            </Body>
            <Right>
                <Text note>3:43 pm</Text>
            </Right>
            </ListItem>
            </List>
                {/*=======아래 채팅방 추천 및 검색 창 팝업 부분=========*/}
                <View style={styles.febContainer}>
                
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
                            <Icon name='ios-search' style={{color: '#111'}}/>
                        </TouchableOpacity>
                    </View> 
                    ):(<View style = {styles.hide}></View>)
                }
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' , width:  65,
                            height: 65,borderRadius: 70}}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="navigate" />

                        <Button   
                            onPress={() => this._displayCreateCR('flex')}
                            activeOpacity={0.7} 
                            style={styles.button_create} >
                        <Icon name='chatbubbles' style={{color: '#FFF'}}/>
                        </Button>

                        <Button   
                            onPress={()=> this.searchBarShow()} 
                            activeOpacity={0.7} 
                            style={styles.button_search} >
                        <Icon name='ios-search' style={{color: '#FFF'}}/>
                        </Button>

                        <Button  
                            onPress={()=> this.suggestRoom()} 
                            activeOpacity={0.7} 
                            style={styles.button_suggest}>
                        <Icon name='paw' style={{color: '#222'}}/>
                        </Button>
                </Fab>
                <CreateChatroom token={this.token} displayChange={this._displayCreateCR} display={this.state.createChatroomDisplay}/>
                <Spinner size={80} style={{opacity: this.state.spinnerOpacity, flex: 4, position: "absolute", bottom: '43%'}}color='#999'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'center',
        backgroundColor : '#fff'
    },
    header: {
        flexDirection : "row",
        width:'100%',
        height: 24,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
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
        width:  45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#33AAFF',
    },
    button_create: {
        width:  45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#44DD44',
    }, 
    button_suggest : {
        width:  45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#eeee33',
    },
    item : {
        flexDirection : 'row',
        padding : 10,
        justifyContent : 'flex-start',
        borderWidth : 1, 
        borderRadius: 7,
        borderColor : '#333',
        backgroundColor: '#fff',
    },
        Divider : {
        width: '100%',
        backgroundColor : '#BDBDBD',
    },
    thumbnail: {
        justifyContent : 'center',
        alignItems: 'center',

    },
    item_font : {
        fontSize : 16,
        marginLeft : 10,
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
        marginTop: 120,
        paddingLeft: 15,
    },
    searchBar:{
        width: "75%",
        height: 40,
        fontSize:18,
        color: '#fff',
        backgroundColor:'#eee',
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
        backgroundColor:'#eee',
    }
})
