package com.xywztech.bcrm.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the OCRM_F_CI_CUSTINFO_UPHIS database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_CUSTINFO_UPHIS")
public class OcrmFCiCustinfoUphi implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)

	@Column(name="UP_ID")
	private Long upId;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="UPDATE_AF_CONT")
	private String updateAfCont;

	@Column(name="UPDATE_BE_CONT")
	private String updateBeCont;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="UPDATE_DATE")
	private Date updateDate;

	@Column(name="UPDATE_ITEM")
	private String updateItem;

	@Column(name="UPDATE_USER")
	private String updateUser;

    public OcrmFCiCustinfoUphi() {
    }

	public Long getUpId() {
		return this.upId;
	}

	public void setUpId(Long upId) {
		this.upId = upId;
	}

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getUpdateAfCont() {
		return this.updateAfCont;
	}

	public void setUpdateAfCont(String updateAfCont) {
		this.updateAfCont = updateAfCont;
	}

	public String getUpdateBeCont() {
		return this.updateBeCont;
	}

	public void setUpdateBeCont(String updateBeCont) {
		this.updateBeCont = updateBeCont;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getUpdateItem() {
		return this.updateItem;
	}

	public void setUpdateItem(String updateItem) {
		this.updateItem = updateItem;
	}

	public String getUpdateUser() {
		return this.updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

}