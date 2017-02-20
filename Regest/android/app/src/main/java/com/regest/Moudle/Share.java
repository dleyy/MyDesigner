package com.regest.Moudle;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/2/17.
 */

//分享 编号、类型、标题、内容、图片id、是否审核、同意数、否定数
public class Share extends BmobObject {

    private Integer shareId;
    private String shareType;
    private String shareTitle;
    private String shareContentText;
    private Integer shareContentImgid;
    private Boolean sharehasreviewed;
    private Integer shareAgree;
    private Integer shareDisagree;

    public Integer getShareId() {
        return shareId;
    }

    public void setShareId(Integer shareId) {
        this.shareId = shareId;
    }

    public String getShareType() {
        return shareType;
    }

    public void setShareType(String shareType) {
        this.shareType = shareType;
    }

    public String getShareTitle() {
        return shareTitle;
    }

    public void setShareTitle(String shareTitle) {
        this.shareTitle = shareTitle;
    }

    public String getShareContentText() {
        return shareContentText;
    }

    public void setShareContentText(String shareContentText) {
        this.shareContentText = shareContentText;
    }

    public Integer getShareContentImgid() {
        return shareContentImgid;
    }

    public void setShareContentImgid(Integer shareContentImgid) {
        this.shareContentImgid = shareContentImgid;
    }

    public Boolean getSharehasreviewed() {
        return sharehasreviewed;
    }

    public void setSharehasreviewed(Boolean sharehasreviewed) {
        this.sharehasreviewed = sharehasreviewed;
    }

    public Integer getShareAgree() {
        return shareAgree;
    }

    public void setShareAgree(Integer shareAgree) {
        this.shareAgree = shareAgree;
    }

    public Integer getShareDisagree() {
        return shareDisagree;
    }

    public void setShareDisagree(Integer shareDisagree) {
        this.shareDisagree = shareDisagree;
    }
}
