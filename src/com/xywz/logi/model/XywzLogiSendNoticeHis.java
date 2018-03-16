package com.xywz.logi.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;


/**
 * The persistent class for the XYWZ_LOGI_SEND_NOTICE database table.
 * 
 */
@Entity
@Table(name="XYWZ_LOGI_SEND_NOTICE_HIS")
public class XywzLogiSendNoticeHis implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="SEND_SHEET_ADVS_ID")
	private Long sendSheetAdvsId;

	@Column(name="ORDR_NUM")
	private String ordrNum;
	
	@Column(name="CUST_ID")
	private Long custId;
	
	@Column(name="CONTR_NUM")
	private String contrNum;
	
	@Column(name="SEND_SHEET_ADVS_NUM")
	private String sendSheetAdvsNum;

	@Column(name="SHIP_NAME")
	private String shipName;

	@Column(name="LOAD_PORT")
	private String loadPort;

	@Column(name="UNLOAD_PORT")
	private String unloadPort;
    
	@Temporal( TemporalType.DATE)
	@Column(name="EXPCT_TO_PORT_DAY")
	private Date expctToPortDay;
	
	@Temporal( TemporalType.DATE)
	@Column(name="SEND_DT")
	private Date sendDt;
	
	@Temporal( TemporalType.DATE)
	@Column(name="CANCEL_SEND_DT")
	private Date cancelSendDt;

	@Column(name="SHIP_AGENT")
	private String shipAgent;

	@Column(name="SHIP_AGENT_CONTCR")
	private String shipAgentContcr;

	@Column(name="GDS_AGENT")
	private String gdsAgent;

	@Column(name="GDS_AGENT_CONTCR")
	private String gdsAgentContcr;

	@Column(name="MAK_DOC_PERS_ID")
	private String makDocPersId;

	@Column(name="MAK_DOC_PERS_NM")
	private String makDocPersNm;

	@Column(name="LAST_GDS_SITU")
	private String lastGdsSitu;

	@Column(name="QTY_POOR")
	private String qtyPoor;

	@Column(name="WEIGHT_NGTV_POOR")
	private String weightNgtvPoor;

	@Column(name="IPE_DESC")
	private String ipeDesc;

	@Column(name="UPN_DESC")
	private String upnDesc;

	@Column(name="DELV_ADDR")
	private String delvAddr;

	@Column(name="DELV_PERS")
	private String delvPers;

	@Column(name="DELV_PERS_TEL")
	private String delvPersTel;

	@Column(name="MK_TAB_PERS_ID")
	private String mkTabPersId;

	@Column(name="MK_TAB_PERS_NM")
	private String mkTabPersNm;
	
	@Column(name="LAST_MODIFY_TIME")
	private String lastModifyTime;
	
	@Column(name="CONFIRM_SEND")
	private String confirmSend;
    
	@Temporal( TemporalType.DATE)
	@Column(name="MK_TAB_DT")
	private Date mkTabDt;
	
	@Column(name="SEND_GOODS_NOTICE")
	private String sendGoodsNotice;
	
	public String getSendGoodsNotice(){
	return this.sendGoodsNotice;
	}

	public void setSendGoodsNotice(String sendGoodsNotice){
	this.sendGoodsNotice = sendGoodsNotice;
	}

	public Long getSendSheetAdvsId(){
	return this.sendSheetAdvsId;
	}

	public void setSendSheetAdvsId(Long sendSheetAdvsId){
	this.sendSheetAdvsId = sendSheetAdvsId;
	}
	
	public Long getCustId(){
	return this.custId;
	}

	public void setCustId(Long custId){
	this.custId = custId;
	}
	
	public String getConfirmSend(){
	return this.confirmSend;
	}

	public void setConfirmSend(String confirmSend){
	this.confirmSend = confirmSend;
	}
	
	public String getLastModifyTime(){
	return this.lastModifyTime;
	}

	public void setLastModifyTime(String lastModifyTime){
	this.lastModifyTime = lastModifyTime;
	}

	public String getOrdrNum(){
	return this.ordrNum;
	}

	public void setOrdrNum(String ordrNum){
	this.ordrNum = ordrNum;
	}
	
	public String getContrNum(){
	return this.contrNum;
	}
	
	public void setContrNum(String contrNum){
	this.contrNum = contrNum;
	}
	
	public String getSendSheetAdvsNum(){
	return this.sendSheetAdvsNum;
	}
		
	public void setSendSheetAdvsNum(String sendSheetAdvsNum){
	this.sendSheetAdvsNum = sendSheetAdvsNum;
	}
	
	public String getShipName(){
	return this.shipName;
	}

	public void setShipName(String shipName){
	this.shipName = shipName;
	}

	public String getLoadPort(){
	return this.loadPort;
	}

	public void setLoadPort(String loadPort){
	this.loadPort = loadPort;
	}

	public String getUnloadPort(){
	return this.unloadPort;
	}

	public void setUnloadPort(String unloadPort){
	this.unloadPort = unloadPort;
	}

	public Date getExpctToPortDay(){
	return this.expctToPortDay;
	}

	public void setExpctToPortDay(Date expctToPortDay){
	this.expctToPortDay = expctToPortDay;
	}
	
	public Date getSendDt(){
	return this.sendDt;
	}

	public void setSendDt(Date sendDt){
	this.sendDt = sendDt;
	}

	public Date getCancelSendDt(){
	return this.cancelSendDt;
	}

	public void setCancelSendDt(Date cancelSendDt){
	this.cancelSendDt = cancelSendDt;
	}
	
	public String getShipAgent(){
	return this.shipAgent;
	}

	public void setShipAgent(String shipAgent){
	this.shipAgent = shipAgent;
	}

	public String getShipAgentContcr(){
	return this.shipAgentContcr;
	}

	public void setShipAgentContcr(String shipAgentContcr){
	this.shipAgentContcr = shipAgentContcr;
	}

	public String getGdsAgent(){
	return this.gdsAgent;
	}

	public void setGdsAgent(String gdsAgent){
	this.gdsAgent = gdsAgent;
	}

	public String getGdsAgentContcr(){
	return this.gdsAgentContcr;
	}

	public void setGdsAgentContcr(String gdsAgentContcr){
	this.gdsAgentContcr = gdsAgentContcr;
	}

	public String getMakDocPersId(){
	return this.makDocPersId;
	}

	public void setMakDocPersId(String makDocPersId){
	this.makDocPersId = makDocPersId;
	}

	public String getMakDocPersNm(){
	return this.makDocPersNm;
	}

	public void setMakDocPersNm(String makDocPersNm){
	this.makDocPersNm = makDocPersNm;
	}

	public String getLastGdsSitu(){
	return this.lastGdsSitu;
	}

	public void setLastGdsSitu(String lastGdsSitu){
	this.lastGdsSitu = lastGdsSitu;
	}

	public String getQtyPoor(){
	return this.qtyPoor;
	}

	public void setQtyPoor(String qtyPoor){
	this.qtyPoor = qtyPoor;
	}

	public String getWeightNgtvPoor(){
	return this.weightNgtvPoor;
	}

	public void setWeightNgtvPoor(String weightNgtvPoor){
	this.weightNgtvPoor = weightNgtvPoor;
	}

	public String getIpeDesc(){
	return this.ipeDesc;
	}

	public void setIpeDesc(String ipeDesc){
	this.ipeDesc = ipeDesc;
	}

	public String getUpnDesc(){
	return this.upnDesc;
	}

	public void setUpnDesc(String upnDesc){
	this.upnDesc = upnDesc;
	}

	public String getDelvAddr(){
	return this.delvAddr;
	}

	public void setDelvAddr(String delvAddr){
	this.delvAddr = delvAddr;
	}

	public String getDelvPers(){
	return this.delvPers;
	}

	public void setDelvPers(String delvPers){
	this.delvPers = delvPers;
	}

	public String getDelvPersTel(){
	return this.delvPersTel;
	}

	public void setDelvPersTel(String delvPersTel){
	this.delvPersTel = delvPersTel;
	}

	public String getMkTabPersId(){
	return this.mkTabPersId;
	}

	public void setMkTabPersId(String mkTabPersId){
	this.mkTabPersId = mkTabPersId;
	}

	public String getMkTabPersNm(){
	return this.mkTabPersNm;
	}

	public void setMkTabPersNm(String mkTabPersNm){
	this.mkTabPersNm = mkTabPersNm;
	}

	public Date getMkTabDt(){
	return this.mkTabDt;
	}

	public void setMkTabDt(Date mkTabDt){
	this.mkTabDt = mkTabDt;
	}

    public XywzLogiSendNoticeHis() {
    }	
}