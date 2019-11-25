import React, { Component } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { Button, Thumbnail } from 'native-base';

export default class quizbot extends Component {
    constructor() {
        super();
    }

    state = {
        isActive: true,
        isAlertVisible: false,
        count: 1,
    }

    isCorrect(answer) {
        if(this.state.count-- > 0) {
            this.props._sendPopQuizWon(answer)
            ToastAndroid.show("Correct!🏆", ToastAndroid.SHORT)
            return
        }
        ToastAndroid.show("You've already got the right answer.", ToastAndroid.SHORT)
    }

    submit = (inputText, answer) => {
        _inputText = inputText.toLowerCase()
        _answer = answer.toLowerCase()
        {
            (_answer == _inputText)
            ? this.isCorrect(answer)
            : ToastAndroid.show("Wrong!", ToastAndroid.SHORT)
        }
    }

    render() {
        const data = this.props.data;
        return (
            <View>
                <DialogInput
                    isDialogVisible = {this.state.isAlertVisible}
                    onSubmitEditing={() => {this.submit(inputText,data.answer, this.setState({isAlertVisible:false}))}}
                    title={"PopQuiz"}
                    message={data.message}
                    hintInput ={"Answer"}
                    submitInput={ (inputText) => {this.submit(inputText,data.answer, this.setState({isAlertVisible:false}))}}
                    closeDialog={ () => {this.setState({isAlertVisible:false})} }/>
                <Text style={style.text_name}>PopQuizBot</Text>
                <View style={style.content}>
                    <Thumbnail backgroundColor="#fff" style={style.thumbnail}
                        source={require('../../../assets/chatbot.jpg')}/>
                    <View>
                        <Button style={style.messageBox} onLongPress={() => this.setState({isAlertVisible: true})}>
                            <Text style={style.text_message}>{data.message} </Text>
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
        marginRight: 10,
        borderRadius: 45 * 0.4,
    },
    messageBox: {
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: "#fff",
        borderRadius: 6
    },
    text_name: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        fontSize : 16,
        color: '#444',
        paddingLeft: 65,
        paddingTop: 5,
        marginBottom: 5,
    },
    text_time: {
        fontSize : 12,
        color: '#222',
    },
    text_message: {
        fontSize: 15,
    },
})
