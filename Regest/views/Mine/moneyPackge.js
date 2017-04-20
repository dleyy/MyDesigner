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
import Tools from '../tools';
import Spinner from 'react-native-loading-spinner-overlay';

export default class moneyPackge extends Component {
  constructor(props) {
    super(props);
    this.getMoneyUrl="http://www.freeexplorer.top/leige/public/index.php/index/users/getaccountmoney";
    this.addMoneyUrl="http://www.freeexplorer.top/leige/public/index.php/index/users/addaccountmoney";
    this.state = {
    	money:20,
      loading:false,
      loadingText:'充值中...',
    };
  }

  addMoney(){
      this.setState({
        loading:true,
      })
      Tools.getStorage('phonenum',(ret)=>{
          var postData={
            "phonenum":ret,
            'num':100,
          }
          Tools.postNotBase64(this.addMoneyUrl,postData,(ret)=>{
                ToastAndroid.show("充值100成功",2000);
                this.setState({
                  loading:false,
                })
          },(err)=>{
              this.setState({
                  loading:false,
                })
            ToastAndroid.show(JSON.stringify(err),2000);
          })
      });
  }

  componentDidMount() {
      Tools.getStorage('phonenum',(ret)=>{
          var postData={
            "phonenum":ret,
          }
          Tools.postNotBase64(this.getMoneyUrl,postData,(ret)=>{
                this.setState({
                  money:ret.money
                })
          },(err)=>{
            ToastAndroid.show(JSON.stringify(err),2000);
          })
      });
  }

  render() {
    return (
      <View style={styles.main}>
      		<View style={styles.title}>
      			<View style={{height:navheight,flexDirection:'row',justifyContent: 'center',alignItems: 'center',width:80}}>
      				<TouchableOpacity style={styles.titleIcon} onPress={()=>{this.back()}}>
      					<Icon name={'ios-arrow-dropleft-outline'} color={'#CD2626'} size={30}/>
      				</TouchableOpacity>

      				<TouchableOpacity style={styles.titleIcon} onPress={()=>{this.back()}}>
      					<Icon name={'ios-close-circle-outline'} color={'#CD2626'} size={30}/>
      				</TouchableOpacity>
      			</View>
      			<View style={{flex:1}}>
      				<Text style={styles.titleText}>钱包</Text>
      			</View>
      		</View> 

      		<View style={{flex:1}}>
      			<View style={{marginTop:10,flexDirection:'row',marginLeft:10,width:screenWidth,height:40,alignItems: 'center',}}>
      				<Text style={{fontSize:Size(18)}}>当前账户余额:</Text>
      				<Text style={{fontSize:Size(18),color:'#f00'}}>￥{this.state.money}</Text>
      			</View>

      			<View style={{width:screenWidth,marginTop:120,justifyContent: 'center',alignItems: 'center',}}>
      				<Button
      					contentText={'充值'}
	            			Click={()=>this.addMoney()}
	            			bgcolor={'#EE3B3B'}/>
	            	</View>
            <Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />
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
		color:'#CD2626'
	},
});


