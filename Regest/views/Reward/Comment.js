import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TopViewPager from '../myComponent/myViewPager';
import Tools from '../tools';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.getCommentUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/getcomments";
    this.state = {
    	serID:this.props.param.serID,
    	commentInfo:[],
    	isRefreshing:false,
    };
  }

  back(){
  	let navigator = this.props.navigator;
  	if (navigator) {
  		navigator.pop();
  	}
  }

  componentDidMount() {
    this.setState({
    	isRefreshing:true,
    })
    var postData={
    	'serID':this.state.serID
    }
    Tools.postNotBase64(this.getCommentUrl,postData,(ret)=>{
    	this.setState({
    		commentInfo:ret,
    		isRefreshing:false,
    	})
    },(err)=>{
    	this.setState({
    		commentInfo:[],
    		isRefreshing:false
    	})
    })
  }

  renderComment(){
  	if (Tools.isDataValid(this.state.commentInfo)) {
  	return this.state.commentInfo.map((item,i)=>{
  			return <View style={styles.itemView}>
  			    		<View style={styles.itemViewLeft} >
  			    			<Icon  name={'ios-contact'} size={20}/>
  			    		</View>
  			    		<View style={styles.itemViewCenter}>
  			    			<Text style={{fontSize:Size(14),color:mainColor}}>{Tools.showUserPhone(item.phonenum)}</Text>
  			    			<Text style={{marginLeft:10}}>{item.content}</Text>
  			    		</View>
  			    		<View style={styles.itemViewRight}>
  			    			<Text >{Tools.getNewsCommentTime(item.time)}</Text>
  			    		</View>
  			</View>
  		})
  	}else{
  		return <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
  					<Text style={{fontSize:Size(16),}}>暂无评论...</Text>	
  		           </View>
  	}
  }





  render() {
    return (
      <View style={styles.content}>
      		<Navibar titleText={'评论'} titleStyle={styles.titlestyle} back={()=>{this.back()}}/>
      		<ScrollView style={{flex:1}}  refreshControl={  
	          <RefreshControl  
	           refreshing={this.state.isRefreshing}  
	            onRefresh={()=>this.componentDidMount()}  
	            colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}  
	           progressBackgroundColor="#ffffff" />}>
	    	{this.renderComment()}
      		</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	content:{
		width:screenWidth,
		height:screenHeight,
		justifyContent:'center',
		alignItems:'center',
	},
	titlestyle:{
		fontSize:Size(16),
		color:'#000',
	},
	center:{
		flex:1,
		justifyContent:'center',
	},
	userInfo:{
		height:50,
		width:screenWidth,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
	},
	userHead:{
		width:80,
		height:80,
		borderRadius:40,
	},
      serviceInfo:{
            width:screenWidth,
            height:200,
            backgroundColor:'#e8e8e8',
            marginTop:20,
            justifyContent: 'center',
            paddingLeft:30,            
      },
      itemView:{
      		width:screenWidth,
      		height:54,
      		flexDirection:'row',
      		justifyContent: 'center',
      		alignItems: 'center',
      		borderBottomWidth:1,
      		borderBottomColor:'#c4c4c4',
      },
      itemViewLeft:{
      		width:50,
      		justifyContent: 'center',
      		alignItems: 'center',
      },
      itemViewCenter:{
      		flex:1,
      		justifyContent: 'center',
      		alignItems: 'flex-start',
      },
      itemViewRight:{
      		width:50,
      		justifyContent: 'flex-start',
      		alignItems: 'center',
      }
});


