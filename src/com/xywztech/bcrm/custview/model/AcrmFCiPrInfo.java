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
 * The persistent class for the ACRM_F_CI_PR_INFO database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PR_INFO")
public class AcrmFCiPrInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PR_INFO_PROJECTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PR_INFO_PROJECTID_GENERATOR")
	@Column(name="PROJECT_ID", unique=true, nullable=false)
	private Integer projectId;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="PROJECT_DETAIL")
	private String projectDetail;

	@Column(name="PROJECT_IVS_AMOUNT")
	private BigDecimal projectIvsAmount;

	@Column(name="PROJECT_NAME")
	private String projectName;

	@Column(name="PROJECT_QUALITY")
	private String projectQuality;

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getProjectDetail() {
		return projectDetail;
	}

	public void setProjectDetail(String projectDetail) {
		this.projectDetail = projectDetail;
	}

	public BigDecimal getProjectIvsAmount() {
		return projectIvsAmount;
	}

	public void setProjectIvsAmount(BigDecimal projectIvsAmount) {
		this.projectIvsAmount = projectIvsAmount;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectQuality() {
		return projectQuality;
	}

	public void setProjectQuality(String projectQuality) {
		this.projectQuality = projectQuality;
	}
}