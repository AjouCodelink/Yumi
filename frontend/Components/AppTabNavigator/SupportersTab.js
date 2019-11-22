import React, { Component } from 'react';
import { StyleSheet,Text,View,TouchableOpacity,Image,ScrollView,FlatList,Alert, Linking} from 'react-native';
import {Icon} from 'native-base'
import SupContentsWrapper from './SupportersContents/SupContentsWrapper'

export default class SupportersTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='paper' style={{color: "#FF007F"}}/>
        ),
        header: null,
    }
constructor(props) {
    super(props);
}
    render() {
        return (
        <View style = {styles.container}>
            <View style = {styles.header}>
            </View>
                <View style ={{width: '100%', backgroundColor: '#20B2AA'}}>
                        <Text style = {{fontSize : 16, margin : 15,color :"#fff"}}>Supporters</Text>
                </View>
            
                    <SupContentsWrapper />
            
        </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    header:{
        marginTop: 24,
        width : "100%",
    },

    /******** card **************/

});     