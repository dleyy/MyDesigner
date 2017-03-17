import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {topheight,secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import TopViewPager from '../myComponent/myViewPager';
import Tools from '../tools';

export default class search extends Component {
  constructor(props) {
    super(props);
    this.historyData=[];
    this.state = {
      keywords:'',
      groomData:[],
      historyData:this.historyData,
    };
  }


  isExist(name){
    for (var i = 0; i <this.historyData.length; i++) {
      if(this.historyData[i].name==name){
        return i;
        break;
      }
    }
    return -1;   
  }

  itemSearch(name){
    if (this.isExist(name)==-1){
      this.historyData.push({"name":name});  
    }

    this.setState({historyData:this.historyData})

    Tools.setStorage('srhHistory',JSON.stringify(this.historyData));
  }

  cleanHistory(){
    Tools.removeStorage('srhHistory');
    this.historyData=[];
    this.setState({
      historyData:[],
    })
  }


  renderHistoryData(){
    if (this.state.historyData){
      return <ScrollView style={{marginBottom:10}}> 
              <View style={styles.historyView}>
                {this.state.historyData.map((item,key)=>{
                  return <TouchableOpacity style={styles.historyItem} onPress={()=>this.itemSearch(item.name)} key={key}>
                            <Text>{item.name}</Text>
                         </TouchableOpacity>}
                )}
              </View>
            </ScrollView>
    }else{
      return null;
    }
  }

  renderGroomData(){
    if (this.state.groomData){
      return <View style={styles.groomStyle}>
              {this.state.groomData.map((item,key)=>{
                  return <TouchableOpacity onPress={()=>this.itemSearch(item.name)} style={styles.itemStyle} key={key}>
                            <Text>{item.name}</Text>
                         </TouchableOpacity>}
              )}
             </View>
    }else{
      return null;
    }
  }

  back(){
    let navigator = this.props.navigator;
    if (navigator){
      navigator.pop();
    };
  }

  componentDidMount() {

   Tools.getStorage('srhHistory',(ret)=>{
      if (Tools.isDataValid(ret)){
        this.historyData = JSON.parse(ret);
        this.setState({historyData:this.historyData});     
      }else{
        this.historyData = [];
        this.setState({historyData:this.historyData});     
      }
    });

    var data=[{"name":"看电影"},{"name":"修家电"},{"name":"陪聊天"},
              {"name":"家教"},{"name":"陪吃饭"},{"name":"美容"}];
    this.setState({groomData:data});
  }

  render() {
    return (
      <View style={styles.content}>
      	<View style={styles.title}>
          <TouchableOpacity onPress={()=>this.back()}> 
            <Icon name="ios-arrow-back-outline" size={25} color={secondColor}/>
          </TouchableOpacity>

          <TextInput
            style={styles.inputeText}
            underlineColorAndroid={'transparent'}
            maxLength={15}
            placeholder={'输入查询的关键字'}
            placeholderTextColor={'#c4c4c4'}
            onChangeText={(key) => this.setState({keywords:key})}
            value={this.state.keywords}/>

          <TouchableOpacity onPress={()=>{this.itemSearch(this.state.keywords)}}>
            <Text style={styles.searchText}>搜索</Text>
          </TouchableOpacity>
      	</View>

        <View style={{flex:1}}>
          <View style={[styles.excisoin,{marginTop:0}]}>
            <Text>热门搜索</Text>
          </View>     

          {this.renderGroomData()}  

          <View style={styles.excisoin}>
            <Text>搜索历史</Text>
          </View>        

          {this.renderHistoryData()}

          <View style={{width:screenWidth,marginBottom:10,alignItems:'center',height:100}}>
            <Button Click={()=>{this.cleanHistory()}} bgcolor={'#FB503E'} contentText={'清除记录'}/>
          </View>

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
	title:{
		width:screenWidth,
		height:navheight,
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    marginTop:5,
    paddingLeft:15,
    paddingRight:15,
	},
  searchText:{

  },
  inputeText:{
    flex:1,
  },
  excisoin:{
    width:screenWidth,
    height:36,
    justifyContent:'center',
    paddingLeft:10,
    backgroundColor:'#F2F2F2',
    marginTop:20,
    marginBottom:10,
  },
  groomStyle:{
    width:screenWidth,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  itemStyle:{
    width:screenWidth/4-10,
    height:36,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:18,
    borderWidth:0.5,
    borderColor:'#888',
    margin:5,
  },
  historyView:{
    width:screenWidth,
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  historyItem:{
    width:screenWidth,
    height:40,
    paddingLeft:20,
    justifyContent:'center',
    alignItems:'flex-start',
    borderBottomWidth:1,
    borderBottomColor:'#e8e8e8'
  }
});
