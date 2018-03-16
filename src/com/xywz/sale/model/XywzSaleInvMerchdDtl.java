package com.xywz.sale.model;

import java.io.Serializable;
import javax.persistence.*;

import java.math.BigDecimal;
import java.math.BigInteger;


/**
 * The persistent class for the xywz_sale_inv_merchd_dtl database table.
 * 
 */

@Entity
@Table(name="xywz_sale_inv_merchd_dtl")
public class XywzSaleInvMerchdDtl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="MERCHD_ID")
	private Long merchdId;

	@Column(name="AMT")
	private BigDecimal amt;

	@Column(name="BRANCH_NUMBER")
	private BigInteger branchNumber;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="CUR")
	private String cur;

	@Column(name="DEPTH_TOLERANCE")
	private String depthTolerance;

	@Column(name="HS_CODE")
	private String hsCode;

	@Column(name="INLAND_UPRC")
	private BigDecimal inlandUprc;

	@Column(name="INV_NUM")
	private String invNum;

	@Column(name="LEN")
	private BigDecimal len;

	@Column(name="LENGTH_TOLERANCE")
	private String lengthTolerance;

	@Column(name="MATERIALS")
	private String materials;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MODEL")
	private String model;

//	@Column(name="NGTV_POOR")
//	private String ngtvPoor;

	@Column(name="PKG")
	private String pkg;

	@Column(name="QTY")
	private BigDecimal qty;

	@Column(name="UPRC")
	private BigDecimal uprc;
	
	@Column(name="USD_AMT")
	private BigDecimal usdAmt;

	@Column(name="USD_RAT")
	private BigDecimal usdRat;

	@Column(name="WEIGHT_TOLERANCE")
	private String weightTolerance;

    public XywzSaleInvMerchdDtl() {
    }

	public Long getMerchdId() {
		return this.merchdId;
	}

	public void setMerchdId(Long merchdId) {
		this.merchdId = merchdId;
	}

	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public BigInteger getBranchNumber() {
		return this.branchNumber;
	}

	public void setBranchNumber(BigInteger branchNumber) {
		this.branchNumber = branchNumber;
	}

	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}

	public String getCur() {
		return this.cur;
	}

	public void setCur(String cur) {
		this.cur = cur;
	}

	public String getDepthTolerance() {
		return this.depthTolerance;
	}

	public void setDepthTolerance(String depthTolerance) {
		this.depthTolerance = depthTolerance;
	}

	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}

	public BigDecimal getInlandUprc() {
		return this.inlandUprc;
	}

	public void setInlandUprc(BigDecimal inlandUprc) {
		this.inlandUprc = inlandUprc;
	}

	public String getInvNum() {
		return this.invNum;
	}

	public void setInvNum(String invNum) {
		this.invNum = invNum;
	}

	public BigDecimal getLen() {
		return this.len;
	}

	public void setLen(BigDecimal len) {
		this.len = len;
	}

	public String getLengthTolerance() {
		return this.lengthTolerance;
	}

	public void setLengthTolerance(String lengthTolerance) {
		this.lengthTolerance = lengthTolerance;
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

	public String getModel() {
		return this.model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public BigDecimal getUsdAmt() {
		return this.usdAmt;
	}

	public void setUsdAmt(BigDecimal usdAmt) {
		this.usdAmt = usdAmt;
	}

	public BigDecimal getUsdRat() {
		return this.usdRat;
	}

	public void setUsdRat(BigDecimal usdRat) {
		this.usdRat = usdRat;
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

	public String getWeightTolerance() {
		return this.weightTolerance;
	}

	public void setWeightTolerance(String weightTolerance) {
		this.weightTolerance = weightTolerance;
	}

}