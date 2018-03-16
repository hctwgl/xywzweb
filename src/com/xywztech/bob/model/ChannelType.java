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
 * The persistent class for the OCRM_F_MM_CHANNEL_TYPE database table. 
 * 渠道类型表
 */
@Entity
@Table(name = "OCRM_F_MM_CHANNEL_TYPE")
public class ChannelType implements Serializable {

	private static final long serialVersionUID = 7245115239307762382L;

	/** 渠道类型ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "CHANNEL_TYPE_ID", nullable = false)
	private Long channelTypeId;

	/** 渠道类型名称 */
	@Column(name = "CHANNEL_TYPE_NAME", length = 200)
	private String channelTypeName;

	/** 中小企业标识 */
	@Column(name = "IS_SMALL", length = 20)
	private String isSmall;
	
	/** 创建人 */
	@Column(name = "CREATE_USER", length = 100)
	private String createUser;

	/** 创建日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;
	
	/** 更新人 */
	@Column(name = "UPDATE_USER", length = 100)
	private String updateUser;

	/** 创建日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "UPDATE_DATE")
	private Date updateDate;
	
//	// bi-directional many-to-one association to OcrmFMmChannelInfo
//	@OneToMany(mappedBy = "channelTypeId")
//	private Set<ChannelInfo> channelInfos;

	public Long getChannelTypeId() {
		return channelTypeId;
	}

	public void setChannelTypeId(Long channelTypeId) {
		this.channelTypeId = channelTypeId;
	}

	public String getChannelTypeName() {
		return channelTypeName;
	}

	public void setChannelTypeName(String channelTypeName) {
		this.channelTypeName = channelTypeName;
	}

	public String getIsSmall() {
		return isSmall;
	}

	public void setIsSmall(String isSmall) {
		this.isSmall = isSmall;
	}
	
	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}