package com.xywztech.bcrm.serviceManage.model;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;


/**
 * The persistent class for the OCRM_F_SE_APPOINTMENT_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_SE_APPOINTMENT_INFO")
public class AppointmentInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "AppointmentSequnce", sequenceName = "APPOINTMENTSEQUNCE",allocationSize = 1)
	@GeneratedValue(generator = "AppointmentSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "APPOINT_ID",nullable = false)
	private Long appointId;//预约编号
	
	@Column(name="APPOINT_EVENT")
	private String appointEvent;

	@Column(name="APPOINT_ORG")
	private String appointOrg;

	@Column(name="APPOINT_RESULT")
	private String appointResult;

	@Column(name="APPOINT_STAT")
	private String appointStat;
	
	
	@Column(name="APPOINT_SOURCE")
	private String appointSource;

    @Temporal( TemporalType.DATE)
	@Column(name="APPOINT_TIME")
	private Date appointTime;

	@Column(name="CERT_NO")
	private String certNo;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="CREATE_USER")
	private String createUser;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="HANDLE_USER")
	private String handleUser;

	@Column(name="MGR_ID")
	private String mgrId;

	@Column(name="TELEPHONE")
	private String telephone;

    @Temporal( TemporalType.DATE)
	@Column(name="UPDATE_DATE")
	private Date updateDate;

	@Column(name="UPDATE_USER")
	private String updateUser;
	
	@Column(name="P_OR_C")
	private String pOrC;//对公对私标识

	public Long getAppointId() {
		return appointId;
	}

	public void setAppointId(Long appointId) {
		this.appointId = appointId;
	}

	public String getAppointEvent() {
		return appointEvent;
	}

	public void setAppointEvent(String appointEvent) {
		this.appointEvent = appointEvent;
	}

	public String getAppointOrg() {
		return appointOrg;
	}

	public void setAppointOrg(String appointOrg) {
		this.appointOrg = appointOrg;
	}

	public String getAppointResult() {
		return appointResult;
	}

	public void setAppointResult(String appointResult) {
		this.appointResult = appointResult;
	}

	public String getAppointStat() {
		return appointStat;
	}

	public void setAppointStat(String appointStat) {
		this.appointStat = appointStat;
	}
	
	public String getAppointSource() {
		return appointSource;
	}

	public void setAppointSource(String appointSource) {
		this.appointSource = appointSource;
	}

	public Date getAppointTime() {
		return appointTime;
	}

	public void setAppointTime(Date appointTime) {
		this.appointTime = appointTime;
	}

	public String getCertNo() {
		return certNo;
	}

	public void setCertNo(String certNo) {
		this.certNo = certNo;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
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

	public String getHandleUser() {
		return handleUser;
	}

	public void setHandleUser(String handleUser) {
		this.handleUser = handleUser;
	}

	public String getMgrId() {
		return mgrId;
	}

	public void setMgrId(String mgrId) {
		this.mgrId = mgrId;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setpOrC(String pOrC) {
		this.pOrC = pOrC;
	}

	public String getpOrC() {
		return pOrC;
	}
}