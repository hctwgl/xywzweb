package com.xywz.logi.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;


/**
 * The persistent class for the xywz_para_bank database table.
 * 
 */
@Entity
@Table(name="XYWZ_LOGI_CFM_SNGL")
public class XywzLogiCfmSngl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="OUT_TRAN_ID")
	private Long outTranId;

	@Column(name="REACH_SNGL_ID")
	private String reachSnglId;

	@Column(name="OUT_TRAN_NUM")
	private String outTranNum;

	@Column(name="SELL_CONTR_NUM")
	private String sellContrNum;

	@Column(name="CUR")
	private String cur;

	@Column(name="GDS_SEND_CORP")
	private String gdsSendCorp;

	@Column(name="GDS_AGENT_CONTCR")
	private String gdsAgentContcr;

	@Column(name="GDS_AGENT_CONT_TEL")
	private String gdsAgentContTel;

	@Temporal( TemporalType.DATE)
	@Column(name="BEGIN_DT")
	private Date beginDt;

	@Column(name="BEGIN_TM")
	private String beginTm;
    
	@Temporal( TemporalType.DATE)
	@Column(name="END_DT")
	private Date enddt;

	@Column(name="END_TM")
	private String endTm;

	@Temporal( TemporalType.DATE)
	@Column(name="STOP_SNGL_DT")
	private Date stopSnglDt;

	@Column(name="SHIP_CORP")
	private String shipCorp;

	@Column(name="SHIP_CORP_TEL")
	private String shipCorpTel;

	@Column(name="SHIP_CORP_FAX")
	private String shipCorpFax;

	@Column(name="SHIP_CORP_CONTCR")
	private String shipCorpContcr;

	@Column(name="SHIP_NAME")
	private String shipName;

	@Column(name="SHIP_ORDER")
	private String shipOrder;
    
	@Temporal( TemporalType.DATE)
	@Column(name="LOAD_SHIP_DT")
	private Date loadShipDt;

	@Column(name="ETD")
	private String etd;

	@Column(name="ETA")
	private String eta;

	@Column(name="CHARGE_COST_PAY_MODE")
	private String chargeCostPayMode;

	@Column(name="COLL_GDS_SITE")
	private String collGdsSite;

	@Column(name="LOAD_TRAFF_PORT")
	private String loadTraffPort;

	@Column(name="AIM_PORT")
	private String aimPort;

	@Column(name="UNLOAD_GDS_PORT")
	private String unloadGdsPort;

	@Column(name="SHEET_SNGL_NUM")
	private String sheetSnglNum;
    
	@Column(name="PRD_DT")
	private String prdDt;

	@Column(name="DLVY_FORM")
	private String dlvyForm;

	@Column(name="LOAD_BILL_NUM_SHR")
	private String loadBillNumShr;
	
	@Temporal( TemporalType.DATE)
	@Column(name="LOAD_BILL_ISSU_DAY")
	private Date loadBillIssuDay;
    
	@Temporal( TemporalType.DATE)
	@Column(name="LOAD_BILL_RECV_DAY")
	private Date loadBillRecvDay;
	
	@Temporal( TemporalType.DATE)
	@Column(name="LAST_REACH_DT")
	private Date lastReachDt;

	@Column(name="LC_ID")
	private String lcId;

	@Column(name="MK_BOX_MODE")
	private String mkBoxMode;

	@Column(name="GDS_DESC")
	private String gdsDesc;

	@Column(name="MEMO")
	private String memo;

	@Column(name="CHK_STAT")
	private String chkStat;

	public Long getOutTranId(){
	return this.outTranId;
	}

	public void setOutTranId(Long outTranId){
	this.outTranId = outTranId;
	}

	public String getReachSnglId(){
	return this.reachSnglId;
	}

	public void setReachSnglId(String reachSnglId){
	this.reachSnglId = reachSnglId;
	}

	public String getOutTranNum(){
	return this.outTranNum;
	}

	public void setOutTranNum(String outTranNum){
	this.outTranNum = outTranNum;
	}

	public String getSellContrNum(){
	return this.sellContrNum;
	}

	public void setSellContrNum(String sellContrNum){
	this.sellContrNum = sellContrNum;
	}

	public String getCur(){
	return this.cur;
	}

	public void setCur(String cur){
	this.cur = cur;
	}

	public String getGdsSendCorp(){
	return this.gdsSendCorp;
	}

	public void setGdsSendCorp(String gdsSendCorp){
	this.gdsSendCorp = gdsSendCorp;
	}

	public String getGdsAgentContcr(){
	return this.gdsAgentContcr;
	}

	public void setGdsAgentContcr(String gdsAgentContcr){
	this.gdsAgentContcr = gdsAgentContcr;
	}

	public String getGdsAgentContTel(){
	return this.gdsAgentContTel;
	}

	public void setGdsAgentContTel(String gdsAgentContTel){
	this.gdsAgentContTel = gdsAgentContTel;
	}

	public Date getBeginDt(){
	return this.beginDt;
	}

	public void setBeginDt(Date beginDt){
	this.beginDt = beginDt;
	}

	public String getBeginTm(){
	return this.beginTm;
	}

	public void setBeginTm(String beginTm){
	this.beginTm = beginTm;
	}

	public Date getEnddt(){
	return this.enddt;
	}

	public void setEnddt(Date enddt){
	this.enddt = enddt;
	}

	public String getEndTm(){
	return this.endTm;
	}

	public void setEndTm(String endTm){
	this.endTm = endTm;
	}

	public Date getStopSnglDt(){
	return this.stopSnglDt;
	}

	public void setStopSnglDt(Date stopSnglDt){
	this.stopSnglDt = stopSnglDt;
	}

	public String getShipCorp(){
	return this.shipCorp;
	}

	public void setShipCorp(String shipCorp){
	this.shipCorp = shipCorp;
	}

	public String getShipCorpTel(){
	return this.shipCorpTel;
	}

	public void setShipCorpTel(String shipCorpTel){
	this.shipCorpTel = shipCorpTel;
	}

	public String getShipCorpFax(){
	return this.shipCorpFax;
	}

	public void setShipCorpFax(String shipCorpFax){
	this.shipCorpFax = shipCorpFax;
	}

	public String getShipCorpContcr(){
	return this.shipCorpContcr;
	}

	public void setShipCorpContcr(String shipCorpContcr){
	this.shipCorpContcr = shipCorpContcr;
	}

	public String getShipName(){
	return this.shipName;
	}

	public void setShipName(String shipName){
	this.shipName = shipName;
	}

	public String getShipOrder(){
	return this.shipOrder;
	}

	public void setShipOrder(String shipOrder){
	this.shipOrder = shipOrder;
	}

	public Date getLoadShipDt(){
	return this.loadShipDt;
	}

	public void setLoadShipDt(Date loadShipDt){
	this.loadShipDt = loadShipDt;
	}

	public String getEtd(){
	return this.etd;
	}

	public void setEtd(String etd){
	this.etd = etd;
	}

	public String getEta(){
	return this.eta;
	}

	public void setEta(String eta){
	this.eta = eta;
	}

	public String getChargeCostPayMode(){
	return this.chargeCostPayMode;
	}

	public void setChargeCostPayMode(String chargeCostPayMode){
	this.chargeCostPayMode = chargeCostPayMode;
	}

	public String getCollGdsSite(){
	return this.collGdsSite;
	}

	public void setCollGdsSite(String collGdsSite){
	this.collGdsSite = collGdsSite;
	}

	public String getLoadTraffPort(){
	return this.loadTraffPort;
	}

	public void setLoadTraffPort(String loadTraffPort){
	this.loadTraffPort = loadTraffPort;
	}

	public String getAimPort(){
	return this.aimPort;
	}

	public void setAimPort(String aimPort){
	this.aimPort = aimPort;
	}

	public String getUnloadGdsPort(){
	return this.unloadGdsPort;
	}

	public void setUnloadGdsPort(String unloadGdsPort){
	this.unloadGdsPort = unloadGdsPort;
	}

	public String getSheetSnglNum(){
	return this.sheetSnglNum;
	}

	public void setSheetSnglNum(String sheetSnglNum){
	this.sheetSnglNum = sheetSnglNum;
	}

	public String getPrdDt(){
	return this.prdDt;
	}

	public void setPrdDt(String prdDt){
	this.prdDt = prdDt;
	}

	public String getDlvyForm(){
	return this.dlvyForm;
	}

	public void setDlvyForm(String dlvyForm){
	this.dlvyForm = dlvyForm;
	}

	public String getLoadBillNumShr(){
	return this.loadBillNumShr;
	}

	public void setLoadBillNumShr(String loadBillNumShr){
	this.loadBillNumShr = loadBillNumShr;
	}

	public Date getLoadBillIssuDay(){
	return this.loadBillIssuDay;
	}

	public void setLoadBillIssuDay(Date loadBillIssuDay){
	this.loadBillIssuDay = loadBillIssuDay;
	}

	public Date getLoadBillRecvDay(){
	return this.loadBillRecvDay;
	}

	public void setLoadBillRecvDay(Date loadBillRecvDay){
	this.loadBillRecvDay = loadBillRecvDay;
	}

	public Date getLastReachDt(){
	return this.lastReachDt;
	}

	public void setLastReachDt(Date lastReachDt){
	this.lastReachDt = lastReachDt;
	}

	public String getLcId(){
	return this.lcId;
	}

	public void setLcId(String lcId){
	this.lcId = lcId;
	}

	public String getMkBoxMode(){
	return this.mkBoxMode;
	}

	public void setMkBoxMode(String mkBoxMode){
	this.mkBoxMode = mkBoxMode;
	}

	public String getGdsDesc(){
	return this.gdsDesc;
	}

	public void setGdsDesc(String gdsDesc){
	this.gdsDesc = gdsDesc;
	}

	public String getMemo(){
	return this.memo;
	}

	public void setMemo(String memo){
	this.memo = memo;
	}

	public String getChkStat(){
	return this.chkStat;
	}

	public void setChkStat(String chkStat){
	this.chkStat = chkStat;
	}
	
	public XywzLogiCfmSngl() {
    }
}