package com.xywz.sale.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_sale_commsn_mgmt database table.
 * 
 */
@Entity
@Table(name="xywz_sale_commsn_mgmt")
public class XywzSaleCommsnMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="COMMSN_ID")
	private Long commsnId;

	@Column(name="AMT")
	private BigDecimal amt;

	@Column(name="COMMSN_AMT")
	private BigDecimal commsnAmt;

	@Column(name="COMMSN_UPRC")
	private BigDecimal commsnUprc;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="CUR")
	private String cur;

	@Column(name="INV_NUM")
	private String invNum;

	@Column(name="MODEL")
	private String model;

    @Temporal( TemporalType.DATE)
	@Column(name="PAY_DT")
	private Date payDt;

	@Column(name="RATIO")
	private String ratio;

    @Temporal( TemporalType.DATE)
	@Column(name="REFUND_DT")
	private Date refundDt;

	@Column(name="WEIGHT")
	private BigDecimal weight;

    public XywzSaleCommsnMgmt() {
    }

	public Long getCommsnId() {
		return this.commsnId;
	}

	public void setCommsnId(Long commsnId) {
		this.commsnId = commsnId;
	}

	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public BigDecimal getCommsnAmt() {
		return this.commsnAmt;
	}

	public void setCommsnAmt(BigDecimal commsnAmt) {
		this.commsnAmt = commsnAmt;
	}

	public BigDecimal getCommsnUprc() {
		return this.commsnUprc;
	}

	public void setCommsnUprc(BigDecimal commsnUprc) {
		this.commsnUprc = commsnUprc;
	}

	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}

	public String getCur() {
		return this.cur;
	}

	public void setCur(String cur) {
		this.cur = cur;
	}

	public String getInvNum() {
		return this.invNum;
	}

	public void setInvNum(String invNum) {
		this.invNum = invNum;
	}

	public String getModel() {
		return this.model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Date getPayDt() {
		return this.payDt;
	}

	public void setPayDt(Date payDt) {
		this.payDt = payDt;
	}

	public String getRatio() {
		return this.ratio;
	}

	public void setRatio(String ratio) {
		this.ratio = ratio;
	}

	public Date getRefundDt() {
		return this.refundDt;
	}

	public void setRefundDt(Date refundDt) {
		this.refundDt = refundDt;
	}

	public BigDecimal getWeight() {
		return this.weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

}