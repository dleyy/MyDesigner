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
import Spinner from 'react-native-loading-spinner-overlay';

export default class identify extends Component {
	constructor(props) {
	  super(props);
	  this.userImags=[];
    	  this.postUserImages=[];
    	  this.uploadUrl="http://www.freeexplorer.top/leige/public/index.php/index/users/uploadqualifyimg";
    	  this.getInfoUrl="http://www.freeexplorer.top/leige/public/index.php/index/users/getaccountstate";
	  this.state = {
	  	title:'',
	  	uploaded:false,
	  	nowMessage:'',
            loading:false,
            loading:'loading'
	  };
	}

	back(){
		let navigator = this.props.navigator;
		if (navigator) {
			navigator.pop();
		}
	}
  renderImageAdd(){
      return  <View style={styles.images}>
              {this.renderImages()}
            <TouchableOpacity style={styles.addImageView} onPress={()=>{this.addImage()}}>
            <Icon size={40} style={{marginLeft:5}} name={'ios-add-circle-outline'}/>
            </TouchableOpacity>
      </View>
  }

  componentDidMount() {
      this.setState({
        loading:true,
        loadingText:'加载中...'
      })
   	Tools.getStorage('phonenum',(ret)=>{
   		var postData={
   			'phonenum':ret
   		};
   		Tools.postNotBase64(this.getInfoUrl,postData,(ret)=>{
                    if (ret.state=='未认证') {
                          this.setState({
                            loading:false,
                            uploaded:false,
                            nowMessage:ret.state,
                          })
                    }else{
                        this.setState({
                            loading:false,
                            uploaded:true,
                            nowMessage:ret.state,
                        })
                    }
   		},(err)=>{
   			ToastAndroid.show(err,2000);
   		})
   	});
  }

    imgSplice(i){
    	this.userImags.splice(i,1);
   	 this.postUserImages.splice(i,1);
    	this.setState({title:this.state.title})
  }

    addImage(){
	    Tools.chooseImg((msg,baseUrl)=>{
	      this.userImags.push({
	          uri:msg.uri,
	      })
	      this.postUserImages.push(baseUrl.uri)
	      this.setState({title:this.state.title})
	    },()=>{
	    });
  }

  publish(){
  	if (!Tools.isDataValid(this.userImags)) {
  		ToastAndroid.show('请先上传图片',2000);
  	}else{
            this.setState({loading:true,loadingText:'上传中...'})
            Tools.getStorage('phonenum',(ret)=>{
                  var postData={
                    "Img":this.postUserImages,
                    'phonenum':ret,
                  }
                  Tools.postNotBase64(this.uploadUrl,postData,(ret)=>{
                     this.userImags=[];
                     this.postUserImages=[];
                     this.setState({loading:false,loadingText:'上传中...'})
                     ToastAndroid.show("上传成功..等待审核",2000);
                  },(err)=>{
                     this.setState({loading:false,loadingText:'上传中...'})
                    ToastAndroid.show(JSON.stringify(err),2000);
                  })
            });
  	}
  }

    renderImages(){
    if (Tools.isDataValid(this.userImags)) {
              return this.userImags.map((item,i)=>{
                  return  <TouchableOpacity key={i} style={styles.addImageView} onPress={()=>this.imgSplice(i)} > 
                                   <Image style={styles.image} source={item} resizeMode={'stretch'}/>
                              </TouchableOpacity>
              })      
      }else{
        return null;
      }
  }

  render() {
  	if (!this.state.uploaded){
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
      				<Text style={styles.titleText}>实名认证</Text>
      			</View>
      		</View>    

      		<View style={{flex:1}}>
             <Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />
      			<View >
      				<Text style={{fontSize:Size(20),marginTop:10,color:'#000',marginLeft:10}}>注意事项:</Text>
      				<Text style={styles.noticeText}>需上传手持身份证头部照”和“本人身份证”各一张，照片所示必须和实名认证的身份证照片一致，证件需提交正反两面</Text>
      			</View>
      		{this.renderImageAdd()}
      		</View>
      		<View style={{justifyContent: 'center',alignItems: 'center',marginBottom:20}}>
	      		<Button 
	            		contentText={'上传'}
	            		Click={()=>this.publish()}
	            		bgcolor={'#EE3B3B'}/>
            	</View>
      </View>
    );
  }else{
  	return(
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
                                  <Text style={styles.titleText}>实名认证</Text>
                                </View>
                          </View>
                    <View style={{flex:1}}>
                          <View style={{flexDirection:'row'}}>    
                			<Text style={{fontSize:Size(20),marginTop:10,marginLeft:10}}>当前状态:</Text>
                               <Text style={{fontSize:Size(20),marginTop:10,marginLeft:10,color:mainColor}}>{this.state.nowMessage}</Text>                	        
                         </View>		

                                <View style={{height:50,width:screenWidth}}/>
                			<View style={{justifyContent: 'center',alignItems: 'center',marginBottom:20}}>
              	      			<Button 
              	            			contentText={'重新上传'}
              	            			Click={()=>{this.setState({uploaded:false})}}
              	            			bgcolor={'#EE3B3B'}/>
                          		</View>
                    </View>
  		</View>
  		);
  }

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
});
