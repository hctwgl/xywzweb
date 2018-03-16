package com.xywztech.bcrm.customer.model;

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
 * The persistent class for the OCRM_F_CI_BAD_CUST_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_BAD_CUST_INFO")
public class OcrmFCiBadCustInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_BAD_CUST_INFO_ID_GENERATOR", sequenceName="ID_SEQUENCE" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_BAD_CUST_INFO_ID_GENERATOR")
	@Column(name="CUST_ID", unique=true, nullable=false, length=21)
	private String custId;

	@Column(name="AFFI_GROUP", length=13)
	private String affiGroup;

	@Column(name="BORROWE_MONEY", precision=24, scale=6)
	private BigDecimal borroweMoney;

	@Column(name="BORROWER_NAME", length=100)
	private String borrowerName;

	@Temporal( TemporalType.DATE)
	@Column(name="CHANGE_LEVEL_TIME")
	private Date changeLevelTime;

	@Column(name="CUST_BASE_CONDITION", length=800)
	private String custBaseCondition;

	@Column(name="DATA_SOURCE", length=13)
	private String dataSource;

	@Column(name="DISPOSE_STEP_ACTUALITY", length=800)
	private String disposeStepActuality;

	@Column(name="GUARANTOR",length=200)
	private String guarantor;

	@Column(name="INSTITUTION",length=200)
	private String institution;

	@Column(name="LENDING_RATE", precision=24, scale=6)
	private BigDecimal lendingRate;

	@Column(name="LOAN_APPROVAL", length=200)
	private String loanApproval;

	@Column(name="LOAN_BALANCE", precision=24, scale=6)
	private BigDecimal loanBalance;

    @Temporal( TemporalType.DATE)
	@Column(name="LOAN_END_DATE")
	private Date loanEndDate;

    @Temporal( TemporalType.DATE)
	@Column(name="LOAN_START_DATE")
	private Date loanStartDate;

    @Temporal( TemporalType.DATE)
	@Column(name="MADE_BAD_TIME")
	private Date madeBadTime;

	@Column(name="MADING_BALANCE", precision=24, scale=6)
	private BigDecimal madingBalance;

	@Column(name="MANAGER_CREDIT_NAME", length=200)
	private String managerCreditName;

	@Column(name="REMARK",length=800)
	private String remark;

	@Column(name="REPAYMENT_TYPE", length=13)
	private String repaymentType;

	@Column(name="TEN_LEVEL_STAT", length=13)
	private String tenLevelStat;

    public OcrmFCiBadCustInfo() {
    }

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getAffiGroup() {
		return this.affiGroup;
	}

	public void setAffiGroup(String affiGroup) {
		this.affiGroup = affiGroup;
	}

	public BigDecimal getBorroweMoney() {
		return this.borroweMoney;
	}

	public void setBorroweMoney(BigDecimal borroweMoney) {
		this.borroweMoney = borroweMoney;
	}

	public String getBorrowerName() {
		return this.borrowerName;
	}

	public void setBorrowerName(String borrowerName) {
		this.borrowerName = borrowerName;
	}

	public Date getChangeLevelTime() {
		return this.changeLevelTime;
	}

	public void setChangeLevelTime(Date changeLevelTime) {
		this.changeLevelTime = changeLevelTime;
	}

	public String getCustBaseCondition() {
		return this.custBaseCondition;
	}

	public void setCustBaseCondition(String custBaseCondition) {
		this.custBaseCondition = custBaseCondition;
	}

	public String getDataSource() {
		return this.dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}

	public String getDisposeStepActuality() {
		return this.disposeStepActuality;
	}

	public void setDisposeStepActuality(String disposeStepActuality) {
		this.disposeStepActuality = disposeStepActuality;
	}

	public String getGuarantor() {
		return this.guarantor;
	}

	public void setGuarantor(String guarantor) {
		this.guarantor = guarantor;
	}

	public String getInstitution() {
		return this.institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	public BigDecimal getLendingRate() {
		return this.lendingRate;
	}

	public void setLendingRate(BigDecimal lendingRate) {
		this.lendingRate = lendingRate;
	}

	public String getLoanApproval() {
		return this.loanApproval;
	}

	public void setLoanApproval(String loanApproval) {
		this.loanApproval = loanApproval;
	}

	public BigDecimal getLoanBalance() {
		return this.loanBalance;
	}

	public void setLoanBalance(BigDecimal loanBalance) {
		this.loanBalance = loanBalance;
	}

	public Date getLoanEndDate() {
		return this.loanEndDate;
	}

	public void setLoanEndDate(Date loanEndDate) {
		this.loanEndDate = loanEndDate;
	}

	public Date getLoanStartDate() {
		return this.loanStartDate;
	}

	public void setLoanStartDate(Date loanStartDate) {
		this.loanStartDate = loanStartDate;
	}

	public Date getMadeBadTime() {
		return this.madeBadTime;
	}

	public void setMadeBadTime(Date madeBadTime) {
		this.madeBadTime = madeBadTime;
	}

	public BigDecimal getMadingBalance() {
		return this.madingBalance;
	}

	public void setMadingBalance(BigDecimal madingBalance) {
		this.madingBalance = madingBalance;
	}

	public String getManagerCreditName() {
		return this.managerCreditName;
	}

	public void setManagerCreditName(String managerCreditName) {
		this.managerCreditName = managerCreditName;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRepaymentType() {
		return this.repaymentType;
	}

	public void setRepaymentType(String repaymentType) {
		this.repaymentType = repaymentType;
	}

	public String getTenLevelStat() {
		return this.tenLevelStat;
	}

	public void setTenLevelStat(String tenLevelStat) {
		this.tenLevelStat = tenLevelStat;
	}

}