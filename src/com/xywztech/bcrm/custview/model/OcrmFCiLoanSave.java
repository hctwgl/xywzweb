package com.xywztech.bcrm.custview.model;

import java.io.Serializable;
import javax.persistence.*;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the OCRM_F_CI_LOAN_SAVE database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_LOAN_SAVE")
public class OcrmFCiLoanSave implements Serializable {
	private static final long serialVersionUID = 1L;


	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	private Long id;

	
    @Temporal( TemporalType.DATE)
	@Column(name="END_DATE")
	private Date endDate;



	@Column(name="LOAN_ACC")
	private String loanAcc;

	@Column(name="REL_RATE")
	private BigDecimal relRate;

	@Column(name="SAVE_ACC")
	private String saveAcc;

    @Temporal( TemporalType.DATE)
	@Column(name="STAT_DATE")
	private Date statDate;

    @Temporal( TemporalType.DATE)
	@Column(name="UPDATE_DATE")
	private Date updateDate;

	@Column(name="UPDATE_USER")
	private String updateUser;

    public OcrmFCiLoanSave() {
    }

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLoanAcc() {
		return this.loanAcc;
	}

	public void setLoanAcc(String loanAcc) {
		this.loanAcc = loanAcc;
	}

	public BigDecimal getRelRate() {
		return this.relRate;
	}

	public void setRelRate(BigDecimal relRate) {
		this.relRate = relRate;
	}

	public String getSaveAcc() {
		return this.saveAcc;
	}

	public void setSaveAcc(String saveAcc) {
		this.saveAcc = saveAcc;
	}

	public Date getStatDate() {
		return this.statDate;
	}

	public void setStatDate(Date statDate) {
		this.statDate = statDate;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getUpdateUser() {
		return this.updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

}