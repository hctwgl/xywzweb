package com.xywz.para.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the xywz_para_bank database table.
 * 
 */
@Entity
@Table(name="xywz_para_bank")
public class XywzParaBank implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="BANK_ID")
	private Long bankId;

	@Column(name="BANK_ADDR")
	private String bankAddr;

	@Column(name="BANK_FULL_NM")
	private String bankFullNm;

	@Column(name="BANK_TEL")
	private String bankTel;

	@Column(name="SWIFT_CODE")
	private String swiftCode;
	
	@Column(name="ACCOUNT")
	private String account;

	@Column(name="MEMO")
	private String memo;

    public XywzParaBank() {
    }

	public Long getBankId() {
		return this.bankId;
	}

	public void setBankId(Long bankId) {
		this.bankId = bankId;
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

	public String getSwiftCode() {
		return this.swiftCode;
	}

	public void setSwiftCode(String swiftCode) {
		this.swiftCode = swiftCode;
	}
	
	public String getAccount() {
		return this.account;
	}

	public void setAccount(String account) {
		this.account = account;
	}
	
	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

}