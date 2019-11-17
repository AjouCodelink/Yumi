import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Icon, Thumbnail } from 'native-base';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Chatroom_SideMenu extends Component {
    constructor(props){
        super(props);
        this.state={
            bookmark: false,
            notification: true,
            userlist: this.props.userlist,
            key: 0,
        }
    }
    _onPressBookmark() {
        this.setState({
            bookmark: !this.state.bookmark
        })
    }
    _onPressNoti() {
        this.setState({
            notification: !this.state.notification
        })
    }
    _onPressExit = () => {
        alert("You pressed Exit.")
    }
    _onPressPicture() {
        alert("You pressed Picture.")
    }
    _onPressRecom() {
        alert("You pressed Recom.")
    }
    _onPressCamera() {
        alert("You pressed Camera.")
    }
    
    render() {
        return (
            <View style={style.container}>
                <View style={style.content}>
                    <View style={style.iconBox}>
                        <TouchableOpacity onPress={() => this._onPressBookmark()}>
                                {this.state.bookmark == true
                                    ?<Icon name='md-star' style={style.icon}/>
                                    :<Icon name='md-star-outline' style={style.icon}/>
                                }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressNoti()}>
                                {this.state.notification == true
                                    ?<Icon name='md-notifications' style={style.icon}/>
                                    :<Icon name='md-notifications-off' style={style.icon}/>
                                }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressExit()}>
                            <Icon name='md-exit' style={style.icon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={style.toolBox}>
                        <TouchableOpacity onPress={() => this._onPressCamera()}>
                            <View style={style.tool}>
                                <Icon name='md-camera' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Camera</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressPicture()}>
                            <View style={style.tool}>
                                <Icon name='md-images' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Pictures</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._onPressRecom()}>
                            <View style={style.tool}>
                                <Icon name='md-locate' style={style.tool_icon}/>
                                <Text style={style.tool_text}>  Place Recommend</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.userList}>
                        <ScrollView>
                            {this.state.userlist.map( user => (user.thumbnailURL != null
                                ? (<View style={style.user} key={this.state.key++}>
                                    <Thumbnail backgroundColor="#fff" style={style.user_thumbnail}
                                        source={{ uri: this.state.thumbnailURL }}/>
                                    <Text style={style.user_name}>{user.nickname}</Text>
                                </View>)
                                : (<View style={style.user} key={this.state.key++}>
                                    <Thumbnail backgroundColor="#fff" style={style.user_thumbnail}
                                        source={require('../../assets/default_thumbnail.png')}/>
                                    <Text style={style.user_name}>{user.nickname}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: screenWidth*0.6,
        justifyContent: 'flex-start',
        backgroundColor: '#444',
    },
    content: {
        width: '100%',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBox: {
        width: '100%',
        height: 80,
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        borderBottomWidth: 2,
        borderBottomColor: '#555',
    },
    icon: {
        color: '#ddd',
        fontSize: 50,
    },
    toolBox: {
        width: '100%',
        height: 240,
        paddingLeft: 20,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        borderBottomColor: '#555',
    },
    tool: {
        marginTop: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tool_icon: {
        color: '#ddd',
        fontSize: 45,
    },
    tool_text: {
        color: '#ddd',
        fontSize: 25,
    },
    userList: {
        width: '100%',
        height: screenHeight-80-240-90, //iconbox height - toolbox height - 105
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    user: {
        width: screenWidth*0.6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 6,
    },
    user_thumbnail: {
        height: 36,
        width: 36,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 36*0.4,
    },
    user_name: {
        color: '#ddd',
        fontSize: 20,
        paddingBottom: 1,
    },
})