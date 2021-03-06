import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Loading from '../myComponent/loading.js';
import Tools from '../tools';

const HttpMoudle = require('react-native').NativeModules.HttpMoudle;
export default class reseetingPassword extends Component {
	constructor(props) {
	  super(props);
		this.findPDUrl="http://www.freeexplorer.top/leige/public/index.php/index/users/updatepwd/";
	  this.state = {
	  	phoneNumber:this.props.param.phoneNumber,
	  	password:'',
	  	repassword:'',
	  	identify:'',
	  	timeOut:60,
	  	showText:'发送验证码',
	  	isShowTime:false,
	  	resting:false,
	  };
	}

	componentWillUnmount() {
	  this.mytimer && clearTimeout(this.mytimer);
	}

	resetingPassword(){
		if (this.state.password.length<6||this.state.repassword.length<6){
			ToastAndroid.show('密码不能小于6位',2000);
		}else if(!this.state.password||!this.state.repassword){
			ToastAndroid.show('输入密码',2000);
		}else if(!this.state.identify){
			ToastAndroid.show('输入验证码',2000);
		}else if (!this.state.password==this.state.repassword){
			ToastAndroid.show('两次密码不一致',2000);
		}else{
			this.doFindPassword();
		}
	}

	doFindPassword(){
		let strs={
			"phoneNumber":this.state.phoneNumber,
			"code":this.state.identify,
			"password":this.state.password,
		}
		if(this.state.showText=='发送验证码'){
			ToastAndroid.show("请先获取验证码",1000)
		}else{
		HttpMoudle.identifyCode(strs,(successMessage)=>{
			// HttpMoudle.updateUserPassword(Tools.getStorage('find_userID'),this.state.password,
			// 		(msg,detail)=>{
			// 			if (msg=='success'){
			// 				ToastAndroid.show("重置成功",2000)
			// 				 let navigator = this.props.navigator;
			// 				 if (navigator){
			// 				 	navigator.resetTo({
			// 						name:'Login',
			// 					})
			// 				 }
			// 			}else{
			// 				ToastAndroid.show("重置失败"+detail,2000)
			// 			}
			// 		})
				let data={
					"phonenum":this.state.phoneNumber,
	        	    "password":this.state.password,
				}

			Tools.postNotBase64(this.findPDUrl,data,(ret)=>{
				ToastAndroid.show("重置成功",2000)
				 let navigator = this.props.navigator;
				 if (navigator){
				 	navigator.resetTo({
						name:'Login',
					})
				 }
			},(err)=>{
				ToastAndroid.show(err,2000)
			})
		},(errorMessage)=>{
			ToastAndroid.show("验证码验证失败,请重新获取",2000)
		})
	}
	}

	back(){
		let navigator = this.props.navigator;
		if (navigator){
			navigator.pop({
				title:this.props.title?this.props.title:''
			});
			}
	}

	sendSMSMessage(){
		if (!this.state.isShowTime&&this.state.phoneNumber){
			this.setState({
				isShowTime:true,
				timeOut:60,
				showText:'',
			})
			this.timedOut();
			HttpMoudle.getSMSMessage(this.state.phoneNumber,(successmsg)=>{
				ToastAndroid.show("获取成功",1000);
			},(errormsg)=>{
				this.mytimer && clearTimeout(this.mytimer);
				this.setState({isShowTime:false,showText:'重新发送',timeOut:60})
				ToastAndroid.show("获取验证码失败",1000);
			})
		}else{
			ToastAndroid.show("稍后尝试",1000);
		}
	}

    timedOut() {
      	var haveTime = this.state.timeOut;
	    if (this.state.timeOut<= 0){
	        this.mytimer&&clearTimeout(this.mytimer);
	        this.setState({
	            timeOut:60,
	            showText:'重新发送',
	            isShowTime:false,
	        })
	        return;
	    }
	    this.mytimer = setTimeout(this.timedOut.bind(this), 1000);
	    this.setState({
	        timeOut:parseInt(haveTime)-1,
	        
	    })
    }

    renderLoading(){
    	if (this.state.resting){
    		return <Loading/>
    	}else{
    		return null;
    	}
    }


  render() {
    return (
     	<View style={styles.main}>
     		<Navibar 
      			back={()=>{this.back()}}
    			titleStyle={styles.titleStyle}
    			titleText={this.props.param.title?this.props.param.title:'找回密码'}/>
    		<View style={{width:screenWidth,height:40,backgroundColor:'#c4c4c4'}} />

    		<View style={styles.inpute}>
    			<View style={styles.inpute_item}>
    				<View style={{width:50,justifyContent:'center'}}>
    					<Text style={styles.noticeText}>+86</Text>
    				</View>
    				<View style={styles.splan}/>
    				<TextInput
    					style={styles.inputeText}
    					underlineColorAndroid={'transparent'}
    					maxLength={11}
    					editable={false}
	    				placeholder={'手机号'}
	    				keyboardType={'numeric'}
	    				placeholderTextColor={'#c4c4c4'}
				        onChangeText={(phoneNumber) => this.setState({phoneNumber:phoneNumber})}
				        value={this.state.phoneNumber}/>
    			</View>
		    	<View style={styles.inpute_item}>
		    		<TextInput
    					style={styles.inputeText}
    					underlineColorAndroid={'transparent'}
	    				placeholder={'输入密码'}
	    				secureTextEntry={true}
	    				placeholderTextColor={'#c4c4c4'}
				        onChangeText={(password) => this.setState({password:password})}
				        value={this.state.password}/>
    			</View>
    	    	<View style={styles.inpute_item}>
		    		<TextInput
    					style={styles.inputeText}
    					underlineColorAndroid={'transparent'}
	    				placeholder={'再次输入密码'}
	    				secureTextEntry={true}
	    				placeholderTextColor={'#c4c4c4'}
				        onChangeText={(repassword) => this.setState({repassword:repassword})}
				        value={this.state.repassword}/>
    			</View>
    			<View style={styles.inpute_item}>
    			    <TextInput
    					style={styles.inputeText}
    					underlineColorAndroid={'transparent'}
    					maxLength={6}
	    				placeholder={'输入短信中的验证码'}
	    				placeholderTextColor={'#c4c4c4'}
	    				keyboardType={'numeric'}
				        onChangeText={(identify) => this.setState({identify:identify})}
				        value={this.state.identify}/>
				        <View style={styles.splan}/>
				    <TouchableOpacity onPress={()=>this.sendSMSMessage()}
				    				  style={{justifyContent: 'center',alignItems: 'center',}}>
				    	<Text style={styles.noticeText}>
				    		{this.state.isShowTime?this.state.timeOut+"秒":this.state.showText}
				    	</Text>
				    </TouchableOpacity>
    			</View>
    		</View>

    		<View style={{justifyContent: 'center',alignItems: 'center',marginTop:15}}>
    			<Button 
    				contentText={'重置密码'}
    				Click={()=>this.resetingPassword()}
    				bgcolor={mainColor}/>
    		</View>

    		<View style={{flex:3}}/>
    		{this.renderLoading()}
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
	titleStyle:{
		alignSelf:'flex-start',
		color:mainColor,
		marginLeft:40,
		fontSize:Size(20),
	},
	inputeText:{
		flex:1,
	},
	inpute:{
		flex:2,
		justifyContent:'center',
		width:screenWidth,
	},
	noticeText:{
		color:mainColor,
		fontSize:Size(18),
		margin:5,
		
	},
	splan:{
		width:1,
		height:40,
		alignSelf:'center',
		backgroundColor:'#EDF1F2'
	},
	inpute_item:{
		flex:1,
		borderBottomColor:'rgb(211,211,211)',
		borderBottomWidth:1,
		flexDirection:'row',
		justifyContent:'center',
	},
});
