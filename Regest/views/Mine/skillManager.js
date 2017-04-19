import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  ToastAndroid,
} from 'react-native';

import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Tools from '../tools';

export default class skillManager extends Component {
  constructor(props) {
    super(props);
    this.mySkillUrl = "";
    this.state = {

    };
  }

  componentDidMount() {
    	Tools.getStorage('phonenum',(ret)=>{
            var postData = {
                'phonenum':ret,
            }
            Tools.postNotBase64(this.mySkillUrl,postData,(ret)=>{
                ToastAndroid.show(ret,2000);
            },(err)=>{
                ToastAndroid.show(err,2000);
            })
      })
  }
  
  back(){
  	let navigator = this.props.navigator;
  	if (navigator) {
  		navigator.pop();
  	}
  }

  addSkill(){
  	let navigator = this.props.navigator;
  	if (navigator) {
  		navigator.push({
  			name:'AddSkill'
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
      				<Text style={styles.titleText}>我的技能</Text>
      			</View>
      		</View> 

      		<View style={{flex:1}}>
      			<View style={{marginTop:10,flexDirection:'row',marginLeft:10,width:screenWidth,height:40,alignItems: 'center',}}>
      				<Text style={{fontSize:Size(18)}}>当前账户余额:</Text>
      				<Text style={{fontSize:Size(18),color:'#f00'}}>￥{this.state.money}</Text>
      			</View>

      			<View style={{width:screenWidth,marginTop:120,justifyContent: 'center',alignItems: 'center',}}>
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
});