package com.regest.Moudle;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/2/17.
 */


//订单编号、发布者id、接单者id、订单类型、订单名、订单内容、发布时间、结束时间、确认订单完成的Key、订单状态
//点赞数、评论数.
public class Order extends BmobObject {
    private Integer orderid;
    private Integer publishid;
    private Integer receiveid;
    private String orderstyle;
    private String ordertitle;
    private String ordercontent;
    private String orderstarttime;
    private String orderendtime;
    private Integer ordercheckNum;
    private String orderstate;
    private Integer orderlike;
    private Integer ordercomment;

    public Integer getOrderid() {
        return orderid;
    }

    public void setOrderid(Integer orderid) {
        this.orderid = orderid;
    }

    public Integer getPublishid() {
        return publishid;
    }

    public void setPublishid(Integer publishid) {
        this.publishid = publishid;
    }

    public Integer getReceiveid() {
        return receiveid;
    }

    public void setReceiveid(Integer receiveid) {
        this.receiveid = receiveid;
    }

    public String getOrderstyle() {
        return orderstyle;
    }

    public void setOrderstyle(String orderstyle) {
        this.orderstyle = orderstyle;
    }

    public String getOrdertitle() {
        return ordertitle;
    }

    public void setOrdertitle(String ordertitle) {
        this.ordertitle = ordertitle;
    }

    public String getOrdercontent() {
        return ordercontent;
    }

    public void setOrdercontent(String ordercontent) {
        this.ordercontent = ordercontent;
    }

    public String getOrderstarttime() {
        return orderstarttime;
    }

    public void setOrderstarttime(String orderstarttime) {
        this.orderstarttime = orderstarttime;
    }

    public String getOrderendtime() {
        return orderendtime;
    }

    public void setOrderendtime(String orderendtime) {
        this.orderendtime = orderendtime;
    }

    public Integer getOrdercheckNum() {
        return ordercheckNum;
    }

    public void setOrdercheckNum(Integer ordercheckNum) {
        this.ordercheckNum = ordercheckNum;
    }

    public String getOrderstate() {
        return orderstate;
    }

    public void setOrderstate(String orderstate) {
        this.orderstate = orderstate;
    }

    public Integer getOrderlike() {
        return orderlike;
    }

    public void setOrderlike(Integer orderlike) {
        this.orderlike = orderlike;
    }

    public Integer getOrdercomment() {
        return ordercomment;
    }

    public void setOrdercomment(Integer ordercomment) {
        this.ordercomment = ordercomment;
    }
}
