package com.xywz.asst.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;


/**
 * The persistent class for the XYWZ_ASST_MACHG_CONTCR_MGMT database table.
 * 
 */
@Entity
@Table(name="XYWZ_ASST_MACHG_CONTCR_MGMT")
public class XywzAsstMachgContcrMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="CONTCR_ID")
	private Long contcrId;

	@Column(name="ADDR")
	private String addr;

	@Column(name="ASST_MACHG_ID")
	private String asstMachgId;

	@Column(name="ASST_MACHG_PRI_PICTURE")
	private String asstMachgPriPicture;

	@Column(name="BELG_DEPT")
	private String belgDept;

	@Column(name="CONTCR_MAIL_ADDR")
	private String contcrMailAddr;

	@Column(name="FAX")
	private String fax;

	@Column(name="FST_NM")
	private String fstNm;

	@Column(name="GENDER")
	private String gender;

	@Column(name="IS_NT_PRI_CONT")
	private String isNtPriCont;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MOBL")
	private String mobl;

	@Column(name="MSN")
	private String msn;

	@Column(name="OTH_INST_MSG")
	private String othInstMsg;

	@Column(name="OWN_PERS_NM")
	private String ownPersNm;

	@Column(name="POSTN")
	private String postn;

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

    public XywzAsstMachgContcrMgmt() {
    }

	public Long getContcrId() {
		return this.contcrId;
	}

	public void setContcrId(Long contcrId) {
		this.contcrId = contcrId;
	}

	public String getAddr() {
		return this.addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getAsstMachgId() {
		return this.asstMachgId;
	}

	public void setAsstMachgId(String asstMachgId) {
		this.asstMachgId = asstMachgId;
	}

	public String getAsstMachgPriPicture() {
		return this.asstMachgPriPicture;
	}

	public void setAsstMachgPriPicture(String asstMachgPriPicture) {
		this.asstMachgPriPicture = asstMachgPriPicture;
	}

	public String getBelgDept() {
		return this.belgDept;
	}

	public void setBelgDept(String belgDept) {
		this.belgDept = belgDept;
	}

	public String getContcrMailAddr() {
		return this.contcrMailAddr;
	}

	public void setContcrMailAddr(String contcrMailAddr) {
		this.contcrMailAddr = contcrMailAddr;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getFstNm() {
		return this.fstNm;
	}

	public void setFstNm(String fstNm) {
		this.fstNm = fstNm;
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