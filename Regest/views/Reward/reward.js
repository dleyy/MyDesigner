'use strict';

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

export default class reward extends Component {
  constructor(props) {
    super(props);
    this.getInfoUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/getservices";
    this.state = {
      nowType:'发布的服务',
      showType:false,
      serviceInfo:[],
      isRefreshing:true,
    };
  }

  selectType(){
    this.setState({
      showType:!this.state.showType,
    })
  }

  componentDidMount() {
        this.setState({
            loading:true,
            isRefreshing:true,
        })
      Tools.getStorage('phonenum',(ret)=>{
          var postData={
             "phonenum":ret,
             'type':this.state.nowType=='发布的服务'?1:2,
            }
      Tools.postNotBase64(this.getInfoUrl,postData,(ret)=>{
            this.setState({
              loading:false,
              serviceInfo:ret.data,
              isRefreshing:false,
            })
      },(err)=>{
            ToastAndroid.show(JSON.stringify(err),2000);
            this.setState({
                  loading:false,
                  isRefreshing:false,
            })
          });
      })
  }
  
  addTask(){
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
        name:'AddService',
      })
    };
  }

  toServiceInfo(item){
      var navigator = this.props.navigator;
      if (navigator) {
          navigator.push({
              name:'Cancle',
              param:{
                'data':item,
                'type':this.state.nowType=='发布的服务'?1:2,
              }
          })
      }
  }

  renderService(){
      if(Tools.isDataValid(this.state.serviceInfo)){
         return  this.state.serviceInfo.map((item,i)=>{
                return  <TouchableOpacity style={styles.serviceItem} key={i} onPress={()=>this.toServiceInfo(item)}>
                       <View style={styles.serviceItem}>
                          <Text style={{fontSize:Size(18),width:80,color:'#A52A2A',borderRightWidth:1,borderRightColor:'#e8e8e8'}}>{item.state}</Text>
                          <View style={{flex:1,justifyContent: 'center',paddingBottom:5,alignItems: 'center',}}>
                                  <Text  style={{fontSize:Size(16),color:'#EE4000'}}>{item.title}</Text>
                                  <View style={{width:screenWidth-70,height:1,backgroundColor:'#e8e8e8'}}/>
                                  <Text  style={{fontSize:Size(16),color:'#000'}}>{item.content}</Text>
                          </View>
                       </View>
                   </TouchableOpacity>
          })
     }else{
      return null;
     }
  }



  renderSelectType(){
            if (!this.state.showType) {
          return null;
        }else{
        return  <View style={styles.typeChange}>
                      <TouchableOpacity onPress={()=>{this.setState({nowType:'发布的服务',showType:false}),this.componentDidMount()}} style={styles.head_left}>
                          <Text style={styles.head_left_text}>发布的服务</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{this.setState({nowType:'预定的服务',showType:false}),this.componentDidMount()}} style={styles.head_left}>
                          <Text style={styles.head_left_text}>预定的服务</Text>
                      </TouchableOpacity>
                    </View>
    }
  }


  render() {
    return (
      <View style={styles.main}>
        <View style={styles.head}>
          <TouchableOpacity onPress={()=>this.selectType()} style={styles.head_left}>
            <Text style={styles.head_left_text}>{this.state.nowType}</Text>
            <Icon name={this.state.showType?'ios-arrow-dropdown-outline':'ios-arrow-dropup-outline'} size={18} color={secondColor} />
          </TouchableOpacity>
          <View style={styles.head_right}>
            <TouchableOpacity onPress={()=>this.addTask()} style={styles.icon} >
              <Icon name={'ios-add-outline'} size={32} color={mainColor}/>
            </TouchableOpacity>
          </View>
        
        </View>
        <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
             <ScrollView refreshControl={  
          <RefreshControl  
           refreshing={this.state.isRefreshing}  
            onRefresh={()=>this.componentDidMount()}  
            colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}  
           progressBackgroundColor="#ffffff" />}>
               {this.renderService()}
             </ScrollView>
        </View>
                {this.renderSelectType()}
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
  head:{
    width:screenWidth,
    height:50,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth:1,
    borderBottomColor:mainColor,
  },
  head_left:{
    height:50,
    width:150,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head_left_text:{
    color:secondColor,
    fontSize:Size(20),
    marginRight:4,
  },
  head_right:{
    height:50,
    width:100,
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:10,
    alignItems:'flex-end',
  },
  icon:{
    height:50,
    justifyContent: 'center',
    marginLeft:40,
  },
  typeChange:{
    width:110,
    height:110,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top:50,
    backgroundColor:'#e8e8e8',
    left:20,
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
