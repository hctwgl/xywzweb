package com.xywztech.bcrm.customer.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_CI_BRAND_DEFINE database table.
 * 客户品牌定义表
 */
@Entity
@Table(name="OCRM_F_CI_BRAND_DEFINE")
public class OcrmFCiBrandDefine implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_BRAND_DEFINE_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_BRAND_DEFINE_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="BRAND")
	private String brand;

	@Column(name="BRAND_TYP")
	private String brandTyp;

	@Column(name="COUNT_LOWER")
	private BigDecimal countLower;

	@Column(name="COUNT_UPPER")
	private BigDecimal countUpper;

	@Column(name="CUST_TYP")
	private String custTyp;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getBrandTyp() {
		return brandTyp;
	}

	public void setBrandTyp(String brandTyp) {
		this.brandTyp = brandTyp;
	}

	public BigDecimal getCountLower() {
		return countLower;
	}

	public void setCountLower(BigDecimal countLower) {
		this.countLower = countLower;
	}

	public BigDecimal getCountUpper() {
		return countUpper;
	}

	public void setCountUpper(BigDecimal countUpper) {
		this.countUpper = countUpper;
	}

	public String getCustTyp() {
		return custTyp;
	}

	public void setCustTyp(String custTyp) {
		this.custTyp = custTyp;
	}

   

}