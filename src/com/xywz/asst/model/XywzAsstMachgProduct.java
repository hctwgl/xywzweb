package com.xywz.asst.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;


/**
 * The persistent class for the XYWZ_ASST_MACHG_PRODUCT database table.
 * 
 */
@Entity
@Table(name="XYWZ_ASST_MACHG_PRODUCT")
public class XywzAsstMachgProduct implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PROD_ID")
	private Long prodId;

	@Column(name="MACHG_CONTR_NUM")
	private String machgContrNum;
	
	@Column(name="FST_NM")
	private String fstNm;

	@Column(name="SPC_MODEL")
	private String spcModel;
	
	@Column(name="NGTV_POOR")
	private String ngtvPoor;

	@Column(name="PKG")
	private String pkg;

	@Column(name="QTY")
	private BigDecimal qty;

	@Column(name="UPRC")
	private BigDecimal uprc;
	
	@Column(name="LEN")
	private BigDecimal len;

    public XywzAsstMachgProduct() {
    }

	public Long getProdId() {
		return this.prodId;
	}

	public void setProdId(Long prodId) {
		this.prodId = prodId;
	}

	public String getMachgContrNum() {
		return this.machgContrNum;
	}

	public void setMachgContrNum(String machgContrNum) {
		this.machgContrNum = machgContrNum;
	}

	public String getFstNm() {
		return this.fstNm;
	}

	public void setFstNm(String fstNm) {
		this.fstNm = fstNm;
	}

	public String getSpcModel() {
		return this.spcModel;
	}

	public void setSpcModel(String spcModel) {
		this.spcModel = spcModel;
	}

	public String getNgtvPoor() {
		return this.ngtvPoor;
	}

	public void setNgtvPoor(String ngtvPoor) {
		this.ngtvPoor = ngtvPoor;
	}

	public String getPkg() {
		return this.pkg;
	}

	public void setPkg(String pkg) {
		this.pkg = pkg;
	}

	public BigDecimal getQty() {
		return this.qty;
	}

	public void setQty(BigDecimal qty) {
		this.qty = qty;
	}


	public BigDecimal getUprc() {
		return this.uprc;
	}

	public void setUprc(BigDecimal uprc) {
		this.uprc = uprc;
	}
	
	public BigDecimal getLen() {
		return this.len;
	}

	public void setLen(BigDecimal len) {
		this.len = len;
	}
}