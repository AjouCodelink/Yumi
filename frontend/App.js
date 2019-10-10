import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';
import MainScreen from './Components/MainScreen';
import TitleScreen from './Components/TitleScreen';

const AppStackNavigator = createStackNavigator({
  Title:{
    screen: TitleScreen
  },
  Main:{
    screen: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  },
}
);

export default createAppContainer(AppStackNavigator);



