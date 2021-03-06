import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ToastAndroid,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import Button from '../myComponent/Button.js';
import Navibar from '../myComponent/Navibar.js';
import {secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Tools from '../tools';
import Loading from '../myComponent/loading.js';
import Spinner from 'react-native-loading-spinner-overlay';

const HttpMoudle = require('react-native').NativeModules.HttpMoudle;


var url = "http://www.freeexplorer.top/leige/public/index.php/index/users/userload/";

export default class login extends Component {
	constructor(props) {
	  super(props);
		
	  this.state = {
	  	username:'',
	  	password:'',
	  	logining:false,
	  };
	}

	Login(){
		if (!(/^1[34875]\d{9}$/.test(this.state.username))){
			ToastAndroid.show("输入正确的手机号码",2000);
		}else if(this.state.password){
			this.setState({loading:true,loadingText:'登录中...'});			
			var data={
				"phonenum":this.state.username,
				"password":this.state.password
			}
			Tools.postNotBase64(url,data,(ret)=>{
				this.jumpToHome();
				this.setState({loading:false});
			},(err)=>{
				ToastAndroid.show(err,2000);
				this.setState({loading:false});
			});
		}else{
			ToastAndroid.show("输入密码",2000);
		}

	}
	jumpToHome(){
		Tools.setStorage('phonenum',this.state.username);
		let navigator = this.props.navigator;
			if (navigator){
				navigator.resetTo({
					name:'Home',
				})
			}
	}
	back(){
		let navigator = this.props.navigator;
		if (navigator){
			navigator.pop();
		}
	}
	findPassword(){
		let navigator = this.props.navigator;
		if (navigator){
			navigator.push({
				name:'FindPassword',
			})
		}
	}

  render() {
    return (
    	<View style={styles.container}>
    		<Navibar 
    			back={()=>{this.back()}}
    			titleStyle={styles.titleStyle}
    			leftIconColor={mainColor}
    			titleText={'登录'}/>
    		<View style={styles.headView}>
    			<Image style={styles.userIcon} source={require('../../Img/defaultIcon.jpg')} />
    		</View>
    		<View style={styles.center}>

    			<TextInput 
    				style={{height: 40}}
    				maxLength={11}
    				placeholder={'手机号'}
    				placeholderTextColor={'#c4c4c4'}
			        onChangeText={(username) => this.setState({username:username})}
			        value={this.state.username}/>
				<TextInput 
    				style={{height: 40,marginTop:5}}
    				secureTextEntry={true}
    				placeholder={'密码'}
    				maxLength={15}
    				placeholderTextColor={'#c4c4c4'}
			        onChangeText={(password) => this.setState({password:password})}
			        value={this.state.password}/>
    		</View>
    		<View style={styles.foot}>
    			<Button 
    				contentText={'登录'}
    				Click={()=>this.Login()}
    				bgcolor={mainColor}/>

    			<TouchableOpacity onPress={()=>{this.findPassword()}}>
    				<Text style={{fontSize:Size(18),color:secondColor,marginTop:25}}>忘记密码</Text>
    			</TouchableOpacity>
    		</View>
    		 <Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />
    	</View>
    );
  }



}

const styles = StyleSheet.create({
	container:{
		flex:1,
		height:screenHeight,
		justifyContent: 'center',
	},
	headView:{
		flex:1.5,
		justifyContent:'center',
		alignItems: 'center',
	},
	userIcon:{
		width:100,
		height:100,
		borderRadius:50,
	},
	center:{
		flex:1,
		justifyContent:'flex-start',
		margin:10
	},
	inpute:{
		flex:2,
		justifyContent:'center',
	},
	foot:{
		flex:1.5,
		justifyContent:'flex-start',
		alignItems:'center',
	},
	bgImage:{
		width:screenWidth,
		height:screenHeight,
	},
	titleStyle:{
		alignSelf:'flex-start',
		color:mainColor,
		fontSize:Size(20),
		marginLeft:50,
	}

});
