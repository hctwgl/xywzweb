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
 * The persistent class for the OCRM_F_MM_PLAN_CUST database table. 
 * 计划关联客户表
 */
@Entity
@Table(name = "OCRM_F_MM_PLAN_CUST")
public class PlanCustomer implements Serializable {

	private static final long serialVersionUID = 5592073005144247727L;

	/** 客户明细ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "PCDE_ID")
	private Long planCustomerdetailId;

	/** 创建日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;

	/** 创建人 */
	@Column(name = "CREATE_USER",length=100)
	private String createUser;

	/** 客户ID */
	@Column(name = "CUST_ID",length=100)
	private String customerId;
	
	/** 客户名称 */
	@Column(name = "CUST_NAME",length=200)
	private String customerName;
	
	/** 执行人 */
    @Column(name = "EXECUTOR",length=100)
    private String executor;

	/** 营销计划ID */
	// bi-directional many-to-one association to OcrmFMmMktPlan
	//@ManyToOne
	@Column(name = "PLAN_ID")
	private Long planId;

	public Long getPlanCustomerdetailId() {
		return planCustomerdetailId;
	}

	public void setPlanCustomerdetailId(Long planCustomerdetailId) {
		this.planCustomerdetailId = planCustomerdetailId;
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

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}
	
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	
	public Long getPlanId() {
		return planId;
	}
	
	public String getExecutor() {
        return executor;
    }

    public void setExecutor(String executor) {
        this.executor = executor;
    }

    public void setPlanId(Long planId) {
		this.planId = planId;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}