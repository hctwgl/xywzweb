package com.xywztech.bcrm.sales.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the OCRM_F_MM_TASK_OPERATOR database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_TASK_OPERATOR")
public class OcrmFMmTaskOperator implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_MM_TASK_OPERATOR_ID_GENERATOR", sequenceName="ID_SEQUENCE")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_MM_TASK_OPERATOR_ID_GENERATOR")
	private Long id;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="CREATE_USER_ID")
	private String createUserId;

	@Column(name="CREATE_USER_NAME")
	private String createUserName;

	@Column(name="OPER_OBJ_ID")
	private String operObjId;

	@Column(name="OPER_OBJ_NAME")
	private String operObjName;

	@Column(name="TASK_ID")
	private Long taskId;

	@Column(name="DIST_TASK_TYPE")
	private String distTaskType;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
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

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public String getDistTaskType() {
		return distTaskType;
	}

	public void setDistTaskType(String distTaskType) {
		this.distTaskType = distTaskType;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}