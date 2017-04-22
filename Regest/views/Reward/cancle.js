import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TopViewPager from '../myComponent/myViewPager';
import Tools from '../tools';
import Spinner from 'react-native-loading-spinner-overlay';

export default class cancle extends Component {
  constructor(props) {
    super(props);
    this.collectionUrl = "http://www.freeexplorer.top/leige/public/index.php/index/index/addcollection";
    this.cancleMySelf="http://www.freeexplorer.top/leige/public/index.php/index/index/cancelservice";
    this.cancleMyOrder="http://www.freeexplorer.top/leige/public/index.php/index/index/cancelorder";
    this.state = {
    	serviceName:this.props.param.data.title,
    	sliderImgs:this.props.param.data.showImages?this.props.param.data.showImages:[],
    	sex:'man',
    	userIcon:this.props.param.data.userhead,
      	serviceInfo:this.props.param.data,
      	phonenum:'',
      	nowtype:this.props.param.type,
    };
  }

  back(){
    let navigator=this.props.navigator
    if (navigator){
      navigator.pop();
    }
  } 


  toClloction(){
      Tools.getStorage('phonenum',(ret)=>{
            var postData = {
                'phonenum':ret,
                'serID':this.state.serviceInfo.serID,
            }
            Tools.postNotBase64(this.collectionUrl,postData,(ret)=>{
                ToastAndroid.show(JSON.stringify(ret),2000);
            },(err)=>{
                ToastAndroid.show('收藏失败'+JSON.stringify(err),2000);
            })
      })
  }

  completService(){
      var CompoentName = this.state.nowtype==1?'TaskComplete':'Complete';
  	if (this.state.serviceInfo.state!='进行中') {
  		ToastAndroid.show(this.state.serviceInfo.state+"的服务不能完成",2000);
  	}else{
	  	let navigator = this.props.navigator;
	  	if (navigator) {
	  		navigator.push({
	  			name:CompoentName,
	  			param:{
	  				'data':this.state.serviceInfo,
	  			}
	  		})
	  	};
	  }
	}

  renderCompleteButton(){
  	if (this.state.nowtype==2) {
  		return <View style={{justifyContent: 'center',alignItems: 'center',marginTop:20}}>
			          <Button 
			            contentText={'完成服务'}
			            Click={()=>this.completService()}
			            bgcolor={mainColor}/>
			</View>
  	}else{
  		return null;
  	}
  }

  cancleOrder(){
  	if (this.state.serviceInfo.state!="进行中") {
  		ToastAndroid.show(this.state.serviceInfo.state+"的服务不能取消",2000);
  	}else{
	  	this.setState({
	  		loading:true,
	  	})
	  	var url = this.state.nowtype==1?this.cancleMySelf:this.cancleMyOrder;
	  	      Tools.getStorage('phonenum',(ret)=>{
		          var postData={
		            "phonenum":ret,
		            "serID":this.state.serviceInfo.serID,
                          "note":"我不想发布了"
		          }
	          Tools.postNotBase64(url,postData,(ret)=>{
				ToastAndroid.show("取消成功",2000);
				this.setState({
					loading:false,
				})
	          },(err)=>{
	            ToastAndroid.show(JSON.stringify(err),2000);
				this.setState({
	                loading:false,
	              })
	          })
	      });
  	   }
  }

  render() {
    return (
      <View style={styles.content}>
      	<Navibar titleText={this.state.serviceName} titleStyle={styles.titlestyle} back={()=>{this.back()}}/>
      	<View style={styles.center}>
      		<View style={{width:screenWidth,height:140}}>
              <TopViewPager
                imgs={this.state.sliderImgs} height={140}
                isLoop={this.state.sliderImgs.length==1?false:true}
                autoPlay={true} resizeMode={Image.resizeMode.stretch}
                corverBg={true} indicatorStyle={{alignItems:'flex-end',right:20,}}
                clickPage={()=>{this.imageClick()}}
                navigator={this.props.navigator} /> 
            </View>
            <ScrollView style={{flex:1}}>
            <View style={styles.serviceInfo}>
                   <View style={{width:screenWidth,flexDirection:'row'}}>
                        <View>
                              <Text style={{fontSize:Size(26)}}>{this.state.serviceInfo.title}</Text>
                              <Text style={{fontSize:Size(17),color:'#FB503E',marginTop:19}}>¥{this.state.serviceInfo.price}</Text>                                        
                        </View>
                        <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
                                <TouchableOpacity style={{width:80,height:40,marginLeft:40,backgroundColor:'#F00',justifyContent: 'center',alignItems: 'center',}} onPress={()=>{this.toClloction()}} >
                                        <Text style={{fontSize:Size(19),color:'#fff',}}>收藏</Text>
                                </TouchableOpacity>
                        </View>
                   </View>

                    <View style={{flexDirection:'row',marginTop:19}}>
                        <Text style={{fontSize:Size(17),color:'#171717'}}>服务描述:</Text>
                        <Text style={{fontSize:Size(17)}}>{this.state.serviceInfo.content}</Text>
                    </View>        
                    <View style={{flexDirection:'row',marginTop:19}}>
                        <Text style={{fontSize:Size(17),color:'#171717'}}>服务范围:</Text>
                        <Text style={{fontSize:Size(17)}}>{this.state.serviceInfo.location?this.state.serviceInfo.location:'暂无'}</Text>
                    </View>                
            </View>

            <View style={styles.serviceInfo}>
                  <View style={{width:screenWidth,height:80,flexDirection:'row'}}>
                          <Image style={styles.userHead} source={{uri:this.state.userIcon}} />
                          <View style={{marginLeft:10,justifyContent: 'center',alignItems: 'center',}}>
                                <Text>{Tools.showUserPhone(this.state.serviceInfo.phonenum)}</Text>
                                <View style={{flexDirection:'row',marginTop:19,justifyContent: 'flex-start'}}>
                                  <Text style={{fontSize:Size(17),color:'#171717'}}>信用分:</Text>
                                  <Text style={{fontSize:Size(17),color:mainColor}}>{this.state.serviceInfo.credit?this.state.serviceInfo.credit:'0'}</Text>
                                </View> 
                                <View style={{flexDirection:'row',marginTop:19,marginLeft:10,justifyContent: 'flex-start',}}>
                                  <Text style={{fontSize:Size(17),color:'#171717'}}>服务次数:</Text>
                                  <Text style={{fontSize:Size(17),color:mainColor}}>{this.state.serviceInfo.allNumber?this.state.serviceInfo.allNumber:'0'}次</Text>
                                </View> 
                          </View>
                  </View>
            </View>
           <Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />
			{this.renderCompleteButton()} 
		       <View style={{justifyContent: 'center',alignItems: 'center',marginTop:20,marginBottom:40}}>
		          <Button 
		            contentText={'取消服务'}
		            Click={()=>this.cancleOrder()}
		            bgcolor={'#EE3B3B'}/>
		       </View>    
            </ScrollView> 
      	</View>
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
      }
});
