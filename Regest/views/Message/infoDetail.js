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
import Spinner from 'react-native-loading-spinner-overlay';
import AlertDialog from '../myComponent/AlertDialog';


export default class infoDetail extends Component {
  constructor(props) {
    super(props);
    this.updateUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/changeorderstate";
    this.state = {
    	orderInfo:this.props.param.data,
    	showDialog:false,
    };
  }

  back(){
    let navigator = this.props.navigator;
    if (navigator) {
    	navigator.pop();
    };
  }

    completService(){
      var CompoentName='TaskComplete'
	  	let navigator = this.props.navigator;
	  	if (navigator) {
	  		navigator.push({
	  			name:CompoentName,
	  			param:{
	  				'data':this.state.orderInfo,
	  			}
	  		})
	  	};
	}

	cancleOrder(){
		this.setState({
			showDialog:!this.state.showDialog,
		})
  	   }


    renderCompleteButton(){
  	if (this.state.orderInfo.orderstate=='进行中') {
  		return <View style={{justifyContent: 'center',alignItems: 'center',marginTop:60}}>
			          <Button 
			            contentText={'完成服务'}
			            Click={()=>this.completService()}
			            bgcolor={mainColor}/>
			</View>
  	}else{
  		return null;
  	}
  }

  renderCancleButton(){
  	if (this.state.orderInfo.orderstate=='进行中') {
  		return <View style={{justifyContent: 'center',alignItems: 'center'}}>
  					<Button
  						contentText={'取消服务'}
  						Click={()=>this.cancleOrder()}
  						bgcolor={'#CD2626'}
  						/>
  			    </View>
  	}
  }

  renderAlertDialog(){
	if (!this.state.showDialog){
		return null;
	}else{
		return <AlertDialog
					title={'取消原因'}
					cancle={()=>{this.setState({showDialog:false})}}
					changeText={(note)=>this.updateState(note)}/>
	}
  }

  updateState(note){
  	this.setState({
  		loading:true,
  		loadingText:'取消中...'
  	})
      Tools.getStorage('phonenum',(ret)=>{
          var postData={
            "phonenum":ret,
            'state':'已拒绝',
            'note':note,
          	'orderID':this.state.orderInfo.orderID,
          }
          Tools.postNotBase64(this.updateUrl,postData,(ret)=>{
          		this.setState({
          			loading:false,
          			showDialog:false,
          		})
			ToastAndroid.show("取消成功",2000);
          },(err)=>{
          	       this.setState({
          			loading:false,
          			showDialog:false,
          		})
            ToastAndroid.show(err,2000);
          })
      });
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
      				<Text style={styles.titleText}>订单详情</Text>
      			</View>
      		</View>

      		<View style={{flex:1}}>
		      		<View style={{width:screenWidth,height:50,flexDirection:'row',marginTop:20}}>
		      				<Icon name={'md-person'}  size={25} style={{marginTop:15,marginLeft:10}}/>
		      				<Text style={styles.infoText}>{this.state.orderInfo.nickname}</Text>
		      			</View>
		      			<View style={{width:screenWidth,height:1,backgroundColor:'#e8e8e8'}}/>
		      			<View style={{width:screenWidth,height:50,flexDirection:'row'}}>
		      				<Icon name={'ios-call'}  size={25} style={{marginTop:15,marginLeft:10}}/>
		      				<Text  style={styles.infoText}>{this.state.orderInfo.phonenum}</Text>
		      			</View>
		      			<View style={{width:screenWidth,height:1,backgroundColor:'#e8e8e8'}}/>

		      			<View style={{width:screenWidth,height:50,flexDirection:'row'}}>
		      				<Icon name={'ios-create'}  size={25} style={{marginTop:15,marginLeft:10}}/>
		      				<Text  style={styles.infoText}>{this.state.orderInfo.note}</Text>
		      			</View>
		      			<View style={{width:screenWidth,height:1,backgroundColor:'#e8e8e8'}}/>
		      			<View style={{width:screenWidth,height:50,flexDirection:'row'}}>
		      				<Icon name={'ios-clock'}  size={25} style={{marginTop:15,marginLeft:10}}/>
		      				<Text  style={styles.infoText}>{this.state.orderInfo.time.substring(0,10)}</Text>
		      			</View>
		      			<View style={{width:screenWidth,height:1,backgroundColor:'#e8e8e8'}}/>
		      			<View style={{width:screenWidth,height:50,flexDirection:'row'}}>
		      				<Text style={{marginTop:15,marginLeft:10,fontSize:Size(20)}}>订单数量</Text>
		      				<Text  style={styles.infoText}>{this.state.orderInfo.num}</Text>
		      			</View>
		      		<View style={{width:screenWidth,height:1,backgroundColor:'#e8e8e8'}}/>
		           <Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />
					{this.renderCompleteButton()}
					{this.renderCancleButton()}
					{this.renderAlertDialog()}	           		
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
	    height:60,
	    flexDirection:'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderBottomColor:'#e8e8e8',
	    borderBottomWidth:1,
	    paddingLeft:10,
	},
	infoText:{
		alignSelf:'center',
		marginLeft:20,
		fontSize:Size(20)
	}
});
