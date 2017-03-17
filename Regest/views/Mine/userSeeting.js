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

export default class userSeeting extends Component {
	constructor(props) {
	   super(props);
		
		this.defaultUserIcon="https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024";	
	   this.state = {
	   	userHeard:'',
	   	nickName:'dleyy'
	   };
	}

	back(){
		let navigator = this.props.navigator;
		if (navigator){
			navigator.pop();
		}
	}

	changeUserHeard(){

	}

	inSure:{

	}

   render() {
    	return (
      	<View style={styles.container}>
      		<NavBar 
      			back={()=>{this.back()}}
      			titleStyle={styles.titleStyle}
    				titleText={'个人信息'}/>
    			<View style={{flex:1,justifyContent: 'center',}}>
	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>头像</Text>
	    				<TouchableOpacity onPress={()=>{this.changeUserHeard()}} style={{flex:1}} >
	    					<View style={styles.itemClick}>
	    						<Image style={styles.userPic} source={{uri:this.state.userHeard?this.state.userHeard:this.defaultUserIcon}}/>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>昵称</Text>
	    				<TouchableOpacity onPress={()=>{this.changeUserHeard()}} style={{flex:1}}>
	    					<View style={styles.itemClick}>
	    						<Text style={{marginRight:10}}>{this.state.nickName}</Text>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>密码修改</Text>
	    				<TouchableOpacity onPress={()=>{this.changeUserHeard()}} style={{flex:1}}>
	    					<View style={styles.itemClick}>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

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
	infoView:{
		width:screenWidth,
		height:60,
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'#888',
	},
	userIcon:{
		alignSelf:'center',
		marginLeft:20,
		width:80,
	},
	itemClick:{
		flex:1,
		marginRight:20,
		flexDirection:'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	userPic:{
		width:50,
		height:50,
		borderRadius:25,
		borderWidth:0.5,
		marginRight:15,
	},
	footStyle:{
		width:screenWidth,
		height:80,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
