import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Picker } from 'native-base'

export default class GroupPicker extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selected: undefined,
        foods: [
            {label:'Cooking', value:'Cooking'},
            {label:'Korean food', value:'Korean food'},
            {label:'Italian food', value:'Italian food'},
            {label:'Japanese food', value:'Japanese food'},
            {label:'Chinese food', value:'Chinese food'},
            {label:'American food', value:'American food'},
            {label:'Thai food', value:'Thai food'},
            {label:'Filipino food', value:'Filipino food'},
            {label:'Indian food', value:'Indian food'},
            {label:'Hong Kong Food', value:'Hong Kong Food'},
            {label:'Vietnamese food', value:'Vietnamese food'},
            {label:'etc', value:'etc'},
        ],
        games: [
            {label:'Online Game', value:'Online Game'},
            {label:'PC Game', value:'PC Game'},
            {label:'Mobile Game', value:'Mobile Game'},
            {label:'Console Game', value:'Console Game'},
            {label:'Board Game', value:'Board Game'},
            {label:'RPG', value:'RPG'},
            {label:'FPS', value:'FPS'},
            {label:'AOS', value:'AOS'},
            {label:'RTS', value:'RTS'},
            {label:'Rhythm Game', value:'Rhythm Game'},
            {label:'Defense Game', value:'Defense Game'},
            {label:'Racing Game', value:'Racing Game'},
            {label:'Sandbox Game', value:'Sandbox Game'},
            {label:'BattleRoyal', value:'BattleRoyal'},
            {label:'Card Game', value:'Card Game'},
            {label:'Indie Game', value:'Indie Game'},
            {label:'Puzzle Game', value:'Puzzle Game'},
            {label:'etc', value:'etc'},
        ],
        sports: [
            {label:'Soccer', value:'Soccer'},
            {label:'Baseball', value:'Baseball'},
            {label:'Basketball', value:'Basketball'},
            {label:'Volleyball', value:'Volleyball'},
            {label:'Table tennis', value:'Table tennis'},
            {label:'Badminton', value:'Badminton'},
            {label:'Wrestling', value:'Wrestling'},
            {label:'Induction', value:'Induction'},
            {label:'Boxing', value:'Boxing'},
            {label:'Tennis', value:'Tennis'},
            {label:'Taekwondo', value:'Taekwondo'},
            {label:'etc', value:'etc'},
        ],
        study: [
            {value:'Engineering'},
            {value:'Information & Technology'},
            {value:'Natural Sciences'},
            {value:'Business Administration'},
            {value:'Humanities'},
            {value:'Socical Sciences'},
            {value:'Medicine'},
            {value:'Nursing'},
            {value:'International Studies'},
            {value:'Basic Subjects'},
            {value:'etc'},
        ]
    };

    onValueChange(value) {
        this.props.valueChange(value);
        this.setState({ selected: value });
    }

    render() {
        return (
            <View style={[style.container, {height: this.props.height}]}>
                <Picker
                    note
                    mode="dropdown"
                    style={{ color: '#ddd', width: this.props.width }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}>
                    { this.props.selectedSection == 'Foods'
                    ? this.state.foods.map( group => (<Picker.Item label={group.value} value={group.value} key={group.value}/>))
                    : this.props.selectedSection == 'Games'
                        ? this.state.games.map( group => (<Picker.Item label={group.value} value={group.value} key={group.value}/>))
                        : this.props.selectedSection == 'Sports'
                            ? this.state.sports.map( group => (<Picker.Item label={group.value} value={group.value} key={group.value}/>))
                            : this.props.selectedSection == 'Study'
                                ? this.state.study.map( group => (<Picker.Item label={group.value} value={group.value} key={group.value}/>))
                                : <Picker.Item label={'Group'} value={'noValue'}/>
                    } 
                </Picker>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
})