import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  Text,
} from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
export default class Navibar extends Component {
  render() {
    return (
      <View style={styles.main}>
      	<TouchableOpacity style={styles.leftImg} onPress={this.props.back}>
      		<Icon name="ios-arrow-back-outline" size={25} color={this.props.leftIconColor?this.props.leftIconColor:mainColor} />
      	</TouchableOpacity>

      	<View style={styles.centercontent}>
      		<Text style={(this.props.titleStyle)?this.props.titleStyle:styles.defaultStyle}>
      			{this.props.titleText}
      		</Text>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	main:{
		height:navheight,
		width:screenWidth,
		flexDirection:'row',
		borderBottomWidth:0.5,
		borderBottomColor:'#A9A9A9',
	},
	leftImg:{
		width:50,
		height:navheight,
		justifyContent: 'center',
		alignItems: 'center',
	},
	centercontent:{
		flex:1,
		height:navheight,
		justifyContent: 'center',
		alignItems: 'center',
	},
	defaultStyle:{
		color:'#0f0',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize:14,
	}
});
