import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TopViewPager from '../myComponent/myViewPager';
import Tools from '../tools';

var Imgs=[
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
]
export default class serviceDetaile extends Component {
  constructor(props) {
    super(props);
  	
    this.state = {
    	serviceName:'dleyy',
    	sliderImgs:Imgs,
    	sex:'保密',
    	userIcon:'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    };
  }

  imageClick(){

  }

  render() {
    return (
      <View style={styles.content}>
      	<Navibar titleText={this.state.serviceName} titleStyle={styles.titlestyle}/>
      	<View style={styles.center}>
      		<View style={{width:screenWidth,height:140}}>
              <TopViewPager
                imgs={this.state.sliderImgs} height={140}
                isLoop={this.state.sliderImgs.length==1?false:true}
                autoPlay={true} resizeMode={Image.resizeMode.stretch}
                corverBg={true} indicatorStyle={{alignItems:'flex-end',right:20,}}
                clickPage={()=>{this.imageClick()}}
                navigator={this.props.navigator} /> 
            </View>
            <ScrollView style={{flex:1}}>
            	<View style={styles.userInfo}>
            		<Image style={styles.userHead} source={{uri:this.state.userIcon}} />
            		<Text style={{fontSize:Size(16),color:secondColor}}>{this.state.serviceName}</Text>
            		<Text style={{fontSize:Size(16),color:secondColor}}>{this.state.sex}</Text>
            	</View>
            </ScrollView> 
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	content:{
		width:screenWidth,
		height:screenHeight,
		justifyContent:'center',
		alignItems:'center',
	},
	titlestyle:{
		fontSize:Size(16),
		color:'#000',
	},
	center:{
		flex:1,
		justifyContent:'center',
	},
	userInfo:{
		height:50,
		width:screenWidth,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
	},
	userHead:{
		width:40,
		height:40,
		borderRadius:20,
	}
});
