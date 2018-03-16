package com.xywztech.bcrm.custview.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
 * The persistent class for the ACRM_F_CI_CUST_GRADE database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CUST_GRADE")
public class AcrmFCiCustGrade implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CUST_GRADE_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CUST_GRADE_ID_GENERATOR")
	@Column(name="ID",unique=true, nullable=false)
	private Long id;

	@Column(name="BRAND_LEVEL")
	private String brandLevel;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_LEVEL")
	private Long custLevel;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="CUST_TYP")
	private String custTyp;

    @Temporal( TemporalType.DATE)
	@Column(name="ETL_DT")
	private Date etlDt;

	@Column(name="TARGET_COUNT")
	private BigDecimal targetCount;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBrandLevel() {
		return brandLevel;
	}

	public void setBrandLevel(String brandLevel) {
		this.brandLevel = brandLevel;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public Long getCustLevel() {
		return custLevel;
	}

	public void setCustLevel(Long custLevel) {
		this.custLevel = custLevel;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustTyp() {
		return custTyp;
	}

	public void setCustTyp(String custTyp) {
		this.custTyp = custTyp;
	}

	public Date getEtlDt() {
		return etlDt;
	}

	public void setEtlDt(Date etlDt) {
		this.etlDt = etlDt;
	}

	public BigDecimal getTargetCount() {
		return targetCount;
	}

	public void setTargetCount(BigDecimal targetCount) {
		this.targetCount = targetCount;
	}
}