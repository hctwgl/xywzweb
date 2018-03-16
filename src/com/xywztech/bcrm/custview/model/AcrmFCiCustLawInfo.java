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
 * The persistent class for the ACRM_F_CI_CUST_LAW_INFO database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CUST_LAW_INFO")
public class AcrmFCiCustLawInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CUST_LAW_INFO_ID_GENERATOR", sequenceName="ID_SEQUENCE" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CUST_LAW_INFO_ID_GENERATOR")
	private Long id;

	@Column(name="AGENCY_BRAN")
	private String agencyBran;

	@Column(name="AMO_INT")
	private BigDecimal amoInt;

	@Column(name="AMO_PRINC")
	private BigDecimal amoPrinc;

    @Temporal( TemporalType.DATE)
	@Column(name="APP_EXE_DT")
	private Date appExeDt;

	@Column(name="APP_EXE_OBJ")
	private BigDecimal appExeObj;

	@Column(name="BAL_AMT")
	private BigDecimal balAmt;

	@Column(name="BORR_NAME")
	private String borrName;

	private String brief;

	@Column(name="CASH_REC_AMT")
	private BigDecimal cashRecAmt;

	@Column(name="COU_IDEN_INT")
	private BigDecimal couIdenInt;

	@Column(name="COU_IDEN_PR")
	private BigDecimal couIdenPr;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="ESTIM_COTS")
	private BigDecimal estimCots;

	@Column(name="EXE_ACC_COU")
	private String exeAccCou;

    @Temporal( TemporalType.DATE)
	@Column(name="EXE_ACC_DT")
	private Date exeAccDt;

	@Column(name="EXE_COTS")
	private BigDecimal exeCots;

	@Column(name="EXE_LEG_INST_NO")
	private String exeLegInstNo;

	@Column(name="EXE_LEG_INST_TYP")
	private String exeLegInstTyp;

	@Column(name="EXE_PUB_COTS")
	private BigDecimal exePubCots;

	@Column(name="EXE_YN_ACC")
	private String exeYnAcc;

    @Temporal( TemporalType.DATE)
	@Column(name="FINAL_UPDATE_DATE")
	private Date finalUpdateDate;

	@Column(name="FIRST_DUTY_OFFICER")
	private String firstDutyOfficer;

    @Temporal( TemporalType.DATE)
	@Column(name="FIRST_TO_ANGENT")
	private Date firstToAngent;

	@Column(name="FIS_ACC_COU")
	private String fisAccCou;

	@Column(name="FIS_INSTR")
	private String fisInstr;

    @Temporal( TemporalType.DATE)
	@Column(name="FIS_JUD_DT")
	private Date fisJudDt;

    @Temporal( TemporalType.DATE)
	@Column(name="FIS_JUD_EFF_DT")
	private Date fisJudEffDt;

	@Column(name="FIS_LEG_INST_NO")
	private String fisLegInstNo;

	@Column(name="FIS_LEG_INST_TYP")
	private String fisLegInstTyp;

	@Column(name="FIS_NOL_PRO")
	private String fisNolPro;

    @Temporal( TemporalType.DATE)
	@Column(name="FIS_PRES_DT")
	private Date fisPresDt;

    @Temporal( TemporalType.DATE)
	@Column(name="FIS_RECO_DT")
	private Date fisRecoDt;

	@Column(name="FIS_YN_ACC")
	private String fisYnAcc;

	@Column(name="FIS_YN_PRES")
	private String fisYnPres;

	@Column(name="LAWY_COTS")
	private BigDecimal lawyCots;

	@Column(name="LITI_COTS")
	private BigDecimal litiCots;

	@Column(name="LITI_INT")
	private BigDecimal litiInt;

	@Column(name="LITI_OBJ")
	private BigDecimal litiObj;

	@Column(name="LITI_PR")
	private BigDecimal litiPr;

	@Column(name="LITI_PUB_CHARG")
	private BigDecimal litiPubCharg;

	@Column(name="LITI_STA")
	private String litiSta;

	@Column(name="MA_CASE_NO")
	private String maCaseNo;

	@Column(name="MANAGE_BRAN")
	private String manageBran;

	private Integer month;

	@Column(name="ODS_ST_DATE")
	private String odsStDate;

	@Column(name="ORI_BORR_AMT")
	private BigDecimal oriBorrAmt;

	@Column(name="OTH_COTS")
	private BigDecimal othCots;

	@Column(name="OTH_PROSEC")
	private String othProsec;

	@Column(name="PAR_AGIA_EXE_FIL")
	private String parAgiaExeFil;

	@Column(name="PPRD_LOSE")
	private BigDecimal pprdLose;

	@Column(name="PRES_COTS")
	private BigDecimal presCots;

	@Column(name="PRO_BY_REC_AMT")
	private BigDecimal proByRecAmt;

    @Temporal( TemporalType.DATE)
	@Column(name="RECORD_DATE")
	private Date recordDate;

	private String registrant;

	private String remarks;

	@Column(name="SALE_COTS")
	private BigDecimal saleCots;

	@Column(name="SEC_ACC_COU")
	private String secAccCou;

	@Column(name="SEC_DUTY_OFFICER")
	private String secDutyOfficer;

	@Column(name="SEC_INSTR")
	private String secInstr;

    @Temporal( TemporalType.DATE)
	@Column(name="SEC_JUD_DT")
	private Date secJudDt;

    @Temporal( TemporalType.DATE)
	@Column(name="SEC_JUD_EFF_DT")
	private Date secJudEffDt;

	@Column(name="SEC_LEG_INST_NO")
	private String secLegInstNo;

	@Column(name="SEC_LEG_INST_TYP")
	private String secLegInstTyp;

	@Column(name="SEC_NOL_PRO")
	private String secNolPro;

    @Temporal( TemporalType.DATE)
	@Column(name="SEC_PRES_DT")
	private Date secPresDt;

    @Temporal( TemporalType.DATE)
	@Column(name="SEC_RECO_DT")
	private Date secRecoDt;

	@Column(name="SEC_RESUL")
	private String secResul;

	@Column(name="SEC_YN_ACC")
	private String secYnAcc;

	@Column(name="SEC_YN_PRES")
	private String secYnPres;

	@Column(name="SECOND_AGENT")
	private String secondAgent;

    @Temporal( TemporalType.DATE)
	@Column(name="SECOND_TO_ANGENT")
	private Date secondToAngent;

	@Column(name="THE_AGENT")
	private String theAgent;

	@Column(name="TRI_RESUL")
	private String triResul;

	private Integer year;

	@Column(name="YN_FIS_PUB_ANN")
	private String ynFisPubAnn;

	@Column(name="YN_SEC_PUB_ANN")
	private String ynSecPubAnn;

    public AcrmFCiCustLawInfo() {
    }

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Integer getMonth() {
		return month;
	}


	public void setMonth(Integer month) {
		this.month = month;
	}


	public Integer getYear() {
		return year;
	}


	public void setYear(Integer year) {
		this.year = year;
	}


	public String getAgencyBran() {
		return this.agencyBran;
	}

	public void setAgencyBran(String agencyBran) {
		this.agencyBran = agencyBran;
	}

	public BigDecimal getAmoInt() {
		return this.amoInt;
	}

	public void setAmoInt(BigDecimal amoInt) {
		this.amoInt = amoInt;
	}

	public BigDecimal getAmoPrinc() {
		return this.amoPrinc;
	}

	public void setAmoPrinc(BigDecimal amoPrinc) {
		this.amoPrinc = amoPrinc;
	}

	public Date getAppExeDt() {
		return this.appExeDt;
	}

	public void setAppExeDt(Date appExeDt) {
		this.appExeDt = appExeDt;
	}

	public BigDecimal getAppExeObj() {
		return this.appExeObj;
	}

	public void setAppExeObj(BigDecimal appExeObj) {
		this.appExeObj = appExeObj;
	}

	public BigDecimal getBalAmt() {
		return this.balAmt;
	}

	public void setBalAmt(BigDecimal balAmt) {
		this.balAmt = balAmt;
	}

	public String getBorrName() {
		return this.borrName;
	}

	public void setBorrName(String borrName) {
		this.borrName = borrName;
	}

	public String getBrief() {
		return this.brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public BigDecimal getCashRecAmt() {
		return this.cashRecAmt;
	}

	public void setCashRecAmt(BigDecimal cashRecAmt) {
		this.cashRecAmt = cashRecAmt;
	}

	public BigDecimal getCouIdenInt() {
		return this.couIdenInt;
	}

	public void setCouIdenInt(BigDecimal couIdenInt) {
		this.couIdenInt = couIdenInt;
	}

	public BigDecimal getCouIdenPr() {
		return this.couIdenPr;
	}

	public void setCouIdenPr(BigDecimal couIdenPr) {
		this.couIdenPr = couIdenPr;
	}

	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public BigDecimal getEstimCots() {
		return this.estimCots;
	}

	public void setEstimCots(BigDecimal estimCots) {
		this.estimCots = estimCots;
	}

	public String getExeAccCou() {
		return this.exeAccCou;
	}

	public void setExeAccCou(String exeAccCou) {
		this.exeAccCou = exeAccCou;
	}

	public Date getExeAccDt() {
		return this.exeAccDt;
	}

	public void setExeAccDt(Date exeAccDt) {
		this.exeAccDt = exeAccDt;
	}

	public BigDecimal getExeCots() {
		return this.exeCots;
	}

	public void setExeCots(BigDecimal exeCots) {
		this.exeCots = exeCots;
	}

	public String getExeLegInstNo() {
		return this.exeLegInstNo;
	}

	public void setExeLegInstNo(String exeLegInstNo) {
		this.exeLegInstNo = exeLegInstNo;
	}

	public String getExeLegInstTyp() {
		return this.exeLegInstTyp;
	}

	public void setExeLegInstTyp(String exeLegInstTyp) {
		this.exeLegInstTyp = exeLegInstTyp;
	}

	public BigDecimal getExePubCots() {
		return this.exePubCots;
	}

	public void setExePubCots(BigDecimal exePubCots) {
		this.exePubCots = exePubCots;
	}

	public String getExeYnAcc() {
		return this.exeYnAcc;
	}

	public void setExeYnAcc(String exeYnAcc) {
		this.exeYnAcc = exeYnAcc;
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

	public Date getFirstToAngent() {
		return this.firstToAngent;
	}

	public void setFirstToAngent(Date firstToAngent) {
		this.firstToAngent = firstToAngent;
	}

	public String getFisAccCou() {
		return this.fisAccCou;
	}

	public void setFisAccCou(String fisAccCou) {
		this.fisAccCou = fisAccCou;
	}

	public String getFisInstr() {
		return this.fisInstr;
	}

	public void setFisInstr(String fisInstr) {
		this.fisInstr = fisInstr;
	}

	public Date getFisJudDt() {
		return this.fisJudDt;
	}

	public void setFisJudDt(Date fisJudDt) {
		this.fisJudDt = fisJudDt;
	}

	public Date getFisJudEffDt() {
		return this.fisJudEffDt;
	}

	public void setFisJudEffDt(Date fisJudEffDt) {
		this.fisJudEffDt = fisJudEffDt;
	}

	public String getFisLegInstNo() {
		return this.fisLegInstNo;
	}

	public void setFisLegInstNo(String fisLegInstNo) {
		this.fisLegInstNo = fisLegInstNo;
	}

	public String getFisLegInstTyp() {
		return this.fisLegInstTyp;
	}

	public void setFisLegInstTyp(String fisLegInstTyp) {
		this.fisLegInstTyp = fisLegInstTyp;
	}

	public String getFisNolPro() {
		return this.fisNolPro;
	}

	public void setFisNolPro(String fisNolPro) {
		this.fisNolPro = fisNolPro;
	}

	public Date getFisPresDt() {
		return this.fisPresDt;
	}

	public void setFisPresDt(Date fisPresDt) {
		this.fisPresDt = fisPresDt;
	}

	public Date getFisRecoDt() {
		return this.fisRecoDt;
	}

	public void setFisRecoDt(Date fisRecoDt) {
		this.fisRecoDt = fisRecoDt;
	}

	public String getFisYnAcc() {
		return this.fisYnAcc;
	}

	public void setFisYnAcc(String fisYnAcc) {
		this.fisYnAcc = fisYnAcc;
	}

	public String getFisYnPres() {
		return this.fisYnPres;
	}

	public void setFisYnPres(String fisYnPres) {
		this.fisYnPres = fisYnPres;
	}

	public BigDecimal getLawyCots() {
		return this.lawyCots;
	}

	public void setLawyCots(BigDecimal lawyCots) {
		this.lawyCots = lawyCots;
	}

	public BigDecimal getLitiCots() {
		return this.litiCots;
	}

	public void setLitiCots(BigDecimal litiCots) {
		this.litiCots = litiCots;
	}

	public BigDecimal getLitiInt() {
		return this.litiInt;
	}

	public void setLitiInt(BigDecimal litiInt) {
		this.litiInt = litiInt;
	}

	public BigDecimal getLitiObj() {
		return this.litiObj;
	}

	public void setLitiObj(BigDecimal litiObj) {
		this.litiObj = litiObj;
	}

	public BigDecimal getLitiPr() {
		return this.litiPr;
	}

	public void setLitiPr(BigDecimal litiPr) {
		this.litiPr = litiPr;
	}

	public BigDecimal getLitiPubCharg() {
		return this.litiPubCharg;
	}

	public void setLitiPubCharg(BigDecimal litiPubCharg) {
		this.litiPubCharg = litiPubCharg;
	}

	public String getLitiSta() {
		return this.litiSta;
	}

	public void setLitiSta(String litiSta) {
		this.litiSta = litiSta;
	}

	public String getMaCaseNo() {
		return this.maCaseNo;
	}

	public void setMaCaseNo(String maCaseNo) {
		this.maCaseNo = maCaseNo;
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

	public BigDecimal getOriBorrAmt() {
		return this.oriBorrAmt;
	}

	public void setOriBorrAmt(BigDecimal oriBorrAmt) {
		this.oriBorrAmt = oriBorrAmt;
	}

	public BigDecimal getOthCots() {
		return this.othCots;
	}

	public void setOthCots(BigDecimal othCots) {
		this.othCots = othCots;
	}

	public String getOthProsec() {
		return this.othProsec;
	}

	public void setOthProsec(String othProsec) {
		this.othProsec = othProsec;
	}

	public String getParAgiaExeFil() {
		return this.parAgiaExeFil;
	}

	public void setParAgiaExeFil(String parAgiaExeFil) {
		this.parAgiaExeFil = parAgiaExeFil;
	}

	public BigDecimal getPprdLose() {
		return this.pprdLose;
	}

	public void setPprdLose(BigDecimal pprdLose) {
		this.pprdLose = pprdLose;
	}

	public BigDecimal getPresCots() {
		return this.presCots;
	}

	public void setPresCots(BigDecimal presCots) {
		this.presCots = presCots;
	}

	public BigDecimal getProByRecAmt() {
		return this.proByRecAmt;
	}

	public void setProByRecAmt(BigDecimal proByRecAmt) {
		this.proByRecAmt = proByRecAmt;
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

	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public BigDecimal getSaleCots() {
		return this.saleCots;
	}

	public void setSaleCots(BigDecimal saleCots) {
		this.saleCots = saleCots;
	}

	public String getSecAccCou() {
		return this.secAccCou;
	}

	public void setSecAccCou(String secAccCou) {
		this.secAccCou = secAccCou;
	}

	public String getSecDutyOfficer() {
		return this.secDutyOfficer;
	}

	public void setSecDutyOfficer(String secDutyOfficer) {
		this.secDutyOfficer = secDutyOfficer;
	}

	public String getSecInstr() {
		return this.secInstr;
	}

	public void setSecInstr(String secInstr) {
		this.secInstr = secInstr;
	}

	public Date getSecJudDt() {
		return this.secJudDt;
	}

	public void setSecJudDt(Date secJudDt) {
		this.secJudDt = secJudDt;
	}

	public Date getSecJudEffDt() {
		return this.secJudEffDt;
	}

	public void setSecJudEffDt(Date secJudEffDt) {
		this.secJudEffDt = secJudEffDt;
	}

	public String getSecLegInstNo() {
		return this.secLegInstNo;
	}

	public void setSecLegInstNo(String secLegInstNo) {
		this.secLegInstNo = secLegInstNo;
	}

	public String getSecLegInstTyp() {
		return this.secLegInstTyp;
	}

	public void setSecLegInstTyp(String secLegInstTyp) {
		this.secLegInstTyp = secLegInstTyp;
	}

	public String getSecNolPro() {
		return this.secNolPro;
	}

	public void setSecNolPro(String secNolPro) {
		this.secNolPro = secNolPro;
	}

	public Date getSecPresDt() {
		return this.secPresDt;
	}

	public void setSecPresDt(Date secPresDt) {
		this.secPresDt = secPresDt;
	}

	public Date getSecRecoDt() {
		return this.secRecoDt;
	}

	public void setSecRecoDt(Date secRecoDt) {
		this.secRecoDt = secRecoDt;
	}

	public String getSecResul() {
		return this.secResul;
	}

	public void setSecResul(String secResul) {
		this.secResul = secResul;
	}

	public String getSecYnAcc() {
		return this.secYnAcc;
	}

	public void setSecYnAcc(String secYnAcc) {
		this.secYnAcc = secYnAcc;
	}

	public String getSecYnPres() {
		return this.secYnPres;
	}

	public void setSecYnPres(String secYnPres) {
		this.secYnPres = secYnPres;
	}

	public String getSecondAgent() {
		return this.secondAgent;
	}

	public void setSecondAgent(String secondAgent) {
		this.secondAgent = secondAgent;
	}

	public Date getSecondToAngent() {
		return this.secondToAngent;
	}

	public void setSecondToAngent(Date secondToAngent) {
		this.secondToAngent = secondToAngent;
	}

	public String getTheAgent() {
		return this.theAgent;
	}

	public void setTheAgent(String theAgent) {
		this.theAgent = theAgent;
	}

	public String getTriResul() {
		return this.triResul;
	}

	public void setTriResul(String triResul) {
		this.triResul = triResul;
	}

	public String getYnFisPubAnn() {
		return this.ynFisPubAnn;
	}

	public void setYnFisPubAnn(String ynFisPubAnn) {
		this.ynFisPubAnn = ynFisPubAnn;
	}

	public String getYnSecPubAnn() {
		return this.ynSecPubAnn;
	}

	public void setYnSecPubAnn(String ynSecPubAnn) {
		this.ynSecPubAnn = ynSecPubAnn;
	}

}