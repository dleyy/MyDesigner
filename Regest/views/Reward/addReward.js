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
import Spinner from 'react-native-loading-spinner-overlay';
import AMapLocation from 'react-native-amap-location';

export default  class addReward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      description:'',
      serviceType:'选择服务类型',
      location:''
    }
    this.location="成都市郫都区学府街"
    this.postUrl="http://www.freeexplorer.top/leige/public/index.php/index/index/addservice";
    this.userImags=[];
    this.postUserImages=[];
    this.unlisten=null;
  }

  componentDidMount() {
      this.setState({
        loading:true,
        loadingText:'定位中..'
      })
      this.unlisten = AMapLocation.addEventListener((data) =>{
          this.setState({
            loading:false,
            location:this.location
          })
          AMapLocation.stopLocation();
      });
      AMapLocation.startLocation({
          accuracy: 'HighAccuracy',
          killProcess: true,
          needDetail: true,
      });
  }
 
componentWillUnmount() {
      AMapLocation.stopLocation();

}

  back(){
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.pop();

    };
  }

  renderImageAdd(){
      return  <View style={styles.images}>
              {this.renderImages()}
            <TouchableOpacity style={styles.addImageView} onPress={()=>{this.addImage()}}>
            <Icon size={40} style={{marginLeft:5}} name={'ios-add-circle-outline'}/>
            </TouchableOpacity>
      </View>
  }


  addImage(){
    Tools.chooseImg((msg,baseUrl)=>{
      this.userImags.push({
          uri:msg.uri,
      })
      this.postUserImages.push(baseUrl.uri)
      this.setState({title:this.state.title})
    },()=>{

    });
  }

  toSevice(){
    let navigator = this.props.navigator;
  if (navigator) {
            navigator.push({
              name:'UDS',
              param:{
                title:'用户服务协议'
              }
            })
          }
  }

  toRule(){
    let navigator = this.props.navigator;
  if (navigator) {
            navigator.push({
              name:'UDS',
              param:{
                title:'服务者管理规则'
              }
            })
          }
  }

  imgSplice(i){
    this.userImags.splice(i,1);
    this.postUserImages.splice(i,1);
    this.setState({title:this.state.title})
  }

  publish(){
    if (!this.state.title){
        ToastAndroid.show('请输入标题',2000)
    }else      if (!this.state.description){
        ToastAndroid.show('请输入服务描述',2000)
    }else     if (this.state.serviceType=='选择服务类型'){
        ToastAndroid.show('请选择服务类型',2000)
    }else if(!Tools.isDataValid(this.userImags)){
        ToastAndroid.show("请上传图片描述",2000)
    }else     if (!this.state.location){
        ToastAndroid.show('请输入服务地点',2000)
    }else     if (!this.state.price){
        ToastAndroid.show('请输入价格',2000)
    }else     if (!this.state.unit){
        ToastAndroid.show('请输入单位',2000)
    }else {
      this.setState({loading:true,loadingText:'上传中...'})
      Tools.getStorage('phonenum',(ret)=>{
        var postData={
          'title':this.state.title,
          'description':this.state.description,
          'images':this.postUserImages,
          'serviceType':this.state.serviceType,
          'location':this.state.location,
          'price':this.state.price+'元',
          'unit':this.state.unit,
          'phoneNum':ret,
         }
      Tools.postNotBase64(this.postUrl,postData,(ret)=>{
        ToastAndroid.show('服务发布成功',2000);
        this.setState({
          title:'',
          description:'',
          images:'',
          location:"",
          price:'',
          unit:'',
          loading:false,
        })
      },(err)=>{
        this.setState({loading:false,loadingText:'上传中...'})
        ToastAndroid.show(JSON.stringify(err),2000);
      })

      })
    }
  }


  changeServiceType(){
    let navigator = this.props.navigator;
    if (navigator) {
        navigator.push({
            name:'SelectServiceType', 
            param:{
              getType:(type)=>{this.setState({serviceType:type})},
              nowType:this.state.serviceType,
            } 
        });
    };
  }

  renderImages(){
    if (Tools.isDataValid(this.userImags)) {
              return this.userImags.map((item,i)=>{
                  return  <TouchableOpacity key={i} style={styles.addImageView} onPress={()=>this.imgSplice(i)} > 
                                   <Image style={styles.image} source={item} resizeMode={'stretch'}/>
                              </TouchableOpacity>
              })
      }else{
        return null;
      }
  }

  render() {
    return (
      <View  style={styles.content}>
          <NavBar 
             back={()=>{this.back()}}
             titleStyle={styles.titleStyle}
             titleText={'发布服务'}/>
          <ScrollView>
              <TextInput 
                    style={{height: 40}}
                    maxLength={11}
                    placeholder={'标题'}
                    placeholderTextColor={'#c4c4c4'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(title) => this.setState({title:title})}
                    value={this.state.title}/>
              <View style={{width:screenWidth,height:1,backgroundColor:mainColor}}/>
              <TextInput 
                    style={{height: 120}}
                    placeholder={'编辑服务描述'}
                    multiline={true}
                    placeholderTextColor={'#c4c4c4'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(description) => this.setState({description:description})}
                    value={this.state.description}/>
              <View style={{width:screenWidth,height:1,backgroundColor:mainColor}}/>
              <Text style={{fontSize:Size(18),marginLeft:5,}}>添加图片:</Text>
              {this.renderImageAdd()}
              <View style={{width:screenWidth,height:10,backgroundColor:'#e8e8e8'}}/>
              <TouchableOpacity style={{width:screenWidth,height:40,justifyContent: 'center',marginLeft:10}} onPress={()=>this.changeServiceType()}>
                    <Text>{this.state.serviceType}</Text>
              </TouchableOpacity>
              <View style={{width:screenWidth,height:1,backgroundColor:mainColor}}/>             
              <TextInput 
                    style={{height: 40}}
                    maxLength={11}
                    placeholder={'输入服务地点(如:成都市金牛区)'}
                    placeholderTextColor={'#c4c4c4'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(location) => this.setState({location:location})}
                    value={this.state.location}/>
              <View style={{width:screenWidth,height:1,backgroundColor:mainColor}}/>
              <TextInput 
                    style={{height: 40}}
                    maxLength={11}
                    placeholder={'输入服务价格(元)'}
                    placeholderTextColor={'#c4c4c4'}
                    underlineColorAndroid={'transparent'}
                    keyboardType={'numeric'}
                    onChangeText={(price) => this.setState({price:price})}
                    value={this.state.price}/>
              <View style={{width:screenWidth,height:1,backgroundColor:mainColor}}/>             
              <TextInput 
                    style={{height: 40}}
                    maxLength={11}
                    placeholder={'单位(/天/小时)'}
                    placeholderTextColor={'#c4c4c4'}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(unit) => this.setState({unit:unit})}
                    value={this.state.unit}/>
              <View style={{width:screenWidth,height:1,backgroundColor:mainColor}}/>
          
          <View style={{flexDirection:'row',justifyContent: 'center',marginTop:5}}>
            <Text style={{fontSize:Size(14),marginLeft:10}}>发布服务即代表同意{appName}的</Text>
            <TouchableOpacity onPress={()=>this.toSevice()} >
              <Text style={[styles.noticeText,{fontSize:Size(14),margin:0}]}>《用户服务协议》</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row',justifyContent: 'center',marginTop:5}}>
            <Text style={{fontSize:Size(14),marginLeft:10}}>发布前请阅读</Text>
            <TouchableOpacity onPress={()=>this.toRule()} >
              <Text style={[styles.noticeText,{fontSize:Size(14),margin:0}]}>《服务者管理规则》</Text>
            </TouchableOpacity>
          </View>

          <View style={{justifyContent: 'center',alignItems: 'center',marginTop:20}}>
          <Button 
            contentText={'发布'}
            Click={()=>this.publish()}
            bgcolor={'#EE3B3B'}/>
            <Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />
        </View>                    
          </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  content:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle:{
    alignSelf:'flex-start',
    color:mainColor,
    fontSize:Size(20),
    marginLeft:50,
  },
  images:{
    width:screenWidth,
    flexWrap:'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection:'row',
  },
  image:{
    width:screenWidth/3-30,
    height:screenWidth/3-30,
  },
  addImageView:{
    width:screenWidth/3-30,
    borderWidth:1,
    borderColor:mainColor,
    height:screenWidth/3-30,
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeText:{
    color:mainColor,
    fontSize:Size(18),
    margin:5,
  },
    foot:{
        justifyContent:'flex-start',
        alignItems:'center',
    },
});
