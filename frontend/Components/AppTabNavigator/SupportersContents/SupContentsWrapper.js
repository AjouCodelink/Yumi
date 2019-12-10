import React, { Component } from 'react';
import { Image, Text, StyleSheet, View , LinkingStyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Alert, Linking,FlatList} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body,Right } from 'native-base';
import SeoulData from './SeoulSup'
import AjouData from './AjouSup'

export default class AjouSup extends Component {
    constructor(props) {
    super(props);
    this.name = "CodeLink"
    this.state = {
        data : [

        ]
    };
    }
    
    Moreinfo(homepage) {
        Linking.openURL(homepage);
    }
    ShowPoster(img_path){
        Linking.openURL('http://101.101.160.185:3000/images/'+img_path);
    }
    Apply(email){
        Linking.openURL('mailto:'+email);
    }
    headerurl(item)
    {
        if(item.host == 'Seoul'){
            return 'https://yeyak.seoul.go.kr/pluginfree/seoul_symbol.jpg'
        }
        else if(item.host =='Nubi Ajou'){
            return 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/41328230_844681932322803_709278544303226880_n.png?_nc_cat=102&_nc_ohc=mRDUG3P6y8gAQmfBVFmLYMFeysIgBqZi4y39NlXR9fHuQB8MboTsiKA_A&_nc_ht=scontent-icn1-1.xx&oh=97ac9c2ca1dfb8034a1d9104b60c13c5&oe=5E7C951D'
        }
        else{
            return 'https://upload.wikimedia.org/wikipedia/commons/4/44/Ajou_Univ_Ui.png';
        }
        
        
    }
    render() {
        return (
            <Container>
                <Content>
                    <FlatList
                        data = {this.props.supporter_info}
                        keyExtractor = {(item,index)=>String(index)}
                        renderItem = {({item}) => {
                            return(
                                <Card style={{flex: 0, width: '99%',justifyContent: 'center'}}>
                                    <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: this.headerurl(item)}} />
                                        <Body>
                                            <Text style={styles.font_title}>{item.name}</Text>
                                            <Text style={styles.font_date}>{item.time.toString().substr(0, 15)}</Text>
                                        </Body>
                                    </Left>
                                    </CardItem>
                                    <CardItem>
                                    <Body>
                                        <TouchableOpacity style = {{width: '100%', height:350}} onPress={() => {this.ShowPoster(item.img_path)}}>
                                            <Image
                                            source={{uri: 'http://101.101.160.185:3000/images/'+item.img_path}} style={{ width: "100%", height: null, flex: 1,resizeMode: 'contain',alignItems: 'center'}}/>
                                        </TouchableOpacity>
                                        <Text style = {{marginTop: 15}}>{item.text}</Text>
                                    </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Button transparent onPress={() => {this.Moreinfo(item.homepage)}}>
                                                <Text style ={styles.font_button}>  More info...  </Text>
                                            </Button>
                                        </Left>
                                        <Right>
                                            <Button transparent onPress={() => {this.Apply(item.email)}}>
                                                <Text style ={styles.font_button}>  Apply  </Text>
                                            </Button>
                                            
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        }}/>
                </Content>
            </Container>
        );
    }
    }

const styles = StyleSheet.create({
    font_title: {
        fontWeight: 'bold',
        fontSize : 17,
    },
    font_date: {
        fontSize : 14,
        color: '#222'
    },
    font_main: {
        fontSize : 12,
    },
    font_button: {
        fontWeight: 'bold',
        color: '#20B2AA',
        fontSize : 16,
    },
}
);