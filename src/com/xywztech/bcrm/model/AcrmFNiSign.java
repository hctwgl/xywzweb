package com.xywztech.bcrm.model;

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
 * The persistent class for the ACRM_F_NI_SIGN database table.
 * 
 */
@Entity
@Table(name="ACRM_F_NI_SIGN")
public class AcrmFNiSign implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_NI_SIGN_AGREEMENTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_NI_SIGN_AGREEMENTID_GENERATOR")
	@Column(name="AGREEMENT_ID",unique=true, nullable=false)
	private Long agreementId;

	@Column(name="ACCT_NO")
	private String acctNo;

	@Column(name="ACCT_STATUS")
	private String acctStatus;

	@Column(name="AMT")
	private BigDecimal amt;

	@Column(name="AMT_CYNO")
	private String amtCyno;

    @Temporal( TemporalType.DATE)
	@Column(name="ARG_DT")
	private Date argDt;

	@Column(name="ARG_STATUS")
	private String argStatus;

	@Column(name="BAL")
	private BigDecimal bal;

	@Column(name="CRM_DT")
	private String crmDt;

	@Column(name="CUST_NO")
	private String custNo;

    @Temporal( TemporalType.DATE)
	@Column(name="END_DT")
	private Date endDt;

	@Column(name="ORG_NO")
	private String orgNo;

	@Column(name="OTHER_BANK_FLAG")
	private String otherBankFlag;

	@Column(name="PRODUCT_ID")
	private Long productId;

	@Column(name="S_CUST_NO")
	private String sCustNo;

	@Column(name="S_SERIALNO")
	private String sSerialno;

	@Column(name="SYS_NO")
	private String sysNo;

	@Column(name="V_FLAG")
	private String vFlag;

	public Long getAgreementId() {
		return agreementId;
	}

	public void setAgreementId(Long agreementId) {
		this.agreementId = agreementId;
	}

	public String getAcctNo() {
		return acctNo;
	}

	public void setAcctNo(String acctNo) {
		this.acctNo = acctNo;
	}

	public String getAcctStatus() {
		return acctStatus;
	}

	public void setAcctStatus(String acctStatus) {
		this.acctStatus = acctStatus;
	}

	public BigDecimal getAmt() {
		return amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public String getAmtCyno() {
		return amtCyno;
	}

	public void setAmtCyno(String amtCyno) {
		this.amtCyno = amtCyno;
	}

	public Date getArgDt() {
		return argDt;
	}

	public void setArgDt(Date argDt) {
		this.argDt = argDt;
	}

	public String getArgStatus() {
		return argStatus;
	}

	public void setArgStatus(String argStatus) {
		this.argStatus = argStatus;
	}

	public BigDecimal getBal() {
		return bal;
	}

	public void setBal(BigDecimal bal) {
		this.bal = bal;
	}

	public String getCrmDt() {
		return crmDt;
	}

	public void setCrmDt(String crmDt) {
		this.crmDt = crmDt;
	}

	public String getCustNo() {
		return custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}

	public Date getEndDt() {
		return endDt;
	}

	public void setEndDt(Date endDt) {
		this.endDt = endDt;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getOtherBankFlag() {
		return otherBankFlag;
	}

	public void setOtherBankFlag(String otherBankFlag) {
		this.otherBankFlag = otherBankFlag;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getsCustNo() {
		return sCustNo;
	}

	public void setsCustNo(String sCustNo) {
		this.sCustNo = sCustNo;
	}

	public String getsSerialno() {
		return sSerialno;
	}

	public void setsSerialno(String sSerialno) {
		this.sSerialno = sSerialno;
	}

	public String getSysNo() {
		return sysNo;
	}

	public void setSysNo(String sysNo) {
		this.sysNo = sysNo;
	}

	public String getvFlag() {
		return vFlag;
	}

	public void setvFlag(String vFlag) {
		this.vFlag = vFlag;
	}
}