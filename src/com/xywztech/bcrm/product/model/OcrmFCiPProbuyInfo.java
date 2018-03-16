package com.xywztech.bcrm.product.model;

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
 * The persistent class for the OCRM_F_CI_P_PROBUY_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_P_PROBUY_INFO")
public class OcrmFCiPProbuyInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_P_PROBUY_INFO_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_P_PROBUY_INFO_ID_GENERATOR")
	@Column(name = "ID",unique=true, nullable=false)
	private Long id;

	@Column(name="BUY_AMT")
	private BigDecimal buyAmt;

	@Column(name="CERT_NUM")
	private String certNum;

	@Column(name="CERT_TYPE")
	private String certType;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

    @Temporal( TemporalType.DATE)
	@Column(name="OPP_DATE")
	private Date oppDate;

	@Column(name="OPP_REASON")
	private String oppReason;

	@Column(name="OPP_TYPE")
	private String oppType;

	@Column(name="OPP_USER")
	private String oppUser;

	@Column(name="PRODUCT_NAME")
	private String productName;

	@Column(name="PRODUCT_NO")
	private String productNo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getBuyAmt() {
		return buyAmt;
	}

	public void setBuyAmt(BigDecimal buyAmt) {
		this.buyAmt = buyAmt;
	}

	public String getCertNum() {
		return certNum;
	}

	public void setCertNum(String certNum) {
		this.certNum = certNum;
	}

	public String getCertType() {
		return certType;
	}

	public void setCertType(String certType) {
		this.certType = certType;
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

	public Date getOppDate() {
		return oppDate;
	}

	public void setOppDate(Date oppDate) {
		this.oppDate = oppDate;
	}

	public String getOppReason() {
		return oppReason;
	}

	public void setOppReason(String oppReason) {
		this.oppReason = oppReason;
	}

	public String getOppType() {
		return oppType;
	}

	public void setOppType(String oppType) {
		this.oppType = oppType;
	}

	public String getOppUser() {
		return oppUser;
	}

	public void setOppUser(String oppUser) {
		this.oppUser = oppUser;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductNo() {
		return productNo;
	}

	public void setProductNo(String productNo) {
		this.productNo = productNo;
	}
}