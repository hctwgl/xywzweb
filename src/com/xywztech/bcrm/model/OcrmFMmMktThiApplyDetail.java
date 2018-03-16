package com.xywztech.bcrm.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_MM_MKT_THI_APPY_DETAILS database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_MKT_THI_APPY_DETAILS")
public class OcrmFMmMktThiApplyDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_MM_MKT_THI_APPY_DETAILS_RECORDEID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_MM_MKT_THI_APPY_DETAILS_RECORDEID_GENERATOR")
	@Column(name="RECORDE_ID", unique=true, nullable=false)
	private Long recordeId;

	@Column(name="APPLY_ID", nullable=false)
	private Long applyId;

	@Column(name="APPLY_NUM")
	private Integer applyNum;

	@Column(name="APPROVE_NUM")
	private Integer approveNum;

	@Column(name="MKT_ACTIVITY_ID")
	private Long mktActivityId;

	@Column(name="MKT_MATERIAL", length=200)
	private String mktMaterial;

    public OcrmFMmMktThiApplyDetail() {
    }

	public Long getRecordeId() {
		return this.recordeId;
	}

	public void setRecordeId(Long recordeId) {
		this.recordeId = recordeId;
	}

	public Long getApplyId() {
		return this.applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}

	public Integer getApplyNum() {
		return this.applyNum;
	}

	public void setApplyNum(Integer applyNum) {
		this.applyNum = applyNum;
	}

	public Integer getApproveNum() {
		return this.approveNum;
	}

	public void setApproveNum(Integer approveNum) {
		this.approveNum = approveNum;
	}

	public Long getMktActivityId() {
		return this.mktActivityId;
	}

	public void setMktActivityId(Long mktActivityId) {
		this.mktActivityId = mktActivityId;
	}

	public String getMktMaterial() {
		return this.mktMaterial;
	}

	public void setMktMaterial(String mktMaterial) {
		this.mktMaterial = mktMaterial;
	}

}