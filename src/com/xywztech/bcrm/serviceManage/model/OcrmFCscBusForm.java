package com.xywztech.bcrm.serviceManage.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * 客服中心业务处理单信息
 * @author MingHp
 * @since 2012-12-11
 */
@Entity
@Table(name="OCRM_F_CSC_BUS_FORM")
public class OcrmFCscBusForm implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "SEQ_OCRM_F_CSC_BUS_FORM_GENERATOR", sequenceName = "SEQ_OCRM_F_CSC_BUS_FORM",allocationSize = 1)
	@GeneratedValue(generator = "SEQ_OCRM_F_CSC_BUS_FORM_GENERATOR", strategy = GenerationType.SEQUENCE)
	@Column(name = "id",nullable = false)
	private Long id;
	/**
	 * 客户号
	 */
	@Column(name="CUST_ID")
	private String custId;
	/**
	 * 客户名称
	 */
	@Column(name="CUST_NAME")
	private String custName;
	/**
	 * 受理单号
	 */
	@Column(name="ADEALNO")
	private String acceptNo;
	/**
	 * 接入方式 ,1：来电 2：电邮
	 */
	@Column(name="DACCEPTTYPE")
	private Integer accessType;
	/**
	 * 账卡号
	 */
	@Column(name="AACCOUNTNO")
	private String account;
	/**
	 * 联系电话
	 */
	@Column(name="ALINKNUMBER")
	private String contacterPhone;
	/**
	 * 联系人姓名
	 */
	@Column(name="ALINKNAME")
	private String contacterName;
	/**
	 * 联系人性别
	 */
	@Column(name="ALINKSEX")
	private String contacterSex;
	/**
	 * 处理机构
	 */
	@Column(name="ADEALORGCODE")
	private String processingOrg;
	
	/**客户类型 0：其它
	1：个人
	2：对公
	3：VIP
	4：股东*/
	@Column(name="ACLIENTTYPE")
	private String customerType;
	
	/**
	 * 关联网点
	 */
	@Column(name="AREFBANKNOTE")
	private String associationNetwork;
	
	/**
	 * 重复投诉标志,1：重复投诉
					0：非重复投诉
	 */
	@Column(name="DRECOMPLAINFLAG")
	private Integer complaintsRep;
	/**
	 * 投诉认定,1：有效
				0：无效

	 */
	@Column(name="DVALIDFLAG")
	private Integer complaintsConfirm;
	
	/**
	 * 事件类型,0：投诉
				1：求助
				2：咨询
				3：建议
				4：表扬
	 */
	@Column(name="DEVENTYPE")
	private Integer eventType;
	
	/**
	 * 事件项,1：业务类型
		2：帐户信息
		3：财务情况
		4：积分
		99：其它
	 */
	@Column(name="DEVENTITEM")
	private Integer eventItem;
	/**
	 * 卡折机具情况,0：其它
				1：吞卡
				2：缺钞
				3：故障
				4：ATM帐务
				5：CSR帐务
				6：异常
	 */
	@Column(name="DMACHINETYPE")
	private Integer accidentType;
	
	/**
	 * 事件简述
	 */
	@Column(name="AEVENTDESC")
	private String eventDesc;
	/**
	 * 被吞卡种类
	 */
	@Column(name="DCARDTYPE")
	private Integer cardType;
	/**
	 * 受理内容
	 */
	@Column(name="AACCEPTECONTENT")
	private String acceptContent;
	/**
	 * 受理时间
	 */
	//@Temporal(TemporalType.DATE)
	@Column(name="AACCEPTETIME")
	private String acceptTime;
	
	/**
	 * 受理人员
	 */
	@Column(name="AACCEPTEPERSON")
	private String accepter;
	/**
	 * 客服中心意见
	 */
	@Column(name="ADISTCONTENT")
	private String serviceCenterOpinion;
	/**
	 * 派单时间
	 */
	//@Temporal(TemporalType.DATE)
	@Column(name="ADISTTIME")
	private String sentTime;
	/**
	 * 派单人员
	 */
	@Column(name="ADISTPERSON")
	private String senter;
	/**
	 * 处理机构回复
	 */
	@Column(name="ADEALCONTENT")
	private String processingReply;
	/**
	 * 处理回复时间
	 */
	//@Temporal(TemporalType.DATE)
	@Column(name="ADEALTIME")
	private String processingTime;
	/**
	 * 处理回复人员
	 */
	@Column(name="ADEALPERSON")
	private String handler;
	/**
	 * 审核意见
	 */
	@Column(name="ACHECKCONTENT")
	private String auditOpinion;
	/**
	 * 审核时间
	 */
	//@Temporal(TemporalType.DATE)
	@Column(name="ACHECKTIME")
	private String auditTime;
	/**
	 * 审核人员
	 */
	@Column(name="ACHECKPERSON")
	private String auditor;
	/**
	 * 复核意见
	 */
	@Column(name="ARCCONTENT")
	private String reviewOpinion;
	/**
	 * 复核时间
	 */
	//@Temporal(TemporalType.DATE)
	@Column(name="ARCTIME")
	private String reviewTime;
	/**
	 * 复核人员
	 */
	@Column(name="ARCPERSON")
	private String reviewer;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCustId() {
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getAcceptNo() {
		return acceptNo;
	}
	public void setAcceptNo(String acceptNo) {
		this.acceptNo = acceptNo;
	}
	public Integer getAccessType() {
		return accessType;
	}
	public void setAccessType(Integer accessType) {
		this.accessType = accessType;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getContacterPhone() {
		return contacterPhone;
	}
	public void setContacterPhone(String contacterPhone) {
		this.contacterPhone = contacterPhone;
	}
	public String getContacterName() {
		return contacterName;
	}
	public void setContacterName(String contacterName) {
		this.contacterName = contacterName;
	}
	public String getContacterSex() {
		return contacterSex;
	}
	public void setContacterSex(String contacterSex) {
		this.contacterSex = contacterSex;
	}
	public String getProcessingOrg() {
		return processingOrg;
	}
	public void setProcessingOrg(String processingOrg) {
		this.processingOrg = processingOrg;
	}
	public String getCustomerType() {
		return customerType;
	}
	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}
	public String getAssociationNetwork() {
		return associationNetwork;
	}
	public void setAssociationNetwork(String associationNetwork) {
		this.associationNetwork = associationNetwork;
	}
	public Integer getComplaintsRep() {
		return complaintsRep;
	}
	public void setComplaintsRep(Integer complaintsRep) {
		this.complaintsRep = complaintsRep;
	}
	public Integer getComplaintsConfirm() {
		return complaintsConfirm;
	}
	public void setComplaintsConfirm(Integer complaintsConfirm) {
		this.complaintsConfirm = complaintsConfirm;
	}
	public Integer getEventType() {
		return eventType;
	}
	public void setEventType(Integer eventType) {
		this.eventType = eventType;
	}
	public Integer getEventItem() {
		return eventItem;
	}
	public void setEventItem(Integer eventItem) {
		this.eventItem = eventItem;
	}
	public Integer getAccidentType() {
		return accidentType;
	}
	public void setAccidentType(Integer accidentType) {
		this.accidentType = accidentType;
	}
	public String getEventDesc() {
		return eventDesc;
	}
	public void setEventDesc(String eventDesc) {
		this.eventDesc = eventDesc;
	}
	public Integer getCardType() {
		return cardType;
	}
	public void setCardType(Integer cardType) {
		this.cardType = cardType;
	}
	public String getAcceptContent() {
		return acceptContent;
	}
	public void setAcceptContent(String acceptContent) {
		this.acceptContent = acceptContent;
	}
	public String getAcceptTime() {
		return acceptTime;
	}
	public void setAcceptTime(String acceptTime) {
		this.acceptTime = acceptTime;
	}
	public String getAccepter() {
		return accepter;
	}
	public void setAccepter(String accepter) {
		this.accepter = accepter;
	}
	public String getServiceCenterOpinion() {
		return serviceCenterOpinion;
	}
	public void setServiceCenterOpinion(String serviceCenterOpinion) {
		this.serviceCenterOpinion = serviceCenterOpinion;
	}
	public String getSentTime() {
		return sentTime;
	}
	public void setSentTime(String sentTime) {
		this.sentTime = sentTime;
	}
	public String getSenter() {
		return senter;
	}
	public void setSenter(String senter) {
		this.senter = senter;
	}
	public String getProcessingReply() {
		return processingReply;
	}
	public void setProcessingReply(String processingReply) {
		this.processingReply = processingReply;
	}
	public String getProcessingTime() {
		return processingTime;
	}
	public void setProcessingTime(String processingTime) {
		this.processingTime = processingTime;
	}
	public String getHandler() {
		return handler;
	}
	public void setHandler(String handler) {
		this.handler = handler;
	}
	public String getAuditOpinion() {
		return auditOpinion;
	}
	public void setAuditOpinion(String auditOpinion) {
		this.auditOpinion = auditOpinion;
	}
	public String getAuditTime() {
		return auditTime;
	}
	public void setAuditTime(String auditTime) {
		this.auditTime = auditTime;
	}
	public String getAuditor() {
		return auditor;
	}
	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}
	public String getReviewOpinion() {
		return reviewOpinion;
	}
	public void setReviewOpinion(String reviewOpinion) {
		this.reviewOpinion = reviewOpinion;
	}
	public String getReviewTime() {
		return reviewTime;
	}
	public void setReviewTime(String reviewTime) {
		this.reviewTime = reviewTime;
	}
	public String getReviewer() {
		return reviewer;
	}
	public void setReviewer(String reviewer) {
		this.reviewer = reviewer;
	}
	
	
	
	

}