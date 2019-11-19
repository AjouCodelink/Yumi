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
                    <Picker.Item label="English" value="EN" />
                    <Picker.Item label="中國語" value="CH" />
                    <Picker.Item label="日本語" value="JP" />
                    <Picker.Item label="Русский" value="RU" />
                    <Picker.Item label="français" value="FR" />
                    <Picker.Item label="español" value="ES" />
                    <Picker.Item label="한국어" value="KR" />
                </Picker>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        borderColor: '#ddd',
        borderBottomWidth: 1,
    },
})