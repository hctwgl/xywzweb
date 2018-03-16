package com.xywz.purc.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;


/**
 * The persistent class for the xywz_purc_provr_mgmt_cst_follow database table.
 * 
 */
@Entity
@Table(name="xywz_purc_provr_mgmt_cst_follow")
public class XywzPurcProvrMgmtCstFollow implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;

	@Column(name="DTL_DESC")
	private String dtlDesc;

	@Column(name="IS_NT_CUST_INITV_CONT")
	private String isNtCustInitvCont;

	@Column(name="MILEPOST")
	private String milepost;

    @Temporal( TemporalType.DATE)
	@Column(name="PERS_DT")
	private Date persDt;

	@Column(name="PERS_MEM")
	private String persMem;

	@Column(name="PERS_MEM_ID")
	private String persMemId;

	@Column(name="PERS_MODE")
	private String persMode;

	@Column(name="PROVR_CONTCR")
	private String provrContcr;

	@Column(name="PROVR_CONTCR_ID")
	private BigInteger provrContcrId;

	@Column(name="PROVR_NUM")
	private String provrNum;

	@Column(name="RSLT_CLS")
	private String rsltCls;

	@Column(name="SIGN_INFO")
	private String signInfo;

	@Column(name="SKETCH")
	private String sketch;

    public XywzPurcProvrMgmtCstFollow() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDtlDesc() {
		return this.dtlDesc;
	}

	public void setDtlDesc(String dtlDesc) {
		this.dtlDesc = dtlDesc;
	}

	public String getIsNtCustInitvCont() {
		return this.isNtCustInitvCont;
	}

	public void setIsNtCustInitvCont(String isNtCustInitvCont) {
		this.isNtCustInitvCont = isNtCustInitvCont;
	}

	public String getMilepost() {
		return this.milepost;
	}

	public void setMilepost(String milepost) {
		this.milepost = milepost;
	}

	public Date getPersDt() {
		return this.persDt;
	}

	public void setPersDt(Date persDt) {
		this.persDt = persDt;
	}

	public String getPersMem() {
		return this.persMem;
	}

	public void setPersMem(String persMem) {
		this.persMem = persMem;
	}

	public String getPersMemId() {
		return this.persMemId;
	}

	public void setPersMemId(String persMemId) {
		this.persMemId = persMemId;
	}

	public String getPersMode() {
		return this.persMode;
	}

	public void setPersMode(String persMode) {
		this.persMode = persMode;
	}

	public String getProvrContcr() {
		return this.provrContcr;
	}

	public void setProvrContcr(String provrContcr) {
		this.provrContcr = provrContcr;
	}

	public BigInteger getProvrContcrId() {
		return this.provrContcrId;
	}

	public void setProvrContcrId(BigInteger provrContcrId) {
		this.provrContcrId = provrContcrId;
	}

	public String getProvrNum() {
		return this.provrNum;
	}

	public void setProvrNum(String provrNum) {
		this.provrNum = provrNum;
	}

	public String getRsltCls() {
		return this.rsltCls;
	}

	public void setRsltCls(String rsltCls) {
		this.rsltCls = rsltCls;
	}

	public String getSignInfo() {
		return this.signInfo;
	}

	public void setSignInfo(String signInfo) {
		this.signInfo = signInfo;
	}

	public String getSketch() {
		return this.sketch;
	}

	public void setSketch(String sketch) {
		this.sketch = sketch;
	}

}