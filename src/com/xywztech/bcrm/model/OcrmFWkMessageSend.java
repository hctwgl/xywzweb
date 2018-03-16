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
 * The persistent class for the OCRM_F_WK_MESSAGE_SEND database table. 
 * 站内信、短信、邮件收发表
 */
@Entity
@Table(name = "OCRM_F_WK_MESSAGE_SEND")
public class OcrmFWkMessageSend implements Serializable {

	private static final long serialVersionUID = 1L;

	/** 关联ID */
	@Id
	@SequenceGenerator(name="OCRM_F_WK_MESSAGE_SEND_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_WK_MESSAGE_SEND_ID_GENERATOR")
	@Column(name = "MESSAGE_ID",unique=true, nullable=false)
	private Long messageId;
	/** 发送渠道 */
	@Column(name = "SEND_CHANNEL")
	private Long sendChannel;

	/** 方案ID */
	@Column(name = "CUSTOMIZE_SCENARIO_ID")
	private Long customizeScenarioId;

	/** 发送方式 */
	@Column(name = "SEND_TYPE")
	private Long sendType;
	
	/** 发送人用户类别 */
	@Column(name = "SEND_USER_TYPE")
	private Long sendUserType;

	/** 发送人ID */
	@Column(name = "SEND_USER_ID", length =100)
	private String sendUserId;
	
	/** 发送人名称 */
	@Column(name = "SEND_USER_NAME", length = 100)
	private String sendUserName;
	
	/** 发送人电话号码 */
	@Column(name = "SEND_USER_TEL", length = 20)
	private String sendUserTel;
	
	/** 发送人邮箱 */
	@Column(name = "SEND_USER_MAIL", length = 100)
	private String sendUserMail;

	/** 接收人用户类别 */
	@Column(name = "RECEIVE_USER_TYPE")
	private Long receiveUserType;

	/** 接收人ID */
	@Column(name = "RECEIVE_USER_ID", length = 100)
	private String receiveUserId;
	
	/** 接收人名称 */
	@Column(name = "RECEIVE_USER_NAME", length = 100)
	private String receiveUserName;
	
	/** 接收人电话号码 */
	@Column(name = "RECEIVE_USER_TEL", length = 20)
	private String receiveUserTel;
	
	/** 接收人邮箱 */
	@Column(name = "RECEIVE_USER_MAIL", length = 100)
	private String receiveUserMail;
	
	/** 标题 */
	@Column(name = "TITLE", length = 200)
	private String title;
	
	/** 发送内容 */
	@Column(name = "CONTENT", length = 2000)
	private String content;
	
	/** 发送时间 */
	@Temporal(TemporalType.DATE)
	@Column(name = "SEND_TIME")
	private Date sendTime;
	
	/** 是否已读标志 */
	@Column(name = "IS_READ_FLAG")
	private Long isReadFlag;
	
	/** 读取时间 */
	@Temporal(TemporalType.DATE)
	@Column(name = "READ_TIME")
	private Date readTime;

	/**删除状态*/
	@Column(name = "STATE", length = 1)
	private String state;

	/** 定时发送时间 */
	@Temporal(TemporalType.DATE)
	@Column(name = "TIMER")
	private Date timer;
	
	/**发送状态*/
	@Column(name = "IS_SEND_FLAG", length = 1)
	private String isSendFlag;
	
	/**消息类别（0、普通消息，1、祝福类消息，2、产品类消息、3、账户类消息等等）*/
	@Column(name = "MESSAGE_TYPE")
	private Long messageType;
	
	/**关联模块类别（0、没有关联模块，1、产品模块，2、营销活动模块）*/
	@Column(name = "CORRELATIVE_MODULE_TYPE")
	private Long correlativeModuleType;
	
	/**关联的模块内信息的ID*/
	@Column(name = "CORRELATIVE_MODULE_ID")
	private Long correlativeModuleId;
	
	/**关联的模块内信息的名称*/
	@Column(name = "CORRELATIVE_MODULE_NAME", length = 100)
	private String correlativeModuleName;
	
	
	
	
	public Date getTimer() {
		return timer;
	}

	public void setTimer(Date timer) {
		this.timer = timer;
	}

	public String getIsSendFlag() {
		return isSendFlag;
	}

	public void setIsSendFlag(String isSendFlag) {
		this.isSendFlag = isSendFlag;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Long getMessageId() {
		return messageId;
	}

	public void setMessageId(Long messageId) {
		this.messageId = messageId;
	}

	public Long getSendChannel() {
		return sendChannel;
	}

	public void setSendChannel(Long sendChannel) {
		this.sendChannel = sendChannel;
	}

	public Long getCustomizeScenarioId() {
		return customizeScenarioId;
	}

	public void setCustomizeScenarioId(Long customizeScenarioId) {
		this.customizeScenarioId = customizeScenarioId;
	}

	public Long getSendType() {
		return sendType;
	}

	public void setSendType(Long sendType) {
		this.sendType = sendType;
	}

	public Long getSendUserType() {
		return sendUserType;
	}

	public void setSendUserType(Long sendUserType) {
		this.sendUserType = sendUserType;
	}



	public String getSendUserName() {
		return sendUserName;
	}

	public void setSendUserName(String sendUserName) {
		this.sendUserName = sendUserName;
	}

	public String getSendUserTel() {
		return sendUserTel;
	}

	public void setSendUserTel(String sendUserTel) {
		this.sendUserTel = sendUserTel;
	}

	public String getSendUserMail() {
		return sendUserMail;
	}

	public void setSendUserMail(String sendUserMail) {
		this.sendUserMail = sendUserMail;
	}

	public Long getReceiveUserType() {
		return receiveUserType;
	}

	public void setReceiveUserType(Long receiveUserType) {
		this.receiveUserType = receiveUserType;
	}



	public String getSendUserId() {
		return sendUserId;
	}

	public void setSendUserId(String sendUserId) {
		this.sendUserId = sendUserId;
	}

	public String getReceiveUserId() {
		return receiveUserId;
	}

	public void setReceiveUserId(String receiveUserId) {
		this.receiveUserId = receiveUserId;
	}

	public String getReceiveUserName() {
		return receiveUserName;
	}

	public void setReceiveUserName(String receiveUserName) {
		this.receiveUserName = receiveUserName;
	}

	public String getReceiveUserTel() {
		return receiveUserTel;
	}

	public void setReceiveUserTel(String receiveUserTel) {
		this.receiveUserTel = receiveUserTel;
	}

	public String getReceiveUserMail() {
		return receiveUserMail;
	}

	public void setReceiveUserMail(String receiveUserMail) {
		this.receiveUserMail = receiveUserMail;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public Long getIsReadFlag() {
		return isReadFlag;
	}

	public void setIsReadFlag(Long isReadFlag) {
		this.isReadFlag = isReadFlag;
	}

	public Date getReadTime() {
		return readTime;
	}

	public void setReadTime(Date readTime) {
		this.readTime = readTime;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getMessageType() {
		return messageType;
	}

	public void setMessageType(Long messageType) {
		this.messageType = messageType;
	}

	public Long getCorrelativeModuleType() {
		return correlativeModuleType;
	}

	public void setCorrelativeModuleType(Long correlativeModuleType) {
		this.correlativeModuleType = correlativeModuleType;
	}

	public Long getCorrelativeModuleId() {
		return correlativeModuleId;
	}

	public void setCorrelativeModuleId(Long correlativeModuleId) {
		this.correlativeModuleId = correlativeModuleId;
	}

	public String getCorrelativeModuleName() {
		return correlativeModuleName;
	}

	public void setCorrelativeModuleName(String correlativeModuleName) {
		this.correlativeModuleName = correlativeModuleName;
	}


	}