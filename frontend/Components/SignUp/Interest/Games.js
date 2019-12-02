import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import InterestListItem from './InterestListItem';

class Games extends Component {
    state = {
        section : 'Games',
        key : '0100',
        opened : 'none',
        contactData : [{
            name : 'Online Game',
            selected : false,
            key : '0101',
        },{
            name : 'PC Game',
            selected : false,
            key : '0102',
        },{
            name : "Mobile Game",
            selected : false,
            key : '0103',
        },{
            name : 'Console Game',
            selected : false,
            key : '0104',
        },{
            name : 'Board Game',
            selected : false,
            key : '0105',
        },{
            name : 'RPG',
            selected : false,
            key : '0106',
        },{
            name : 'FPS',
            selected : false,
            key : '0107',
        },{
            name : 'AOS',
            selected : false,
            key : '0108',
        },{
            name : 'RTS',
            selected : false,
            key : '0109',
        },{
            name : 'Rhythm Game',
            selected : false,
            key : '0110',
        },{
            name : 'Defense Game',
            selected : false,
            key : '0111',
        },{
            name : 'Racing Game',
            selected : false,
            key : '0112',
        },{
            name : 'Sandbox Game',
            selected : false,
            key : '0113',
        },{
            name : 'BattleRoyal',
            selected : false,
            key : '0114',
        },{
            name : 'Card Game',
            selected : false,
            key : '0115',
        },{
            name : 'Indie Game',
            selected : false,
            key : '0116',
        },{
            name : 'Puzzle Game',
            selected : false,
            key : '0117',
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


export default Games;