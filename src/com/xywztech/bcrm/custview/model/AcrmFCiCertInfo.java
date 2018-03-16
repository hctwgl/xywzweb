package com.xywztech.bcrm.custview.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 证件主要信息 model
 * @author sxs
 * @since 2012-9-26
 */
@Entity
@Table(name="ACRM_F_CI_CERT_INFO")
public class AcrmFCiCertInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name="ID")
	private Long id;

	@Column(name="AS_ANN_ID")
	private String asAnnId;//年检标识

	@Column(name="CARD_ON_NAME")
	private String cardOnName;//证件上名称

	@Column(name="CRET_NO")
	private String cretNo;//证件号码

	@Column(name="CRET_TYPE")
	private String cretType;//证件类型

	@Column(name="CUST_ID")
	private String custId;//客户号

    @Temporal( TemporalType.DATE)
	@Column(name="ISSUE_DATE")
	private Date issueDate;//证件登记日期

    @Temporal( TemporalType.DATE)
	@Column(name="LOST_DATE")
	private Date lostDate;//证件到期日

	@Column(name="TACK_INSTN")
	private String tackInstn;//发证机构

    public AcrmFCiCertInfo() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAsAnnId() {
		return this.asAnnId;
	}

	public void setAsAnnId(String asAnnId) {
		this.asAnnId = asAnnId;
	}

	public String getCardOnName() {
		return this.cardOnName;
	}

	public void setCardOnName(String cardOnName) {
		this.cardOnName = cardOnName;
	}

	public String getCretNo() {
		return this.cretNo;
	}

	public void setCretNo(String cretNo) {
		this.cretNo = cretNo;
	}

	public String getCretType() {
		return this.cretType;
	}

	public void setCretType(String cretType) {
		this.cretType = cretType;
	}

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public Date getIssueDate() {
		return this.issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}

	public Date getLostDate() {
		return this.lostDate;
	}

	public void setLostDate(Date lostDate) {
		this.lostDate = lostDate;
	}

	public String getTackInstn() {
		return this.tackInstn;
	}

	public void setTackInstn(String tackInstn) {
		this.tackInstn = tackInstn;
	}

}