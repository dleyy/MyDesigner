/**
 * 配置路由
 */
import React,{Component} from 'react';
import {
    Navigator,
    BackAndroid,
    View,
    Platform,
    StatusBar,
    Animated,
    Keyboard,
    AppRegistry,
    ToastAndroid,
} from 'react-native';

//闪屏页。首页
import FirstPage from '../splash/firstPage';
//注册
import Regest from '../user/regest';
//登录
import Login from '../user/login';
//找回密码（输入手机号码）
import FindPassword from '../user/findPassword';
//重置密码
import reSetPassword from '../user/reseetingPassword';
//主页
import Home from './mainActivity';
//系统设置
import SysSetting from '../Mine/sysSetting';
//服务详情
import ServiceDetaile from '../HomePage/serviceDetaile';
//搜索
import Search from '../HomePage/search';
//搜索详情
import SearchDetail from '../HomePage/searchDetail';
//个人设置
import UserSetting from '../Mine/userSeeting';
//添加服务
import AddService from '../Reward/addReward';
//选择服务类型
import SelectServiceType from '../Reward/SelectType';
//下单
import PlaceOrder from '../HomePage/placeOrder';
//收藏
import Collection from '../Mine/collection';
//实名认证
import Identify from '../Mine/identify';
//我的钱包
import MoneyPackge from '../Mine/moneyPackge';
//我的技能
import SkillManager from '../Mine/skillManager';
//添加技能
import AddSkill from '../Mine/addSkill';
//发布和接受的任务的服务详情
import Cancle from '../Reward/cancle.js';
//完成服务
import Complete from '../Reward/complete.js';
//任务完成
import TaskComplete from '../Reward/CompleteService.js';
//用户列表
import UserList from '../Message/userInfo.js';
//订单详情
import orderDetail from '../Message/infoDetail.js';

var _navigator;
export default class mainIndex extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            keyboardSpace:new Animated.Value(0),
            initialRoute:{name:'FirstPage'},
        }
    }
    renderMySence(route, navigator){
    	var Component = FirstPage;
        _navigator = navigator;
        switch(route.name){
    	case 'FirstPage':
                Component=FirstPage;
                break;
            case 'Regest':
                Component=Regest;
                break;
            case 'Login':
                Component=Login;
                break;
            case 'AddSkill':
                Component=AddSkill;
                break;
            case 'Identify':
                Component=Identify;
                break;
            case 'TaskComplete':
                Component=TaskComplete;
                break;
            case 'Complete':
                Component=Complete;
                break;
            case 'SkillManager':
                Component=SkillManager;
                break;
            case 'orderDetail':
                Component=orderDetail;
                break;
            case 'Cancle':
                Component=Cancle;
                break;
            case 'UserList':
                Component=UserList;
                break;
            case 'MoneyPackge':
                Component=MoneyPackge;
                break;
            case 'Collection':
                Component=Collection;
                break;
            case 'PlaceOrder':
                Component = PlaceOrder;
                break;
            case 'FindPassword':
                Component=FindPassword;
                break;
            case 'reSetPassword':
                Component=reSetPassword;
                break;
            case 'SysSetting':
                Component=SysSetting;
                break;
            case 'Home':
                Component=Home;
                break;
            case 'ServiceDetaile':
                Component=ServiceDetaile;
                break;
            case 'Search':
                Component=Search;
                break;
            case 'SearchDetail':
                Component=SearchDetail;
                break;
            case 'UserSetting':
                Component=UserSetting;
                break;
            case 'SelectServiceType':
                Component=SelectServiceType;
                break;
            case 'AddService':
                Component=AddService;
                break;
            default:
                Component=FirstPage;
                break;
    	}
    return <Component route={route} navigator={navigator} param={route.param} />
    }
 
 // configureScene(route, routeStack){
 //    if (route.type == 'Bottom') {
 //      return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
 //    }
 //    return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
 //  }

    configureScene(route) {
        //FloatFromRight FadeAndroid
        //if(Platform.OS === 'android'){
            return Object.assign({},Navigator.SceneConfigs.HorizontalSwipeJump,{
                      gestures:{
                        jumpBack:null,
                        jumpForward:null
                      }
                    });
        return Navigator.SceneConfigs.FloatFromRight;
    }
    componentDidMount(){
        var i=0;
        BackAndroid.addEventListener('hardwareBackPress',()=>{
         if (_navigator&&_navigator.getCurrentRoutes()&&_navigator.getCurrentRoutes().length>1) { 
           _navigator.pop();
           return true;
         }else{
            if(i==0){
                i++;
                ToastAndroid.show("再按一次退出",ToastAndroid.SHORT);
                this.timer = setTimeout(() => {i=0;},2000);
                return true;
            }
            return false;
         }
        });
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress');
    }

    
    render() {
            return (
                <View style={{flex:1}}>
                <Navigator
                    key="1"
                    style={{flex:1,flexDirection:'column'}}   
                    initialRoute={this.state.initialRoute}             
                    configureScene={this.configureScene}
                    renderScene={this.renderMySence}/>
                    <StatusBar backgroundColor={"#000"} barStyle="light-content" hidden={false}/>
                    <Animated.View style={{paddingBottom:this.state.keyboardSpace}}/>
                </View>
            )
    }
}

AppRegistry.registerComponent('Regest', () => mainIndex);
