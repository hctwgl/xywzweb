package com.xywztech.bcrm.custview.model;

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
 * The persistent class for the ACRM_F_CI_BLACKLIST database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_BLACKLIST")
public class AcrmFCiBlacklist implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_BLACKLIST_ID_GENERATOR", sequenceName="ID_SEQUENCE" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_BLACKLIST_ID_GENERATOR")
	private Long id;

	private String address;

	@Column(name="AGENCY_BRAN")
	private String agencyBran;

	private String cause;

	@Column(name="CERT_NO")
	private String certNo;

	@Column(name="CERT_TYP")
	private String certTyp;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="CUSTOM_ID")
	private String customId;

	@Column(name="DUTY_OFFICER")
	private String dutyOfficer;

	@Column(name="MANAGE_BRAN")
	private String manageBran;

	@Column(name="ODS_ST_DATE")
	private String odsStDate;

	@Column(name="ODS_LOAD_DT", length=10)
	private String odsLoadDt;
	
	public String getOdsLoadDt() {
		return odsLoadDt;
	}

	public void setOdsLoadDt(String odsLoadDt) {
		this.odsLoadDt = odsLoadDt;
	}

	private String origin;

    @Temporal( TemporalType.DATE)
	@Column(name="RECORD_DATE")
	private Date recordDate;

	private String registrant;

	private String state;

	private String telephone;

	private String type;

    public AcrmFCiBlacklist() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAgencyBran() {
		return this.agencyBran;
	}

	public void setAgencyBran(String agencyBran) {
		this.agencyBran = agencyBran;
	}

	public String getCause() {
		return this.cause;
	}

	public void setCause(String cause) {
		this.cause = cause;
	}

	public String getCertNo() {
		return this.certNo;
	}

	public void setCertNo(String certNo) {
		this.certNo = certNo;
	}

	public String getCertTyp() {
		return this.certTyp;
	}

	public void setCertTyp(String certTyp) {
		this.certTyp = certTyp;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustomId() {
		return this.customId;
	}

	public void setCustomId(String customId) {
		this.customId = customId;
	}

	public String getDutyOfficer() {
		return this.dutyOfficer;
	}

	public void setDutyOfficer(String dutyOfficer) {
		this.dutyOfficer = dutyOfficer;
	}

	public String getManageBran() {
		return this.manageBran;
	}

	public void setManageBran(String manageBran) {
		this.manageBran = manageBran;
	}

	public String getOdsStDate() {
		return this.odsStDate;
	}

	public void setOdsStDate(String odsStDate) {
		this.odsStDate = odsStDate;
	}

	public String getOrigin() {
		return this.origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public Date getRecordDate() {
		return this.recordDate;
	}

	public void setRecordDate(Date recordDate) {
		this.recordDate = recordDate;
	}

	public String getRegistrant() {
		return this.registrant;
	}

	public void setRegistrant(String registrant) {
		this.registrant = registrant;
	}

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getTelephone() {
		return this.telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

}