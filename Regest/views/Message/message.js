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

export default class message extends Component {
  constructor(props) {
    super(props);
    this.getOrderUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/getuserservices";
    this.state = {
      orderInfo:[],
      isRefreshing:false,
    };
  }

  componentDidMount() {
    this.setState({
      isRefreshing:true,
    })

      Tools.getStorage('phonenum',(ret)=>{
          var postData={
               "phonenum":ret,
           }
      Tools.postNotBase64(this.getOrderUrl,postData,(ret)=>{
      this.setState({
        orderInfo:ret,
        isRefreshing:false,
      })
          },(err)=>{
            ToastAndroid.show(JSON.stringify(err),2000);
            this.setState({
                   isRefreshing:false,
                })
          });
      });
  }

  toOrderInfo(item){
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
          name:'UserList',
          param:{
              'data':item,
          }
      })
    }
  }

  renderOrder(){
      if(Tools.isDataValid(this.state.orderInfo.data)){
         return  this.state.orderInfo.data.map((item,i)=>{
                return  <TouchableOpacity style={styles.serviceItem} key={i} onPress={()=>this.toOrderInfo(item)}>
                       <View style={styles.serviceItem}>
                          <Text style={{fontSize:Size(18),width:80,color:mainColor,borderRightWidth:1,borderRightColor:mainColor}}>{item.inNum}个未完成</Text>
                          <View style={{flex:1,justifyContent: 'center',paddingBottom:5,alignItems: 'center',}}>
                                  <Text  style={{fontSize:Size(16),color:'#EE4000'}}>{item.title}</Text>
                                  <View style={{width:screenWidth-70,height:1,backgroundColor:'#e8e8e8'}}/>
                                  <Text  style={{fontSize:Size(16),color:'#000'}}>{item.content}</Text>
                          </View>
                       </View>
                   </TouchableOpacity>
          })
     }else{
      return <Text style={{marginTop:20}}>暂无服务信息..</Text>;
     }    
  }

  render() {
    return (
      <View style={styles.main}>
      		<ScrollView refreshControl={  
                <RefreshControl  
                     refreshing={this.state.isRefreshing}  
                      onRefresh={()=>this.componentDidMount()}  
                      colors={['#ff0000', '#00ff00','#0000ff','#3ad564']}  
                     progressBackgroundColor="#ffffff" />}>
               {this.renderOrder()}
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
      serviceItem:{
            width:screenWidth,
            height:60,
            flexDirection:'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor:'#e8e8e8',
            borderBottomWidth:1,
            paddingLeft:10,
            marginTop:10,
      }
});
