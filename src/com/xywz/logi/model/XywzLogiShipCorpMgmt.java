package com.xywz.logi.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;


/**
 * The persistent class for the xywz_para_bank database table.
 * 
 */
@Entity
@Table(name="XYWZ_LOGI_SHIP_CORP_MGMT")
public class XywzLogiShipCorpMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="SHIP_CORP_ID")
	private Long shipCorpId;

	@Column(name="CORP_NM")
	private String corpNm;

	@Column(name="ADDR")
	private String addr;

	@Column(name="CONTCR")
	private String contcr;

	@Column(name="CONT_TEL1")
	private String contTel1;

	@Column(name="CONT_TEL2")
	private String contTel2;

	@Column(name="MOBL_NUM1")
	private String moblNum1;

	@Column(name="MOBL_NUM2")
	private String moblNum2;

	@Temporal( TemporalType.DATE)
	@Column(name="SETUP_CO_REL_DT")
	private Date setupCoRelDt;

	@Column(name="MEMO")
	private String memo;

	public Long getShipCorpId(){
	return this.shipCorpId;
	}

	public void setShipCorpId(Long shipCorpId){
	this.shipCorpId = shipCorpId;
	}

	public String getCorpNm(){
	return this.corpNm;
	}

	public void setCorpNm(String corpNm){
	this.corpNm = corpNm;
	}

	public String getAddr(){
	return this.addr;
	}

	public void setAddr(String addr){
	this.addr = addr;
	}

	public String getContcr(){
	return this.contcr;
	}

	public void setContcr(String contcr){
	this.contcr = contcr;
	}

	public String getContTel1(){
	return this.contTel1;
	}

	public void setContTel1(String contTel1){
	this.contTel1 = contTel1;
	}

	public String getContTel2(){
	return this.contTel2;
	}

	public void setContTel2(String contTel2){
	this.contTel2 = contTel2;
	}

	public String getMoblNum1(){
	return this.moblNum1;
	}

	public void setMoblNum1(String moblNum1){
	this.moblNum1 = moblNum1;
	}

	public String getMoblNum2(){
	return this.moblNum2;
	}

	public void setMoblNum2(String moblNum2){
	this.moblNum2 = moblNum2;
	}

	public Date getSetupCoRelDt(){
	return this.setupCoRelDt;
	}

	public void setSetupCoRelDt(Date setupCoRelDt){
	this.setupCoRelDt = setupCoRelDt;
	}

	public String getMemo(){
	return this.memo;
	}

	public void setMemo(String memo){
	this.memo = memo;
	}
	
    public XywzLogiShipCorpMgmt() {
    }
}