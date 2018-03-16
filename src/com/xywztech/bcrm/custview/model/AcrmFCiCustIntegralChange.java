package com.xywztech.bcrm.custview.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the ACRM_F_CI_CUST_INTEGRAL_CHANGE database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CUST_INTEGRAL_CHANGE")
public class AcrmFCiCustIntegralChange implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CUST_INTEGRAL_CHANGE_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CUST_INTEGRAL_CHANGE_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;
	
	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="ACTIVITY_NAME")
	private String activityName;
	
	@Temporal( TemporalType.DATE)
	@Column(name="ACTIVITY_TIME")
	private Date activityTime;

	@Column(name="DEDUCTION_INTEGRAL")
	private BigDecimal deductionIntegral;
    
    @Column(name="HANDLER")
	private String handler;
    
    @Temporal( TemporalType.DATE)
    @Column(name="HANDLE_TIME")
	private Date handleTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public Date getActivityTime() {
		return activityTime;
	}

	public void setActivityTime(Date activityTime) {
		this.activityTime = activityTime;
	}

	public BigDecimal getDeductionIntegral() {
		return deductionIntegral;
	}

	public void setDeductionIntegral(BigDecimal deductionIntegral) {
		this.deductionIntegral = deductionIntegral;
	}

	public String getHandler() {
		return handler;
	}

	public void setHandler(String handler) {
		this.handler = handler;
	}

	public Date getHandleTime() {
		return handleTime;
	}

	public void setHandleTime(Date handleTime) {
		this.handleTime = handleTime;
	}
    

	
}