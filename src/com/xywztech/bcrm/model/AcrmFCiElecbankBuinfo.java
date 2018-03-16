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
 * The persistent class for the ACRM_F_CI_ELECBANK_BUINFO database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_ELECBANK_BUINFO")
public class AcrmFCiElecbankBuinfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_ELECBANK_BUINFO_USERID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_ELECBANK_BUINFO_USERID_GENERATOR")
	private Long id;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="ETL_DATE")
	private String etlDate;

	@Column(name="ACC_NATRUE")
	private String accNatrue;

	@Column(name="ACC_OPEN_OUTLETS")
	private String accOpenOutlets;

    @Temporal( TemporalType.DATE)
	@Column(name="CERT_APPLY_DATE")
	private Date certApplyDate;

	@Column(name="CON_INCONME_ACTU")
	private BigDecimal conInconmeActu;

	@Column(name="CON_INCONME_RECI")
	private BigDecimal conInconmeReci;

	@Column(name="CON_INCONME_REDU")
	private BigDecimal conInconmeRedu;

	@Column(name="CONIB_BUSI_KIND")
	private String conibBusiKind;

	@Column(name="CONT_INS_WAGES")
	private BigDecimal contInsWages;

	@Column(name="CONTRACT_ACCNO")
	private String contractAccno;

    @Temporal( TemporalType.DATE)
	@Column(name="CONTRACT_DATE")
	private Date contractDate;

	@Column(name="CUST_IS_TERMIN")
	private String custIsTermin;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="CUSTMGR_CODE")
	private String custmgrCode;

	@Column(name="CUSTMGR_NAME")
	private String custmgrName;

	@Column(name="DEPOSIT_AVG_BAL")
	private BigDecimal depositAvgBal;

	@Column(name="DEPOSIT_CUR_BAL")
	private BigDecimal depositCurBal;

    @Temporal( TemporalType.DATE)
	@Column(name="DISABLE_DATE")
	private Date disableDate;

    @Column(name="EMAIL")
	private String email;

	@Column(name="GMC_CHICOCU_SUM")
	private BigDecimal gmcChicocuSum;

	@Column(name="HY_CLASS")
	private String hyClass;

	@Column(name="LINK_ADDR")
	private String linkAddr;

	@Column(name="LINK_PHONE")
	private String linkPhone;

	@Column(name="LINKER_NAME")
	private String linkerName;

	@Column(name="LONIN_TIMES")
	private BigDecimal loninTimes;

	@Column(name="MOBIE_PHONE")
	private String mobiePhone;

	@Column(name="ORG_ID")
	private String orgId;

	@Column(name="POST_CODING")
	private String postCoding;

    @Temporal( TemporalType.DATE)
	@Column(name="TERMIN_DATE")
	private Date terminDate;

	@Column(name="TRANS_BAL")
	private BigDecimal transBal;

	@Column(name="TRANS_SUM")
	private BigDecimal transSum;

    @Temporal( TemporalType.DATE)
	@Column(name="USED_DATE")
	private Date usedDate;
    
	public Long getId() {
		return id;
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
	public String getEtlDate() {
		return this.etlDate;
	}
	public void setEtlDate(String etlDate) {
		this.etlDate = etlDate;
	}

    public AcrmFCiElecbankBuinfo() {
    }
	
	public String getAccNatrue() {
		return this.accNatrue;
	}

	public void setAccNatrue(String accNatrue) {
		this.accNatrue = accNatrue;
	}

	public String getAccOpenOutlets() {
		return this.accOpenOutlets;
	}

	public void setAccOpenOutlets(String accOpenOutlets) {
		this.accOpenOutlets = accOpenOutlets;
	}

	public Date getCertApplyDate() {
		return this.certApplyDate;
	}

	public void setCertApplyDate(Date certApplyDate) {
		this.certApplyDate = certApplyDate;
	}

	public BigDecimal getConInconmeActu() {
		return this.conInconmeActu;
	}

	public void setConInconmeActu(BigDecimal conInconmeActu) {
		this.conInconmeActu = conInconmeActu;
	}

	public BigDecimal getConInconmeReci() {
		return this.conInconmeReci;
	}

	public void setConInconmeReci(BigDecimal conInconmeReci) {
		this.conInconmeReci = conInconmeReci;
	}

	public BigDecimal getConInconmeRedu() {
		return this.conInconmeRedu;
	}

	public void setConInconmeRedu(BigDecimal conInconmeRedu) {
		this.conInconmeRedu = conInconmeRedu;
	}

	public String getConibBusiKind() {
		return this.conibBusiKind;
	}

	public void setConibBusiKind(String conibBusiKind) {
		this.conibBusiKind = conibBusiKind;
	}

	public BigDecimal getContInsWages() {
		return this.contInsWages;
	}

	public void setContInsWages(BigDecimal contInsWages) {
		this.contInsWages = contInsWages;
	}

	public String getContractAccno() {
		return this.contractAccno;
	}

	public void setContractAccno(String contractAccno) {
		this.contractAccno = contractAccno;
	}

	public Date getContractDate() {
		return this.contractDate;
	}

	public void setContractDate(Date contractDate) {
		this.contractDate = contractDate;
	}

	public String getCustIsTermin() {
		return this.custIsTermin;
	}

	public void setCustIsTermin(String custIsTermin) {
		this.custIsTermin = custIsTermin;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustmgrCode() {
		return this.custmgrCode;
	}

	public void setCustmgrCode(String custmgrCode) {
		this.custmgrCode = custmgrCode;
	}

	public String getCustmgrName() {
		return this.custmgrName;
	}

	public void setCustmgrName(String custmgrName) {
		this.custmgrName = custmgrName;
	}

	public BigDecimal getDepositAvgBal() {
		return this.depositAvgBal;
	}

	public void setDepositAvgBal(BigDecimal depositAvgBal) {
		this.depositAvgBal = depositAvgBal;
	}

	public BigDecimal getDepositCurBal() {
		return this.depositCurBal;
	}

	public void setDepositCurBal(BigDecimal depositCurBal) {
		this.depositCurBal = depositCurBal;
	}

	public Date getDisableDate() {
		return this.disableDate;
	}

	public void setDisableDate(Date disableDate) {
		this.disableDate = disableDate;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public BigDecimal getGmcChicocuSum() {
		return this.gmcChicocuSum;
	}

	public void setGmcChicocuSum(BigDecimal gmcChicocuSum) {
		this.gmcChicocuSum = gmcChicocuSum;
	}

	public String getHyClass() {
		return this.hyClass;
	}

	public void setHyClass(String hyClass) {
		this.hyClass = hyClass;
	}

	public String getLinkAddr() {
		return this.linkAddr;
	}

	public void setLinkAddr(String linkAddr) {
		this.linkAddr = linkAddr;
	}

	public String getLinkPhone() {
		return this.linkPhone;
	}

	public void setLinkPhone(String linkPhone) {
		this.linkPhone = linkPhone;
	}

	public String getLinkerName() {
		return this.linkerName;
	}

	public void setLinkerName(String linkerName) {
		this.linkerName = linkerName;
	}

	public BigDecimal getLoninTimes() {
		return this.loninTimes;
	}

	public void setLoninTimes(BigDecimal loninTimes) {
		this.loninTimes = loninTimes;
	}

	public String getMobiePhone() {
		return this.mobiePhone;
	}

	public void setMobiePhone(String mobiePhone) {
		this.mobiePhone = mobiePhone;
	}

	public String getOrgId() {
		return this.orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getPostCoding() {
		return this.postCoding;
	}

	public void setPostCoding(String postCoding) {
		this.postCoding = postCoding;
	}

	public Date getTerminDate() {
		return this.terminDate;
	}

	public void setTerminDate(Date terminDate) {
		this.terminDate = terminDate;
	}

	public BigDecimal getTransBal() {
		return this.transBal;
	}

	public void setTransBal(BigDecimal transBal) {
		this.transBal = transBal;
	}

	public BigDecimal getTransSum() {
		return this.transSum;
	}

	public void setTransSum(BigDecimal transSum) {
		this.transSum = transSum;
	}

	public Date getUsedDate() {
		return this.usedDate;
	}

	public void setUsedDate(Date usedDate) {
		this.usedDate = usedDate;
	}

}