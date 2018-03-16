package com.xywz.cust.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;


/**
 * The persistent class for the xywz_para_bank database table.
 * 
 */
@Entity
@Table(name="xywz_cust_custinfo")
public class XywzCustCustInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="CUST_ID")
	private Long custId;
	
	@Column(name="CUST_NO")
	private String custNo;
	
	@Column(name="BIZ_CATE")
	private String bizCate;

	@Column(name="CUST_SHT_NM")
	private String custShtNm;
	
	@Column(name="CUST_CONTCR")
	private String custContcr;
	
	@Column(name="CNTRY_URBN")
	private String cntryUrbn;
	
	@Column(name="FORM_CONTCR_NM")
	private String formContcrNm;
	
	@Column(name="CUST_FULL_NM")
	private String custFullNm;
	
	@Column(name="ADDR")
	private String addr;
	
	@Temporal( TemporalType.DATE)
	@Column(name="SETUP_DT")
	private Date setupDt;

	@Column(name="BIZ_MEM")
	private String bizMem;

	@Column(name="CHK_STAT")
	private String chkStat;

	@Column(name="CUST_LVL")
	private String custLvl;

	@Column(name="INDS")
	private String inds;
	
	@Column(name="PROD_SCOP")
	private String prodScop;
	
	@Column(name="MKT_SCOP")
	private String mktScop;
	
	@Column(name="CRDT_LVL")
	private String crdtLvl;

	@Column(name="TEL_OR_FAX")
	private String telOrFax;
	
	@Column(name="INPUT_PERS_NM")
	private String inputPersNm;
	
	@Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;
	
	@Column(name="FINAL_MODI_DT")
	private String finalModiDt;
	
	@Temporal( TemporalType.DATE)
	@Column(name="MODI_DT")
	private Date modiDt;
	
	@Column(name="CUST_SRC")
	private String custSrc;

	@Column(name="CUST_TYP")
	private String custTyp;

	@Column(name="MDL_BUS")
	private String mdlBus;
	
	@Column(name="MDL_BUS_CONTCR")
	private String mdlBusContcr;

	@Column(name="MDL_BUS_CONT_MODE")
	private String mdlBusContMode;


	@Column(name="FORM_CONTCR")
	private String formContcr;
	
	@Column(name="BIZ_MEM_NM")
	private String bizMemNm;

    public XywzCustCustInfo() {
    }
    

	public Long getCustId() {
		return this.custId;
	}
    public void setCustId(Long custId) {
		this.custId = custId;
	}
    
    public String getCustNo() {
		return this.custNo;
	}
    public void setCustNo(String custNo) {
		this.custNo = custNo;
	}
    
	public String getBizCate() {
		return this.bizCate;
	}

	public void setBizCate(String bizCate) {
		this.bizCate = bizCate;
	}
	
	public String getCustShtNm() {
		return this.custShtNm;
	}

	public void setCustShtNm(String custShtNm) {
		this.custShtNm = custShtNm;
	}
	
	public String getCustContcr() {
		return this.custContcr;
	}

	public void setCustContcr(String custContcr) {
		this.custContcr = custContcr;
	}
	
	public String getCntryUrbn() {
		return this.cntryUrbn;
	}

	public void setCntryUrbn(String cntryUrbn) {
		this.cntryUrbn = cntryUrbn;
	}
	
	public void setCustFullNm(String custFullNm) {
		this.custFullNm = custFullNm;
	}
	
	public String getCustFullNm() {
		return this.custFullNm;
	}
	
	public String getAddr() {
		return this.addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}
	
	public Date getSetupDt() {
		return this.setupDt;
	}

	public void setSetupDt(Date setupDt) {
		this.setupDt = setupDt;
	}
	
	public String getBizMem() {
		return this.bizMem;
	}

	public void setBizMem(String bizMem) {
		this.bizMem = bizMem;
	}
	
	public String getChkStat() {
		return this.chkStat;
	}

	public void setChkStat(String chkStat) {
		this.chkStat = chkStat;
	}
	
	public String getCustLvl() {
		return this.custLvl;
	}

	public void setCustLvl(String custLvl) {
		this.custLvl = custLvl;
	}
	
	public String getInds() {
		return this.inds;
	}

	public void setInds(String inds) {
		this.inds = inds;
	}
	
	public String getProdScop() {
		return this.prodScop;
	}

	public void setProdScop(String prodScop) {
		this.prodScop = prodScop;
	}
	
	public String getMktScop() {
		return this.mktScop;
	}

	public void setMktScop(String mktScop) {
		this.mktScop = mktScop;
	}
	
	public String getCrdtLvl() {
		return this.crdtLvl;
	}

	public void setCrdtLvl(String crdtLvl) {
		this.crdtLvl = crdtLvl;
	}
	
	public String getTelOrFax() {
		return this.telOrFax;
	}

	public void setTelOrFax(String telOrFax) {
		this.telOrFax = telOrFax;
	}
	
	public String getInputPersNm() {
		return this.inputPersNm;
	}

	public void setInputPersNm(String inputPersNm) {
		this.inputPersNm = inputPersNm;
	}
	
	public Date getInputDt() {
		return this.inputDt;
	}

	public void setInputDt(Date inputDt) {
		this.inputDt = inputDt;
	}
	
	public String getFinalModiDt() {
		return this.finalModiDt;
	}

	public void setFinalModiDt(String finalModiDt) {
		this.finalModiDt = finalModiDt;
	}
	
	public Date getModiDt() {
		return this.modiDt;
	}

	public void setModiDt(Date modiDt) {
		this.modiDt = modiDt;
	}
	
	public String getCustSrc() {
		return this.custSrc;
	}

	public void setCustSrc(String custSrc) {
		this.custSrc = custSrc;
	}
	
	public String getCustTyp() {
		return this.custTyp;
	}

	public void setCustTyp(String custTyp) {
		this.custTyp = custTyp;
	}
	
	
	public String getMdlBus() {
		return this.mdlBus;
	}

	public void setMdlBus(String mdlBus) {
		this.mdlBus = mdlBus;
	}
	
	public String getMdlBusContcr() {
		return this.mdlBusContcr;
	}

	public void setMdlBusContcr(String mdlBusContcr) {
		this.mdlBusContcr = mdlBusContcr;
	}
	
	public String getMdlBusContMode() {
		return this.mdlBusContMode;
	}

	public void setMdlBusContMode(String mdlBusContMode) {
		this.mdlBusContMode = mdlBusContMode;
	}
	
	
	
	public String getFormContcr() {
		return this.formContcr;
	}

	public void setFormContcr(String formContcr) {
		this.formContcr = formContcr;
	}


	public void setFormContcrNm(String formContcrNm) {
		this.formContcrNm = formContcrNm;
	}


	public String getFormContcrNm() {
		return formContcrNm;
	}


	public void setBizMemNm(String bizMemNm) {
		this.bizMemNm = bizMemNm;
	}


	public String getBizMemNm() {
		return bizMemNm;
	}	
}