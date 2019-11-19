import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Picker } from 'native-base'

export default class CityPicker extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selected: undefined,
        seoul: [
            {label:'Gangseo-gu', value:'강남구'},
            {label:'Gangdong-gu', value:'강동구'},
            {label:'Gangbuk-gu', value:'강북구'},
            {label:'Gangseo-gu', value:'강서구'},
            {label:'Gwanak-gu', value:'관악구'},
            {label:'Gangjin-gu', value:'강진구'},
            {label:'Geumro-gu', value:'금로구'},
            {label:'Geumcheon-gu', value:'금천구'},
            {label:'Nowon-gu', value:'노원구'},
            {label:'Dobong-gu', value:'도봉구'},
            {label:'Dongdaemun-gu', value:'동대문구'},
            {label:'Dongjak-gu', value:'동작구'},
            {label:'Mapo-gu', value:'마포구'},
            {label:'Seodaemun-gu', value:'서대문구'},
            {label:'Seocho-gu', value:'서초구'},
            {label:'Seongdong-gu', value:'성동구'},
            {label:'Seongbuk-gu', value:'성북구'},
            {label:'Songpa-gu', value:'송파구'},
            {label:'Yangcheon-gu', value:'양천구'},
            {label:'Yeongdeungpo-gu', value:'영등포구'},
            {label:'Yongsan-gu', value:'용산구'},
            {label:'Eunpyeong-gu', value:'은평구'},
            {label:'Jongno-gu', value:'종로구'},
            {label:'Jung-gu', value:'중구'},
        ],
        gyeonggi: [
            {label:'Gapyeong-gun', value:'가평군'},
            {label:'Goyang', value:'고양시'},
            {label:'Gwacheon', value:'과천시'},
            {label:'Gwangmyeong-si', value:'광명시'},
            {label:'Gwangju', value:'광주시'},
            {label:'Guri', value:'구리시'},
            {label:'Gunpo', value:'군포시'},
            {label:'Gimpo', value:'김포시'},
            {label:'Namyangju', value:'남양주시'},
            {label:'Dongducheon', value:'동두천시'},
            {label:'Bucheon', value:'부천시'},
            {label:'Seongnam', value:'성남시'},
            {label:'Suwon', value:'수원시'},
            {label:'Siheung', value:'시흥시'},
            {label:'Ansan-si', value:'안산시'},
            {label:'Anseong', value:'안성시'},
            {label:'Anyang-si', value:'안양시'},
            {label:'Yangju', value:'양주시'},
            {label:'Yangpyeong-gun', value:'양평군'},
            {label:'Yeoju', value:'여주시'},
            {label:'Yeoncheon-gun', value:'연천군'},
            {label:'Osan-si', value:'오산시'},
            {label:'Yongin', value:'용인시'},
            {label:'Uiwang', value:'의왕시'},
            {label:'Uijeongbu', value:'의정부시'},
            {label:'Icheon', value:'이천시'},
            {label:'Paju-si', value:'파주시'},
            {label:'Pyeongtaek', value:'평택시'},
            {label:'Pocheon', value:'포천시'},
            {label:'Hanam', value:'하남시'},
            {label:'Hwaseong', value:'화성시'},
        ],
        incheon: [
            {label:'Ganghwa-gun', value:'강화군'},
            {label:'Gyeyang-gu', value:'계양구'},
            {label:'Namdong-gu', value:'남동구'},
            {label:'Dong-gu', value:'동구'},
            {label:'Michuhole-gu', value:'미추홀구'},
            {label:'Bupyeong-gu', value:'부평구'},
            {label:'Seo-gu', value:'서구'},
            {label:'Yeonsu-gu', value:'연수구'},
            {label:'Yongjin-gun', value:'용진군'},
            {label:'Jung-gu', value:'중구'},
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
                    <Picker.Item label={'City'} value={'noValue'}/>
                    { this.props.selectedDo == '서울특별시'
                    ? this.state.seoul.map( city => (<Picker.Item label={city.label} value={city.value} key={city.value}/>))
                    : this.props.selectedDo == '경기도'
                        ? this.state.gyeonggi.map( city => (<Picker.Item label={city.label} value={city.value} key={city.value}/>))
                        : this.state.incheon.map( city => (<Picker.Item label={city.label} value={city.value} key={city.value}/>))
                    } 
                </Picker>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        marginLeft: 20
    },
})