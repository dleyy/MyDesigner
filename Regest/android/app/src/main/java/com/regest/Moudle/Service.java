package com.regest.Moudle;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/2/22.
 */

//服务 id、发布者、类型。。。服务者所在地
public class Service extends BmobObject {
    private Integer serciceID;
    private Integer publishID;
    private String serviceStyle;
    private String serviceTitle;
    private String serviceContent;
    private String serviceStartTime;
    private Integer serviceNumber;
    private Integer serviceLike;
    private Integer serviceDislike;
    private Integer serviceComment;
    private String serviceLocation;


    public Integer getSerciceID() {
        return serciceID;
    }

    public void setSerciceID(Integer serciceID) {
        this.serciceID = serciceID;
    }

    public Integer getPublishID() {
        return publishID;
    }

    public void setPublishID(Integer publishID) {
        this.publishID = publishID;
    }

    public String getServiceStyle() {
        return serviceStyle;
    }

    public void setServiceStyle(String serviceStyle) {
        this.serviceStyle = serviceStyle;
    }

    public String getServiceTitle() {
        return serviceTitle;
    }

    public void setServiceTitle(String serviceTitle) {
        this.serviceTitle = serviceTitle;
    }

    public String getServiceContent() {
        return serviceContent;
    }

    public void setServiceContent(String serviceContent) {
        this.serviceContent = serviceContent;
    }

    public String getServiceStartTime() {
        return serviceStartTime;
    }

    public void setServiceStartTime(String serviceStartTime) {
        this.serviceStartTime = serviceStartTime;
    }

    public Integer getServiceNumber() {
        return serviceNumber;
    }

    public void setServiceNumber(Integer serviceNumber) {
        this.serviceNumber = serviceNumber;
    }

    public Integer getServiceLike() {
        return serviceLike;
    }

    public void setServiceLike(Integer serviceLike) {
        this.serviceLike = serviceLike;
    }

    public Integer getServiceDislike() {
        return serviceDislike;
    }

    public void setServiceDislike(Integer serviceDislike) {
        this.serviceDislike = serviceDislike;
    }

    public Integer getServiceComment() {
        return serviceComment;
    }

    public void setServiceComment(Integer serviceComment) {
        this.serviceComment = serviceComment;
    }

    public String getServiceLocation() {
        return serviceLocation;
    }

    public void setServiceLocation(String serviceLocation) {
        this.serviceLocation = serviceLocation;
    }
}
