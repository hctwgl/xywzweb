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
 * The persistent class for the ACRM_F_CI_GK_SAVE database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_GK_SAVE")
public class AcrmFCiGkSave implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_GK_SAVE_CUSTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_GK_SAVE_CUSTID_GENERATOR")
	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUR_AC_BL")
	private BigDecimal curAcBl;

	@Column(name="CUR_MONTH_AVG")
	private BigDecimal curMonthAvg;

	@Column(name="CUR_QUARTER_AVG")
	private BigDecimal curQuarterAvg;

	@Column(name="CUR_YEAR_AVG")
	private BigDecimal curYearAvg;

	@Column(name="CUST_TYP")
	private String custTyp;

	@Column(name="LAST_AC_BL")
	private BigDecimal lastAcBl;

	@Column(name="LAST_MONTH_AVG")
	private BigDecimal lastMonthAvg;

	@Column(name="LAST_QUARTER_AVG")
	private BigDecimal lastQuarterAvg;

	@Column(name="LAST_YEAR_AVG")
	private BigDecimal lastYearAvg;

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public BigDecimal getCurAcBl() {
		return curAcBl;
	}

	public void setCurAcBl(BigDecimal curAcBl) {
		this.curAcBl = curAcBl;
	}

	public BigDecimal getCurMonthAvg() {
		return curMonthAvg;
	}

	public void setCurMonthAvg(BigDecimal curMonthAvg) {
		this.curMonthAvg = curMonthAvg;
	}

	public BigDecimal getCurQuarterAvg() {
		return curQuarterAvg;
	}

	public void setCurQuarterAvg(BigDecimal curQuarterAvg) {
		this.curQuarterAvg = curQuarterAvg;
	}

	public BigDecimal getCurYearAvg() {
		return curYearAvg;
	}

	public void setCurYearAvg(BigDecimal curYearAvg) {
		this.curYearAvg = curYearAvg;
	}

	public String getCustTyp() {
		return custTyp;
	}

	public void setCustTyp(String custTyp) {
		this.custTyp = custTyp;
	}

	public BigDecimal getLastAcBl() {
		return lastAcBl;
	}

	public void setLastAcBl(BigDecimal lastAcBl) {
		this.lastAcBl = lastAcBl;
	}

	public BigDecimal getLastMonthAvg() {
		return lastMonthAvg;
	}

	public void setLastMonthAvg(BigDecimal lastMonthAvg) {
		this.lastMonthAvg = lastMonthAvg;
	}

	public BigDecimal getLastQuarterAvg() {
		return lastQuarterAvg;
	}

	public void setLastQuarterAvg(BigDecimal lastQuarterAvg) {
		this.lastQuarterAvg = lastQuarterAvg;
	}

	public BigDecimal getLastYearAvg() {
		return lastYearAvg;
	}

	public void setLastYearAvg(BigDecimal lastYearAvg) {
		this.lastYearAvg = lastYearAvg;
	}
}