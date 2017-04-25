import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import NavBar from '../myComponent/Navibar';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import ImagePicker from '../../node_modules/react-native-image-picker';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Button from '../myComponent/Button.js';
import AlertDialog from '../myComponent/AlertDialog';
import Alert from '../myComponent/Alert';
import Tools from '../tools';
import Loading from '../myComponent/loading';

export default class userSeeting extends Component {
	constructor(props) {
	   super(props);
	   this.postUrl="http://www.freeexplorer.top/leige/public/index.php/index/users/updateinfo";	
	   this.defaultUserIcon="https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024";	
	   this.state = {
	   	userHeard:this.props.param.userheard?this.props.param.userheard:this.defaultUserIcon,
	   	nickName:this.props.param.nickname?this.props.param.nickname:'',
	   	credit:this.props.param.credit?this.props.param.credit:'',
	   	showDialog:false,
	   	AlertTitle:'', 
	   	password:'',
	   	sex:this.props.param.sex,
	   	loadingWait:false,
	   };
	}

	back(){
		let navigator = this.props.navigator;
		if (navigator){
			navigator.pop();
		}
	}

	//显示选择框
	showDialog(){
		this.setState({
			AlertTitle:'输入昵称',
			showDialog:!this.state.showDialog
		})
	}


	renderAlertDialog(){
		if (!this.state.showDialog){
			return null;
		}else{
			if (this.state.AlertTitle=='输入昵称') {
			return <AlertDialog
						title={this.state.AlertTitle}
						cancle={()=>{this.setState({showDialog:false})}}
						changeText={(name)=>this.changeText(name)}/>
			}else{
				return <AlertDialog
						title={this.state.AlertTitle}
						cancle={()=>{this.setState({showDialog:false})}}
						changeText={(password)=>{this.setState({password:password,showDialog:false})}}/>
					
			}
		}
	}


	changeText(name){
		if (name=='') {
			this.setState({
				showDialog:false,
				loadingWait:false,
			})
		}else{
			this.setState({
				nickName:name,
				showDialog:false,
				loadingWait:false,
			})
		}
	}

	//更新信息到服务器
	Update(){
		this.setState({
			loadingWait:true,
		})
		Tools.getStorage('phonenum',(ret)=>{
			var picDta={
				'image':this.state.heardImage,
				'phonenum':ret,
				'nickname':this.state.nickName,
				'sex':this.state.sex
			}
			if (Tools.isDataValid(picDta.phonenum)){
				Tools.postNotBase64(this.postUrl, picDta,(res)=>{
		               		ToastAndroid.show("信息修改成功!",2000)
		               		this.setState({
		               			loadingWait:false
		               		})
		           		},(err)=>{
		               	console.log("postImage=="+JSON.stringify(err))
		               	ToastAndroid.show(err,2000)
		               	this.setState({
		                   		loadingWait:false
		               	})
		               })
			}else{
				ToastAndroid.show("登录失效",2000)
			}
	})
	}

	changeSex(){
		this.setState({loadingWait:false})
		this.alertShow.show("选择性别","男",'女',this)
	}

	changePassword(){
		let navigator = this.props.navigator;
		if (navigator) {
			navigator.push({
				name:'FindPassword',
				title:'修改密码',
			})
		}
	}

	changeUserHeard(){
		Tools.chooseImg((resData,BaseUrl)=>{
			this.setState({
				avatarSource:{uri:resData.uri},
				heardImage:BaseUrl.uri,
			})
		},(err)=>{
			ToastAndroid.show(err,2000);
		})
	}
	inSure:{
	}
   render() {
    	return (
      	<View style={styles.container}>
      		<NavBar 
      			back={()=>{this.back()}}
      			titleStyle={styles.titleStyle}
    				titleText={'个人信息'}/>
    			<View style={{flex:1,justifyContent: 'center',}}>
    				<View style={styles.infoView}>
    						<Text style={{marginLeft:20,fontSize:Size(16)}}>当前信用分</Text>
    						<Text style={{marginRight:20,fontSize:Size(16),color:mainColor}}>{this.state.credit}</Text>
    				</View>
	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>头像</Text>
	    				<TouchableOpacity onPress={()=>{this.changeUserHeard()}} style={{flex:1}} >
	    					<View style={styles.itemClick}>
	    						<Image style={styles.userPic} source={this.state.avatarSource?this.state.avatarSource:{uri:this.state.userHeard}}/>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>昵称</Text>
	    				<TouchableOpacity onPress={()=>{this.showDialog()}} style={{flex:1}}>
	    					<View style={styles.itemClick}>
	    						<Text style={{marginRight:10}}>{this.state.nickName}</Text>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>性别</Text>
	    				<TouchableOpacity onPress={()=>{this.changeSex()}} style={{flex:1}}>
	    					<View style={styles.itemClick}>
	    						<Text style={{marginRight:10}}>{this.state.sex}</Text>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>密码修改</Text>
	    				<TouchableOpacity onPress={()=>{this.changePassword()}} style={{flex:1}}>
	    					<View style={styles.itemClick}>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    		</View>

	    		<View style={{justifyContent:'center',margin:10,alignItems:'center'}}>
	    			<Button 
	    				contentText={'确认修改'}
	    				Click={()=>this.Update()}
	    				bgcolor={mainColor}/>
	    		</View>

	    		{this.renderAlertDialog()}
      			<Alert ref={(o)=>this.alertShow=o}/>
      			<Loading loadingWait={this.state.loadingWait} />
      	</View>
    	);
  	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleStyle:{
		alignSelf:'flex-start',
		color:mainColor,
		fontSize:Size(20),
		marginLeft:50,
	},
	infoView:{
		width:screenWidth,
		height:60,
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'#888',
	},
	userIcon:{
		alignSelf:'center',
		marginLeft:20,
		width:80,
	},
	itemClick:{
		flex:1,
		marginRight:20,
		flexDirection:'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	userPic:{
		width:50,
		height:50,
		borderRadius:25,
		borderWidth:0.5,
		marginRight:15,
	},
	footStyle:{
		width:screenWidth,
		height:80,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
