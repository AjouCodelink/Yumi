import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';
import MainScreen from './Components/MainScreen';

import CustomButton from './CustomButton';
import Animation from 'lottie-react-native';

export default class lottieloader extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Animation
            resizeMode='cover'
//            source={require('./title.json')}
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: '100%',
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            loop={true}
          />
        </View>
        <View style={styles.content}></View>
        <View style={styles.footer}>
          <CustomButton
            buttonColor={'#ddd'}
            titleColor={'#000'}
            title={'Sign up'}
            onPress={() => alert('회원가입창 뜨고 정보입력 받고 이메일인증')}/>
          <CustomButton />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey',
  },
  header: {
    width:'100%',
    height:'9%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width:'100%',
    height:'18%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    
    width:'100%',
    height:'20%',
    
    
  },
});

const AppStackNavigator = createStackNavigator({
  Main:{
    screen: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  },
}
);

//export default createAppContainer(AppStackNavigator);



