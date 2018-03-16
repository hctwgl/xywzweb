package com.xywztech.bcrm.custmanager.model;

import java.io.Serializable;
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
 * The persistent class for the OCRM_F_CM_CUST_MGR_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CM_CUST_MGR_INFO")
public class OcrmFCmCustMgrInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CM_CUST_MGR_INFO_USERID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CM_CUST_MGR_INFO_USERID_GENERATOR")
	@Column(name="USER_ID")
	private Long userId;

	@Column(name="AFFI_INST_ID")
	private String affiInstId;

	@Column(name="BUSINESS_TYPE")
	private String businessType;

	@Column(name="CUST_MANAGER_CONTACT")
	private String custManagerContact;

	@Column(name="CUST_MANAGER_ID")
	private String custManagerId;

	@Column(name="CUST_MANAGER_LEVEL")
	private String custManagerLevel;

	@Column(name="CUST_MANAGER_NAME")
	private String custManagerName;

	@Column(name="CUST_MANAGER_STATION_YEAR")
	private Integer custManagerStationYear;

	@Column(name="CUST_MANAGER_TYPE")
	private String custManagerType;

	private String duty;

	@Column(name="ECONOMY_WORK_YEAR")
	private Integer economyWorkYear;

	private String education;

    @Temporal( TemporalType.DATE)
	@Column(name="ENTRANTS_DATE")
	private Date entrantsDate;

    @Temporal( TemporalType.DATE)
	@Column(name="GRADUATE_DATE")
	private Date graduateDate;

	@Column(name="IF_CREDIT")
	private String ifCredit;


	@Column(name="POLITICAL_STAT")
	private String politicalStat;

	private String sex;

	private String state;

	private String station;

	@Column(name="WORK_UNIT")
	private String workUnit;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getAffiInstId() {
		return affiInstId;
	}

	public void setAffiInstId(String affiInstId) {
		this.affiInstId = affiInstId;
	}

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	public String getCustManagerContact() {
		return custManagerContact;
	}

	public void setCustManagerContact(String custManagerContact) {
		this.custManagerContact = custManagerContact;
	}

	public String getCustManagerId() {
		return custManagerId;
	}

	public void setCustManagerId(String custManagerId) {
		this.custManagerId = custManagerId;
	}

	public String getCustManagerLevel() {
		return custManagerLevel;
	}

	public void setCustManagerLevel(String custManagerLevel) {
		this.custManagerLevel = custManagerLevel;
	}

	public String getCustManagerName() {
		return custManagerName;
	}

	public void setCustManagerName(String custManagerName) {
		this.custManagerName = custManagerName;
	}

	public Integer getCustManagerStationYear() {
		return custManagerStationYear;
	}

	public void setCustManagerStationYear(Integer custManagerStationYear) {
		this.custManagerStationYear = custManagerStationYear;
	}

	public String getCustManagerType() {
		return custManagerType;
	}

	public void setCustManagerType(String custManagerType) {
		this.custManagerType = custManagerType;
	}

	public String getDuty() {
		return duty;
	}

	public void setDuty(String duty) {
		this.duty = duty;
	}

	public Integer getEconomyWorkYear() {
		return economyWorkYear;
	}

	public void setEconomyWorkYear(Integer economyWorkYear) {
		this.economyWorkYear = economyWorkYear;
	}

	public String getEducation() {
		return education;
	}

	public void setEducation(String education) {
		this.education = education;
	}

	public Date getEntrantsDate() {
		return entrantsDate;
	}

	public void setEntrantsDate(Date entrantsDate) {
		this.entrantsDate = entrantsDate;
	}

	public Date getGraduateDate() {
		return graduateDate;
	}

	public void setGraduateDate(Date graduateDate) {
		this.graduateDate = graduateDate;
	}

	public String getIfCredit() {
		return ifCredit;
	}

	public void setIfCredit(String ifCredit) {
		this.ifCredit = ifCredit;
	}



	public String getPoliticalStat() {
		return politicalStat;
	}

	public void setPoliticalStat(String politicalStat) {
		this.politicalStat = politicalStat;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getStation() {
		return station;
	}

	public void setStation(String station) {
		this.station = station;
	}

	public String getWorkUnit() {
		return workUnit;
	}

	public void setWorkUnit(String workUnit) {
		this.workUnit = workUnit;
	}
}