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
 * 债券发行信息
 */
@Entity
@Table(name = "ocrm_f_ci_bnd_issue")
public class CustomerBondIssue implements Serializable {

    private static final long serialVersionUID = -8724326968486170991L;

    @Id
    @GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
    private Long MXTID;

    /** 债券类型 */
    @Column(name = "BND_TYP", length = 13)
    private String BND_TYP;

    /** 债券期限（年） */
    @Column(name = "BND_YEAR")
    private Integer BND_YEAR;

    /** 交易所名称 */
    @Column(name = "BOURSENAME", length = 200)
    private String BOURSENAME;

    /** 平台日期 */
    @Temporal(TemporalType.DATE)
    @Column(name = "CRM_DT")
    private Date CRM_DT;

    /** 币种 */
    @Column(name = "CUR_COD", length = 18)
    private String CUR_COD;

    /** 客户编号 */
    @Column(name = "CUST_ID", length = 21)
    private String CUST_ID;

    /** 客户名称 */
    @Column(name = "CUST_NAME", length = 200)
    private String CUST_NAME;

    /** 序号 */
    @Column(length = 20)
    private String ID;

    /** 登记日期 */
    @Temporal(TemporalType.DATE)
    @Column(name = "INPUT_DT")
    private Date INPUT_DT;

    /** 登记单位 */
    @Column(name = "INPUT_INSTN", length = 200)
    private String INPUT_INSTN;

    /** 登记人 */
    @Column(name = "INPUT_USER", length = 200)
    private String INPUT_USER;

    /** 利率规定 */
    @Column(name = "INTR", precision = 24, scale = 6)
    private BigDecimal INTR;

    /** 发行金额（元） */
    @Column(name = "ISSUE_AMT", precision = 24, scale = 6)
    private BigDecimal ISSUE_AMT;

    /** 债券代码 */
    @Column(name = "ISSUE_COD", length = 18)
    private String ISSUE_COD;

    /** 发行日期 */
    @Temporal(TemporalType.DATE)
    @Column(name = "ISSUE_DT")
    private Date ISSUE_DT;

    /** 债券名称 */
    @Column(name = "ISSUE_NAME", length = 200)
    private String ISSUE_NAME;

    /** 备注 */
    @Column(name = "RMAK", length = 200)
    private String RMAK;

    /** 是否上市 */
    @Column(name = "SH_FLG", length = 13)
    private String SH_FLG;

    /** 更新日期 */
    @Temporal(TemporalType.DATE)
    @Column(name = "UPDT")
    private Date UPDT;

    public Long getMXTID() {
        return MXTID;
    }

    public void setMXTID(Long mXTID) {
        MXTID = mXTID;
    }

    public String getBND_TYP() {
        return BND_TYP;
    }

    public void setBND_TYP(String bND_TYP) {
        BND_TYP = bND_TYP;
    }

    

    public String getBOURSENAME() {
        return BOURSENAME;
    }

    public void setBOURSENAME(String bOURSENAME) {
        BOURSENAME = bOURSENAME;
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

    public String getID() {
        return ID;
    }

    public void setID(String iD) {
        ID = iD;
    }

    public Date getINPUT_DT() {
        return INPUT_DT;
    }

    public void setINPUT_DT(Date iNPUT_DT) {
        INPUT_DT = iNPUT_DT;
    }

    public String getINPUT_INSTN() {
        return INPUT_INSTN;
    }

    public void setINPUT_INSTN(String iNPUT_INSTN) {
        INPUT_INSTN = iNPUT_INSTN;
    }

    public String getINPUT_USER() {
        return INPUT_USER;
    }

    public void setINPUT_USER(String iNPUT_USER) {
        INPUT_USER = iNPUT_USER;
    }

    

    public Integer getBND_YEAR() {
		return BND_YEAR;
	}

	public void setBND_YEAR(Integer bNDYEAR) {
		BND_YEAR = bNDYEAR;
	}

	public BigDecimal getINTR() {
		return INTR;
	}

	public void setINTR(BigDecimal iNTR) {
		INTR = iNTR;
	}

	public BigDecimal getISSUE_AMT() {
        return ISSUE_AMT;
    }

    public void setISSUE_AMT(BigDecimal iSSUE_AMT) {
        ISSUE_AMT = iSSUE_AMT;
    }

    public String getISSUE_COD() {
        return ISSUE_COD;
    }

    public void setISSUE_COD(String iSSUE_COD) {
        ISSUE_COD = iSSUE_COD;
    }

    public Date getISSUE_DT() {
        return ISSUE_DT;
    }

    public void setISSUE_DT(Date iSSUE_DT) {
        ISSUE_DT = iSSUE_DT;
    }

    public String getISSUE_NAME() {
        return ISSUE_NAME;
    }

    public void setISSUE_NAME(String iSSUE_NAME) {
        ISSUE_NAME = iSSUE_NAME;
    }

    public String getRMAK() {
        return RMAK;
    }

    public void setRMAK(String rMAK) {
        RMAK = rMAK;
    }

    public String getSH_FLG() {
        return SH_FLG;
    }

    public void setSH_FLG(String sH_FLG) {
        SH_FLG = sH_FLG;
    }

    public Date getUPDT() {
        return UPDT;
    }

    public void setUPDT(Date uPDT) {
        UPDT = uPDT;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}