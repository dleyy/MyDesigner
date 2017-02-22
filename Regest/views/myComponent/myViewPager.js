'use strict';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

var ViewPager = require('react-native-viewpager');
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;
var defaultHeight = 120;
var defaultResizeMode=Image.resizeMode.contain


export default class myViewPager extends React.Component {
    constructor(props) {
        super(props);

        // if (props.height) {
        //     defaultHeight = props.height;
        // }
        // if (props.resizeMode) {
        //     defaultResizeMode = props.resizeMode;
        // }
        this.state = {
            dataSource: new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2,
            })
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithPages(nextProps.imgs)
        })
    }
    static propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
        height: React.PropTypes.number,
        autoPlay: React.PropTypes.bool,
        isLoop: React.PropTypes.bool,
        title:React.PropTypes.any,
    };

    componentWillMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithPages(this.props.imgs)
        })
    }
    componentWillUnmount(){
        defaultHeight=120;
        defaultResizeMode=Image.resizeMode.contain
    }

    render() {
        return (
            <ViewPager
                style={[this.props.style,{height:this.props.height?this.props.height:defaultHeight}]}
                dataSource={this.state.dataSource}
                renderPage={this._renderPage.bind(this)}
                currentPage={this.props.currentPage?this.props.currentPage:0}
                isLoop={this.props.isLoop?true:this.props.isLoop}
                indicatorStyle={this.props.indicatorStyle}
                autoPlay={this.props.autoPlay?true:this.props.autoPlay}/>
        );
    }
    _renderPage(data:Object, pageID:number) {
        var viewstyle={height:this.props.height?this.props.height:defaultHeight,width:this.props.width?this.props.width:deviceWidth,}
        return (
            <View style={[styles.page,viewstyle]}>
                <Image
                source={{uri: data&&data.postpicpath?data.postpicpath:data&&data.img?data.img:data?data:null}}
                style={[styles.page,viewstyle,{resizeMode:this.props.resizeMode?this.props.resizeMode:defaultResizeMode}]}/>
                <View style={this.props.titleViewStyle?this.props.titleViewStyle:null}>
                   <Text style={this.props.titleStyle}>{data&&data.title?data.title:null}</Text>  
                </View> 
                <TouchableOpacity onPress={()=>this.clickPage(data)} activeOpacity={0.9} style={[{position:"absolute",top:0,backgroundColor:this.props.corverBg?"rgba(0,0,0,0.3)":"transparent"},styles.page,viewstyle]}/>
            </View> 
            )
    }

    clickPage(item){
        let {navigator, route, param} = this.props;
        if (this.props.clickPage) {
            this.props.clickPage(item)
        } else{
            if (navigator&&item&&item.pageid&&item.newjumpurl) {
                navigator.push({
                    name:item.pageid,
                    param:{
                        url:item.newjumpurl,
                        pagename:"huodong"
                    }
                });
            }
        };
    }
}

var styles = StyleSheet.create({
    page: {
        width: deviceWidth,
        height: defaultHeight

    },
});