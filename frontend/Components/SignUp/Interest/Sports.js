import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import InterestList from './InterestList';

class Sports extends Component {
    state = {
        section : 'Sports',
        key : '0200',
        opened : 'none',
        contactData : [{
            name : 'Soccer',
            selected : false,
            key : '0201',
        },{
            name : 'Baseball',
            selected : false,
            key : '0202',
        },{
            name : 'Basketball',
            selected : false,
            key : '0203',
        },{
            name : 'Volleyball',
            selected : false,
            key : '0204',
        },{
            name : 'Table tennis',
            selected : false,
            key : '0205',
        },{
            name : 'Badminton',
            selected : false,
            key : '0206',
        },{
            name : 'Wrestling',
            selected : false,
            key : '0207',
        },{
            name : 'Induction',
            selected : false,
            key : '0208',
        },{
            name : 'Boxing',
            selected : false,
            key : '0209',
        },{
            name : 'Tennis',
            selected : false,
            key : '0210',
        },{
            name : 'Taekwondo',
            selected : false,
            key : '0211',
        },{
            name : 'etc',
            selected : false,
            key : '0299',
        },]
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
            data.selected = !data.selected;
            const contactData = [
                ...prevState.contactData
            ];
            return ({contactData})
        });
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


export default Sports;