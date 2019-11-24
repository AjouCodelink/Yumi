import React, { Component } from "react"
import { StyleSheet, Dimensions } from "react-native"
import { Fab, Icon, Button } from 'native-base'

const screenHeight = Math.round(Dimensions.get('window').height);

export default class Fabs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fab
                active={this.props.active}
                direction="up"
                containerStyle={styles.Container}
                style={styles.big_fab}
                onPress={() => this.props.onPressFabs()}>
                <Icon style={{fontSize: 40}} name="navigate" />
                <Button   
                    onPress={() => this.props.onPressCreate('flex')}
                    activeOpacity={0.7} 
                    style={styles.button_create} >
                    <Icon name='chatbubbles' style={{fontSize: 22, color: '#FFF'}}/>
                </Button>
                <Button 
                    onPress={()=> this.props.onPressSearch('flex')} 
                    activeOpacity={0.7} 
                    style={styles.button_search} >
                    <Icon name='ios-search' style={{fontSize: 22, color: '#FFF'}}/>
                </Button>
                <Button  
                    onPress={()=> this.props.onPressSuggest()} 
                    activeOpacity={0.5} 
                    style={styles.button_suggest}>
                    <Icon name='md-color-wand' style={{fontSize: 22, color: '#222'}}/>
                </Button>
            </Fab>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        position : 'absolute',
        flexDirection : 'row',
        right: screenHeight*0.03,
        bottom: screenHeight*0.02,
    },
    big_fab: {
        backgroundColor: '#5067FF',
        width: 65,
        height: 65,
        borderRadius: 70
    },
    button_search:{
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#33AAFF',
    },
    button_create: {
        width:  45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#44DD44',
    }, 
    button_suggest : {
        width:  45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#eeee33',
    },
})