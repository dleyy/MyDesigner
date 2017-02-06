
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';

export default class mine extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  
  render() {
    return (
      <View style={styles.main}>
      		<View style={styles.head}>
          </View>
          <View style={styles.center}>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	main:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
  head:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',

  }
});

