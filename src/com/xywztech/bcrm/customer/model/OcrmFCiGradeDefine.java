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
 * The persistent class for the OCRM_F_CI_GRADE_DEFINE database table.
 * 客户等级定义
 */
@Entity
@Table(name="OCRM_F_CI_GRADE_DEFINE")
public class OcrmFCiGradeDefine implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_GRADE_DEFINE_GRADEID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_GRADE_DEFINE_GRADEID_GENERATOR")
	@Column(name="GRADE_ID",nullable=false)
	private Long gradeId;

	@Column(name="COUNT_LOWER")
	private BigDecimal countLower;

	@Column(name="COUNT_UPPER")
	private BigDecimal countUpper;

	@Column(name="CUST_TYPE")
	private String custType;

	@Column(name="GRADE_NAME")
	private String gradeName;

	public Long getGradeId() {
		return gradeId;
	}

	public void setGradeId(Long gradeId) {
		this.gradeId = gradeId;
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

	public String getCustType() {
		return custType;
	}

	public void setCustType(String custType) {
		this.custType = custType;
	}

	public String getGradeName() {
		return gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
}