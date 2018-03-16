package com.xywz.plan.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the xywz_plan_tsk_sngl database table.
 * 
 */
@Entity
@Table(name="xywz_plan_tsk_sngl")
public class XywzPlanTskSngl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="TSK_SNGL_ID", insertable=false)
	private Long tskSnglId;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="CONTR_TSK_SNGL_ID")
	private String contrTskSnglId;

    @Temporal( TemporalType.DATE)
	@Column(name="DELI_DATE")
	private Date deliDate;

    @Temporal( TemporalType.DATE)
	@Column(name="MODI_DELI_DATE")
	private Date modiDeliDate;

	@Column(name="MODI_TSK_SNGL_ID")
	private String modiTskSnglId;

    public XywzPlanTskSngl() {
    }

	public Long getTskSnglId() {
		return this.tskSnglId;
	}

	public void setTskSnglId(Long tskSnglId) {
		this.tskSnglId = tskSnglId;
	}

	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}

	public String getContrTskSnglId() {
		return this.contrTskSnglId;
	}

	public void setContrTskSnglId(String contrTskSnglId) {
		this.contrTskSnglId = contrTskSnglId;
	}

	public Date getDeliDate() {
		return this.deliDate;
	}

	public void setDeliDate(Date deliDate) {
		this.deliDate = deliDate;
	}

	public Date getModiDeliDate() {
		return this.modiDeliDate;
	}

	public void setModiDeliDate(Date modiDeliDate) {
		this.modiDeliDate = modiDeliDate;
	}

	public String getModiTskSnglId() {
		return this.modiTskSnglId;
	}

	public void setModiTskSnglId(String modiTskSnglId) {
		this.modiTskSnglId = modiTskSnglId;
	}

}