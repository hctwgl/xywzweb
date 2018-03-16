package com.xywz.asst.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the xywz_asst_machg_corp_mgmt database table.
 * 
 */
@Entity
@Table(name="xywz_asst_machg_corp_mgmt")
public class XywzAsstMachgCorpMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ASST_CORP_ID")
	private Long asstCorpId;

	@Column(name="ADDR")
	private String addr;

	@Column(name="ASST_MACHG_ID")
	private String asstMachgId;

	@Column(name="ASST_MACHG_LVL")
	private String asstMachgLvl;

	@Column(name="ASST_MACHG_NM")
	private String asstMachgNm;

	@Column(name="ASST_MACHG_ORDR_NUM")
	private String asstMachgOrdrNum;

	@Column(name="ASST_MACHG_STAT")
	private String asstMachgStat;

	@Column(name="BIZ_CATE")
	private String bizCate;

	@Column(name="CHK_STAT")
	private String chkStat;

	@Column(name="FAX")
	private String fax;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="INPUT_PERS")
	private String inputPers;

	@Column(name="INPUT_PERS_ID")
	private String inputPersId;

	@Column(name="MAIN_BIZ_SCOP")
	private String mainBizScop;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MKT_SCOP")
	private String mktScop;

    @Temporal( TemporalType.DATE)
	@Column(name="MODI_DT")
	private Date modiDt;

	@Column(name="PROD_SCOP")
	private String prodScop;

	@Column(name="RESP_CONTCR")
	private String respContcr;

	@Column(name="RESP_CONTCR_ID")
	private String respContcrId;

    @Temporal( TemporalType.DATE)
	@Column(name="SETUP_DT")
	private Date setupDt;

	@Column(name="TEL")
	private String tel;

    public XywzAsstMachgCorpMgmt() {
    }

	public Long getAsstCorpId() {
		return this.asstCorpId;
	}

	public void setAsstCorpId(Long asstCorpId) {
		this.asstCorpId = asstCorpId;
	}

	public String getAddr() {
		return this.addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getAsstMachgId() {
		return this.asstMachgId;
	}

	public void setAsstMachgId(String asstMachgId) {
		this.asstMachgId = asstMachgId;
	}

	public String getAsstMachgLvl() {
		return this.asstMachgLvl;
	}

	public void setAsstMachgLvl(String asstMachgLvl) {
		this.asstMachgLvl = asstMachgLvl;
	}

	public String getAsstMachgNm() {
		return this.asstMachgNm;
	}

	public void setAsstMachgNm(String asstMachgNm) {
		this.asstMachgNm = asstMachgNm;
	}

	public String getAsstMachgOrdrNum() {
		return this.asstMachgOrdrNum;
	}

	public void setAsstMachgOrdrNum(String asstMachgOrdrNum) {
		this.asstMachgOrdrNum = asstMachgOrdrNum;
	}

	public String getAsstMachgStat() {
		return this.asstMachgStat;
	}

	public void setAsstMachgStat(String asstMachgStat) {
		this.asstMachgStat = asstMachgStat;
	}

	public String getBizCate() {
		return this.bizCate;
	}

	public void setBizCate(String bizCate) {
		this.bizCate = bizCate;
	}

	public String getChkStat() {
		return this.chkStat;
	}

	public void setChkStat(String chkStat) {
		this.chkStat = chkStat;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public Date getInputDt() {
		return this.inputDt;
	}

	public void setInputDt(Date inputDt) {
		this.inputDt = inputDt;
	}

	public String getInputPers() {
		return this.inputPers;
	}

	public void setInputPers(String inputPers) {
		this.inputPers = inputPers;
	}

	public String getInputPersId() {
		return this.inputPersId;
	}

	public void setInputPersId(String inputPersId) {
		this.inputPersId = inputPersId;
	}

	public String getMainBizScop() {
		return this.mainBizScop;
	}

	public void setMainBizScop(String mainBizScop) {
		this.mainBizScop = mainBizScop;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMktScop() {
		return this.mktScop;
	}

	public void setMktScop(String mktScop) {
		this.mktScop = mktScop;
	}

	public Date getModiDt() {
		return this.modiDt;
	}

	public void setModiDt(Date modiDt) {
		this.modiDt = modiDt;
	}

	public String getProdScop() {
		return this.prodScop;
	}

	public void setProdScop(String prodScop) {
		this.prodScop = prodScop;
	}

	public String getRespContcr() {
		return this.respContcr;
	}

	public void setRespContcr(String respContcr) {
		this.respContcr = respContcr;
	}

	public String getRespContcrId() {
		return this.respContcrId;
	}

	public void setRespContcrId(String respContcrId) {
		this.respContcrId = respContcrId;
	}

	public Date getSetupDt() {
		return this.setupDt;
	}

	public void setSetupDt(Date setupDt) {
		this.setupDt = setupDt;
	}

	public String getTel() {
		return this.tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

}