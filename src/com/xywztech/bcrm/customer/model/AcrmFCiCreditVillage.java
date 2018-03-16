package com.xywztech.bcrm.customer.model;

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
 * The persistent class for the ACRM_F_CI_CREDIT_VILLAGE database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CREDIT_VILLAGE")
public class AcrmFCiCreditVillage implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CREDIT_VILLAGE_VILLANO_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CREDIT_VILLAGE_VILLANO_GENERATOR")
	@Column(name="VILLA_NO", unique=true, nullable=false, length=20)
	private String villaNo;

	@Column(name="AREA_NO", length=20)
	private String areaNo;

	@Column(name="CREDIT_BALL", precision=24, scale=6)
	private BigDecimal creditBall;

	@Column(name="CREDIT_HOUSE")
	private Integer creditHouse;

	@Column(name="ETL_DATE")
	private String etlDate;

	@Column(name="HOST_USER", length=200)
	private String hostUser;

	@Column(name="HOUSE_NUM")
	private Integer houseNum;

	@Column(name="LOAN_AVG", precision=24, scale=6)
	private BigDecimal loanAvg;

	@Column(name="LOAN_BALL", precision=24, scale=6)
	private BigDecimal loanBall;

	@Column(name="ORG_ID", length=10)
	private String orgId;

	@Column(name="ORG_NAME", length=200)
	private String orgName;

	private Long population;

	@Column(name="SAVING_AVG_CUM", precision=24, scale=6)
	private BigDecimal savingAvgCum;

	@Column(name="SAVING_AVG_LAM", precision=24, scale=6)
	private BigDecimal savingAvgLam;

	@Column(name="SAVING_AVG_LAY", precision=24, scale=6)
	private BigDecimal savingAvgLay;

	@Column(name="SAVING_BALL_CUM", precision=24, scale=6)
	private BigDecimal savingBallCum;

	@Column(name="SAVING_BALL_LAM", precision=24, scale=6)
	private BigDecimal savingBallLam;

	@Column(name="SAVING_BALL_LAY", precision=24, scale=6)
	private BigDecimal savingBallLay;

	@Column(name="TOWN_NAME", length=100)
	private String townName;

	@Column(name="USECRE_BALL", precision=24, scale=6)
	private BigDecimal usecreBall;

	@Column(name="USECRE_CUST", length=60)
	private String usecreCust;

	@Column(name="VILLA_BELONG", length=100)
	private String villaBelong;

	@Column(name="VILLA_MODE", length=30)
	private String villaMode;

	@Column(name="VILLA_NAME", length=60)
	private String villaName;

	@Column(name="CUST_ID", length=21)
	private String custId;

    public AcrmFCiCreditVillage() {
    }

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getAreaNo() {
		return this.areaNo;
	}

	public void setAreaNo(String areaNo) {
		this.areaNo = areaNo;
	}

	public BigDecimal getCreditBall() {
		return this.creditBall;
	}

	public void setCreditBall(BigDecimal creditBall) {
		this.creditBall = creditBall;
	}

	public Integer getCreditHouse() {
		return this.creditHouse;
	}

	public void setCreditHouse(Integer creditHouse) {
		this.creditHouse = creditHouse;
	}

	public String getEtlDate() {
		return this.etlDate;
	}

	public void setEtlDate(String etlDate) {
		this.etlDate = etlDate;
	}

	public String getHostUser() {
		return this.hostUser;
	}

	public void setHostUser(String hostUser) {
		this.hostUser = hostUser;
	}

	public int getHouseNum() {
		return this.houseNum;
	}

	public void setHouseNum(int houseNum) {
		this.houseNum = houseNum;
	}

	public BigDecimal getLoanAvg() {
		return this.loanAvg;
	}

	public void setLoanAvg(BigDecimal loanAvg) {
		this.loanAvg = loanAvg;
	}

	public BigDecimal getLoanBall() {
		return this.loanBall;
	}

	public void setLoanBall(BigDecimal loanBall) {
		this.loanBall = loanBall;
	}

	public String getOrgId() {
		return this.orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getOrgName() {
		return this.orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public Long getPopulation() {
		return this.population;
	}

	public void setPopulation(Long population) {
		this.population = population;
	}

	public BigDecimal getSavingAvgCum() {
		return this.savingAvgCum;
	}

	public void setSavingAvgCum(BigDecimal savingAvgCum) {
		this.savingAvgCum = savingAvgCum;
	}

	public BigDecimal getSavingAvgLam() {
		return this.savingAvgLam;
	}

	public void setSavingAvgLam(BigDecimal savingAvgLam) {
		this.savingAvgLam = savingAvgLam;
	}

	public BigDecimal getSavingAvgLay() {
		return this.savingAvgLay;
	}

	public void setSavingAvgLay(BigDecimal savingAvgLay) {
		this.savingAvgLay = savingAvgLay;
	}

	public BigDecimal getSavingBallCum() {
		return this.savingBallCum;
	}

	public void setSavingBallCum(BigDecimal savingBallCum) {
		this.savingBallCum = savingBallCum;
	}

	public BigDecimal getSavingBallLam() {
		return this.savingBallLam;
	}

	public void setSavingBallLam(BigDecimal savingBallLam) {
		this.savingBallLam = savingBallLam;
	}

	public BigDecimal getSavingBallLay() {
		return this.savingBallLay;
	}

	public void setSavingBallLay(BigDecimal savingBallLay) {
		this.savingBallLay = savingBallLay;
	}

	public String getTownName() {
		return this.townName;
	}

	public void setTownName(String townName) {
		this.townName = townName;
	}

	public BigDecimal getUsecreBall() {
		return this.usecreBall;
	}

	public void setUsecreBall(BigDecimal usecreBall) {
		this.usecreBall = usecreBall;
	}

	public String getUsecreCust() {
		return this.usecreCust;
	}

	public void setUsecreCust(String usecreCust) {
		this.usecreCust = usecreCust;
	}

	public String getVillaBelong() {
		return this.villaBelong;
	}

	public void setVillaBelong(String villaBelong) {
		this.villaBelong = villaBelong;
	}

	public String getVillaMode() {
		return this.villaMode;
	}

	public void setVillaMode(String villaMode) {
		this.villaMode = villaMode;
	}

	public String getVillaName() {
		return this.villaName;
	}

	public void setVillaName(String villaName) {
		this.villaName = villaName;
	}

	public String getVillaNo() {
		return this.villaNo;
	}

	public void setVillaNo(String villaNo) {
		this.villaNo = villaNo;
	}

}