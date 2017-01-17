
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Navibar from '../myComponent/Navibar.js';
import Button from '../myComponent/Button.js';
import {secondColor,mainColor,appName,Size,navheight,screenWidth,screenHeight} from '../constStr';
import Icon from '../../node_modules/react-native-vector-icons/Ionicons';

export default class reward extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  selectType(){

  }
  preparation(){

  }
  addTask(){

  }


  render() {
    return (
      <View style={styles.main}>
        <View style={styles.head}>
          <TouchableOpacity onPress={()=>this.selectType()} style={styles.head_left}>
            <Text style={styles.head_left_text}>发布的任务</Text>
            <Icon name={'ios-arrow-dropdown-outline'} size={18} color={secondColor} />
          </TouchableOpacity>

          <View style={styles.head_right}>
            <TouchableOpacity onPress={()=>this.preparation()} style={styles.icon} >
              <Icon name={'ios-search-outline'} size={25} color={mainColor}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.addTask()} style={styles.icon} >
              <Icon name={'ios-add-outline'} size={32} color={mainColor}/>
            </TouchableOpacity>
          </View>
        
        </View>

        <View style={{flex:1}}>
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
    width:screenWidth,
    height:50,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth:1,
    borderBottomColor:mainColor,
  },
  head_left:{
    height:50,
    width:150,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head_left_text:{
    color:secondColor,
    fontSize:Size(20),
    marginRight:4,
  },
  head_right:{
    height:50,
    width:100,
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:10,
    alignItems:'center',
  },
  icon:{
    height:50,
    justifyContent: 'center',
  }
});
