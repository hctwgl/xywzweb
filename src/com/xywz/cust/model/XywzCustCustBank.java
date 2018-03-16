package com.xywz.cust.model;


import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;


/**
 * The persistent class for the xywz_cust_custbank database table.
 * 
 */
@Entity
@Table(name="xywz_cust_custbank")
public class XywzCustCustBank implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="CUST_BANK_ID")
	private Long custBankId;
	
	@Column(name="CUST_ID")
	private BigInteger custId;
	
	@Column(name="BANK_ID")
	private BigInteger bankId;

	@Column(name="ACCT_NUM")
	private String acctNum;
	
	@Column(name="CUST_TAX")
	private String custTax;
	
	@Column(name="MEMO")
	private String memo;
	
	@Column(name="BANK_FULL_NM")
	private String bankFullNm;

	@Column(name="BANK_ADDR")
	private String bankAddr;	

	@Column(name="BANK_TEL")
	private String bankTel;
	
	@Column(name="SWIFT_CODE")
	private String swiftCode;

	@Column(name="FAX")
	private String fax;

	

    public XywzCustCustBank() {
    }

	public Long getCustBankId() {
		return this.custBankId;
	}

	public void setCustBankId(Long custBankId) {
		this.custBankId = custBankId;
	}
	
	public BigInteger getCustId() {
		return this.custId;
	}

	public void setCustId(BigInteger custId) {
		this.custId = custId;
	}
	
	public BigInteger getBankId() {
		return this.bankId;
	}

	public void setBankId(BigInteger bankId) {
		this.bankId = bankId;
	}
	
	public String getAcctNum() {
		return this.acctNum;
	}

	public void setAcctNum(String acctNum) {
		this.acctNum = acctNum;
	}
	
	public String getBankFullNm() {
		return this.bankFullNm;
	}

	public void setBankFullNm(String bankFullNm) {
		this.bankFullNm = bankFullNm;
	}
	
	public String getBankAddr() {
		return this.bankAddr;
	}

	public void setBankAddr(String bankAddr) {
		this.bankAddr = bankAddr;
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

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public void setCustTax(String custTax) {
		this.custTax = custTax;
	}

	public String getCustTax() {
		return custTax;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMemo() {
		return memo;
	}
}