'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,} from 'react-native';

import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
export default class AlertDialog extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	title:this.props.title?this.props.title:'请输入',
	  	text:'',
	  	fadeAnim: new Animated.Value(1), // init opacity 0
	  };
	}

  render() {
    return (
      <View style={styles.content}>
      		<Animated.View style={[styles.dialog,{opacity: this.state.fadeAnim,transform: [{
				       translateY: this.state.fadeAnim.interpolate({
				       inputRange: [0, 1],
				       outputRange: [0, -50]
				     }),
				   }]
		 }]}>
      			<Text style={styles.noticeText}>{this.state.title}</Text>
      			<View style={{width:screenWidth-50,height:40,marginTop:10,marginBottom:10,borderWidth:1,borderColor:'#6495ED'}}>
	    			<TextInput
	    				style={styles.inputeText}
	    				maxLength={this.props.length?this.props.length:15}
	    				autoFocus={true}
		    			underlineColorAndroid={'transparent'}
					onChangeText={(text) => this.setState({text:text})}
					value={this.state.text}/>
			</View>
			<View style={{width:screenWidth-40,height:40,flexDirection:'row',justifyContent: 'space-around'}}>
				<TouchableOpacity style={styles.btn}  onPress={()=>{this.props.changeText(this.state.text)}}>
					<Text style={styles.btnText}>确定</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={()=>{this.props.cancle()}}>
					<Text style={styles.btnText}>取消</Text>
				</TouchableOpacity>
			</View>
      		</Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	content:{
		width:screenWidth,
		height:screenHeight,
		justifyContent: 'center',
		alignItems: 'center',
		position:'absolute',
   		backgroundColor:"#383838",
   		opacity:0.84,
	},
	dialog:{
		width:screenWidth-40,
		height:screenHeight/3-20,
		borderWidth:1,
		borderColor:'#888',
		borderRadius:4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'#fff',
	},
	btn:{
		width:60,
		height:36,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'#6495ED',
		borderRadius:10,

	},
	inputeText:{
		width:screenWidth-40,
	},
	noticeText:{
		fontSize:Size(19),
		color:'#000',
		marginBottom:10,
	},
	btnText:{
		fontSize:Size(16),
		color:'#fff'
	}


});


