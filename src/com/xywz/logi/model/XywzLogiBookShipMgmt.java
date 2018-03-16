package com.xywz.logi.model;
import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_logi_book_ship_mgmt database table.
 * 
 */
@Entity
@Table(name="xywz_logi_book_ship_mgmt")
public class XywzLogiBookShipMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="BOOK_SHIP_ID")
	private Long bookShipId;

	@Column(name="CONTCR")
	private String contcr;

	@Column(name="CONTCR_ID")
	private String contcrId;

	@Column(name="CONTR_NUM")
	private String contrNum;

    @Temporal( TemporalType.DATE)
	@Column(name="EXPCT_TO_PORT_DAY")
	private Date expctToPortDay;

	@Column(name="GDS_AGENT_CONT_TEL")
	private String gdsAgentContTel;

	@Column(name="GDS_AGENT_CONTCR")
	private String gdsAgentContcr;

	@Column(name="GDS_AGENT_NM")
	private String gdsAgentNm;

	@Column(name="GDS_DESC")
	private String gdsDesc;

	@Column(name="LOAD_TRAFF_PORT")
	private String loadTraffPort;

	@Column(name="MAK_DOC")
	private String makDoc;

	@Column(name="MAK_DOC_PERS_ID")
	private String makDocPersId;

	@Column(name="PORTOF_DISCHARGE")
	private String portofDischarge;

	@Column(name="PRC")
	private BigDecimal prc;

	@Column(name="QTY")
	private BigDecimal qty;

	@Column(name="SELL_PERS_MEM")
	private String sellPersMem;

	@Column(name="SELL_PERS_MEM_ID")
	private String sellPersMemId;

	@Column(name="SHIP_AGENT_CONT_TEL")
	private String shipAgentContTel;

	@Column(name="SHIP_AGENT_CONTCR")
	private String shipAgentContcr;

	@Column(name="SHIP_AGENT_NM")
	private String shipAgentNm;

	@Column(name="SHIP_CORP_ID")
	private BigInteger shipCorpId;

	@Column(name="SHIP_NAME")
	private String shipName;

	@Column(name="TOTL_PRC")
	private BigDecimal totlPrc;

	@Column(name="TRAFF_MODE")
	private String traffMode;

    public XywzLogiBookShipMgmt() {
    }

	public Long getBookShipId() {
		return this.bookShipId;
	}

	public void setBookShipId(Long bookShipId) {
		this.bookShipId = bookShipId;
	}

	public String getContcr() {
		return this.contcr;
	}

	public void setContcr(String contcr) {
		this.contcr = contcr;
	}

	public String getContcrId() {
		return this.contcrId;
	}

	public void setContcrId(String contcrId) {
		this.contcrId = contcrId;
	}

	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}

	public Date getExpctToPortDay() {
		return this.expctToPortDay;
	}

	public void setExpctToPortDay(Date expctToPortDay) {
		this.expctToPortDay = expctToPortDay;
	}

	public String getGdsAgentContTel() {
		return this.gdsAgentContTel;
	}

	public void setGdsAgentContTel(String gdsAgentContTel) {
		this.gdsAgentContTel = gdsAgentContTel;
	}

	public String getGdsAgentContcr() {
		return this.gdsAgentContcr;
	}

	public void setGdsAgentContcr(String gdsAgentContcr) {
		this.gdsAgentContcr = gdsAgentContcr;
	}

	public String getGdsAgentNm() {
		return this.gdsAgentNm;
	}

	public void setGdsAgentNm(String gdsAgentNm) {
		this.gdsAgentNm = gdsAgentNm;
	}

	public String getGdsDesc() {
		return this.gdsDesc;
	}

	public void setGdsDesc(String gdsDesc) {
		this.gdsDesc = gdsDesc;
	}

	public String getLoadTraffPort() {
		return this.loadTraffPort;
	}

	public void setLoadTraffPort(String loadTraffPort) {
		this.loadTraffPort = loadTraffPort;
	}

	public String getMakDoc() {
		return this.makDoc;
	}

	public void setMakDoc(String makDoc) {
		this.makDoc = makDoc;
	}

	public String getMakDocPersId() {
		return this.makDocPersId;
	}

	public void setMakDocPersId(String makDocPersId) {
		this.makDocPersId = makDocPersId;
	}

	public String getPortofDischarge() {
		return this.portofDischarge;
	}

	public void setPortofDischarge(String portofDischarge) {
		this.portofDischarge = portofDischarge;
	}

	public BigDecimal getPrc() {
		return this.prc;
	}

	public void setPrc(BigDecimal prc) {
		this.prc = prc;
	}

	public BigDecimal getQty() {
		return this.qty;
	}

	public void setQty(BigDecimal qty) {
		this.qty = qty;
	}

	public String getSellPersMem() {
		return this.sellPersMem;
	}

	public void setSellPersMem(String sellPersMem) {
		this.sellPersMem = sellPersMem;
	}

	public String getSellPersMemId() {
		return this.sellPersMemId;
	}

	public void setSellPersMemId(String sellPersMemId) {
		this.sellPersMemId = sellPersMemId;
	}

	public String getShipAgentContTel() {
		return this.shipAgentContTel;
	}

	public void setShipAgentContTel(String shipAgentContTel) {
		this.shipAgentContTel = shipAgentContTel;
	}

	public String getShipAgentContcr() {
		return this.shipAgentContcr;
	}

	public void setShipAgentContcr(String shipAgentContcr) {
		this.shipAgentContcr = shipAgentContcr;
	}

	public String getShipAgentNm() {
		return this.shipAgentNm;
	}

	public void setShipAgentNm(String shipAgentNm) {
		this.shipAgentNm = shipAgentNm;
	}

	public BigInteger getShipCorpId() {
		return this.shipCorpId;
	}

	public void setShipCorpId(BigInteger shipCorpId) {
		this.shipCorpId = shipCorpId;
	}

	public String getShipName() {
		return this.shipName;
	}

	public void setShipName(String shipName) {
		this.shipName = shipName;
	}

	public BigDecimal getTotlPrc() {
		return this.totlPrc;
	}

	public void setTotlPrc(BigDecimal totlPrc) {
		this.totlPrc = totlPrc;
	}

	public String getTraffMode() {
		return this.traffMode;
	}

	public void setTraffMode(String traffMode) {
		this.traffMode = traffMode;
	}

}