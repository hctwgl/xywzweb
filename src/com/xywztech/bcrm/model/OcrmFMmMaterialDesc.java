package com.xywztech.bcrm.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
 * The persistent class for the OCRM_F_MM_MATERIAL_DESC database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_MATERIAL_DESC")
public class OcrmFMmMaterialDesc implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
//	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_MM_MATERIAL_DESC_MKTMATERIALID_GENERATOR")
	@Column(name="MKT_MATERIAL_ID", unique=true, nullable=false)
	private Long mktMaterialId;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(length=200)
	private String creater;

    @Temporal( TemporalType.DATE)
	@Column(name="LATELY_UPDATE_DATE")
	private Date latelyUpdateDate;

	@Column(name="LATELY_UPDATER")
	private String latelyUpdater;

	@Column(name="MKT_MATERIAL_LEAVINGS_NUM")
	private Integer mktMaterialLeavingsNum;

	@Column(name="MKT_MATERIAL_NAME", length=200)
	private String mktMaterialName;

	@Column(name="MKT_MATERIAL_PRICE", precision=24, scale=6)
	private BigDecimal mktMaterialPrice;

	@Column(name="MKT_MATERIAL_STAT", length=13)
	private String mktMaterialStat;

	@Column(length=800)
	private String remark;

    public OcrmFMmMaterialDesc() {
    }

	public Long getMktMaterialId() {
		return this.mktMaterialId;
	}

	public void setMktMaterialId(Long mktMaterialId) {
		this.mktMaterialId = mktMaterialId;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreater() {
		return this.creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

	public Date getLatelyUpdateDate() {
		return this.latelyUpdateDate;
	}

	public void setLatelyUpdateDate(Date latelyUpdateDate) {
		this.latelyUpdateDate = latelyUpdateDate;
	}

	public String getLatelyUpdater() {
		return this.latelyUpdater;
	}

	public void setLatelyUpdater(String latelyUpdater) {
		this.latelyUpdater = latelyUpdater;
	}

	public Integer getMktMaterialLeavingsNum() {
		return this.mktMaterialLeavingsNum;
	}

	public void setMktMaterialLeavingsNum(Integer mktMaterialLeavingsNum) {
		this.mktMaterialLeavingsNum = mktMaterialLeavingsNum;
	}

	public String getMktMaterialName() {
		return this.mktMaterialName;
	}

	public void setMktMaterialName(String mktMaterialName) {
		this.mktMaterialName = mktMaterialName;
	}

	public BigDecimal getMktMaterialPrice() {
		return this.mktMaterialPrice;
	}

	public void setMktMaterialPrice(BigDecimal mktMaterialPrice) {
		this.mktMaterialPrice = mktMaterialPrice;
	}

	public String getMktMaterialStat() {
		return this.mktMaterialStat;
	}

	public void setMktMaterialStat(String mktMaterialStat) {
		this.mktMaterialStat = mktMaterialStat;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}