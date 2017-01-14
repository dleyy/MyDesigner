'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import {navheight,screenWidth,screenHeight,MainTabHeight,Size,PhImages} from '../constStr';
export default  class Button extends Component {

  render() {
    return (
      <View	style={styles.container}>
      		<TouchableOpacity  onPress={this.props.Click} 
      			style={[styles.buttonStyle,{backgroundColor:this.props.bgcolor}]}>
      			<Text style={styles.buttonText}>{this.props.contentText}</Text>
      		</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	buttonStyle:{
		backgroundColor:'rgb(69,175,175)',
		width:screenWidth-30,
		height:45,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius:10,
	},
	buttonText:{
		color:'#fff',
		fontSize:Size(16),
	}
});
