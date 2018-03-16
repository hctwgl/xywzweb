package com.xywz.plan.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_plan_job_advs_sngl database table.
 * 
 */
@Entity
@Table(name="xywz_plan_job_advs_sngl")
public class XywzPlanJobAdvsSngl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="WKSP_ADVS_ID")
	private Long wkspAdvsId;

	@Column(name="CMPLT_STAT")
	private String cmpltStat;

	@Column(name="COMNT")
	private String comnt;

	@Column(name="EACH_CNT")
	private BigDecimal eachCnt;

	@Column(name="FIXED_LENGTH")
	private BigDecimal fixedLength;

	@Column(name="MATERIALS")
	private String materials;

	@Column(name="MDFR")
	private String mdfr;

    @Temporal( TemporalType.DATE)
	@Column(name="MODI_DT")
	private Date modiDt;

	@Column(name="NGTV_POOR")
	private String ngtvPoor;

    @Temporal( TemporalType.DATE)
	@Column(name="PLAN_DT")
	private Date planDt;

	@Column(name="PROD_SPC")
	private String prodSpc;

	@Column(name="TOTL_CNT")
	private BigDecimal totlCnt;

	@Column(name="TOTL_WEIGHT")
	private BigDecimal totlWeight;

	@Column(name="WKSP_NUM")
	private String wkspNum;

    public XywzPlanJobAdvsSngl() {
    }

	public Long getWkspAdvsId() {
		return this.wkspAdvsId;
	}

	public void setWkspAdvsId(Long wkspAdvsId) {
		this.wkspAdvsId = wkspAdvsId;
	}

	public String getCmpltStat() {
		return this.cmpltStat;
	}

	public void setCmpltStat(String cmpltStat) {
		this.cmpltStat = cmpltStat;
	}

	public String getComnt() {
		return this.comnt;
	}

	public void setComnt(String comnt) {
		this.comnt = comnt;
	}

	public BigDecimal getEachCnt() {
		return this.eachCnt;
	}

	public void setEachCnt(BigDecimal eachCnt) {
		this.eachCnt = eachCnt;
	}

	public BigDecimal getFixedLength() {
		return this.fixedLength;
	}

	public void setFixedLength(BigDecimal fixedLength) {
		this.fixedLength = fixedLength;
	}

	public String getMaterials() {
		return this.materials;
	}

	public void setMaterials(String materials) {
		this.materials = materials;
	}

	public String getMdfr() {
		return this.mdfr;
	}

	public void setMdfr(String mdfr) {
		this.mdfr = mdfr;
	}

	public Date getModiDt() {
		return this.modiDt;
	}

	public void setModiDt(Date modiDt) {
		this.modiDt = modiDt;
	}

	public String getNgtvPoor() {
		return this.ngtvPoor;
	}

	public void setNgtvPoor(String ngtvPoor) {
		this.ngtvPoor = ngtvPoor;
	}

	public Date getPlanDt() {
		return this.planDt;
	}

	public void setPlanDt(Date planDt) {
		this.planDt = planDt;
	}

	public String getProdSpc() {
		return this.prodSpc;
	}

	public void setProdSpc(String prodSpc) {
		this.prodSpc = prodSpc;
	}

	public BigDecimal getTotlCnt() {
		return this.totlCnt;
	}

	public void setTotlCnt(BigDecimal totlCnt) {
		this.totlCnt = totlCnt;
	}

	public BigDecimal getTotlWeight() {
		return this.totlWeight;
	}

	public void setTotlWeight(BigDecimal totlWeight) {
		this.totlWeight = totlWeight;
	}

	public String getWkspNum() {
		return this.wkspNum;
	}

	public void setWkspNum(String wkspNum) {
		this.wkspNum = wkspNum;
	}

}