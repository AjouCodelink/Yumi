import React, { Component } from 'react';
import { View, StyleSheet,Text, TextInput} from 'react-native';
import { Button, Icon, } from 'native-base';

import LottieView from 'lottie-react-native';
import { Animated } from 'react-native';

export default class ChatManageTab extends Component {
    constructor(props) {
        super(props);
            this.state = {
            progress: new Animated.Value(0),
        };
        state = {
            search : '',
        };
        updateSearch = search =>{
            this.setState({search});
        };
    }
    

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-search' size={300} style={{color: tintColor}} />
        ),
    }
    searchRoomByKeyword(){
        console.log(1);
        var url = 'http://101.101.160.185:3000/chatroom/search/'+this.state.search;
        fetch(url, {
            method: 'GET',
            headers: new Headers({
            'Content-Type' : 'application/json',
            'token': 'token',
            })
        }).then(response => response.json())
        .catch(error => console.error('Error: ', error))
        .then(responseJson => console.log(responseJson));
    }
    render() {
        const {search} = this.state;
        return (
            <View style={style.container}>
                <View style = {style.search}>
                    <TextInput
                        style={{height: 40, width: "75%", backgroundColor:'#666',  fontSize:18, borderRadius: 5,paddingLeft: 10}}
                        placeholder="Search..."
                        value={this.state.search}
                        onChangeText={(search) => this.setState({search})}
                    />
                    <Button 
                        style={{backgroundColor: '#384850',width: 50, height: 40, marginLeft :15,marginRight: 15, backgroundColor:'#AAA'}} 
                        onPress={()=>this.searchRoomByKeyword()}
                    >
                        <Icon name='ios-search' style={{color: '#FFF'}}/>
                    </Button>     
                </View>
                <View style={style.content}/>
                <View style ={style.buttongroup}>
                    <LottieView  source={require('../LottieAnimation/8874-cat.json')} autoplay loop/>
                    <View style = {style.group}>
                        <Button rounded 
                            onPress={ this.ButtonClickCheckFunction}
                            style={{width: "20%", height: 25, marginLeft: "25%", marginTop:"30%",justifyContent: "center",backgroundColor: "#FF0000"}}
                            >
                            <Text fontColor ="#fff">Sports</Text>
                        </Button>
                        <Button rounded 
                            onPress={ this.ButtonClickCheckFunction}
                            style={{width: "20%", height: 25, marginRight :"25%", marginTop:"30%",justifyContent: "center",backgroundColor:"#E5D85C"}}
                            >
                            <Text>Movie</Text>
                        </Button>
                    </View>
                    <View style = {style.group}>
                        <Button rounded 
                            onPress={ this.ButtonClickCheckFunction}
                            style={{width: "20%", height: 25, marginLeft: "15%",justifyContent: "center", backgroundColor:"#5CD1E5"}}
                            >
                            <Text>Korea</Text>
                        </Button>
                        <Button rounded 
                            onPress={ this.ButtonClickCheckFunction}
                            style={{width: "20%", height: 25, marginRight :"15%",justifyContent: "center", backgroundColor:"#1DDB16"}}
                            >
                            <Text>Food</Text>
                        </Button>
                    </View>
                    <View style = {style.group}>
                        <Button rounded 
                            onPress={ this.ButtonClickCheckFunction}
                            style={{width: "20%", height: 25, marginLeft: "25%", marginBottom:"30%",justifyContent: "center"}}
                            >
                            <Text>SNS</Text>
                        </Button>
                        <Button rounded 
                            onPress={ this.ButtonClickCheckFunction}
                            style={{width: "20%", height: 25, marginRight :"25%", marginBottom:"30%",justifyContent: "center", backgroundColor:"#8041D9"}}
                            >
                            <Text>Seoul</Text>
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    header: {
        width:'100%',
        height:'15%',
        justifyContent: 'center',
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
    SubmitButtonStyle: {
        justifyContent: "center",
        alignItems : "center",
        width: 50,
        height: 40,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        fontSize : 9,
        marginLeft :15,
    },
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    font_header: {
        color: 'white',
        fontSize: 42,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',    
    },
    buttongroup :{
        height: '70%',
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    group: {
        width: '100%',
        height: "33%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    font_main: {
        color: '#aaa',
        fontSize: 15,
        alignItems: 'center',
    },
});