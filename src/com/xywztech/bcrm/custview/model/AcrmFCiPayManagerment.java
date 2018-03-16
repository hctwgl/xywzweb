package com.xywztech.bcrm.custview.model;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the ACRM_F_CI_PAY_MANAGERMENT database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PAY_MANAGERMENT")
public class AcrmFCiPayManagerment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PAY_MANAGERMENT_CONTNO_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PAY_MANAGERMENT_CONTNO_GENERATOR")
	@Column(name="CONT_NO")
	private String contNo;

	@Column(name="AMT")
	private BigDecimal amt;

	@Column(name="COUNTER_PARTY_ACC_NO")
	private String counterPartyAccNo;

	@Column(name="COUNTER_PARTY_NAME")
	private String counterPartyName;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

    @Temporal( TemporalType.DATE)
	@Column(name="PAY_DT")
	private Date payDt;

	@Column(name="PAY_TYPE")
	private Integer payType;

	@Column(name="USE_FOR")
	private String useFor;

	public String getContNo() {
		return contNo;
	}

	public void setContNo(String contNo) {
		this.contNo = contNo;
	}

	public BigDecimal getAmt() {
		return amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public String getCounterPartyAccNo() {
		return counterPartyAccNo;
	}

	public void setCounterPartyAccNo(String counterPartyAccNo) {
		this.counterPartyAccNo = counterPartyAccNo;
	}

	public String getCounterPartyName() {
		return counterPartyName;
	}

	public void setCounterPartyName(String counterPartyName) {
		this.counterPartyName = counterPartyName;
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

	public Date getPayDt() {
		return payDt;
	}

	public void setPayDt(Date payDt) {
		this.payDt = payDt;
	}

	public Integer getPayType() {
		return payType;
	}

	public void setPayType(Integer payType) {
		this.payType = payType;
	}

	public String getUseFor() {
		return useFor;
	}

	public void setUseFor(String useFor) {
		this.useFor = useFor;
	}
}