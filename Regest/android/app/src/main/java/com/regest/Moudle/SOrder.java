package com.regest.Moudle;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/2/22.
 */

//服务订单 编号、发布者、类型、标题、内容、开始时间、(点赞、否定、评论)*数
public class SOrder extends BmobObject {
    private Integer Sorderid;
    private Integer publishid;
    private String Sorderstyle;
    private String Sordertitle;
    private String Sordercontent;
    private String Sorderstarttime;
    private Integer Sorderlike;
    private Integer Sorderdislike;
    private Integer Sordercomment;

    public Integer getSorderid() {
        return Sorderid;
    }

    public void setSorderid(Integer sorderid) {
        Sorderid = sorderid;
    }

    public Integer getPublishid() {
        return publishid;
    }

    public void setPublishid(Integer publishid) {
        this.publishid = publishid;
    }

    public String getSorderstyle() {
        return Sorderstyle;
    }

    public void setSorderstyle(String sorderstyle) {
        Sorderstyle = sorderstyle;
    }

    public String getSordertitle() {
        return Sordertitle;
    }

    public void setSordertitle(String sordertitle) {
        Sordertitle = sordertitle;
    }

    public String getSordercontent() {
        return Sordercontent;
    }

    public void setSordercontent(String sordercontent) {
        Sordercontent = sordercontent;
    }

    public String getSorderstarttime() {
        return Sorderstarttime;
    }

    public void setSorderstarttime(String sorderstarttime) {
        Sorderstarttime = sorderstarttime;
    }

    public Integer getSorderlike() {
        return Sorderlike;
    }

    public void setSorderlike(Integer sorderlike) {
        Sorderlike = sorderlike;
    }

    public Integer getSorderdislike() {
        return Sorderdislike;
    }

    public void setSorderdislike(Integer sorderdislike) {
        Sorderdislike = sorderdislike;
    }

    public Integer getSordercomment() {
        return Sordercomment;
    }

    public void setSordercomment(Integer sordercomment) {
        Sordercomment = sordercomment;
    }
}
