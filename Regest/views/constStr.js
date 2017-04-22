/**
 * 定义全局变量,常量
 */
import React from 'react';
import {
    Platform,
    Dimensions,
    PixelRatio
} from 'react-native';
var  navheight=(Platform.OS === 'android') ? 45 : 60;
var  screenWidth=Dimensions.get('window').width;
var  screenHeight=Dimensions.get('window').height;
var pixe=PixelRatio.get()
var MainTabHeight =48;
var navbackground="#353232";
var lineColor="#ededed";
var appName="到位";
var mainColor="#32B165";
// var mainColor="#FB503E";
var secondColor='rgb(96,108,121)';
var topheight=(Platform.OS ==='android')?22:30;

String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}
//保存当前的route名字
var push={
	routeName:"tabmain",
	typelabel:""
}
var phRoute={
	route:{name: 'tabmain', param: {index: 0, topIndex: 0}},
	navigat:[{name: 'tabmain', param: {index: 0, topIndex: 0}}],
	isRestore:false
}
var Size=function(font){
	if(pixe<=2){
		return font;
	}else{
		return parseInt(font-(pixe-2)*2);
	}
}
// const isDebug=false;
// if(!isDebug){
// 	console.log=function(text){}
// }

const PhImages={
}
module.exports ={topheight,mainColor,appName,phRoute,PhImages,Size,push,navheight,screenWidth,screenHeight,MainTabHeight,navbackground,lineColor,console}
