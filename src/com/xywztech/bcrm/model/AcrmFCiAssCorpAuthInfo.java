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
 * The persistent class for the ACRM_F_CI_ASS_CORP_AUTH_INFO database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_ASS_CORP_AUTH_INFO")
public class AcrmFCiAssCorpAuthInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_ASS_CORP_AUTH_INFO_ID_GENERATOR" , sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_ASS_CORP_AUTH_INFO_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="AST_COND", length=100)
	private String astCond;

	@Column(name="AST_DES", length=100)
	private String astDes;

	@Column(name="CAN_GRNT_AMT", precision=24, scale=6)
	private BigDecimal canGrntAmt;

	@Column(name="CORP_LINE", precision=24, scale=6)
	private BigDecimal corpLine;

	@Column(name="CUSTOM_ID", nullable=false, length=32)
	private String customId;

	@Column(name="CUSTOM_NAME", length=50)
	private String customName;

    @Temporal( TemporalType.DATE)
	@Column(name="END_DATE")
	private Date endDate;

	@Column(name="INDV_LINE", precision=24, scale=6)
	private BigDecimal indvLine;

    @Temporal( TemporalType.DATE)
	@Column(name="START_DATE")
	private Date startDate;

	@Column(length=13)
	private String status;
	
	@Column(name="ODS_ST_DATE", length=10)
	private String odsStDate;

    public String getOdsStDate() {
		return odsStDate;
	}

	public void setOdsStDate(String odsStDate) {
		this.odsStDate = odsStDate;
	}

	public AcrmFCiAssCorpAuthInfo() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public String getAstCond() {
		return this.astCond;
	}

	public void setAstCond(String astCond) {
		this.astCond = astCond;
	}

	public String getAstDes() {
		return this.astDes;
	}

	public void setAstDes(String astDes) {
		this.astDes = astDes;
	}

	public BigDecimal getCanGrntAmt() {
		return this.canGrntAmt;
	}

	public void setCanGrntAmt(BigDecimal canGrntAmt) {
		this.canGrntAmt = canGrntAmt;
	}

	public BigDecimal getCorpLine() {
		return this.corpLine;
	}

	public void setCorpLine(BigDecimal corpLine) {
		this.corpLine = corpLine;
	}

	public String getCustomId() {
		return this.customId;
	}

	public void setCustomId(String customId) {
		this.customId = customId;
	}

	public String getCustomName() {
		return this.customName;
	}

	public void setCustomName(String customName) {
		this.customName = customName;
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public BigDecimal getIndvLine() {
		return this.indvLine;
	}

	public void setIndvLine(BigDecimal indvLine) {
		this.indvLine = indvLine;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}