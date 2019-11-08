import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity,Text, TextInput} from 'react-native';
import { Container, Header, Item, InputGroup, Input, Button, Icon, Right } from 'native-base';
import {SearchBar} from 'react-native-elements'
import LottieView from 'lottie-react-native';
import { Animated, Easing } from 'react-native';
import CustomButton from '../CustomButton';
type Props = {};
export default class ChatManageTab extends Component {
    state = {
        search : '',
    };
    updateSearch = search =>{
        this.setState({search});
    };
    ButtonClickCheckFunction = () =>{

    alert("Button Clicked");
}
    constructor(props) {
        super(props);
        this.state = {
        progress: new Animated.Value(0),
    };
}
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-add-circle' size={300} style={{color: tintColor}} />
        ),
    }
    
    render() {
        const {search} = this.state;
        return (
            <View style={style.container}>
            
                <View style = {style.search}>
                <TextInput
                        style={{height: 40, width: 300, backgroundColor:'#666',  fontSize:18, borderRadius: 5,paddingLeft: 10}}
                        placeholder="Search..."
                        value={this.state.search}
                        onChangeText={(search) => this.setState({search})}
                />
                <Button 
                style={{backgroundColor: '#384850',width: 50, height: 40, marginLeft :15, backgroundColor:'#AAA',}} 
                onPress={ this.ButtonClickCheckFunction}
                >
                <Icon name='ios-search' style={{color: '#FFF'}}/>
                </Button>     
                </View>
                <View style={style.content}>
                </View>
                    <View style ={style.buttongroup}>
                    <LottieView  source={require('../LottieAnimation/8874-cat.json')} autoplay loop/>
                        <View style = {style.group}>
                                    <View style={style.button1}>
                                        <CustomButton
                                            title={'Sports'}
                                            titleColor={'#ddd'}
                                            buttonColor={'#000'}/>
                                    </View>
                                    <View style={style.button2}>
                                        <CustomButton
                                            title={'Movie'}
                                            titleColor={'#000'}
                                            buttonColor={'#ddd'}/>
                                    </View>
                        </View>
                        <View style = {style.group}>
                                <View style={style.button3}>
                                        <CustomButton
                                            title={'Korea'}
                                            titleColor={'#ddd'}
                                            buttonColor={'red'}/>
                                    </View>
                            <View style={style.button4}>
                                        <CustomButton
                                            title={'Food'}
                                            titleColor={'#000'}
                                            buttonColor={'green'}/>
                                        </View>
                        </View>
                        <View style = {style.group}>
                                <View style={style.button5}>
                                        <CustomButton
                                            title={'SNS'}
                                            titleColor={'#ddd'}
                                            buttonColor={'orange'}/>
                                        </View>
                                <View style={style.button6}>
                                        <CustomButton
                                            title={'Seoul'}
                                            titleColor={'#000'}
                                            buttonColor={'skyblue'}/>
                                        </View>
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
        height: '33%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor: "white",
    },
    button1: {
        width:'20%',
        height: 20,
        marginRight: '15%',
        marginTop: '10%',
        paddingTop: '15%',
    },
    button2: {
        width:'20%',
        height: 20,
        marginTop: '10%',
        paddingTop: '15%',
    },
    button3: {
        width:'20%',
        height: 25,
        marginRight: '25%',
    },
    button4: {
        width:'20%',
        height: 25,
    },
    button5: {
        width:'20%',
        height: 15,
        marginRight: '15%',
        marginBottom: '15%',
        paddingBottom: '20%',
    },
    button6: {
        width:'20%',
        height:     15,
        marginBottom: '15%',
        paddingBottom: '20%',
    },
    font_main: {
        color: '#aaa',
        fontSize: 15,
        alignItems: 'center',
    },
});