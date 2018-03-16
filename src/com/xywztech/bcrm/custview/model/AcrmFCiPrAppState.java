package com.xywztech.bcrm.custview.model;

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
 * The persistent class for the ACRM_F_CI_PR_APP_STATE database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_PR_APP_STATE")
public class AcrmFCiPrAppState implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_PR_APP_STATE_PROJECTID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_PR_APP_STATE_PROJECTID_GENERATOR")
	@Column(name="PROJECT_ID", unique=true, nullable=false)
	private Integer projectId;

	@Column(name="CUST_ID")
	private String custId;

    @Temporal( TemporalType.DATE)
	@Column(name="DESIGN_DVLP_APP_DATE")
	private Date designDvlpAppDate;

	@Column(name="DESIGN_DVLP_APPROVER")
	private String designDvlpApprover;

	@Column(name="DESIGN_DVLP_DOC_NUM")
	private String designDvlpDocNum;

    @Temporal( TemporalType.DATE)
	@Column(name="FSBLT_REP_APP_DATE")
	private Date fsbltRepAppDate;

	@Column(name="FSBLT_REP_APPROVER")
	private String fsbltRepApprover;

	@Column(name="FSBLT_REP_DOC_NUM")
	private String fsbltRepDocNum;

    @Temporal( TemporalType.DATE)
	@Column(name="IVS_PLAN_APP_DATE")
	private Date ivsPlanAppDate;

	@Column(name="IVS_PLAN_APPROVER")
	private String ivsPlanApprover;

	@Column(name="IVS_PLAN_DOC_NUM")
	private String ivsPlanDocNum;

    @Temporal( TemporalType.DATE)
	@Column(name="LEGAL_LICENCE_APP_DATE")
	private Date legalLicenceAppDate;

	@Column(name="LEGAL_LICENSE_APPROVER")
	private String legalLicenseApprover;

	@Column(name="LEGAL_LICENSE_DOC_NUM")
	private String legalLicenseDocNum;

    @Temporal( TemporalType.DATE)
	@Column(name="PRJ_PRO_APP_DATE")
	private Date prjProAppDate;

	@Column(name="PRJ_PRO_APPROVER")
	private String prjProApprover;

	@Column(name="PRJ_PRO_DOC_NUM")
	private String prjProDocNum;

    @Temporal( TemporalType.DATE)
	@Column(name="PRJ_REPLY_APP_DATE")
	private Date prjReplyAppDate;

	@Column(name="PRJ_REPLY_APPROVER")
	private String prjReplyApprover;

	@Column(name="PRJ_REPLY_DOC_NUM")
	private String prjReplyDocNum;

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public Date getDesignDvlpAppDate() {
		return designDvlpAppDate;
	}

	public void setDesignDvlpAppDate(Date designDvlpAppDate) {
		this.designDvlpAppDate = designDvlpAppDate;
	}

	public String getDesignDvlpApprover() {
		return designDvlpApprover;
	}

	public void setDesignDvlpApprover(String designDvlpApprover) {
		this.designDvlpApprover = designDvlpApprover;
	}

	public String getDesignDvlpDocNum() {
		return designDvlpDocNum;
	}

	public void setDesignDvlpDocNum(String designDvlpDocNum) {
		this.designDvlpDocNum = designDvlpDocNum;
	}

	public Date getFsbltRepAppDate() {
		return fsbltRepAppDate;
	}

	public void setFsbltRepAppDate(Date fsbltRepAppDate) {
		this.fsbltRepAppDate = fsbltRepAppDate;
	}

	public String getFsbltRepApprover() {
		return fsbltRepApprover;
	}

	public void setFsbltRepApprover(String fsbltRepApprover) {
		this.fsbltRepApprover = fsbltRepApprover;
	}

	public String getFsbltRepDocNum() {
		return fsbltRepDocNum;
	}

	public void setFsbltRepDocNum(String fsbltRepDocNum) {
		this.fsbltRepDocNum = fsbltRepDocNum;
	}

	public Date getIvsPlanAppDate() {
		return ivsPlanAppDate;
	}

	public void setIvsPlanAppDate(Date ivsPlanAppDate) {
		this.ivsPlanAppDate = ivsPlanAppDate;
	}

	public String getIvsPlanApprover() {
		return ivsPlanApprover;
	}

	public void setIvsPlanApprover(String ivsPlanApprover) {
		this.ivsPlanApprover = ivsPlanApprover;
	}

	public String getIvsPlanDocNum() {
		return ivsPlanDocNum;
	}

	public void setIvsPlanDocNum(String ivsPlanDocNum) {
		this.ivsPlanDocNum = ivsPlanDocNum;
	}

	public Date getLegalLicenceAppDate() {
		return legalLicenceAppDate;
	}

	public void setLegalLicenceAppDate(Date legalLicenceAppDate) {
		this.legalLicenceAppDate = legalLicenceAppDate;
	}

	public String getLegalLicenseApprover() {
		return legalLicenseApprover;
	}

	public void setLegalLicenseApprover(String legalLicenseApprover) {
		this.legalLicenseApprover = legalLicenseApprover;
	}

	public String getLegalLicenseDocNum() {
		return legalLicenseDocNum;
	}

	public void setLegalLicenseDocNum(String legalLicenseDocNum) {
		this.legalLicenseDocNum = legalLicenseDocNum;
	}

	public Date getPrjProAppDate() {
		return prjProAppDate;
	}

	public void setPrjProAppDate(Date prjProAppDate) {
		this.prjProAppDate = prjProAppDate;
	}

	public String getPrjProApprover() {
		return prjProApprover;
	}

	public void setPrjProApprover(String prjProApprover) {
		this.prjProApprover = prjProApprover;
	}

	public String getPrjProDocNum() {
		return prjProDocNum;
	}

	public void setPrjProDocNum(String prjProDocNum) {
		this.prjProDocNum = prjProDocNum;
	}

	public Date getPrjReplyAppDate() {
		return prjReplyAppDate;
	}

	public void setPrjReplyAppDate(Date prjReplyAppDate) {
		this.prjReplyAppDate = prjReplyAppDate;
	}

	public String getPrjReplyApprover() {
		return prjReplyApprover;
	}

	public void setPrjReplyApprover(String prjReplyApprover) {
		this.prjReplyApprover = prjReplyApprover;
	}

	public String getPrjReplyDocNum() {
		return prjReplyDocNum;
	}

	public void setPrjReplyDocNum(String prjReplyDocNum) {
		this.prjReplyDocNum = prjReplyDocNum;
	}
}