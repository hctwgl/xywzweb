package com.xywztech.bcrm.model;

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
 * The persistent class for the OCRM_F_WP_DPOUTALERT_PARM database table.
 * 
 */
@Entity
@Table(name="OCRM_F_WP_DPOUTALERT_PARM")
public class OcrmFWpDpoutalertParm implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_WP_DPOUTALERT_PARM_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_WP_DPOUTALERT_PARM_ID_GENERATOR")
	@Column(name="ID")
	private Long id;

	@Column(name="ALERT_LEVEL")
	private String alertLevel;

	@Column(name="TRANS_AMT_FROM")
	private BigDecimal transAmtFrom;

	@Column(name="TRANS_AMT_TO")
	private BigDecimal transAmtTo;

	@Column(name="TRANS_TERM")
	private String transTerm;

	@Column(name="TRANS_TIMES")
	private Long transTimes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAlertLevel() {
		return alertLevel;
	}

	public void setAlertLevel(String alertLevel) {
		this.alertLevel = alertLevel;
	}

	public BigDecimal getTransAmtFrom() {
		return transAmtFrom;
	}

	public void setTransAmtFrom(BigDecimal transAmtFrom) {
		this.transAmtFrom = transAmtFrom;
	}

	public BigDecimal getTransAmtTo() {
		return transAmtTo;
	}

	public void setTransAmtTo(BigDecimal transAmtTo) {
		this.transAmtTo = transAmtTo;
	}

	public String getTransTerm() {
		return transTerm;
	}

	public void setTransTerm(String transTerm) {
		this.transTerm = transTerm;
	}

	public Long getTransTimes() {
		return transTimes;
	}

	public void setTransTimes(Long transTimes) {
		this.transTimes = transTimes;
	}
}