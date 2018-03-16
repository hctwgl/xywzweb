package com.xywztech.bcrm.sales.model;

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
 * The persistent class for the OCRM_F_MM_ACTI_RECORD database table. 营销活动评价信息表
 */
@Entity
@Table(name = "OCRM_F_MM_ACTI_APPRAISE")
public class ActivityAppraise implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1717384984944942919L;

	/** ID */
	@Id
	@Column(name = "APP_ID")
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	private Long appraiseId;

	/** 营销活动ID */
	@Column(name = "MKT_ACTI_ID", length = 100)
	private String marketActivityId;

	/** 评价内容 */
	@Column(name = "APP_CONTENT", length = 1000)
	private String appraiseContent;

	/** 活动评价人 */
	@Column(name = "CREATE_USER", length = 100)
	private String createUser;

	/** 活动评价日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;

	/** 最近更新人 */
	@Column(name = "UPDATE_USER", length = 100)
	private String updateUser;

	/** 最近更新日期 */
	@Temporal(TemporalType.DATE)
	@Column(name = "UPDATE_DATE")
	private Date updateDate;
	
	/** 综合得分 */
	@Column(name = "GETSCORE")
	private Integer score;
	
	/** 活动针对性评分 */
	@Column(name = "ACTI_PERTINENCY_SCORE")
	private Integer actiPertinentyScore;
	
	/** 活动时效性评分 */
	@Column(name = "ACTI_SFL_SCORE")
	private Integer actiSflScore;
	
	/** 活动客户反映评分 */
	@Column(name = "ACTI_CUST_REF_SCORE")
	private Integer actiCustRefScore;
	
	/** 活动竞争性评分 */
	@Column(name = "ACTI_COMPET_SCORE")
	private Integer actiCompetScore;
	
	/** 活动市场影响评分 */
	@Column(name = "ACTI_MKT_INFLUENCE_SCORE")
	private Integer actiMktInfluenceScore;
	
	/** 针对性描述 */
	@Column(name = "PERTINENCY_DESC", length = 500)
	private String pertinencyDesc;
	
	/** 时效性描述 */
	@Column(name = "SFL_DESC", length = 500)
	private String sflDesc;
	
	/** 客户反映描述 */
	@Column(name = "CUST_REF_DESC", length = 500)
	private String custRefDesc;
	
	/** 竞争性描述 */
	@Column(name = "COMPET_DESC", length = 500)
	private String competDesc;
	
	/** 市场影响描述 */
	@Column(name = "MKT_INFLUENCE_DESC", length = 500)
	private String mktInfluenceDesc;
	
	public String getPertinencyDesc() {
		return pertinencyDesc;
	}

	public void setPertinencyDesc(String pertinencyDesc) {
		this.pertinencyDesc = pertinencyDesc;
	}

	public String getSflDesc() {
		return sflDesc;
	}

	public void setSflDesc(String sflDesc) {
		this.sflDesc = sflDesc;
	}

	public String getCustRefDesc() {
		return custRefDesc;
	}

	public void setCustRefDesc(String custRefDesc) {
		this.custRefDesc = custRefDesc;
	}

	public String getCompetDesc() {
		return competDesc;
	}

	public void setCompetDesc(String competDesc) {
		this.competDesc = competDesc;
	}

	public String getMktInfluenceDesc() {
		return mktInfluenceDesc;
	}

	public void setMktInfluenceDesc(String mktInfluenceDesc) {
		this.mktInfluenceDesc = mktInfluenceDesc;
	}

	public Integer getActiMktInfluenceScore() {
		return actiMktInfluenceScore;
	}

	public void setActiMktInfluenceScore(Integer actiMktInfluenceScore) {
		this.actiMktInfluenceScore = actiMktInfluenceScore;
	}

	public Integer getActiCompetScore() {
		return actiCompetScore;
	}

	public void setActiCompetScore(Integer actiCompetScore) {
		this.actiCompetScore = actiCompetScore;
	}

	public Integer getActiCustRefScore() {
		return actiCustRefScore;
	}

	public void setActiCustRefScore(Integer actiCustRefScore) {
		this.actiCustRefScore = actiCustRefScore;
	}

	public Integer getActiSflScore() {
		return actiSflScore;
	}

	public void setActiSflScore(Integer actiSflScore) {
		this.actiSflScore = actiSflScore;
	}

	public Integer getActiPertinentyScore() {
		return actiPertinentyScore;
	}

	public void setActiPertinentyScore(Integer actiPertinentyScore) {
		this.actiPertinentyScore = actiPertinentyScore;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

	public Long getAppraiseId() {
		return appraiseId;
	}

	public void setAppraiseId(Long appraiseId) {
		this.appraiseId = appraiseId;
	}

	public String getMarketActivityId() {
		return marketActivityId;
	}

	public void setMarketActivityId(String marketActivityId) {
		this.marketActivityId = marketActivityId;
	}

	public String getAppraiseContent() {
		return appraiseContent;
	}

	public void setAppraiseContent(String appraiseContent) {
		this.appraiseContent = appraiseContent;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}