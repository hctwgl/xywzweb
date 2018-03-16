package com.xywztech.bob.model;

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
 * The persistent class for the OCRM_F_CI_GIFT_EXCHANGE database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_GIFT_EXCHANGE")
public class OcrmFCiGiftExchange implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	private Long id;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_MGR")
	private String custMgr;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="EXCHANGE_COUNT")
	private int exchangeCount;

	@Column(name="EXCHANGE_TOTLE")
	private BigDecimal exchangeTotle;

	@Column(name="GIFT_NAME")
	private String giftName;

	@Column(name="GIFT_POINT")
	private BigDecimal giftPoint;

	@Column(name="GIFT_TYPE")
	private String giftType;

    @Temporal( TemporalType.DATE)
	@Column(name="ORDER_DATE")
	private Date orderDate;

	@Column(name="ORDER_STATUS")
	private String orderStatus;

    public OcrmFCiGiftExchange() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustMgr() {
		return this.custMgr;
	}

	public void setCustMgr(String custMgr) {
		this.custMgr = custMgr;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public int getExchangeCount() {
		return this.exchangeCount;
	}

	public void setExchangeCount(int exchangeCount) {
		this.exchangeCount = exchangeCount;
	}

	public BigDecimal getExchangeTotle() {
		return this.exchangeTotle;
	}

	public void setExchangeTotle(BigDecimal exchangeTotle) {
		this.exchangeTotle = exchangeTotle;
	}

	public String getGiftName() {
		return this.giftName;
	}

	public void setGiftName(String giftName) {
		this.giftName = giftName;
	}

	public BigDecimal getGiftPoint() {
		return this.giftPoint;
	}

	public void setGiftPoint(BigDecimal giftPoint) {
		this.giftPoint = giftPoint;
	}

	public String getGiftType() {
		return this.giftType;
	}

	public void setGiftType(String giftType) {
		this.giftType = giftType;
	}

	public Date getOrderDate() {
		return this.orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public String getOrderStatus() {
		return this.orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

}