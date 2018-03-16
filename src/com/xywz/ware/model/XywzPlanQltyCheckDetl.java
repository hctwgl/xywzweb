package com.xywz.ware.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;


/**
 * 质量检验标准明细
 * 
 */
@Entity
@Table(name="xywz_plan_qlty_check_detl")
public class XywzPlanQltyCheckDetl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="QUAL_DTL_ID")
	private Long qualDtlId;

	@Column(name="CD_PKG_STD")
	private String cdPkgStd;

	@Column(name="CHECK_STD")
	private String checkStd;

	@Column(name="CONTCR")
	private String contcr;

	@Column(name="GDS_AGENT")
	private String gdsAgent;

	@Column(name="GUOY_MAK_DOC")
	private String guoyMakDoc;

	@Column(name="MEMO")
	private String memo;

	@Column(name="NUMBER")
	private BigDecimal number;

	@Column(name="PIECES")
	private String pieces;

	@Column(name="PIECES_CNT")
	private String piecesCnt;

	@Column(name="PIECES_WEIGHT")
	private String piecesWeight;

	@Column(name="QUAL_ID")
	private BigInteger qualId;

	@Column(name="ROLLING_KIND")
	private String rollingKind;

	@Column(name="SPC_MODEL")
	private String spcModel;

    public XywzPlanQltyCheckDetl() {
    }

	public Long getQualDtlId() {
		return this.qualDtlId;
	}

	public void setQualDtlId(Long qualDtlId) {
		this.qualDtlId = qualDtlId;
	}

	public String getCdPkgStd() {
		return this.cdPkgStd;
	}

	public void setCdPkgStd(String cdPkgStd) {
		this.cdPkgStd = cdPkgStd;
	}

	public String getCheckStd() {
		return this.checkStd;
	}

	public void setCheckStd(String checkStd) {
		this.checkStd = checkStd;
	}

	public String getContcr() {
		return this.contcr;
	}

	public void setContcr(String contcr) {
		this.contcr = contcr;
	}

	public String getGdsAgent() {
		return this.gdsAgent;
	}

	public void setGdsAgent(String gdsAgent) {
		this.gdsAgent = gdsAgent;
	}

	public String getGuoyMakDoc() {
		return this.guoyMakDoc;
	}

	public void setGuoyMakDoc(String guoyMakDoc) {
		this.guoyMakDoc = guoyMakDoc;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public BigDecimal getNumber() {
		return this.number;
	}

	public void setNumber(BigDecimal number) {
		this.number = number;
	}

	public String getPieces() {
		return this.pieces;
	}

	public void setPieces(String pieces) {
		this.pieces = pieces;
	}

	public String getPiecesCnt() {
		return this.piecesCnt;
	}

	public void setPiecesCnt(String piecesCnt) {
		this.piecesCnt = piecesCnt;
	}

	public String getPiecesWeight() {
		return this.piecesWeight;
	}

	public void setPiecesWeight(String piecesWeight) {
		this.piecesWeight = piecesWeight;
	}

	public BigInteger getQualId() {
		return this.qualId;
	}

	public void setQualId(BigInteger qualId) {
		this.qualId = qualId;
	}

	public String getRollingKind() {
		return this.rollingKind;
	}

	public void setRollingKind(String rollingKind) {
		this.rollingKind = rollingKind;
	}

	public String getSpcModel() {
		return this.spcModel;
	}

	public void setSpcModel(String spcModel) {
		this.spcModel = spcModel;
	}

}