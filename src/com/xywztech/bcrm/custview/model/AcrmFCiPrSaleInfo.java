package com.xywztech.bcrm.custview.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the ACRM_F_CI_PR_SALE_INFO database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PR_SALE_INFO")
public class AcrmFCiPrSaleInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PR_SALE_INFO_PROJECTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PR_SALE_INFO_PROJECTID_GENERATOR")
	@Column(name="PROJECT_ID", unique=true, nullable=false)
	private Integer projectId;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="SALE_AREA")
	private String saleArea;

	@Column(name="SALE_CHANNEL")
	private String saleChannel;

	@Column(name="SALE_OBJ")
	private String saleObj;

	@Column(name="SALE_WAY")
	private String saleWay;

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

	public String getSaleArea() {
		return saleArea;
	}

	public void setSaleArea(String saleArea) {
		this.saleArea = saleArea;
	}

	public String getSaleChannel() {
		return saleChannel;
	}

	public void setSaleChannel(String saleChannel) {
		this.saleChannel = saleChannel;
	}

	public String getSaleObj() {
		return saleObj;
	}

	public void setSaleObj(String saleObj) {
		this.saleObj = saleObj;
	}

	public String getSaleWay() {
		return saleWay;
	}

	public void setSaleWay(String saleWay) {
		this.saleWay = saleWay;
	}
}