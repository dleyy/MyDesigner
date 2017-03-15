import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import {navheight,screenWidth,screenHeight,MainTabHeight,Size,PhImages} from '../constStr';
import Tools from '../tools';
var ViewPager = require('react-native-viewpager');

export default class firstPage extends Component {
  constructor(props) {
        super(props);
        this.dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        // 实际的DataSources存放在state中
        this.imgUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/leadimages/";
        this.state = {
            dataSource:this.dataSource,
            page: 0
        }
    }
  componentDidMount() {
         Tools.get(this.imgUrl,(ret)=>{
          console.log("DLE===Img"+JSON.stringify(ret.images));
          this.setState({
            dataSource:this.dataSource.cloneWithPages(ret.images),
            page:0,
          }) 
         },(err)=>{
          ToastAndroid.show(err,2000);
         })
  } 

  gotoSecend(){
    var navigator = this.props.navigator;
    if (navigator){
      navigator.push({
        name:'two',
        param:{
          name:'heheda',
          password:'ok'
        }
      })
    };
  }
    _renderPage(data: Object,pageID: number | string,) {
    return (
      <Image
        source={{uri: data}}
        style={styles.page} />
    );
  }

  toLogin(){
    let navigator=this.props.navigator;
    if (navigator){
      navigator.push({
        name:'Login',
      })
    }
  }

  toRegest(){
    let navigator=this.props.navigator;
    if (navigator){
      navigator.push({
        name:'Regest',
      })
    }
  }

  /**
    dataSource: 提供页面数据,
    renderPage: 用于渲染页面视图,
    autoPlay: 为true 将自动播放,
    isLoop: 为true支持循环播放,
    locked: 为true禁止触摸滚动,
    onChangePage: 页面变化的回调,
    renderPageIndicator: 渲染自定义的 ViewPager indicator.
    */
  render() {
    return (
      <View style={styles.container}>
                <ViewPager
                  ref={(viewpager) => {this.viewpager = viewpager}}
                  style={styles.viewpagerstyle}
                  dataSource={this.state.dataSource}
                  renderPage={this._renderPage}
                  isLoop={false}
                  autoPlay={false}/>
                <View style={styles.bottomView}>
                  <TouchableOpacity onPress={()=>this.toRegest()} style={styles.regest}>
                    <Text style={{color:'rgb(237,237,237)',fontSize:Size(16)}}>注册</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.toLogin()} style={styles.login}>
                    <Text style={{color:'rgb(30,35,43)',fontSize:Size(16)}}>登录</Text>
                  </TouchableOpacity>
                </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  viewPager:{
    padding:20,
  },
page: {
    width:screenWidth,
  },
  button: {
    padding: 10,
  },
  viewpagerstyle:{
  },
  bottomView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  regest:{
    width:100,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:20,
    backgroundColor:'rgb(30,35,43)',
  },
  login:{
    width:100,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:20,
    backgroundColor:'rgb(237,237,237)',
  },


});
