import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';

import MainScreen from './Components/MainScreen';
import TitleScreen from './Components/TitleScreen';
import SignUp_Welcome from './Components/SignUp/SignUp_Welcome';
import SignUp_EmailAuth from './Components/SignUp/SignUp_EmailAuth';
import SignUp_Detail from './Components/SignUp/SignUp_Detail';

const AppStackNavigator = createStackNavigator({
  Title:{
    screen: TitleScreen
  },
  Main:{
    screen: MainScreen
  },
  SignUp_Welcome:{
    screen: SignUp_Welcome
  },
  SignUp_EmailAuth:{
    screen: SignUp_EmailAuth
  },
  SignUp_Detail:{
    screen: SignUp_Detail
  },
}
);

export default createAppContainer(AppStackNavigator);



