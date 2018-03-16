package com.xywztech.bcrm.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the ACRM_F_NI_COLL_PAY_INSURANCE database table.
 * 
 */
@Entity
@Table(name="ACRM_F_NI_COLL_PAY_INSURANCE")
public class AcrmFNiCollPayInsurance implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_NI_COLL_PAY_INSURANCE_AGREEMENTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_NI_COLL_PAY_INSURANCE_AGREEMENTID_GENERATOR")
	@Column(name="AGREEMENT_ID",unique=true, nullable=false)
	private Long agreementId;

	@Column(name="ACCOUNT")
	private String account;

	@Column(name="ACCOUNT_NAME")
	private String accountName;

    @Temporal( TemporalType.DATE)
	@Column(name="BUY_DATE")
	private Date buyDate;

	@Column(name="CUST_BUY_COUNT")
	private BigDecimal custBuyCount;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="CUST_NO")
	private String custNo;

	@Column(name="IS_OPEN")
	private String isOpen;

	@Column(name="MONEY")
	private BigDecimal money;

	@Column(name="PAY_TYP")
	private String payTyp;

	public Long getAgreementId() {
		return agreementId;
	}

	public void setAgreementId(Long agreementId) {
		this.agreementId = agreementId;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public Date getBuyDate() {
		return buyDate;
	}

	public void setBuyDate(Date buyDate) {
		this.buyDate = buyDate;
	}

	public BigDecimal getCustBuyCount() {
		return custBuyCount;
	}

	public void setCustBuyCount(BigDecimal custBuyCount) {
		this.custBuyCount = custBuyCount;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustNo() {
		return custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}

	public String getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(String isOpen) {
		this.isOpen = isOpen;
	}

	public BigDecimal getMoney() {
		return money;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}

	public String getPayTyp() {
		return payTyp;
	}

	public void setPayTyp(String payTyp) {
		this.payTyp = payTyp;
	}
}