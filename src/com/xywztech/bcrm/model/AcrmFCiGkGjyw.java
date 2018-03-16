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
 * The persistent class for the ACRM_F_CI_GK_GJYW database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_GK_GJYW")
public class AcrmFCiGkGjyw implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_GK_GJYW_CUSTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_GK_GJYW_CUSTID_GENERATOR")
	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUR_AMT")
	private BigDecimal curAmt;

	@Column(name="CUR_DEP_WB_AMT")
	private BigDecimal curDepWbAmt;

	@Column(name="CUR_DEP_WB_YEAR_AVG")
	private BigDecimal curDepWbYearAvg;

	@Column(name="CUR_LOAN_WB_AMT")
	private BigDecimal curLoanWbAmt;

	@Column(name="CUR_LOAN_WB_YEAR_AVG")
	private BigDecimal curLoanWbYearAvg;

	@Column(name="CUST_TYP")
	private String custTyp;

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public BigDecimal getCurAmt() {
		return curAmt;
	}

	public void setCurAmt(BigDecimal curAmt) {
		this.curAmt = curAmt;
	}

	public BigDecimal getCurDepWbAmt() {
		return curDepWbAmt;
	}

	public void setCurDepWbAmt(BigDecimal curDepWbAmt) {
		this.curDepWbAmt = curDepWbAmt;
	}

	public BigDecimal getCurDepWbYearAvg() {
		return curDepWbYearAvg;
	}

	public void setCurDepWbYearAvg(BigDecimal curDepWbYearAvg) {
		this.curDepWbYearAvg = curDepWbYearAvg;
	}

	public BigDecimal getCurLoanWbAmt() {
		return curLoanWbAmt;
	}

	public void setCurLoanWbAmt(BigDecimal curLoanWbAmt) {
		this.curLoanWbAmt = curLoanWbAmt;
	}

	public BigDecimal getCurLoanWbYearAvg() {
		return curLoanWbYearAvg;
	}

	public void setCurLoanWbYearAvg(BigDecimal curLoanWbYearAvg) {
		this.curLoanWbYearAvg = curLoanWbYearAvg;
	}

	public String getCustTyp() {
		return custTyp;
	}

	public void setCustTyp(String custTyp) {
		this.custTyp = custTyp;
	}

	public BigDecimal getLastDepWbAmt() {
		return lastDepWbAmt;
	}

	public void setLastDepWbAmt(BigDecimal lastDepWbAmt) {
		this.lastDepWbAmt = lastDepWbAmt;
	}

	public BigDecimal getLastDepWbYearAvg() {
		return lastDepWbYearAvg;
	}

	public void setLastDepWbYearAvg(BigDecimal lastDepWbYearAvg) {
		this.lastDepWbYearAvg = lastDepWbYearAvg;
	}

	public BigDecimal getLastLoanWbAmt() {
		return lastLoanWbAmt;
	}

	public void setLastLoanWbAmt(BigDecimal lastLoanWbAmt) {
		this.lastLoanWbAmt = lastLoanWbAmt;
	}

	public BigDecimal getLastLoanWbYearAvg() {
		return lastLoanWbYearAvg;
	}

	public void setLastLoanWbYearAvg(BigDecimal lastLoanWbYearAvg) {
		this.lastLoanWbYearAvg = lastLoanWbYearAvg;
	}

	public BigDecimal getLastYearAmt() {
		return lastYearAmt;
	}

	public void setLastYearAmt(BigDecimal lastYearAmt) {
		this.lastYearAmt = lastYearAmt;
	}

	@Column(name="LAST_DEP_WB_AMT")
	private BigDecimal lastDepWbAmt;

	@Column(name="LAST_DEP_WB_YEAR_AVG")
	private BigDecimal lastDepWbYearAvg;

	@Column(name="LAST_LOAN_WB_AMT")
	private BigDecimal lastLoanWbAmt;

	@Column(name="LAST_LOAN_WB_YEAR_AVG")
	private BigDecimal lastLoanWbYearAvg;

	@Column(name="LAST_YEAR_AMT")
	private BigDecimal lastYearAmt;

  
}