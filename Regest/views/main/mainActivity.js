
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  BackAndroid,
  ToastAndroid,
  TouchableOpacity,
  ViewPagerAndroid,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

import Home from '../HomePage/home';
import Message from '../Message/message';
import Mine from '../Mine/mine';
import Reward from '../Reward/reward';

var DEFAULT_TABLENGTH = screenWidth/4;
export default class mainActivity extends Component {
	constructor(props) {
	  super(props);
    //this.onBack = this.existApp.bind(this);
    this.ee = 0,
	  this.state = {
	  	selectedTab:0,
	  };
	}

  componentDidMount() {
    //BackAndroid.addEventListener('BackPress',this.onBack);
  }

  componentWillUnmount() {
    //BackAndroid.removeEventListener('BackPress',this.onBack);
  }

  // existApp(){
  //   if(this.ee==0){
  //     this.ee=1;
  //     ToastAndroid.show("再按一次退出",ToastAndroid.SHORT);
  //     this.timer = setTimeout(() => {this.ee=0;},2000);
  //     return true;
  //   }
  //     return false;
  // }

  myonPageScroll(e){
    // this.setState({
    //   selectedTab:e.nativeEvent.offset+e.nativeEvent.position,
    // })
  }
  changeSelectTab(i){
    this.setState({
      selectedTab:i,
    })
    this.viewPage.setPage(i);
  }


  render() {
    return (
      <View style={styles.main}>
        <ViewPagerAndroid
          ref={viewPager => {this.viewPage = viewPager}}
          style={styles.viewPager}
          scrollEnabled={false}
          onPageScroll={this.myonPageScroll.bind(this)}
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

       {/** <View style={[styles.index_line,{marginLeft:this.state.selectedTab*DEFAULT_TABLENGTH}]}/> **/}
        <View style={styles.foot}>
            <TouchableOpacity onPress={()=>{this.changeSelectTab(0)}}
                style={styles.foot_items}>
                <Icon name={'md-planet'} size={23} color={this.state.selectedTab==0?mainColor:secondColor}/>
                <Text style={{fontSize:Size(16),color:this.state.selectedTab==0?mainColor:secondColor}}>首页</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{this.changeSelectTab(1)}} 
                style={styles.foot_items}>
                <Icon name={'md-clipboard'} size={23} color={this.state.selectedTab==1?mainColor:secondColor}/>
                <Text style={{fontSize:Size(16),color:this.state.selectedTab==1?mainColor:secondColor}}>悬赏</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{this.changeSelectTab(2)}}
                style={styles.foot_items}>
                <Icon name={'md-chatbubbles'} size={23} color={this.state.selectedTab==2?mainColor:secondColor}/>
                <Text style={{fontSize:Size(16),color:this.state.selectedTab==2?mainColor:secondColor}}>消息</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{this.changeSelectTab(3)}} 
                style={styles.foot_items}>
                <Icon name={'md-person'} size={23} color={this.state.selectedTab==3?mainColor:secondColor}/>
                <Text style={{fontSize:Size(16),color:this.state.selectedTab==3?mainColor:secondColor}}>我</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    flexDirection:'row',
  },
  foot_items:{
    width:DEFAULT_TABLENGTH,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPager:{
    flex:1,
  },
  index_line:{
    width:DEFAULT_TABLENGTH,
    height:1,
    backgroundColor:mainColor,
  }
});
