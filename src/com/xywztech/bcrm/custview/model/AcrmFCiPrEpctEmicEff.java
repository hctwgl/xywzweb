package com.xywztech.bcrm.custview.model;

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
 * The persistent class for the ACRM_F_CI_PR_EPCT_EMIC_EFF database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PR_EPCT_EMIC_EFF")
public class AcrmFCiPrEpctEmicEff implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PR_EPCT_EMIC_EFF_PROJECTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PR_EPCT_EMIC_EFF_PROJECTID_GENERATOR")
	@Column(name="PROJECT_ID", unique=true, nullable=false)
	private Integer projectId;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="EXCH_IVT_RATIO")
	private String exchIvtRatio;

	@Column(name="FIXED_ASSETS")
	private BigDecimal fixedAssets;

	@Column(name="ICR_ANNUAL_AMOUNT")
	private BigDecimal icrAnnualAmount;

	@Column(name="ICR_ANNUAL_FOREIGN_EXCH")
	private BigDecimal icrAnnualForeignExch;

	@Column(name="ICR_ANNUAL_OUTPUT")
	private BigDecimal icrAnnualOutput;

	@Column(name="ICR_ANNUAL_PROFIT")
	private BigDecimal icrAnnualProfit;

	@Column(name="ICR_ANNUAL_TAX")
	private BigDecimal icrAnnualTax;

	@Column(name="MAIN_PRODUCT")
	private String mainProduct;

	@Column(name="NEW_MAIN_PRODUCT")
	private String newMainProduct;

	@Column(name="ORI_ANNUAL_AMOUNT")
	private BigDecimal oriAnnualAmount;

	@Column(name="ORI_ANNUAL_FOREIGN_EXCH")
	private BigDecimal oriAnnualForeignExch;

	@Column(name="ORI_ANNUAL_OUTPUT")
	private BigDecimal oriAnnualOutput;

	@Column(name="ORI_ANNUAL_PROFIT")
	private BigDecimal oriAnnualProfit;

	@Column(name="ORI_ANNUAL_TAX")
	private BigDecimal oriAnnualTax;

	private String productivity;

	@Column(name="PROFIT_LOSS_AMOUNT")
	private BigDecimal profitLossAmount;

	@Column(name="PROFIT_LOSS_BREAKEVEN")
	private BigDecimal profitLossBreakeven;

	@Column(name="ROI")
	private String roi;

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getExchIvtRatio() {
		return exchIvtRatio;
	}

	public void setExchIvtRatio(String exchIvtRatio) {
		this.exchIvtRatio = exchIvtRatio;
	}

	public BigDecimal getFixedAssets() {
		return fixedAssets;
	}

	public void setFixedAssets(BigDecimal fixedAssets) {
		this.fixedAssets = fixedAssets;
	}

	public BigDecimal getIcrAnnualAmount() {
		return icrAnnualAmount;
	}

	public void setIcrAnnualAmount(BigDecimal icrAnnualAmount) {
		this.icrAnnualAmount = icrAnnualAmount;
	}

	public BigDecimal getIcrAnnualForeignExch() {
		return icrAnnualForeignExch;
	}

	public void setIcrAnnualForeignExch(BigDecimal icrAnnualForeignExch) {
		this.icrAnnualForeignExch = icrAnnualForeignExch;
	}

	public BigDecimal getIcrAnnualOutput() {
		return icrAnnualOutput;
	}

	public void setIcrAnnualOutput(BigDecimal icrAnnualOutput) {
		this.icrAnnualOutput = icrAnnualOutput;
	}

	public BigDecimal getIcrAnnualProfit() {
		return icrAnnualProfit;
	}

	public void setIcrAnnualProfit(BigDecimal icrAnnualProfit) {
		this.icrAnnualProfit = icrAnnualProfit;
	}

	public BigDecimal getIcrAnnualTax() {
		return icrAnnualTax;
	}

	public void setIcrAnnualTax(BigDecimal icrAnnualTax) {
		this.icrAnnualTax = icrAnnualTax;
	}

	public String getMainProduct() {
		return mainProduct;
	}

	public void setMainProduct(String mainProduct) {
		this.mainProduct = mainProduct;
	}

	public String getNewMainProduct() {
		return newMainProduct;
	}

	public void setNewMainProduct(String newMainProduct) {
		this.newMainProduct = newMainProduct;
	}

	public BigDecimal getOriAnnualAmount() {
		return oriAnnualAmount;
	}

	public void setOriAnnualAmount(BigDecimal oriAnnualAmount) {
		this.oriAnnualAmount = oriAnnualAmount;
	}

	public BigDecimal getOriAnnualForeignExch() {
		return oriAnnualForeignExch;
	}

	public void setOriAnnualForeignExch(BigDecimal oriAnnualForeignExch) {
		this.oriAnnualForeignExch = oriAnnualForeignExch;
	}

	public BigDecimal getOriAnnualOutput() {
		return oriAnnualOutput;
	}

	public void setOriAnnualOutput(BigDecimal oriAnnualOutput) {
		this.oriAnnualOutput = oriAnnualOutput;
	}

	public BigDecimal getOriAnnualProfit() {
		return oriAnnualProfit;
	}

	public void setOriAnnualProfit(BigDecimal oriAnnualProfit) {
		this.oriAnnualProfit = oriAnnualProfit;
	}

	public BigDecimal getOriAnnualTax() {
		return oriAnnualTax;
	}

	public void setOriAnnualTax(BigDecimal oriAnnualTax) {
		this.oriAnnualTax = oriAnnualTax;
	}

	public String getProductivity() {
		return productivity;
	}

	public void setProductivity(String productivity) {
		this.productivity = productivity;
	}

	public BigDecimal getProfitLossAmount() {
		return profitLossAmount;
	}

	public void setProfitLossAmount(BigDecimal profitLossAmount) {
		this.profitLossAmount = profitLossAmount;
	}

	public BigDecimal getProfitLossBreakeven() {
		return profitLossBreakeven;
	}

	public void setProfitLossBreakeven(BigDecimal profitLossBreakeven) {
		this.profitLossBreakeven = profitLossBreakeven;
	}

	public String getRoi() {
		return roi;
	}

	public void setRoi(String roi) {
		this.roi = roi;
	}
}