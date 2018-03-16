package com.xywztech.bcrm.sales.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
 * The persistent class for the OCRM_F_MM_MKT_PLAN database table. 
 * 营销计划表
 */
@Entity
@Table(name = "OCRM_F_MM_MKT_PLAN")
public class MarketPlan implements Serializable {

	private static final long serialVersionUID = -106009750295705738L;

	/** 营销计划ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "PLAN_ID")
	private Long planId;

	/** 创建日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;

	/** 创建人 */
	@Column(name = "CREATE_USER", length = 100)
	private String createUser;

	/** 营销计划目的 */
	@Column(name = "MKT_PLAN_AIM", length = 800)
	private String marketPlanAim;

	/** 预计费用 */
	@Column(name = "MKT_PLAN_CHARGE")
	private BigDecimal marketPlanCharge;

	/** 营销计划内容 */
	@Column(name = "MKT_PLAN_CONT", length = 800)
	private String marketPlanContent;

	/** 营销计划状态 */
	@Column(name = "MKT_PLAN_STAT", length = 13)
	private String marketPlanStatement;

	/** 涉及客户群描述 */
	@Column(name = "PLAN_CUST_DESC", length = 600)
	private String planCustomerDescribe;

	/** 计划结束日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "PLAN_END_DATE")
	private Date planEndDate;
	
	/** 实际完成日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "ACTUAL_END_DATE")
	private Date actualEndDate;

	/** 营销计划名称 */
	@Column(name = "PLAN_NAME", length = 200)
	private String planName;

	/** 涉及产品描述 */
	@Column(name = "PLAN_PROD_DESC", length = 600)
	private String planProductDescribe;

	/** 计划开始日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "PLAN_START_DATE")
	private Date planStartDate;

	/** 最近维护人 */
	@Column(name = "UPDATE_USER", length = 100)
	private String updateUser;

	/** 最近维护日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "UPDATE_DATE")
	private Date updateDate;

//	// bi-directional many-to-one association to OcrmFMmMktActivity
//	@OneToMany(mappedBy = "marketPlan")
//	private Set<MarketActivity> marketActivities;
//
//	// bi-directional many-to-one association to OcrmFMmMktOpportunity
//	@OneToMany(mappedBy = "marketPlan")
//	private Set<MarketOpportunity> marketOpportunities;
//
//	// bi-directional many-to-one association to OcrmFMmPlanCust
//	@OneToMany(mappedBy = "marketPlan")
//	private Set<PlanCustomer> planCustomers;
//
//	// bi-directional many-to-one association to OcrmFMmPlanProd
//	@OneToMany(mappedBy = "marketPlan")
//	private Set<PlanProduct> planProducts;

	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
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

	public String getMarketPlanAim() {
		return marketPlanAim;
	}

	public void setMarketPlanAim(String marketPlanAim) {
		this.marketPlanAim = marketPlanAim;
	}

	public BigDecimal getMarketPlanCharge() {
		return marketPlanCharge;
	}

	public void setMarketPlanCharge(BigDecimal marketPlanCharge) {
		this.marketPlanCharge = marketPlanCharge;
	}

	public String getMarketPlanContent() {
		return marketPlanContent;
	}

	public void setMarketPlanContent(String marketPlanContent) {
		this.marketPlanContent = marketPlanContent;
	}

	public String getMarketPlanStatement() {
		return marketPlanStatement;
	}

	public void setMarketPlanStatement(String marketPlanStatement) {
		this.marketPlanStatement = marketPlanStatement;
	}

	public String getPlanCustomerDescribe() {
		return planCustomerDescribe;
	}

	public void setPlanCustomerDescribe(String planCustomerDescribe) {
		this.planCustomerDescribe = planCustomerDescribe;
	}

	public Date getPlanEndDate() {
		return planEndDate;
	}

	public void setPlanEndDate(Date planEndDate) {
		this.planEndDate = planEndDate;
	}

	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public String getPlanProductDescribe() {
		return planProductDescribe;
	}

	public void setPlanProductDescribe(String planProductDescribe) {
		this.planProductDescribe = planProductDescribe;
	}

	public Date getPlanStartDate() {
		return planStartDate;
	}

	public void setPlanStartDate(Date planStartDate) {
		this.planStartDate = planStartDate;
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
	
	public Date getActualEndDate() {
		return actualEndDate;
	}

	public void setActualEndDate(Date actualEndDate) {
		this.actualEndDate = actualEndDate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
//
//	public Set<MarketActivity> getMarketActivities() {
//		return marketActivities;
//	}
//
//	public void setMarketActivities(Set<MarketActivity> marketActivities) {
//		this.marketActivities = marketActivities;
//	}
//
//	public Set<MarketOpportunity> getMarketOpportunities() {
//		return marketOpportunities;
//	}
//
//	public void setMarketOpportunities(
//			Set<MarketOpportunity> marketOpportunities) {
//		this.marketOpportunities = marketOpportunities;
//	}
//
//	public Set<PlanCustomer> getPlanCustomers() {
//		return planCustomers;
//	}
//
//	public void setPlanCustomers(Set<PlanCustomer> planCustomers) {
//		this.planCustomers = planCustomers;
//	}
//
//	public Set<PlanProduct> getPlanProducts() {
//		return planProducts;
//	}
//
//	public void setPlanProducts(Set<PlanProduct> planProducts) {
//		this.planProducts = planProducts;
//	}
}