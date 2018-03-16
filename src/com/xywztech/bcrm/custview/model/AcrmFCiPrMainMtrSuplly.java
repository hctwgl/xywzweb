package com.xywztech.bcrm.custview.model;

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
 * The persistent class for the ACRM_F_CI_PR_MAIN_MTR_SUPLLY database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PR_MAIN_MTR_SUPLLY")
public class AcrmFCiPrMainMtrSuplly implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PR_MAIN_MTR_SUPLLY_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PR_MAIN_MTR_SUPLLY_ID_GENERATOR")
	@Column(name="ID", unique=true, nullable=false)
	private Integer id;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="IMPLEMENT_INFO")
	private String implementInfo;

	@Column(name="NAME_AND_SPCE")
	private String nameAndSpce;

	@Column(name="PROJECT_ID")
	private Integer projectId;

	@Column(name="YEARLY_CONSUME")
	private BigDecimal yearlyConsume;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getImplementInfo() {
		return implementInfo;
	}

	public void setImplementInfo(String implementInfo) {
		this.implementInfo = implementInfo;
	}

	public String getNameAndSpce() {
		return nameAndSpce;
	}

	public void setNameAndSpce(String nameAndSpce) {
		this.nameAndSpce = nameAndSpce;
	}

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public BigDecimal getYearlyConsume() {
		return yearlyConsume;
	}

	public void setYearlyConsume(BigDecimal yearlyConsume) {
		this.yearlyConsume = yearlyConsume;
	}
}