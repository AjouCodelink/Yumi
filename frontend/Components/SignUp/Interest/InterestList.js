import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

class ContactInfo extends Component {
    render() {
        const data = this.props.data;
        return (
            <View>
                <TouchableOpacity style={style.interestBox} onPress={() => this.props._onPress(data.key)}>
                    {
                        data.selected
                            ? <Icon name='md-checkbox-outline' style={{color: "#ddd", fontSize: 24}}/>
                            : <Icon name='md-square-outline' style={{color: "#777", fontSize: 24}}/>
                    }
                    {
                        data.selected
                            ? <Text style={{fontSize: 18, color: '#ddd'}}> {data.name}</Text>
                            : <Text style={{fontSize: 18, color: '#777'}}> {data.name}</Text>
                    }
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    interestBox: {
        flexDirection: 'row',
        paddingBottom: 4,
    },
})

export default ContactInfo;