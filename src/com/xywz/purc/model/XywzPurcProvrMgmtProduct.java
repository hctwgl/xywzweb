package com.xywz.purc.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;


/**
 * The persistent class for the xywz_purc_provr_mgmt_product database table.
 * 
 */
@Entity
@Table(name="xywz_purc_provr_mgmt_product")
public class XywzPurcProvrMgmtProduct implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="MERCHD_ID")
	private Long merchdId;

	@Column(name="COLOR")
	private String color;

    @Temporal( TemporalType.DATE)
	@Column(name="FINAL_OPR_DT")
	private Date finalOprDt;

	@Column(name="HS_CODE")
	private String hsCode;

    @Temporal( TemporalType.DATE)
	@Column(name="INTO_WHS_DT")
	private Date intoWhsDt;

	@Column(name="INTO_WHS_EXEC_PERS")
	private String intoWhsExecPers;

	@Column(name="KG_M")
	private String kgM;

	@Column(name="LAST_OPR_PERS")
	private String lastOprPers;

	@Column(name="LEN")
	private BigDecimal len;

	@Column(name="MATERIAL")
	private String material;

	@Column(name="MEMO")
	private String memo;

	@Column(name="MERCHD_CN_FST_NM")
	private String merchdCnFstNm;

	@Column(name="MERCHD_CN_SPC")
	private String merchdCnSpc;

	@Column(name="MERCHD_EN_FST_NM")
	private String merchdEnFstNm;

	@Column(name="MERCHD_EN_SPC")
	private String merchdEnSpc;

	@Column(name="MERCHD_NUM")
	private String merchdNum;

	@Column(name="MODEL")
	private String model;

	@Column(name="PIECES")
	private BigInteger pieces;

	@Column(name="PIECES_CNT")
	private BigInteger piecesCnt;
	
	@Column(name="REM_ZHI_CNT")
	private BigInteger remZhiCnt;
	
	@Column(name="SUM_ZHI")
	private BigInteger sumZhi;

	@Column(name="PKG_REQST")
	private String pkgReqst;

	@Column(name="PRDC_COMNT")
	private String prdcComnt;

	@Column(name="PROVR_GDS_NUM")
	private String provrGdsNum;

	@Column(name="PROVR_NUM")
	private String provrNum;

	@Column(name="PUCH_MEASR_CORP")
	private String puchMeasrCorp;

	@Column(name="PUCH_SNGL_ID")
	private String puchSnglId;

	@Column(name="PUCH_UPRC")
	private BigDecimal puchUprc;

	@Column(name="PURC_STATUS")
	private String purcStatus;

	@Column(name="QTY")
	private BigDecimal qty;

	@Column(name="SNGL_GR_WHT")
	private BigDecimal snglGrWht;

	@Column(name="SNGL_ITEM_VOL")
	private BigDecimal snglItemVol;

	@Column(name="SNGL_NT_WHT")
	private BigDecimal snglNtWht;

	@Column(name="SNGL_QTY")
	private BigDecimal snglQty;

	@Column(name="UPRC")
	private BigDecimal uprc;

    public XywzPurcProvrMgmtProduct() {
    }

	public Long getMerchdId() {
		return this.merchdId;
	}

	public void setMerchdId(Long merchdId) {
		this.merchdId = merchdId;
	}

	public String getColor() {
		return this.color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Date getFinalOprDt() {
		return this.finalOprDt;
	}

	public void setFinalOprDt(Date finalOprDt) {
		this.finalOprDt = finalOprDt;
	}

	public String getHsCode() {
		return this.hsCode;
	}

	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
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

	public String getKgM() {
		return this.kgM;
	}

	public void setKgM(String kgM) {
		this.kgM = kgM;
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

	public String getMaterial() {
		return this.material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getMerchdCnFstNm() {
		return this.merchdCnFstNm;
	}

	public void setMerchdCnFstNm(String merchdCnFstNm) {
		this.merchdCnFstNm = merchdCnFstNm;
	}

	public String getMerchdCnSpc() {
		return this.merchdCnSpc;
	}

	public void setMerchdCnSpc(String merchdCnSpc) {
		this.merchdCnSpc = merchdCnSpc;
	}

	public String getMerchdEnFstNm() {
		return this.merchdEnFstNm;
	}

	public void setMerchdEnFstNm(String merchdEnFstNm) {
		this.merchdEnFstNm = merchdEnFstNm;
	}

	public String getMerchdEnSpc() {
		return this.merchdEnSpc;
	}

	public void setMerchdEnSpc(String merchdEnSpc) {
		this.merchdEnSpc = merchdEnSpc;
	}

	public String getMerchdNum() {
		return this.merchdNum;
	}

	public void setMerchdNum(String merchdNum) {
		this.merchdNum = merchdNum;
	}

	public String getModel() {
		return this.model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public BigInteger getPieces() {
		return this.pieces;
	}

	public void setPieces(BigInteger pieces) {
		this.pieces = pieces;
	}

	public BigInteger getPiecesCnt() {
		return this.piecesCnt;
	}

	public void setPiecesCnt(BigInteger piecesCnt) {
		this.piecesCnt = piecesCnt;
	}

	public String getPkgReqst() {
		return this.pkgReqst;
	}

	public void setPkgReqst(String pkgReqst) {
		this.pkgReqst = pkgReqst;
	}

	public String getPrdcComnt() {
		return this.prdcComnt;
	}

	public void setPrdcComnt(String prdcComnt) {
		this.prdcComnt = prdcComnt;
	}

	public String getProvrGdsNum() {
		return this.provrGdsNum;
	}

	public void setProvrGdsNum(String provrGdsNum) {
		this.provrGdsNum = provrGdsNum;
	}

	public String getProvrNum() {
		return this.provrNum;
	}

	public void setProvrNum(String provrNum) {
		this.provrNum = provrNum;
	}

	public String getPuchMeasrCorp() {
		return this.puchMeasrCorp;
	}

	public void setPuchMeasrCorp(String puchMeasrCorp) {
		this.puchMeasrCorp = puchMeasrCorp;
	}

	public String getPuchSnglId() {
		return this.puchSnglId;
	}

	public void setPuchSnglId(String puchSnglId) {
		this.puchSnglId = puchSnglId;
	}

	public BigDecimal getPuchUprc() {
		return this.puchUprc;
	}

	public void setPuchUprc(BigDecimal puchUprc) {
		this.puchUprc = puchUprc;
	}

	public String getPurcStatus() {
		return this.purcStatus;
	}

	public void setPurcStatus(String purcStatus) {
		this.purcStatus = purcStatus;
	}

	public BigDecimal getQty() {
		return this.qty;
	}

	public void setQty(BigDecimal qty) {
		this.qty = qty;
	}

	public BigDecimal getSnglGrWht() {
		return this.snglGrWht;
	}

	public void setSnglGrWht(BigDecimal snglGrWht) {
		this.snglGrWht = snglGrWht;
	}

	public BigDecimal getSnglItemVol() {
		return this.snglItemVol;
	}

	public void setSnglItemVol(BigDecimal snglItemVol) {
		this.snglItemVol = snglItemVol;
	}

	public BigDecimal getSnglNtWht() {
		return this.snglNtWht;
	}

	public void setSnglNtWht(BigDecimal snglNtWht) {
		this.snglNtWht = snglNtWht;
	}

	public BigDecimal getSnglQty() {
		return this.snglQty;
	}

	public void setSnglQty(BigDecimal snglQty) {
		this.snglQty = snglQty;
	}

	public BigDecimal getUprc() {
		return this.uprc;
	}

	public void setUprc(BigDecimal uprc) {
		this.uprc = uprc;
	}

	public BigInteger getRemZhiCnt() {
		return remZhiCnt;
	}

	public void setRemZhiCnt(BigInteger remZhiCnt) {
		this.remZhiCnt = remZhiCnt;
	}

	public BigInteger getSumZhi() {
		return sumZhi;
	}

	public void setSumZhi(BigInteger sumZhi) {
		this.sumZhi = sumZhi;
	}

}