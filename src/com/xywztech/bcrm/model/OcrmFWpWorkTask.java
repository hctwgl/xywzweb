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
 * The persistent class for the OCRM_F_WP_WORK_TASK database table.
 * 
 */
@Entity
@Table(name="OCRM_F_WP_WORK_TASK")
public class OcrmFWpWorkTask implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	@Id
	@SequenceGenerator(name="OCRM_F_WP_WORK_TASK_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_WP_WORK_TASK_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;
	
	//协办人
	@Column(name="ASSIST_USER", length=200)
	private String assistUser;
	
	//责任人
	@Column(name="BURDEN_USER", length=200)
	private String burdenUser;
	
	//创建日期
    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;
    
    //创建人
	@Column(name="CREATE_USER", length=200)
	private String createUser;
	
	//结束时间
    @Temporal( TemporalType.DATE)
	@Column(name="END_DATE")
	private Date endDate;
    
    //完成内容
	@Column(name="FINISH_CONTENT", length=2000)
	private String finishContent;
	
	//完成状态
	@Column(name="FINISH_STATE", length=20)
	private String finishState;
	
	//功能组
	@Column(name="GROUP_ID", length=20)
	private String groupId;
	
	//开始时间
    @Temporal( TemporalType.DATE)
	@Column(name="START_DATE")
	private Date startDate;
    
    //工作内容安排
	@Column(name="TASK_CONTENT", length=2000)
	private String taskContent;
	
	//最近更新日期
    @Temporal( TemporalType.DATE)
	@Column(name="UPDATE_DATE")
	private Date updateDate;
    
    //最近更新日期最近更新人
	@Column(name="UPDATE_USER", length=200)
	private String updateUser;

    public OcrmFWpWorkTask() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAssistUser() {
		return this.assistUser;
	}

	public void setAssistUser(String assistUser) {
		this.assistUser = assistUser;
	}

	public String getBurdenUser() {
		return this.burdenUser;
	}

	public void setBurdenUser(String burdenUser) {
		this.burdenUser = burdenUser;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateUser() {
		return this.createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getFinishContent() {
		return this.finishContent;
	}

	public void setFinishContent(String finishContent) {
		this.finishContent = finishContent;
	}

	public String getFinishState() {
		return this.finishState;
	}

	public void setFinishState(String finishState) {
		this.finishState = finishState;
	}

	public String getGroupId() {
		return this.groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getTaskContent() {
		return this.taskContent;
	}

	public void setTaskContent(String taskContent) {
		this.taskContent = taskContent;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getUpdateUser() {
		return this.updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

}