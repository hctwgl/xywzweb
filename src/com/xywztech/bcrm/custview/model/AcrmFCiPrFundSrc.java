package com.xywztech.bcrm.custview.model;

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
 * The persistent class for the ACRM_F_CI_PR_FUND_SRC database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PR_FUND_SRC")
public class AcrmFCiPrFundSrc implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PR_FUND_SRC_PROJECTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PR_FUND_SRC_PROJECTID_GENERATOR")
	@Column(name="PROJECT_ID", unique=true, nullable=false)
	private Integer projectId;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="FINANCE_LOAN_AMOUNT")
	private BigDecimal financeLoanAmount;

    @Temporal( TemporalType.DATE)
	@Column(name="FINANCE_LOAN_IVS_DT")
	private Date financeLoanIvsDt;

	@Column(name="HIGHER_FUND_AMOUNT")
	private BigDecimal higherFundAmount;

    @Temporal( TemporalType.DATE)
	@Column(name="HIGHER_FUND_IVS_DT")
	private Date higherFundIvsDt;

	@Column(name="JOINT_IVS_AMOUNT")
	private BigDecimal jointIvsAmount;

    @Temporal( TemporalType.DATE)
	@Column(name="JOINT_IVS_DT")
	private Date jointIvsDt;

	@Column(name="OTHER_ORG_LOAN_AMOUNT")
	private BigDecimal otherOrgLoanAmount;

    @Temporal( TemporalType.DATE)
	@Column(name="OTHER_ORG_LOAN_IVSDT")
	private Date otherOrgLoanIvsdt;

	@Column(name="OTHER_UNIT_LOAN_AMOUNT")
	private BigDecimal otherUnitLoanAmount;

    @Temporal( TemporalType.DATE)
	@Column(name="OTHER_UNIT_LOAN_IVSDT")
	private Date otherUnitLoanIvsdt;

    @Temporal( TemporalType.DATE)
	@Column(name="PAID_UP_CAP_IVS_DT")
	private Date paidUpCapIvsDt;

	@Column(name="PAID_UP_CAPITAL")
	private BigDecimal paidUpCapital;

	@Column(name="RAISE_FUND_AMOUNT")
	private BigDecimal raiseFundAmount;

    @Temporal( TemporalType.DATE)
	@Column(name="RAISE_FUND_IVS_DT")
	private Date raiseFundIvsDt;

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

	public BigDecimal getFinanceLoanAmount() {
		return financeLoanAmount;
	}

	public void setFinanceLoanAmount(BigDecimal financeLoanAmount) {
		this.financeLoanAmount = financeLoanAmount;
	}

	public Date getFinanceLoanIvsDt() {
		return financeLoanIvsDt;
	}

	public void setFinanceLoanIvsDt(Date financeLoanIvsDt) {
		this.financeLoanIvsDt = financeLoanIvsDt;
	}

	public BigDecimal getHigherFundAmount() {
		return higherFundAmount;
	}

	public void setHigherFundAmount(BigDecimal higherFundAmount) {
		this.higherFundAmount = higherFundAmount;
	}

	public Date getHigherFundIvsDt() {
		return higherFundIvsDt;
	}

	public void setHigherFundIvsDt(Date higherFundIvsDt) {
		this.higherFundIvsDt = higherFundIvsDt;
	}

	public BigDecimal getJointIvsAmount() {
		return jointIvsAmount;
	}

	public void setJointIvsAmount(BigDecimal jointIvsAmount) {
		this.jointIvsAmount = jointIvsAmount;
	}

	public Date getJointIvsDt() {
		return jointIvsDt;
	}

	public void setJointIvsDt(Date jointIvsDt) {
		this.jointIvsDt = jointIvsDt;
	}

	public BigDecimal getOtherOrgLoanAmount() {
		return otherOrgLoanAmount;
	}

	public void setOtherOrgLoanAmount(BigDecimal otherOrgLoanAmount) {
		this.otherOrgLoanAmount = otherOrgLoanAmount;
	}

	public Date getOtherOrgLoanIvsdt() {
		return otherOrgLoanIvsdt;
	}

	public void setOtherOrgLoanIvsdt(Date otherOrgLoanIvsdt) {
		this.otherOrgLoanIvsdt = otherOrgLoanIvsdt;
	}

	public BigDecimal getOtherUnitLoanAmount() {
		return otherUnitLoanAmount;
	}

	public void setOtherUnitLoanAmount(BigDecimal otherUnitLoanAmount) {
		this.otherUnitLoanAmount = otherUnitLoanAmount;
	}

	public Date getOtherUnitLoanIvsdt() {
		return otherUnitLoanIvsdt;
	}

	public void setOtherUnitLoanIvsdt(Date otherUnitLoanIvsdt) {
		this.otherUnitLoanIvsdt = otherUnitLoanIvsdt;
	}

	public Date getPaidUpCapIvsDt() {
		return paidUpCapIvsDt;
	}

	public void setPaidUpCapIvsDt(Date paidUpCapIvsDt) {
		this.paidUpCapIvsDt = paidUpCapIvsDt;
	}

	public BigDecimal getPaidUpCapital() {
		return paidUpCapital;
	}

	public void setPaidUpCapital(BigDecimal paidUpCapital) {
		this.paidUpCapital = paidUpCapital;
	}

	public BigDecimal getRaiseFundAmount() {
		return raiseFundAmount;
	}

	public void setRaiseFundAmount(BigDecimal raiseFundAmount) {
		this.raiseFundAmount = raiseFundAmount;
	}

	public Date getRaiseFundIvsDt() {
		return raiseFundIvsDt;
	}

	public void setRaiseFundIvsDt(Date raiseFundIvsDt) {
		this.raiseFundIvsDt = raiseFundIvsDt;
	}
}