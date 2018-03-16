package com.xywztech.bcrm.customer.model;

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
 * The persistent class for the OCRM_F_CI_CUST_DESC database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_CUST_DESC")
public class OcrmFCiCustDesc implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_CUST_DESC_CUSTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_CUST_DESC_CUSTID_GENERATOR")
	@Column(name="CUST_ID", unique=true, nullable=false, length=21)
	private String custId;

	@Column(name="AFFI_CUST_MANAGER", length=200)
	private String affiCustManager;

	@Column(name="CERT_NUM", length=50)
	private String certNum;

	@Column(name="CERT_TYPE", length=20)
	private String certType;

	@Column(name="COMMU_ADDR", length=400)
	private String commuAddr;

	@Column(name="CONTRY_AREA", length=13)
	private String contryArea;

    @Temporal( TemporalType.DATE)
	@Column(name="CRM_DT")
	private Date crmDt;

	@Column(name="CUST_CREDIT_LEVEL", length=13)
	private String custCreditLevel;

	@Column(name="CUST_EN_NAME", length=200)
	private String custEnName;

	@Column(name="CUST_LEV", length=13)
	private String custLev;

	@Column(name="CUST_STAT", length=13)
	private String custStat;

	@Column(name="CUST_TYP", length=13)
	private String custTyp;

	@Column(name="CUST_ZH_NAME", length=200)
	private String custZhName;

	@Column(name="IF_INT", length=5)
	private String ifInt;

	@Column(name="LINK_PHONE", length=20)
	private String linkPhone;

	@Column(name="LINK_USER", length=200)
	private String linkUser;

	@Column(name="OFFICE_PHONE", length=20)
	private String officePhone;

	@Column(name="OTHER_NAME", length=200)
	private String otherName;

	@Column(name="POST_NO", length=20)
	private String postNo;

	@Column(name="TELEPHONE_NUM", length=20)
	private String telephoneNum;   

	@Column(name="IF_IMPORTANT_CUST", length=5)
	private String ifImportantCust;   
	
	@Column(name="IMPORT_CUST_TYPE", length=20)
	private String importCustType; 
	
	@Column(name="CORE_ID", length=30)
	private String coreId; 
    public OcrmFCiCustDesc() {
    }

    
	public String getCoreId() {
		return coreId;
	}


	public void setCoreId(String coreId) {
		this.coreId = coreId;
	}


	public String getIfImportantCust() {
		return ifImportantCust;
	}


	public void setIfImportantCust(String ifImportantCust) {
		this.ifImportantCust = ifImportantCust;
	}


	public String getImportCustType() {
		return importCustType;
	}


	public void setImportCustType(String importCustType) {
		this.importCustType = importCustType;
	}


	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getAffiCustManager() {
		return this.affiCustManager;
	}

	public void setAffiCustManager(String affiCustManager) {
		this.affiCustManager = affiCustManager;
	}

	public String getCertNum() {
		return this.certNum;
	}

	public void setCertNum(String certNum) {
		this.certNum = certNum;
	}

	public String getCertType() {
		return this.certType;
	}

	public void setCertType(String certType) {
		this.certType = certType;
	}

	public String getCommuAddr() {
		return this.commuAddr;
	}

	public void setCommuAddr(String commuAddr) {
		this.commuAddr = commuAddr;
	}

	public String getContryArea() {
		return this.contryArea;
	}

	public void setContryArea(String contryArea) {
		this.contryArea = contryArea;
	}

	public Date getCrmDt() {
		return this.crmDt;
	}

	public void setCrmDt(Date crmDt) {
		this.crmDt = crmDt;
	}

	public String getCustCreditLevel() {
		return this.custCreditLevel;
	}

	public void setCustCreditLevel(String custCreditLevel) {
		this.custCreditLevel = custCreditLevel;
	}

	public String getCustEnName() {
		return this.custEnName;
	}

	public void setCustEnName(String custEnName) {
		this.custEnName = custEnName;
	}

	public String getCustLev() {
		return this.custLev;
	}

	public void setCustLev(String custLev) {
		this.custLev = custLev;
	}

	public String getCustStat() {
		return this.custStat;
	}

	public void setCustStat(String custStat) {
		this.custStat = custStat;
	}

	public String getCustTyp() {
		return this.custTyp;
	}

	public void setCustTyp(String custTyp) {
		this.custTyp = custTyp;
	}

	public String getCustZhName() {
		return this.custZhName;
	}

	public void setCustZhName(String custZhName) {
		this.custZhName = custZhName;
	}

	public String getIfInt() {
		return this.ifInt;
	}

	public void setIfInt(String ifInt) {
		this.ifInt = ifInt;
	}

	public String getLinkPhone() {
		return this.linkPhone;
	}

	public void setLinkPhone(String linkPhone) {
		this.linkPhone = linkPhone;
	}

	public String getLinkUser() {
		return this.linkUser;
	}

	public void setLinkUser(String linkUser) {
		this.linkUser = linkUser;
	}

	public String getOfficePhone() {
		return this.officePhone;
	}

	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}

	public String getOtherName() {
		return this.otherName;
	}

	public void setOtherName(String otherName) {
		this.otherName = otherName;
	}

	public String getPostNo() {
		return this.postNo;
	}

	public void setPostNo(String postNo) {
		this.postNo = postNo;
	}

	public String getTelephoneNum() {
		return this.telephoneNum;
	}

	public void setTelephoneNum(String telephoneNum) {
		this.telephoneNum = telephoneNum;
	}

}