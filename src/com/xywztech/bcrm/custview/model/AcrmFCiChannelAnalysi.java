package com.xywztech.bcrm.custview.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the ACRM_F_CI_CHANNEL_ANALYSIS database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CHANNEL_ANALYSIS")
public class AcrmFCiChannelAnalysi implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID")
	private String id;
	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CHANNEL")
	private String channel;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="DRAW_AMT")
	private BigDecimal drawAmt;

	@Column(name="DRAW_COUNT")
	private Integer drawCount;

    @Temporal( TemporalType.DATE)
	@Column(name="END_DT")
	private Date endDt;

	@Column(name="SAVE_AMT")
	private BigDecimal saveAmt;

	@Column(name="SAVE_COUNT")
	private Integer saveCount;

    @Temporal( TemporalType.DATE)
	@Column(name="START_DT")
	private Date startDt;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
    
	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public BigDecimal getDrawAmt() {
		return drawAmt;
	}

	public void setDrawAmt(BigDecimal drawAmt) {
		this.drawAmt = drawAmt;
	}

	public Integer getDrawCount() {
		return drawCount;
	}

	public void setDrawCount(Integer drawCount) {
		this.drawCount = drawCount;
	}

	public Date getEndDt() {
		return endDt;
	}

	public void setEndDt(Date endDt) {
		this.endDt = endDt;
	}

	public BigDecimal getSaveAmt() {
		return saveAmt;
	}

	public void setSaveAmt(BigDecimal saveAmt) {
		this.saveAmt = saveAmt;
	}

	public Integer getSaveCount() {
		return saveCount;
	}

	public void setSaveCount(Integer saveCount) {
		this.saveCount = saveCount;
	}

	public Date getStartDt() {
		return startDt;
	}

	public void setStartDt(Date startDt) {
		this.startDt = startDt;
	}
}