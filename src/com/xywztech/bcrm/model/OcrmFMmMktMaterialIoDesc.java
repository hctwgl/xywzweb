package com.xywztech.bcrm.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_MM_MKT_MATERIAL_IO_DESC database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_MKT_MATERIAL_IO_DESC")
public class OcrmFMmMktMaterialIoDesc implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
//	@SequenceGenerator(name="OCRM_F_MM_MKT_MATERIAL_IO_DESC_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
//	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_MM_MKT_MATERIAL_IO_DESC_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="ARTICLE_NUM")
	private Integer articleNum;

	@Column(name="MKT_MATERIAL_ID", nullable=false)
	private Long mktMaterialId;

	@Column(name="MKT_MATERIAL_NAME", length=200)
	private String mktMaterialName;

	@Column(name="OUTIN_TIME", length=200)
	private String outinTime;

	@Column(name="OUTIN_WAY", length=13)
	private String outinWay;

	private String remark;

    public OcrmFMmMktMaterialIoDesc() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getArticleNum() {
		return this.articleNum;
	}

	public void setArticleNum(Integer articleNum) {
		this.articleNum = articleNum;
	}

	public Long getMktMaterialId() {
		return this.mktMaterialId;
	}

	public void setMktMaterialId(Long mktMaterialId) {
		this.mktMaterialId = mktMaterialId;
	}

	public String getMktMaterialName() {
		return this.mktMaterialName;
	}

	public void setMktMaterialName(String mktMaterialName) {
		this.mktMaterialName = mktMaterialName;
	}

	public String getOutinTime() {
		return this.outinTime;
	}

	public void setOutinTime(String outinTime) {
		this.outinTime = outinTime;
	}

	public String getOutinWay() {
		return this.outinWay;
	}

	public void setOutinWay(String outinWay) {
		this.outinWay = outinWay;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}