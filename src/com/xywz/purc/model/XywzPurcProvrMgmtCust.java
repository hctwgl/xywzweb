package com.xywz.purc.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the xywz_purc_provr_mgmt_cust database table.
 * 
 */
@Entity
@Table(name="xywz_purc_provr_mgmt_cust")
public class XywzPurcProvrMgmtCust implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PROVR_ID")
	private Long provrId;

	@Column(name="ADDR")
	private String addr;

	@Column(name="CURR_STP")
	private String currStp;

	@Column(name="FAX")
	private String fax;

	@Column(name="FINAL_MDFR")
	private String finalMdfr;

	@Column(name="FINAL_MDFR_ID")
	private String finalMdfrId;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="INPUT_PERS")
	private String inputPers;

	@Column(name="INPUT_PERS_ID")
	private String inputPersId;

    @Temporal( TemporalType.DATE)
	@Column(name="LAST_MODI_DT")
	private Date lastModiDt;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MKT_SCOP")
	private String mktScop;

	@Column(name="OWN_PERS_NM")
	private String ownPersNm;

	@Column(name="PROD_SCOP")
	private String prodScop;

	@Column(name="PROVR_FULL_NM")
	private String provrFullNm;

	@Column(name="PROVR_NUM")
	private String provrNum;

	@Column(name="PROVR_SHT_NM")
	private String provrShtNm;

	@Column(name="PROVR_SRC")
	private String provrSrc;

	@Column(name="PROVR_STAT")
	private String provrStat;

	@Column(name="PROVR_TYP")
	private String provrTyp;

    @Temporal( TemporalType.DATE)
	@Column(name="SETUP_DT")
	private Date setupDt;

	@Column(name="TEL")
	private String tel;

    public XywzPurcProvrMgmtCust() {
    }

	public Long getProvrId() {
		return this.provrId;
	}

	public void setProvrId(Long provrId) {
		this.provrId = provrId;
	}

	public String getAddr() {
		return this.addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getCurrStp() {
		return this.currStp;
	}

	public void setCurrStp(String currStp) {
		this.currStp = currStp;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getFinalMdfr() {
		return this.finalMdfr;
	}

	public void setFinalMdfr(String finalMdfr) {
		this.finalMdfr = finalMdfr;
	}

	public String getFinalMdfrId() {
		return this.finalMdfrId;
	}

	public void setFinalMdfrId(String finalMdfrId) {
		this.finalMdfrId = finalMdfrId;
	}

	public Date getInputDt() {
		return this.inputDt;
	}

	public void setInputDt(Date inputDt) {
		this.inputDt = inputDt;
	}

	public String getInputPers() {
		return this.inputPers;
	}

	public void setInputPers(String inputPers) {
		this.inputPers = inputPers;
	}

	public String getInputPersId() {
		return this.inputPersId;
	}

	public void setInputPersId(String inputPersId) {
		this.inputPersId = inputPersId;
	}

	public Date getLastModiDt() {
		return this.lastModiDt;
	}

	public void setLastModiDt(Date lastModiDt) {
		this.lastModiDt = lastModiDt;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMktScop() {
		return this.mktScop;
	}

	public void setMktScop(String mktScop) {
		this.mktScop = mktScop;
	}

	public String getOwnPersNm() {
		return this.ownPersNm;
	}

	public void setOwnPersNm(String ownPersNm) {
		this.ownPersNm = ownPersNm;
	}

	public String getProdScop() {
		return this.prodScop;
	}

	public void setProdScop(String prodScop) {
		this.prodScop = prodScop;
	}

	public String getProvrFullNm() {
		return this.provrFullNm;
	}

	public void setProvrFullNm(String provrFullNm) {
		this.provrFullNm = provrFullNm;
	}

	public String getProvrNum() {
		return this.provrNum;
	}

	public void setProvrNum(String provrNum) {
		this.provrNum = provrNum;
	}

	public String getProvrShtNm() {
		return this.provrShtNm;
	}

	public void setProvrShtNm(String provrShtNm) {
		this.provrShtNm = provrShtNm;
	}

	public String getProvrSrc() {
		return this.provrSrc;
	}

	public void setProvrSrc(String provrSrc) {
		this.provrSrc = provrSrc;
	}

	public String getProvrStat() {
		return this.provrStat;
	}

	public void setProvrStat(String provrStat) {
		this.provrStat = provrStat;
	}

	public String getProvrTyp() {
		return this.provrTyp;
	}

	public void setProvrTyp(String provrTyp) {
		this.provrTyp = provrTyp;
	}

	public Date getSetupDt() {
		return this.setupDt;
	}

	public void setSetupDt(Date setupDt) {
		this.setupDt = setupDt;
	}

	public String getTel() {
		return this.tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

}