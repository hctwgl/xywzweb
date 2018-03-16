package com.xywztech.bcrm.sales.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_CI_MKT_MODEL_MANAGE database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_MKT_MODEL_MANAGE")
public class OcrmFCiMktModelManage implements Serializable {
	private static final long serialVersionUID = 1L;
	 @Id
	 @GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	 @Column(name = "ID", nullable = false)
	private Long id;

	@Column(name="MODEL_CONTENT")
	private String modelContent;

	@Column(name="MODEL_ID")
	private String modelId;

	@Column(name="MODEL_NAME")
	private String modelName;

	@Column(name="MODEL_TYPE")
	private String modelType;

	@Column(name="MODEL_TITLE")
	private String modelTitle;
	
	
    public OcrmFCiMktModelManage() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getModelContent() {
		return this.modelContent;
	}

	public void setModelContent(String modelContent) {
		this.modelContent = modelContent;
	}

	public String getModelId() {
		return this.modelId;
	}

	public void setModelId(String modelId) {
		this.modelId = modelId;
	}

	public String getModelName() {
		return this.modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public String getModelType() {
		return modelType;
	}

	public void setModelType(String modelType) {
		this.modelType = modelType;
	}

	public String getModelTitle() {
		return modelTitle;
	}

	public void setModelTitle(String modelTitle) {
		this.modelTitle = modelTitle;
	}

}