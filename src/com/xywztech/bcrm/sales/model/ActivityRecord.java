package com.xywztech.bcrm.sales.model;

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
 * The persistent class for the OCRM_F_MM_ACTI_RECORD database table. 
 * 营销活动明细记录表
 */
@Entity
@Table(name = "OCRM_F_MM_ACTI_RECORD")
public class ActivityRecord implements Serializable {

	private static final long serialVersionUID = -1248289628284241117L;

	/** 明细记录ID */
	@Id
	@Column(name = "RECORD_ID")
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	private Long recordId;

	/** 活动评价内容 */
	@Column(name = "ACTI_APP_CONT", length = 800)
	private String activityAppraiseContent;
	
	/** 活动评分 */
	@Column(name = "ACTI_APP_POINT", length = 18)
	private String activityAppraisePoint;

	/** 活动日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "ACTI_DATE")
	private Date activityDate;

	/** 执行人ID */
	@Column(name = "ACTI_USER", length = 100)
	private String activityUser;

	/** 主要沟通内容 */
	@Column(name = "COMM_CONT", length = 400)
	private String communicateContent;

	/** 沟通方式 */
	@Column(name = "COMM_WAY", length = 13)
	private String communicateWay;

	/** 创建日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;

	/** 创建人 */
	@Column(name = "CREATE_USER", length = 100)
	private String createUser;
	
	/** 最近更新日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "UPDATE_DATE")
	private Date updateDate;


	/** 最近更新人 */
	@Column(name = "UPDATE_USER", length = 100)
	private String updateUser;

	/** 是否已创建商机 */
	@Column(name = "IS_CREA_CHANCE", length = 13)
	private String isCreateChance;
	
	/** 营销活动ID */
	@Column(name = "MKT_ACTI_ID")
	private Long marketActivityId;
	
	/** 目标客户 */
	@Column(name = "TARGET_CUST", length = 50)
	private String targetCust;
	
	public String getTargetCust() {
		return targetCust;
	}

	public void setTargetCust(String targetCust) {
		this.targetCust = targetCust;
	}

	public Long getRecordId() {
		return recordId;
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public String getActivityAppraiseContent() {
		return activityAppraiseContent;
	}

	public void setActivityAppraiseContent(String activityAppraiseContent) {
		this.activityAppraiseContent = activityAppraiseContent;
	}

	public String getActivityAppraisePoint() {
		return activityAppraisePoint;
	}

	public void setActivityAppraisePoint(String activityAppraisePoint) {
		this.activityAppraisePoint = activityAppraisePoint;
	}


	public String getActivityUser() {
		return activityUser;
	}

	public void setActivityUser(String activityUser) {
		this.activityUser = activityUser;
	}

	public String getCommunicateContent() {
		return communicateContent;
	}

	public void setCommunicateContent(String communicateContent) {
		this.communicateContent = communicateContent;
	}

	public String getCommunicateWay() {
		return communicateWay;
	}

	public void setCommunicateWay(String communicateWay) {
		this.communicateWay = communicateWay;
	}


	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getIsCreateChance() {
		return isCreateChance;
	}

	public void setIsCreateChance(String isCreateChance) {
		this.isCreateChance = isCreateChance;
	}

//	public MarketActivity getMarketActivity() {
//		return marketActivity;
//	}
//
//	public void setMarketActivity(MarketActivity marketActivity) {
//		this.marketActivity = marketActivity;
//	}

    public Long getMarketActivityId() {
        return marketActivityId;
    }

	public Date getActivityDate() {
		return activityDate;
	}

	public void setActivityDate(Date activityDate) {
		this.activityDate = activityDate;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public void setMarketActivityId(Long marketActivityId) {
        this.marketActivityId = marketActivityId;
    }
    
    public static long getSerialversionuid() {
        return serialVersionUID;
    }
}