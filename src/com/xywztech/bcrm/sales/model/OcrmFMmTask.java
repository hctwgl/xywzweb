package com.xywztech.bcrm.sales.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the OCRM_F_MM_TASK database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_TASK")
public class OcrmFMmTask implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_MM_TASK_TASKID_GENERATOR", sequenceName="ID_SEQUENCE")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_MM_TASK_TASKID_GENERATOR")
	@Column(name="TASK_ID")
	private Long taskId;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="CREATE_ORG_ID")
	private String createOrgId;

	@Column(name="CREATE_ORG_NAME")
	private String createOrgName;

	@Column(name="CREATE_USER")
	private String createUser;

	@Column(name="CREATE_USER_NAME")
	private String createUserName;

	@Column(name="DIST_ORG")
	private String distOrg;

	@Column(name="DIST_ORG_NAME")
	private String distOrgName;

	@Column(name="DIST_TASK_TYPE")
	private String distTaskType;

	@Column(name="DIST_USER")
	private String distUser;

	@Column(name="DIST_USER_NAME")
	private String distUserName;

	private String memo;

	@Column(name="OPER_OBJ_ID")
	private String operObjId;

	@Column(name="OPER_OBJ_NAME")
	private String operObjName;

    @Temporal( TemporalType.DATE)
	@Column(name="RECENTLY_UPDATE_DATE")
	private Date recentlyUpdateDate;

	@Column(name="RECENTLY_UPDATE_ID")
	private String recentlyUpdateId;

	@Column(name="RECENTLY_UPDATE_NAME")
	private String recentlyUpdateName;

    @Temporal( TemporalType.DATE)
	@Column(name="TASK_BEGIN_DATE")
	private Date taskBeginDate;

    @Temporal( TemporalType.DATE)
	@Column(name="TASK_DIST_DATE")
	private Date taskDistDate;

    @Temporal( TemporalType.DATE)
	@Column(name="TASK_END_DATE")
	private Date taskEndDate;

	@Column(name="TASK_NAME")
	private String taskName;

	@Column(name="TASK_PARENT_ID")
	private BigDecimal taskParentId;

	@Column(name="TASK_STAT")
	private String taskStat;

	@Column(name="TASK_TYPE")
	private String taskType;

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateOrgId() {
		return createOrgId;
	}

	public void setCreateOrgId(String createOrgId) {
		this.createOrgId = createOrgId;
	}

	public String getCreateOrgName() {
		return createOrgName;
	}

	public void setCreateOrgName(String createOrgName) {
		this.createOrgName = createOrgName;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getDistOrg() {
		return distOrg;
	}

	public void setDistOrg(String distOrg) {
		this.distOrg = distOrg;
	}

	public String getDistOrgName() {
		return distOrgName;
	}

	public void setDistOrgName(String distOrgName) {
		this.distOrgName = distOrgName;
	}

	public String getDistTaskType() {
		return distTaskType;
	}

	public void setDistTaskType(String distTaskType) {
		this.distTaskType = distTaskType;
	}

	public String getDistUser() {
		return distUser;
	}

	public void setDistUser(String distUser) {
		this.distUser = distUser;
	}

	public String getDistUserName() {
		return distUserName;
	}

	public void setDistUserName(String distUserName) {
		this.distUserName = distUserName;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getOperObjId() {
		return operObjId;
	}

	public void setOperObjId(String operObjId) {
		this.operObjId = operObjId;
	}

	public String getOperObjName() {
		return operObjName;
	}

	public void setOperObjName(String operObjName) {
		this.operObjName = operObjName;
	}

	public Date getRecentlyUpdateDate() {
		return recentlyUpdateDate;
	}

	public void setRecentlyUpdateDate(Date recentlyUpdateDate) {
		this.recentlyUpdateDate = recentlyUpdateDate;
	}

	public String getRecentlyUpdateId() {
		return recentlyUpdateId;
	}

	public void setRecentlyUpdateId(String recentlyUpdateId) {
		this.recentlyUpdateId = recentlyUpdateId;
	}

	public String getRecentlyUpdateName() {
		return recentlyUpdateName;
	}

	public void setRecentlyUpdateName(String recentlyUpdateName) {
		this.recentlyUpdateName = recentlyUpdateName;
	}

	public Date getTaskBeginDate() {
		return taskBeginDate;
	}

	public void setTaskBeginDate(Date taskBeginDate) {
		this.taskBeginDate = taskBeginDate;
	}

	public Date getTaskDistDate() {
		return taskDistDate;
	}

	public void setTaskDistDate(Date taskDistDate) {
		this.taskDistDate = taskDistDate;
	}

	public Date getTaskEndDate() {
		return taskEndDate;
	}

	public void setTaskEndDate(Date taskEndDate) {
		this.taskEndDate = taskEndDate;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public BigDecimal getTaskParentId() {
		return taskParentId;
	}

	public void setTaskParentId(BigDecimal taskParentId) {
		this.taskParentId = taskParentId;
	}

	public String getTaskStat() {
		return taskStat;
	}

	public void setTaskStat(String taskStat) {
		this.taskStat = taskStat;
	}

	public String getTaskType() {
		return taskType;
	}

	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}