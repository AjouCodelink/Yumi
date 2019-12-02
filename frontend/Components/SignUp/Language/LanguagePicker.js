import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Picker } from 'native-base'

export default class LanguagePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "NoValue"
        };
    }

    onValueChange(value) {
        this.setState({ selected: value });
        this.props.valueChange(value);
    }

    render() {
        return (
            <View style={[style.container, {height: this.props.height}]}>
                <Picker
                    mode="dropdown"
                    note={false}
                    style={{ color: '#ddd', width: this.props.width }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label='Language' value='noValue'/>
                    <Picker.Item label="한국어" value="ko" />
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="日本語" value="ja" />
                    <Picker.Item label="简体中文" value="zh-cn" />
                    <Picker.Item label="繁體中文" value="zh-tw" />
                </Picker>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
})