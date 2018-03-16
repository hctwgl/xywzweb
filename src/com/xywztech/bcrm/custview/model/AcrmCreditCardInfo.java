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
 * The persistent class for the ACRM_CREDIT_CARD_INFO database table.
 * 
 */
@Entity
@Table(name="ACRM_CREDIT_CARD_INFO")
public class AcrmCreditCardInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_CREDIT_CARD_INFO_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_CREDIT_CARD_INFO_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="BONUS_INTG_ADJ", precision=10)
	private BigDecimal bonusIntgAdj;

	@Column(name="BONUS_INTG_EXG", precision=10)
	private BigDecimal bonusIntgExg;

	@Column(name="BONUS_INTG_INC", precision=10)
	private BigDecimal bonusIntgInc;

	@Column(name="BONUS_INTG_SUM", precision=10)
	private BigDecimal bonusIntgSum;

	@Column(name="CARD_NO", length=35)
	private String cardNo;

	@Column(name="CARD_TYP", length=13)
	private String cardTyp;

	@Column(name="CREDIT_LINE", precision=24, scale=6)
	private BigDecimal creditLine;

	@Column(name="CUST_MERIT_LEVEL", length=13)
	private String custMeritLevel;

	@Column(name="CUST_RISK_LEVEL", length=13)
	private String custRiskLevel;

	@Column(name="CUSTOM_ID", length=21)
	private String customId;

	@Column(name="CUSTOM_NAME", length=200)
	private String customName;

    @Temporal( TemporalType.DATE)
	@Column(name="EXP_DATE")
	private Date expDate;

	@Column(name="IF_AUTO_REPAY", length=13)
	private String ifAutoRepay;

	@Column(name="IF_BY_STAGE", length=13)
	private String ifByStage;

	@Column(name="IF_FIRST_USE", length=13)
	private String ifFirstUse;

	@Column(name="IF_IMP_CARD", length=13)
	private String ifImpCard;

	@Column(name="IF_OVD", length=13)
	private String ifOvd;

	@Column(name="OD_LINE", precision=24, scale=6)
	private BigDecimal odLine;

    @Temporal( TemporalType.DATE)
	@Column(name="PUB_DATE")
	private Date pubDate;

	@Column(name="REPAY_ACCT_NO", length=35)
	private String repayAcctNo;

	@Column(name="TRANS_TYP", length=13)
	private String transTyp;
	
	@Column(name="ODS_ST_DATE", length=10)
	private String odsStDate;
    public String getOdsStDate() {
		return odsStDate;
	}

	public void setOdsStDate(String odsStDate) {
		this.odsStDate = odsStDate;
	}

	public AcrmCreditCardInfo() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getBonusIntgAdj() {
		return this.bonusIntgAdj;
	}

	public void setBonusIntgAdj(BigDecimal bonusIntgAdj) {
		this.bonusIntgAdj = bonusIntgAdj;
	}

	public BigDecimal getBonusIntgExg() {
		return this.bonusIntgExg;
	}

	public void setBonusIntgExg(BigDecimal bonusIntgExg) {
		this.bonusIntgExg = bonusIntgExg;
	}

	public BigDecimal getBonusIntgInc() {
		return this.bonusIntgInc;
	}

	public void setBonusIntgInc(BigDecimal bonusIntgInc) {
		this.bonusIntgInc = bonusIntgInc;
	}

	public BigDecimal getBonusIntgSum() {
		return this.bonusIntgSum;
	}

	public void setBonusIntgSum(BigDecimal bonusIntgSum) {
		this.bonusIntgSum = bonusIntgSum;
	}

	public String getCardNo() {
		return this.cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public String getCardTyp() {
		return this.cardTyp;
	}

	public void setCardTyp(String cardTyp) {
		this.cardTyp = cardTyp;
	}

	public BigDecimal getCreditLine() {
		return this.creditLine;
	}

	public void setCreditLine(BigDecimal creditLine) {
		this.creditLine = creditLine;
	}


	public String getCustMeritLevel() {
		return this.custMeritLevel;
	}

	public void setCustMeritLevel(String custMeritLevel) {
		this.custMeritLevel = custMeritLevel;
	}

	public String getCustRiskLevel() {
		return this.custRiskLevel;
	}

	public void setCustRiskLevel(String custRiskLevel) {
		this.custRiskLevel = custRiskLevel;
	}

	public String getCustomId() {
		return this.customId;
	}

	public void setCustomId(String customId) {
		this.customId = customId;
	}

	public String getCustomName() {
		return this.customName;
	}

	public void setCustomName(String customName) {
		this.customName = customName;
	}

	public Date getExpDate() {
		return this.expDate;
	}

	public void setExpDate(Date expDate) {
		this.expDate = expDate;
	}

	public String getIfAutoRepay() {
		return this.ifAutoRepay;
	}

	public void setIfAutoRepay(String ifAutoRepay) {
		this.ifAutoRepay = ifAutoRepay;
	}

	public String getIfByStage() {
		return this.ifByStage;
	}

	public void setIfByStage(String ifByStage) {
		this.ifByStage = ifByStage;
	}

	public String getIfFirstUse() {
		return this.ifFirstUse;
	}

	public void setIfFirstUse(String ifFirstUse) {
		this.ifFirstUse = ifFirstUse;
	}

	public String getIfImpCard() {
		return this.ifImpCard;
	}

	public void setIfImpCard(String ifImpCard) {
		this.ifImpCard = ifImpCard;
	}

	public String getIfOvd() {
		return this.ifOvd;
	}

	public void setIfOvd(String ifOvd) {
		this.ifOvd = ifOvd;
	}

	public BigDecimal getOdLine() {
		return this.odLine;
	}

	public void setOdLine(BigDecimal odLine) {
		this.odLine = odLine;
	}

	public Date getPubDate() {
		return this.pubDate;
	}

	public void setPubDate(Date pubDate) {
		this.pubDate = pubDate;
	}

	public String getRepayAcctNo() {
		return this.repayAcctNo;
	}

	public void setRepayAcctNo(String repayAcctNo) {
		this.repayAcctNo = repayAcctNo;
	}

	public String getTransTyp() {
		return this.transTyp;
	}

	public void setTransTyp(String transTyp) {
		this.transTyp = transTyp;
	}

}