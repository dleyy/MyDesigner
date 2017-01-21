package com.regest;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.telecom.Call;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.regest.Moudle.User;

import java.util.List;
import java.util.Map;

import cn.bmob.v3.Bmob;
import cn.bmob.v3.BmobQuery;
import cn.bmob.v3.exception.BmobException;
import cn.bmob.v3.listener.FindListener;
import cn.bmob.v3.listener.SaveListener;
import cn.smssdk.EventHandler;
import cn.smssdk.OnSendMessageHandler;
import cn.smssdk.SMSSDK;

/**
 * Created by dleyy on 2017/1/19.
 */

public class HttpMoudle extends ReactContextBaseJavaModule implements ActivityEventListener,LifecycleEventListener{

    private static Callback mcallback;

    public HttpMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        Bmob.initialize(reactContext, "ad3dec8d6a119776a9467485425a8e92");
        //SMSSDK.initSDK(getReactApplicationContext(),"1af4f2ab64f47","5fde4e6949cf21487c918f62734c3f9c");
    }

    @Override
    public String getName() {
        return "HttpMoudle";

    }

    /**
     * 登录接口
     * @param phoneNumber   电话号码
     * @param cal           回调函数
     */
    @ReactMethod
    public void Login(String phoneNumber, final Callback cal){
        BmobQuery<User> user = new BmobQuery<>();
        user.addWhereEqualTo("phoneNum",phoneNumber);
        user.setLimit(1);
        user.findObjects(new FindListener<User>() {
            @Override
            public void done(List<User> list, BmobException e) {
                if (e==null){
                    if(list.isEmpty()){
                        mcallback.invoke("success","","");
                    }else {
                        for (User user : list) {
                            mcallback.invoke("success",
                                    user.getObjectId(),user.getPassword(), user.getNickName(),
                                    user.getQualification(),user.getCid(),user.getCidimage(),
                                    user.getCredit());
                        }
                    }
                }else{
                    mcallback.invoke("default",e.getMessage(),"");
                }
            }
        });
        mcallback = cal;
    }


    /**
     * 验证验证码接口;
     * @param map
     * @param cal
     */
    @ReactMethod
    public void identifyCode(ReadableMap map, final Callback cal){
        SMSSDK.submitVerificationCode("86",map.getString("phoneNumber"),map.getString("code"));
        EventHandler eventHandler = new EventHandler(){
            @Override
            public void afterEvent(int i, int i1, Object o) {
                super.afterEvent(i, i1, o);
                if (i1==SMSSDK.RESULT_COMPLETE){
                    cal.invoke(6);
                }else{
                    cal.invoke("error");
                }
            }
        };
        SMSSDK.registerEventHandler(eventHandler);
        mcallback=cal;
    }


    /**
     *注册。。。
     * @param user  用户信息
     * @param cal   回调接口
     */
    public void insertInToServices(User user,Callback cal){
        user.save(new SaveListener<String>() {
            @Override
            public void done(String s, BmobException e) {
                mcallback.invoke(s);
            }
        });
        mcallback = cal;
    }
    /**
     *注册接口；
     * @param map       昵称+手机号+密码+验证码
     * @param cal       回调函数
     */
    @ReactMethod
    public void Regest(ReadableMap map, Callback cal){
        User user = new User();
        user.setCid("");
        user.setCredit(0);
        user.setQualification(false);
        user.setCidimage("");
        user.setNickName(map.getString("name"));
        user.setPhoneNum(map.getString("phoneNumber"));
        user.setPassword(map.getString("password"));
        insertInToServices(user,cal);
    }

    /**
     * 发送短信验证码接口；
     * @param phoneNumber
     * @param cal
     */
    @ReactMethod
    public void getSMSMessage(String phoneNumber, final Callback cal){
        SMSSDK.initSDK(getReactApplicationContext(),"1af4f2ab64f47","5fde4e6949cf21487c918f62734c3f9c");
        SMSSDK.getVerificationCode("86",phoneNumber);
        EventHandler eventHandler = new EventHandler(){
            @Override
            public void afterEvent(int i, int i1, Object o) {
                super.afterEvent(i, i1, o);
                if (i1==SMSSDK.RESULT_COMPLETE){
                    if (i==SMSSDK.EVENT_GET_VERIFICATION_CODE){
                        cal.invoke(2);
                    }
                }else{
                        cal.invoke("error");
                }
            }
        };
        SMSSDK.registerEventHandler(eventHandler);
        mcallback=cal;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        Log.i("dleyy","onActivityResult");
    }

    @Override
    public void onNewIntent(Intent intent) {
        Log.i("dleyy","onNewIntent");
    }

    @Override
    public void onHostResume() {
        Log.i("dleyy","onHostResume");
    }

    @Override
    public void onHostPause() {
        Log.i("dleyy","onHostPause");
    }

    @Override
    public void onHostDestroy() {
        Log.i("dleyy","onHostDestroy");
        SMSSDK.unregisterAllEventHandler();
    }
}
