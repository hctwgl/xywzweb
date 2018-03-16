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
 * The persistent class for the OCRM_F_CI_INCPRODUCT_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_INCPRODUCT_INFO")
public class OcrmFCiIncproductInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_INCPRODUCT_INFO_SERVERID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_INCPRODUCT_INFO_SERVERID_GENERATOR")
	@Column(name="SERVER_ID", unique=true, nullable=false)
	private Long serverId;

	@Column(name="AREA_NEED")
	private String areaNeed;

	@Temporal( TemporalType.DATE)
	@Column(name="BEG_DT")
	private Date begDt;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="CREATE_USER")
	private String createUser;

	@Column(name="CUST_ID")
	private String custId;

	@Temporal( TemporalType.DATE)
	@Column(name="END_DT")
	private Date endDt;

	@Column(name="LEVEL_NEED")
	private String levelNeed;

	private String price;

	private String remark;

	@Column(name="SERVER_LINK_TEL")
	private String serverLinkTel;

	@Column(name="SERVER_NAME")
	private String serverName;

	@Column(name="SERVICE_BUS_NAME")
	private String serviceBusName;

	@Column(name="SERVICE_BUS_TEL")
	private String serviceBusTel;

	@Column(name="SERVICE_CONTENT")
	private String serviceContent;

	@Column(name="SERVICE_LINK_MAN")
	private String serviceLinkMan;

	@Column(name="SERVICE_TYPE")
	private String serviceType;

    @Temporal( TemporalType.DATE)
	@Column(name="UPDATE_DATE")
	private Date updateDate;

	@Column(name="UPDATE_USER")
	private String updateUser;
	
    public OcrmFCiIncproductInfo() {
    }

	public Long getServerId() {
		return this.serverId;
	}

	public void setServerId(Long serverId) {
		this.serverId = serverId;
	}

	public String getAreaNeed() {
		return areaNeed;
	}

	public void setAreaNeed(String areaNeed) {
		this.areaNeed = areaNeed;
	}

	public Date getBegDt() {
		return begDt;
	}

	public void setBegDt(Date begDt) {
		this.begDt = begDt;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public Date getEndDt() {
		return endDt;
	}

	public void setEndDt(Date endDt) {
		this.endDt = endDt;
	}

	public String getLevelNeed() {
		return levelNeed;
	}

	public void setLevelNeed(String levelNeed) {
		this.levelNeed = levelNeed;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getServerLinkTel() {
		return serverLinkTel;
	}

	public void setServerLinkTel(String serverLinkTel) {
		this.serverLinkTel = serverLinkTel;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public String getServiceBusName() {
		return serviceBusName;
	}

	public void setServiceBusName(String serviceBusName) {
		this.serviceBusName = serviceBusName;
	}

	public String getServiceBusTel() {
		return serviceBusTel;
	}

	public void setServiceBusTel(String serviceBusTel) {
		this.serviceBusTel = serviceBusTel;
	}

	public String getServiceContent() {
		return serviceContent;
	}

	public void setServiceContent(String serviceContent) {
		this.serviceContent = serviceContent;
	}

	public String getServiceLinkMan() {
		return serviceLinkMan;
	}

	public void setServiceLinkMan(String serviceLinkMan) {
		this.serviceLinkMan = serviceLinkMan;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
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

	

}