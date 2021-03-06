import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TopViewPager from '../myComponent/myViewPager';
import Tools from '../tools';
import Spinner from 'react-native-loading-spinner-overlay';

export default class CompleteService extends Component {
  constructor(props) {
    super(props);
    this.sureUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/getcheckcode";
    this.state = {
    	data:this.props.param.data,
    	num:'请先获取验证码',
    };
  }

  sure(){
  	this.setState({
		loading:true,
	  })
      Tools.getStorage('phonenum',(ret)=>{
          var postData={
            "phonenum":this.state.data.phonenum,
            "serID":this.state.data.serID?this.state.data.serID:this.state.data.orderID,
          }
          Tools.postNotBase64(this.sureUrl,postData,(ret)=>{
			ToastAndroid.show('获取验证码成功',2000);
			this.setState({
				num:ret.num,
				loading:false,
			})
          },(err)=>{
            ToastAndroid.show(JSON.stringify(err),2000);
			this.setState({
                		loading:false,
              	})
          })
      })
}

back(){
  let navigator = this.props.navigator;
  if (navigator) {
    navigator.pop();
  }
}

  render() {
    return (
      <View style={styles.main}>
      		<View style={styles.title}>
      			<View style={{height:navheight,flexDirection:'row',justifyContent: 'center',alignItems: 'center',width:80}}>
      				<TouchableOpacity style={styles.titleIcon} onPress={()=>{this.back()}}>
      					<Icon name={'ios-arrow-dropleft-outline'} color={'#CD2626'} size={30}/>
      				</TouchableOpacity>

      				<TouchableOpacity style={styles.titleIcon} onPress={()=>{this.back()}}>
      					<Icon name={'ios-close-circle-outline'} color={'#CD2626'} size={30}/>
      				</TouchableOpacity>
      			</View>
      			<View style={{flex:1}}>
      				<Text style={styles.titleText}>完成服务</Text>
      			</View>
      		</View>
      		<View style={{flex:1,alignItems: 'center',}}>
     		<Text style={{fontSize:Size(20),marginTop:10,marginRight:30}}>请下单者输入如下验证码:</Text>
     			<Text style={{fontSize:Size(30),marginTop:35}} >{this.state.num}</Text>
     		</View>
          
         <View style={{justifyContent: 'center',alignItems: 'center',marginTop:20,marginBottom:40}}>
          <Button 
            contentText={'获取验证码'}
            Click={()=>this.sure()}
            bgcolor={'#EE3B3B'}/>
        </View>  
        <Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
	main:{
		width:screenWidth,
		height:screenHeight,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title:{
		width:screenWidth,
		height:navheight,
		flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth:1,
		borderBottomColor:mainColor,
	},
	titleIcon:{
		width:40,
		justifyContent: 'center',
		alignItems: 'center',
		height:navheight,
	},
	titleText:{
		fontSize:Size(20),
		paddingLeft:60,
	},
});