package com.xywz.purc.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the xywz_purc_provr_mgmt_bank database table.
 * 
 */
@Entity
@Table(name="xywz_purc_provr_mgmt_bank")
public class XywzPurcProvrMgmtBank implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;

	@Column(name="ACCT_NUM")
	private String acctNum;

	@Column(name="BANK_ADDR")
	private String bankAddr;

	@Column(name="BANK_FULL_NM")
	private String bankFullNm;

	@Column(name="BANK_TEL")
	private String bankTel;

	@Column(name="BFCY")
	private String bfcy;

	@Column(name="EN_FST_NM")
	private String enFstNm;

	@Column(name="MEMO")
	private String memo;

	@Column(name="OPEN_ACCT_FST_NM")
	private String openAcctFstNm;

	@Column(name="PROVR_NUM")
	private String provrNum;

    public XywzPurcProvrMgmtBank() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAcctNum() {
		return this.acctNum;
	}

	public void setAcctNum(String acctNum) {
		this.acctNum = acctNum;
	}

	public String getBankAddr() {
		return this.bankAddr;
	}

	public void setBankAddr(String bankAddr) {
		this.bankAddr = bankAddr;
	}

	public String getBankFullNm() {
		return this.bankFullNm;
	}

	public void setBankFullNm(String bankFullNm) {
		this.bankFullNm = bankFullNm;
	}

	public String getBankTel() {
		return this.bankTel;
	}

	public void setBankTel(String bankTel) {
		this.bankTel = bankTel;
	}

	public String getBfcy() {
		return this.bfcy;
	}

	public void setBfcy(String bfcy) {
		this.bfcy = bfcy;
	}

	public String getEnFstNm() {
		return this.enFstNm;
	}

	public void setEnFstNm(String enFstNm) {
		this.enFstNm = enFstNm;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getOpenAcctFstNm() {
		return this.openAcctFstNm;
	}

	public void setOpenAcctFstNm(String openAcctFstNm) {
		this.openAcctFstNm = openAcctFstNm;
	}

	public String getProvrNum() {
		return this.provrNum;
	}

	public void setProvrNum(String provrNum) {
		this.provrNum = provrNum;
	}

}