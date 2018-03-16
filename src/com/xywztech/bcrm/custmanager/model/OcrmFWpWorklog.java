package com.xywztech.bcrm.custmanager.model;

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
 * The persistent class for the OCRM_F_WP_WORKLOG database table.
 * 
 */
@Entity
@Table(name="OCRM_F_WP_WORKLOG")
public class OcrmFWpWorklog implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "ID", nullable = false)
	private Long id;

	@Column(name="AUDIT_COMMENT")
	private String auditComment;

    @Temporal( TemporalType.DATE)
	@Column(name="AUDIT_DATE")
	private Date auditDate;

	@Column(name="AUDIT_USER")
	private String auditUser;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="ORG_ID")
	private String orgId;

	@Column(name="ORG_NAME")
	private String orgName;

	@Column(name="USER_ID")
	private String userId;

	@Column(name="USER_NAME")
	private String userName;

	@Column(name="WORKLOG_DATE")
	private String worklogDate;

	@Column(name="WORKLOG_STAT")
	private String worklogStat;

	@Column(name="WORKLOG_TYPE")
	private String worklogType;

    public OcrmFWpWorklog() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuditComment() {
		return this.auditComment;
	}

	public void setAuditComment(String auditComment) {
		this.auditComment = auditComment;
	}

	public Date getAuditDate() {
		return this.auditDate;
	}

	public void setAuditDate(Date auditDate) {
		this.auditDate = auditDate;
	}

	public String getAuditUser() {
		return this.auditUser;
	}

	public void setAuditUser(String auditUser) {
		this.auditUser = auditUser;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getOrgId() {
		return this.orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return this.orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getWorklogDate() {
		return this.worklogDate;
	}

	public void setWorklogDate(String worklogDate) {
		this.worklogDate = worklogDate;
	}

	public String getWorklogStat() {
		return this.worklogStat;
	}

	public void setWorklogStat(String worklogStat) {
		this.worklogStat = worklogStat;
	}

	public String getWorklogType() {
		return this.worklogType;
	}

	public void setWorklogType(String worklogType) {
		this.worklogType = worklogType;
	}

}