import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, } from 'native-base'

import DoPicker from '../SignUp/Address/DoPicker'
import CityPicker from '../SignUp/Address/CityPicker'

export default class EditAddress extends Component {
    constructor(props){
        super(props)
    }

    state = {
        selectedDo: 'noValue',
        selectedCity: 'noValue',
        address: '',
        display: this.props.display
    }

    doChange = (value) => {
        this.setState({
            selectedDo: value,
            selectedCity: 'noValue'
        })
    }

    cityChange = (value) => {
        this.setState({
            selectedCity: value, 
            address: this.state.selectedDo+' '+value
        })
    }

    _onPressCancel = () => {
        this.popupClose()
    }

    _onPressAdmit = () => {
        //todo: 서버와 연동
        this.popupClose()
    }

    popupClose = () => {
        this.props.displayChange('none');
    }

    render() {
        return (
            <View style={style.container}>
                <View style={[style.backGround, {display: this.props.display}]}>
                    <View style={style.content}>
                        <Text style={style.font_Title}>Edit Address</Text>
                        <View style={{height: 45, width: 250, margin:10}}>
                            <DoPicker valueChange={this.doChange}/>
                        </View>
                        <View style={{height: 45, width: 250}}>
                            <CityPicker selectedDo={this.state.selectedDo} valueChange={this.cityChange}/>
                        </View>
                        <View style={style.pickerContainer}>
                            <TouchableOpacity >
                                <Button onPress={() => this._onPressCancel()} style={{backgroundColor: '#bbb', width: 80, justifyContent: 'center', marginRight:20}}>
                                    <Text>Cancel</Text>
                                </Button>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Button onPress={() => this._onPressAdmit()} style={{backgroundColor: '#7f7', width: 80, justifyContent: 'center', marginLeft:20}}>
                                    <Text>Admit</Text>
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )   
    }
}

const style = StyleSheet.create({
    container: {
        flex: 3,
        width: '100%',
        height: '100%',
        position : 'absolute',
    },
    backGround: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
        width: 300,
        height: 350,
        borderRadius: 20,
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    font_Title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ddd',
        margin: 15,
    },
    pickerContainer: {
        flexDirection : 'row',
        margin: 35,
        justifyContent: 'center',
    },
})