package com.regest.Moudle;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/2/22.
 */

//存储图片 以及索引
public class Image extends BmobObject {
    private Integer ImageID;
    private String ImageUrl;

    public Integer getImageID() {
        return ImageID;
    }

    public void setImageID(Integer imageID) {
        ImageID = imageID;
    }

    public String getImageUrl() {
        return ImageUrl;
    }

    public void setImageUrl(String imageUrl) {
        ImageUrl = imageUrl;
    }
}
