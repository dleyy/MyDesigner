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
} from 'react-native';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight,secondColor} from '../constStr';
import NavBar from '../myComponent/Navibar';
import Tools from '../tools'
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Button from '../myComponent/Button'

export default class SelectType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowType:this.props.param.nowType,
      allType:[],
    };
      this.getUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/servicetypes";
  }

  componentDidMount() {
    // var all=[{name:'123'},{name:'1234'},{name:'12345'},]	
    // this.setState({allType:all})
    Tools.postNotBase64(this.getUrl,null,(ret)=>{
        this.setState({allType:ret})
    },(err)=>{
      ToastAndroid.show(err,2000);
    })
  }

  back(type){
    let navigator = this.props.navigator;
      if (this.props.param.getType) {
          this.props.param.getType(type)
      } 
      if (navigator){
        navigator.pop(
          )
      };
  }

  render() {
    return (
      <View style={styles.main}>
      		<View style={styles.title}>
      			<View style={{height:navheight,flexDirection:'row',justifyContent: 'center',alignItems: 'center',width:80}}>
      				<TouchableOpacity style={styles.titleIcon} onPress={()=>{this.back(this.state.nowType)}}>
      					<Icon name={'ios-arrow-dropleft-outline'} color={'#CD2626'} size={30}/>
      				</TouchableOpacity>

      				<TouchableOpacity style={styles.titleIcon} onPress={()=>{this.back('选择服务类型')}}>
      					<Icon name={'ios-close-circle-outline'} color={'#CD2626'} size={30}/>
      				</TouchableOpacity>
      			</View>
      			<View style={{flex:1}}>
      				<Text style={styles.titleText}>选择服务类型</Text>
      			</View>
      		</View>
      		<ScrollView style={{flex:1}}>
                  {this.state.allType.map((item,i)=>{
                      return <TouchableOpacity style={styles.typeView} key={i} onPress={()=>{this.setState({nowType:item.name})}}>
                                      <TouchableOpacity style={styles.typeViewIcon}  onPress={()=>{this.setState({nowType:item.name})}}>
                                              <Icon size={30} name={'ios-checkmark-circle-outline'} color={item.name==this.state.nowType?mainColor:'#e8e8e8'}/>
                                      </TouchableOpacity>
                                      <Text style={{fontSize:Size(20),justifyContent: 'center',marginTop:10}}>{item.name}</Text>
                                </TouchableOpacity>
                  })}
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
	},
      typeView:{
              width:screenWidth,
              height:navheight,
              borderBottomWidth:1,
              borderBottomColor:'#BCD2EE',  
              borderTopWidth:1,
              borderTopColor:'#BCD2EE',     
              flexDirection:'row', 
              marginTop:10,
      },
      typeViewIcon:{
              width:60,
              justifyContent: 'center',
              alignItems: 'center',

      }
});


