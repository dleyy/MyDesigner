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
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.regest.Moudle.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.bmob.v3.Bmob;
import cn.bmob.v3.BmobQuery;
import cn.bmob.v3.exception.BmobException;
import cn.bmob.v3.listener.FindListener;
import cn.bmob.v3.listener.SaveListener;
import cn.bmob.v3.listener.UpdateListener;
import cn.smssdk.EventHandler;
import cn.smssdk.OnSendMessageHandler;
import cn.smssdk.SMSSDK;

/**
 * Created by dleyy on 2017/1/19.
 */

public class HttpMoudle extends ReactContextBaseJavaModule implements ActivityEventListener,LifecycleEventListener{

    private Callback mcallback;
    private static Callback sCallback,eCallback;

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
    public void Login(String phoneNumber,Callback cal){
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
                        WritableMap map = Arguments.createMap();
                        map.putString("Password",list.get(0).getPassword());
                        map.putString("ObjectId",list.get(0).getObjectId());
                        map.putString("NickName",list.get(0).getNickName());
                        map.putBoolean("Qualification",list.get(0).getQualification());
                        map.putString("City",list.get(0).getCity());
                        mcallback.invoke("success",map,"");
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
     * @param successCallback
     * @param errorCallback
     */
    @ReactMethod
    public void identifyCode(ReadableMap map,Callback successCallback, Callback errorCallback){
        SMSSDK.submitVerificationCode("86",map.getString("phoneNumber"),map.getString("code"));
        sCallback=successCallback;
        eCallback=errorCallback;
        EventHandler eventHandler = new EventHandler(){
            @Override
            public void afterEvent(int i, int i1, Object o) {
                super.afterEvent(i, i1, o);
                if (i1==SMSSDK.RESULT_COMPLETE&&sCallback!=null){
                    sCallback.invoke(6);
                    sCallback=null;
                    eCallback=null;
                }else{
                    if (eCallback!=null) {
                        eCallback.invoke("error");
                        sCallback=null;
                        eCallback=null;
                    }
                }
            }
        };
        SMSSDK.registerEventHandler(eventHandler);
    }


    /**
     *注册
     *
     */
    public void insertInToServices(User user, Callback callback){
        user.save(new SaveListener<String>() {
            @Override
            public void done(String s, BmobException e) {
                mcallback.invoke(s);
            }
        });
        mcallback=callback;
    }

    /**
     * 注册接口；
     * @param map
     * @param callback
     */
    @ReactMethod
    public void Regest(ReadableMap map, Callback callback){
        User user = new User();
        user.setCid("");
        user.setCredit(0);
        user.setQualification(false);
        user.setCidimage("");
        user.setNickName(map.getString("name"));
        user.setPhoneNum(map.getString("phoneNumber"));
        user.setPassword(map.getString("password"));
        insertInToServices(user,callback);
    }

    /**
     * 发送短信验证码接口；
     * @param phoneNumber
     * @param successcallback
     * @param errorcallback
     */
    @ReactMethod
    public void getSMSMessage(String phoneNumber,Callback successcallback, Callback errorcallback){
        SMSSDK.initSDK(getReactApplicationContext(),"1af4f2ab64f47","5fde4e6949cf21487c918f62734c3f9c");
        SMSSDK.getVerificationCode("86",phoneNumber);
        sCallback=successcallback;
        eCallback=errorcallback;
        EventHandler eventHandler = new EventHandler(){
            @Override
            public void afterEvent(int i, int i1, Object o) {
                super.afterEvent(i, i1, o);
                if (i1==SMSSDK.RESULT_COMPLETE){
                    if (i==SMSSDK.EVENT_GET_VERIFICATION_CODE&&sCallback!=null) {
                        sCallback.invoke("发送成功");
                        sCallback=null;
                        eCallback=null;
                    }
                }else{
                        if(eCallback!=null) {
                            eCallback.invoke("发送失败");
                            sCallback=null;
                            eCallback=null;
                        }
                }
            }
        };
        SMSSDK.registerEventHandler(eventHandler);
    }

    /**
     * 找回密码
     * @param objectId      用户ID
     * @param newPassword   新密码
     * @param cal           回调
     */
    @ReactMethod
    public void updateUserPassword(String objectId,String newPassword,Callback cal){
        User user = new User();
        user.setPassword(newPassword);
        user.update(objectId, new UpdateListener() {
            @Override
            public void done(BmobException e) {
                if (e==null) {
                    mcallback.invoke("success","");
                    Log.i("dleyy","更新成功");
                }else{
                    Log.i("dleyy","更新失败");
                    mcallback.invoke("error",e.getMessage());
                }
            }
        });
        mcallback = cal;
    }

    /**
     * 获取用户信息
     * @param phoneNumber       电话号码
     * @param successCallback   成功回调
     * @param errorCallback     失败回调
     */
    @ReactMethod
    public void seach(String phoneNumber, final Callback successCallback, final Callback errorCallback){
        final BmobQuery<User> user = new BmobQuery<>();
        user.addWhereEqualTo("phoneNum",phoneNumber);
        user.setLimit(1);
        sCallback = successCallback;
        eCallback = errorCallback;
        user.findObjects(new FindListener<User>() {
            @Override
            public void done(List<User> list, BmobException e) {
                if (e == null) {
                    if (list.isEmpty()) {
                        errorCallback.invoke("获取信息失败");
                    } else {
                        WritableArray map = Arguments.createArray();
                        map = (WritableArray) list.get(0);
                        successCallback.invoke(map);
                    }
                } else {
                    errorCallback.invoke(e.getMessage());
                }
            }
        });
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
