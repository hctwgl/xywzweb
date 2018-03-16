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
 * The persistent class for the ACRM_F_NI_FINANCING database table.
 * 
 */
@Entity
@Table(name="ACRM_F_NI_FINANCING")
public class AcrmFNiFinancing implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_NI_FINANCING_AGREEMENTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_NI_FINANCING_AGREEMENTID_GENERATOR")
	@Column(name="AGREEMENT_ID",unique=true, nullable=false)
	private Long agreementId;

	private String account;

    @Temporal( TemporalType.DATE)
	@Column(name="BUY_DATE")
	private Date buyDate;

	@Column(name="CNCY")
	private String cncy;

	@Column(name="CURRE_AMOUNT")
	private BigDecimal curreAmount;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="CUST_NO")
	private String custNo;

    @Temporal( TemporalType.DATE)
	@Column(name="END_DATE")
	private Date endDate;

	@Column(name="PRD_TYP")
	private Long prdTyp;

	@Column(name="PRE_INCOME")
	private BigDecimal preIncome;

    @Temporal( TemporalType.DATE)
	@Column(name="START_DATE")
	private Date startDate;

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

	public Date getBuyDate() {
		return buyDate;
	}

	public void setBuyDate(Date buyDate) {
		this.buyDate = buyDate;
	}

	public String getCncy() {
		return cncy;
	}

	public void setCncy(String cncy) {
		this.cncy = cncy;
	}

	public BigDecimal getCurreAmount() {
		return curreAmount;
	}

	public void setCurreAmount(BigDecimal curreAmount) {
		this.curreAmount = curreAmount;
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

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Long getPrdTyp() {
		return prdTyp;
	}

	public void setPrdTyp(Long prdTyp) {
		this.prdTyp = prdTyp;
	}

	public BigDecimal getPreIncome() {
		return preIncome;
	}

	public void setPreIncome(BigDecimal preIncome) {
		this.preIncome = preIncome;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
}