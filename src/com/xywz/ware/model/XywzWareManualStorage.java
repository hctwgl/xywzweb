package com.xywz.ware.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;


/**
 * 手动入库表
 * 
 */
@Entity
@Table(name="xywz_ware_manual_storage")
public class XywzWareManualStorage implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="STORE_ID")
	private Long storeId;

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

	@Column(name="NGTV_POOR")
	private String ngtvPoor;

	@Column(name="PRD_NAME")
	private String prdName;

	@Column(name="REM_ZHI_CNT")
	private BigInteger remZhiCnt;

	@Column(name="SPC_MODEL")
	private String spcModel;

	@Column(name="STORE_STATUS")
	private String storeStatus;

	@Column(name="WEIGHT")
	private BigDecimal weight;

	@Column(name="ZHI_CNT")
	private BigInteger zhiCnt;
	
	@Column(name="SUM_ZHI")
	private BigInteger sumZhi;

    public XywzWareManualStorage() {
    }

	public Long getStoreId() {
		return this.storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
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

	public String getNgtvPoor() {
		return this.ngtvPoor;
	}

	public void setNgtvPoor(String ngtvPoor) {
		this.ngtvPoor = ngtvPoor;
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

	public String getStoreStatus() {
		return this.storeStatus;
	}

	public void setStoreStatus(String storeStatus) {
		this.storeStatus = storeStatus;
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

	public BigInteger getSumZhi() {
		return sumZhi;
	}

	public void setSumZhi(BigInteger sumZhi) {
		this.sumZhi = sumZhi;
	}

}