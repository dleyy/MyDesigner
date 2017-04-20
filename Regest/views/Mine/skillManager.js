import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
  ToastAndroid,
  ScrollView,
  RefreshControl
} from 'react-native';

import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Tools from '../tools';

export default class skillManager extends Component {
  constructor(props) {
    super(props);
    this.mySkillUrl = "http://www.freeexplorer.top/leige/public/index.php/index/index/getservicetype";
    this.state = {
        isRefreshing:false,
        mySkill:[],
    };
  }

  componentDidMount() {
      this.setState({
        isRefreshing:true,
      })
    	Tools.getStorage('phonenum',(ret)=>{
            var postData = {
                'phonenum':ret,
            }
            Tools.postNotBase64(this.mySkillUrl,postData,(ret)=>{
                this.setState({
                  isRefreshing:false,
                  skillInfo:ret,
                })
                
            },(err)=>{
                this.setState({
                    isRefreshing:false,
                })
                ToastAndroid.show(JSON.stringify(err),2000);
            })
      })
  }
  
  back(){
  	let navigator = this.props.navigator;
  	if (navigator) {
  		navigator.pop();
  	}
  }

  renderMySkill(){
      if(Tools.isDataValid(this.state.skillInfo)){
         return  this.state.skillInfo.map((item,i)=>{
                return  <TouchableOpacity style={styles.serviceItem} key={i}>
                       <View style={styles.serviceItem}>
                          <Text style={{fontSize:Size(18),width:80,color:'#A52A2A',borderRightWidth:1,borderRightColor:'#e8e8e8'}}>{item.state}</Text>
                          <View style={{flex:1,justifyContent: 'center',paddingBottom:5,alignItems: 'center',}}>
                                  <Text  style={{fontSize:Size(16),color:'#EE4000'}}>{item.skillname}</Text>
                                  <View style={{width:screenWidth-70,height:1,backgroundColor:'#e8e8e8'}}/>
                                  <Text  style={{fontSize:Size(16),color:'#000'}}>{item.skillDetail}</Text>
                          </View>
                       </View>
                   </TouchableOpacity>
          })
     }else{
      return <Text style={{fontSize:Size(16),justifyContent: 'center',alignItems: 'center',paddingLeft:50,marginTop:30}}>暂无数据...</Text>
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
      				<Text style={{fontSize:Size(18)}}>当前发布的技能:</Text>
      			</View>

                    <ScrollView style={{flex:1}} refreshControl={  
                        <RefreshControl  
                         refreshing={this.state.isRefreshing}  
                          onRefresh={()=>this.componentDidMount()}  
                          colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}  
                         progressBackgroundColor="#ffffff" />}>

                         {this.renderMySkill()}
                    
                    </ScrollView>
      			<View style={{width:screenWidth,marginBottom:20,justifyContent: 'center',alignItems: 'center',}}>
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
      serviceItem:{
          width:screenWidth,
          height:60,
          flexDirection:'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomColor:'#e8e8e8',
          borderBottomWidth:1,
          paddingLeft:10,
        }
});