package com.xywztech.bcrm.custview.model;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * The persistent class for the ACRM_F_CI_DEMAND_INFO database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_DEMAND_INFO")
public class AcrmFCiDemandInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_DEMAND_INFO_ID_GENERATOR" , sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_DEMAND_INFO_ID_GENERATOR")
	@Column(unique=true, nullable=false)
	private Long id;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="ESPECIAL_DEMAND")
	private String especialDemand;

	@Column(name="EXP_FINA_MGR_LINK_WAY")
	private String expFinaMgrLinkWay;

	@Column(name="EXP_FINANC_SER")
	private String expFinancSer;

	@Column(name="EXP_JOIN_SALON_ACTIV")
	private String expJoinSalonActiv;

	@Column(name="EXP_LINK_TIME")
	private String expLinkTime;

	@Column(name="EXP_REC_FINAN_INFO")
	private String expRecFinanInfo;

	@Column(name="PERSON_HOBBY")
	private String personHobby;

	@Column(name="PRESENT_REC_ADDR")
	private String presentRecAddr;

	@Column(name="PRESENT_REC_LINK_PHON")
	private String presentRecLinkPhon;

	@Column(name="PRESENT_REC_NAME")
	private String presentRecName;

	private String remark;

	private String taboo;

    public AcrmFCiDemandInfo() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getEspecialDemand() {
		return this.especialDemand;
	}

	public void setEspecialDemand(String especialDemand) {
		this.especialDemand = especialDemand;
	}

	public String getExpFinaMgrLinkWay() {
		return this.expFinaMgrLinkWay;
	}

	public void setExpFinaMgrLinkWay(String expFinaMgrLinkWay) {
		this.expFinaMgrLinkWay = expFinaMgrLinkWay;
	}

	public String getExpFinancSer() {
		return this.expFinancSer;
	}

	public void setExpFinancSer(String expFinancSer) {
		this.expFinancSer = expFinancSer;
	}

	public String getExpJoinSalonActiv() {
		return this.expJoinSalonActiv;
	}

	public void setExpJoinSalonActiv(String expJoinSalonActiv) {
		this.expJoinSalonActiv = expJoinSalonActiv;
	}

	public String getExpLinkTime() {
		return this.expLinkTime;
	}

	public void setExpLinkTime(String expLinkTime) {
		this.expLinkTime = expLinkTime;
	}

	public String getExpRecFinanInfo() {
		return this.expRecFinanInfo;
	}

	public void setExpRecFinanInfo(String expRecFinanInfo) {
		this.expRecFinanInfo = expRecFinanInfo;
	}

	public String getPersonHobby() {
		return this.personHobby;
	}

	public void setPersonHobby(String personHobby) {
		this.personHobby = personHobby;
	}

	public String getPresentRecAddr() {
		return this.presentRecAddr;
	}

	public void setPresentRecAddr(String presentRecAddr) {
		this.presentRecAddr = presentRecAddr;
	}

	public String getPresentRecLinkPhon() {
		return this.presentRecLinkPhon;
	}

	public void setPresentRecLinkPhon(String presentRecLinkPhon) {
		this.presentRecLinkPhon = presentRecLinkPhon;
	}

	public String getPresentRecName() {
		return this.presentRecName;
	}

	public void setPresentRecName(String presentRecName) {
		this.presentRecName = presentRecName;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getTaboo() {
		return this.taboo;
	}

	public void setTaboo(String taboo) {
		this.taboo = taboo;
	}

}