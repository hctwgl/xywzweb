package com.xywz.sysm.model;


import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the xywz_sysm_product_detail database table.
 * 
 */
@Entity
@Table(name="XYWZ_SYSM_PRODUCT_PKG")
public class XywzSysmProductPkg implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PKG_ID")
	private Long pkgId;

	@Column(name="HS_CODE")
	private String hsCode;

	@Column(name="SIZE")
	private String size;
	
	@Column(name="ZHI_CNT")
	private BigDecimal zhiCnt;
	
	@Column(name="LEN")
	private BigDecimal len;

    public XywzSysmProductPkg() {
    }

	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}
	
	public String getSize() {
		return this.size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public void setPkgId(Long pkgId) {
		this.pkgId = pkgId;
	}

	public Long getPkgId() {
		return pkgId;
	}

	public void setZhiCnt(BigDecimal zhiCnt) {
		this.zhiCnt = zhiCnt;
	}

	public BigDecimal getZhiCnt() {
		return zhiCnt;
	}

	public void setLen(BigDecimal len) {
		this.len = len;
	}

	public BigDecimal getLen() {
		return len;
	}

}