package com.xywz.plan.model;


import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;


/**
 * 生产任务表.
 * 
 */
@Entity
@Table(name="xywz_plan_prdc_plan_advs_sngl")
public class XywzPlanPrdcPlanAdvsSngl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="PLAN_ID")
	private Long planId;

	@Column(name="CHANNAL_TYPE")
	private String channalType;
	
	@Column(name="PLAN_NUM")
	private String planNum;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="DENST")
	private BigDecimal denst;

    @Temporal( TemporalType.DATE)
	@Column(name="ISSUES_DT")
	private Date issuesDt;

	@Column(name="ISSUES_USERID")
	private String issuesUserid;


	@Column(name="ISSUES_USERNAME")
	private String issuesUsername;

	@Column(name="JIAN_CNT")
	private BigInteger jianCnt;

	@Column(name="LEN")
	private BigDecimal len;

	@Column(name="MATERIALS")
	private String materials;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MERCHD_ID")
	private Long merchdId;

	@Column(name="MERCHD_TYPE")
	private String merchdType;


	@Column(name="PRD_NAME")
	private String prdName;

	@Column(name="REM_ZHI_CNT")
	private BigInteger remZhiCnt;
	
	@Column(name="SUM_ZHI")
	private BigInteger sumZhi;

	@Column(name="SCHEDU_NUM")
	private String scheduNum;

	@Column(name="SCHEDU_STATUS")
	private String scheduStatus;
	
    @Temporal( TemporalType.DATE)
	@Column(name="SCHEDU_DATE")
	private Date scheduDate;

	@Column(name="SPC_MODEL")
	private String spcModel;

	@Column(name="WEIGHT")
	private BigDecimal weight;

	@Column(name="WORKSHOP")
	private String workshop;

	@Column(name="ZHI_CNT")
	private BigInteger zhiCnt;
	
	@Column(name="SOURCE_ID")
	private Long sourceId;
	
	@Column(name="WEIGHT_TOLERANCE")
	private String weightTolerance;
	
	@Column(name="LENGTH_TOLERANCE")
	private String lengthTolerance;
	
	@Column(name="DEPTH_TOLERANCE")
	private String depthTolerance;
	
	@Column(name="IS_DOWN")
	private String isDown;
	

    public XywzPlanPrdcPlanAdvsSngl() {
    }

	public Long getPlanId() {
		return this.planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public String getChannalType() {
		return this.channalType;
	}

	public void setChannalType(String channalType) {
		this.channalType = channalType;
	}

	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}

	public BigDecimal getDenst() {
		return this.denst;
	}

	public void setDenst(BigDecimal denst) {
		this.denst = denst;
	}

	public Date getIssuesDt() {
		return this.issuesDt;
	}

	public void setIssuesDt(Date issuesDt) {
		this.issuesDt = issuesDt;
	}

	public String getIssuesUserid() {
		return this.issuesUserid;
	}

	public void setIssuesUserid(String issuesUserid) {
		this.issuesUserid = issuesUserid;
	}

	public String getIssuesUsername() {
		return this.issuesUsername;
	}

	public void setIssuesUsername(String issuesUsername) {
		this.issuesUsername = issuesUsername;
	}

	public BigInteger getJianCnt() {
		return this.jianCnt;
	}

	public void setJianCnt(BigInteger jianCnt) {
		this.jianCnt = jianCnt;
	}

	public BigDecimal getLen() {
		return this.len;
	}

	public void setLen(BigDecimal len) {
		this.len = len;
	}

	public String getMaterials() {
		return this.materials;
	}

	public void setMaterials(String materials) {
		this.materials = materials;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public Long getMerchdId() {
		return this.merchdId;
	}

	public void setMerchdId(Long merchdId) {
		this.merchdId = merchdId;
	}

	public String getMerchdType() {
		return this.merchdType;
	}

	public void setMerchdType(String merchdType) {
		this.merchdType = merchdType;
	}

	public String getPrdName() {
		return this.prdName;
	}

	public void setPrdName(String prdName) {
		this.prdName = prdName;
	}

	public BigInteger getRemZhiCnt() {
		return this.remZhiCnt;
	}

	public void setRemZhiCnt(BigInteger remZhiCnt) {
		this.remZhiCnt = remZhiCnt;
	}

	public String getScheduNum() {
		return this.scheduNum;
	}

	public void setScheduNum(String scheduNum) {
		this.scheduNum = scheduNum;
	}

	public String getScheduStatus() {
		return this.scheduStatus;
	}

	public void setScheduStatus(String scheduStatus) {
		this.scheduStatus = scheduStatus;
	}

	public String getSpcModel() {
		return this.spcModel;
	}

	public void setSpcModel(String spcModel) {
		this.spcModel = spcModel;
	}

	public BigDecimal getWeight() {
		return this.weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public String getWorkshop() {
		return this.workshop;
	}

	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}

	public BigInteger getZhiCnt() {
		return this.zhiCnt;
	}

	public void setZhiCnt(BigInteger zhiCnt) {
		this.zhiCnt = zhiCnt;
	}

	public Date getScheduDate() {
		return scheduDate;
	}

	public void setScheduDate(Date scheduDate) {
		this.scheduDate = scheduDate;
	}

	public Long getSourceId() {
		return sourceId;
	}

	public void setSourceId(Long sourceId) {
		this.sourceId = sourceId;
	}

	public BigInteger getSumZhi() {
		return sumZhi;
	}

	public void setSumZhi(BigInteger sumZhi) {
		this.sumZhi = sumZhi;
	}

	public String getWeightTolerance() {
		return weightTolerance;
	}

	public void setWeightTolerance(String weightTolerance) {
		this.weightTolerance = weightTolerance;
	}

	public String getLengthTolerance() {
		return lengthTolerance;
	}

	public void setLengthTolerance(String lengthTolerance) {
		this.lengthTolerance = lengthTolerance;
	}

	public String getDepthTolerance() {
		return depthTolerance;
	}

	public void setDepthTolerance(String depthTolerance) {
		this.depthTolerance = depthTolerance;
	}

	public void setPlanNum(String planNum) {
		this.planNum = planNum;
	}

	public String getPlanNum() {
		return planNum;
	}

	public void setIsDown(String isDown) {
		this.isDown = isDown;
	}

	public String getIsDown() {
		return isDown;
	}

}