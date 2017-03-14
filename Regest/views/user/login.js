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
			this.setState({logining:true});
			// HttpMoudle.Login(this.state.username,(rescode,arrs,message)=>{
			// 	if (rescode=='success'&&arrs.Password&&arrs.Password==this.state.password){
			// 		console.log("李磊==="+JSON.stringify(arrs))
			// 		Tools.setStorage('userid',arrs.ObjectId),
			// 		this.jumpToHome();
			// 		this.setState({logining:false});
			// 	}else if(rescode=='default'){
			// 		ToastAndroid.show("请检查网络"+arrs,2000);
			// 		this.setState({logining:false});
			// 	}else{
			// 		ToastAndroid.show("用户名或密码错误",2000);
			// 		this.setState({logining:false});
			// 	}
			// })
			
			var data={
				"phonenum":this.state.username,
				"password":this.state.password,
			}
			
			fetch(url+data, {  
           	 method: "POST",  
            	mode: "cors",  
            	headers: {  
                "Content-Type": "application/x-www-form-urlencoded"  
           		 },    
       		 }).then(function (res) {  
	            if(res.ok){  
	                res.json().then(function (json) {  
	               		alert(JSON.stringify(json));
	                });  
	            }else{  
            }  
  
        }).catch(function (e) {  
            console.log("fetch fail");  
	  
        });  



		}else{
			ToastAndroid.show("输入密码",2000);
		}

	}
	jumpToHome(){
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
    		{this.renderLoading()}
    	</View>
    );
  }

  renderLoading(){
  	if (!this.state.logining){
   		return null;
  	}else{
  		return <Loading/>
  	}
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
	}

});
