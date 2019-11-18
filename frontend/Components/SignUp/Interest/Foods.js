import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import InterestList from './InterestList';

class Foods extends Component {
    state = {
        section : 'Foods',
        key : '0300',
        opened : 'none',
        contactData : [{
            name : 'Cooking',
            selected : false,
            key : '0301',
        },{
            name : 'Korean food',
            selected : false,
            key : '0302',
        },{
            name : 'Italian food',
            selected : false,
            key : '0303',
        },{
            name : 'Japanese food',
            selected : false,
            key : '0304',
        },{
            name : 'Chinese food',
            selected : false,
            key : '0305',
        },{
            name : 'American food',
            selected : false,
            key : '0306',
        },{
            name : 'Thai food',
            selected : false,
            key : '0307',
        },{
            name : 'Filipino food',
            selected : false,
            key : '0308',
        },{
            name : 'Indian food',
            selected : false,
            key : '0309',
        },{
            name : 'Hong Kong Food',
            selected : false,
            key : '0310',
        },{
            name : 'Vietnamese food',
            selected : false,
            key : '0311',
        },{
            name : 'etc',
            selected : false,
            key : '0399',
        },]
    }
    _onPressSection() {
        if (this.state.opened == 'none') {
            this.setState({opened: 'flex'})
        } else {
            this.setState({opened: 'none'})
        }
    }
    _onPressGroup = (key) => {
        this.setState(prevState => {
            const [ data ] = prevState.contactData.filter(e => e.key === key);
            if (data.selected == false) {
                this.props.interAdd(this.state.section, data.name, data.key);
            } else {
                this.props.interRemove(data.key);
            }
            data.selected = !data.selected;
            const contactData = [
                ...prevState.contactData
            ];
            return ({contactData})
        });
    }
    render() {
        return (
            <View style = {style.container}>
                <TouchableOpacity style={style.section} onPress={() => this._onPressSection()}>
                    <Text style={{color: '#ddd', fontSize: 20}}>{this.state.section}</Text>
                    {
                        this.state.opened == 'flex'
                            ?<Icon name='md-arrow-dropdown' style={{color: "#ddd", fontSize: 32}}/>
                            :<Icon name='md-arrow-dropup' style={{color: "#ddd", fontSize: 32}}/>
                    }
                </TouchableOpacity>
                <View style={[style.list, {display: this.state.opened}]}>
                    {
                        this.state.contactData.map( contactData => (
                            <InterestList data={contactData} _onPress={this._onPressGroup}/>
                        ))
                    }
                </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        width: '100%',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '3%',
        paddingRight: '4%',
        padding: 3,
        marginBottom: 5,
        backgroundColor: '#444',
    },
    list: {
        paddingLeft: '4%',
    }
})


export default Foods;