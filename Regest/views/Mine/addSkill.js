import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  ToastAndroid,
  TextInput,
} from 'react-native';

import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Tools from '../tools';

export default class addSkill extends Component {
  constructor(props) {
    super(props);
    this.addUrl="";
    this.state = {};
  }

  back(){
  	let navigator = this.props.navigator;
  	if (navigator) {
  		navigator.pop();
  	}
  }

  toRule(){
  	Tools.getStorage('phonenum',(ret)=>{
	  	var postData = {
	  		'skillname':this.state.skillname,
	  		'skillDetail':this.state.skillDetail,
	  		'phonenum':ret
	  	}
            Tools.postNotBase64(this.addUrl,postData,(ret)=>{
                ToastAndroid.show(ret,2000);
            },(err)=>{
                ToastAndroid.show(err,2000);
            })
      })

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
      				<Text style={styles.titleText}>添加技能</Text>
      			</View>
		</View>      		

		<View style={{flex:1}}>
			<TextInput 
	                    style={{height: 40}}
	                    maxLength={11}
	                    placeholder={'技能名'}
	                    placeholderTextColor={'#c4c4c4'}
	                    underlineColorAndroid={'transparent'}
	                    onChangeText={(skillname) => this.setState({skillname:skillname})}
	                    value={this.state.skillname}/>
	              <View style={{width:screenWidth,height:1,backgroundColor:mainColor}}/>
	              <TextInput 
	                    style={{height: 120}}
	                    placeholder={'技能描述'}
	                    multiline={true}
	                    placeholderTextColor={'#c4c4c4'}
	                    underlineColorAndroid={'transparent'}
	                    onChangeText={(skillDetail) => this.setState({skillDetail:skillDetail})}
	                    value={this.state.skillDetail}/>
	              <View style={{width:screenWidth,height:1,backgroundColor:mainColor}}/>
	              <View style={{flex:1,alignItems:'center',paddingBottom:20,justifyContent: 'flex-end',}}>
			           	<View style={{flexDirection:'row',justifyContent: 'center',marginBottom:25}}>
		            			<Text style={{fontSize:Size(14),marginLeft:10}}>发布前请阅读</Text>
		            			<TouchableOpacity onPress={()=>this.toRule()} >
		              			<Text style={[styles.noticeText,{fontSize:Size(14),margin:0}]}>《技能发布管理规则》</Text>
		            			</TouchableOpacity>
		         		 </View>
      				<Button
      					contentText={'发布新技能'}
	            			Click={()=>this.addSkill()}
	            			bgcolor={'#EE3B3B'}/>	              	
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
		color:'#CD2626'
	},
	noticeText:{
    		color:mainColor,
    		fontSize:Size(18),
   		 margin:5,
  	},
});