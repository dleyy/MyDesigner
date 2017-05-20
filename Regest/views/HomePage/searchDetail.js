
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
import TopViewPager from '../myComponent/myViewPager';
import Tools from '../tools';
import MyListView from '../myComponent/MyListView.js';
const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
var DEFAULTIMG = 'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024';
var DEFAULTSHOWS = [{DEFAULTIMG},{DEFAULTIMG}];

export default class searchDetail extends Component {
  constructor(props) {
      super(props);
      this.infoUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/services/";
      this.listData=[];
      this.myPage=1;
      this.state = {
        pagesize:5,
        dataSource:ds,
        count:20,
        dataSize:this.listData?this.listData.length:0,
      };
    }  

  componentDidMount() {
    let data={
      "pagesize":this.state.pagesize,
      "page":this.myPage,
      "keywords":this.props.param.keywords,
    };

    Tools.postNotBase64(this.infoUrl,data,(ret)=>{
      console.log("DLE===ret"+JSON.stringify(ret))
        this.setState({count:ret.total})
        if (this.myPage==1){              
          this.listData = ret.data;
        }else{
          this.listData = this.listData.concat(ret.data)
        }
        this.setState({dataSource:ds.cloneWithRows(this.listData),dataSize:this.listData.length});
    },(err)=>{
      ToastAndroid.show("暂无数据",2000);  
    });
    
     
  }

  renderCenterImgs(rowData){
    console.log("DLE===="+JSON.stringify(rowData.showImages))
    if (rowData.showImages){
      return rowData.showImages.map((item,i)=>{
      return <Image key={i} style={styles.centerImg} source={{uri:item}}/>
      });
    }else{
      return null;
    }
  }

  //用户详情
  toUser(id){
    alert(id);
  }

  imageClick(){
    alert("ImageClick");
  }

  toSearch(){
    let navigator = this.props.navigator;
    if (navigator){
      navigator.push({
        name:'Search',
      })
    }
  }

  toDetails(rowData,i,j){
    let navigator = this.props.navigator;
    if (navigator){
      navigator.push({
        name:'ServiceDetaile',
        param:{
          data:rowData
        }
      })
    };
  }

  goBack(){
    let navigator = this.props.navigator;
    if (navigator){
      navigator.pop();
    }
  }

  toLike(){

  }
  toComment(){

  }
  _onRefresh(){
    this.myPage=1;
    console.log("===REFPAGE="+this.myPage)
    this.componentDidMount();
  }

    load(){
      if(this.state.dataSize < this.state.count){
      var nowPage = this.myPage+1; 
      this.myPage = nowPage;
      console.log("===DLE==="+this.myPage);
    }
  }

    /**
     * 加载更多
     */
  loadMore(){
    var promise = new Promise.resolve();
    promise.then(this.load()).then(this.componentDidMount()).catch((e)=>{
      console.log("===DLE==="+e);
    });
  }

  renderRow(rowData,sectionID,rowID){
    return  <TouchableOpacity style={styles.listitem} onPress={()=>{this.toDetails(rowData,sectionID,rowID)}}> 
          <View>
            <View style={styles.servicetitle}>
              <TouchableOpacity style={styles.servicetitle_left} onPress={()=>this.toUser(rowData.serID)}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image style={styles.servicetitle_left_img} source={rowData.userhead?{uri:rowData.userhead}:require('../../Img/defaultIcon.jpg')}></Image>
                  <View style={{width:screenWidth*0.6,justifyContent:'center',alignItems:'flex-start',marginLeft:5}}>
                    <Text style={styles.username}>{rowData.name}</Text>
                    <Text>{rowData.title}</Text>
                  </View>
                  <Text style={styles.servicetitle_right}>{Tools.getNewsCommentTime(rowData.startTime)}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.imageView} >
              {this.renderCenterImgs(rowData)}
            </View>
            
            <View  style={{width:screenWidth,height:30,borderBottomWidth:1,borderColor:'#e8e8e8'}}>
              <Text style={{fontSize:Size(16),alignSelf:'flex-start',paddingHorizontal:10,}} numberOfLines={1}>{rowData.content}</Text>
            </View>
              <View style={[styles.detailMessage,{height:30}]}>
                <Text style={{fontSize:Size(16),color:'rgb(251,174,19)'}}>[已售{rowData.allNumber}]</Text>
                <Text style={{fontSize:Size(16),color:'rgb(205,97,82)'}}>{rowData.price}</Text>
              </View>

              <View style={styles.detailMessage}>
                  <TouchableOpacity style={styles.operater} onPress={()=>{this.toLike()}}>
                    <Icon name={'md-heart-outline'} size={20} color={'rgb(255,194,114)'} />
                    <Text style={styles.detaile}>{rowData.like}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.operater} onPress={()=>{this.toComment()}}>
                    <Icon name={'ios-chatboxes-outline'} size={20} color={'rgb(90,176,172)'} />
                    <Text style={styles.detaile}>{rowData.comment}</Text>
                  </TouchableOpacity>
                  <View style={styles.operater}>
                    <Icon name={'ios-navigate-outline'} size={20} color={'rgb(175,146,202)'} />
                    <Text style={styles.detaile}>暂无</Text>
                  </View>
              </View>
              <View style={{width:screenWidth,height:10,backgroundColor:'#e8e8e8'}}/>
          </View>
      </TouchableOpacity>
  }

  render() {
    return (
      <View style={styles.main}>
        <Navibar back={()=>{this.goBack()}} titleText={'搜索结果'} leftIconColor={mainColor} titleStyle={styles.titleStyle}/>

          <MyListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            loadMore = {()=>this.loadMore()}
            onRefresh = {()=>this._onRefresh()}
            dataSize={this.state.dataSize}
            count={this.state.count}
            contentContainerStyle={styles.listViewStyle}/>


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
    flexDirection:'row',
    width:screenWidth,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FB503E'
  },
  titleStyle:{
    alignSelf:'flex-start',
    marginLeft:50,
    fontSize:Size(20),
  },
  head_title:{
    width:screenWidth*0.7,
    height:topheight+5,
    borderWidth:1,
    borderColor:'#FFF',
    borderRadius:18,
    alignItems: 'center',
    padding:3,
    backgroundColor:'#FFF'
  },
  center:{
    width:screenWidth,
    flex:1,
    marginTop:10,
  },
  listViewStyle:{
    
  },
  listitem:{
    width:screenWidth,
    height:250,
    justifyContent:'space-between',
    justifyContent: 'center',
    borderBottomWidth:1,
    borderColor:'#e8e8e8',
  },
  servicetitle:{
    flexDirection:'row',
    justifyContent:'center',
    width:screenWidth,
    height:50,  
  },
  servicetitle_left:{
    flexDirection:'row',
    height:50,
    width:screenWidth,
    },
  servicetitle_left_img:{
    width:36,
    height:36,
    borderRadius:18,
    marginLeft:10,
  },
  servicetitle_right:{
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
  },
  username:{
    fontSize:Size(14),
    color:mainColor
  },
  usercontent:{
    fontSize:Size(16),
  },
  centerImg:{
    width:screenWidth/3-40,
    height:80,
    resizeMode:'stretch',
    marginLeft:10,
  },
  imageView:{
    height:90,
    width:screenWidth,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginLeft:10,
  },
  detailMessage:{
    width:screenWidth,
    height:40,
    paddingHorizontal:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderColor:'#e8e8e8',  
  },
  operater:{
    width:screenWidth/3,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderRightWidth:1,
    borderColor:'#e8e8e8',
  },
  detaile:{
    fontSize:Size(16),
    marginLeft:5,
  }
});
