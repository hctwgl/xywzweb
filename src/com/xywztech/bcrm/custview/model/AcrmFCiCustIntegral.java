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
 * The persistent class for the ACRM_F_CI_CUST_INTEGRAL database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CUST_INTEGRAL")
public class AcrmFCiCustIntegral implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CUST_INTEGRAL_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CUST_INTEGRAL_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="COUNT_NUM")
	private BigDecimal countNum;

	@Column(name="CUST_COST_SUM")
	private BigDecimal custCostSum;

	@Column(name="CUST_CUM_COST")
	private BigDecimal custCumCost;

	@Column(name="CUST_CUM_COUNT")
	private BigDecimal custCumCount;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="CUST_SPARE_COUNT")
	private BigDecimal custSpareCount;

	@Column(name="CUST_TYPE")
	private String custType;

    @Temporal( TemporalType.DATE)
	@Column(name="ETL_DATE")
	private Date etlDate;  
    
    @Column(name="INTEGRAL_TYPE")
	private Integer integralType;

	public Integer getIntegralType() {
		return integralType;
	}

	public void setIntegralType(Integer integralType) {
		this.integralType = integralType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getCountNum() {
		return countNum;
	}

	public void setCountNum(BigDecimal countNum) {
		this.countNum = countNum;
	}

	public BigDecimal getCustCostSum() {
		return custCostSum;
	}

	public void setCustCostSum(BigDecimal custCostSum) {
		this.custCostSum = custCostSum;
	}

	public BigDecimal getCustCumCost() {
		return custCumCost;
	}

	public void setCustCumCost(BigDecimal custCumCost) {
		this.custCumCost = custCumCost;
	}

	public BigDecimal getCustCumCount() {
		return custCumCount;
	}

	public void setCustCumCount(BigDecimal custCumCount) {
		this.custCumCount = custCumCount;
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

	public BigDecimal getCustSpareCount() {
		return custSpareCount;
	}

	public void setCustSpareCount(BigDecimal custSpareCount) {
		this.custSpareCount = custSpareCount;
	}

	public String getCustType() {
		return custType;
	}

	public void setCustType(String custType) {
		this.custType = custType;
	}

	public Date getEtlDate() {
		return etlDate;
	}

	public void setEtlDate(Date etlDate) {
		this.etlDate = etlDate;
	}
}