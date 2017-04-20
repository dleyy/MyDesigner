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
import Spinner from 'react-native-loading-spinner-overlay';

export default class addSkill extends Component {
  constructor(props) {
    super(props);
    this.addUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/addservicetype";
    this.state = {
    		loading:false,
    };
  }

  back(){
  	let navigator = this.props.navigator;
  	if (navigator) {
  		navigator.pop();
  	}
  }

  toRule(){
  	if (!this.state.skillname){
  		ToastAndroid.show("输入技能名",2000);
  	}else if(!this.state.skillDetail){
  		ToastAndroid.show("输入描述",2000);
  	}else{
  	this.setState({
  		loading:true,
  		loadingText:'上传中...'
  	})
  	Tools.getStorage('phonenum',(ret)=>{
	  	var postData = {
	  		'skillname':this.state.skillname,
	  		'skillDetail':this.state.skillDetail,
	  		'phonenum':ret
	  	}
            Tools.postNotBase64(this.addUrl,postData,(ret)=>{
                this.setState({
                	loading:false,
                	skillname:"",
                	skillDetail:"",
                })
                ToastAndroid.show("上传成功...",2000);

            },(err)=>{
            	      this.setState({
                		loading:false,
                	})
                ToastAndroid.show(JSON.stringify(err),2000);
            })
      })
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
	            			Click={()=>this.toRule()}
	            			bgcolor={'#EE3B3B'}/>	              	
	              </View>	
		</View>
		<Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />
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