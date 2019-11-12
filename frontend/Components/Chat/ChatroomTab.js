import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, TextInput } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {Icon} from 'native-base';

export default class ChatroomTab extends Component {
    static navigationOptions = {
        header: null,
    }
    
    constructor(props) {
        super(props);
        this.array = [{
            title: 'Sports',
            roomID: '1'
        },{
            title: 'Movie',
            roomID: '2'
        },{
            title: 'Food',
            roomID: '3'
        }],
        this.state = {
            arrayHolder: [],
            textInput_Holder_Theme: '',
            textInput_Holder_ID: '',
            isAlertVisible: false,
            search: '',
        }    
    }

    submit(inputText){
        this.setState({isAlertVisible: false})
    }

    componentDidMount() {
        this.setState({ arrayHolder: [...this.array] })
    }

    createRoom = () => { // 키워드를 입력하여 버튼을 누르면 서버에 방을 만들고 방 번호를 출력해줌.
        var interest = {};
        interest.interests = this.state.textInput_Holder_Theme;
        var url = 'http://101.101.160.185:3000/chatroom/creation';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(interest),
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNhMzZjY2NmZGMyMzI2YTUxN2JiMTYiLCJlbWFpbCI6InRrZGd1c2w5NEBuYXZlci5jb20iLCJpYXQiOjE1NzM1MzMzOTksImV4cCI6MTU3NDEzODE5OSwiaXNzIjoiY29kZWxpbmsuY29tIiwic3ViIjoidXNlckluZm8ifQ.h3a81ID66obDjwWXnlsS0H9A3cUQesYVIMYXGWuUiW0'
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => this.insertChatRoom(responseJson.chatroom_id));
        //.then(responseJson => console.log(responseJson.chatroom_id));
        // .then(responseJson => this.setState({
        //     textInput_Holder_ID: responseJson.chatroom_id
        // }));
    }

    insertChatRoom = (chatroom_id) => { // 여기에다 ROOMtitle 이냐 RoomID냐에 따라 push 를 다르게 지정 
        this.array.push({
            title : this.state.textInput_Holder_Theme,
            roomID: chatroom_id});
        //console.log(chatroom_id)
        this.setState({ arrayHolder: [...this.array] })
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
        <View style={styles.MainContainer}>
            <View style={styles.header}/>
            <TextInput
                placeholder="Enter Theme Here"
                onChangeText={data => this.setState({ textInput_Holder_Theme: data })}
                style={styles.textInputStyle}
                underlineColorAndroid='transparent'
            />
            <TextInput
                placeholder="Enter ID Here"
                onChangeText={data => this.setState({ textInput_Holder_ID: data })}
                style={styles.textInputStyle}
                underlineColorAndroid='transparent'
            />
            <DialogInput
                isDialogVisible = {this.state.isAlertVisible}
                title={"Create Chatroom"}
                message={"type title and roomID"}
                hintInput ={"title"}
                textInputProps
                submitInput={ (inputText) => {this.submit(inputText)} }
                closeDialog={ () =>this.setState({isAlertVisible:false})}/>
            <TouchableOpacity onPress={this.createRoom} activeOpacity={0.7} style={styles.button}>
                <Text style={styles.buttonText}> Create Room </Text>
            </TouchableOpacity>
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
                    </TouchableOpacity>}
            />
            <TouchableOpacity
                onPress={()=> this.setState({isAlertVisible:true})} 
                activeOpacity={0.7} 
                style={styles.feb} >
                <Icon name='chatboxes' style={{color: '#FFF'}}/>
            </TouchableOpacity>
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
    search: {
        justifyContent: 'center',
        alignItems : "stretch",
        paddingTop: 50,
        paddingLeft : 20,
        flexDirection: 'row',
        width:'100%',
        height:'20%',
        backgroundColor: '#333',
    },
    MainContainer : {
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
    feb: {
        backgroundColor: '#47C83E',
        width: 50,
        height: 50,
        marginBottom: 40,
        marginLeft: '75%',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:60,
        borderWidth:1
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