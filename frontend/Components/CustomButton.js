import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class CustomButton extends Component{
  static defaultProps = {
    title: 'default',
    titleColor: '#fff',
    buttonColor: '#000',
    onPress: () => alert(),
  }

  constructor(props){
    super(props);
}
  render(){
    return (
      <TouchableOpacity style={[
        style.button,
        {backgroundColor: this.props.buttonColor}
      ]}
      onPress={this.props.onPress}>
        <Text style={[
          style.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
  },
});