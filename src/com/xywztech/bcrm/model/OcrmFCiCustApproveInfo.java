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
 * The persistent class for the OCRM_F_CI_CUST_APPROVE_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_CUST_APPROVE_INFO")
public class OcrmFCiCustApproveInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_CUST_APPROVE_INFO_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_CUST_APPROVE_INFO_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="APPROVE_CYCLE_NAME")
	private String approveCycleName;

    @Temporal( TemporalType.DATE)
	@Column(name="APPROVE_DATE")
	private Date approveDate;

	@Column(name="APPROVE_FLAG")
	private String approveFlag;

	@Column(name="APPROVE_INSTITUTION")
	private String approveInstitution;

	@Column(name="APPROVE_INSTNAME")
	private String approveInstname;

	@Column(name="APPROVE_REASON")
	private String approveReason;

	@Column(name="APPROVE_USER")
	private String approveUser;

	@Column(name="APPROVE_USERNAME")
	private String approveUsername;

	@Column(name="RELATION_NO")
	private Long relationNo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getApproveCycleName() {
		return approveCycleName;
	}

	public void setApproveCycleName(String approveCycleName) {
		this.approveCycleName = approveCycleName;
	}

	public Date getApproveDate() {
		return approveDate;
	}

	public void setApproveDate(Date approveDate) {
		this.approveDate = approveDate;
	}

	public String getApproveFlag() {
		return approveFlag;
	}

	public void setApproveFlag(String approveFlag) {
		this.approveFlag = approveFlag;
	}

	public String getApproveInstitution() {
		return approveInstitution;
	}

	public void setApproveInstitution(String approveInstitution) {
		this.approveInstitution = approveInstitution;
	}

	public String getApproveInstname() {
		return approveInstname;
	}

	public void setApproveInstname(String approveInstname) {
		this.approveInstname = approveInstname;
	}

	public String getApproveReason() {
		return approveReason;
	}

	public void setApproveReason(String approveReason) {
		this.approveReason = approveReason;
	}

	public String getApproveUser() {
		return approveUser;
	}

	public void setApproveUser(String approveUser) {
		this.approveUser = approveUser;
	}

	public String getApproveUsername() {
		return approveUsername;
	}

	public void setApproveUsername(String approveUsername) {
		this.approveUsername = approveUsername;
	}

	public Long getRelationNo() {
		return relationNo;
	}

	public void setRelationNo(Long relationNo) {
		this.relationNo = relationNo;
	}
}