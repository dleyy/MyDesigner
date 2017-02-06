'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';

import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
export default class loading extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      animating:true,
    };
  }

  render() {
    return (
      <View style = {styles.content}>
      	<ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height:120}]}
          size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	content:{
		flex:1,
		justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top:screenHeight/2,
    left:screenWidth/2,
	},
  centering:{
    alignItems: 'center',
    alignSelf:'center',
  }
});
