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
 * 客户股东构成信息
 */
@Entity
@Table(name = "ocrm_f_ci_stockholder")
public class CustomerStockholder implements Serializable {

    private static final long serialVersionUID = -108122025922197542L;

    @Id
    @GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
    private Long MXTID;

    @Column(name = "BIGSH_FLG", length = 20)
    private String BIGSH_FLG;// 是否第一大股东

    @Column(name = "CRET_NO", length = 80)
    private String CRET_NO;// 证件号码

    @Column(name = "CRET_TYP", length = 40)
    private String CRET_TYP;// 证件类型

    @Temporal(TemporalType.DATE)
    @Column(name = "CRM_DT")
    private Date CRM_DT;// 平台日期

    @Column(name = "CUR_COD", length = 20)
    private String CUR_COD;// 币种

    @Column(name = "CUST_ID", length = 20)
    private String CUST_ID;// 客户编号

    @Column(name = "CUST_NAME", length = 100)
    private String CUST_NAME;// 客户名称

    @Column(name = "CZ_TYP", length = 20)
    private String CZ_TYP;// 出资方式

    @Column(name = "FR_NAME", length = 100)
    private String FR_NAME;// 法人代表名称

    @Column(name = "HBRPT_FLG", length = 4)
    private String HBRPT_FLG;// 是否合并报表

    @Column(length = 20)
    private String ID;// 序号

    @Temporal(TemporalType.DATE)
    @Column(name = "INV_DT")
    private Date INV_DT;// 投资时间

    @Column(name = "RMAK", length = 2000)
    private String RMAK;// 备注

    @Column(name = "SB_FLG", length = 4)
    private String SB_FLG;// 是否上报

    @Column(name = "SH_NAME", length = 100)
    private String SH_NAME;// 股东名称

    @Column(name = "SH_PCT", precision = 10, scale = 4)
    private BigDecimal SH_PCT;// 持股比例（%）

    @Column(name = "SH_TYP", length = 40)
    private String SH_TYP;// 股东类型

    @Column(name = "SJSH_AMT", precision = 24, scale = 6)
    private BigDecimal SJSH_AMT;// 实际持股金额（元）

    @Column(name = "YCZ_AMT", precision = 24, scale = 6)
    private BigDecimal YCZ_AMT;// 应出资金额（元）

    public Long getMXTID() {
        return MXTID;
    }

    public void setMXTID(Long mXTID) {
        MXTID = mXTID;
    }

    public String getBIGSH_FLG() {
        return BIGSH_FLG;
    }

    public void setBIGSH_FLG(String bIGSH_FLG) {
        BIGSH_FLG = bIGSH_FLG;
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

    public Date getCRM_DT() {
        return CRM_DT;
    }

    public void setCRM_DT(Date cRM_DT) {
        CRM_DT = cRM_DT;
    }

    public String getCUR_COD() {
        return CUR_COD;
    }

    public void setCUR_COD(String cUR_COD) {
        CUR_COD = cUR_COD;
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

    public String getCZ_TYP() {
        return CZ_TYP;
    }

    public void setCZ_TYP(String cZ_TYP) {
        CZ_TYP = cZ_TYP;
    }

    public String getFR_NAME() {
        return FR_NAME;
    }

    public void setFR_NAME(String fR_NAME) {
        FR_NAME = fR_NAME;
    }

    public String getHBRPT_FLG() {
        return HBRPT_FLG;
    }

    public void setHBRPT_FLG(String hBRPT_FLG) {
        HBRPT_FLG = hBRPT_FLG;
    }

    public String getID() {
        return ID;
    }

    public void setID(String iD) {
        ID = iD;
    }

    public Date getINV_DT() {
        return INV_DT;
    }

    public void setINV_DT(Date iNV_DT) {
        INV_DT = iNV_DT;
    }

    public String getRMAK() {
        return RMAK;
    }

    public void setRMAK(String rMAK) {
        RMAK = rMAK;
    }

    public String getSB_FLG() {
        return SB_FLG;
    }

    public void setSB_FLG(String sB_FLG) {
        SB_FLG = sB_FLG;
    }

    public String getSH_NAME() {
        return SH_NAME;
    }

    public void setSH_NAME(String sH_NAME) {
        SH_NAME = sH_NAME;
    }

    public BigDecimal getSH_PCT() {
        return SH_PCT;
    }

    public void setSH_PCT(BigDecimal sH_PCT) {
        SH_PCT = sH_PCT;
    }

    public String getSH_TYP() {
        return SH_TYP;
    }

    public void setSH_TYP(String sH_TYP) {
        SH_TYP = sH_TYP;
    }

    public BigDecimal getSJSH_AMT() {
        return SJSH_AMT;
    }

    public void setSJSH_AMT(BigDecimal sJSH_AMT) {
        SJSH_AMT = sJSH_AMT;
    }

    public BigDecimal getYCZ_AMT() {
        return YCZ_AMT;
    }

    public void setYCZ_AMT(BigDecimal yCZ_AMT) {
        YCZ_AMT = yCZ_AMT;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}