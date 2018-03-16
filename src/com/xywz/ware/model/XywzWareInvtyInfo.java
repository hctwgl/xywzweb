package com.xywz.ware.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.Date;


/**
 * 库存表
 * 
 */
@Entity
@Table(name="xywz_ware_invty_info")
public class XywzWareInvtyInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="INVTY_ID")
	private Long invtyId;
	
	@Column(name="PLAN_ID")
	private Long planId;
	
	@Column(name="CHANNAL_TYPE")
	private String channalType;

	@Column(name="CONTR_NUM")
	private String contrNum;

	@Column(name="DENST")
	private BigDecimal denst;

    @Temporal( TemporalType.DATE)
	@Column(name="FINAL_OPR_DT")
	private Date finalOprDt;

    @Temporal( TemporalType.DATE)
	@Column(name="INTO_WHS_DT")
	private Date intoWhsDt;

	@Column(name="INTO_WHS_EXEC_PERS")
	private String intoWhsExecPers;

	@Column(name="JIAN_CNT")
	private BigInteger jianCnt;

	@Column(name="LAST_OPR_PERS")
	private String lastOprPers;

	@Column(name="LEN")
	private BigDecimal len;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MERCHD_ID")
	private Long merchdId;

	@Column(name="NGTV_POOR")
	private String ngtvPoor;

	@Column(name="OUT_INTO_WHS_IND")
	private String outIntoWhsInd;

    @Temporal( TemporalType.DATE)
	@Column(name="OUT_WHS_DT")
	private Date outWhsDt;

	@Column(name="OUT_WHS_EXEC_PERS")
	private String outWhsExecPers;

	@Column(name="PRD_NAME")
	private String prdName;

	@Column(name="REM_ZHI_CNT")
	private BigInteger remZhiCnt;

	@Column(name="SPC_MODEL")
	private String spcModel;

	@Column(name="WEIGHT")
	private BigDecimal weight;

	@Column(name="WORKSHOP")
	private String workshop;

	@Column(name="ZHI_CNT")
	private BigInteger zhiCnt;
	
	@Column(name="SUM_ZHI")
	private BigInteger sumZhi;

    public XywzWareInvtyInfo() {
    }

	public Long getInvtyId() {
		return this.invtyId;
	}

	public void setInvtyId(Long invtyId) {
		this.invtyId = invtyId;
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

	public Date getFinalOprDt() {
		return this.finalOprDt;
	}

	public void setFinalOprDt(Date finalOprDt) {
		this.finalOprDt = finalOprDt;
	}

	public Date getIntoWhsDt() {
		return this.intoWhsDt;
	}

	public void setIntoWhsDt(Date intoWhsDt) {
		this.intoWhsDt = intoWhsDt;
	}

	public String getIntoWhsExecPers() {
		return this.intoWhsExecPers;
	}

	public void setIntoWhsExecPers(String intoWhsExecPers) {
		this.intoWhsExecPers = intoWhsExecPers;
	}

	public BigInteger getJianCnt() {
		return this.jianCnt;
	}

	public void setJianCnt(BigInteger jianCnt) {
		this.jianCnt = jianCnt;
	}

	public String getLastOprPers() {
		return this.lastOprPers;
	}

	public void setLastOprPers(String lastOprPers) {
		this.lastOprPers = lastOprPers;
	}

	public BigDecimal getLen() {
		return this.len;
	}

	public void setLen(BigDecimal len) {
		this.len = len;
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

	public String getNgtvPoor() {
		return this.ngtvPoor;
	}

	public void setNgtvPoor(String ngtvPoor) {
		this.ngtvPoor = ngtvPoor;
	}

	public String getOutIntoWhsInd() {
		return this.outIntoWhsInd;
	}

	public void setOutIntoWhsInd(String outIntoWhsInd) {
		this.outIntoWhsInd = outIntoWhsInd;
	}

	public Date getOutWhsDt() {
		return this.outWhsDt;
	}

	public void setOutWhsDt(Date outWhsDt) {
		this.outWhsDt = outWhsDt;
	}

	public String getOutWhsExecPers() {
		return this.outWhsExecPers;
	}

	public void setOutWhsExecPers(String outWhsExecPers) {
		this.outWhsExecPers = outWhsExecPers;
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

	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public String getChannalType() {
		return channalType;
	}

	public void setChannalType(String channalType) {
		this.channalType = channalType;
	}

	public BigInteger getSumZhi() {
		return sumZhi;
	}

	public void setSumZhi(BigInteger sumZhi) {
		this.sumZhi = sumZhi;
	}

}