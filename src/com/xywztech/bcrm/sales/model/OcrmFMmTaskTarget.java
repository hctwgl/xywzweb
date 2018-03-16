package com.xywztech.bcrm.sales.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the OCRM_F_MM_TASK_TARGET database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_TASK_TARGET")
public class OcrmFMmTaskTarget implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_MM_TASK_TARGET_TARGETNO_GENERATOR", sequenceName="ID_SEQUENCE")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_MM_TASK_TARGET_TARGETNO_GENERATOR")
	@Column(name="TARGET_NO")
	private Long targetNo;

	@Column(name="ACHIEVE_PERCENT")
	private BigDecimal achievePercent;

	@Column(name="ACHIEVE_VALUE")
	private BigDecimal achieveValue;

	@Column(name="CREATE_USER_ID")
	private String createUserId;

	@Column(name="CREATE_USER_NAME")
	private String createUserName;

	@Column(name="ORIGINAL_VALUE")
	private BigDecimal originalValue;

    @Temporal( TemporalType.DATE)
	@Column(name="RECENTLY_UPDATE_DATE")
	private Date recentlyUpdateDate;

	@Column(name="RECENTLY_UPDATE_ID")
	private String recentlyUpdateId;

	@Column(name="RECENTLY_UPDATE_NAME")
	private String recentlyUpdateName;

	@Column(name="TARGET_CODE")
	private String targetCode;

	@Column(name="TARGET_VALUE")
	private BigDecimal targetValue;

	@Column(name="TASK_ID")
	private Long taskId;

	public Long getTargetNo() {
		return targetNo;
	}

	public void setTargetNo(Long targetNo) {
		this.targetNo = targetNo;
	}

	public BigDecimal getAchievePercent() {
		return achievePercent;
	}

	public void setAchievePercent(BigDecimal achievePercent) {
		this.achievePercent = achievePercent;
	}

	public BigDecimal getAchieveValue() {
		return achieveValue;
	}

	public void setAchieveValue(BigDecimal achieveValue) {
		this.achieveValue = achieveValue;
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

	public BigDecimal getOriginalValue() {
		return originalValue;
	}

	public void setOriginalValue(BigDecimal originalValue) {
		this.originalValue = originalValue;
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

	public String getTargetCode() {
		return targetCode;
	}

	public void setTargetCode(String targetCode) {
		this.targetCode = targetCode;
	}

	public BigDecimal getTargetValue() {
		return targetValue;
	}

	public void setTargetValue(BigDecimal targetValue) {
		this.targetValue = targetValue;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}