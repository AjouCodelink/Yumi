// App.js
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from './CustomButton';
import Animation from 'lottie-react-native';
import anim from './data.json';



type Props = {};
export default class lottieloader extends Component {
  componentDidMount() {
    this.animation.play();
  }

 
  render() {
    return (
      <View style={styles.container}>
     
           <View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
             
              width:  400,
              height: 450,
            }}
            loop={true}
            source={anim}
          />
        </View>
        <View style={styles.content}></View>
        <View style={styles.footer}>
       <CustomButton
            buttonColor={'#023e71'}
            title={'회원가입'}
            onPress={() => alert('회원가입 버튼')}/>
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