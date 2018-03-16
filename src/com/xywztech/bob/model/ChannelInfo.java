package com.xywztech.bob.model;

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
 * The persistent class for the OCRM_F_MM_CHANNEL_INFO database table. 
 * 渠道管理表
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "OCRM_F_MM_CHANNEL_INFO")
public class ChannelInfo implements Serializable {

	//private static final long serialVersionUID = 2476367195732252769L;

	/** 渠道ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "CHANNEL_ID",nullable = false)
	private Long channelId;

	/** 准入条件 */
	@Column(name = "ACCESS_CONDITION", length = 800)
	private String accessCondition;

	/** 渠道特点 */
	@Column(name = "CHANNEL_FEATURE", length = 800)
	private String channelFeature;

	/** 渠道政策 */
	@Column(name = "CHANNEL_POLICY", length = 800)
	private String channelPolicy;

	/** 渠道类型 */
	@Column(name = "CHANNEL_TYPE_ID", length = 20)
	private String channelTypeId;

	/** 渠道编号 */
	@Column(name = "CHANNEL_CODE", length = 400)
	private String channelCode;

	/** 渠道名称 */
	@Column(name = "CHANNEL_NAME", length = 400)
	private String channelName;

	/** 建立日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;

	/** 建立机构 */
	@Column(name = "CREATE_ORG", length = 100)
	private String createOrganization;

	/** 建立用户 */
	@Column(name = "CREATE_USER", length = 100)
	private String createUser;
	
	/** 更新日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "UPDATE_DATE")
	private Date updateDate;

	/** 更新人 */
	@Column(name = "UPDATE_USER", length = 100)
	private String updateUser;

	/** 担保 */
	@Column(name = "GUARANTEE", length = 800)
	private String guarantee;

	/** 备注 */
	@Column(name = "REMARK", length = 800)
	private String remark;

	public Long getChannelId() {
		return channelId;
	}

	public void setChannelId(Long channelId) {
		this.channelId = channelId;
	}

	public String getAccessCondition() {
		return accessCondition;
	}

	public void setAccessCondition(String accessCondition) {
		this.accessCondition = accessCondition;
	}

	public String getChannelFeature() {
		return channelFeature;
	}

	public void setChannelFeature(String channelFeature) {
		this.channelFeature = channelFeature;
	}

	public String getChannelPolicy() {
		return channelPolicy;
	}

	public void setChannelPolicy(String channelPolicy) {
		this.channelPolicy = channelPolicy;
	}

	public String getChannelCode() {
		return channelCode;
	}

	public void setChannelCode(String channelCode) {
		this.channelCode = channelCode;
	}

	public String getChannelName() {
		return channelName;
	}

	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateOrganization() {
		return createOrganization;
	}

	public void setCreateOrganization(String createOrganization) {
		this.createOrganization = createOrganization;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getGuarantee() {
		return guarantee;
	}

	public void setGuarantee(String guarantee) {
		this.guarantee = guarantee;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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
	
	public String getChannelTypeId() {
		return channelTypeId;
	}

	public void setChannelTypeId(String channelTypeId) {
		this.channelTypeId = channelTypeId;
	}

}