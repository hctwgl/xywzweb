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
 * The persistent class for the ACRM_F_CI_PR_IVS_CONS database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PR_IVS_CONS")
public class AcrmFCiPrIvsCon implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PR_IVS_CONS_PROJECTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PR_IVS_CONS_PROJECTID_GENERATOR")
	@Column(name="PROJECT_ID", unique=true, nullable=false)
	private Integer projectId;

	@Column(name="AUX_EQUIP_AMOUNT")
	private BigDecimal auxEquipAmount;

	@Column(name="CIVIL_WORK_AMOUNT")
	private BigDecimal civilWorkAmount;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="EQUIPMENT_AMOUNT")
	private BigDecimal equipmentAmount;

	@Column(name="INSTALL_COSTS")
	private BigDecimal installCosts;

	@Column(name="OTHER_COSTS")
	private BigDecimal otherCosts;

	@Column(name="SUP_LIP_AMOUNT")
	private BigDecimal supLipAmount;

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public BigDecimal getAuxEquipAmount() {
		return auxEquipAmount;
	}

	public void setAuxEquipAmount(BigDecimal auxEquipAmount) {
		this.auxEquipAmount = auxEquipAmount;
	}

	public BigDecimal getCivilWorkAmount() {
		return civilWorkAmount;
	}

	public void setCivilWorkAmount(BigDecimal civilWorkAmount) {
		this.civilWorkAmount = civilWorkAmount;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public BigDecimal getEquipmentAmount() {
		return equipmentAmount;
	}

	public void setEquipmentAmount(BigDecimal equipmentAmount) {
		this.equipmentAmount = equipmentAmount;
	}

	public BigDecimal getInstallCosts() {
		return installCosts;
	}

	public void setInstallCosts(BigDecimal installCosts) {
		this.installCosts = installCosts;
	}

	public BigDecimal getOtherCosts() {
		return otherCosts;
	}

	public void setOtherCosts(BigDecimal otherCosts) {
		this.otherCosts = otherCosts;
	}

	public BigDecimal getSupLipAmount() {
		return supLipAmount;
	}

	public void setSupLipAmount(BigDecimal supLipAmount) {
		this.supLipAmount = supLipAmount;
	}
}