package com.regest.Moudle;

import cn.bmob.v3.BmobObject;

/**
 * Created by dleyy on 2017/2/17.
 */

//技能编号、技能名、技能详情、是否被审核、技能类型
public class Skill extends BmobObject {

    private String skillid;
    private String skillname;
    private String skilldetail;
    private String skillhasreviewed;
    private String skilltype;

    public String getSkillid() {
        return skillid;
    }

    public void setSkillid(String skillid) {
        this.skillid = skillid;
    }

    public String getSkillname() {
        return skillname;
    }

    public void setSkillname(String skillname) {
        this.skillname = skillname;
    }

    public String getSkilldetail() {
        return skilldetail;
    }

    public void setSkilldetail(String skilldetail) {
        this.skilldetail = skilldetail;
    }

    public String getSkillhasreviewed() {
        return skillhasreviewed;
    }

    public void setSkillhasreviewed(String skillhasreviewed) {
        this.skillhasreviewed = skillhasreviewed;
    }

    public String getSkilltype() {
        return skilltype;
    }

    public void setSkilltype(String skilltype) {
        this.skilltype = skilltype;
    }
}
