package com.xywztech.bcrm.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the OCRM_F_CI_INTEGRAL_SETTING database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_INTEGRAL_SETTING")
public class OcrmFCiIntegralSetting implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CI_INTEGRAL_SETTING_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CI_INTEGRAL_SETTING_ID_GENERATOR")
	@Column(name ="ID",unique=true, nullable=false)
	private Long id;

	@Column(name="CUST_TYPE")
	private String custType;

	@Column(name="IS_DISABLED")
	private String isDisabled;

	@Column(name="TARGET_BAL")
	private BigDecimal targetBal;

	@Column(name="TARGET_ID")
	private String targetId;

	@Column(name="TARGET_MARK")
	private BigDecimal targetMark;

	@Column(name="TARGET_NAME")
	private String targetName;
	
	@Column(name="CONVERT_RATE")
	private BigDecimal convertRate;


	public BigDecimal getConvertRate() {
		return convertRate;
	}

	public void setConvertRate(BigDecimal convertRate) {
		this.convertRate = convertRate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustType() {
		return custType;
	}

	public void setCustType(String custType) {
		this.custType = custType;
	}

	public String getIsDisabled() {
		return isDisabled;
	}

	public void setIsDisabled(String isDisabled) {
		this.isDisabled = isDisabled;
	}

	public BigDecimal getTargetBal() {
		return targetBal;
	}

	public void setTargetBal(BigDecimal targetBal) {
		this.targetBal = targetBal;
	}

	public String getTargetId() {
		return targetId;
	}

	public void setTargetId(String targetId) {
		this.targetId = targetId;
	}

	public BigDecimal getTargetMark() {
		return targetMark;
	}

	public void setTargetMark(BigDecimal targetMark) {
		this.targetMark = targetMark;
	}

	public String getTargetName() {
		return targetName;
	}

	public void setTargetName(String targetName) {
		this.targetName = targetName;
	}
}