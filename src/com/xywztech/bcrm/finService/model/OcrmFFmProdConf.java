package com.xywztech.bcrm.finService.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_FM_PROD_CONF database table.
 * 
 */
@Entity
@Table(name="OCRM_F_FM_PROD_CONF")
public class OcrmFFmProdConf implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_FM_PROD_CONF_CONFID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_FM_PROD_CONF_CONFID_GENERATOR")
	@Column(name="CONF_ID")
	private Integer confId;

	@Column(name="CONF_SCALE")
	private BigDecimal confScale;

	@Column(name="PROD_ID")
	private BigDecimal prodId;

	@Column(name="TARGET_ID")
	private BigDecimal targetId;

    public OcrmFFmProdConf() {
    }

	public Integer getConfId() {
		return this.confId;
	}

	public void setConfId(Integer confId) {
		this.confId = confId;
	}

	public BigDecimal getConfScale() {
		return this.confScale;
	}

	public void setConfScale(BigDecimal confScale) {
		this.confScale = confScale;
	}

	public BigDecimal getProdId() {
		return this.prodId;
	}

	public void setProdId(BigDecimal prodId) {
		this.prodId = prodId;
	}

	public BigDecimal getTargetId() {
		return this.targetId;
	}

	public void setTargetId(BigDecimal targetId) {
		this.targetId = targetId;
	}

}