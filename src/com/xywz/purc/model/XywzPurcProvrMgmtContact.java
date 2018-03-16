package com.xywz.purc.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the xywz_purc_provr_mgmt_contact database table.
 * 
 */
@Entity
@Table(name="xywz_purc_provr_mgmt_contact")
public class XywzPurcProvrMgmtContact implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;

	@Column(name="ADDR")
	private String addr;

	@Column(name="BELG_DEPT")
	private String belgDept;

	@Column(name="FAX")
	private String fax;

	@Column(name="GENDER")
	private String gender;

	@Column(name="IS_NT_PRI_CONT")
	private String isNtPriCont;

	@Column(name="MAIL_ADDR")
	private String mailAddr;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MOBL")
	private String mobl;

	@Column(name="MSN")
	private String msn;

	@Column(name="NAME")
	private String name;

	@Column(name="OTH_INST_MSG")
	private String othInstMsg;

	@Column(name="OWN_PERS_NM")
	private String ownPersNm;

	@Column(name="POSTN")
	private String postn;

	@Column(name="PROVR_NUM")
	private String provrNum;

	@Column(name="QQ")
	private String qq;

	@Column(name="SALU")
	private String salu;

    @Temporal( TemporalType.DATE)
	@Column(name="SETUP_DT")
	private Date setupDt;

	@Column(name="SKYPE")
	private String skype;

	@Column(name="TEL")
	private String tel;

	@Column(name="TEL2")
	private String tel2;

	@Column(name="ZIP_CD")
	private String zipCd;

    public XywzPurcProvrMgmtContact() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddr() {
		return this.addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getBelgDept() {
		return this.belgDept;
	}

	public void setBelgDept(String belgDept) {
		this.belgDept = belgDept;
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

	public String getIsNtPriCont() {
		return this.isNtPriCont;
	}

	public void setIsNtPriCont(String isNtPriCont) {
		this.isNtPriCont = isNtPriCont;
	}

	public String getMailAddr() {
		return this.mailAddr;
	}

	public void setMailAddr(String mailAddr) {
		this.mailAddr = mailAddr;
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

	public String getMsn() {
		return this.msn;
	}

	public void setMsn(String msn) {
		this.msn = msn;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOthInstMsg() {
		return this.othInstMsg;
	}

	public void setOthInstMsg(String othInstMsg) {
		this.othInstMsg = othInstMsg;
	}

	public String getOwnPersNm() {
		return this.ownPersNm;
	}

	public void setOwnPersNm(String ownPersNm) {
		this.ownPersNm = ownPersNm;
	}

	public String getPostn() {
		return this.postn;
	}

	public void setPostn(String postn) {
		this.postn = postn;
	}

	public String getProvrNum() {
		return this.provrNum;
	}

	public void setProvrNum(String provrNum) {
		this.provrNum = provrNum;
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

	public Date getSetupDt() {
		return this.setupDt;
	}

	public void setSetupDt(Date setupDt) {
		this.setupDt = setupDt;
	}

	public String getSkype() {
		return this.skype;
	}

	public void setSkype(String skype) {
		this.skype = skype;
	}

	public String getTel() {
		return this.tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getTel2() {
		return this.tel2;
	}

	public void setTel2(String tel2) {
		this.tel2 = tel2;
	}

	public String getZipCd() {
		return this.zipCd;
	}

	public void setZipCd(String zipCd) {
		this.zipCd = zipCd;
	}

}