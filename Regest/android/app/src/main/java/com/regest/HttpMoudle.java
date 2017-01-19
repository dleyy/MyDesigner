package com.regest;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.telecom.Call;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
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

/**
 * Created by dleyy on 2017/1/19.
 */

public class HttpMoudle extends ReactContextBaseJavaModule implements ActivityEventListener{

    private static Callback mcallback;


    public HttpMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        Bmob.initialize(reactContext,"ad3dec8d6a119776a9467485425a8e92");
    }

    @Override
    public String getName() {
        return "HttpMoudle";

    }

    /**
     *
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
                    for (User user:list){
                        mcallback.invoke(user.getObjectId(),user.getPassword());
                    }
                }else{
                    mcallback.invoke(e);
                }
            }
        });
        mcallback = cal;
    }

    /**
     *
     * @param map       昵称+手机号+密码
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
        user.save(new SaveListener<String>() {
            @Override
            public void done(String s, BmobException e) {
                   mcallback.invoke(s);
            }
        });
        mcallback = cal;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
