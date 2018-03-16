package com.xywz.sale.model;


import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_sale_frgn_ordr_contr database table.
 * 
 */
@Entity
@Table(name="xywz_sale_frgn_ordr_contr")
public class XywzSaleFrgnOrdrContr implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ORDR_ID")
	private Long ordrId;

	@Column(name="ADVIS_BANK")
	private String advisBank;

	@Column(name="AMT")
	private BigDecimal amt;

	@Column(name="BELG_CORP")
	private String belgCorp;

	@Column(name="BRGN_MODE")
	private String brgnMode;
	
	@Column(name="BRGN_MODE_DETAIL")
	private String brgnModeDetail;


	@Column(name="CHK_STAT")
	private String chkStat;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="CUR")
	private String cur;

	@Column(name="CUST_ID")
	private BigInteger custId;

    @Temporal( TemporalType.DATE)
	@Column(name="FINAL_TRAFF_DAY")
	private Date finalTraffDay;

	@Column(name="FINAL_TRAFF_DETAIL")
	private String finalTraffDetail;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="INPUT_PERS_ID")
	private String inputPersId;

	@Column(name="INPUT_PERS_NM")
	private String inputPersNm;

	@Column(name="IS_ALTER_CERT")
	private String isAlterCert;

	@Column(name="IS_NT_RECV_LC")
	private String isNtRecvLc;

	@Column(name="LAST_MDFR")
	private String lastMdfr;

	@Column(name="LAST_MDFR_ID")
	private String lastMdfrId;

    @Temporal( TemporalType.DATE)
	@Column(name="LAST_MODI_DT")
	private Date lastModiDt;

	@Column(name="LC_NUM")
	private String lcNum;

	@Column(name="LOAD_TRAFF_PORT")
	private String loadTraffPort;

	@Column(name="MAK_DOC_PERS_ID")
	private String makDocPersId;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MERCHD_NM")
	private String merchdNm;

	@Column(name="MORE_OR_LESS")
	private String moreOrLess;

	@Column(name="NEED_DOC")
	private String needDoc;

    @Temporal( TemporalType.DATE)
	@Column(name="NEXT_PLAN_SNGL_DT")
	private Date nextPlanSnglDt;

	@Column(name="NGTV_POOR")
	private String ngtvPoor;

	@Column(name="ORDR_STAT")
	private String ordrStat;

	@Column(name="PAY_CODE")
	private String payCode;

	@Column(name="PAY_MD")
	private String payMd;

	@Column(name="PKG")
	private String pkg;

	@Column(name="PORTOF_DISCHARGE")
	private String portofDischarge;

	@Column(name="PREPY_MONEY_AMT")
	private BigDecimal prepyMoneyAmt;

    @Temporal( TemporalType.DATE)
	@Column(name="PREPY_MONEY_DT")
	private Date prepyMoneyDt;

	@Column(name="SELL_PRINC_ID")
	private String sellPrincId;

    @Temporal( TemporalType.DATE)
	@Column(name="SEND_TAG_DT")
	private Date sendTagDt;

	@Column(name="SHIPPINGMARKS")
	private String shippingmarks;

    @Temporal( TemporalType.DATE)
	@Column(name="SIGN_DT")
	private Date signDt;

    public XywzSaleFrgnOrdrContr() {
    }

	public Long getOrdrId() {
		return this.ordrId;
	}

	public void setOrdrId(Long ordrId) {
		this.ordrId = ordrId;
	}

	public String getAdvisBank() {
		return this.advisBank;
	}

	public void setAdvisBank(String advisBank) {
		this.advisBank = advisBank;
	}

	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public String getBelgCorp() {
		return this.belgCorp;
	}

	public void setBelgCorp(String belgCorp) {
		this.belgCorp = belgCorp;
	}

	public String getBrgnMode() {
		return this.brgnMode;
	}

	public void setBrgnMode(String brgnMode) {
		this.brgnMode = brgnMode;
	}
	
	public String getBrgnModeDetail() {
		return this.brgnModeDetail;
	}

	public void setBrgnModeDetail(String brgnModeDetail) {
		this.brgnModeDetail = brgnModeDetail;
	}

	public String getChkStat() {
		return this.chkStat;
	}

	public void setChkStat(String chkStat) {
		this.chkStat = chkStat;
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

	public BigInteger getCustId() {
		return this.custId;
	}

	public void setCustId(BigInteger custId) {
		this.custId = custId;
	}

	public Date getFinalTraffDay() {
		return this.finalTraffDay;
	}

	public void setFinalTraffDay(Date finalTraffDay) {
		this.finalTraffDay = finalTraffDay;
	}

	public String getFinalTraffDetail() {
		return this.finalTraffDetail;
	}

	public void setFinalTraffDetail(String finalTraffDetail) {
		this.finalTraffDetail = finalTraffDetail;
	}

	public Date getInputDt() {
		return this.inputDt;
	}

	public void setInputDt(Date inputDt) {
		this.inputDt = inputDt;
	}

	public String getInputPersId() {
		return this.inputPersId;
	}

	public void setInputPersId(String inputPersId) {
		this.inputPersId = inputPersId;
	}

	public String getInputPersNm() {
		return this.inputPersNm;
	}

	public void setInputPersNm(String inputPersNm) {
		this.inputPersNm = inputPersNm;
	}

	public String getIsAlterCert() {
		return this.isAlterCert;
	}

	public void setIsAlterCert(String isAlterCert) {
		this.isAlterCert = isAlterCert;
	}

	public String getIsNtRecvLc() {
		return this.isNtRecvLc;
	}

	public void setIsNtRecvLc(String isNtRecvLc) {
		this.isNtRecvLc = isNtRecvLc;
	}

	public String getLastMdfr() {
		return this.lastMdfr;
	}

	public void setLastMdfr(String lastMdfr) {
		this.lastMdfr = lastMdfr;
	}

	public String getLastMdfrId() {
		return this.lastMdfrId;
	}

	public void setLastMdfrId(String lastMdfrId) {
		this.lastMdfrId = lastMdfrId;
	}

	public Date getLastModiDt() {
		return this.lastModiDt;
	}

	public void setLastModiDt(Date lastModiDt) {
		this.lastModiDt = lastModiDt;
	}

	public String getLcNum() {
		return this.lcNum;
	}

	public void setLcNum(String lcNum) {
		this.lcNum = lcNum;
	}

	public String getLoadTraffPort() {
		return this.loadTraffPort;
	}

	public void setLoadTraffPort(String loadTraffPort) {
		this.loadTraffPort = loadTraffPort;
	}

	public String getMakDocPersId() {
		return this.makDocPersId;
	}

	public void setMakDocPersId(String makDocPersId) {
		this.makDocPersId = makDocPersId;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMerchdNm() {
		return this.merchdNm;
	}

	public void setMerchdNm(String merchdNm) {
		this.merchdNm = merchdNm;
	}

	public String getMoreOrLess() {
		return this.moreOrLess;
	}

	public void setMoreOrLess(String moreOrLess) {
		this.moreOrLess = moreOrLess;
	}

	public String getNeedDoc() {
		return this.needDoc;
	}

	public void setNeedDoc(String needDoc) {
		this.needDoc = needDoc;
	}

	public Date getNextPlanSnglDt() {
		return this.nextPlanSnglDt;
	}

	public void setNextPlanSnglDt(Date nextPlanSnglDt) {
		this.nextPlanSnglDt = nextPlanSnglDt;
	}

	public String getNgtvPoor() {
		return this.ngtvPoor;
	}

	public void setNgtvPoor(String ngtvPoor) {
		this.ngtvPoor = ngtvPoor;
	}

	public String getOrdrStat() {
		return this.ordrStat;
	}

	public void setOrdrStat(String ordrStat) {
		this.ordrStat = ordrStat;
	}

	public String getPayCode() {
		return this.payCode;
	}

	public void setPayCode(String payCode) {
		this.payCode = payCode;
	}

	public String getPayMd() {
		return this.payMd;
	}

	public void setPayMd(String payMd) {
		this.payMd = payMd;
	}

	public String getPkg() {
		return this.pkg;
	}

	public void setPkg(String pkg) {
		this.pkg = pkg;
	}

	public String getPortofDischarge() {
		return this.portofDischarge;
	}

	public void setPortofDischarge(String portofDischarge) {
		this.portofDischarge = portofDischarge;
	}

	public BigDecimal getPrepyMoneyAmt() {
		return this.prepyMoneyAmt;
	}

	public void setPrepyMoneyAmt(BigDecimal prepyMoneyAmt) {
		this.prepyMoneyAmt = prepyMoneyAmt;
	}

	public Date getPrepyMoneyDt() {
		return this.prepyMoneyDt;
	}

	public void setPrepyMoneyDt(Date prepyMoneyDt) {
		this.prepyMoneyDt = prepyMoneyDt;
	}

	public String getSellPrincId() {
		return this.sellPrincId;
	}

	public void setSellPrincId(String sellPrincId) {
		this.sellPrincId = sellPrincId;
	}

	public Date getSendTagDt() {
		return this.sendTagDt;
	}

	public void setSendTagDt(Date sendTagDt) {
		this.sendTagDt = sendTagDt;
	}

	public String getShippingmarks() {
		return this.shippingmarks;
	}

	public void setShippingmarks(String shippingmarks) {
		this.shippingmarks = shippingmarks;
	}

	public Date getSignDt() {
		return this.signDt;
	}

	public void setSignDt(Date signDt) {
		this.signDt = signDt;
	}

}