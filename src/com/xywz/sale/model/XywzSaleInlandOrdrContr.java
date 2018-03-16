package com.xywz.sale.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_sale_inland_ordr_contr database table.
 * 
 */
@Entity
@Table(name="xywz_sale_inland_ordr_contr")
public class XywzSaleInlandOrdrContr implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ORDR_ID")
	private Long ordrId;

	@Column(name="AMT")
	private BigDecimal amt;

	@Column(name="BELG_CORP")
	private String belgCorp;

	@Column(name="CHK_STAT")
	private String chkStat;

    @Temporal( TemporalType.DATE)
	@Column(name="CONTR_DT")
	private Date contrDt;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="CUR")
	private String cur;

	@Column(name="CUST_ID")
	private BigInteger custId;

	@Column(name="CUST_NM")
	private String custNm;

    @Temporal( TemporalType.DATE)
	@Column(name="FINAL_TRAFF_DAY")
	private Date finalTraffDay;

	@Column(name="FINAL_TRAFF_DETAIL")
	private String finalTraffDetail;

	@Column(name="HESIT_PRD")
	private String hesitPrd;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="INPUT_PERS_ID")
	private String inputPersId;

	@Column(name="INPUT_PERS_NM")
	private String inputPersNm;

	@Column(name="LAST_MDFR")
	private String lastMdfr;

	@Column(name="LAST_MDFR_ID")
	private String lastMdfrId;

    @Temporal( TemporalType.DATE)
	@Column(name="LAST_MODI_DT")
	private Date lastModiDt;

	@Column(name="MAK_DOC_PERS")
	private String makDocPers;

	@Column(name="MAK_DOC_PERS_ID")
	private String makDocPersId;

	@Column(name="NGTV_POOR")
	private String ngtvPoor;

	@Column(name="ORDR_STAT")
	private String ordrStat;

	@Column(name="OTH_XX")
	private String othXx;

	@Column(name="PKG")
	private String pkg;

	@Column(name="PREPY_MONEY_AMT")
	private BigDecimal prepyMoneyAmt;

    @Temporal( TemporalType.DATE)
	@Column(name="PREPY_MONEY_DT")
	private Date prepyMoneyDt;

	@Column(name="QLTY_TECH_STD_REQST")
	private String qltyTechStdReqst;

	@Column(name="SELL_PRINC")
	private String sellPrinc;

	@Column(name="SELL_PRINC_ID")
	private String sellPrincId;

	@Column(name="STL_MODE")
	private String stlMode;

	@Column(name="TRAFF_MODE")
	private String traffMode;

    public XywzSaleInlandOrdrContr() {
    }

	public Long getOrdrId() {
		return this.ordrId;
	}

	public void setOrdrId(Long ordrId) {
		this.ordrId = ordrId;
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

	public String getChkStat() {
		return this.chkStat;
	}

	public void setChkStat(String chkStat) {
		this.chkStat = chkStat;
	}

	public Date getContrDt() {
		return this.contrDt;
	}

	public void setContrDt(Date contrDt) {
		this.contrDt = contrDt;
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

	public String getCustNm() {
		return this.custNm;
	}

	public void setCustNm(String custNm) {
		this.custNm = custNm;
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

	public String getHesitPrd() {
		return this.hesitPrd;
	}

	public void setHesitPrd(String hesitPrd) {
		this.hesitPrd = hesitPrd;
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

	public String getMakDocPers() {
		return this.makDocPers;
	}

	public void setMakDocPers(String makDocPers) {
		this.makDocPers = makDocPers;
	}

	public String getMakDocPersId() {
		return this.makDocPersId;
	}

	public void setMakDocPersId(String makDocPersId) {
		this.makDocPersId = makDocPersId;
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

	public String getOthXx() {
		return this.othXx;
	}

	public void setOthXx(String othXx) {
		this.othXx = othXx;
	}

	public String getPkg() {
		return this.pkg;
	}

	public void setPkg(String pkg) {
		this.pkg = pkg;
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

	public String getQltyTechStdReqst() {
		return this.qltyTechStdReqst;
	}

	public void setQltyTechStdReqst(String qltyTechStdReqst) {
		this.qltyTechStdReqst = qltyTechStdReqst;
	}

	public String getSellPrinc() {
		return this.sellPrinc;
	}

	public void setSellPrinc(String sellPrinc) {
		this.sellPrinc = sellPrinc;
	}

	public String getSellPrincId() {
		return this.sellPrincId;
	}

	public void setSellPrincId(String sellPrincId) {
		this.sellPrincId = sellPrincId;
	}

	public String getStlMode() {
		return this.stlMode;
	}

	public void setStlMode(String stlMode) {
		this.stlMode = stlMode;
	}

	public String getTraffMode() {
		return this.traffMode;
	}

	public void setTraffMode(String traffMode) {
		this.traffMode = traffMode;
	}

}