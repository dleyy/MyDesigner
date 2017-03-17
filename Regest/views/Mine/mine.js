
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ListView,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import Loading from '../myComponent/loading.js'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class mine extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username:'dleyy',
      identify:false,
      loaded:false,
      userIconLocation:'',
      optionList:'',
      dataSource:ds,
    }
  }

  componentDidMount(){
    var Arr=[
      {name:'ios-clipboard-outline',message:'我的订单'},
      {name:'ios-paper-outline',message:'需求管理'},
      {name:'ios-trophy-outline',message:'技能管理'},
      {name:'ios-cube-outline',message:'积分商城'},
      {name:'ios-folder-open-outline',message:'我的钱包'},
      {name:'ios-card-outline',message:'认证'},
      {name:'ios-color-palette-outline',message:'使用手册'},
      {name:'ios-star-outline',message:'收藏'},
      {name:'ios-construct-outline',message:'系统设置'},
    ];
    this.setState({
      dataSource:ds.cloneWithRows(Arr),
    })
  }

  toOperaterDetail(rowData){
    switch(rowData.message)
    {
      case '系统设置':
      let navigator = this.props.navigator;
        if (navigator){
          navigator.push({
            name:'SysSetting'
          })
        }
        break;

    }
  }

  toUserInfo(){
    let navigator = this.props.navigator;
    if (navigator){
      navigator.push({
        name:'UserSetting',
      })
    }
  }

  renderRow(rowData,sectionID,rowID){
    return <TouchableOpacity onPress={()=>this.toOperaterDetail(rowData)}>
        <View style={styles.itemList}>
          <Icon name={rowData.name} size={40}/>
          <Text style={{marginTop:4}}>{rowData.message}</Text>
        </View>
      </TouchableOpacity>

  }

  render() {
    return (
      <View style={styles.main}>
      	<TouchableOpacity onPress={()=>this.toUserInfo()}>
          <View style={styles.head}>
            <View style={{justifyContent:'center',alignItems:'center',marginLeft:80}}>
              <Image style={styles.userIcon} source={this.state.userIconLocation?{uri:this.state.userIconLocation}:require('../../Img/defaultIcon.jpg')}></Image>
              <Text>{this.state.username}</Text>
            </View>
            <View style={{marginRight:80,justifyContent:'center',alignItems:'center',}}>
              <Icon name={"ios-card-outline"} size={40} color={this.state.identify?mainColor:'rgba(255,0,0,0.3)'} />
              <Text style={{color:this.state.identify?mainColor:'rgba(255,0,0,0.3)'}}>{this.state.identify?'已':'未'}认证</Text>
            </View> 
          </View>  
        </TouchableOpacity>     
          
        <View style={styles.centain}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            contentContainerStyle={styles.listViewStyle}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	main:{
		flex:1,
		alignItems: 'center',
	},
  head:{
    height:100,
    width:screenWidth,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:14,
    borderBottomWidth:0.4,
    borderBottomColor:'#999'
  },
  userIcon:{
    width:60,
    height:60,
    borderRadius:30,
  },
  centain:{
  },
  listViewStyle:{
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
  },
  itemList:{
    justifyContent: 'center',
    alignItems: 'center',
    width:screenWidth/3,
    borderTopWidth:0.5,
    borderRightWidth:0.25,
    borderBottomWidth:0.5,
    borderLeftWidth:0.5,
    borderColor:'#888',
    height:screenWidth/3,
  }
});

