package com.xywztech.bob.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_MM_ACTI_RESPONSE_COUNT database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_ACTI_RESPONSE_COUNT")
public class OcrmFMmActiResponseCount implements Serializable {

	private static final long serialVersionUID = -1717384984944942919L;

	/** ID */
	@Id
	@Column(name = "COUNT_ID")
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	private Long countId;

	/** �ͻ���Ӧ�� */
	@Column(name="CUST_RES_NUM")
	private Integer custResNum;

	/** �ͻ���Ӧ���� */
	@Column(name="CUST_RES_SCALE")
	private BigDecimal custResScale;

	/** Ӫ��ƻ�ID */
	@Column(name="PLAN_ID")
	private Long planId;

	/** Ӫ��ƻ���� */
	@Column(name="PLAN_NAME")
	private String planName;

	/** Ŀ��ͻ��� */
	@Column(name="TARGET_CUST_NUM")
	private Integer targetCustNum;

    public OcrmFMmActiResponseCount() {
    }

	public Long getCountId() {
		return this.countId;
	}

	public void setCountId(Long countId) {
		this.countId = countId;
	}

	public Integer getCustResNum() {
		return this.custResNum;
	}

	public void setCustResNum(Integer custResNum) {
		this.custResNum = custResNum;
	}

	public BigDecimal getCustResScale() {
		return this.custResScale;
	}

	public void setCustResScale(BigDecimal custResScale) {
		this.custResScale = custResScale;
	}

	public Long getPlanId() {
		return this.planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public String getPlanName() {
		return this.planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public Integer getTargetCustNum() {
		return this.targetCustNum;
	}

	public void setTargetCustNum(Integer targetCustNum) {
		this.targetCustNum = targetCustNum;
	}

}