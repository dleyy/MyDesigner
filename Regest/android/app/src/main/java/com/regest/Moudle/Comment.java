package com.regest.Moudle;

import android.os.AsyncTask;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/2/20.
 */

// 评论的 编号、内容、用户ID、同意数、否定数。
public class Comment extends BmobObject {
    private String commentId;
    private String commentContent;
    private String userId;
    private Integer commentAgreeNumber;
    private Integer commentDisagreeNumber;

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getCommentAgreeNumber() {
        return commentAgreeNumber;
    }

    public void setCommentAgreeNumber(Integer commentAgreeNumber) {
        this.commentAgreeNumber = commentAgreeNumber;
    }

    public Integer getCommentDisagreeNumber() {
        return commentDisagreeNumber;
    }

    public void setCommentDisagreeNumber(Integer commentDisagreeNumber) {
        this.commentDisagreeNumber = commentDisagreeNumber;
    }


}
