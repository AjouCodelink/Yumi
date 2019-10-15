import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';

import MainScreen from './Components/MainScreen';
import TitleScreen from './Components/TitleScreen';
import SignUp0 from './Components/SignUp/SignUp0';
import SignUp1 from './Components/SignUp/SignUp1';
import SignUp2 from './Components/SignUp/SignUp2';

const AppStackNavigator = createStackNavigator({
  Title:{
    screen: TitleScreen
  },
  Main:{
    screen: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  },
  SignUp0:{
    screen: SignUp0 // 인삿말
  },
  SignUp1:{
    screen: SignUp1 // 이메일인증
  },
  SignUp2:{
    screen: SignUp2 // 자세한 내용 입력
  },
}
);

export default createAppContainer(AppStackNavigator);



