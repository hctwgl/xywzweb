package com.xywz.sale.model;
import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_sale_frgn_quotn_sngl database table.
 * 
 */
@Entity
@Table(name="xywz_sale_frgn_quotn_sngl")
public class XywzSaleFrgnQuotnSngl implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="QUOTN_SNGL_ID")
	private Long quotnSnglId;

	@Column(name="CHK_STAT")
	private String chkStat;

	@Column(name="DELIVERY_TERM")
	private BigDecimal deliveryTerm;

    @Temporal( TemporalType.DATE)
	@Column(name="DELIVERY_TIME")
	private Date deliveryTime;

	@Column(name="DELIVERY_WEIGHT")
	private BigDecimal deliveryWeight;

    @Temporal( TemporalType.DATE)
	@Column(name="INPUT_DT")
	private Date inputDt;

	@Column(name="INPUT_PERS_ID")
	private String inputPersId;

	@Column(name="INPUT_PERS_NM")
	private String inputPersNm;

    @Temporal( TemporalType.DATE)
	@Column(name="ISSU_DT")
	private Date issuDt;

	@Column(name="LAST_MDFR")
	private String lastMdfr;

	@Column(name="LAST_MDFR_ID")
	private String lastMdfrId;

    @Temporal( TemporalType.DATE)
	@Column(name="LAST_MODI_DT")
	private Date lastModiDt;

	@Column(name="PAY_SPFY")
	private String paySpfy;

	@Column(name="PKG")
	private String pkg;

	@Column(name="PORTOF_DISCHARGE")
	private String portofDischarge;

	@Column(name="PORTOF_LOADING")
	private String portofLoading;

	@Column(name="PRC_COND")
	private String prcCond;

    @Temporal( TemporalType.DATE)
	@Column(name="QUOTN_DT")
	private Date quotnDt;

	@Column(name="QUOTN_SNGL_NUM")
	private String quotnSnglNum;

	@Column(name="QUOTN_VALID_PRD")
	private BigDecimal quotnValidPrd;

	@Column(name="TOLERANCE")
	private BigDecimal tolerance;

    public XywzSaleFrgnQuotnSngl() {
    }

	public Long getQuotnSnglId() {
		return this.quotnSnglId;
	}

	public void setQuotnSnglId(Long quotnSnglId) {
		this.quotnSnglId = quotnSnglId;
	}

	public String getChkStat() {
		return this.chkStat;
	}

	public void setChkStat(String chkStat) {
		this.chkStat = chkStat;
	}

	public BigDecimal getDeliveryTerm() {
		return this.deliveryTerm;
	}

	public void setDeliveryTerm(BigDecimal deliveryTerm) {
		this.deliveryTerm = deliveryTerm;
	}

	public Date getDeliveryTime() {
		return this.deliveryTime;
	}

	public void setDeliveryTime(Date deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public BigDecimal getDeliveryWeight() {
		return this.deliveryWeight;
	}

	public void setDeliveryWeight(BigDecimal deliveryWeight) {
		this.deliveryWeight = deliveryWeight;
	}

	public Date getInputDt() {
		return this.inputDt;
	}

	public void setInputDt(Date inputDt) {
		this.inputDt = inputDt;
	}

	public String getInputPersId() {
		return this.inputPersId;
	}

	public void setInputPersId(String inputPersId) {
		this.inputPersId = inputPersId;
	}

	public String getInputPersNm() {
		return this.inputPersNm;
	}

	public void setInputPersNm(String inputPersNm) {
		this.inputPersNm = inputPersNm;
	}

	public Date getIssuDt() {
		return this.issuDt;
	}

	public void setIssuDt(Date issuDt) {
		this.issuDt = issuDt;
	}

	public String getLastMdfr() {
		return this.lastMdfr;
	}

	public void setLastMdfr(String lastMdfr) {
		this.lastMdfr = lastMdfr;
	}

	public String getLastMdfrId() {
		return this.lastMdfrId;
	}

	public void setLastMdfrId(String lastMdfrId) {
		this.lastMdfrId = lastMdfrId;
	}

	public Date getLastModiDt() {
		return this.lastModiDt;
	}

	public void setLastModiDt(Date lastModiDt) {
		this.lastModiDt = lastModiDt;
	}

	public String getPaySpfy() {
		return this.paySpfy;
	}

	public void setPaySpfy(String paySpfy) {
		this.paySpfy = paySpfy;
	}

	public String getPkg() {
		return this.pkg;
	}

	public void setPkg(String pkg) {
		this.pkg = pkg;
	}

	public String getPortofDischarge() {
		return this.portofDischarge;
	}

	public void setPortofDischarge(String portofDischarge) {
		this.portofDischarge = portofDischarge;
	}

	public String getPortofLoading() {
		return this.portofLoading;
	}

	public void setPortofLoading(String portofLoading) {
		this.portofLoading = portofLoading;
	}

	public String getPrcCond() {
		return this.prcCond;
	}

	public void setPrcCond(String prcCond) {
		this.prcCond = prcCond;
	}

	public Date getQuotnDt() {
		return this.quotnDt;
	}

	public void setQuotnDt(Date quotnDt) {
		this.quotnDt = quotnDt;
	}

	public String getQuotnSnglNum() {
		return this.quotnSnglNum;
	}

	public void setQuotnSnglNum(String quotnSnglNum) {
		this.quotnSnglNum = quotnSnglNum;
	}

	public BigDecimal getQuotnValidPrd() {
		return this.quotnValidPrd;
	}

	public void setQuotnValidPrd(BigDecimal quotnValidPrd) {
		this.quotnValidPrd = quotnValidPrd;
	}

	public BigDecimal getTolerance() {
		return this.tolerance;
	}

	public void setTolerance(BigDecimal tolerance) {
		this.tolerance = tolerance;
	}

}