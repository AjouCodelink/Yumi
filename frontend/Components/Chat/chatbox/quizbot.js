import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, Alert  } from 'react-native';
import { Button, Thumbnail } from 'native-base';

export default class quizbot extends Component {
    constructor() {
        super();
        this.state = {
            isActive: true,
            isAlertVisible: false,
        }
    }
    submit = (inputText, answer) => {
        {
            (answer == inputText)
            ? alert("correct!")
            : alert("wrong!")
        }
    }
    
    render() {
        const data = this.props.data;
        return (
            <View>
                <DialogInput
                    isDialogVisible = {this.state.isAlertVisible}
                    title={"PopQuiz"}
                    message={data.question}
                    hintInput ={"Answer"}
                    submitInput={ (inputText) => {this.submit(inputText,data.answer)}}
                    closeDialog={ () => {this.setState({isAlertVisible:false})} }/>
                <Text style={style.text_name}>PopQuizBot </Text>
                <View style={style.content}>
                    <Thumbnail circular backgroundColor="#fff" style={style.thumbnail}
                        source={require('../../../assets/chatbot.jpg')}/>
                    <View>
                        <Button style={style.messageBox} onLongPress={() => this.setState(isAlertVisible=true)}>
                            <Text style={style.text_message}> {data.message} </Text>
                        </Button>
                    </View>
                    <Text style={style.text_time}>  {data.Time.toString().substr(16, 5)}</Text>
                </View>
                
            </View>
        );
    }
}

const style = StyleSheet.create({
    content: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginRight: '30%',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    thumbnail: {
        height: 45,
        width: 45,
        marginRight: 10
    },
    messageBox: {
        backgroundColor: "#bbb",
        borderRadius: 6
    },
    text_name: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        fontSize : 16,
        color: '#fff',
        paddingLeft: 65,
        paddingTop: 5,
        marginBottom: 5,
    },
    text_time: {
        fontSize : 12,
        color: '#ddd',
    },
    text_message: {
        fontSize: 15,
    },
})
