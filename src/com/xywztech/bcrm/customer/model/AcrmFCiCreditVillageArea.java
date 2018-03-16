package com.xywztech.bcrm.customer.model;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the ACRM_F_CI_CREDIT_VILLAGE_AREA database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CREDIT_VILLAGE_AREA")
public class AcrmFCiCreditVillageArea implements Serializable {
	private static final long serialVersionUID = 1L;

	
	@Id
	@Column(name="VILLA_NO", length=20)
	private String villaNo;

	@Column(name="VILLA_NAME", length=60)
	private String villaName;
	
	@Column(name="BRCCODE", length=10)
	private String bercCode;
	
	@Column(name="BRANCH", length=40)
	private String beanch;

	@Column(name="AREA_NO", length=20)
	private String areaNo;

	@Column(name="LINKMAN_NAME", length=20)
	private String linkmanName;

	@Column(name="LINKMAN_PHONE", length=20)
	private String linkmanPhone;

	@Column(name="ODS_ST_DATE", length=10)
	private String odsStDate;
	

    public AcrmFCiCreditVillageArea() {
    }


	public String getBercCode() {
		return bercCode;
	}


	public void setBercCode(String bercCode) {
		this.bercCode = bercCode;
	}


	public String getBeanch() {
		return beanch;
	}


	public void setBeanch(String beanch) {
		this.beanch = beanch;
	}


	public String getVillaNo() {
		return villaNo;
	}


	public void setVillaNo(String villaNo) {
		this.villaNo = villaNo;
	}


	public String getVillaName() {
		return villaName;
	}


	public void setVillaName(String villaName) {
		this.villaName = villaName;
	}


	public String getAreaNo() {
		return areaNo;
	}


	public void setAreaNo(String areaNo) {
		this.areaNo = areaNo;
	}


	public String getLinkmanName() {
		return linkmanName;
	}


	public void setLinkmanName(String linkmanName) {
		this.linkmanName = linkmanName;
	}


	public String getLinkmanPhone() {
		return linkmanPhone;
	}


	public void setLinkmanPhone(String linkmanPhone) {
		this.linkmanPhone = linkmanPhone;
	}


	public String getOdsStDate() {
		return odsStDate;
	}


	public void setOdsStDate(String odsStDate) {
		this.odsStDate = odsStDate;
	}

	
}