package com.xywztech.bcrm.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_CI_BAD_CUST_SUMMARY database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_BAD_CUST_SUMMARY")
public class OcrmFCiBadCustSummary implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_BAD_CUST_SUMMARY_YEARMONTH_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_BAD_CUST_SUMMARY_YEARMONTH_GENERATOR")
	@Column(name="YEAR_MONTH", unique=true, nullable=false, length=6)
	private String yearMonth;

	@Column(name="BAD_LOAN_BALANCE", precision=24, scale=6)
	private BigDecimal badLoanBalance;

	@Column(name="CURRE_COLLECTION_DESC", length=800)
	private String curreCollectionDesc;

	@Column(name="CUST_ID", nullable=false, length=21)
	private String custId;

	@Column(name="CUST_NAME", length=200)
	private String custName;

	@Column(name="TEN_LEVEL_STAT", length=13)
	private String tenLevelStat;

    public OcrmFCiBadCustSummary() {
    }

	public String getYearMonth() {
		return this.yearMonth;
	}

	public void setYearMonth(String yearMonth) {
		this.yearMonth = yearMonth;
	}

	public BigDecimal getBadLoanBalance() {
		return this.badLoanBalance;
	}

	public void setBadLoanBalance(BigDecimal badLoanBalance) {
		this.badLoanBalance = badLoanBalance;
	}

	public String getCurreCollectionDesc() {
		return this.curreCollectionDesc;
	}

	public void setCurreCollectionDesc(String curreCollectionDesc) {
		this.curreCollectionDesc = curreCollectionDesc;
	}

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getTenLevelStat() {
		return this.tenLevelStat;
	}

	public void setTenLevelStat(String tenLevelStat) {
		this.tenLevelStat = tenLevelStat;
	}

}