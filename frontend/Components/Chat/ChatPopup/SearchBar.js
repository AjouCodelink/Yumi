import React, { Component } from "react"
import { View, StyleSheet, TextInput, TouchableOpacity, StatusBar } from "react-native"
import { Icon } from 'native-base'

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    state={
        search: ''
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {[styles.searchBarConatiner, {display: this.props.display}]}>
                    <TextInput
                        ref={input => { this.textInput = input }}
                        style={styles.searchBar}
                        onSubmitEditing={() => {this.props.onPressSearch(this.state.search), this.textInput.clear()}}  // 엔터눌러도 입력되도록 함
                        placeholder="  Search..."
                        value={this.state.search}
                        onChangeText={(search) => this.setState({search})}/>
                    <TouchableOpacity
                        style={styles.searchButton} 
                        onPress={()=>{this.props.onPressSearch(this.state.search), this.textInput.clear()}}>
                        <Icon name='ios-search' style={{color: '#111'}}/>
                    </TouchableOpacity>
                </View> 
            </View>
        )
    }
}  

const styles = StyleSheet.create({
    container: {
        flex: 4,
        position : 'absolute',
        width: '100%',
        height: '100%',
    },
    searchBarConatiner: {
        flex: 3,
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight+6,
    },
    searchBar:{
        width: "75%",
        height: 40,
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 8,  
        color: '#222',
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor:'#eee',
    },
    searchButton:{
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#555',
        borderWidth: 2,
        borderRadius: 8,
        marginLeft: 15,
        backgroundColor:'#eee',
    }
})