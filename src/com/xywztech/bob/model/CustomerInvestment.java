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
 * 对外股权投资情况
 */
@Entity
@Table(name = "ocrm_f_ci_investment")
public class CustomerInvestment implements Serializable {

    private static final long serialVersionUID = -7457335031702680271L;

    @Id
    @GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
    private Long MXTID;

    @Column(name = "BIG_FLG", length = 20)
    private String BIG_FLG;// 是否第一大股东

    private String COMPANY;// 投向企业名称

    @Temporal(TemporalType.DATE)
    @Column(name = "CRM_DT")
    private Date CRM_DT;// 平台日期

    @Column(name = "CUR_COD", length = 20)
    private String CUR_COD;// 出资币种

    @Column(name = "CUST_ID", length = 20)
    private String CUST_ID;// 客户编号

    @Column(name = "FR_NAME", length = 40)
    private String FR_NAME;// 投向企业法人代表名称

    @Column(name = "HBRPT_FLG", length = 20)
    private String HBRPT_FLG;// 是否合并报表

    @Column(length = 20)
    private String ID;// 序号

    @Column(name = "INV_AMT", precision = 24, scale = 6)
    private BigDecimal INV_AMT;// 实际投资金额（元）

    @Temporal(TemporalType.DATE)
    @Column(name = "INV_DT")
    private Date INV_DT;// 投资日期

    @Column(name = "INV_PCT", precision = 10, scale = 4)
    private BigDecimal INV_PCT;// 投资占比（%）

    @Column(name = "INV_RCV", precision = 24, scale = 6)
    private BigDecimal INV_RCV;// 第一年投资收益（元）

    @Column(name = "INV_TYP", length = 20)
    private String INV_TYP;// 投资方式

    @Column(name = "INV_ZZDM", length = 40)
    private String INV_ZZDM;// 投向企业组织机构代码

    @Column(name = "LNCRD_NO", length = 40)
    private String LNCRD_NO;// 投向企业贷款卡编号

    @Column(name = "LNCRD_STS", length = 20)
    private String LNCRD_STS;// 投向企业贷款卡状态

    @Column(name = "PAY_AMT", precision = 24, scale = 6)
    private BigDecimal PAY_AMT;// 应出资金额（元）

    @Column(name = "RMAK", length = 2000)
    private String RMAK;

    public String getRMAK() {
        return RMAK;
    }

    public void setRMAK(String rMAK) {
        RMAK = rMAK;
    }

    public Long getMXTID() {
        return MXTID;
    }

    public void setMXTID(Long mXTID) {
        MXTID = mXTID;
    }

    public String getBIG_FLG() {
        return BIG_FLG;
    }

    public void setBIG_FLG(String bIG_FLG) {
        BIG_FLG = bIG_FLG;
    }

    public String getCOMPANY() {
        return COMPANY;
    }

    public void setCOMPANY(String cOMPANY) {
        COMPANY = cOMPANY;
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

    public BigDecimal getINV_AMT() {
        return INV_AMT;
    }

    public void setINV_AMT(BigDecimal iNV_AMT) {
        INV_AMT = iNV_AMT;
    }

    public Date getINV_DT() {
        return INV_DT;
    }

    public void setINV_DT(Date iNV_DT) {
        INV_DT = iNV_DT;
    }

    public BigDecimal getINV_PCT() {
        return INV_PCT;
    }

    public void setINV_PCT(BigDecimal iNV_PCT) {
        INV_PCT = iNV_PCT;
    }

    public BigDecimal getINV_RCV() {
        return INV_RCV;
    }

    public void setINV_RCV(BigDecimal iNV_RCV) {
        INV_RCV = iNV_RCV;
    }

    public String getINV_TYP() {
        return INV_TYP;
    }

    public void setINV_TYP(String iNV_TYP) {
        INV_TYP = iNV_TYP;
    }

    public String getINV_ZZDM() {
        return INV_ZZDM;
    }

    public void setINV_ZZDM(String iNV_ZZDM) {
        INV_ZZDM = iNV_ZZDM;
    }

    public String getLNCRD_NO() {
        return LNCRD_NO;
    }

    public void setLNCRD_NO(String lNCRD_NO) {
        LNCRD_NO = lNCRD_NO;
    }

    public String getLNCRD_STS() {
        return LNCRD_STS;
    }

    public void setLNCRD_STS(String lNCRD_STS) {
        LNCRD_STS = lNCRD_STS;
    }

    public BigDecimal getPAY_AMT() {
        return PAY_AMT;
    }

    public void setPAY_AMT(BigDecimal pAY_AMT) {
        PAY_AMT = pAY_AMT;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}