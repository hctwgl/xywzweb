package com.xywz.sale.model;


import java.io.Serializable;
import javax.persistence.*;

import java.math.BigDecimal;
import java.math.BigInteger;


/**
 * The persistent class for the xywz_sale_label_mgmt database table.
 * 
 */
@Entity
@Table(name="xywz_sale_label_mgmt")
public class XywzSaleLabelMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="LABEL_ID", insertable=false)
	private Long labelId;

	@Column(name="BACK_NOTE")
	private String backNote;

	@Column(name="BUNDLE_NUMBER")
	private BigDecimal bundleNumber;

	@Column(name="COLOUR")
	private String colour;

	@Column(name="HEAT_NUMBER")
	private String heatNumber;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MILLS_NAME")
	private String millsName;

	@Column(name="PCS_BUNDLE")
	private BigDecimal pcsBundle;

	@Column(name="QUALITY")
	private String quality;

	@Column(name="SHIPPINGMARKS")
	private String shippingmarks;

	@Column(name="SIZE")
	private String size;

	@Column(name="THICKNESS")
	private String thickness;
	
	@Column(name="CONTR_NUM")
	private String contrNum;
	
	@Column(name="MODEL")
	private String model;
	
	@Column(name="HS_CODE")
	private String hsCode;
	
	@Column(name="QTY")
	private BigDecimal qty;
	
	@Column(name="SEND_ID")
	private BigInteger sendId;

	@Column(name="SEND_SHEET_ADVS_NUM")
	private String sendSheetAdvsNum;

    public XywzSaleLabelMgmt() {
    }

	public Long getLabelId() {
		return this.labelId;
	}

	public void setLabelId(Long labelId) {
		this.labelId = labelId;
	}

	public String getBackNote() {
		return this.backNote;
	}

	public void setBackNote(String backNote) {
		this.backNote = backNote;
	}

	public BigDecimal getBundleNumber() {
		return this.bundleNumber;
	}

	public void setBundleNumber(BigDecimal bundleNumber) {
		this.bundleNumber = bundleNumber;
	}

	public String getColour() {
		return this.colour;
	}

	public void setColour(String colour) {
		this.colour = colour;
	}

	public String getHeatNumber() {
		return this.heatNumber;
	}

	public void setHeatNumber(String heatNumber) {
		this.heatNumber = heatNumber;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMillsName() {
		return this.millsName;
	}

	public void setMillsName(String millsName) {
		this.millsName = millsName;
	}

	public BigDecimal getPcsBundle() {
		return this.pcsBundle;
	}

	public void setPcsBundle(BigDecimal pcsBundle) {
		this.pcsBundle = pcsBundle;
	}

	public String getQuality() {
		return this.quality;
	}

	public void setQuality(String quality) {
		this.quality = quality;
	}

	public String getShippingmarks() {
		return this.shippingmarks;
	}

	public void setShippingmarks(String shippingmarks) {
		this.shippingmarks = shippingmarks;
	}

	public String getSize() {
		return this.size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getThickness() {
		return this.thickness;
	}

	public void setThickness(String thickness) {
		this.thickness = thickness;
	}
	
	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}
	
	public String getModel() {
		return this.model;
	}

	public void setModel(String model) {
		this.model = model;
	}
	
	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}
	
	public BigDecimal getQty() {
		return this.qty;
	}

	public void setQty(BigDecimal qty) {
		this.qty = qty;
	}
	
	public BigInteger getSendId() {
		return this.sendId;
	}

	public void setSendId(BigInteger sendId) {
		this.sendId = sendId;
	}

	public String getSendSheetAdvsNum() {
		return this.sendSheetAdvsNum;
	}

	public void setSendSheetAdvsNum(String sendSheetAdvsNum) {
		this.sendSheetAdvsNum = sendSheetAdvsNum;
	}

}