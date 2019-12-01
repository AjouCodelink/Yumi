import React, { Component } from 'react';
import { Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';

import Detail from './SignUp/Detail';
import Done from './SignUp/Done';
import EmailAuth from './SignUp/EmailAuth';
import Interest from './SignUp/Interest';
import Welcome from './SignUp/Welcome';

const signUpNavigator = createStackNavigator({
    SignUp_Welcome: Welcome,
    SignUp_EmailAuth: EmailAuth,
    SignUp_Detail: Detail,
    SignUp_Interest: Interest,
    SignUp_Done: Done,
    }, {
    initialRouteName: 'SignUp_Welcome'
    }
);

const SignUpContainet = createAppContainer(signUpNavigator)

export default class SignUpScreen extends Component {
    constructor (props) {
        super(props);
        RootNavigator = (route) => {this.props.navigation.navigate(route)}
        initNavigator = () => {this.props.init}
    }
    static navigationOptions = {
        header: null,
        tabBarIcon: ({tintColor}) => (
            <Icon name='md-chatboxes' style={{color: "#FFBB00"}} />
        ),
    }
    render() {
        return <SignUpContainet/>; 
    }
}