package com.xywztech.bcrm.model;

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
 * The persistent class for the ACRM_F_CI_CUST_CONTRI_APRON database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CUST_CONTRI_APRON")
public class AcrmFCiCustContriApron implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CUST_CONTRI_APRON_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CUST_CONTRI_APRON_ID_GENERATOR")
	@Column(name="ID")
	private Long id;

	@Column(name="ACC_TYP")
	private String accTyp;

	@Column(name="INNER_PRICE")
	private BigDecimal innerPrice;

	@Column(name="RUN_COST")
	private BigDecimal runCost;

	@Column(name="TIME_LIMIT")
	private String timeLimit;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAccTyp() {
		return accTyp;
	}

	public void setAccTyp(String accTyp) {
		this.accTyp = accTyp;
	}

	public BigDecimal getInnerPrice() {
		return innerPrice;
	}

	public void setInnerPrice(BigDecimal innerPrice) {
		this.innerPrice = innerPrice;
	}

	public BigDecimal getRunCost() {
		return runCost;
	}

	public void setRunCost(BigDecimal runCost) {
		this.runCost = runCost;
	}

	public String getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(String timeLimit) {
		this.timeLimit = timeLimit;
	}
}