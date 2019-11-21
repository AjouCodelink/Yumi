import React, { Component } from 'react';
import { StyleSheet,Text,View,TouchableOpacity,Image,ScrollView,FlatList,Alert, Linking} from 'react-native';
import {Icon} from 'native-base'

export default class Menu extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name='paper' style={{color: "#FF007F"}}/>
        ),
        header: null,
    }

constructor(props) {
    super(props);
    this.state = {
        data: [
            {id:1, title: "You",      color:"#FF4500", members:8,  image:"https://image.flaticon.com/icons/svg/2090/2090208.svg"},
            {id:2, title: "Home",     color:"#87CEEB", members:6,  image:"https://img.icons8.com/office/70/000000/home-page.png"},
            {id:3, title: "Love",     color:"#4682B4", members:12, image:"https://img.icons8.com/color/70/000000/two-hearts.png"} ,
            {id:4, title: "Family",   color:"#6A5ACD", members:5,  image:"https://img.icons8.com/color/70/000000/family.png"} ,
            {id:5, title: "Friends",  color:"#FF69B4", members:6,  image:"https://img.icons8.com/color/70/000000/groups.png"} ,
            {id:6, title: "School",   color:"#00BFFF", members:7,  image:"https://img.icons8.com/color/70/000000/classroom.png"} ,
        ]
    };
}

clickEventListener(item) {
    Linking.openURL('http://oia.ajou.ac.kr/oia/board/board02_01.jsp?mode=view&article_no=204074');
}

    render() {
        return (
        <View style = {styles.container}>
        <View style = {styles.header}>
        </View>
            <View style ={{width: '100%', backgroundColor: '#20B2AA'}}>
                    <Text style = {{fontSize : 16, margin : 15,color :"#fff"}}>Supporters</Text>
                </View>
            <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={this.state.data}
                horizontal={false}
                numColumns={2}
                keyExtractor= {(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                return (
                    <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {this.clickEventListener(item)}}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                            <Image style={styles.cardImage} source={{uri:item.image}}/>
                        <View style={styles.cardFooter}>
                            <Text style={styles.subTitle}></Text>
                        </View>
                    </TouchableOpacity>
                )
            }}/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#E6E6E6",

    },
    header:{
        marginTop: 24,
        width : "100%",

    },
    list: {

        marginTop: 10,
        backgroundColor:"#E6E6E6",
    },
    listContainer:{
        alignItems:'center'
    },
    /******** card **************/
    card:{
        marginHorizontal:2,
        marginVertical:2,
        flexBasis: '48%',
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
        justifyContent:"center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage:{
        height: 70,
        width : '80%',
        alignSelf:'center',
        resizeMode : 'contain'
    },
    title:{
        fontSize:16,
        flex:1,
        color:"#FFFFFF",
        fontWeight:'bold'
    },
    subTitle:{
        fontSize:12,
        flex:1,
        color:"#FFFFFF",
    },
    icon:{
        height: 20,
        width: 20, 
    }
});     