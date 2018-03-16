package com.xywztech.bcrm.custview.model;

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
 * The persistent class for the ACRM_F_CI_CREDIT_VILLAGE_CUST database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CREDIT_VILLAGE_CUST")
public class AcrmFCiCreditVillageCust implements Serializable {
	private static final long serialVersionUID = 1L;

	
	@Column(name="HOUSE_CODE", length=20)
	private String houseCode;
	
	@Column(name="AN_GROUP", length=60)
	private String anGroup;

	@Column(length=10)
	private String area;

	@Column(name="AWARD_YN", length=2)
	private String awardYn;

	@Column(name="AWARD_YN_LINE", precision=17, scale=2)
	private BigDecimal awardYnLine;

	@Column(name="BADNESS_RECO_DES", length=40)
	private String badnessRecoDes;

	@Column(name="BADNESS_RECORD", length=2)
	private String badnessRecord;

	@Column(length=40)
	private String branch;

	@Column(name="CAR_VER", length=50)
	private String carVer;

	@Column(name="COM_HOUSE", length=40)
	private String comHouse;

	@Column(name="CREDIT_STAT", length=2)
	private String creditStat;
	
	@Id  
	@Column(name="CUST_ID", length=21)
	private String custId;

	@Column(name="DEBT_STAT", length=2)
	private String debtStat;

	@Column(name="DEP_DAY", precision=17, scale=2)
	private BigDecimal depDay;

	@Column(name="DUTY_OFFICER", length=10)
	private String dutyOfficer;

	@Column(name="EDU_LEVEL", length=5)
	private String eduLevel;

	@Column(name="FAMI_CON", length=60)
	private String famiCon;

	@Column(name="FAMI_STAT", length=2)
	private String famiStat;

	@Column(name="FAMI_STAT_DES", length=40)
	private String famiStatDes;

	@Column(name="FAMILY_ACTUAL", length=5)
	private String familyActual;

	@Column(name="FAMILY_FINAL", length=5)
	private String familyFinal;

	@Column(name="FAMILY_NUM")
	private int familyNum;

	@Column(name="FAMILY_RELT", length=2)
	private String familyRelt;

	@Column(name="FINANCE_AMT", precision=17, scale=2)
	private BigDecimal financeAmt;

	@Column(name="HEALTH_STATUS", length=5)
	private String healthStatus;

	@Column(name="HEALTH_STATUS_DES", length=40)
	private String healthStatusDes;

	

	@Column(name="HOUSE_MASTER", length=20)
	private String houseMaster;

	@Column(name="HOUSE_STAT", length=2)
	private String houseStat;

	@Column(name="IDENTI_CARD_NO", length=20)
	private String identiCardNo;

	@Column(name="LIVE_ADDR", length=128)
	private String liveAddr;

	@Column(name="LOAN_DAY", precision=17, scale=2)
	private BigDecimal loanDay;

	@Column(name="MANAGE_BRAN", length=10)
	private String manageBran;

	@Column(name="MANAGE_ITEM", length=60)
	private String manageItem;

	@Column(name="MANAGE_SCAL", length=60)
	private String manageScal;

	@Column(name="MARRG_STATUS", length=5)
	private String marrgStatus;

	@Column(name="MASTER_RELT", length=2)
	private String masterRelt;

	@Column(name="MASTER_RELT_DES", length=40)
	private String masterReltDes;

	@Column(length=11)
	private String mobile;

	@Column(length=10)
	private String name;

	@Column(name="NEB_RELT", length=2)
	private String nebRelt;

	@Column(name="NOW_DEP_BAL", precision=17, scale=2)
	private BigDecimal nowDepBal;

	@Column(name="NOW_LOAN_BAL", precision=17, scale=2)
	private BigDecimal nowLoanBal;

	@Column(name="ODS_ST_DATE", length=10)
	private String odsStDate;

	@Column(name="PHONE_NO", length=20)
	private String phoneNo;

	@Column(name="PROFE_DES", length=60)
	private String profeDes;

	@Column(name="PROFE_KIND", length=5)
	private String profeKind;

    @Temporal( TemporalType.DATE)
	@Column(name="REG_DATE")
	private Date regDate;

	@Column(length=400)
	private String remark;

	@Column(length=100)
	private String remark2;

	@Column(name="REMARK2__41324", length=18)
	private String remark241324;

	@Column(name="VILLA_COMENT", length=400)
	private String villaComent;

	@Column(name="VILLA_NAME", length=60)
	private String villaName;

	@Column(name="VILLA_NO", length=20)
	private String villaNo;

	@Column(name="WORK_NUM")
	private int workNum;

	@Column(name="WORK_STAT", length=2)
	private String workStat;

	@Column(name="YE_INCOME", precision=17, scale=2)
	private BigDecimal yeIncome;

	@Column(name="YN_CRCARD", length=2)
	private String ynCrcard;

    public AcrmFCiCreditVillageCust() {
    }

	public String getAnGroup() {
		return this.anGroup;
	}

	public void setAnGroup(String anGroup) {
		this.anGroup = anGroup;
	}

	public String getArea() {
		return this.area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAwardYn() {
		return this.awardYn;
	}

	public void setAwardYn(String awardYn) {
		this.awardYn = awardYn;
	}

	public BigDecimal getAwardYnLine() {
		return this.awardYnLine;
	}

	public void setAwardYnLine(BigDecimal awardYnLine) {
		this.awardYnLine = awardYnLine;
	}

	public String getBadnessRecoDes() {
		return this.badnessRecoDes;
	}

	public void setBadnessRecoDes(String badnessRecoDes) {
		this.badnessRecoDes = badnessRecoDes;
	}

	public String getBadnessRecord() {
		return this.badnessRecord;
	}

	public void setBadnessRecord(String badnessRecord) {
		this.badnessRecord = badnessRecord;
	}

	public String getBranch() {
		return this.branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getCarVer() {
		return this.carVer;
	}

	public void setCarVer(String carVer) {
		this.carVer = carVer;
	}

	public String getComHouse() {
		return this.comHouse;
	}

	public void setComHouse(String comHouse) {
		this.comHouse = comHouse;
	}

	public String getCreditStat() {
		return this.creditStat;
	}

	public void setCreditStat(String creditStat) {
		this.creditStat = creditStat;
	}

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getDebtStat() {
		return this.debtStat;
	}

	public void setDebtStat(String debtStat) {
		this.debtStat = debtStat;
	}

	public BigDecimal getDepDay() {
		return this.depDay;
	}

	public void setDepDay(BigDecimal depDay) {
		this.depDay = depDay;
	}

	public String getDutyOfficer() {
		return this.dutyOfficer;
	}

	public void setDutyOfficer(String dutyOfficer) {
		this.dutyOfficer = dutyOfficer;
	}

	public String getEduLevel() {
		return this.eduLevel;
	}

	public void setEduLevel(String eduLevel) {
		this.eduLevel = eduLevel;
	}

	public String getFamiCon() {
		return this.famiCon;
	}

	public void setFamiCon(String famiCon) {
		this.famiCon = famiCon;
	}

	public String getFamiStat() {
		return this.famiStat;
	}

	public void setFamiStat(String famiStat) {
		this.famiStat = famiStat;
	}

	public String getFamiStatDes() {
		return this.famiStatDes;
	}

	public void setFamiStatDes(String famiStatDes) {
		this.famiStatDes = famiStatDes;
	}

	public String getFamilyActual() {
		return this.familyActual;
	}

	public void setFamilyActual(String familyActual) {
		this.familyActual = familyActual;
	}

	public String getFamilyFinal() {
		return this.familyFinal;
	}

	public void setFamilyFinal(String familyFinal) {
		this.familyFinal = familyFinal;
	}

	public int getFamilyNum() {
		return this.familyNum;
	}

	public void setFamilyNum(int familyNum) {
		this.familyNum = familyNum;
	}

	public String getFamilyRelt() {
		return this.familyRelt;
	}

	public void setFamilyRelt(String familyRelt) {
		this.familyRelt = familyRelt;
	}

	public BigDecimal getFinanceAmt() {
		return this.financeAmt;
	}

	public void setFinanceAmt(BigDecimal financeAmt) {
		this.financeAmt = financeAmt;
	}

	public String getHealthStatus() {
		return this.healthStatus;
	}

	public void setHealthStatus(String healthStatus) {
		this.healthStatus = healthStatus;
	}

	public String getHealthStatusDes() {
		return this.healthStatusDes;
	}

	public void setHealthStatusDes(String healthStatusDes) {
		this.healthStatusDes = healthStatusDes;
	}

	public String getHouseCode() {
		return this.houseCode;
	}

	public void setHouseCode(String houseCode) {
		this.houseCode = houseCode;
	}

	public String getHouseMaster() {
		return this.houseMaster;
	}

	public void setHouseMaster(String houseMaster) {
		this.houseMaster = houseMaster;
	}

	public String getHouseStat() {
		return this.houseStat;
	}

	public void setHouseStat(String houseStat) {
		this.houseStat = houseStat;
	}

	public String getIdentiCardNo() {
		return this.identiCardNo;
	}

	public void setIdentiCardNo(String identiCardNo) {
		this.identiCardNo = identiCardNo;
	}

	public String getLiveAddr() {
		return this.liveAddr;
	}

	public void setLiveAddr(String liveAddr) {
		this.liveAddr = liveAddr;
	}

	public BigDecimal getLoanDay() {
		return this.loanDay;
	}

	public void setLoanDay(BigDecimal loanDay) {
		this.loanDay = loanDay;
	}

	public String getManageBran() {
		return this.manageBran;
	}

	public void setManageBran(String manageBran) {
		this.manageBran = manageBran;
	}

	public String getManageItem() {
		return this.manageItem;
	}

	public void setManageItem(String manageItem) {
		this.manageItem = manageItem;
	}

	public String getManageScal() {
		return this.manageScal;
	}

	public void setManageScal(String manageScal) {
		this.manageScal = manageScal;
	}

	public String getMarrgStatus() {
		return this.marrgStatus;
	}

	public void setMarrgStatus(String marrgStatus) {
		this.marrgStatus = marrgStatus;
	}

	public String getMasterRelt() {
		return this.masterRelt;
	}

	public void setMasterRelt(String masterRelt) {
		this.masterRelt = masterRelt;
	}

	public String getMasterReltDes() {
		return this.masterReltDes;
	}

	public void setMasterReltDes(String masterReltDes) {
		this.masterReltDes = masterReltDes;
	}

	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNebRelt() {
		return this.nebRelt;
	}

	public void setNebRelt(String nebRelt) {
		this.nebRelt = nebRelt;
	}

	public BigDecimal getNowDepBal() {
		return this.nowDepBal;
	}

	public void setNowDepBal(BigDecimal nowDepBal) {
		this.nowDepBal = nowDepBal;
	}

	public BigDecimal getNowLoanBal() {
		return this.nowLoanBal;
	}

	public void setNowLoanBal(BigDecimal nowLoanBal) {
		this.nowLoanBal = nowLoanBal;
	}

	public String getOdsStDate() {
		return this.odsStDate;
	}

	public void setOdsStDate(String odsStDate) {
		this.odsStDate = odsStDate;
	}

	public String getPhoneNo() {
		return this.phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getProfeDes() {
		return this.profeDes;
	}

	public void setProfeDes(String profeDes) {
		this.profeDes = profeDes;
	}

	public String getProfeKind() {
		return this.profeKind;
	}

	public void setProfeKind(String profeKind) {
		this.profeKind = profeKind;
	}

	public Date getRegDate() {
		return this.regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRemark2() {
		return this.remark2;
	}

	public void setRemark2(String remark2) {
		this.remark2 = remark2;
	}

	public String getRemark241324() {
		return this.remark241324;
	}

	public void setRemark241324(String remark241324) {
		this.remark241324 = remark241324;
	}

	public String getVillaComent() {
		return this.villaComent;
	}

	public void setVillaComent(String villaComent) {
		this.villaComent = villaComent;
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

	public int getWorkNum() {
		return this.workNum;
	}

	public void setWorkNum(int workNum) {
		this.workNum = workNum;
	}

	public String getWorkStat() {
		return this.workStat;
	}

	public void setWorkStat(String workStat) {
		this.workStat = workStat;
	}

	public BigDecimal getYeIncome() {
		return this.yeIncome;
	}

	public void setYeIncome(BigDecimal yeIncome) {
		this.yeIncome = yeIncome;
	}

	public String getYnCrcard() {
		return this.ynCrcard;
	}

	public void setYnCrcard(String ynCrcard) {
		this.ynCrcard = ynCrcard;
	}

}