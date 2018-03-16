package com.xywztech.bcrm.custview.model;

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
 * 股票发行信息
 */
@Entity
@Table(name = "ocrm_f_ci_ipo_info")
public class CustomerIpoInfo implements Serializable {

    private static final long serialVersionUID = 4904298947071711643L;

    @Id
    @GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
    private Long MXTID;

    /** 平台日期 */
    @Temporal(TemporalType.DATE)
    @Column(name = "CRM_DT")
    private Date CRM_DT;

    /** 客户编号 */
    @Column(name = "CUST_ID", length = 20)
    private String CUST_ID;

    /** 客户名称 */
    @Column(name = "CUST_NAME", length = 100)
    private String CUST_NAME;

    /** 序号 */
    @Column(length = 20)
    private String ID;

    /** 上市日期 */
    @Temporal(TemporalType.DATE)
    @Column(name = "IPO_DT")
    private Date IPO_DT;

    /** 上市地 */
    @Column(name = "IPO_INSTN", length = 100)
    private String IPO_INSTN;

    /** 流通股 */
    @Column(name = "LT_STOCK", precision = 24, scale = 6)
    private BigDecimal LT_STOCK;

    /** 备注 */
    @Column(name = "RMAK", length = 2000)
    private String RMAK;

    /** 当年增发配股额 */
    @Column(name = "STOCK_ADD", precision = 24, scale = 6)
    private BigDecimal STOCK_ADD;

    /** 当年股本总量 */
    @Column(name = "STOCK_AMT", precision = 24, scale = 6)
    private BigDecimal STOCK_AMT;

    /** 股票代码 */
    @Column(name = "STOCK_COD", length = 20)
    private String STOCK_COD;

    /** 股票名称 */
    @Column(name = "STOCK_NAME", length = 100)
    private String STOCK_NAME;

    /** 股票类型 */
    @Column(name = "STOCK_TYP", length = 20)
    private String STOCK_TYP;

    /** 每股净资产 */
    @Column(name = "STOCKASSETS", precision = 24, scale = 6)
    private BigDecimal STOCKASSETS;

    /** 每股净现金流量 */
    @Column(name = "STOCKFLOW", precision = 24, scale = 6)
    private BigDecimal STOCKFLOW;

    public Long getMXTID() {
        return MXTID;
    }

    public void setMXTID(Long mXTID) {
        MXTID = mXTID;
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

    public String getID() {
        return ID;
    }

    public void setID(String iD) {
        ID = iD;
    }

    public Date getIPO_DT() {
        return IPO_DT;
    }

    public void setIPO_DT(Date iPO_DT) {
        IPO_DT = iPO_DT;
    }

    public String getIPO_INSTN() {
        return IPO_INSTN;
    }

    public void setIPO_INSTN(String iPO_INSTN) {
        IPO_INSTN = iPO_INSTN;
    }

    public BigDecimal getLT_STOCK() {
        return LT_STOCK;
    }

    public void setLT_STOCK(BigDecimal lT_STOCK) {
        LT_STOCK = lT_STOCK;
    }

    public String getRMAK() {
        return RMAK;
    }

    public void setRMAK(String rMAK) {
        RMAK = rMAK;
    }

    public BigDecimal getSTOCK_ADD() {
        return STOCK_ADD;
    }

    public void setSTOCK_ADD(BigDecimal sTOCK_ADD) {
        STOCK_ADD = sTOCK_ADD;
    }

    public BigDecimal getSTOCK_AMT() {
        return STOCK_AMT;
    }

    public void setSTOCK_AMT(BigDecimal sTOCK_AMT) {
        STOCK_AMT = sTOCK_AMT;
    }

    public String getSTOCK_COD() {
        return STOCK_COD;
    }

    public void setSTOCK_COD(String sTOCK_COD) {
        STOCK_COD = sTOCK_COD;
    }

    public String getSTOCK_NAME() {
        return STOCK_NAME;
    }

    public void setSTOCK_NAME(String sTOCK_NAME) {
        STOCK_NAME = sTOCK_NAME;
    }

    public String getSTOCK_TYP() {
        return STOCK_TYP;
    }

    public void setSTOCK_TYP(String sTOCK_TYP) {
        STOCK_TYP = sTOCK_TYP;
    }

    public BigDecimal getSTOCKASSETS() {
        return STOCKASSETS;
    }

    public void setSTOCKASSETS(BigDecimal sTOCKASSETS) {
        STOCKASSETS = sTOCKASSETS;
    }

    public BigDecimal getSTOCKFLOW() {
        return STOCKFLOW;
    }

    public void setSTOCKFLOW(BigDecimal sTOCKFLOW) {
        STOCKFLOW = sTOCKFLOW;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}