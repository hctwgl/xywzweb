package com.xywz.asst.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;


/**
 * The persistent class for the xywz_asst_machg_mgmt_cst_follow database table.
 * 
 */
@Entity
@Table(name="xywz_asst_machg_mgmt_cst_follow")
public class XywzAsstMachgMgmtCstFollow implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private BigInteger id;

	@Column(name="ASST_MACHG_CONTCR")
	private String asstMachgContcr;

	@Column(name="ASST_MACHG_CONTCR_ID")
	private BigInteger asstMachgContcrId;

	@Column(name="ASST_MACHG_ID")
	private String asstMachgId;

	@Column(name="DTL_DESC")
	private String dtlDesc;

    @Temporal( TemporalType.DATE)
	@Column(name="FOLLOW_DT")
	private Date followDt;

	@Column(name="FOLLOW_MODE")
	private String followMode;

	@Column(name="FOLLOW_PERS_MEM")
	private String followPersMem;

	@Column(name="FOLLOW_PERS_MEM_ID")
	private String followPersMemId;

	@Column(name="IS_NT_CUST_INITV_CONT")
	private String isNtCustInitvCont;

	@Column(name="LABEL_INFO")
	private String labelInfo;

	@Column(name="MILESTONE")
	private String milestone;

	@Column(name="RSLT_CLS")
	private String rsltCls;

	@Column(name="SKETCH")
	private String sketch;

    public XywzAsstMachgMgmtCstFollow() {
    }

	public BigInteger getId() {
		return this.id;
	}

	public void setId(BigInteger id) {
		this.id = id;
	}

	public String getAsstMachgContcr() {
		return this.asstMachgContcr;
	}

	public void setAsstMachgContcr(String asstMachgContcr) {
		this.asstMachgContcr = asstMachgContcr;
	}

	public BigInteger getAsstMachgContcrId() {
		return this.asstMachgContcrId;
	}

	public void setAsstMachgContcrId(BigInteger asstMachgContcrId) {
		this.asstMachgContcrId = asstMachgContcrId;
	}

	public String getAsstMachgId() {
		return this.asstMachgId;
	}

	public void setAsstMachgId(String asstMachgId) {
		this.asstMachgId = asstMachgId;
	}

	public String getDtlDesc() {
		return this.dtlDesc;
	}

	public void setDtlDesc(String dtlDesc) {
		this.dtlDesc = dtlDesc;
	}

	public Date getFollowDt() {
		return this.followDt;
	}

	public void setFollowDt(Date followDt) {
		this.followDt = followDt;
	}

	public String getFollowMode() {
		return this.followMode;
	}

	public void setFollowMode(String followMode) {
		this.followMode = followMode;
	}

	public String getFollowPersMem() {
		return this.followPersMem;
	}

	public void setFollowPersMem(String followPersMem) {
		this.followPersMem = followPersMem;
	}

	public String getFollowPersMemId() {
		return this.followPersMemId;
	}

	public void setFollowPersMemId(String followPersMemId) {
		this.followPersMemId = followPersMemId;
	}

	public String getIsNtCustInitvCont() {
		return this.isNtCustInitvCont;
	}

	public void setIsNtCustInitvCont(String isNtCustInitvCont) {
		this.isNtCustInitvCont = isNtCustInitvCont;
	}

	public String getLabelInfo() {
		return this.labelInfo;
	}

	public void setLabelInfo(String labelInfo) {
		this.labelInfo = labelInfo;
	}

	public String getMilestone() {
		return this.milestone;
	}

	public void setMilestone(String milestone) {
		this.milestone = milestone;
	}

	public String getRsltCls() {
		return this.rsltCls;
	}

	public void setRsltCls(String rsltCls) {
		this.rsltCls = rsltCls;
	}

	public String getSketch() {
		return this.sketch;
	}

	public void setSketch(String sketch) {
		this.sketch = sketch;
	}

}