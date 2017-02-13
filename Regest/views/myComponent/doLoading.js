/**
 * React Native News App
 * https://github.com/tabalt/ReactNativeNews
 */
import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Dimensions,
} from 'react-native';
import commenStyle from '../styles/basestyle'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {Size} from '../constStr'
var pixe=PixelRatio.get()
var  screenHeight=Dimensions.get('window').height;
export default class doLoading extends Component{
    renderLoadin(loadingContent,renderNav,otherContent,style){
        if(!renderNav){
            renderNav=null
        }
        if(!otherContent){
            otherContent=null;
        }
        return(
            <View style={commenStyle.container}>
                {renderNav}
                <View style={[styles.contentcontainer,style]}>
                    {loadingContent}
                </View>
                {otherContent}
            </View>
        )
    }
    noDataView(renderNav,text,otherContent,style){
        text=text?text:"暂无数据..."
        return this.renderLoading(<View style={{flex:1,marginTop:10}}>
                <Text style={styles.text}>{text}</Text>
            </View>,renderNav,otherContent,style)
    }
    noDataCenterView(renderNav,text,otherContent,style){
        text=text?text:"暂无数据..."
        return this.renderLoading(<Text style={styles.text}>{text}</Text>,renderNav,otherContent,style)
    }
    loadingView(renderNav,otherContent,style){
        return this.renderLoading(<View><Bars color="#ff7836"/><Text style={styles.text}>加载中...</Text></View>,renderNav,otherContent,style)
    }
    /**
    *只显示加载图标和内容，不显示头部和其他内容
    */
    loadingContent(style){
        return(
            <View style={[styles.contentcontainer,style]}>
                <Bars color="#ff7836"/>
                <Text style={styles.text}>加载中...</Text>
            </View>   
        )
    }
    /**
    *只显示提示，不显示头部和其他内容
    */
    noDataContent(text,style){
        text=text?text:"暂无数据..."
        return(
            <View style={[styles.contentcontainer,style]}>
                <Text style={styles.text}>{text}</Text>
            </View>   
        )
    }
}
var styles = StyleSheet.create({
    text:{
        textAlign:"center",
        fontSize:Size(14)
    }, 
    contentcontainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 0,
        backgroundColor:"#f4f4f4",
        justifyContent:"center"
      },
})


