package com.xywz.sale.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the xywz_sale_frgn_merchd_list database table.
 * 
 */
@Entity
@Table(name="xywz_sale_frgn_merchd_list")
public class XywzSaleFrgnMerchdList implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="MERCHD_ID_ID")
	private Long merchdIdId;

	@Column(name="CUR")
	private String cur;

	@Column(name="HS_CODE")
	private String hsCode;

	@Column(name="LVL")
	private String lvl;

	@Column(name="MEASR_CORP")
	private String measrCorp;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MERCHD_ID")
	private String merchdId;

	@Column(name="MODEL")
	private String model;

	@Column(name="QTY")
	private BigDecimal qty;

	@Column(name="QUOTN_SNGL_ID")
	private String quotnSnglId;

	@Column(name="UPRC")
	private BigDecimal uprc;

    public XywzSaleFrgnMerchdList() {
    }

	public Long getMerchdIdId() {
		return this.merchdIdId;
	}

	public void setMerchdIdId(Long merchdIdId) {
		this.merchdIdId = merchdIdId;
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

	public String getLvl() {
		return this.lvl;
	}

	public void setLvl(String lvl) {
		this.lvl = lvl;
	}

	public String getMeasrCorp() {
		return this.measrCorp;
	}

	public void setMeasrCorp(String measrCorp) {
		this.measrCorp = measrCorp;
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

	public String getModel() {
		return this.model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public BigDecimal getQty() {
		return this.qty;
	}

	public void setQty(BigDecimal qty) {
		this.qty = qty;
	}

	public String getQuotnSnglId() {
		return this.quotnSnglId;
	}

	public void setQuotnSnglId(String quotnSnglId) {
		this.quotnSnglId = quotnSnglId;
	}

	public BigDecimal getUprc() {
		return this.uprc;
	}

	public void setUprc(BigDecimal uprc) {
		this.uprc = uprc;
	}

}