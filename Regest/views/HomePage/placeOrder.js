import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Picker,
  TextInput,
} from 'react-native';

import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TopViewPager from '../myComponent/myViewPager';
import Loading from '../myComponent/loading.js';
import Tools from '../tools';
import Spinner from 'react-native-loading-spinner-overlay';

export default  class placeOrder extends Component {
	constructor(props) {
	  super(props);
	  this.pickData=[];
	  this.pickTime=[];
	  this.orderUrl='http://www.freeexplorer.top/leige/public/index.php/index/index/addorder';
	  this.state = {
	  	data:this.props.param.data,
	  	defaultNum:1,
	  	pickData:'选择服务时间',
	  	loading:false,
	  };
	}

	componentDidMount() {
		var dd = new Date();
	    var pickData=[];
	    var pickTime=[];
	    pickData.push(dd.getMonth()+1+"月"+dd.getDate()+'日');
	    for(var i=1;i<7;i++){
	    	  dd.setDate(dd.getDate()+1); 
		  var m = dd.getMonth()+1;//获取当前月份的日期 
		  var d = dd.getDate();
		  var data =  m+"月"+d+'日';
		  pickData.push(data); 
	    }
	    if (dd.getHours()<21&&dd.getHours()>7) {
	    	for(var i=1;i<=21-dd.getHours();i++){
	    		pickTime.push(dd.getHours()+i+":00")
	    	}
	    }else{
	    	//这里 时间在7点前和21点之后的 不予考虑
	    	return;
	    }
	    this.pickTime=pickTime;
	    this.pickData=pickData;

	    Tools.getStorage('phonenum',(ret)=>{
	    		this.setState({
	    			phonenum:ret,
	    			loadingWait:false,
	    			pickData:pickData[0]
	    		})
	    });
	}

	toQuestion(){

	}

	toSevice(){

	}

	back(){
		let navigator = this.props.navigator;
		if (navigator) {
			navigator.pop();
		}
	}

	showTimePick(){
		this.setState({
	    		showPicker:!this.state.showPicker
	    	})
	}

	buy(){
		this.setState({
			loadingWait:true,
		})
		if (!this.state.name) {
			ToastAndroid.show("请输入联系人姓名",2000)
		}else if(!this.state.phonenum){
			ToastAndroid.show("请输入手机号码",2000)
		}else{
			this.setState({
				loading:true,
				loadingText:"loading..."
			})
		var postData={
			'serID':this.state.data.serID,
			'time':this.state.pickData,
			'times':this.state.defaultNum,
			'name':this.state.name,
			'phonenum':this.state.phonenum,
			'notes':this.state.note,
		}
		Tools.postNotBase64(this.orderUrl,postData,(ret)=>{
        		ToastAndroid.show('下单成功',2000);
        		this.setState({
        			name:'',
        			notes:'',
        			loading:false,
        		})
	      },(err)=>{
	        ToastAndroid.show(err,2000);
	             this.setState({
        			loading:false,
        		})
	      })
	}
	}

	remove(){
		if (this.state.defaultNum==1){
			return;
		}else{
			this.setState({
				defaultNum:this.state.defaultNum-1,
			})
		}
	}


	add(){
		this.setState({
			defaultNum:this.state.defaultNum+1,
		})
	}

	returnPicker(){
		if(this.state.showPicker){
		return   	
		}else{
			return <Text style={{alignSelf:'center',marginLeft:10}}>{this.state.serviceTime}</Text>;
		}
	}

	renderPick(){
		if (Tools.isDataValid(this.pickData)) {
			return  <Picker
						style={{flex:1,justifyContent: 'center',alignItems: 'center',}}
		 				selectedValue={this.state.pickData}
		  				onValueChange={(Data) => this.setState({pickData:Data})}>
		  			  	<Picker.Item label={this.pickData[0]} value={this.pickData[0]} />
		  			  	<Picker.Item label={this.pickData[1]} value={this.pickData[1]} />
		  			  	<Picker.Item label={this.pickData[2]} value={this.pickData[2]} />
		  			  	<Picker.Item label={this.pickData[3]} value={this.pickData[3]} />
		  			  	<Picker.Item label={this.pickData[4]} value={this.pickData[4]} />
		  			  	<Picker.Item label={this.pickData[5]} value={this.pickData[5]} />
		  			  	<Picker.Item label={this.pickData[6]} value={this.pickData[6]} />		  			  	
					</Picker>
		}else{
			return null;
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
      				<Text style={styles.titleText}>预约下单</Text>
      			</View>
      		</View>

      		<View style={{flex:1}}>
      			<View style={styles.serviceInfo}>
      				<View style={{flex:1,justifyContent:'center',marginLeft:20}}>
      					<Text style={{fontSize:Size(20),color:'#000'}}>{this.state.data.title}</Text>
      					<Text style={{fontSize:Size(17),color:'#FB503E',marginTop:19}}>¥{this.state.data.price}</Text>  
      				</View>
      				<View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center',}}>
      					<TouchableOpacity style={{margin:10}} onPress={()=>this.remove()}>
      						<Icon name={'ios-remove-circle-outline'} size={28} color={'#CD2626'}/>
      					</TouchableOpacity>
      					<Text style={{fontSize:Size(20)}}>{this.state.defaultNum}</Text>
      					<TouchableOpacity style={{margin:10}} onPress={()=>this.add()}>
      						<Icon name={'ios-add-circle-outline'} size={28} color={'#CD2626'}/>
      					</TouchableOpacity>
      				</View>
      			</View>
      			<View style={{width:screenWidth,height:10,backgroundColor:'#e8e8e8'}}/>
     
      			<View style={{flexDirection:'row',padding:10}}>
      				<Text style={{marginTop:10,fontSize:Size(20)}}>服务时间:</Text>
      				{this.renderPick()}
      			</View>
      			<View style={{width:screenWidth,height:10,backgroundColor:'#e8e8e8'}}/>
      			 
      			<View style={{width:screenWidth,height:50,flexDirection:'row'}}>
      				<Icon name={'md-person'}  size={25} style={{marginTop:15,marginLeft:10}}/>
      				<TextInput 
	    				style={{flex:1}}
	    				placeholder={'联系人姓名'}
	    				maxLength={15}
	    				underlineColorAndroid={'transparent'}
			        	onChangeText={(name) => this.setState({name:name})}
			        	value={this.state.name}/>
      			</View>
      			<View style={{width:screenWidth,height:1,backgroundColor:'#e8e8e8'}}/>

      			<View style={{width:screenWidth,height:50,flexDirection:'row'}}>
      				<Icon name={'ios-call'}  size={25} style={{marginTop:15,marginLeft:10}}/>
      				<TextInput 
	    				style={{flex:1}}
	    				placeholder={'联系人电话'}
	    				maxLength={15}
	    				underlineColorAndroid={'transparent'}
			        	onChangeText={(phonenum) => this.setState({phonenum:phonenum})}
			        	value={this.state.phonenum}/>
      			</View>
      			<View style={{width:screenWidth,height:1,backgroundColor:'#e8e8e8'}}/>

      			<View style={{width:screenWidth,height:50,flexDirection:'row'}}>
      				<Icon name={'ios-create'}  size={25} style={{marginTop:15,marginLeft:10}}/>
      				<TextInput 
	    				style={{flex:1}}
	    				placeholder={'备注'}
	    				maxLength={15}
	    				underlineColorAndroid={'transparent'}
			        	onChangeText={(note) => this.setState({note:note})}
			        	value={this.state.note}/>
      			</View>
      			<View style={{width:screenWidth,height:1,backgroundColor:'#e8e8e8'}}/>

      			<View>
      				<Text style={{fontSize:Size(17),margin:5}}>温馨提示:</Text>
      				<Text style={{margin:5}}>请仔细核对您填写的手机号，商家将会在服务开始前与您联系</Text>
      			</View>
      			
      			<View style={{flexDirection:'row',marginTop:5}}>
		            <Text style={{fontSize:Size(14),marginLeft:10}}>下单即代表同意{appName}的</Text>
		            <TouchableOpacity onPress={()=>this.toSevice()} >
		              <Text style={[styles.noticeText,{fontSize:Size(14),margin:0}]}>《用户服务协议》</Text>
		            </TouchableOpacity>
         		 </View>

	          <View style={{flexDirection:'row',marginTop:5}}>
		            <Text style={{fontSize:Size(14),marginLeft:10}}>还有疑问?查看</Text>
		            <TouchableOpacity onPress={()=>this.toQuestion()} >
		              	<Text style={[styles.noticeText,{fontSize:Size(14),margin:0}]}>《常见问题》</Text>
		            </TouchableOpacity>
	          </View>
      		</View>
      		<View style={{width:screenWidth,height:40,flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',marginBottom:20,marginLeft:10}}>
      			<View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center',flexDirection:'row'}}>
      				<Text style={{fontSize:Size(19)}}>待支付:</Text>
      				<Text style={{fontSize:Size(23),color:'#CD0000'}}>¥{this.state.data.price.replace(/[^0-9]/ig,"")*this.state.defaultNum}</Text>
      			</View>
      			<TouchableOpacity style={{justifyContent: 'center',alignItems: 'center',width:100,height:40,backgroundColor:'#CD0000'}} onPress={()=>this.buy()}>
      				<Text style={{color:'#fff',fontSize:Size(17)}}>确认支付</Text>
      			</TouchableOpacity>
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
	serviceInfo:{
		width:screenWidth,
		height:80,
		flexDirection:'row',
	},
	 noticeText:{
    		color:mainColor,
   		fontSize:Size(18),
    		margin:5,
  	},
});
