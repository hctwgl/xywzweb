package com.xywz.logi.model;

import java.io.Serializable;
import javax.persistence.*;

import java.math.BigInteger;


/**
 * The persistent class for the xywz_logi_goods_agent_corp_mgmt database table.
 * 
 */
@Entity
@Table(name="xywz_logi_goods_agent_corp_mgmt")
public class XywzLogiGoodsAgentCorpMgmt implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="AGENT_ID")
	private BigInteger agentId;
	
	@Column(name="ADDR")
	private String addr;


	@Column(name="AGENT_NAMR")
	private String agentNamr;

	@Column(name="AGENT_NUM")
	private String agentNum;

	@Column(name="CONTACT_EMAIL")
	private String contactEmail;

	@Column(name="CONTACT_MOBILE")
	private String contactMobile;

	@Column(name="CONTACT_PER")
	private String contactPer;

	@Column(name="CONTACT_PHONE")
	private String contactPhone;

    public XywzLogiGoodsAgentCorpMgmt() {
    }

	public String getAddr() {
		return this.addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public BigInteger getAgentId() {
		return this.agentId;
	}

	public void setAgentId(BigInteger agentId) {
		this.agentId = agentId;
	}

	public String getAgentNamr() {
		return this.agentNamr;
	}

	public void setAgentNamr(String agentNamr) {
		this.agentNamr = agentNamr;
	}

	public String getAgentNum() {
		return this.agentNum;
	}

	public void setAgentNum(String agentNum) {
		this.agentNum = agentNum;
	}

	public String getContactEmail() {
		return this.contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public String getContactMobile() {
		return this.contactMobile;
	}

	public void setContactMobile(String contactMobile) {
		this.contactMobile = contactMobile;
	}

	public String getContactPer() {
		return this.contactPer;
	}

	public void setContactPer(String contactPer) {
		this.contactPer = contactPer;
	}

	public String getContactPhone() {
		return this.contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

}