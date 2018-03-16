package com.xywztech.bcrm.custmanager.model;

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
 * The persistent class for the OCRM_F_CM_ABSENT_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CM_ABSENT_INFO")
public class OcrmFCmAbsentInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CM_ABSENT_INFO_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CM_ABSENT_INFO_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="ABSENT_KIND")
	/***
	 * 假别
	 */
	private String absentKind;
	
	@Column(name="ABSENT_STAT")
	/***
	 * 审批状态
	 */
	private String absentStat;
	@Temporal( TemporalType.DATE)
	@Column(name="BEG_TIME")
	/***
	 * 开始时间
	 */
	private Date begTime;
	/***
	 * 事由
	 */
	private String cause;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	/***
	 * 创建时间
	 */
	private Date createDate;
    @Temporal( TemporalType.DATE)
	@Column(name="END_TIME")
	/***
	 * 结束时间
	 */
	private Date endTime;

	@Column(name="ORG_ID")
	/***
	 * 机构ID
	 */
	private String orgId;

	@Column(name="ORG_NAME")
	/***
	 * 机构名称
	 */
	private String orgName;
	/***
	 * 天数
	 */
	private Integer term;

	@Column(name="USER_ID")
	/***
	 * 客户经理ID
	 */
	private String userId;

	@Column(name="USER_NAME")
	/***
	 * 客户经理姓名
	 */
	private String userName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAbsentKind() {
		return absentKind;
	}

	public void setAbsentKind(String absentKind) {
		this.absentKind = absentKind;
	}

	public Date getBegTime() {
		return begTime;
	}

	public void setBegTime(Date begTime) {
		this.begTime = begTime;
	}

	public String getCause() {
		return cause;
	}

	public void setCause(String cause) {
		this.cause = cause;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public Integer getTerm() {
		return term;
	}

	public void setTerm(Integer term) {
		this.term = term;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAbsentStat() {
		return absentStat;
	}

	public void setAbsentStat(String absentStat) {
		this.absentStat = absentStat;
	}
	
}