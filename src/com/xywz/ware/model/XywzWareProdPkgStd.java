package com.xywz.ware.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;


/**
 * The persistent class for the xywz_ware_prod_pkg_std database table.
 * 
 */
@Entity
@Table(name="xywz_ware_prod_pkg_std")
public class XywzWareProdPkgStd implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PKG_STD_ID")
	private Long pkgStdId;

	@Column(name="PRD_NAME")
	private String prdName;

	@Column(name="SIZING")
	private BigDecimal sizing;

	@Column(name="SPC")
	private String spc;

	@Column(name="THEORY_WEIGHT")
	private BigDecimal theoryWeight;

	@Column(name="WARN_HI_CNT")
	private BigDecimal warnHiCnt;

	@Column(name="WARN_LO_CNT")
	private BigDecimal warnLoCnt;

	@Column(name="ZHI_PER_JIAN")
	private BigDecimal zhiPerJian;

    public XywzWareProdPkgStd() {
    }

	public Long getPkgStdId() {
		return this.pkgStdId;
	}

	public void setPkgStdId(Long pkgStdId) {
		this.pkgStdId = pkgStdId;
	}

	public String getPrdName() {
		return this.prdName;
	}

	public void setPrdName(String prdName) {
		this.prdName = prdName;
	}

	public BigDecimal getSizing() {
		return this.sizing;
	}

	public void setSizing(BigDecimal sizing) {
		this.sizing = sizing;
	}

	public String getSpc() {
		return this.spc;
	}

	public void setSpc(String spc) {
		this.spc = spc;
	}

	public BigDecimal getTheoryWeight() {
		return this.theoryWeight;
	}

	public void setTheoryWeight(BigDecimal theoryWeight) {
		this.theoryWeight = theoryWeight;
	}

	public BigDecimal getWarnHiCnt() {
		return this.warnHiCnt;
	}

	public void setWarnHiCnt(BigDecimal warnHiCnt) {
		this.warnHiCnt = warnHiCnt;
	}

	public BigDecimal getWarnLoCnt() {
		return this.warnLoCnt;
	}

	public void setWarnLoCnt(BigDecimal warnLoCnt) {
		this.warnLoCnt = warnLoCnt;
	}

	public BigDecimal getZhiPerJian() {
		return this.zhiPerJian;
	}

	public void setZhiPerJian(BigDecimal zhiPerJian) {
		this.zhiPerJian = zhiPerJian;
	}

}