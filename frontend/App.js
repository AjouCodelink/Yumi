import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';

import LoadingScreen from './Components/LoadingScreen';
import MainScreen from './Components/MainScreen';
import TitleScreen from './Components/TitleScreen';
import Chatroom from './Components/Chat/Chatroom';
import SignUp_Welcome from './Components/SignUp/SignUp_Welcome';
import SignUp_EmailAuth from './Components/SignUp/SignUp_EmailAuth';
import SignUp_Detail from './Components/SignUp/SignUp_Detail';
import SignUp_Interest from './Components/SignUp/SignUp_Interest';
import SignUp_Done from './Components/SignUp/SignUp_Done';

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
  SignUp_Welcome:{
    screen: SignUp_Welcome
  },
  SignUp_EmailAuth:{
    screen: SignUp_EmailAuth
  },
  SignUp_Detail:{
    screen: SignUp_Detail
  },
  SignUp_Interest:{
    screen: SignUp_Interest
  },
  SignUp_Done:{
    screen: SignUp_Done
  },
  Chatroom:{
    screen: Chatroom
  }}, {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(RootNavigator);



