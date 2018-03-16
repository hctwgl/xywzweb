package com.xywz.logi.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.*;


/**
 * The persistent class for the xywz_para_bank database table.
 * 
 */
@Entity
@Table(name="XYWZ_LOGI_DELV_MERCHD_HIS")
public class XywzLogiDelvMerchdHis implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	
	@Column(name="OUT_ID")
	private String outId;

	@Column(name="GDS_SRC")
	private String gdsSrc;

	@Column(name="HS_CODE")
	private String hsCode;

	@Column(name="MATERIALS")
	private String materials;

	@Column(name="PKG")
	private String pkg;

	@Column(name="QTY")
	private BigDecimal qty;
	
	@Column(name="GDS_LENGTH")
	private BigDecimal gdsLength;

	@Column(name="MODIFY_DT")
	private String modifyDt;
	
	@Column(name="SEND_SHEET_ADVS_NUM")
	private String sendSheetAdvsNum;

	@Column(name="SPC_MODEL")
	private String spcModel;
	
	@Column(name="WEIGHT")
	private BigDecimal weight;
	
	@Column(name="REM_ZHI_CNT")
	private BigDecimal remZhiCnt;
	
	@Column(name="CUST_ID")
	private String custId;
	
	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="ZHI_CNT")
	private BigDecimal zhiCnt;
	
	@Column(name="NGTV_POOR")
	private String ngtvPoor;
	
	@Column(name="LEN")
	private BigDecimal len;
	
	@Column(name="LL_WEIGHT")
	private BigDecimal llWeight;
	
	@Column(name="CONFIRM_SEND")
	private String confirmSend;
	
	@Column(name="INSUPD_MOD")
	private String insupdMod;
	
	@Temporal( TemporalType.DATE)
	@Column(name="INSERT_DT")
	private Date insertDt;
		
    public XywzLogiDelvMerchdHis() {
    }
    
    public Date getInsertDt(){
    	return this.insertDt;
    }
    
    public void setInsertDt(Date insertDt){
    	this.insertDt = insertDt;
    }
    
    public BigDecimal getWeight() {
		return this.weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}
	
	public String getModifyDt() {
		return this.modifyDt;
	}

	public void setModifyDt(String modifyDt) {
		this.modifyDt = modifyDt;
	}
	
	public String getInsupdMod() {
		return this.insupdMod;
	}

	public void setInsupdMod(String insupdMod) {
		this.insupdMod = insupdMod;
	}
	
	public String getConfirmSend() {
		return this.confirmSend;
	}

	public void setConfirmSend(String confirmSend) {
		this.confirmSend = confirmSend;
	}
	
	public BigDecimal getLen() {
		return this.len;
	}

	public void setLen(BigDecimal len) {
		this.len = len;
	}
	
	public BigDecimal getLlWeight() {
		return this.llWeight;
	}

	public void setLlWeight(BigDecimal llWeight) {
		this.llWeight = llWeight;
	}
	
	public BigDecimal getRemZhiCnt() {
		return this.remZhiCnt;
	}

	public void setRemZhiCnt(BigDecimal remZhiCnt) {
		this.remZhiCnt = remZhiCnt;
	}
	
	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}
	
	public String getNgtvPoor() {
		return this.ngtvPoor;
	}

	public void setNgtvPoor(String ngtvPoor) {
		this.ngtvPoor = ngtvPoor;
	}
	
	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}
	
	public BigDecimal getZhiCnt() {
			return this.zhiCnt;
		}

	public void setZhiCnt(BigDecimal zhiCnt) {
		this.zhiCnt = zhiCnt;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getOutId() {
		return this.outId;
	}

	public void setOutId(String outId) {
		this.outId = outId;
	}

	public String getGdsSrc() {
		return this.gdsSrc;
	}

	public void setGdsSrc(String gdsSrc) {
		this.gdsSrc = gdsSrc;
	}

	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}

	public String getMaterials() {
		return this.materials;
	}

	public void setMaterials(String materials) {
		this.materials = materials;
	}
	
	public String getPkg() {
		return this.pkg;
	}

	public void setPkg(String pkg) {
		this.pkg = pkg;
	}

	public BigDecimal getGdsLength() {
		return this.gdsLength;
	}

	public void setGdsLength(BigDecimal gdsLength) {
		this.gdsLength = gdsLength;
	}

	public BigDecimal getQty() {
		return this.qty;
	}

	public void setQty(BigDecimal qty) {
		this.qty = qty;
	}

	public String getSendSheetAdvsNum() {
		return this.sendSheetAdvsNum;
	}

	public void setSendSheetAdvsNum(String sendSheetAdvsNum) {
		this.sendSheetAdvsNum = sendSheetAdvsNum;
	}

	public String getSpcModel() {
		return this.spcModel;
	}

	public void setSpcModel(String spcModel) {
		this.spcModel = spcModel;
	}
}