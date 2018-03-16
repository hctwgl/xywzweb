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
 * The persistent class for the ACRM_F_CI_CRE_CONTRACT database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CRE_CONTRACT")
public class AcrmFCiCreContract implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CRE_CONTRACT_ID_GENERATOR", sequenceName="ID_SEQUENCE" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CRE_CONTRACT_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="AGENCY_BRAN", length=10)
	private String agencyBran;

	@Column(name="AWARD_KIND", length=3)
	private String awardKind;

    @Temporal( TemporalType.DATE)
	@Column(name="AWARD_START")
	private Date awardStart;

	@Column(name="AWARD_YN_LINE", precision=17, scale=10)
	private BigDecimal awardYnLine;

	@Column(name="BUSI_NO", length=36)
	private String busiNo;

    @Temporal( TemporalType.DATE)
	@Column(name="CHANG_DATE")
	private Date changDate;

	@Column(name="CHANG_LINE", precision=17, scale=10)
	private BigDecimal changLine;

	@Column(name="CURR_NO", length=5)
	private String currNo;

	@Column(name="CUST_NAME", length=60)
	private String custName;

	@Column(name="CUSTOM_ID", nullable=false, length=32)
	private String customId;

    @Temporal( TemporalType.DATE)
	@Column(name="FINAL_UPDATE_DATE")
	private Date finalUpdateDate;

	@Column(name="FIRST_DUTY_OFFICER", length=20)
	private String firstDutyOfficer;

	@Column(name="ITEM_NO", length=20)
	private String itemNo;

	@Column(name="LINE_STS", length=1)
	private String lineSts;

	@Column(name="LINE_TYP", length=1)
	private String lineTyp;

	@Column(name="MANAGE_BRAN", length=10)
	private String manageBran;

	@Column(name="ODS_ST_DATE", length=10)
	private String odsStDate;

    @Temporal( TemporalType.DATE)
	@Column(name="RECORD_DATE")
	private Date recordDate;

	@Column(length=20)
	private String registrant;

	@Column(name="SEC_DUTY_OFFICER", length=20)
	private String secDutyOfficer;

	@Column(name="SUPLUS_LINE", precision=17, scale=10)
	private BigDecimal suplusLine;

	@Column(name="USED_LINE", precision=17, scale=10)
	private BigDecimal usedLine;

    @Temporal( TemporalType.DATE)
	private Date ydt;

    public AcrmFCiCreContract() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAgencyBran() {
		return this.agencyBran;
	}

	public void setAgencyBran(String agencyBran) {
		this.agencyBran = agencyBran;
	}

	public String getAwardKind() {
		return this.awardKind;
	}

	public void setAwardKind(String awardKind) {
		this.awardKind = awardKind;
	}

	public Date getAwardStart() {
		return this.awardStart;
	}

	public void setAwardStart(Date awardStart) {
		this.awardStart = awardStart;
	}

	public BigDecimal getAwardYnLine() {
		return this.awardYnLine;
	}

	public void setAwardYnLine(BigDecimal awardYnLine) {
		this.awardYnLine = awardYnLine;
	}

	public String getBusiNo() {
		return this.busiNo;
	}

	public void setBusiNo(String busiNo) {
		this.busiNo = busiNo;
	}

	public Date getChangDate() {
		return this.changDate;
	}

	public void setChangDate(Date changDate) {
		this.changDate = changDate;
	}

	public BigDecimal getChangLine() {
		return this.changLine;
	}

	public void setChangLine(BigDecimal changLine) {
		this.changLine = changLine;
	}

	public String getCurrNo() {
		return this.currNo;
	}

	public void setCurrNo(String currNo) {
		this.currNo = currNo;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustomId() {
		return this.customId;
	}

	public void setCustomId(String customId) {
		this.customId = customId;
	}

	public Date getFinalUpdateDate() {
		return this.finalUpdateDate;
	}

	public void setFinalUpdateDate(Date finalUpdateDate) {
		this.finalUpdateDate = finalUpdateDate;
	}

	public String getFirstDutyOfficer() {
		return this.firstDutyOfficer;
	}

	public void setFirstDutyOfficer(String firstDutyOfficer) {
		this.firstDutyOfficer = firstDutyOfficer;
	}

	public String getItemNo() {
		return this.itemNo;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public String getLineSts() {
		return this.lineSts;
	}

	public void setLineSts(String lineSts) {
		this.lineSts = lineSts;
	}

	public String getLineTyp() {
		return this.lineTyp;
	}

	public void setLineTyp(String lineTyp) {
		this.lineTyp = lineTyp;
	}

	public String getManageBran() {
		return this.manageBran;
	}

	public void setManageBran(String manageBran) {
		this.manageBran = manageBran;
	}

	public String getOdsStDate() {
		return this.odsStDate;
	}

	public void setOdsStDate(String odsStDate) {
		this.odsStDate = odsStDate;
	}

	public Date getRecordDate() {
		return this.recordDate;
	}

	public void setRecordDate(Date recordDate) {
		this.recordDate = recordDate;
	}

	public String getRegistrant() {
		return this.registrant;
	}

	public void setRegistrant(String registrant) {
		this.registrant = registrant;
	}

	public String getSecDutyOfficer() {
		return this.secDutyOfficer;
	}

	public void setSecDutyOfficer(String secDutyOfficer) {
		this.secDutyOfficer = secDutyOfficer;
	}

	public BigDecimal getSuplusLine() {
		return this.suplusLine;
	}

	public void setSuplusLine(BigDecimal suplusLine) {
		this.suplusLine = suplusLine;
	}

	public BigDecimal getUsedLine() {
		return this.usedLine;
	}

	public void setUsedLine(BigDecimal usedLine) {
		this.usedLine = usedLine;
	}

	public Date getYdt() {
		return this.ydt;
	}

	public void setYdt(Date ydt) {
		this.ydt = ydt;
	}

}