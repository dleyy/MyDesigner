'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

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

	}

	updateVersion(){

	}

	aboutUs(){

	}

	existUser(){
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
    			<TouchableOpacity  style={styles.itemView} onPress={()=>this.bindUser()}>
    				<View style={styles.itemViewIcon}>
    					<Icon name={'ios-link-outline'} size={26} color={'#1E90FF'}/>
	    			</View>
	    			<View style={styles.itemViewText}>
	    				<Text style={{fontSize:Size(18)}}>账号绑定</Text>	
	    			</View>
	    			<View style={styles.itemViewIcon}>
	    				<Text style={{fontSize:Size(25),color:mainColor}}>></Text>
    				</View>
    			</TouchableOpacity>

    			<TouchableOpacity  style={styles.itemView} onPress={()=>this.managerLocal()}>
    				<View style={styles.itemViewIcon}>
    					<Icon name={'ios-nutrition-outline'} size={26} color={'#228B22'}/>
	    			</View>
	    			<View style={styles.itemViewText}>
	    				<Text style={{fontSize:Size(18)}}>管理收货地址</Text>	
	    			</View>
	    			<View style={styles.itemViewIcon}>
	    				<Text style={{fontSize:Size(25),color:mainColor}}>></Text>
    				</View>
    			</TouchableOpacity>

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
