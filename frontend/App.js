import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';

import LoadingScreen from './Components/LoadingScreen';
import MainScreen from './Components/MainScreen';
import TitleScreen from './Components/TitleScreen';
import Chatroom from './Components/Chat/Chatroom';
import SignUpScreen from './Components/SignUpScreen';

const RootNavigator = createStackNavigator({
  Loading:{
    screen: LoadingScreen
  },
  Title:{
    screen: TitleScreen
  },
  Main:{
    screen: MainScreen
  },
  SignUp:{
    screen: SignUpScreen
  },
  Chatroom:{
    screen: Chatroom
  }}, {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(RootNavigator);



