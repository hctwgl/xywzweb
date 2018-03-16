package com.xywztech.bcrm.customer.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the OCRM_F_CI_MANAGED database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_MANAGED")
public class OcrmFCiManaged implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "ID")
	private Long id;

    @Temporal( TemporalType.DATE)
	@Column(name="APPLY_DATE")
	private Date applyDate;

    @Temporal( TemporalType.DATE)
	@Column(name="APPROVE_DATE")
	private Date approveDate;

	@Column(name="APPROVE_INST_CODE")
	private String approveInstCode;

	@Column(name="APPROVE_INST_NAME")
	private String approveInstName;

	@Column(name="APPROVE_STAT")
	private String approveStat;

	@Column(name="APPROVE_USER_CODE")
	private String approveUserCode;

	@Column(name="APPROVE_USER_NAME")
	private String approveUserName;

	@Column(name="BEFORE_INST_CODE")
	private String beforeInstCode;

	@Column(name="BEFORE_INST_NAME")
	private String beforeInstName;

	@Column(name="BEFORE_MGR_CODE")
	private String beforeMgrCode;

	@Column(name="BEFORE_MGR_NAME")
	private String beforeMgrName;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

    @Temporal( TemporalType.DATE)
	@Column(name="MANAGED_END_DATE")
	private Date managedEndDate;

	@Column(name="MANAGED_INST_CODE")
	private String managedInstCode;

	@Column(name="MANAGED_INST_NAME")
	private String managedInstName;

	@Column(name="MANAGED_MGR_CODE")
	private String managedMgrCode;

	@Column(name="MANAGED_MGR_NAME")
	private String managedMgrName;

	@Column(name="MANAGED_MODULE")
	private String managedModule;

	@Column(name="MANAGED_MODULE_NAME")
	private String managedModuleName;

    @Temporal( TemporalType.DATE)
	@Column(name="MANAGED_START_DATE")
	private Date managedStartDate;

    public OcrmFCiManaged() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getApplyDate() {
		return this.applyDate;
	}

	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}

	public Date getApproveDate() {
		return this.approveDate;
	}

	public void setApproveDate(Date approveDate) {
		this.approveDate = approveDate;
	}

	public String getApproveInstCode() {
		return this.approveInstCode;
	}

	public void setApproveInstCode(String approveInstCode) {
		this.approveInstCode = approveInstCode;
	}

	public String getApproveInstName() {
		return this.approveInstName;
	}

	public void setApproveInstName(String approveInstName) {
		this.approveInstName = approveInstName;
	}

	public String getApproveStat() {
		return this.approveStat;
	}

	public void setApproveStat(String approveStat) {
		this.approveStat = approveStat;
	}

	public String getApproveUserCode() {
		return this.approveUserCode;
	}

	public void setApproveUserCode(String approveUserCode) {
		this.approveUserCode = approveUserCode;
	}

	public String getApproveUserName() {
		return this.approveUserName;
	}

	public void setApproveUserName(String approveUserName) {
		this.approveUserName = approveUserName;
	}

	public String getBeforeInstCode() {
		return this.beforeInstCode;
	}

	public void setBeforeInstCode(String beforeInstCode) {
		this.beforeInstCode = beforeInstCode;
	}

	public String getBeforeInstName() {
		return this.beforeInstName;
	}

	public void setBeforeInstName(String beforeInstName) {
		this.beforeInstName = beforeInstName;
	}

	public String getBeforeMgrCode() {
		return this.beforeMgrCode;
	}

	public void setBeforeMgrCode(String beforeMgrCode) {
		this.beforeMgrCode = beforeMgrCode;
	}

	public String getBeforeMgrName() {
		return this.beforeMgrName;
	}

	public void setBeforeMgrName(String beforeMgrName) {
		this.beforeMgrName = beforeMgrName;
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

	public Date getManagedEndDate() {
		return this.managedEndDate;
	}

	public void setManagedEndDate(Date managedEndDate) {
		this.managedEndDate = managedEndDate;
	}

	public String getManagedInstCode() {
		return this.managedInstCode;
	}

	public void setManagedInstCode(String managedInstCode) {
		this.managedInstCode = managedInstCode;
	}

	public String getManagedInstName() {
		return this.managedInstName;
	}

	public void setManagedInstName(String managedInstName) {
		this.managedInstName = managedInstName;
	}

	public String getManagedMgrCode() {
		return this.managedMgrCode;
	}

	public void setManagedMgrCode(String managedMgrCode) {
		this.managedMgrCode = managedMgrCode;
	}

	public String getManagedMgrName() {
		return this.managedMgrName;
	}

	public void setManagedMgrName(String managedMgrName) {
		this.managedMgrName = managedMgrName;
	}

	public String getManagedModule() {
		return this.managedModule;
	}

	public void setManagedModule(String managedModule) {
		this.managedModule = managedModule;
	}

	public String getManagedModuleName() {
		return this.managedModuleName;
	}

	public void setManagedModuleName(String managedModuleName) {
		this.managedModuleName = managedModuleName;
	}

	public Date getManagedStartDate() {
		return this.managedStartDate;
	}

	public void setManagedStartDate(Date managedStartDate) {
		this.managedStartDate = managedStartDate;
	}

}