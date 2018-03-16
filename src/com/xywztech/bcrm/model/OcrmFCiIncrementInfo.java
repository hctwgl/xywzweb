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
 * The persistent class for the OCRM_F_CI_INCREMENT_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_INCREMENT_INFO")
public class OcrmFCiIncrementInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_INCREMENT_INFO_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_INCREMENT_INFO_ID_GENERATOR")
	@Column(name = "ID",unique=true, nullable=false)
	private Long id;
	@Column(name="BARTER_CON")
	private String barterCon;

	@Column(name="CERT_NUM")
	private String certNum;

	@Column(name="CERT_TYPE")
	private String certType;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="CREATE_ORG")
	private String createOrg;

	@Column(name="CREATE_USER")
	private String createUser;

	@Column(name="CUST_GRADE")
	private String custGrade;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

	private String feedback;

	@Column(name="IS_MESSAGE")
	private String isMessage;

	@Column(name="MOBILE_NUM")
	private String mobileNum;

	private String requestment;

	@Column(name="SERVER_ID")
	private Long serverId;

	@Column(name="SERVER_NAME")
	private String serverName;

	@Column(name="SERVICE_APPRAISEMENT")
	private String serviceAppraisement;

	@Column(name="SERVICE_CHANNEL")
	private String serviceChannel;

	@Column(name="SERVICE_DISTRIBUTE")
	private String serviceDistribute;

	@Column(name="SERVICE_STAT")
	private String serviceStat;
	

    public OcrmFCiIncrementInfo() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBarterCon() {
		return barterCon;
	}

	public void setBarterCon(String barterCon) {
		this.barterCon = barterCon;
	}

	public String getCertNum() {
		return certNum;
	}

	public void setCertNum(String certNum) {
		this.certNum = certNum;
	}

	public String getCertType() {
		return certType;
	}

	public void setCertType(String certType) {
		this.certType = certType;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateOrg() {
		return createOrg;
	}

	public void setCreateOrg(String createOrg) {
		this.createOrg = createOrg;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getCustGrade() {
		return custGrade;
	}

	public void setCustGrade(String custGrade) {
		this.custGrade = custGrade;
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

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getIsMessage() {
		return isMessage;
	}

	public void setIsMessage(String isMessage) {
		this.isMessage = isMessage;
	}

	public String getMobileNum() {
		return mobileNum;
	}

	public void setMobileNum(String mobileNum) {
		this.mobileNum = mobileNum;
	}

	public String getRequestment() {
		return requestment;
	}

	public void setRequestment(String requestment) {
		this.requestment = requestment;
	}

	public Long getServerId() {
		return serverId;
	}

	public void setServerId(Long serverId) {
		this.serverId = serverId;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public String getServiceAppraisement() {
		return serviceAppraisement;
	}

	public void setServiceAppraisement(String serviceAppraisement) {
		this.serviceAppraisement = serviceAppraisement;
	}

	public String getServiceChannel() {
		return serviceChannel;
	}

	public void setServiceChannel(String serviceChannel) {
		this.serviceChannel = serviceChannel;
	}

	public String getServiceDistribute() {
		return serviceDistribute;
	}

	public void setServiceDistribute(String serviceDistribute) {
		this.serviceDistribute = serviceDistribute;
	}

	public String getServiceStat() {
		return serviceStat;
	}

	public void setServiceStat(String serviceStat) {
		this.serviceStat = serviceStat;
	}

	

}