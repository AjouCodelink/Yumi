import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import InterestListItem from './InterestListItem';

class Study extends Component {
    state = {
        section : 'Study',
        key : '0400',
        opened : 'none',
        contactData : [{
            name : 'Engineering',
            selected : false,
            key : '0401',
        },{
            name : 'Information & Technology',
            selected : false,
            key : '0402',
        },{
            name : 'Natural Sciences',
            selected : false,
            key : '0403',
        },{
            name : 'Business Administration',
            selected : false,
            key : '0404',
        },{
            name : 'Humanities',
            selected : false,
            key : '0405',
        },{
            name : 'Socical Sciences',
            selected : false,
            key : '0406',
        },{
            name : 'Medicine',
            selected : false,
            key : '0407',
        },{
            name : 'Nursing',
            selected : false,
            key : '0408',
        },{
            name : 'International Studies',
            selected : false,
            key : '0409',
        },{
            name : 'Basic Subjects',
            selected : false,
            key : '0410',
        },{
            name : 'etc',
            selected : false,
            key : '0499',
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
                            <InterestListItem key={contactData.key} data={contactData} _onPress={this._onPressGroup}/>
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


export default Study;