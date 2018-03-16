package com.xywz.sale.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;

import java.util.Date;


/**
 * The persistent class for the xywz_sale_inv_info database table.
 * 
 */
@Entity
@Table(name="xywz_sale_inv_info")
public class XywzSaleInvInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="INV_ID")
	private Long invId;

	@Column(name="CHKS_PERS")
	private String chksPers;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="INCOTERMS")
	private String incoterms;

    @Temporal( TemporalType.DATE)
	@Column(name="INV_DT")
	private Date invDt;

	@Column(name="INV_NUM")
	private String invNum;

	@Column(name="INV_STAT")
	private String invStat;

	@Column(name="PAYMENTS")
	private String payments;

	@Column(name="PORTOFDESTINATION")
	private String portofdestination;

	@Column(name="PORTOFLOADING")
	private String portofloading;

	@Column(name="S_CNO")
	private String sCno;

	@Column(name="SHIPPINGMARKS")
	private String shippingmarks;
	
	@Column(name="CUR")
	private String cur;
	
	@Column(name="AMT")
	private BigDecimal amt;
	
	@Column(name="USD_AMT")
	private BigDecimal usdAmt;

	@Column(name="USD_RAT")
	private BigDecimal usdRat;
	
	@Column(name="QTY")
	private BigDecimal qty;


    public XywzSaleInvInfo() {
    }

	public Long getInvId() {
		return this.invId;
	}

	public void setInvId(Long invId) {
		this.invId = invId;
	}

	public String getChksPers() {
		return this.chksPers;
	}

	public void setChksPers(String chksPers) {
		this.chksPers = chksPers;
	}

	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}

	public String getIncoterms() {
		return this.incoterms;
	}

	public void setIncoterms(String incoterms) {
		this.incoterms = incoterms;
	}

	public Date getInvDt() {
		return this.invDt;
	}

	public void setInvDt(Date invDt) {
		this.invDt = invDt;
	}

	public String getInvNum() {
		return this.invNum;
	}

	public void setInvNum(String invNum) {
		this.invNum = invNum;
	}

	public String getInvStat() {
		return this.invStat;
	}

	public void setInvStat(String invStat) {
		this.invStat = invStat;
	}

	public String getPayments() {
		return this.payments;
	}

	public void setPayments(String payments) {
		this.payments = payments;
	}

	public String getPortofdestination() {
		return this.portofdestination;
	}

	public void setPortofdestination(String portofdestination) {
		this.portofdestination = portofdestination;
	}

	public String getPortofloading() {
		return this.portofloading;
	}

	public void setPortofloading(String portofloading) {
		this.portofloading = portofloading;
	}

	public String getSCno() {
		return this.sCno;
	}

	public void setSCno(String sCno) {
		this.sCno = sCno;
	}

	public String getShippingmarks() {
		return this.shippingmarks;
	}

	public void setShippingmarks(String shippingmarks) {
		this.shippingmarks = shippingmarks;
	}
	
	public String getCur() {
		return this.cur;
	}

	public void setCur(String cur) {
		this.cur = cur;
	}
	
	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}
	
	public BigDecimal getUsdAmt() {
		return this.usdAmt;
	}

	public void setUsdAmt(BigDecimal usdAmt) {
		this.usdAmt = usdAmt;
	}

	public BigDecimal getUsdRat() {
		return this.usdRat;
	}

	public void setUsdRat(BigDecimal usdRat) {
		this.usdRat = usdRat;
	}
	
	public BigDecimal getQty() {
		return this.qty;
	}

	public void setQty(BigDecimal qty) {
		this.qty = qty;
	}

}