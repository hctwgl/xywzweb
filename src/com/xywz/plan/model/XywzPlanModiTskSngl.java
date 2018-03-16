package com.xywz.plan.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;


/**
 * The persistent class for the xywz_plan_modi_tsk_sngl database table.
 * 
 */
@Entity
@Table(name="xywz_plan_modi_tsk_sngl")
public class XywzPlanModiTskSngl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="MODI_TSK_SNGL_ID")
	private Long modiTskSnglId;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MERCHD_ID")
	private BigInteger merchdId;

	@Column(name="MODI_NGTV_POOR")
	private BigDecimal modiNgtvPoor;

	@Column(name="MODI_PKG")
	private String modiPkg;

	@Column(name="MODI_QTY")
	private BigDecimal modiQty;

	@Column(name="TSK_SNGL_ID")
	private BigInteger tskSnglId;

    public XywzPlanModiTskSngl() {
    }

	public Long getModiTskSnglId() {
		return this.modiTskSnglId;
	}

	public void setModiTskSnglId(Long modiTskSnglId) {
		this.modiTskSnglId = modiTskSnglId;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public BigInteger getMerchdId() {
		return this.merchdId;
	}

	public void setMerchdId(BigInteger merchdId) {
		this.merchdId = merchdId;
	}

	public BigDecimal getModiNgtvPoor() {
		return this.modiNgtvPoor;
	}

	public void setModiNgtvPoor(BigDecimal modiNgtvPoor) {
		this.modiNgtvPoor = modiNgtvPoor;
	}

	public String getModiPkg() {
		return this.modiPkg;
	}

	public void setModiPkg(String modiPkg) {
		this.modiPkg = modiPkg;
	}

	public BigDecimal getModiQty() {
		return this.modiQty;
	}

	public void setModiQty(BigDecimal modiQty) {
		this.modiQty = modiQty;
	}

	public BigInteger getTskSnglId() {
		return this.tskSnglId;
	}

	public void setTskSnglId(BigInteger tskSnglId) {
		this.tskSnglId = tskSnglId;
	}

}