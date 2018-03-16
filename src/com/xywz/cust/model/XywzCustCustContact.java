package com.xywz.cust.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;


/**
 * The persistent class for the xywz_cust_custcontact database table.
 * 
 */
@Entity
@Table(name="xywz_cust_custcontact")
public class XywzCustCustContact implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="CUST_CONTCR_ID")
	private Long custContcrId;

	@Column(name="ADDR")
	private String addr;

	@Column(name="BIZ_MEM")
	private String bizMem;

	@Column(name="CTY")
	private String cty;

	@Column(name="CUST_ID")
	private BigInteger custId;

	@Column(name="CUST_PHT")
	private String custPht;

	@Column(name="DEPT")
	private String dept;

	@Column(name="FAX")
	private String fax;

	@Column(name="GENDER")
	private String gender;

	@Column(name="IMPT_DEGR")
	private String imptDegr;

	@Column(name="INTEREST")
	private String interest;

	@Column(name="IS_NT_PRI_CONTCR")
	private String isNtPriContcr;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MOBL")
	private String mobl;

	@Column(name="PERS_FST_NM")
	private String persFstNm;

	@Column(name="POSTN")
	private String postn;

	@Column(name="QQ")
	private String qq;

	@Column(name="SALU")
	private String salu;

	@Column(name="SETUP_TM")
	private String setupTm;

	@Column(name="SKYPE")
	private String skype;

	@Column(name="TEL1")
	private String tel1;

	@Column(name="TEL2")
	private String tel2;

	@Column(name="WECHAT")
	private String wechat;

	@Column(name="ZIP_CD")
	private String zipCd;

    public XywzCustCustContact() {
    }

	public Long getCustContcrId() {
		return this.custContcrId;
	}

	public void setCustContcrId(Long custContcrId) {
		this.custContcrId = custContcrId;
	}

	public String getAddr() {
		return this.addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getBizMem() {
		return this.bizMem;
	}

	public void setBizMem(String bizMem) {
		this.bizMem = bizMem;
	}

	public String getCty() {
		return this.cty;
	}

	public void setCty(String cty) {
		this.cty = cty;
	}

	public BigInteger getCustId() {
		return this.custId;
	}

	public void setCustId(BigInteger custId) {
		this.custId = custId;
	}

	public String getCustPht() {
		return this.custPht;
	}

	public void setCustPht(String custPht) {
		this.custPht = custPht;
	}

	public String getDept() {
		return this.dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getGender() {
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getImptDegr() {
		return this.imptDegr;
	}

	public void setImptDegr(String imptDegr) {
		this.imptDegr = imptDegr;
	}

	public String getInterest() {
		return this.interest;
	}

	public void setInterest(String interest) {
		this.interest = interest;
	}

	public String getIsNtPriContcr() {
		return this.isNtPriContcr;
	}

	public void setIsNtPriContcr(String isNtPriContcr) {
		this.isNtPriContcr = isNtPriContcr;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMobl() {
		return this.mobl;
	}

	public void setMobl(String mobl) {
		this.mobl = mobl;
	}

	public String getPersFstNm() {
		return this.persFstNm;
	}

	public void setPersFstNm(String persFstNm) {
		this.persFstNm = persFstNm;
	}

	public String getPostn() {
		return this.postn;
	}

	public void setPostn(String postn) {
		this.postn = postn;
	}

	public String getQq() {
		return this.qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getSalu() {
		return this.salu;
	}

	public void setSalu(String salu) {
		this.salu = salu;
	}

	public String getSetupTm() {
		return this.setupTm;
	}

	public void setSetupTm(String setupTm) {
		this.setupTm = setupTm;
	}

	public String getSkype() {
		return this.skype;
	}

	public void setSkype(String skype) {
		this.skype = skype;
	}

	public String getTel1() {
		return this.tel1;
	}

	public void setTel1(String tel1) {
		this.tel1 = tel1;
	}

	public String getTel2() {
		return this.tel2;
	}

	public void setTel2(String tel2) {
		this.tel2 = tel2;
	}

	public String getWechat() {
		return this.wechat;
	}

	public void setWechat(String wechat) {
		this.wechat = wechat;
	}

	public String getZipCd() {
		return this.zipCd;
	}

	public void setZipCd(String zipCd) {
		this.zipCd = zipCd;
	}

}