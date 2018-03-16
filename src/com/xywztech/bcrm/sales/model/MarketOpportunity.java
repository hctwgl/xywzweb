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
 * The persistent class for the OCRM_F_MM_MKT_OPPORTUNITY database table.
 * 商机管理表
 */
@Entity
@Table(name="OCRM_F_MM_MKT_OPPORTUNITY")
public class MarketOpportunity implements Serializable {

	private static final long serialVersionUID = -1982575443289294757L;

	/**商机ID*/
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name="MKT_OPPOR_ID")
	private Long marketOpporId;

	/**商机目标客户*/
	@Column(name="AIM_CUST_ID",length=40)
	private String aimCustomerId;

	/**目标客户名称*/
	@Column(name="AIM_CUST_NAME",length=300)
	private String aimCustomerName;

	/**创建日期*/
    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

    /**创建人*/
	@Column(name="CREATE_USER",length=100)
	private String createUser;
	
	/**更新日期*/
    @Temporal( TemporalType.DATE)
    @Column(name="UPDATE_DATE")
    private Date updateDate;

    /**更新人*/
    @Column(name="UPDATE_USER",length=100)
    private String updateUser;

	/**商机名称*/
	@Column(name="MKT_OPPOR_NAME",length=200)
	private String marketOpportunityName;

	/**商机状态*/
	@Column(name="MKT_OPPOR_STAT",length=20)
	private String marketOpportunityStatement;

	/**商机类型*/
	@Column(name="MKT_OPPOR_TYPE",length=20)
	private String marketOpportunityType;

	/**执行人_用户ID*/
	@Column(name="OPER_USER_ID",length=100)
	private String operUserId;

	/**商机分析说明*/
	@Column(name="OPPOR_ANALYSIS",length=600)
	private String opportunityAnalysis;

	/**商机内容*/
	@Column(name="OPPOR_CONTENT",length=600)
	private String opportunityContent;

	/**实际完成时间*/
    @Temporal( TemporalType.DATE)
	@Column(name="OPPOR_END_DATE")
	private Date opportunityEndDate;

    /**预计完成日期*/
    @Temporal( TemporalType.DATE)
	@Column(name="OPPOR_PLANEND_DATE")
	private Date opportunityPlanEndDate;

    /**开始时间*/
    @Temporal( TemporalType.DATE)
	@Column(name="OPPOR_START_DATE")
	private Date opportunityStartDate;
    
    /**营销活动ID*/
    @Column(name="MKT_ACTI_ID",length=100)
    private Long marketActivityId;

	public Long getMarketOpporId() {
		return marketOpporId;
	}

	public void setMarketOpporId(Long marketOpporId) {
		this.marketOpporId = marketOpporId;
	}

	public String getAimCustomerId() {
		return aimCustomerId;
	}

	public void setAimCustomerId(String aimCustomerId) {
		this.aimCustomerId = aimCustomerId;
	}

	public String getAimCustomerName() {
		return aimCustomerName;
	}

	public void setAimCustomerName(String aimCustomerName) {
		this.aimCustomerName = aimCustomerName;
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

	public String getMarketOpportunityName() {
		return marketOpportunityName;
	}

	public void setMarketOpportunityName(String marketOpportunityName) {
		this.marketOpportunityName = marketOpportunityName;
	}

	public String getMarketOpportunityStatement() {
		return marketOpportunityStatement;
	}

	public void setMarketOpportunityStatement(String marketOpportunityStatement) {
		this.marketOpportunityStatement = marketOpportunityStatement;
	}

	public String getMarketOpportunityType() {
		return marketOpportunityType;
	}

	public void setMarketOpportunityType(String marketOpportunityType) {
		this.marketOpportunityType = marketOpportunityType;
	}

	public String getOperUserId() {
		return operUserId;
	}

	public void setOperUserId(String operUserId) {
		this.operUserId = operUserId;
	}

	public String getOpportunityAnalysis() {
		return opportunityAnalysis;
	}

	public void setOpportunityAnalysis(String opportunityAnalysis) {
		this.opportunityAnalysis = opportunityAnalysis;
	}

	public String getOpportunityContent() {
		return opportunityContent;
	}

	public void setOpportunityContent(String opportunityContent) {
		this.opportunityContent = opportunityContent;
	}

	public Date getOpportunityEndDate() {
		return opportunityEndDate;
	}

	public void setOpportunityEndDate(Date opportunityEndDate) {
		this.opportunityEndDate = opportunityEndDate;
	}

	public Date getOpportunityPlanEndDate() {
		return opportunityPlanEndDate;
	}

	public void setOpportunityPlanEndDate(Date opportunityPlanEndDate) {
		this.opportunityPlanEndDate = opportunityPlanEndDate;
	}

	public Date getOpportunityStartDate() {
		return opportunityStartDate;
	}

	public void setOpportunityStartDate(Date opportunityStartDate) {
		this.opportunityStartDate = opportunityStartDate;
	}

//	public MarketActivity getMarketActivity() {
//		return marketActivity;
//	}
//
//	public void setMarketActivity(MarketActivity marketActivity) {
//		this.marketActivity = marketActivity;
//	}
//
//	public MarketPlan getMarketPlan() {
//		return marketPlan;
//	}
//
//	public void setMarketPlan(MarketPlan marketPlan) {
//		this.marketPlan = marketPlan;
//	}
//
//	public Set<OpportunityStage> getOpportunityStages() {
//		return OpportunityStages;
//	}
//
//	public void setOpportunityStages(Set<OpportunityStage> opportunityStages) {
//		OpportunityStages = opportunityStages;
//	}
	
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

    public Long getMarketActivityId() {
		return marketActivityId;
	}

	public void setMarketActivityId(Long marketActivityId) {
		this.marketActivityId = marketActivityId;
	}

	public static long getSerialversionuid() {
        return serialVersionUID;
    }
}