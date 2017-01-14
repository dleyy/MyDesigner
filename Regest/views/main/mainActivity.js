
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

export default class mainActivity extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	selectedTab:0,
	  };
	}
  render() {
    return (
      <View style={styles.main}>
      	<TabNavigator>
      		<TabNavigator.Item
      			selected={this.state.selectedTab==0}
      			title='首页'
      			renderIcon={()=><Icon name />}
      	</TabNavigator>
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
