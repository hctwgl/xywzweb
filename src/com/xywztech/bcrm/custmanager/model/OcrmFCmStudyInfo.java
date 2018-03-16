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
 * The persistent class for the OCRM_F_CM_STUDY_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CM_STUDY_INFO")
public class OcrmFCmStudyInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CM_STUDY_INFO_CUSTMANAGERID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CM_STUDY_INFO_CUSTMANAGERID_GENERATOR")
	@Column(name="ID",unique=true, nullable=false)
	private Long id;

	@Column(name="CUST_MANAGER_ID")
	private String custManagerId;
	
	@Column(name="CUST_MANAGER_NAME")
	private String custManagerName;

	@Column(name="LEARN_CONTENT")
	private String learnContent;

    @Temporal( TemporalType.DATE)
	private Date FR_DATE;

    @Temporal( TemporalType.DATE)
	private Date TO_DATE;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustManagerId() {
		return custManagerId;
	}

	public void setCustManagerId(String custManagerId) {
		this.custManagerId = custManagerId;
	}

	public String getCustManagerName() {
		return custManagerName;
	}

	public void setCustManagerName(String custManagerName) {
		this.custManagerName = custManagerName;
	}

	public String getLearnContent() {
		return learnContent;
	}

	public void setLearnContent(String learnContent) {
		this.learnContent = learnContent;
	}

	public Date getFR_DATE() {
		return FR_DATE;
	}

	public void setFR_DATE(Date fRDATE) {
		FR_DATE = fRDATE;
	}

	public Date getTO_DATE() {
		return TO_DATE;
	}

	public void setTO_DATE(Date tODATE) {
		TO_DATE = tODATE;
	}
}