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
  ScrollView,
} from 'react-native';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import {navheight,screenWidth,screenHeight,MainTabHeight,Size,PhImages,mainColor} from '../constStr';
import Tools from '../tools';
export default class userDescription extends Component {
    	constructor(props) {
  	  super(props);
  	
  	  this.state = {};
  	}

  	back(){
  		let navigator = this.props.navigator;
  		if (navigator) {
  			navigator.pop();  		
  		};
  	}

  render() {
    return (
      <View style={styles.container}>
          	<View style={styles.title1}>
    			<View style={{height:navheight,flexDirection:'row',justifyContent: 'center',alignItems: 'center',width:80}}>
    				<TouchableOpacity style={styles.titleIcon} onPress={()=>{this.back()}}>
    					<Icon name={'ios-arrow-dropleft-outline'} color={'#CD2626'} size={30}/>
    				</TouchableOpacity>

    				<TouchableOpacity style={styles.titleIcon} onPress={()=>{this.back()}}>
    					<Icon name={'ios-close-circle-outline'} color={'#CD2626'} size={30}/>
    				</TouchableOpacity>
    			</View>
    			<View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
      				<Text style={styles.title}>{this.props.param.title?this.props.param.title:'默认说明'}</Text>
    			</View>
    		</View>
      		
      		<ScrollView>
	      		<View style={{flex:1}}>
	      			<Text style={styles.textContent}>1.本软件是一个免费的服务平台，致力于提供服务给广大需要帮助的人群</Text>
	      			<Text style={styles.textContent}>2.所产生的利益纠纷与本软件无关</Text>
	      			<Text style={styles.textContent}>3.由于本软件只提供渠道，只能保证用户信息的准确性</Text>
	      			<Text style={styles.textContent}>4.所提供的服务不能包含非法内容，也不能违反国家的法律</Text>
	      			<Text style={styles.textContent}>5.最终解释权归本软件所有</Text>
	      		</View>
	      	</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: 'center',
	},
	title:{
		fontSize:Size(20),
		alignItems: 'center',
		marginLeft:-60,
		color:'#000'
	},
	title1:{
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
	textContent:{
		fontSize:Size(16),
		marginLeft:10,
		marginRight:10,
		color:'#000',
		marginTop:20,
	}

});


