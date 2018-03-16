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
 * The persistent class for the OCRM_F_MM_MKT_ACTIVITY database table. 
 * 营销活动管理表
 */
@Entity
@Table(name = "OCRM_F_MM_MKT_ACTIVITY")
public class MarketActivity implements Serializable {

    private static final long serialVersionUID = 555572512577715997L;

    /** 营销活动ID */
    @Id
    @GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
    @Column(name = "MKT_ACTI_ID")
    private Long marketActivityId;
    
    /** 营销活动名称 */
    @Column(name = "MKT_ACTI_NAME", length = 200)
    private String marketActivityName;

    /** 活动完成情况 */
    @Column(name = "ACTI_COMPL_CIRC", length = 800)
    private String activityComplementCircumstance;

    /** 客户ID */
    @Column(name = "ACTI_CUST_ID", length = 40)
    private String activityCustomerId;

    /** 客户名称 */
    @Column(name = "ACTI_CUST_NAME", length = 200)
    private String activityCustomerName;

    /** 计划开始时间 */
    @Temporal(TemporalType.DATE)
    @Column(name = "ACTI_PLAN_START_DATE")
    private Date actiPlanStartDate;
    
    /** 计划结束时间 */
    @Temporal(TemporalType.DATE)
    @Column(name = "ACTI_PLAN_END_DATE")
    private Date actiPlanEndDate;

    /** 执行人ID */
    @Column(name = "ACTI_OPER_ID", length = 100)
    private String activityOperaterId;

    /** 执行人姓名 */
    @Column(name = "ACTI_OPER_NAME", length = 200)
    private String activityOperaterName;

    /** 开始时间 */
    @Temporal(TemporalType.DATE)
    @Column(name = "ACTI_START_DATE")
    private Date activityStartDate;
    
    /** 结束时间 */
    @Temporal(TemporalType.DATE)
    @Column(name = "ACTI_END_DATE")
    private Date activityEndDate;

    /** 创建日期 */
    @Temporal(TemporalType.DATE)
    @Column(name = "CREATE_DATE")
    private Date createDate;

    /** 创建人 */
    @Column(name = "CREATE_USER", length = 100)
    private String createUser;

    /** 活动地点 */
    @Column(name = "MKT_ACTI_ADDR", length = 800)
    private String marketActivityAddress;

    /** 活动目的 */
    @Column(name = "MKT_ACTI_AIM", length = 800)
    private String activityAim;

    /** 最近更新日期 */
    @Temporal(TemporalType.DATE)
    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    /** 最近更新人 */
    @Column(name = "UPDATE_USER", length = 100)
    private String updateUser;
    
    /** 营销计划ID */
    @Column(name = "PLAN_ID")
    private Long planId;
    
    /** 营销计划名称 */
    @Column(name = "PLAN_NAME", length = 200)
    private String planName;
    
    /** 活动状态 */
    @Column(name = "ACTI_STATUS", length = 30)
    private String actiStatus;
    
    /** 活动状态 */
    @Column(name = "MKT_ACTI_TYPE", length = 30)
    private String mktActiType;
    
    /** 审批状态 */
    @Column(name = "APPROVE_STAT", length = 30)
    private String approveStat;
    
    /**活动预算*/
	@Column(name="MKT_PAY_PRE")
	private BigDecimal mktPayPre;

    public BigDecimal getMktPayPre() {
		return mktPayPre;
	}

	public void setMktPayPre(BigDecimal mktPayPre) {
		this.mktPayPre = mktPayPre;
	}

	public String getMktActiType() {
		return mktActiType;
	}

	public void setMktActiType(String mktActiType) {
		this.mktActiType = mktActiType;
	}

	public Date getActiPlanStartDate() {
		return actiPlanStartDate;
	}

	public void setActiPlanStartDate(Date actiPlanStartDate) {
		this.actiPlanStartDate = actiPlanStartDate;
	}

	public Date getActiPlanEndDate() {
		return actiPlanEndDate;
	}

	public void setActiPlanEndDate(Date actiPlanEndDate) {
		this.actiPlanEndDate = actiPlanEndDate;
	}

	public String getActiStatus() {
		return actiStatus;
	}

	public void setActiStatus(String actiStatus) {
		this.actiStatus = actiStatus;
	}

	public Long getMarketActivityId() {
        return marketActivityId;
    }

    public void setMarketActivityId(Long marketActivityId) {
        this.marketActivityId = marketActivityId;
    }

    public String getActivityComplementCircumstance() {
        return activityComplementCircumstance;
    }

    public void setActivityComplementCircumstance(
            String activityComplementCircumstance) {
        this.activityComplementCircumstance = activityComplementCircumstance;
    }

    public String getActivityCustomerId() {
        return activityCustomerId;
    }

    public void setActivityCustomerId(String activityCustomerId) {
        this.activityCustomerId = activityCustomerId;
    }

    public String getActivityCustomerName() {
        return activityCustomerName;
    }

    public void setActivityCustomerName(String activityCustomerName) {
        this.activityCustomerName = activityCustomerName;
    }

    public Date getActivityEndDate() {
        return activityEndDate;
    }

    public void setActivityEndDate(Date activityEndDate) {
        this.activityEndDate = activityEndDate;
    }

    public String getActivityOperaterId() {
        return activityOperaterId;
    }

    public void setActivityOperaterId(String activityOperaterId) {
        this.activityOperaterId = activityOperaterId;
    }

    public String getActivityOperaterName() {
        return activityOperaterName;
    }

    public void setActivityOperaterName(String activityOperaterName) {
        this.activityOperaterName = activityOperaterName;
    }

    public Date getActivityStartDate() {
        return activityStartDate;
    }

    public void setActivityStartDate(Date activityStartDate) {
        this.activityStartDate = activityStartDate;
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

    public String getMarketActivityAddress() {
        return marketActivityAddress;
    }

    public void setMarketActivityAddress(String marketActivityAddress) {
        this.marketActivityAddress = marketActivityAddress;
    }

    public String getActivityAim() {
        return activityAim;
    }

    public void setActivityAim(String activityAim) {
        this.activityAim = activityAim;
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

    
    
//  public Set<ActivityRecorde> getActivityRecordes() {
//      return ActivityRecordes;
//  }
//
//  public void setActivityRecordes(Set<ActivityRecorde> activityRecordes) {
//      ActivityRecordes = activityRecordes;
//  }

//  public MarketPlan getMarketPlan() {
//      return marketPlan;
//  }
//
//  public void setMarketPlan(MarketPlan marketPlan) {
//      this.marketPlan = marketPlan;
//  }
//
//  public Set<MarketOpportunity> getMarketOpportunities() {
//      return marketOpportunities;
//  }
//
//  public void setMarketOpportunities(
//          Set<MarketOpportunity> marketOpportunities) {
//      this.marketOpportunities = marketOpportunities;
//  }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }
    
    public String getMarketActivityName() {
        return marketActivityName;
    }

    public void setMarketActivityName(String marketActivityName) {
        this.marketActivityName = marketActivityName;
    }
    
    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

	public String getApproveStat() {
		return approveStat;
	}

	public void setApproveStat(String approveStat) {
		this.approveStat = approveStat;
	}
    
}