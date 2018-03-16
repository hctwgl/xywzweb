package com.xywz.sysm.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_sysm_rate database table.
 * 
 */
@Entity
@Table(name="xywz_sysm_rate")
public class XywzSysmRate implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;

    @Temporal( TemporalType.DATE)
	@Column(name="BEGIN_DT")
	private Date beginDt;

	@Column(name="CUR")
	private String cur;

    @Temporal( TemporalType.DATE)
	@Column(name="END_DT")
	private Date endDt;

	@Column(name="INPUT_PERS")
	private String inputPers;

	@Column(name="INPUT_PERS_ID")
	private String inputPersId;

	@Column(name="RATE_CNY")
	private BigDecimal rateCny;

	@Column(name="RATE_USD")
	private BigDecimal rateUsd;

    public XywzSysmRate() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getBeginDt() {
		return this.beginDt;
	}

	public void setBeginDt(Date beginDt) {
		this.beginDt = beginDt;
	}

	public String getCur() {
		return this.cur;
	}

	public void setCur(String cur) {
		this.cur = cur;
	}

	public Date getEndDt() {
		return this.endDt;
	}

	public void setEndDt(Date endDt) {
		this.endDt = endDt;
	}

	public String getInputPers() {
		return this.inputPers;
	}

	public void setInputPers(String inputPers) {
		this.inputPers = inputPers;
	}

	public String getInputPersId() {
		return this.inputPersId;
	}

	public void setInputPersId(String inputPersId) {
		this.inputPersId = inputPersId;
	}

	public BigDecimal getRateCny() {
		return this.rateCny;
	}

	public void setRateCny(BigDecimal rateCny) {
		this.rateCny = rateCny;
	}

	public BigDecimal getRateUsd() {
		return this.rateUsd;
	}

	public void setRateUsd(BigDecimal rateUsd) {
		this.rateUsd = rateUsd;
	}

}