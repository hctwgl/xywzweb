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
 * The persistent class for the ACRM_F_CI_PR_CONSTR_CONDITION database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PR_CONSTR_CONDITION")
public class AcrmFCiPrConstrCondition implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PR_CONSTR_CONDITION_PROJECTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PR_CONSTR_CONDITION_PROJECTID_GENERATOR")
	@Column(name="PROJECT_ID",unique=true, nullable=false)
	private Integer projectId;

	@Column(name="BUILDING_AREA_APP_AMOUNT")
	private String buildingAreaAppAmount;

	@Column(name="BUILDING_AREA_APPROVER")
	private String buildingAreaApprover;

	@Column(name="BUILDING_AREA_DOC_NUM")
	private String buildingAreaDocNum;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="ICR_POWER_APP_AMOUNT")
	private String icrPowerAppAmount;

	@Column(name="ICR_POWER_APPROVER")
	private String icrPowerApprover;

	@Column(name="ICR_POWER_DOC_NUM")
	private String icrPowerDocNum;

	@Column(name="NEW_LAND_APP_AMOUNT")
	private String newLandAppAmount;

	@Column(name="NEW_LAND_APPROVER")
	private String newLandApprover;

	@Column(name="NEW_LAND_DOC_NUM")
	private String newLandDocNum;

	@Column(name="WASTE_TREAT_APP_AMOUNT")
	private String wasteTreatAppAmount;

	@Column(name="WASTE_TREAT_APPROVER")
	private String wasteTreatApprover;

	@Column(name="WASTE_TREAT_DOC_NUM")
	private String wasteTreatDocNum;

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getBuildingAreaAppAmount() {
		return buildingAreaAppAmount;
	}

	public void setBuildingAreaAppAmount(String buildingAreaAppAmount) {
		this.buildingAreaAppAmount = buildingAreaAppAmount;
	}

	public String getBuildingAreaApprover() {
		return buildingAreaApprover;
	}

	public void setBuildingAreaApprover(String buildingAreaApprover) {
		this.buildingAreaApprover = buildingAreaApprover;
	}

	public String getBuildingAreaDocNum() {
		return buildingAreaDocNum;
	}

	public void setBuildingAreaDocNum(String buildingAreaDocNum) {
		this.buildingAreaDocNum = buildingAreaDocNum;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getIcrPowerAppAmount() {
		return icrPowerAppAmount;
	}

	public void setIcrPowerAppAmount(String icrPowerAppAmount) {
		this.icrPowerAppAmount = icrPowerAppAmount;
	}

	public String getIcrPowerApprover() {
		return icrPowerApprover;
	}

	public void setIcrPowerApprover(String icrPowerApprover) {
		this.icrPowerApprover = icrPowerApprover;
	}

	public String getIcrPowerDocNum() {
		return icrPowerDocNum;
	}

	public void setIcrPowerDocNum(String icrPowerDocNum) {
		this.icrPowerDocNum = icrPowerDocNum;
	}

	public String getNewLandAppAmount() {
		return newLandAppAmount;
	}

	public void setNewLandAppAmount(String newLandAppAmount) {
		this.newLandAppAmount = newLandAppAmount;
	}

	public String getNewLandApprover() {
		return newLandApprover;
	}

	public void setNewLandApprover(String newLandApprover) {
		this.newLandApprover = newLandApprover;
	}

	public String getNewLandDocNum() {
		return newLandDocNum;
	}

	public void setNewLandDocNum(String newLandDocNum) {
		this.newLandDocNum = newLandDocNum;
	}

	public String getWasteTreatAppAmount() {
		return wasteTreatAppAmount;
	}

	public void setWasteTreatAppAmount(String wasteTreatAppAmount) {
		this.wasteTreatAppAmount = wasteTreatAppAmount;
	}

	public String getWasteTreatApprover() {
		return wasteTreatApprover;
	}

	public void setWasteTreatApprover(String wasteTreatApprover) {
		this.wasteTreatApprover = wasteTreatApprover;
	}

	public String getWasteTreatDocNum() {
		return wasteTreatDocNum;
	}

	public void setWasteTreatDocNum(String wasteTreatDocNum) {
		this.wasteTreatDocNum = wasteTreatDocNum;
	}
}