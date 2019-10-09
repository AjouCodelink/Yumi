import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class CustomButton extends Component{
  static defaultProps = {
    title: 'Log in',
    buttonColor: '#000',
    titleColor: '#fff',
    onPress: () => alert('인증과정 거치고 메인화면으로'),
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity style={[
        styles.button,
        {backgroundColor: this.props.buttonColor}
      ]}
      onPress={this.props.onPress}>
        <Text style={[
          styles.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    left: '25%',
    bottom: '60%',
    marginBottom: 20,
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
  },
});