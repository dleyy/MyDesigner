package com.regest.Moudle;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/1/19.
 */

public class User extends BmobObject {


    //昵称、身份证、密码、电话号码、信用分、是否认证、身份证地址；
    private String nickName;
    private String cid;
    private String password;
    private String phoneNum;
    private Integer credit;
    private Boolean qualification;
    private String cidimage;

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public Boolean getQualification() {
        return qualification;
    }

    public void setQualification(Boolean qualification) {
        this.qualification = qualification;
    }

    public String getCidimage() {
        return cidimage;
    }

    public void setCidimage(String cidimage) {
        this.cidimage = cidimage;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }
}
