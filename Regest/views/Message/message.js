
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';

export default class message extends Component {
  render() {
    return (
      <View style={styles.main}>
      		<Text>This is 消息</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	main:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});