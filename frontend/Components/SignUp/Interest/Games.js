import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import InterestList from './InterestList';

class Games extends Component {
    state = {
        section : 'Games',
        key : '0100',
        opened : 'none',
        contactData : [{
            name : 'League Of Legends',
            selected : false,
            key : '0101',
        },{
            name : "PlayerUnknown's Battlegrounds",
            selected : false,
            key : '0102',
        },{
            name : 'Overwatch',
            selected : false,
            key : '0103',
        },{
            name : 'FIFA Online 4',
            selected : false,
            key : '0104',
        },{
            name : 'SuddenAttack',
            selected : false,
            key : '0105',
        },{
            name : 'Maplestory',
            selected : false,
            key : '0106',
        },{
            name : 'StarCraft',
            selected : false,
            key : '0107',
        },{
            name : 'World Of Warcraft',
            selected : false,
            key : '0108',
        },{
            name : 'Dungeon&Fighter',
            selected : false,
            key : '0109',
        },{
            name : 'Lost Ark',
            selected : false,
            key : '0110',
        },{
            name : 'Cartrider',
            selected : false,
            key : '0111',
        },{
            name : 'Path of Exile',
            selected : false,
            key : '0112',
        },{
            name : 'Blade&Soul',
            selected : false,
            key : '0113',
        },{
            name : 'Diablo III',
            selected : false,
            key : '0114',
        },{
            name : 'etc',
            selected : false,
            key : '0199',
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


export default Games;