import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  ToastAndroid,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Tools from '../tools';

export default class userInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	servicedata:this.props.param.data,
    	userInfo:this.props.param.data.userInfo,
    }
  }
  
  back(){
  	var navigator = this.props.navigator;
  	if (navigator) {
  		navigator.pop();
  	};
  }

  toOrderInfo(item){
  	let navigator  = this.props.navigator;
  	if (navigator) {
  		navigator.push({
  			name:'orderDetail',
  			param:{
  				'data':item
  			}
  		})
  	}
  }
  
  renderUserInfo(){
  	if (Tools.isDataValid(this.state.userInfo)) {
  	     return  this.state.userInfo.map((item,i)=>{
  		return <TouchableOpacity key={i} onPress={()=>this.toOrderInfo(item)} style={styles.serviceItem}>
  					<View style={styles.serviceItem}>
  						<View style={{width:80,justifyContent: 'center',alignItems: 'center',}}>
  						     <Image style={{width:40,height:40,borderRadius:20}} source={{uri:item.userHead}}/>
                                            <Text style={{color:item.orderstate=='进行中'?mainColor:'#EE4000'}}>{item.orderstate}</Text>
  						</View>
		                          <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
                                              <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center',}}>
		                                     <Text  style={{fontSize:Size(16),color:'#EE4000'}}>{item.nickname}</Text>
		                                  </View>         
                                              <View style={{width:screenWidth-70,height:1,backgroundColor:'#e8e8e8'}}/>
		                                  <Text  style={{fontSize:Size(16),color:'#000'}}>{item.time}</Text>
		                          </View>
		                   </View>
  			    </TouchableOpacity>
  		})
  	}else{
  		return <Text style={{fontSize:Size(14)}}>暂无数据</Text>
  	}
  }


  render() {
    return (
      <View  style={styles.main}>
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
      				<Text style={styles.titleText}>用户列表</Text>
      			</View>
      		</View>
      		<ScrollView style={{flex:1}}>
      			{this.renderUserInfo()}
      		</ScrollView>      		
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
		color:'#EE3B3B'
	},
	noticeText:{
		fontSize:Size(17),
		margin:10,
	},
	images:{
	    width:screenWidth,
	    flexWrap:'wrap',
	    justifyContent: 'space-around',
	    alignItems: 'center',
	    flexDirection:'row',
	    marginTop:20
	  },
	image:{
	    width:screenWidth/3-30,
	    height:screenWidth/3-30,
	  },
	addImageView:{
	    width:screenWidth/3-30,
	    borderWidth:1,
	    borderColor:mainColor,
	    height:screenWidth/3-30,
	    marginLeft:5,
	    marginRight:5,
	    marginBottom:5,
	    justifyContent: 'center',
	    alignItems: 'center',
	  },	
	 serviceItem:{
	    width:screenWidth,
	    height:80,
	    flexDirection:'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderBottomColor:'#e8e8e8',
	    borderBottomWidth:1,
	    paddingLeft:10,
	}
});



