
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ViewPagerAndroid,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

import Home from '../HomePage/home';
import Message from '../Message/message';
import Mine from '../Mine/mine';
import Reward from '../Reward/reward';

export default class mainActivity extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	selectedTab:0,
      nowNumber:0,
	  };
	}



  render() {
    return (
      <View style={styles.main}>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}>
          <View >
            <Home />
          </View>
          
          <View >
            <Reward />
          </View>
          
          <View >
            <Message />
          </View>
          
          <View >
            <Mine />
          </View>
        </ViewPagerAndroid>

        <View style={styles.foot}>
            <Text>Now:{this.state.nowNumber}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	main:{
		flex:1,
		justifyContent: 'center',
	},
  foot:{
    width:screenWidth,
    height:50,
    borderTopWidth:1,
    borderTopColor:mainColor,
    justifyContent: 'center',
  },
  viewPager:{
    flex:1,
  }
});
