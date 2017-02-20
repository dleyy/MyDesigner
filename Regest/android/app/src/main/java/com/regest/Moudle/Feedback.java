package com.regest.Moudle;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/2/17.
 */

//反馈意见 编号、订单编号、标题、类型、内容、时间、用户编号
public class Feedback extends BmobObject {
    private Integer feedbackid;
    private Integer feedbackorderid;
    private String feedbacktitle;
    private String feedbacktype;
    private String feedbackcontont;
    private String feedbacktime;
    private Integer feedbackuid;

    public Integer getFeedbackid() {
        return feedbackid;
    }

    public void setFeedbackid(Integer feedbackid) {
        this.feedbackid = feedbackid;
    }

    public Integer getFeedbackorderid() {
        return feedbackorderid;
    }

    public void setFeedbackorderid(Integer feedbackorderid) {
        this.feedbackorderid = feedbackorderid;
    }

    public String getFeedbacktitle() {
        return feedbacktitle;
    }

    public void setFeedbacktitle(String feedbacktitle) {
        this.feedbacktitle = feedbacktitle;
    }

    public String getFeedbacktype() {
        return feedbacktype;
    }

    public void setFeedbacktype(String feedbacktype) {
        this.feedbacktype = feedbacktype;
    }

    public String getFeedbackcontont() {
        return feedbackcontont;
    }

    public void setFeedbackcontont(String feedbackcontont) {
        this.feedbackcontont = feedbackcontont;
    }

    public String getFeedbacktime() {
        return feedbacktime;
    }

    public void setFeedbacktime(String feedbacktime) {
        this.feedbacktime = feedbacktime;
    }

    public Integer getFeedbackuid() {
        return feedbackuid;
    }

    public void setFeedbackuid(Integer feedbackuid) {
        this.feedbackuid = feedbackuid;
    }
}
