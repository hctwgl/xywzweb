package com.xywztech.bcrm.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the OCRM_F_WP_WORKLOG_M_DETAIL database table.
 * 
 */
@Entity
@Table(name="OCRM_F_WP_WORKLOG_M_DETAIL")
public class OcrmFWpWorklogMDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_WP_WORKLOG_M_DETAIL_ID_GENERATOR", sequenceName="CommonSequnce")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_WP_WORKLOG_M_DETAIL_ID_GENERATOR")
	private Long id;

	private String work;

	@Column(name="WORK_EXECUTE")
	private String workExecute;

	@Column(name="WORK_ORDER")
	private Integer workOrder;

	@Column(name="WORK_PLAN")
	private String workPlan;

	@Column(name="WORK_TYPE")
	private String workType;

	@Column(name="WORKLOG_ID")
	private Long worklogId;

    public OcrmFWpWorklogMDetail() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getWork() {
		return work;
	}

	public void setWork(String work) {
		this.work = work;
	}

	public String getWorkExecute() {
		return workExecute;
	}

	public void setWorkExecute(String workExecute) {
		this.workExecute = workExecute;
	}

	public Integer getWorkOrder() {
		return workOrder;
	}

	public void setWorkOrder(Integer workOrder) {
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