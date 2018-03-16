package com.xywz.sale.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the xywz_sale_inland_merchd_dtl database table.
 * 
 */
@Entity
@Table(name="xywz_sale_inland_merchd_dtl")
public class XywzSaleInlandMerchdDtl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="INLAND_MERCHANDISE_ID")
	private Long inlandMerchandiseId;

	@Column(name="AMT")
	private BigDecimal amt;

	@Column(name="COST_PLUS_FREIGHT")
	private BigDecimal costPlusFreight;

	@Column(name="CUR")
	private String cur;

	@Column(name="HS_CODE")
	private String hsCode;

	@Column(name="INLAND_ORDR_NUM")
	private String inlandOrdrNum;

	@Column(name="LEN")
	private BigDecimal len;

	@Column(name="MATERIALS")
	private String materials;

	@Column(name="MEMO")
	private String memo;

	@Column(name="NGTV_POOR")
	private String ngtvPoor;

	@Column(name="PKG")
	private String pkg;

	@Column(name="QTY")
	private BigDecimal qty;

	@Column(name="SPC_MODEL")
	private String spcModel;

	@Column(name="TOLERANCE")
	private String tolerance;

	@Column(name="UPRC")
	private BigDecimal uprc;

    public XywzSaleInlandMerchdDtl() {
    }

	public Long getInlandMerchandiseId() {
		return this.inlandMerchandiseId;
	}

	public void setInlandMerchandiseId(Long inlandMerchandiseId) {
		this.inlandMerchandiseId = inlandMerchandiseId;
	}

	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public BigDecimal getCostPlusFreight() {
		return this.costPlusFreight;
	}

	public void setCostPlusFreight(BigDecimal costPlusFreight) {
		this.costPlusFreight = costPlusFreight;
	}

	public String getCur() {
		return this.cur;
	}

	public void setCur(String cur) {
		this.cur = cur;
	}

	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}

	public String getInlandOrdrNum() {
		return this.inlandOrdrNum;
	}

	public void setInlandOrdrNum(String inlandOrdrNum) {
		this.inlandOrdrNum = inlandOrdrNum;
	}

	public BigDecimal getLen() {
		return this.len;
	}

	public void setLen(BigDecimal len) {
		this.len = len;
	}

	public String getMaterials() {
		return this.materials;
	}

	public void setMaterials(String materials) {
		this.materials = materials;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
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

	public String getSpcModel() {
		return this.spcModel;
	}

	public void setSpcModel(String spcModel) {
		this.spcModel = spcModel;
	}

	public String getTolerance() {
		return this.tolerance;
	}

	public void setTolerance(String tolerance) {
		this.tolerance = tolerance;
	}

	public BigDecimal getUprc() {
		return this.uprc;
	}

	public void setUprc(BigDecimal uprc) {
		this.uprc = uprc;
	}

}