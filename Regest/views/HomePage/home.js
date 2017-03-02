
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ListView,
  Image,
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
export default class home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sliderImgs:[],
        dataSource:ds,
        page:1,
      };
    }  

  componentDidMount() {
    var Imgs=[
      'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
      'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
      'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
      'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
      'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
    ]
    this.setState({sliderImgs:Imgs})

    var data=[
      {orderId:1,name:'张三',userhead:DEFAULTIMG,title:'看小孩',startTime:'2017-01-02 13:55:44',
       content:'代看护小孩',price:'20.00/小时',like:10,dislike:3,
       showImages:DEFAULTSHOWS,comment:6,allNumber:14,serID:3,
      },
      {orderId:2,name:'李四',userhead:DEFAULTIMG,title:'买东西',startTime:'2017-02-04 13:55:44',
       content:'代买，所有东西',price:'20.00/次',like:18,dislike:13,
       showImages:DEFAULTSHOWS,comment:46,allNumber:34,serID:4,
      },
      {orderId:3,name:'王五',userhead:DEFAULTIMG,title:'买买买买买',startTime:'2016-09-13 13:55:44',
       content:'代买东西代买东西代买东西代买东西代买东西代买东西代买东西代买东西代买东西代买东西代买东西',price:'20.00/次',like:120,dislike:33,
       showImages:DEFAULTSHOWS,comment:36,allNumber:42,serID:5,
      },
      {orderId:4,name:'赵六',userhead:DEFAULTIMG,title:'修家电',startTime:'2016-06-14 13:55:44',
       content:'所有家电，提前预约',price:'100.00/件',like:100,dislike:31,
       showImages:DEFAULTSHOWS,comment:16,allNumber:17,serID:6,
      },
    ]

    this.setState({dataSource:ds.cloneWithRows(data)});
  }


  renderTopView(){
       return <View style={{width:screenWidth,height:140}}>
              <TopViewPager
                 imgs={this.state.sliderImgs} height={140}
                 isLoop={this.state.sliderImgs.length==1?false:true}
                 autoPlay={true} resizeMode={Image.resizeMode.stretch}
                 corverBg={true} indicatorStyle={{alignItems:'flex-end',right:20,}}
                 clickPage={()=>{this.state.imageClick()}}
                 navigator={this.props.navigator} /> 
             </View>  
  }

  renderCenterImgs(rowData){
    if (rowData.showImages){
      return rowData.showImages.map((item,i)=>{
      return <Image key={i} style={styles.centerImg} source={{uri:item.DEFAULTIMG}}/>
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
    alert("search")
  }

  toLike(){

  }
  toComment(){

  }
  _onRefresh(){
    this.setState({
        page:1
    });
    this.componentDidMount();
  }

    /**
     * 加载更多
     */
  loadMore(){
    if(this.state.dataSize < this.state.count){
        this.setState({
            page:this.state.page+1
        })
        this.componentDidMount();
    }
  }

  renderRow(rowData,sectionID,rowID){
    return <View style={styles.listitem}>
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
  }

  render() {
    return (
      <View style={styles.main}>
      	<View style={styles.head}>
          <TouchableOpacity onPress={()=>this.toSearch()}>
            <Text style={styles.head_title}>搜索你感兴趣的内容</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.toSearch()}>
            <View style={{marginLeft:10}}>
              <Icon name={'md-search'} size={25} color={'#fff'} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <MyListView
            dataSource={this.state.dataSource}
            renderHeader={this.renderTopView.bind(this)}
            renderRow={this.renderRow.bind(this)}
            loadMore = {this.loadMore.bind(this)}
            onRefresh = {this._onRefresh.bind(this)}
            contentContainerStyle={styles.listViewStyle}/>
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
  head:{
    flexDirection:'row',
    width:screenWidth,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FB503E'
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
