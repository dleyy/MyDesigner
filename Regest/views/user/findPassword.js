import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ToastAndroid,
} from 'react-native';

import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Loading from '../myComponent/loading.js';
import Tools from '../tools';
const HttpMoudle = require('react-native').NativeModules.HttpMoudle;

export default class findPassword extends Component {
  	constructor(props) {
  	  super(props);

  	  this.state = {
  	  	phoneNumber:'',
        logining:false,
  	  };
  	}

  	back(){
  		let navigator = this.props.navigator;
  		if (navigator){
  			navigator.pop();
  			}
	}

  toNextStep(){
    if (!(/^1[34875]\d{9}$/.test(this.state.phoneNumber))){
      ToastAndroid.show("输入正确的手机号码",2000);
    }else{
      // this.setState({
      //   logining:true,
      // })
      this.jumpToNext();
      // HttpMoudle.Login(this.state.phoneNumber,(codeId,Arrs,msg)=>{
      //   if (codeId=='success'&&JSON.stringify(Arrs).length>10){
      //     Tools.setStorage('find_userID',Arrs.ObjectId),
      //     this.setState({logining:false})
      //     this.jumpToNext();
      //   }else{
      //     this.setState({logining:false})
      //     ToastAndroid.show("手机号暂未注册",1000);
      //   }
      // });
    }
  }

  jumpToNext(){
    let navigator = this.props.navigator;
    if (navigator){
      navigator.push({
        name:'reSetPassword',
        param: {                 
            phoneNumber:this.state.phoneNumber,  
              }
      })
    }
  }

  renderLoading(){
    if (!this.state.logining){
      return null;
    }else{
      return <Loading/>
    }
  }

  render() {
    return (
      <View style={styles.main}>
      	<Navibar 
      		back={()=>{this.back()}}
    		  titleStyle={styles.titleStyle}
    		  titleText={'找回密码'}/>

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
            autoFocus={false}
            placeholderTextColor={'#c4c4c4'}
            onChangeText={(phoneNumber) => this.setState({phoneNumber:phoneNumber})}
            value={this.state.phoneNumber}/>
        </View>

        <View style={{justifyContent: 'flex-start',marginTop:20,alignItems: 'center',}}>
          <Button 
            contentText={'下一步'}
            Click={()=>this.toNextStep()}
            bgcolor={mainColor}/>
        </View>

        {this.renderLoading()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
	main:{
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleStyle:{
		alignSelf:'flex-start',
		color:mainColor,
		fontSize:Size(20),
    marginLeft:40,
	},
  inpute_item:{
    width:screenWidth,
    height:50,
    marginTop:50,
    borderBottomColor:'rgb(211,211,211)',
    borderBottomWidth:1,
    borderTopWidth:1,
    borderTopColor:'rgb(211,211,211)',
    flexDirection:'row',
    justifyContent:'center',
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


