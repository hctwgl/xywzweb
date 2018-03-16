package com.xywztech.bcrm.serviceManage.model;

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
 * 客户业务申请
 * @author MingHp
 * @since 2012-12-11
 */
@Entity
@Table(name="OCRM_F_CUST_BUSINESS_APPLY")
public class OcrmFCustBusinessApply implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "SEQ_OCRM_F_CUST_BUSINESS_APPLY_GENERATOR", sequenceName = "SEQ_OCRM_F_CUST_BUSINESS_APPLY",allocationSize = 1)
	@GeneratedValue(generator = "SEQ_OCRM_F_CUST_BUSINESS_APPLY_GENERATOR", strategy = GenerationType.SEQUENCE)
	@Column(name = "id",nullable = false)
	private Long id;
	
	/**
	 * 客户编号
	 */
	@Column(name="CUST_ID")
	private String custId;
	/**
	 * 客户名称
	 */
	@Column(name="CUST_NAME")
	private String custName;
	/**
	 * 渠道来源:网站、客服呼叫中心
	 */
	@Column(name="CHANNEL_SOURCE")
	private Integer channelSource;
	/**
	 * 办公地址
	 */
	@Column(name="OFFICE_ADDRESS")
	private String officeAddress;
	/**
	 * 联系人
	 */
	@Column(name="CONTACTOR")
	private String contactor;
	/**
	 * 联系方式
	 */
	@Column(name="CONTACT_WAY")
	private String contactWay;
	/**
	 * 申请业务品种
	 */
	@Column(name="APPLY_BUSINESS_TYPE")
	private String applyBusinessType;
	/**
	 * 申请时间
	 */
	@Temporal(TemporalType.DATE)
	@Column(name="APPLY_TIME")
	private Date applyTime;
	/**
	 * 建议经办机构名称
	 */
	@Column(name="DEAL_ORG_NAME")
	private String dealOrg;
	
	/**
	 * 建议经办机构
	 */
	@Column(name="DEAL_ORG_ID")
	private String dealOrgId;
	
	/**备注*/
	@Column(name="REMARK")
	private String remark;

	public Long getId() {
		return id;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public Integer getChannelSource() {
		return channelSource;
	}

	public void setChannelSource(Integer channelSource) {
		this.channelSource = channelSource;
	}

	public String getOfficeAddress() {
		return officeAddress;
	}

	public void setOfficeAddress(String officeAddress) {
		this.officeAddress = officeAddress;
	}

	public String getContactor() {
		return contactor;
	}

	public void setContactor(String contactor) {
		this.contactor = contactor;
	}

	public String getContactWay() {
		return contactWay;
	}

	public void setContactWay(String contactWay) {
		this.contactWay = contactWay;
	}

	public String getApplyBusinessType() {
		return applyBusinessType;
	}

	public void setApplyBusinessType(String applyBusinessType) {
		this.applyBusinessType = applyBusinessType;
	}

	public Date getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}

	public String getDealOrg() {
		return dealOrg;
	}

	public void setDealOrg(String dealOrg) {
		this.dealOrg = dealOrg;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getDealOrgId() {
		return dealOrgId;
	}

	public void setDealOrgId(String dealOrgId) {
		this.dealOrgId = dealOrgId;
	}
	

}