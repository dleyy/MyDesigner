import React from 'react';
import {
    StyleSheet,
    Dimensions,
    Image,
    PixelRatio
  } from 'react-native';
var screenWidth = Dimensions.get('window').width;
var pixe=PixelRatio.get()
import {Size} from '../constStr'
var commenStyle = StyleSheet.create({
  backColor:{
    backgroundColor:"#f4f4f4"
  },
  container:{
    flex:1,
    width:screenWidth,
    backgroundColor:"#f4f4f4"
  },
  contentcontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    backgroundColor:"#f4f4f4"
  },
  horizontal:{
    flexDirection:'row'
  },
  scrollview: {
    flex: 1,
    backgroundColor:"#f4f4f4"
  },
  topline:{
    width:screenWidth-40,
    marginLeft:20,
    marginTop:-1,
    height:1,
    backgroundColor:"#fff",
    opacity:0.1,
    },
  line:{
    width:screenWidth-20,
    marginLeft:10,
    marginTop:10,
    marginBottom:3,
    height:1,
    backgroundColor:"#000",
    opacity:0.2,
    },
  welcome:{
    fontSize:Size(24),
  },
  navBar:{
    height:56,
    backgroundColor:'#ff6666',
  },
  navSelected:{
    color:'#ff4444'
  },
  font10:{
    fontSize:Size(10),
  },
  font12:{
    fontSize:Size(12),
  },
  font14:{
    fontSize:Size(14),
  },
  font15:{
    fontSize:Size(15)
  },
  font16:{
    fontSize:Size(16)
  },
  font18:{
    fontSize:Size(18)
  },
  badgeNumber: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    width: Size(16),
    height: Size(16),
    borderRadius: Size(16)/2,
    borderWidth: 0,
    alignItems: 'center',
    borderColor: '#ffffff',
    backgroundColor: '#ff0000',
  },
  badgeText: {
    alignSelf: 'center',
    fontSize: Size(11),
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  searchView:{
    flex:1,
    flexDirection:"row",
    height:30,
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:15,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:"#ccc",
    alignItems:"center",
  },
  searchInput:{
    flex:1,
    paddingHorizontal:0,
    paddingVertical:0,
    backgroundColor:"#fff",
    textAlignVertical:"center",
    fontSize:Size(14)
  },
  newsDetailTitle:{
    marginBottom:10,
    fontSize:Size(20),
    textAlign:'center'
  },
  row:{
    flexDirection:"row",
    alignItems:"center",
    flex:1
  },
  item_space_between_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listFooter: {
    justifyContent: 'center', 
    alignItems: 'center',
    width:screenWidth,
    padding:5,
    marginBottom:5
  },
  flexwrap:{
    flexWrap:"wrap"
  },
  alww_icon:{
    width:16,
    height:17,
    resizeMode:Image.resizeMode.contain,
  },

  baseSubmitBtn:{
      marginTop:10,
      marginBottom:10,
      backgroundColor:'#58a0ff',
      borderColor:'#58a0ff',
      width:screenWidth-70,
      height:45,
      borderRadius:5,
      justifyContent: 'center',
      alignItems: 'center',   
      alignSelf:'center', 
  },
  //按钮基本样式
  baseButton:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#58a0ff",
      borderRadius:5,
      height:45,
      alignSelf:'center', 
    },
  //文字基本样式
  baseText:{
      color:"#fff",
      fontSize:Size(16),
      margin:5,
    },
  // container
  inputContainer:{
    width:screenWidth, 
    height:49, 
    flexDirection:'row', 
    paddingTop:10
  },
  inputView:{
    borderColor:'#E8E8E8', 
    borderBottomWidth:1, 
    flex:1, 
    marginLeft:13, 
    flexDirection:'row', 
    alignItems:'center'
  },
  inputViewNoLine:{
    borderColor:'#E8E8E8', 
    flex:1, 
    marginLeft:10, 
    flexDirection:'row', 
    alignItems:'center'
  },
  // 输入框
  textInput:{
    flex:1, 
    fontSize:Size(16), 
    paddingBottom:0,
  },
  inputTitleView:{
      justifyContent:'center', 
      alignItems:'center',
      marginLeft:10
  },
});

module.exports = commenStyle;