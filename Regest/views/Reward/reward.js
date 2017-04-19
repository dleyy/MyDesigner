
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
import Tools from '../tools';

export default class reward extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      nowType:'发布的任务',
      showType:false,
    };
  }

  selectType(){
    this.setState({
      showType:!this.state.showType,
    })
  }
  componentDidMount() {
    
  }
  
  preparation(){

  }
  addTask(){
    let navigator = this.props.navigator;
    if (navigator) {
      navigator.push({
        name:'AddService',
      })
    };
  }
  renderSelectType(){
            if (!this.state.showType) {
          return null;
        }else{
        return  <View style={styles.typeChange}>
                      <TouchableOpacity onPress={()=>{this.setState({nowType:'发布的任务',showType:false})}} style={styles.head_left}>
                          <Text style={styles.head_left_text}>发布的任务</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{this.setState({nowType:'接受的任务',showType:false})}} style={styles.head_left}>
                          <Text style={styles.head_left_text}>接受的任务</Text>
                      </TouchableOpacity>
                    </View>
    }
  }


  render() {
    return (
      <View style={styles.main}>
        <View style={styles.head}>
          <TouchableOpacity onPress={()=>this.selectType()} style={styles.head_left}>
            <Text style={styles.head_left_text}>{this.state.nowType}</Text>
            <Icon name={this.state.showType?'ios-arrow-dropdown-outline':'ios-arrow-dropup-outline'} size={18} color={secondColor} />
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
          {this.renderSelectType()}
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
  },
  typeChange:{
    width:110,
    height:110,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top:50,
    backgroundColor:'#e8e8e8',
    left:20,
  }
});
