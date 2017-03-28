package com.regest;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.telecom.Call;
import android.util.Log;
import android.view.View;
import android.widget.Button;

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


import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        //SMSSDK.initSDK(getReactApplicationContext(),"1af4f2ab64f47","5fde4e6949cf21487c918f62734c3f9c");
    }

    @Override
    public String getName() {
        return "HttpMoudle";

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
