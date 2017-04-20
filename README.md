# MyDesigner

1、添加图标库
npm install react-native-vector-icons --save
npm install rnpm -g
rnpm link

图标查找:http://ionicframework.com/docs/v2/ionicons/


2、添加底部tabView
npm install react-native-tab-navigator --save






3、loading
import Spinner from 'react-native-loading-spinner-overlay';

<Spinner visible={this.state.loading} textContent={this.state.loadingText} textStyle={{color: '#FFF'}} />



4、post
	  
	  this.setState({
		loading:true,
	  })
      Tools.getStorage('phonenum',(ret)=>{
          var postData={
            "phonenum":ret,
          }
          Tools.postNotBase64(this.getMoneyUrl,postData,(ret)=>{
			ToastAndroid.show("",2000);
			this.setState({
				loading:false,
			})
          },(err)=>{
            ToastAndroid.show(JSON.stringify(err),2000);
			this.setState({
                loading:false,
              })
          })
      });
	  

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

