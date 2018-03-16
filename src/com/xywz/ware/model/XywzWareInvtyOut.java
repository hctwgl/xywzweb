package com.xywz.ware.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.Date;


/**
 * 出货表.
 * 
 */
@Entity
@Table(name="xywz_ware_invty_out")
public class XywzWareInvtyOut implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="OUT_ID")
	private Long outId;

	@Column(name="CONTR_NUM")
	private String contrNum;
	
	@Column(name="MATERIALS")
	private String materials;

	@Column(name="DENST")
	private BigDecimal denst;

	@Column(name="JIAN_CNT")
	private BigInteger jianCnt;

	@Column(name="LEN")
	private BigDecimal len;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MERCHD_ID")
	private Long merchdId;

	@Column(name="NGTV_POOR")
	private String ngtvPoor;

	@Column(name="OUT_CUST_ID")
	private String outCustId;

	@Column(name="OUT_CUST_NAME")
	private String outCustName;

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

	@Column(name="INVTY_ID")
	private Long invtyId;

	@Column(name="WEIGHT")
	private BigDecimal weight;

	@Column(name="ZHI_CNT")
	private BigInteger zhiCnt;
	
	@Column(name="SUM_ZHI")
	private BigInteger sumZhi;
	
	@Column(name="OUT_NUM")
	private String outNum;
	
	@Column(name="AGAIN_OUT_ID")
	private Long againOutId;

    public XywzWareInvtyOut() {
    }

	public Long getOutId() {
		return this.outId;
	}

	public void setOutId(Long outId) {
		this.outId = outId;
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

	public String getOutCustId() {
		return this.outCustId;
	}

	public void setOutCustId(String outCustId) {
		this.outCustId = outCustId;
	}

	public String getOutCustName() {
		return this.outCustName;
	}

	public void setOutCustName(String outCustName) {
		this.outCustName = outCustName;
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

	public Long getInvtyId() {
		return this.invtyId;
	}

	public void setInvtyId(Long invtyId) {
		this.invtyId = invtyId;
	}

	public BigDecimal getWeight() {
		return this.weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public BigInteger getZhiCnt() {
		return this.zhiCnt;
	}

	public void setZhiCnt(BigInteger zhiCnt) {
		this.zhiCnt = zhiCnt;
	}

	public String getOutNum() {
		return outNum;
	}

	public void setOutNum(String outNum) {
		this.outNum = outNum;
	}

	public Long getAgainOutId() {
		return againOutId;
	}

	public void setAgainOutId(Long againOutId) {
		this.againOutId = againOutId;
	}

	public BigInteger getSumZhi() {
		return sumZhi;
	}

	public void setSumZhi(BigInteger sumZhi) {
		this.sumZhi = sumZhi;
	}

	public void setMaterials(String materials) {
		this.materials = materials;
	}

	public String getMaterials() {
		return materials;
	}

}