package com.xywztech.bcrm.model;

import java.io.Serializable;
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
 * The persistent class for the OCRM_F_MM_MKT_THI_APPLY database table.
 * 
 */
@Entity
@Table(name="OCRM_F_MM_MKT_THI_APPLY")
public class OcrmFMmMktThiApply implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="OCRM_F_MM_MKT_THI_APPLY_APPLYID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OCRM_F_MM_MKT_THI_APPLY_APPLYID_GENERATOR")
	@Column(name="APPLY_ID", unique=true, nullable=false)
	private Long applyId;

    @Temporal( TemporalType.DATE)
	@Column(name="ACTI_DATE")
	private Date actiDate;

	@Column(name="ACTI_USER", length=200)
	private String actiUser;

	@Column(name="APPROVE_STAT", length=13)
	private String approveStat;

	@Column(name="COMM_WAY", length=13)
	private String commWay;

    @Temporal( TemporalType.DATE)
	@Column(name="CREATE_DATE")
	private Date createDate;

	@Column(name="CREATE_USER", length=200)
	private String createUser;

	@Column(name="MKT_ACTI_ID", nullable=false)
	private Long mktActiId;

	@Column(name="MKT_ACTIVITY_NAME", length=200)
	private String mktActivityName;

	@Column(name="REFUSE_REASON", length=800)
	private String refuseReason;

	@Column(name="USE_EFFECT_FEEDBACK", length=800)
	private String useEffectFeedback;

    public OcrmFMmMktThiApply() {
    }

	public Long getApplyId() {
		return this.applyId;
	}

	public void setApplyId(Long applyId) {
		this.applyId = applyId;
	}

	public Date getActiDate() {
		return this.actiDate;
	}

	public void setActiDate(Date actiDate) {
		this.actiDate = actiDate;
	}

	public String getActiUser() {
		return this.actiUser;
	}

	public void setActiUser(String actiUser) {
		this.actiUser = actiUser;
	}

	public String getApproveStat() {
		return this.approveStat;
	}

	public void setApproveStat(String approveStat) {
		this.approveStat = approveStat;
	}

	public String getCommWay() {
		return this.commWay;
	}

	public void setCommWay(String commWay) {
		this.commWay = commWay;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateUser() {
		return this.createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public Long getMktActiId() {
		return this.mktActiId;
	}

	public void setMktActiId(Long mktActiId) {
		this.mktActiId = mktActiId;
	}

	public String getMktActivityName() {
		return this.mktActivityName;
	}

	public void setMktActivityName(String mktActivityName) {
		this.mktActivityName = mktActivityName;
	}

	public String getRefuseReason() {
		return this.refuseReason;
	}

	public void setRefuseReason(String refuseReason) {
		this.refuseReason = refuseReason;
	}

	public String getUseEffectFeedback() {
		return this.useEffectFeedback;
	}

	public void setUseEffectFeedback(String useEffectFeedback) {
		this.useEffectFeedback = useEffectFeedback;
	}

}