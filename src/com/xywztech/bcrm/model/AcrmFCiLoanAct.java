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
 * The persistent class for the ACRM_F_CI_LOAN_ACT database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_LOAN_ACT")
public class AcrmFCiLoanAct implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_LOAN_ACT_ACCOUNT_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_LOAN_ACT_ACCOUNT_GENERATOR")
	private String account;

	@Column(name="ACCOUNT_NAME")
	private String accountName;

	@Column(name="ACCOUNT_STAT")
	private String accountStat;

	@Column(name="AMOUNT")
	private BigDecimal amount;

	@Column(name="BEF_DEGREE_OF_CONTRIBUTION")
	private BigDecimal befDegreeOfContribution;

	@Column(name="CURR_FORMERLY")
	private BigDecimal currFormerly;

	@Column(name="CURRE_FIRM_INTEREST")
	private BigDecimal curreFirmInterest;

	@Column(name="CURRE_MUST_INTEREST")
	private BigDecimal curreMustInterest;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="EXCHANGE_RATE_MID_VALUE")
	private BigDecimal exchangeRateMidValue;

	@Column(name="FIVE_LEVEL_TYPE")
	private String fiveLevelType;

	private BigDecimal ftp;

    @Temporal( TemporalType.DATE)
	@Column(name="LOGOUT_ACCOUNT_DATE")
	private Date logoutAccountDate;

    @Temporal( TemporalType.DATE)
	@Column(name="MATURE_DATE")
	private Date matureDate;

	@Column(name="MONEY_TYPE")
	private String moneyType;

    @Temporal( TemporalType.DATE)
	@Column(name="OPEN_ACCOUNT_DATE")
	private Date openAccountDate;

    @Column(name="RATE")
	private BigDecimal rate;

	private Long sequence;

    @Temporal( TemporalType.DATE)
	@Column(name="START_INTER_DATE")
	private Date startInterDate;

    @Temporal( TemporalType.DATE)
	@Column(name="STAT_DATE")
	private Date statDate;

    @Column(name="SUBJECTS")
	private String subjects;

	@Column(name="WEB_POSIT_NAME")
	private String webPositName;

	@Column(name="YEAR_AVG_AMOUNT")
	private BigDecimal yearAvgAmount;

	@Column(name="YEAR_AVG_AMOUNT_ORG_MONEY_TYPE")
	private BigDecimal yearAvgAmountOrgMoneyType;
	
	@Column(name="SEASON_AVG_AMOUNT_USD")
	private BigDecimal seasonAvgAmountUsd;
	
	@Column(name="AMOUNT_USD")
	private BigDecimal amountUsd;
	
	@Column(name="BEF_DEGREE_CONTRI")
	private BigDecimal befDegreeContri;
	
	@Column(name="SEASON_AVG_AMOUNT_RMB")
	private BigDecimal seasonAvgAmountRmb;
	
	@Column(name="LC_MID_VALUE")
	private BigDecimal lcMidValue;
	
	@Column(name="MONTH_AVG_AMOUNT_USD")
	private BigDecimal monthAvgAmountUsd;
	
	@Column(name="MONTH_AVG_AMOUNT_RMB")
	private BigDecimal monthAvgAmountRmb;
	

	public BigDecimal getSeasonAvgAmountUsd() {
		return seasonAvgAmountUsd;
	}

	public void setSeasonAvgAmountUsd(BigDecimal seasonAvgAmountUsd) {
		this.seasonAvgAmountUsd = seasonAvgAmountUsd;
	}

	public BigDecimal getAmountUsd() {
		return amountUsd;
	}

	public void setAmountUsd(BigDecimal amountUsd) {
		this.amountUsd = amountUsd;
	}

	public BigDecimal getBefDegreeContri() {
		return befDegreeContri;
	}

	public void setBefDegreeContri(BigDecimal befDegreeContri) {
		this.befDegreeContri = befDegreeContri;
	}

	public BigDecimal getSeasonAvgAmountRmb() {
		return seasonAvgAmountRmb;
	}

	public void setSeasonAvgAmountRmb(BigDecimal seasonAvgAmountRmb) {
		this.seasonAvgAmountRmb = seasonAvgAmountRmb;
	}

	public BigDecimal getLcMidValue() {
		return lcMidValue;
	}

	public void setLcMidValue(BigDecimal lcMidValue) {
		this.lcMidValue = lcMidValue;
	}

	public BigDecimal getMonthAvgAmountUsd() {
		return monthAvgAmountUsd;
	}

	public void setMonthAvgAmountUsd(BigDecimal monthAvgAmountUsd) {
		this.monthAvgAmountUsd = monthAvgAmountUsd;
	}

	public BigDecimal getMonthAvgAmountRmb() {
		return monthAvgAmountRmb;
	}

	public void setMonthAvgAmountRmb(BigDecimal monthAvgAmountRmb) {
		this.monthAvgAmountRmb = monthAvgAmountRmb;
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

	public String getAccountStat() {
		return accountStat;
	}

	public void setAccountStat(String accountStat) {
		this.accountStat = accountStat;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getBefDegreeOfContribution() {
		return befDegreeOfContribution;
	}

	public void setBefDegreeOfContribution(BigDecimal befDegreeOfContribution) {
		this.befDegreeOfContribution = befDegreeOfContribution;
	}

	public BigDecimal getCurrFormerly() {
		return currFormerly;
	}

	public void setCurrFormerly(BigDecimal currFormerly) {
		this.currFormerly = currFormerly;
	}

	public BigDecimal getCurreFirmInterest() {
		return curreFirmInterest;
	}

	public void setCurreFirmInterest(BigDecimal curreFirmInterest) {
		this.curreFirmInterest = curreFirmInterest;
	}

	public BigDecimal getCurreMustInterest() {
		return curreMustInterest;
	}

	public void setCurreMustInterest(BigDecimal curreMustInterest) {
		this.curreMustInterest = curreMustInterest;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public BigDecimal getExchangeRateMidValue() {
		return exchangeRateMidValue;
	}

	public void setExchangeRateMidValue(BigDecimal exchangeRateMidValue) {
		this.exchangeRateMidValue = exchangeRateMidValue;
	}

	public String getFiveLevelType() {
		return fiveLevelType;
	}

	public void setFiveLevelType(String fiveLevelType) {
		this.fiveLevelType = fiveLevelType;
	}

	public BigDecimal getFtp() {
		return ftp;
	}

	public void setFtp(BigDecimal ftp) {
		this.ftp = ftp;
	}

	public Date getLogoutAccountDate() {
		return logoutAccountDate;
	}

	public void setLogoutAccountDate(Date logoutAccountDate) {
		this.logoutAccountDate = logoutAccountDate;
	}

	public Date getMatureDate() {
		return matureDate;
	}

	public void setMatureDate(Date matureDate) {
		this.matureDate = matureDate;
	}

	public String getMoneyType() {
		return moneyType;
	}

	public void setMoneyType(String moneyType) {
		this.moneyType = moneyType;
	}

	public Date getOpenAccountDate() {
		return openAccountDate;
	}

	public void setOpenAccountDate(Date openAccountDate) {
		this.openAccountDate = openAccountDate;
	}

	public BigDecimal getRate() {
		return rate;
	}

	public void setRate(BigDecimal rate) {
		this.rate = rate;
	}

	public Long getSequence() {
		return sequence;
	}

	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}

	public Date getStartInterDate() {
		return startInterDate;
	}

	public void setStartInterDate(Date startInterDate) {
		this.startInterDate = startInterDate;
	}

	public Date getStatDate() {
		return statDate;
	}

	public void setStatDate(Date statDate) {
		this.statDate = statDate;
	}

	public String getSubjects() {
		return subjects;
	}

	public void setSubjects(String subjects) {
		this.subjects = subjects;
	}

	public String getWebPositName() {
		return webPositName;
	}

	public void setWebPositName(String webPositName) {
		this.webPositName = webPositName;
	}

	public BigDecimal getYearAvgAmount() {
		return yearAvgAmount;
	}

	public void setYearAvgAmount(BigDecimal yearAvgAmount) {
		this.yearAvgAmount = yearAvgAmount;
	}

	public BigDecimal getYearAvgAmountOrgMoneyType() {
		return yearAvgAmountOrgMoneyType;
	}

	public void setYearAvgAmountOrgMoneyType(BigDecimal yearAvgAmountOrgMoneyType) {
		this.yearAvgAmountOrgMoneyType = yearAvgAmountOrgMoneyType;
	}
}