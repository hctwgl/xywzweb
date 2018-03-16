package com.xywz.ware.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.Date;


/**
 * 质量检核.
 * 
 */
@Entity
@Table(name="xywz_ware_quality_check")
public class XywzWareQualityCheck implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="CHECK_ID")
	private Long checkId;

	@Column(name="CHANNAL_TYPE")
	private String channalType;

    @Temporal( TemporalType.DATE)
	@Column(name="CHECK_DT")
	private Date checkDt;

	@Column(name="CHECK_STATUS")
	private String checkStatus;

	@Column(name="CHECK_USERID")
	private String checkUserid;

	@Column(name="CHECK_USERNAME")
	private String checkUsername;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="DENST")
	private BigDecimal denst;

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

	@Column(name="NGTV_POOR")
	private String ngtvPoor;

	@Column(name="PLAN_ID")
	private Long planId;

	@Column(name="PRD_NAME")
	private String prdName;

	@Column(name="REM_ZHI_CNT")
	private BigInteger remZhiCnt;

	@Column(name="SCHEDU_NUM")
	private String scheduNum;

	@Column(name="SPC_MODEL")
	private String spcModel;

	@Column(name="TOLERANCE")
	private String tolerance;

	@Column(name="WEIGHT")
	private BigDecimal weight;

	@Column(name="WORKSHOP")
	private String workshop;

	@Column(name="ZHI_CNT")
	private BigInteger zhiCnt;
	
	@Column(name="SUM_ZHI")
	private BigInteger sumZhi;

    public XywzWareQualityCheck() {
    }

	public Long getCheckId() {
		return this.checkId;
	}

	public void setCheckId(Long checkId) {
		this.checkId = checkId;
	}

	public String getChannalType() {
		return this.channalType;
	}

	public void setChannalType(String channalType) {
		this.channalType = channalType;
	}

	public Date getCheckDt() {
		return this.checkDt;
	}

	public void setCheckDt(Date checkDt) {
		this.checkDt = checkDt;
	}

	public String getCheckStatus() {
		return this.checkStatus;
	}

	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
	}

	public String getCheckUserid() {
		return this.checkUserid;
	}

	public void setCheckUserid(String checkUserid) {
		this.checkUserid = checkUserid;
	}

	public String getCheckUsername() {
		return this.checkUsername;
	}

	public void setCheckUsername(String checkUsername) {
		this.checkUsername = checkUsername;
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

	public String getNgtvPoor() {
		return this.ngtvPoor;
	}

	public void setNgtvPoor(String ngtvPoor) {
		this.ngtvPoor = ngtvPoor;
	}

	public Long getPlanId() {
		return this.planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
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

	public String getSpcModel() {
		return this.spcModel;
	}

	public void setSpcModel(String spcModel) {
		this.spcModel = spcModel;
	}

	public String getTolerance() {
		return this.tolerance;
	}

	public void setTolerance(String tolerance) {
		this.tolerance = tolerance;
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

	public BigInteger getSumZhi() {
		return sumZhi;
	}

	public void setSumZhi(BigInteger sumZhi) {
		this.sumZhi = sumZhi;
	}

}