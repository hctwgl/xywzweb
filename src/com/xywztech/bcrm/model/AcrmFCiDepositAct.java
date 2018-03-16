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
 * The persistent class for the ACRM_F_CI_DEPOSIT_ACT database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_DEPOSIT_ACT")
public class AcrmFCiDepositAct implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_DEPOSIT_ACT_ACCOUNT_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_DEPOSIT_ACT_ACCOUNT_GENERATOR")
	private String account;

	@Column(name="ACCOUNT_STAT")
	private String accountStat;

	@Column(name="ACCT_NAME")
	private String acctName;

	@Column(name="ACCT_TYPE")
	private String acctType;

	private BigDecimal amount;

	@Column(name="AMOUNT_ORG_MONEY_TYPE")
	private BigDecimal amountOrgMoneyType;

	@Column(name="AMOUNT_USD")
	private BigDecimal amountUsd;

    @Temporal( TemporalType.DATE)
	@Column(name="CACULATE_DATE")
	private Date caculateDate;

    @Column(name="CURR")
	private String curr;

	@Column(name="CURRE_FIRM_INTEREST")
	private BigDecimal curreFirmInterest;

	@Column(name="CURRE_MUST_INTEREST")
	private BigDecimal curreMustInterest;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="EXCHANGE_RATE_MID_VALUE")
	private BigDecimal exchangeRateMidValue;

	@Column(name="FTP")
	private BigDecimal ftp;

	@Column(name="INNER_CODE_CRM")
	private String innerCodeCrm;

    @Temporal( TemporalType.DATE)
	@Column(name="LOGOUT_ACCOUNT_DATE")
	private Date logoutAccountDate;

    @Temporal( TemporalType.DATE)
	@Column(name="MATURE_DATE")
	private Date matureDate;

	@Column(name="MONTH_AVG_AMOUNT")
	private BigDecimal monthAvgAmount;

	@Column(name="MONTH_AVG_AMOUNT_ORG_MONEY_TYP")
	private BigDecimal monthAvgAmountOrgMoneyTyp;

    @Temporal( TemporalType.DATE)
	@Column(name="OPEN_ACCOUNT_DATE")
	private Date openAccountDate;

	@Column(name="OUTER_CODE_CEN")
	private String outerCodeCen;

	@Column(name="RATE")
	private BigDecimal rate;

	@Column(name="SEASON_AVG_AMOUNT")
	private BigDecimal seasonAvgAmount;

	@Column(name="SEASON_AVG_AMOUNT_ORG_MONEY_TY")
	private BigDecimal seasonAvgAmountOrgMoneyTy;

	@Column(name="SEASON_AVG_AMOUNT_USD")
	private BigDecimal seasonAvgAmountUsd;

	private String sequence;

    @Temporal( TemporalType.DATE)
	@Column(name="START_INTER_DATE")
	private Date startInterDate;

	@Column(name="WEB_POSIT_NAME")
	private String webPositName;

	@Column(name="YEAR_AVG_AMOUNT")
	private BigDecimal yearAvgAmount;

	@Column(name="YEAR_AVG_AMOUNT_ORG_MONEY_TYPE")
	private BigDecimal yearAvgAmountOrgMoneyType;

	@Column(name="YEAR_AVG_AMOUNT_USD")
	private BigDecimal yearAvgAmountUsd;
	
	@Column(name="AMOUNT_ORG_MONEY")
	private BigDecimal amountOrgMoney;

	@Column(name="MONTH_AVG_AMT_ORG")
	private BigDecimal monthAvgAmtOrg;
	
	@Column(name="MONTH_AVG_AMOUNT_USD")
	private BigDecimal monthAvgAmountUsd;
	
	@Column(name="SEASON_AVG_AMT_ORG")
	private BigDecimal seasonAvgAmtOrg;
	
	@Column(name="EXRATE_MID_VALUE")
	private BigDecimal exrateMidValue;
	
	public BigDecimal getAmountOrgMoney() {
		return amountOrgMoney;
	}

	public void setAmountOrgMoney(BigDecimal amountOrgMoney) {
		this.amountOrgMoney = amountOrgMoney;
	}

	public BigDecimal getMonthAvgAmtOrg() {
		return monthAvgAmtOrg;
	}

	public void setMonthAvgAmtOrg(BigDecimal monthAvgAmtOrg) {
		this.monthAvgAmtOrg = monthAvgAmtOrg;
	}

	public BigDecimal getMonthAvgAmountUsd() {
		return monthAvgAmountUsd;
	}

	public void setMonthAvgAmountUsd(BigDecimal monthAvgAmountUsd) {
		this.monthAvgAmountUsd = monthAvgAmountUsd;
	}

	public BigDecimal getSeasonAvgAmtOrg() {
		return seasonAvgAmtOrg;
	}

	public void setSeasonAvgAmtOrg(BigDecimal seasonAvgAmtOrg) {
		this.seasonAvgAmtOrg = seasonAvgAmtOrg;
	}

	public BigDecimal getExrateMidValue() {
		return exrateMidValue;
	}

	public void setExrateMidValue(BigDecimal exrateMidValue) {
		this.exrateMidValue = exrateMidValue;
	}

	public BigDecimal getYearAvgAmtOrg() {
		return yearAvgAmtOrg;
	}

	public void setYearAvgAmtOrg(BigDecimal yearAvgAmtOrg) {
		this.yearAvgAmtOrg = yearAvgAmtOrg;
	}

	public BigDecimal getSeasonAvgAmtUsd() {
		return seasonAvgAmtUsd;
	}

	public void setSeasonAvgAmtUsd(BigDecimal seasonAvgAmtUsd) {
		this.seasonAvgAmtUsd = seasonAvgAmtUsd;
	}

	@Column(name="YEAR_AVG_AMT_ORG")
	private BigDecimal yearAvgAmtOrg;
	
	@Column(name="SEASON_AVG_AMT_USD")
	private BigDecimal seasonAvgAmtUsd;
	
	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getAccountStat() {
		return accountStat;
	}

	public void setAccountStat(String accountStat) {
		this.accountStat = accountStat;
	}

	public String getAcctName() {
		return acctName;
	}

	public void setAcctName(String acctName) {
		this.acctName = acctName;
	}

	public String getAcctType() {
		return acctType;
	}

	public void setAcctType(String acctType) {
		this.acctType = acctType;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getAmountOrgMoneyType() {
		return amountOrgMoneyType;
	}

	public void setAmountOrgMoneyType(BigDecimal amountOrgMoneyType) {
		this.amountOrgMoneyType = amountOrgMoneyType;
	}

	public BigDecimal getAmountUsd() {
		return amountUsd;
	}

	public void setAmountUsd(BigDecimal amountUsd) {
		this.amountUsd = amountUsd;
	}

	public Date getCaculateDate() {
		return caculateDate;
	}

	public void setCaculateDate(Date caculateDate) {
		this.caculateDate = caculateDate;
	}

	public String getCurr() {
		return curr;
	}

	public void setCurr(String curr) {
		this.curr = curr;
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

	public BigDecimal getFtp() {
		return ftp;
	}

	public void setFtp(BigDecimal ftp) {
		this.ftp = ftp;
	}

	public String getInnerCodeCrm() {
		return innerCodeCrm;
	}

	public void setInnerCodeCrm(String innerCodeCrm) {
		this.innerCodeCrm = innerCodeCrm;
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

	public BigDecimal getMonthAvgAmount() {
		return monthAvgAmount;
	}

	public void setMonthAvgAmount(BigDecimal monthAvgAmount) {
		this.monthAvgAmount = monthAvgAmount;
	}

	public BigDecimal getMonthAvgAmountOrgMoneyTyp() {
		return monthAvgAmountOrgMoneyTyp;
	}

	public void setMonthAvgAmountOrgMoneyTyp(BigDecimal monthAvgAmountOrgMoneyTyp) {
		this.monthAvgAmountOrgMoneyTyp = monthAvgAmountOrgMoneyTyp;
	}

	public Date getOpenAccountDate() {
		return openAccountDate;
	}

	public void setOpenAccountDate(Date openAccountDate) {
		this.openAccountDate = openAccountDate;
	}

	public String getOuterCodeCen() {
		return outerCodeCen;
	}

	public void setOuterCodeCen(String outerCodeCen) {
		this.outerCodeCen = outerCodeCen;
	}

	public BigDecimal getRate() {
		return rate;
	}

	public void setRate(BigDecimal rate) {
		this.rate = rate;
	}

	public BigDecimal getSeasonAvgAmount() {
		return seasonAvgAmount;
	}

	public void setSeasonAvgAmount(BigDecimal seasonAvgAmount) {
		this.seasonAvgAmount = seasonAvgAmount;
	}

	public BigDecimal getSeasonAvgAmountOrgMoneyTy() {
		return seasonAvgAmountOrgMoneyTy;
	}

	public void setSeasonAvgAmountOrgMoneyTy(BigDecimal seasonAvgAmountOrgMoneyTy) {
		this.seasonAvgAmountOrgMoneyTy = seasonAvgAmountOrgMoneyTy;
	}

	public BigDecimal getSeasonAvgAmountUsd() {
		return seasonAvgAmountUsd;
	}

	public void setSeasonAvgAmountUsd(BigDecimal seasonAvgAmountUsd) {
		this.seasonAvgAmountUsd = seasonAvgAmountUsd;
	}

	public String getSequence() {
		return sequence;
	}

	public void setSequence(String sequence) {
		this.sequence = sequence;
	}

	public Date getStartInterDate() {
		return startInterDate;
	}

	public void setStartInterDate(Date startInterDate) {
		this.startInterDate = startInterDate;
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

	public BigDecimal getYearAvgAmountUsd() {
		return yearAvgAmountUsd;
	}

	public void setYearAvgAmountUsd(BigDecimal yearAvgAmountUsd) {
		this.yearAvgAmountUsd = yearAvgAmountUsd;
	}
}