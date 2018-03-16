package com.xywztech.bcrm.model;

import java.io.Serializable;
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
 * The persistent class for the OCRM_F_CI_TRANS_APPLY database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_TRANS_APPLY")
public class OcrmFCiTransApply implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_TRANS_APPLY_APPLYNO_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_TRANS_APPLY_APPLYNO_GENERATOR")
	@Column(name="APPLY_NO",unique=true, nullable=false)
	private Long applyNo;

	private Long accessories;

	@Column(name="AFTER_INST_CODE")
	private String afterInstCode;

	@Column(name="AFTER_INST_NAME")
	private String afterInstName;

	@Column(name="AFTER_MAIN_TYPE")
	private String afterMainType;

	@Column(name="AFTER_MGR_ID")
	private String afterMgrId;

	@Column(name="AFTER_MGR_NAME")
	private String afterMgrName;

    @Temporal( TemporalType.DATE)
	@Column(name="APPLY_DATE")
	private Date applyDate;

	@Column(name="APPROVE_STAT")
	private String approveStat;

	@Column(name="BEFORE_INST_CODE")
	private String beforeInstCode;

	@Column(name="BEFORE_INST_NAME")
	private String beforeInstName;

	@Column(name="BEFORE_MAIN_TYPE")
	private String beforeMainType;

	@Column(name="BEFORE_MGR_ID")
	private String beforeMgrId;

	@Column(name="BEFORE_MGR_NAME")
	private String beforeMgrName;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="HAND_OVER_REASON")
	private String handOverReason;

    @Temporal( TemporalType.DATE)
	@Column(name="ORI_MGR_FB_DATE")
	private Date oriMgrFbDate;

	@Column(name="ORI_MGR_FEEDBACK")
	private String oriMgrFeedback;

	@Column(name="ORI_MGR_IDEA")
	private String oriMgrIdea;

    @Temporal( TemporalType.DATE)
	@Column(name="WORK_INTERFIX_DT")
	private Date workInterfixDt;

	public Long getApplyNo() {
		return applyNo;
	}

	public void setApplyNo(Long applyNo) {
		this.applyNo = applyNo;
	}

	public Long getAccessories() {
		return accessories;
	}

	public void setAccessories(Long accessories) {
		this.accessories = accessories;
	}

	public String getAfterInstCode() {
		return afterInstCode;
	}

	public void setAfterInstCode(String afterInstCode) {
		this.afterInstCode = afterInstCode;
	}

	public String getAfterInstName() {
		return afterInstName;
	}

	public void setAfterInstName(String afterInstName) {
		this.afterInstName = afterInstName;
	}

	public String getAfterMainType() {
		return afterMainType;
	}

	public void setAfterMainType(String afterMainType) {
		this.afterMainType = afterMainType;
	}

	public String getAfterMgrId() {
		return afterMgrId;
	}

	public void setAfterMgrId(String afterMgrId) {
		this.afterMgrId = afterMgrId;
	}

	public String getAfterMgrName() {
		return afterMgrName;
	}

	public void setAfterMgrName(String afterMgrName) {
		this.afterMgrName = afterMgrName;
	}

	public Date getApplyDate() {
		return applyDate;
	}

	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}

	public String getApproveStat() {
		return approveStat;
	}

	public void setApproveStat(String approveStat) {
		this.approveStat = approveStat;
	}

	public String getBeforeInstCode() {
		return beforeInstCode;
	}

	public void setBeforeInstCode(String beforeInstCode) {
		this.beforeInstCode = beforeInstCode;
	}

	public String getBeforeInstName() {
		return beforeInstName;
	}

	public void setBeforeInstName(String beforeInstName) {
		this.beforeInstName = beforeInstName;
	}

	public String getBeforeMainType() {
		return beforeMainType;
	}

	public void setBeforeMainType(String beforeMainType) {
		this.beforeMainType = beforeMainType;
	}

	public String getBeforeMgrId() {
		return beforeMgrId;
	}

	public void setBeforeMgrId(String beforeMgrId) {
		this.beforeMgrId = beforeMgrId;
	}

	public String getBeforeMgrName() {
		return beforeMgrName;
	}

	public void setBeforeMgrName(String beforeMgrName) {
		this.beforeMgrName = beforeMgrName;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getHandOverReason() {
		return handOverReason;
	}

	public void setHandOverReason(String handOverReason) {
		this.handOverReason = handOverReason;
	}

	public Date getOriMgrFbDate() {
		return oriMgrFbDate;
	}

	public void setOriMgrFbDate(Date oriMgrFbDate) {
		this.oriMgrFbDate = oriMgrFbDate;
	}

	public String getOriMgrFeedback() {
		return oriMgrFeedback;
	}

	public void setOriMgrFeedback(String oriMgrFeedback) {
		this.oriMgrFeedback = oriMgrFeedback;
	}

	public String getOriMgrIdea() {
		return oriMgrIdea;
	}

	public void setOriMgrIdea(String oriMgrIdea) {
		this.oriMgrIdea = oriMgrIdea;
	}

	public Date getWorkInterfixDt() {
		return workInterfixDt;
	}

	public void setWorkInterfixDt(Date workInterfixDt) {
		this.workInterfixDt = workInterfixDt;
	}
}