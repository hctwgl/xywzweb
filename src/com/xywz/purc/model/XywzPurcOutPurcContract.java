package com.xywz.purc.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_purc_out_purc_contract database table.
 * 
 */
@Entity
@Table(name="xywz_purc_out_purc_contract")
public class XywzPurcOutPurcContract implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;

	@Column(name="BIZ_MEM_FST_NM")
	private String bizMemFstNm;

	@Column(name="BIZ_MEM_ID")
	private String bizMemId;

	@Column(name="CFM_DVY")
	private String cfmDvy;

	@Column(name="CHK_STAT")
	private String chkStat;

    @Temporal( TemporalType.DATE)
	@Column(name="CONTR_DT")
	private Date contrDt;

	@Column(name="CONTR_TOTL_AMT")
	private BigDecimal contrTotlAmt;

	@Column(name="CURR_STP")
	private String currStp;

	@Column(name="DELY_ADDR")
	private String delyAddr;

	@Column(name="INC_TAX_SUM")
	private BigDecimal incTaxSum;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="INSN_MODE")
	private String insnMode;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MEMO1")
	private String memo1;

	@Column(name="MEMO2")
	private String memo2;

	@Column(name="MEMO3")
	private String memo3;

	@Column(name="MEMO4")
	private String memo4;

	@Column(name="MEMO5")
	private String memo5;

	@Column(name="MEMO6")
	private String memo6;

	@Column(name="MERCHD_TOTL_AMT")
	private BigDecimal merchdTotlAmt;

	@Column(name="MERCHD_TOTL_QTY")
	private BigDecimal merchdTotlQty;

	@Column(name="ORDR_CURR_STAT")
	private String ordrCurrStat;

	@Column(name="OTH_ADD_MONEY")
	private BigDecimal othAddMoney;

	@Column(name="OTH_DEDCT_MONEY")
	private BigDecimal othDedctMoney;

	@Column(name="OWN_PERS_NM")
	private String ownPersNm;

	@Column(name="PAY_MD")
	private String payMd;

	@Column(name="PROVR_NUM")
	private String provrNum;

	@Column(name="PROVR_SHT_NM")
	private String provrShtNm;

	@Column(name="PUCH_DEPT_NM")
	private String puchDeptNm;

	@Column(name="PUCH_NM")
	private String puchNm;

	@Column(name="PUCH_PERS_FST_NM")
	private String puchPersFstNm;

	@Column(name="PUCH_PERS_ID")
	private String puchPersId;

	@Column(name="PUCH_SNGL_ID")
	private String puchSnglId;

	@Column(name="SGN")
	private String sgn;

	@Column(name="SRC")
	private String src;

	@Column(name="STL_CUR")
	private String stlCur;

	@Column(name="TRAFF_MODE")
	private String traffMode;

    public XywzPurcOutPurcContract() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBizMemFstNm() {
		return this.bizMemFstNm;
	}

	public void setBizMemFstNm(String bizMemFstNm) {
		this.bizMemFstNm = bizMemFstNm;
	}

	public String getBizMemId() {
		return this.bizMemId;
	}

	public void setBizMemId(String bizMemId) {
		this.bizMemId = bizMemId;
	}

	public String getCfmDvy() {
		return this.cfmDvy;
	}

	public void setCfmDvy(String cfmDvy) {
		this.cfmDvy = cfmDvy;
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

	public BigDecimal getContrTotlAmt() {
		return this.contrTotlAmt;
	}

	public void setContrTotlAmt(BigDecimal contrTotlAmt) {
		this.contrTotlAmt = contrTotlAmt;
	}

	public String getCurrStp() {
		return this.currStp;
	}

	public void setCurrStp(String currStp) {
		this.currStp = currStp;
	}

	public String getDelyAddr() {
		return this.delyAddr;
	}

	public void setDelyAddr(String delyAddr) {
		this.delyAddr = delyAddr;
	}

	public BigDecimal getIncTaxSum() {
		return this.incTaxSum;
	}

	public void setIncTaxSum(BigDecimal incTaxSum) {
		this.incTaxSum = incTaxSum;
	}

	public Date getInputDt() {
		return this.inputDt;
	}

	public void setInputDt(Date inputDt) {
		this.inputDt = inputDt;
	}

	public String getInsnMode() {
		return this.insnMode;
	}

	public void setInsnMode(String insnMode) {
		this.insnMode = insnMode;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMemo1() {
		return this.memo1;
	}

	public void setMemo1(String memo1) {
		this.memo1 = memo1;
	}

	public String getMemo2() {
		return this.memo2;
	}

	public void setMemo2(String memo2) {
		this.memo2 = memo2;
	}

	public String getMemo3() {
		return this.memo3;
	}

	public void setMemo3(String memo3) {
		this.memo3 = memo3;
	}

	public String getMemo4() {
		return this.memo4;
	}

	public void setMemo4(String memo4) {
		this.memo4 = memo4;
	}

	public String getMemo5() {
		return this.memo5;
	}

	public void setMemo5(String memo5) {
		this.memo5 = memo5;
	}

	public String getMemo6() {
		return this.memo6;
	}

	public void setMemo6(String memo6) {
		this.memo6 = memo6;
	}

	public BigDecimal getMerchdTotlAmt() {
		return this.merchdTotlAmt;
	}

	public void setMerchdTotlAmt(BigDecimal merchdTotlAmt) {
		this.merchdTotlAmt = merchdTotlAmt;
	}

	public BigDecimal getMerchdTotlQty() {
		return this.merchdTotlQty;
	}

	public void setMerchdTotlQty(BigDecimal merchdTotlQty) {
		this.merchdTotlQty = merchdTotlQty;
	}

	public String getOrdrCurrStat() {
		return this.ordrCurrStat;
	}

	public void setOrdrCurrStat(String ordrCurrStat) {
		this.ordrCurrStat = ordrCurrStat;
	}

	public BigDecimal getOthAddMoney() {
		return this.othAddMoney;
	}

	public void setOthAddMoney(BigDecimal othAddMoney) {
		this.othAddMoney = othAddMoney;
	}

	public BigDecimal getOthDedctMoney() {
		return this.othDedctMoney;
	}

	public void setOthDedctMoney(BigDecimal othDedctMoney) {
		this.othDedctMoney = othDedctMoney;
	}

	public String getOwnPersNm() {
		return this.ownPersNm;
	}

	public void setOwnPersNm(String ownPersNm) {
		this.ownPersNm = ownPersNm;
	}

	public String getPayMd() {
		return this.payMd;
	}

	public void setPayMd(String payMd) {
		this.payMd = payMd;
	}

	public String getProvrNum() {
		return this.provrNum;
	}

	public void setProvrNum(String provrNum) {
		this.provrNum = provrNum;
	}

	public String getProvrShtNm() {
		return this.provrShtNm;
	}

	public void setProvrShtNm(String provrShtNm) {
		this.provrShtNm = provrShtNm;
	}

	public String getPuchDeptNm() {
		return this.puchDeptNm;
	}

	public void setPuchDeptNm(String puchDeptNm) {
		this.puchDeptNm = puchDeptNm;
	}

	public String getPuchNm() {
		return this.puchNm;
	}

	public void setPuchNm(String puchNm) {
		this.puchNm = puchNm;
	}

	public String getPuchPersFstNm() {
		return this.puchPersFstNm;
	}

	public void setPuchPersFstNm(String puchPersFstNm) {
		this.puchPersFstNm = puchPersFstNm;
	}

	public String getPuchPersId() {
		return this.puchPersId;
	}

	public void setPuchPersId(String puchPersId) {
		this.puchPersId = puchPersId;
	}

	public String getPuchSnglId() {
		return this.puchSnglId;
	}

	public void setPuchSnglId(String puchSnglId) {
		this.puchSnglId = puchSnglId;
	}

	public String getSgn() {
		return this.sgn;
	}

	public void setSgn(String sgn) {
		this.sgn = sgn;
	}

	public String getSrc() {
		return this.src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

	public String getStlCur() {
		return this.stlCur;
	}

	public void setStlCur(String stlCur) {
		this.stlCur = stlCur;
	}

	public String getTraffMode() {
		return this.traffMode;
	}

	public void setTraffMode(String traffMode) {
		this.traffMode = traffMode;
	}

}