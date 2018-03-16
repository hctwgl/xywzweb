package com.xywztech.bcrm.custmanager.model;

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
 * The persistent class for the OCRM_F_CM_MKT_TEAM database table. 
 * 营销团队表
 */
@Entity
@Table(name = "OCRM_F_CM_MKT_TEAM")
public class MarketTeam implements Serializable {

	private static final long serialVersionUID = -6733928454609401975L;

	/** 营销团队ID */
	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "MKT_TEAM_ID", nullable = false)
	private Long marketTeamId;

	/** 创建时间 */
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;

	/** 创建人 */
	@Column(name = "CREATE_USER", length = 100)
	private String createUser;
	
	/** 创建人姓名 */
	@Column(name = "CREATE_USER_NAME", length = 100)
	private String createUserName;
	
	/** 创建人ID */
	@Column(name = "CREATE_USER_ID", length = 100)
	private String createUserId;
	
	/** 创建人所属机构ID */
	@Column(name = "CREATE_USER_ORG_ID", length = 100)
	private String createUserOrgId;
	
	/**团队成员数*/
	@Column(name = "TEAM_NO")
	private Integer teamNumber;
	
	/**团队客户数*/
	@Column(name = "TEAM_CUS_NO")
	private Integer teamCustomerNumber;

//	/** 是否中小企业营销团队 */
//	@Column(name = "IS_SMALL", length = 20)
//	private String isSmall;

	/** 营销团队名称 */
	@Column(name = "MKT_TEAM_NAME", length = 200)
	private String marketTeamName;

	/** 所属机构 */
	@Column(name = "ORG_ID", length = 100)
	private String organizationId;

	/** 团队负责人 */
	@Column(name = "TEAM_LEADER", length = 100)
	private String teamLeader;
	

	/** 团队负责人 */
	@Column(name = "TEAM_LEADER_ID", length = 100)
	private String teamLeaderId;
	
	/** 团队状态 */
	@Column(name = "TEAM_STATUS", length = 100)
	private String teamstatus;
	

	/** 团队负责人联系电话 */
	@Column(name = "LEAD_TELEPHONE", length = 100)
	private String leadTelephone;

//	// bi-directional many-to-one association to OcrmFCmMktTeamCust
//	@OneToMany(mappedBy = "marketTeam")
//	private Set<MarketTeamCustomer> MarketTeamCustomer;
//
//	// bi-directional many-to-one association to OcrmFCmTeamCustMANAGER
//	@OneToMany(mappedBy = "marketTeam1")
//	private Set<TeamCustomerManager> TeamCustomerManager;

	public Long getMarketTeamId() {
		return marketTeamId;
	}

	public void setMarketTeamId(Long marketTeamId) {
		this.marketTeamId = marketTeamId;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public Integer getTeamNumber() {
		return teamNumber;
	}

	public void setTeamNumber(Integer teamNumber) {
		this.teamNumber = teamNumber;
	}

	public Integer getTeamCustomerNumber() {
		return teamCustomerNumber;
	}

	public void setTeamCustomerNumber(Integer teamCustomerNumber) {
		this.teamCustomerNumber = teamCustomerNumber;
	}

	public String getMarketTeamName() {
		return marketTeamName;
	}

	public void setMarketTeamName(String marketTeamName) {
		this.marketTeamName = marketTeamName;
	}

	public String getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(String organizationId) {
		this.organizationId = organizationId;
	}

	public String getTeamstatus() {
		return teamstatus;
	}

	public void setTeamstatus(String teamstatus) {
		this.teamstatus = teamstatus;
	}

	public String getLeadTelephone() {
		return leadTelephone;
	}

	public void setLeadTelephone(String leadTelephone) {
		this.leadTelephone = leadTelephone;
	}

	public String getTeamLeader() {
		return teamLeader;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getTeamLeaderId() {
		return teamLeaderId;
	}

	public void setTeamLeaderId(String teamLeaderId) {
		this.teamLeaderId = teamLeaderId;
	}

	public String getCreateUserOrgId() {
		return createUserOrgId;
	}

	public void setCreateUserOrgId(String createUserOrgId) {
		this.createUserOrgId = createUserOrgId;
	}

	public void setTeamLeader(String teamLeader) {
		this.teamLeader = teamLeader;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}