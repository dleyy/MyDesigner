import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';

import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Tools from '../tools';

const HttpMoudle = require('react-native').NativeModules.HttpMoudle;

export default class regest extends Component{

	constructor(props) {
	  super(props);
	  this.state = {
	  	name:'',
	  	phoneNumber:'',
	  	password:'',
	  	identify:'',
	  	visible:true,
	  	timeOut:60,
	  	showText:'发送验证码',
	  	isShowTime:false,
	  };
	}

	back(){
		let navigator = this.props.navigator;
		if (navigator){
			navigator.pop();
			}
	}

	sendSMSMessage(){
			if (!this.state.isShowTime){
				this.setState({
					isShowTime:true,
				})
			this.timedOut();
		}
	}

	timedOut() {
      	var haveTime = this.state.timeOut;
	    if (this.state.timeOut<= 0){
	        mytimer&&clearTimeout(mytimer);
	        this.setState({
	            timeOut:60,
	            showText:'重新发送',
	            isShowTime:false,
	        })
	        return;
	    }
	    mytimer = setTimeout(this.timedOut.bind(this), 1000);
	    this.setState({
	        timeOut:parseInt(haveTime)-1,
	        
	    })
    }

	Regest(){
		if (!(/^1[34875]\d{9}$/.test(this.state.phoneNumber))){
			ToastAndroid.show('输入正确的手机号',2000);
		}else if(!this.state.name){
			ToastAndroid.show('输入昵称',2000);
		}else if(!this.state.password||this.state.password.length<6){
			ToastAndroid.show('密码不能少于6位',2000);
		}
		// else if (!this.state.identify){
		// 	ToastAndroid.show('输入验证码',2000);
		// }
		else{
			let strs={
				"name":this.state.name,
				'phoneNumber':this.state.phoneNumber,
				'password':this.state.password
			};
		 	HttpMoudle.Regest(strs,(msg)=>{
		 		if (msg){
		 			Tools.setStorage('userid',msg),
		 			ToastAndroid.show("注册成功！跳转至登录...",2000);		 							 			
		 		}else{
		 			ToastAndroid.show("手机号已注册",2000);		 		
		 		}
		 	})
		}
	}

	toSevice(){
	}

  render() {

    return (
      <View	style={styles.main}>
      	<Navibar 
      		back={()=>{this.back()}}
    		titleStyle={styles.titleStyle}
    		titleText={'手机注册'}/>
    	
    	<View style={styles.content}>
    		<View style={styles.produce}>
    			<Text style={styles.produce_text}>{appName}</Text>
    		</View>	
    			
    		<View style={styles.inpute}>
    			<View style={styles.inpute_item} >
    				<TextInput
    					style={styles.inputeText}
    					underlineColorAndroid={'transparent'}
    					maxLength={15}
	    				placeholder={'用户名(个性后缀)'}
	    				placeholderTextColor={'#c4c4c4'}
				        onChangeText={(name) => this.setState({name:name})}
				        value={this.state.name}/>
    			</View>
    			<View style={styles.inpute_item}>
    				<View style={{width:50,justifyContent:'center'}}>
    					<Text style={styles.noticeText}>+86</Text>
    				</View>
    				<View style={styles.splan}/>
    				<TextInput
    					style={styles.inputeText}
    					underlineColorAndroid={'transparent'}
    					maxLength={11}
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
	    				placeholder={'设置密码'}
	    				secureTextEntry={this.state.visible}
	    				placeholderTextColor={'#c4c4c4'}
				        onChangeText={(password) => this.setState({password:password})}
				        value={this.state.password}/>
				    <View style={styles.splan}/>
				  	<TouchableOpacity onPress={()=>{this.setState({visible:!this.state.visible})}}
				  					  style={{width:60,justifyContent:'center',margin:10,alignItems:'center'}}>
				  		{this.state.visible?<Icon name='ios-eye-off-outline' size={33} color={mainColor} />:<Icon name='ios-eye-outline' size={33} color={mainColor} />}
				  	</TouchableOpacity>
    			</View>
    			<View style={styles.inpute_item}>
    			    <TextInput
    					style={styles.inputeText}
    					underlineColorAndroid={'transparent'}
    					maxLength={6}
	    				placeholder={'手机验证码'}
	    				placeholderTextColor={'#c4c4c4'}
	    				keyboardType={'numeric'}
				        onChangeText={(identify) => this.setState({identify:identify})}
				        value={this.state.identify}/>
				    <TouchableOpacity onPress={()=>this.sendSMSMessage()}
				    				  style={{justifyContent: 'center',alignItems: 'center',}}>
				    	<Text style={styles.noticeText}>
				    		{this.state.isShowTime?this.state.timeOut+"s":this.state.showText}
				    	</Text>
				    </TouchableOpacity>
    			</View>
    		</View>
    		
    		<View style={styles.submit}>
    			<View style={{justifyContent:'center',margin:10,alignItems:'center'}}>
	    			<Button 
	    				contentText={'注册'}
	    				Click={()=>this.Regest()}
	    				bgcolor={mainColor}/>
	    		</View>
	    		<View style={{flexDirection:'row',justifyContent: 'center',}}>
	    			<Text style={{fontSize:Size(14),marginLeft:10}}>注册{appName}账号表示您已同意</Text>
	    			<TouchableOpacity onPress={()=>this.toSevice()} >

	    				<Text style={[styles.noticeText,{fontSize:Size(14),margin:0}]}>《{appName}服务条款》</Text>
	    			</TouchableOpacity>
	    		</View>
    		</View>
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
	titleStyle:{
		alignSelf:'flex-start',
		color:mainColor,
		fontSize:Size(20),
	},
	content:{
		flex:1,
		justifyContent: 'center',
	},
	produce:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'rgb(237,241,242)',
	},
	produce_text:{
		fontSize:Size(22),
		color:mainColor,
	},
	inpute:{
		flex:2,
		justifyContent:'center',
	},
	inpute_item:{
		flex:1,
		borderBottomColor:'rgb(211,211,211)',
		borderBottomWidth:1,
		flexDirection:'row',
		justifyContent:'center',
	},
	submit:{
		flex:2,
		justifyContent:'flex-start'
	},
	inputeText:{
		flex:1,
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
	}

});
