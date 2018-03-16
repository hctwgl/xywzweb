package com.xywztech.bcrm.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the ACRM_F_CI_MIDBU_INFO database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_MIDBU_INFO")
public class AcrmFCiMidbuInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="SUBJECT_NO")
	private String subjectNo;

	@Column(name="CURMON_INCOME")
	private BigDecimal curmonIncome;

	@Column(name="CURQUA_INCOME")
	private BigDecimal curquaIncome;

	@Column(name="CURYEAR_INCOME")
	private BigDecimal curyearIncome;

    @Temporal( TemporalType.DATE)
	@Column(name="ETL_DATE")
	private Date etlDate;

	@Column(name="PRODUCT_ID")
	private String productId;

	@Column(name="SUBJECT_NAME")
	private String subjectName;
	
	@Column(name="CUST_ID")
	private String custId;

    public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public AcrmFCiMidbuInfo() {
    }

	public String getSubjectNo() {
		return this.subjectNo;
	}

	public void setSubjectNo(String subjectNo) {
		this.subjectNo = subjectNo;
	}

	public BigDecimal getCurmonIncome() {
		return this.curmonIncome;
	}

	public void setCurmonIncome(BigDecimal curmonIncome) {
		this.curmonIncome = curmonIncome;
	}

	public BigDecimal getCurquaIncome() {
		return this.curquaIncome;
	}

	public void setCurquaIncome(BigDecimal curquaIncome) {
		this.curquaIncome = curquaIncome;
	}

	public BigDecimal getCuryearIncome() {
		return this.curyearIncome;
	}

	public void setCuryearIncome(BigDecimal curyearIncome) {
		this.curyearIncome = curyearIncome;
	}

	public Date getEtlDate() {
		return this.etlDate;
	}

	public void setEtlDate(Date etlDate) {
		this.etlDate = etlDate;
	}

	public String getProductId() {
		return this.productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getSubjectName() {
		return this.subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

}