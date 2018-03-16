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
 * The persistent class for the ACRM_F_CI_CUST_ELEC_MGR_INFO database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CUST_ELEC_MGR_INFO")
public class AcrmFCiCustElecMgrInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CUST_ELEC_MGR_INFO_ID_GENERATOR", sequenceName="ID_SEQUENCE" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CUST_ELEC_MGR_INFO_ID_GENERATOR")
	private Long id;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_TYPE")
	private String custType;

	@Column(name="DOCU_ADDR")
	private String docuAddr;

	@Column(name="FILE_NAME")
	private String fileName;

	@Column(name="FILE_TYPE")
	private String fileType;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustType() {
		return custType;
	}

	public void setCustType(String custType) {
		this.custType = custType;
	}

	public String getDocuAddr() {
		return docuAddr;
	}

	public void setDocuAddr(String docuAddr) {
		this.docuAddr = docuAddr;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
}