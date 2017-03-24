import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import NavBar from '../myComponent/Navibar';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';
import ImagePicker from '../../node_modules/react-native-image-picker';
import {mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Button from '../myComponent/Button.js';

export default class userSeeting extends Component {
	constructor(props) {
	   super(props);
		
		this.defaultUserIcon="https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024";	
	   this.state = {
	   	userHeard:'',
	   	nickName:'dleyy'
	   };
	}

	back(){
		let navigator = this.props.navigator;
		if (navigator){
			navigator.pop();
		}
	}

	changeUserHeard(){
		var options = {
	   title:'上传',
	   customButtons: [
	     {name:'cm',title:'Choose Photo from Carmaral'},
	     {name:'fb',title:'Choose Photo from Carmaral'},
	   ],
	   storageOptions: {
	     skipBackup: true,
	     path: 'images'
	    }
	   };

	   ImagePicker.showImagePicker(options, (response) => {
	   console.log('Response = ', response);

	   if (response.didCancel) {
	     console.log('User cancelled image picker');
	   }
	   else if (response.error) {
	     console.log('ImagePicker Error: ', response.error);
	   }
	   else if (response.customButton) {
	     console.log('User tapped custom button: ', response.customButton);
	   }
	   else {
	     let source = { uri: response.uri };

	     // You can also display the image using data:
	     // let source = { uri: 'data:image/jpeg;base64,' + response.data };

	     this.setState({
	      avatarSource: source
	     });
	   }
	});
}

	inSure:{

	}

   render() {
    	return (
      	<View style={styles.container}>
      		<NavBar 
      			back={()=>{this.back()}}
      			titleStyle={styles.titleStyle}
    				titleText={'个人信息'}/>
    			<View style={{flex:1,justifyContent: 'center',}}>
	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>头像</Text>
	    				<TouchableOpacity onPress={()=>{this.changeUserHeard()}} style={{flex:1}} >
	    					<View style={styles.itemClick}>
	    						<Image style={styles.userPic} source={this.state.avatarSource}/>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>昵称</Text>
	    				<TouchableOpacity onPress={()=>{this.changeUserHeard()}} style={{flex:1}}>
	    					<View style={styles.itemClick}>
	    						<Text style={{marginRight:10}}>{this.state.nickName}</Text>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    			<View style={styles.infoView}>
	    				<Text style={styles.userIcon}>密码修改</Text>
	    				<TouchableOpacity onPress={()=>{this.changeUserHeard()}} style={{flex:1}}>
	    					<View style={styles.itemClick}>
	    						<Icon name='ios-arrow-forward-outline' size={20} color={mainColor} />
	    					</View>
	    				</TouchableOpacity>
	    			</View>

	    		</View>
      			
      	</View>
    	);
  	}
}

const styles = StyleSheet.create({
	container:{
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
	infoView:{
		width:screenWidth,
		height:60,
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'#888',
	},
	userIcon:{
		alignSelf:'center',
		marginLeft:20,
		width:80,
	},
	itemClick:{
		flex:1,
		marginRight:20,
		flexDirection:'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	userPic:{
		width:50,
		height:50,
		borderRadius:25,
		borderWidth:0.5,
		marginRight:15,
	},
	footStyle:{
		width:screenWidth,
		height:80,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
