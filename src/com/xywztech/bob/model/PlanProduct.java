package com.xywztech.bob.model;

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
 * The persistent class for the OCRM_F_MM_PLAN_PROD database table. 
 * 计划关联产品表
 */
@Entity
@Table(name = "OCRM_F_MM_PLAN_PROD")
public class PlanProduct implements Serializable {

	private static final long serialVersionUID = -6891663536814252233L;

	/** 产品明细ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "PPDE_ID")
	private Long productDetailId;

	/** 创建日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;

	/** 创建人 */
	@Column(name = "CREATE_USER",length=100)
	private String createUser;

	/** 产品ID */
	@Column(name = "PRODUCT_ID",length=100)
	private String productId;
	
	/**产品名称*/
	@Column(name="PRODUCT_NAME",length=200)
	private String productName;

	/** 营销计划ID */
	// bi-directional many-to-one association to OcrmFMmMktPlan
	//@ManyToOne
	@Column(name = "PLAN_ID")
	private Long planId;

	public Long getProductDetailId() {
		return productDetailId;
	}

	public void setProductDetailId(Long productDetailId) {
		this.productDetailId = productDetailId;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getProductId() {
		return productId;
	}
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}
}