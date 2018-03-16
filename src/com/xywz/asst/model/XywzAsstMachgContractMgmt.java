package com.xywz.asst.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_asst_machg_contract_mgmt database table.
 * 
 */
@Entity
@Table(name="xywz_asst_machg_contract_mgmt")
public class XywzAsstMachgContractMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ASST_CONTR_ID")
	private Long asstContrId;

	@Column(name="ATTM")
	private String attm;

    @Temporal( TemporalType.DATE)
	@Column(name="CONTR_DT")
	private Date contrDt;

    @Temporal( TemporalType.DATE)
	@Column(name="DELIVER_GDS_PRD")
	private Date deliverGdsPrd;

	@Column(name="GDS_MODE")
	private String gdsMode;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="MACHG_ADDR")
	private String machgAddr;

	@Column(name="MACHG_BANK_ACCT")
	private String machgBankAcct;

	@Column(name="MACHG_BANK_FST_NM")
	private String machgBankFstNm;

	@Column(name="MACHG_CONTCR")
	private String machgContcr;

	@Column(name="MACHG_CONTCR_MAIL")
	private String machgContcrMail;

	@Column(name="MACHG_CONTR_NM")
	private String machgContrNm;

	@Column(name="MACHG_CONTR_NUM")
	private String machgContrNum;

	@Column(name="MACHG_COST_SUM")
	private BigDecimal machgCostSum;

	@Column(name="MACHG_FAX")
	private String machgFax;

	@Column(name="MACHG_GDS_ADDR")
	private String machgGdsAddr;

	@Column(name="MACHG_MODEL")
	private String machgModel;

	@Column(name="MACHG_ORDR_NM")
	private String machgOrdrNm;

	@Column(name="MACHG_ORDR_NUM_ID")
	private String machgOrdrNumId;

	@Column(name="MACHG_TEL")
	private String machgTel;

	@Column(name="MAIN_BIZ_BIZ")
	private String mainBizBiz;

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

	@Column(name="OPRR")
	private String oprr;

	@Column(name="OPRR_ID")
	private String oprrId;

	@Column(name="ORDR_CONTR_NUM")
	private String ordrContrNum;

	@Column(name="OUT_MACHG_CONTCR")
	private String outMachgContcr;

	@Column(name="PAY_MD")
	private String payMd;

	@Column(name="PKG_REQST")
	private String pkgReqst;

	@Column(name="QLTY_REQST")
	private String qltyReqst;

	@Column(name="SELL_PERS_MEM")
	private String sellPersMem;

	@Column(name="SELL_PERS_MEM_ID")
	private String sellPersMemId;

	@Column(name="SIGN_SITE")
	private String signSite;

	@Column(name="STL_CUR")
	private String stlCur;

	@Column(name="STL_MODE_AND_TERM")
	private String stlModeAndTerm;

    public XywzAsstMachgContractMgmt() {
    }

	public Long getAsstContrId() {
		return this.asstContrId;
	}

	public void setAsstContrId(Long asstContrId) {
		this.asstContrId = asstContrId;
	}

	public String getAttm() {
		return this.attm;
	}

	public void setAttm(String attm) {
		this.attm = attm;
	}

	public Date getContrDt() {
		return this.contrDt;
	}

	public void setContrDt(Date contrDt) {
		this.contrDt = contrDt;
	}

	public Date getDeliverGdsPrd() {
		return this.deliverGdsPrd;
	}

	public void setDeliverGdsPrd(Date deliverGdsPrd) {
		this.deliverGdsPrd = deliverGdsPrd;
	}

	public String getGdsMode() {
		return this.gdsMode;
	}

	public void setGdsMode(String gdsMode) {
		this.gdsMode = gdsMode;
	}

	public Date getInputDt() {
		return this.inputDt;
	}

	public void setInputDt(Date inputDt) {
		this.inputDt = inputDt;
	}

	public String getMachgAddr() {
		return this.machgAddr;
	}

	public void setMachgAddr(String machgAddr) {
		this.machgAddr = machgAddr;
	}

	public String getMachgBankAcct() {
		return this.machgBankAcct;
	}

	public void setMachgBankAcct(String machgBankAcct) {
		this.machgBankAcct = machgBankAcct;
	}

	public String getMachgBankFstNm() {
		return this.machgBankFstNm;
	}

	public void setMachgBankFstNm(String machgBankFstNm) {
		this.machgBankFstNm = machgBankFstNm;
	}

	public String getMachgContcr() {
		return this.machgContcr;
	}

	public void setMachgContcr(String machgContcr) {
		this.machgContcr = machgContcr;
	}

	public String getMachgContcrMail() {
		return this.machgContcrMail;
	}

	public void setMachgContcrMail(String machgContcrMail) {
		this.machgContcrMail = machgContcrMail;
	}

	public String getMachgContrNm() {
		return this.machgContrNm;
	}

	public void setMachgContrNm(String machgContrNm) {
		this.machgContrNm = machgContrNm;
	}

	public String getMachgContrNum() {
		return this.machgContrNum;
	}

	public void setMachgContrNum(String machgContrNum) {
		this.machgContrNum = machgContrNum;
	}

	public BigDecimal getMachgCostSum() {
		return this.machgCostSum;
	}

	public void setMachgCostSum(BigDecimal machgCostSum) {
		this.machgCostSum = machgCostSum;
	}

	public String getMachgFax() {
		return this.machgFax;
	}

	public void setMachgFax(String machgFax) {
		this.machgFax = machgFax;
	}

	public String getMachgGdsAddr() {
		return this.machgGdsAddr;
	}

	public void setMachgGdsAddr(String machgGdsAddr) {
		this.machgGdsAddr = machgGdsAddr;
	}

	public String getMachgModel() {
		return this.machgModel;
	}

	public void setMachgModel(String machgModel) {
		this.machgModel = machgModel;
	}

	public String getMachgOrdrNm() {
		return this.machgOrdrNm;
	}

	public void setMachgOrdrNm(String machgOrdrNm) {
		this.machgOrdrNm = machgOrdrNm;
	}

	public String getMachgOrdrNumId() {
		return this.machgOrdrNumId;
	}

	public void setMachgOrdrNumId(String machgOrdrNumId) {
		this.machgOrdrNumId = machgOrdrNumId;
	}

	public String getMachgTel() {
		return this.machgTel;
	}

	public void setMachgTel(String machgTel) {
		this.machgTel = machgTel;
	}

	public String getMainBizBiz() {
		return this.mainBizBiz;
	}

	public void setMainBizBiz(String mainBizBiz) {
		this.mainBizBiz = mainBizBiz;
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

	public String getOprr() {
		return this.oprr;
	}

	public void setOprr(String oprr) {
		this.oprr = oprr;
	}

	public String getOprrId() {
		return this.oprrId;
	}

	public void setOprrId(String oprrId) {
		this.oprrId = oprrId;
	}

	public String getOrdrContrNum() {
		return this.ordrContrNum;
	}

	public void setOrdrContrNum(String ordrContrNum) {
		this.ordrContrNum = ordrContrNum;
	}

	public String getOutMachgContcr() {
		return this.outMachgContcr;
	}

	public void setOutMachgContcr(String outMachgContcr) {
		this.outMachgContcr = outMachgContcr;
	}

	public String getPayMd() {
		return this.payMd;
	}

	public void setPayMd(String payMd) {
		this.payMd = payMd;
	}

	public String getPkgReqst() {
		return this.pkgReqst;
	}

	public void setPkgReqst(String pkgReqst) {
		this.pkgReqst = pkgReqst;
	}

	public String getQltyReqst() {
		return this.qltyReqst;
	}

	public void setQltyReqst(String qltyReqst) {
		this.qltyReqst = qltyReqst;
	}

	public String getSellPersMem() {
		return this.sellPersMem;
	}

	public void setSellPersMem(String sellPersMem) {
		this.sellPersMem = sellPersMem;
	}

	public String getSellPersMemId() {
		return this.sellPersMemId;
	}

	public void setSellPersMemId(String sellPersMemId) {
		this.sellPersMemId = sellPersMemId;
	}

	public String getSignSite() {
		return this.signSite;
	}

	public void setSignSite(String signSite) {
		this.signSite = signSite;
	}

	public String getStlCur() {
		return this.stlCur;
	}

	public void setStlCur(String stlCur) {
		this.stlCur = stlCur;
	}

	public String getStlModeAndTerm() {
		return this.stlModeAndTerm;
	}

	public void setStlModeAndTerm(String stlModeAndTerm) {
		this.stlModeAndTerm = stlModeAndTerm;
	}

}