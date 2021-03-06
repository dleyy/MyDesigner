'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Tools from '../tools';
import NavBar from '../myComponent/Navibar';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Button from '../myComponent/Button.js';
export default class sysSetting extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	back(){
		let navigator = this.props.navigator;
		if (navigator){
			navigator.pop();
			}
	}

	bindUser(){

	}

	managerLocal(){

	}

	clearnMer(){
		ToastAndroid.show('清除完毕',2000);				
	}

	updateVersion(){
		ToastAndroid.show('当前已是最新版本了',2000);
	}

	aboutUs(){
		alert('Hello')
	}

	existUser(){
		Tools.removeStorage('phonenum');
		let navigator = this.props.navigator;
		if (navigator){
			navigator.resetTo({
				name:'Login',
			})
		}
	}

  render() {
    return (
      <View style={styles.container}>
      	<NavBar 
      		back={()=>{this.back()}}
      		titleStyle={styles.titleStyle}
    		titleText={'系统设置'}/>
    	<View style={styles.content}>
    		<View>
    			<TouchableOpacity  style={styles.itemView} onPress={()=>this.clearnMer()}>
    				<View style={styles.itemViewIcon}>
    					<Icon name={'ios-close-outline'} size={26} color={'#9400D3'}/>
	    			</View>
	    			<View style={styles.itemViewText}>
	    				<Text style={{fontSize:Size(18)}}>清除缓存</Text>	
	    			</View>
	    			<View style={styles.itemViewIcon}>
	    				<Text style={{fontSize:Size(25),color:mainColor}}>></Text>
    				</View>
    			</TouchableOpacity>

    			<TouchableOpacity  style={styles.itemView} onPress={()=>this.updateVersion()}>
    				<View style={styles.itemViewIcon}>
    					<Icon name={'ios-arrow-dropup-circle-outline'} size={26} color={'#FF4500'}/>
	    			</View>
	    			<View style={styles.itemViewText}>
	    				<Text style={{fontSize:Size(18)}}>版本更新</Text>	
	    			</View>
	    			<View style={styles.itemViewIcon}>
	    				<Text style={{fontSize:Size(25),color:mainColor}}>></Text>
    				</View>
    			</TouchableOpacity>


    			<TouchableOpacity  style={styles.itemView} onPress={()=>this.aboutUs()}>
    				<View style={styles.itemViewIcon}>
    					<Icon name={'ios-alert-outline'} size={26} color={'#4169E1'}/>
	    			</View>
	    			<View style={styles.itemViewText}>
	    				<Text style={{fontSize:Size(18)}}>关于我们</Text>	
	    			</View>
	    			<View style={styles.itemViewIcon}>
	    				<Text style={{fontSize:Size(25),color:mainColor}}>></Text>
    				</View>
    			</TouchableOpacity>
    		</View>		  		
    	</View>

    	<View style={styles.foot}>
	    	<Button 
				contentText={'退出当前账号'}
				Click={()=>this.existUser()}
				bgcolor={'#f00'}/>
    	</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleStyle:{
		alignSelf:'flex-start',
		color:mainColor,
		fontSize:Size(20),
		marginLeft:50,
	},
	content:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemView:{
		width:screenWidth,
		height:60,
		justifyContent: 'center',
		flexDirection:'row',
		borderBottomWidth:0.5,
		borderBottomColor:'#999',
	},
	itemViewIcon:{
		width:60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemViewText:{
		flex:1,
		justifyContent: 'center',
	},
	foot:{
		width:screenWidth,
		height:120,
		alignItems: 'center',
	}
});
