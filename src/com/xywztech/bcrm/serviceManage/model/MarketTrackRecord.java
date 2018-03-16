package com.xywztech.bcrm.serviceManage.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the OCRM_F_MKT_TRACK_RECORD database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MKT_TRACK_RECORD")
public class MarketTrackRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="TRACKRECORD_GENERATOR", sequenceName="TRACKRECORD_SEQUENCE",allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="TRACKRECORD_GENERATOR")
	@Column(name="RECORD_ID")
	private Long recordId;

	@Column(name="CANTACT_CHANNEL")
	private String cantactChannel;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="CREATE_USER")
	private String createUser;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="MARKET_RESULT")
	private String marketResult;

	@Column(name="MKT_ID")
	private BigDecimal mktId;

	@Column(name="NEED_EVENT")
	private String needEvent;

	@Column(name="SERVICE_KIND")
	private String serviceKind;

    @Temporal( TemporalType.DATE)
	@Column(name="CANTACT_DATE")
	private Date cantactDate;

    @Temporal( TemporalType.DATE)
	@Column(name="UPDATE_DATE")
	private Date updateDate;

	@Column(name="UPDATE_USER")
	private String updateUser;

	public Long getRecordId() {
		return recordId;
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public String getCantactChannel() {
		return cantactChannel;
	}

	public void setCantactChannel(String cantactChannel) {
		this.cantactChannel = cantactChannel;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getMarketResult() {
		return marketResult;
	}

	public void setMarketResult(String marketResult) {
		this.marketResult = marketResult;
	}

	public BigDecimal getMktId() {
		return mktId;
	}

	public void setMktId(BigDecimal mktId) {
		this.mktId = mktId;
	}

	public String getNeedEvent() {
		return needEvent;
	}

	public void setNeedEvent(String needEvent) {
		this.needEvent = needEvent;
	}

	public String getServiceKind() {
		return serviceKind;
	}

	public void setServiceKind(String serviceKind) {
		this.serviceKind = serviceKind;
	}

	public Date getCantactDate() {
		return cantactDate;
	}

	public void setCantactDate(Date cantactDate) {
		this.cantactDate = cantactDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}