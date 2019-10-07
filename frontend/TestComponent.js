import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
} from 'react-native';

export default class TestComponent extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View>
        <Text>{this.props.id}의 버튼</Text>
        <Button
          color={this.props.color}
          title={this.props.title}
          onPress={this.props.updateCount}/>
      </View>
    )
  }
}