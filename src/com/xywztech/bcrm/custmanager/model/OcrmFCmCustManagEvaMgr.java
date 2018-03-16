package com.xywztech.bcrm.custmanager.model;

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
 * The persistent class for the OCRM_F_CM_CUST_MANAG_EVA_MGR database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CM_CUST_MANAG_EVA_MGR")
public class OcrmFCmCustManagEvaMgr implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_CM_CUST_MANAG_EVA_MGR_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_CM_CUST_MANAG_EVA_MGR_ID_GENERATOR")
	private Long id;

	@Column(name="ACHI_EFFIC")
	private String achiEffic;

	@Column(name="AFFI_GROUP")
	private String affiGroup;

	@Column(name="ASS_MON")
	private String assMon;
	@Temporal( TemporalType.DATE)
	@Column(name="ASS_TIME")
	private Date assTime;

	@Column(name="BEHAV_RULE")
	private String behavRule;

	@Column(name="CHK_ANALYSE")
	private String chkAnalyse;

	@Column(name="COMMU_EXPAND")
	private String commuExpand;

	@Column(name="CUST_MGR_NAME")
	private String custMgrName;

	@Column(name="EMP_PLAN")
	private String empPlan;
	@Temporal( TemporalType.DATE)
	@Column(name="ENTR_TIME")
	private Date entrTime;

    @Temporal( TemporalType.DATE)
	@Column(name="EVA_TIME")
	private Date evaTime;

	@Column(name="GROUP_COLLA")
	private String groupColla;

	@Column(name="LEAN_ABILITY")
	private String leanAbility;

	@Column(name="LOAN_CURR_MISS_CNT")
	private Integer loanCurrMissCnt;

	@Column(name="LOAN_CURR_REL_CNT")
	private Integer loanCurrRelCnt;

	@Column(name="LOAN_OVE_RATIO")
	private BigDecimal loanOveRatio;

	@Column(name="OPER_FLOW")
	private String operFlow;

	@Column(name="PRO_IDEA_FB")
	private String proIdeaFb;

	@Column(name="REPORT_EXP")
	private String reportExp;

	@Column(name="SAV_ENDMON_CNT")
	private BigDecimal savEndmonCnt;

	@Column(name="SAV_MONDAY_AVE")
	private BigDecimal savMondayAve;

	@Column(name="SEV_ATTITUDE")
	private String sevAttitude;

	@Column(name="SUBJ_EVALUATE")
	private String subjEvaluate;

	@Column(name="TIME_MGR")
	private String timeMgr;

	@Column(name="UPMON_WRK_SUM")
	private String upmonWrkSum;

	@Column(name="USER_ID")
	private String userId;

	@Column(name="WRK_ATTITUDE")
	private String wrkAttitude;
	
	@Column(name="STATUS")
	private String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAchiEffic() {
		return achiEffic;
	}

	public void setAchiEffic(String achiEffic) {
		this.achiEffic = achiEffic;
	}

	public String getAffiGroup() {
		return affiGroup;
	}

	public void setAffiGroup(String affiGroup) {
		this.affiGroup = affiGroup;
	}

	public String getAssMon() {
		return assMon;
	}

	public void setAssMon(String assMon) {
		this.assMon = assMon;
	}

	public Date getAssTime() {
		return assTime;
	}

	public void setAssTime(Date assTime) {
		this.assTime = assTime;
	}

	public String getBehavRule() {
		return behavRule;
	}

	public void setBehavRule(String behavRule) {
		this.behavRule = behavRule;
	}

	public String getChkAnalyse() {
		return chkAnalyse;
	}

	public void setChkAnalyse(String chkAnalyse) {
		this.chkAnalyse = chkAnalyse;
	}

	public String getCommuExpand() {
		return commuExpand;
	}

	public void setCommuExpand(String commuExpand) {
		this.commuExpand = commuExpand;
	}

	public String getCustMgrName() {
		return custMgrName;
	}

	public void setCustMgrName(String custMgrName) {
		this.custMgrName = custMgrName;
	}

	public String getEmpPlan() {
		return empPlan;
	}

	public void setEmpPlan(String empPlan) {
		this.empPlan = empPlan;
	}

	public Date getEntrTime() {
		return entrTime;
	}

	public void setEntrTime(Date entrTime) {
		this.entrTime = entrTime;
	}

	public Date getEvaTime() {
		return evaTime;
	}

	public void setEvaTime(Date evaTime) {
		this.evaTime = evaTime;
	}

	public String getGroupColla() {
		return groupColla;
	}

	public void setGroupColla(String groupColla) {
		this.groupColla = groupColla;
	}

	public String getLeanAbility() {
		return leanAbility;
	}

	public void setLeanAbility(String leanAbility) {
		this.leanAbility = leanAbility;
	}

	public Integer getLoanCurrMissCnt() {
		return loanCurrMissCnt;
	}

	public void setLoanCurrMissCnt(Integer loanCurrMissCnt) {
		this.loanCurrMissCnt = loanCurrMissCnt;
	}

	public Integer getLoanCurrRelCnt() {
		return loanCurrRelCnt;
	}

	public void setLoanCurrRelCnt(Integer loanCurrRelCnt) {
		this.loanCurrRelCnt = loanCurrRelCnt;
	}

	public BigDecimal getLoanOveRatio() {
		return loanOveRatio;
	}

	public void setLoanOveRatio(BigDecimal loanOveRatio) {
		this.loanOveRatio = loanOveRatio;
	}

	public String getOperFlow() {
		return operFlow;
	}

	public void setOperFlow(String operFlow) {
		this.operFlow = operFlow;
	}

	public String getProIdeaFb() {
		return proIdeaFb;
	}

	public void setProIdeaFb(String proIdeaFb) {
		this.proIdeaFb = proIdeaFb;
	}

	public String getReportExp() {
		return reportExp;
	}

	public void setReportExp(String reportExp) {
		this.reportExp = reportExp;
	}

	public BigDecimal getSavEndmonCnt() {
		return savEndmonCnt;
	}

	public void setSavEndmonCnt(BigDecimal savEndmonCnt) {
		this.savEndmonCnt = savEndmonCnt;
	}

	public BigDecimal getSavMondayAve() {
		return savMondayAve;
	}

	public void setSavMondayAve(BigDecimal savMondayAve) {
		this.savMondayAve = savMondayAve;
	}

	public String getSevAttitude() {
		return sevAttitude;
	}

	public void setSevAttitude(String sevAttitude) {
		this.sevAttitude = sevAttitude;
	}

	public String getSubjEvaluate() {
		return subjEvaluate;
	}

	public void setSubjEvaluate(String subjEvaluate) {
		this.subjEvaluate = subjEvaluate;
	}

	public String getTimeMgr() {
		return timeMgr;
	}

	public void setTimeMgr(String timeMgr) {
		this.timeMgr = timeMgr;
	}

	public String getUpmonWrkSum() {
		return upmonWrkSum;
	}

	public void setUpmonWrkSum(String upmonWrkSum) {
		this.upmonWrkSum = upmonWrkSum;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getWrkAttitude() {
		return wrkAttitude;
	}

	public void setWrkAttitude(String wrkAttitude) {
		this.wrkAttitude = wrkAttitude;
	}
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}