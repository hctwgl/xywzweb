package com.xywztech.bcrm.serviceManage.model;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;

/**
 * 客户服务信息表
 * @author yuyz
 * @since 2012-12-06
 * 
 */
@Entity
@Table(name="OCRM_F_SE_CUST_SERVICE")
public class CustServiceInfo implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "ServiceSequnce", sequenceName = "SERVICESEQUNCE",allocationSize = 1)
	@GeneratedValue(generator = "ServiceSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "SERVICE_ID",nullable = false)
	private Long serviceId;//服务信息编号

	@Column(name="CUST_ID")
	private String custId;//客户号

	@Column(name="CUST_NAME")
	private String custName;//客户名称

	@Column(name="SERVICE_STAT")
	private String serviceStat;//服务状态
	
	@Column(name="SERVICE_CONT")
	private String serviceCont;//服务内容
	
	@Column(name="NEED_RESOURCE")
	private String needResource;//所需资源
	
	@Column(name="SERVICE_KIND")
	private String serviceKind;//服务类别

	@Temporal(TemporalType.DATE)
	@Column(name="PSTART_DATE")
	private Date pStartDate;//计划开始时间
	
	@Temporal(TemporalType.DATE)
	@Column(name="PEND_DATE")
	private Date pEndDate;//计划开始时间
	
	@Temporal(TemporalType.DATE)
	@Column(name="ACTUAL_DATE")
	private Date actualDate;//实际服务时间
	
	@Column(name="PLAN_CHANNEL")
	private String planChannel;//服务预计渠道

	@Column(name="CANTACT_CHANNEL")
	private String cantactChannel;//实际接触渠道

	@Column(name="AIM_PROD")
	private String aimProd;//目标产品
	
	@Column(name="SERVICE_RESULT")
	private String serviceResult;//服务结果
	
	@Column(name="NEED_EVENT")
	private String needEvent;//待跟进事项
	
	@Column(name="CREATE_USER")
	private String createUser;//创建人
	
	@Column(name="CREATE_ORG")
	private String createOrg;//创建机构

	@Temporal(TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;//创建日期
	
	@Column(name="UPDATE_USER")
	private String updateUser;//最近更新人
	
	@Temporal(TemporalType.DATE)
	@Column(name="UPDATE_DATE")
	private Date updateDate;//最近修改日期
	
	@Column(name="P_OR_C")
	private String pOrC;//对公对私标识

	public Long getServiceId() {
		return serviceId;
	}

	public void setServiceId(Long serviceId) {
		this.serviceId = serviceId;
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

	public String getServiceStat() {
		return serviceStat;
	}

	public void setServiceStat(String serviceStat) {
		this.serviceStat = serviceStat;
	}

	public String getServiceCont() {
		return serviceCont;
	}

	public void setServiceCont(String serviceCont) {
		this.serviceCont = serviceCont;
	}

	public String getNeedResource() {
		return needResource;
	}

	public void setNeedResource(String needResource) {
		this.needResource = needResource;
	}

	public String getServiceKind() {
		return serviceKind;
	}

	public void setServiceKind(String serviceKind) {
		this.serviceKind = serviceKind;
	}

	public Date getpStartDate() {
		return pStartDate;
	}

	public void setpStartDate(Date pStartDate) {
		this.pStartDate = pStartDate;
	}
	
	public Date getpEndDate() {
		return pEndDate;
	}

	public void setpEndDate(Date pEndDate) {
		this.pEndDate = pEndDate;
	}

	public Date getActualDate() {
		return actualDate;
	}

	public void setActualDate(Date actualDate) {
		this.actualDate = actualDate;
	}

	public String getPlanChannel() {
		return planChannel;
	}

	public void setPlanChannel(String planChannel) {
		this.planChannel = planChannel;
	}

	public String getCantactChannel() {
		return cantactChannel;
	}

	public void setCantactChannel(String cantactChannel) {
		this.cantactChannel = cantactChannel;
	}

	public String getAimProd() {
		return aimProd;
	}

	public void setAimProd(String aimProd) {
		this.aimProd = aimProd;
	}

	public String getServiceResult() {
		return serviceResult;
	}

	public void setServiceResult(String serviceResult) {
		this.serviceResult = serviceResult;
	}

	public String getNeedEvent() {
		return needEvent;
	}

	public void setNeedEvent(String needEvent) {
		this.needEvent = needEvent;
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
	
	public String getCreateOrg() {
		return createOrg;
	}

	public void setCreateOrg(String createOrg) {
		this.createOrg = createOrg;
	}

	public String getpOrC() {
		return pOrC;
	}

	public void setpOrC(String pOrC) {
		this.pOrC = pOrC;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}