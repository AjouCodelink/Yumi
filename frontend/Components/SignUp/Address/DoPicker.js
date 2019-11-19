import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Picker } from 'native-base'

export default class DoPicker extends Component {

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
                    <Picker.Item label="Province" value="NoValue" />
                    <Picker.Item label="Seoul" value="서울특별시" />
                    <Picker.Item label="Gyeonggi" value="경기도" />
                    <Picker.Item label="Incheon" value="인천광역시" />
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