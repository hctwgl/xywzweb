package com.xywztech.bcrm.model;

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
 * The persistent class for the ACRM_F_CI_PRO_CE_STAN_BOOK database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PRO_CE_STAN_BOOK")
public class AcrmFCiProCeStanBook implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PRO_CE_STAN_BOOK_ID_GENERATOR", sequenceName="ID_SEQUENCE" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PRO_CE_STAN_BOOK_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="AMPLIFY_MULTIPLE")
	private Integer amplifyMultiple;

	@Column(name="BUSI_SERIAL_NUM", length=20)
	private String busiSerialNum;

	public String getOdsStDate() {
		return odsStDate;
	}

	public void setOdsStDate(String odsStDate) {
		this.odsStDate = odsStDate;
	}

	@Column(name="CE_LIMIT", precision=24, scale=6)
	private BigDecimal ceLimit;

	@Column(name="CE_STAN_BOOK_TYPE", length=13)
	private String ceStanBookType;

	@Column(name="CUST_ID", nullable=false, length=21)
	private String custId;

    @Temporal( TemporalType.DATE)
	@Column(name="END_DATE")
	private Date endDate;

	@Column(name="LIMIT_STAT", length=13)
	private String limitStat;

	@Column(name="MARGINS_MONEY", precision=24, scale=6)
	private BigDecimal marginsMoney;

	@Column(name="PROJECT_NO", length=50)
	private String projectNo;

    @Temporal( TemporalType.DATE)
	@Column(name="START_DATE")
	private Date startDate;

	@Column(name="USED_LIMIT", precision=24, scale=6)
	private BigDecimal usedLimit;
	
	@Column(name="ODS_ST_DATE", length=10)
	private String odsStDate;

    public AcrmFCiProCeStanBook() {
    }

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}

	public Integer getAmplifyMultiple() {
		return amplifyMultiple;
	}

	public void setAmplifyMultiple(Integer amplifyMultiple) {
		this.amplifyMultiple = amplifyMultiple;
	}

	public String getBusiSerialNum() {
		return this.busiSerialNum;
	}

	public void setBusiSerialNum(String busiSerialNum) {
		this.busiSerialNum = busiSerialNum;
	}

	public BigDecimal getCeLimit() {
		return this.ceLimit;
	}

	public void setCeLimit(BigDecimal ceLimit) {
		this.ceLimit = ceLimit;
	}

	public String getCeStanBookType() {
		return this.ceStanBookType;
	}

	public void setCeStanBookType(String ceStanBookType) {
		this.ceStanBookType = ceStanBookType;
	}

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getLimitStat() {
		return this.limitStat;
	}

	public void setLimitStat(String limitStat) {
		this.limitStat = limitStat;
	}

	public BigDecimal getMarginsMoney() {
		return this.marginsMoney;
	}

	public void setMarginsMoney(BigDecimal marginsMoney) {
		this.marginsMoney = marginsMoney;
	}

	public String getProjectNo() {
		return this.projectNo;
	}

	public void setProjectNo(String projectNo) {
		this.projectNo = projectNo;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public BigDecimal getUsedLimit() {
		return this.usedLimit;
	}

	public void setUsedLimit(BigDecimal usedLimit) {
		this.usedLimit = usedLimit;
	}

}