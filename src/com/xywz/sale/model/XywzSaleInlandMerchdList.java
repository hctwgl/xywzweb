package com.xywz.sale.model;

import java.io.Serializable;
import javax.persistence.*;

import java.math.BigDecimal;


/**
 * The persistent class for the xywz_sale_inland_merchd_list database table.
 * 
 */
@Entity
@Table(name="xywz_sale_inland_merchd_list")
public class XywzSaleInlandMerchdList implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="MERCHD_ID_ID")
	private Long merchdIdId;

	@Column(name="HS_CODE")
	private String hsCode;

	@Column(name="MERCHD_ID")
	private String merchdId;
	
	@Column(name="MEMO")
	private String memo;

	@Column(name="PHY_WEIGHT")
	private BigDecimal phyWeight;

	@Column(name="PRC")
	private BigDecimal prc;

	@Column(name="QUOTN_SNGL_ID")
	private String quotnSnglId;

	@Column(name="SPC_MODEL")
	private String spcModel;

	@Column(name="WAIST_DEPTH")
	private BigDecimal waistDepth;

    public XywzSaleInlandMerchdList() {
    }

	public Long getMerchdIdId() {
		return this.merchdIdId;
	}

	public void setMerchdIdId(Long merchdIdId) {
		this.merchdIdId = merchdIdId;
	}

	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	
	
	public String getMerchdId() {
		return this.merchdId;
	}

	public void setMerchdId(String merchdId) {
		this.merchdId = merchdId;
	}
	public BigDecimal getPhyWeight() {
		return this.phyWeight;
	}

	public void setPhyWeight(BigDecimal phyWeight) {
		this.phyWeight = phyWeight;
	}

	public BigDecimal getPrc() {
		return this.prc;
	}

	public void setPrc(BigDecimal prc) {
		this.prc = prc;
	}

	public String getQuotnSnglId() {
		return this.quotnSnglId;
	}

	public void setQuotnSnglId(String quotnSnglId) {
		this.quotnSnglId = quotnSnglId;
	}

	public String getSpcModel() {
		return this.spcModel;
	}

	public void setSpcModel(String spcModel) {
		this.spcModel = spcModel;
	}

	public BigDecimal getWaistDepth() {
		return this.waistDepth;
	}

	public void setWaistDepth(BigDecimal waistDepth) {
		this.waistDepth = waistDepth;
	}

}