package com.xywztech.bob.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 客户联系人信息
 */
@Entity
@Table(name = "ocrm_f_ci_linkman")
public class CustomerLinkman implements Serializable {

    private static final long serialVersionUID = -8976474526117597068L;

    @Id
    @GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
    private Long ID;

    @Temporal(TemporalType.DATE)
    private Date BIRTHDAY;// 出生日期

    @Column(length = 50)
    private String COUNTRY;// 国籍

    @Temporal(TemporalType.DATE)
    @Column(name = "CRET_BGN_DT")
    private Date CRET_BGN_DT;// 证件有效起始日

    @Temporal(TemporalType.DATE)
    @Column(name = "CRET_END_DT")
    private Date CRET_END_DT;// 证件有效到期日

    @Column(name = "CRET_NO", length = 100)
    private String CRET_NO;// 证件号码

    @Column(name = "CRET_TYP", length = 20)
    private String CRET_TYP;// 证件类型

    @Column(name = "CRET_YEAR", length = 20)
    private String CRET_YEAR;// 相关行业从业年限

    @Temporal(TemporalType.DATE)
    @Column(name = "CRM_DT")
    private Date CRM_DT;// 平台日期

    @Column(name = "CUST_ID", length = 20)
    private String CUST_ID;// 客户编号

    @Column(name = "CUST_NAME", length = 100)
    private String CUST_NAME;// 客户名称

    @Column(name = "EDUBG", length = 50)
    private String EDUBG;// 学历

    @Column(name = "EN_NAME", length = 100)
    private String EN_NAME;// 联系人英文名

    @Column(name = "FAMILYPERS", precision = 8)
    private BigDecimal FAMILYPERS;// 家庭供养人口

    @Column(name = "FAMILYTEL", length = 20)
    private String FAMILYTEL;// 家庭电话

    @Column(name = "FR_FLG", length = 20)
    private String FR_FLG;// 是否法人

    @Column(name = "FZ_BUSINESSTYP", length = 100)
    private String FZ_BUSINESSTYP;// 联系人负责业务类型

    @Column(name = "GRADUATESCHOOL", length = 50)
    private String GRADUATESCHOOL;// 毕业院校

    @Column(length = 250)
    private String HOBBY;// 个人爱好

    @Column(name = "HOME_ADDR", length = 100)
    private String HOME_ADDR;// 家庭住址

    @Column(length = 10)
    private String INSERT_FLG;

    @Column(name = "IMT_ELEMENT", length = 200)
    private String IMT_ELEMENT;// 营销主要关键要素

    @Column(name = "IMT_LEV", length = 50)
    private String IMT_LEV;// 重要程度

    @Column(name = "LK_NAME", length = 100)
    private String LK_NAME;// 联系人姓名

    @Column(name = "MARRY_STS", length = 50)
    private String MARRY_STS;// 婚姻状况

    @Column(length = 50)
    private String NATION;// 民族

    @Column(name = "OFFICE_ADDR", length = 100)
    private String OFFICE_ADDR;// 办公地址

    @Column(name = "OFFICE_EMAIL", length = 30)
    private String OFFICE_EMAIL;// e-mail办公

    @Column(name = "OFFICE_MOBILE", length = 20)
    private String OFFICE_MOBILE;// 手机号码（办公）

    @Column(name = "OTHER_SOURCE", length = 50)
    private String OTHER_SOURCE;// 其他经济来源

    @Column(name = "PER_FLG", length = 20)
    private String PER_FLG;// 是否我行个人客户

    @Column(name = "PER_MOBILE", length = 20)
    private String PER_MOBILE;// 手机号码（个人）

    @Column(name = "POSITION", length = 20)
    private String POSITION;// 职务

    @Column(name = "RCV_MON", precision = 24, scale = 6)
    private BigDecimal RCV_MON;// 月收入（元）

    @Column(name = "RCV_SOURCE", length = 50)
    private String RCV_SOURCE;// 主要经济来源

    @Column(name = "RELA_BG", length = 200)
    private String RELA_BG;// 关系背景

    @Column(length = 50)
    private String RELIGION;// 宗教信仰

    @Column(length = 10)
    private String SEX;// 性别

    @Column(name = "SOCIETYPOST", length = 50)
    private String SOCIETYPOST;// 社会职务

    @Column(length = 100)
    private String STOCK;// 持股情况

    @Column(name = "WK_DT", length = 50)
    private String WK_DT;// 现单位工作时间

    @Column(name = "WORK_BGNDT", length = 20)
    private String WORK_BGNDT;// 担任职务时间

    @Column(name = "WORK_H", length = 200)
    private String WORK_H;// 工作经历

    @Column(name = "JOB_TITLE", length = 50)
    private String JOB_TITLE;// 职称

    @Column(name = "RMAK", length = 2000)
    private String RMAK;// 备注

    public String getJOB_TITLE() {
        return JOB_TITLE;
    }

    public void setJOB_TITLE(String jOB_TITLE) {
        JOB_TITLE = jOB_TITLE;
    }

    public String getRMAK() {
        return RMAK;
    }

    public void setRMAK(String rMAK) {
        RMAK = rMAK;
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long iD) {
        ID = iD;
    }

    public Date getBIRTHDAY() {
        return BIRTHDAY;
    }

    public void setBIRTHDAY(Date bIRTHDAY) {
        BIRTHDAY = bIRTHDAY;
    }

    public String getCOUNTRY() {
        return COUNTRY;
    }

    public String getINSERT_FLG() {
        return INSERT_FLG;
    }

    public void setINSERT_FLG(String iNSERT_FLG) {
        INSERT_FLG = "1";
    }

    public void setCOUNTRY(String cOUNTRY) {
        COUNTRY = cOUNTRY;
    }

    public Date getCRET_BGN_DT() {
        return CRET_BGN_DT;
    }

    public void setCRET_BGN_DT(Date cRET_BGN_DT) {
        CRET_BGN_DT = cRET_BGN_DT;
    }

    public Date getCRET_END_DT() {
        return CRET_END_DT;
    }

    public void setCRET_END_DT(Date cRET_END_DT) {
        CRET_END_DT = cRET_END_DT;
    }

    public String getCRET_NO() {
        return CRET_NO;
    }

    public void setCRET_NO(String cRET_NO) {
        CRET_NO = cRET_NO;
    }

    public String getCRET_TYP() {
        return CRET_TYP;
    }

    public void setCRET_TYP(String cRET_TYP) {
        CRET_TYP = cRET_TYP;
    }

    public String getCRET_YEAR() {
        return CRET_YEAR;
    }

    public void setCRET_YEAR(String cRET_YEAR) {
        CRET_YEAR = cRET_YEAR;
    }

    public Date getCRM_DT() {
        return CRM_DT;
    }

    public void setCRM_DT(Date cRM_DT) {
        CRM_DT = cRM_DT;
    }

    public String getCUST_ID() {
        return CUST_ID;
    }

    public void setCUST_ID(String cUST_ID) {
        CUST_ID = cUST_ID;
    }

    public String getCUST_NAME() {
        return CUST_NAME;
    }

    public void setCUST_NAME(String cUST_NAME) {
        CUST_NAME = cUST_NAME;
    }

    public String getEDUBG() {
        return EDUBG;
    }

    public void setEDUBG(String eDUBG) {
        EDUBG = eDUBG;
    }

    public String getEN_NAME() {
        return EN_NAME;
    }

    public void setEN_NAME(String eN_NAME) {
        EN_NAME = eN_NAME;
    }

    public BigDecimal getFAMILYPERS() {
        return FAMILYPERS;
    }

    public void setFAMILYPERS(BigDecimal fAMILYPERS) {
        FAMILYPERS = fAMILYPERS;
    }

    public String getFAMILYTEL() {
        return FAMILYTEL;
    }

    public void setFAMILYTEL(String fAMILYTEL) {
        FAMILYTEL = fAMILYTEL;
    }

    public String getFR_FLG() {
        return FR_FLG;
    }

    public void setFR_FLG(String fR_FLG) {
        FR_FLG = fR_FLG;
    }

    public String getFZ_BUSINESSTYP() {
        return FZ_BUSINESSTYP;
    }

    public void setFZ_BUSINESSTYP(String fZ_BUSINESSTYP) {
        FZ_BUSINESSTYP = fZ_BUSINESSTYP;
    }

    public String getGRADUATESCHOOL() {
        return GRADUATESCHOOL;
    }

    public void setGRADUATESCHOOL(String gRADUATESCHOOL) {
        GRADUATESCHOOL = gRADUATESCHOOL;
    }

    public String getHOBBY() {
        return HOBBY;
    }

    public void setHOBBY(String hOBBY) {
        HOBBY = hOBBY;
    }

    public String getHOME_ADDR() {
        return HOME_ADDR;
    }

    public void setHOME_ADDR(String hOME_ADDR) {
        HOME_ADDR = hOME_ADDR;
    }

    public String getIMT_ELEMENT() {
        return IMT_ELEMENT;
    }

    public void setIMT_ELEMENT(String iMT_ELEMENT) {
        IMT_ELEMENT = iMT_ELEMENT;
    }

    public String getIMT_LEV() {
        return IMT_LEV;
    }

    public void setIMT_LEV(String iMT_LEV) {
        IMT_LEV = iMT_LEV;
    }

    public String getLK_NAME() {
        return LK_NAME;
    }

    public void setLK_NAME(String lK_NAME) {
        LK_NAME = lK_NAME;
    }

    public String getMARRY_STS() {
        return MARRY_STS;
    }

    public void setMARRY_STS(String mARRY_STS) {
        MARRY_STS = mARRY_STS;
    }

    public String getNATION() {
        return NATION;
    }

    public void setNATION(String nATION) {
        NATION = nATION;
    }

    public String getOFFICE_ADDR() {
        return OFFICE_ADDR;
    }

    public void setOFFICE_ADDR(String oFFICE_ADDR) {
        OFFICE_ADDR = oFFICE_ADDR;
    }

    public String getOFFICE_EMAIL() {
        return OFFICE_EMAIL;
    }

    public void setOFFICE_EMAIL(String oFFICE_EMAIL) {
        OFFICE_EMAIL = oFFICE_EMAIL;
    }

    public String getOFFICE_MOBILE() {
        return OFFICE_MOBILE;
    }

    public void setOFFICE_MOBILE(String oFFICE_MOBILE) {
        OFFICE_MOBILE = oFFICE_MOBILE;
    }

    public String getOTHER_SOURCE() {
        return OTHER_SOURCE;
    }

    public void setOTHER_SOURCE(String oTHER_SOURCE) {
        OTHER_SOURCE = oTHER_SOURCE;
    }

    public String getPER_FLG() {
        return PER_FLG;
    }

    public void setPER_FLG(String pER_FLG) {
        PER_FLG = pER_FLG;
    }

    public String getPER_MOBILE() {
        return PER_MOBILE;
    }

    public void setPER_MOBILE(String pER_MOBILE) {
        PER_MOBILE = pER_MOBILE;
    }

    public String getPOSITION() {
        return POSITION;
    }

    public void setPOSITION(String pOSITION) {
        POSITION = pOSITION;
    }

    public BigDecimal getRCV_MON() {
        return RCV_MON;
    }

    public void setRCV_MON(BigDecimal rCV_MON) {
        RCV_MON = rCV_MON;
    }

    public String getRCV_SOURCE() {
        return RCV_SOURCE;
    }

    public void setRCV_SOURCE(String rCV_SOURCE) {
        RCV_SOURCE = rCV_SOURCE;
    }

    public String getRELA_BG() {
        return RELA_BG;
    }

    public void setRELA_BG(String rELA_BG) {
        RELA_BG = rELA_BG;
    }

    public String getRELIGION() {
        return RELIGION;
    }

    public void setRELIGION(String rELIGION) {
        RELIGION = rELIGION;
    }

    public String getSEX() {
        return SEX;
    }

    public void setSEX(String sEX) {
        SEX = sEX;
    }

    public String getSOCIETYPOST() {
        return SOCIETYPOST;
    }

    public void setSOCIETYPOST(String sOCIETYPOST) {
        SOCIETYPOST = sOCIETYPOST;
    }

    public String getSTOCK() {
        return STOCK;
    }

    public void setSTOCK(String sTOCK) {
        STOCK = sTOCK;
    }

    public String getWK_DT() {
        return WK_DT;
    }

    public void setWK_DT(String wK_DT) {
        WK_DT = wK_DT;
    }

    public String getWORK_BGNDT() {
        return WORK_BGNDT;
    }

    public void setWORK_BGNDT(String wORK_BGNDT) {
        WORK_BGNDT = wORK_BGNDT;
    }

    public String getWORK_H() {
        return WORK_H;
    }

    public void setWORK_H(String wORK_H) {
        WORK_H = wORK_H;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}