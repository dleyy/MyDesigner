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

import FirstPage from '../splash/firstPage';
import Regest from '../user/regest';
import Login from '../user/login';
import FindPassword from '../user/findPassword';
import reSetPassword from '../user/reseetingPassword';
import Home from './mainActivity';
import SysSetting from '../Mine/sysSetting';
import ServiceDetaile from '../HomePage/serviceDetaile';
import Search from '../HomePage/search';
import SearchDetail from '../HomePage/searchDetail';
import UserSetting from '../Mine/userSeeting';

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
