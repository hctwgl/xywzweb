package com.xywztech.bcrm.custmanager.model;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_WP_WORKLOG_W_DETAIL database table.
 * 
 */
@Entity
@Table(name="OCRM_F_WP_WORKLOG_W_DETAIL")
public class OcrmFWpWorklogWDetail implements Serializable {
	private static final long serialVersionUID = 1L;


	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "ID", nullable = false)
	private Long id;

	@Column(name="WORK_EXECUTE")
	private String workExecute;

	@Column(name="WORK_ORDER")
	private String workOrder;

	@Column(name="WORK_PLAN")
	private String workPlan;

	@Column(name="WORK_TYPE")
	private String workType;

	@Column(name="WORKLOG_ID")
	private Long worklogId;

    public OcrmFWpWorklogWDetail() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getWorkExecute() {
		return workExecute;
	}

	public void setWorkExecute(String workExecute) {
		this.workExecute = workExecute;
	}

	public String getWorkOrder() {
		return workOrder;
	}

	public void setWorkOrder(String workOrder) {
		this.workOrder = workOrder;
	}

	public String getWorkPlan() {
		return workPlan;
	}

	public void setWorkPlan(String workPlan) {
		this.workPlan = workPlan;
	}

	public String getWorkType() {
		return workType;
	}

	public void setWorkType(String workType) {
		this.workType = workType;
	}

	public Long getWorklogId() {
		return worklogId;
	}

	public void setWorklogId(Long worklogId) {
		this.worklogId = worklogId;
	}


}