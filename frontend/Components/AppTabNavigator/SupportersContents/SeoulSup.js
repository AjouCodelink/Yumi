import React, { Component } from 'react';
import { Image, Text, StyleSheet, View , LinkingStyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Alert, Linking,FlatList} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body,Right } from 'native-base';

    const SeoulData = [
        {id:1, title : "Seoul Supporters Events", HeaderImage : "https://yeyak.seoul.go.kr/pluginfree/seoul_symbol.jpg", Date: '#November 15,2019', 
        PosterImage: "https://jobfair.contactkorea.go.kr/images/v2018/main_logo.png",
        description:"#International Student Job fair in Seoul Coex Convention Center", fee:"#free", supportersemail:"ABC@ajou.ac.kr",DueDay:"#Until 1128",
        HomepageURL:"http://jobfair.contactkorea.go.kr/?n_media=79157&n_query=%EC%99%B8%EA%B5%AD%EC%9D%B8%EC%9C%A0%ED%95%99%EC%83%9D%EC%B1%84%EC%9A%A9%EB%B0%95%EB%9E%8C%ED%9A%8C&n_rank=1&n_ad_group=grp-a001-01-000000012294916&n_ad=nad-a001-01-000000072433067&n_keyword_id=nkw-a001-01-000002274596566&n_keyword=%EC%99%B8%EA%B5%AD%EC%9D%B8%EC%B7%A8%EC%97%85&n_campaign_type=1"}
    ];

    export default SeoulData;