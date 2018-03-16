package com.xywztech.bcrm.custmanager.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
 * The persistent class for the   OCRM_F_WP_WORKLOG_DAYLOG
 database table.
 * 
 */
@Entity
@Table(name="OCRM_F_WP_WORKLOG_DAYLOG")
public class OcrmFWpWorklogDaylog implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
	@Column(name = "LOGID", nullable = false)
	private Long logid;

    @Temporal( TemporalType.DATE)
	private Date etldate;
    
    @Temporal( TemporalType.DATE)
	private Date adddate;

	private BigDecimal loancombal;

	private String loancomname;

	private String loanproce;

	private String monweekplan;

	private String needtodo;

	private String newctvitme;

	private String newcustname;

	private String newcusttel;

	private String newcustthing;

	private String newcustvtman;

	private String oldctvitme;

	private String oldcustname;

	private String oldcusttel;

	private String oldcustthing;

	private String oldcustvtman;

	private String owenerid;

	private String owenername;

    public OcrmFWpWorklogDaylog() {
    }

	public Long getLogid() {
		return this.logid;
	}

	public void setLogid(Long logid) {
		this.logid = logid;
	}

	public Date getEtldate() {
		return this.etldate;
	}

	public void setEtldate(Date etldate) {
		this.etldate = etldate;
	}

	public Date getAdddate() {
		return this.adddate;
	}

	public void setAdddate(Date adddate) {
		this.adddate = adddate;
	}

	public BigDecimal getLoancombal() {
		return this.loancombal;
	}

	public void setLoancombal(BigDecimal loancombal) {
		this.loancombal = loancombal;
	}

	public String getLoancomname() {
		return this.loancomname;
	}

	public void setLoancomname(String loancomname) {
		this.loancomname = loancomname;
	}

	public String getLoanproce() {
		return this.loanproce;
	}

	public void setLoanproce(String loanproce) {
		this.loanproce = loanproce;
	}

	public String getMonweekplan() {
		return this.monweekplan;
	}

	public void setMonweekplan(String monweekplan) {
		this.monweekplan = monweekplan;
	}

	public String getNeedtodo() {
		return this.needtodo;
	}

	public void setNeedtodo(String needtodo) {
		this.needtodo = needtodo;
	}

	public String getNewctvitme() {
		return this.newctvitme;
	}

	public void setNewctvitme(String newctvitme) {
		this.newctvitme = newctvitme;
	}

	public String getNewcustname() {
		return this.newcustname;
	}

	public void setNewcustname(String newcustname) {
		this.newcustname = newcustname;
	}

	public String getNewcusttel() {
		return this.newcusttel;
	}

	public void setNewcusttel(String newcusttel) {
		this.newcusttel = newcusttel;
	}

	public String getNewcustthing() {
		return this.newcustthing;
	}

	public void setNewcustthing(String newcustthing) {
		this.newcustthing = newcustthing;
	}

	public String getNewcustvtman() {
		return this.newcustvtman;
	}

	public void setNewcustvtman(String newcustvtman) {
		this.newcustvtman = newcustvtman;
	}

	public String getOldctvitme() {
		return this.oldctvitme;
	}

	public void setOldctvitme(String oldctvitme) {
		this.oldctvitme = oldctvitme;
	}

	public String getOldcustname() {
		return this.oldcustname;
	}

	public void setOldcustname(String oldcustname) {
		this.oldcustname = oldcustname;
	}

	public String getOldcusttel() {
		return this.oldcusttel;
	}

	public void setOldcusttel(String oldcusttel) {
		this.oldcusttel = oldcusttel;
	}

	public String getOldcustthing() {
		return this.oldcustthing;
	}

	public void setOldcustthing(String oldcustthing) {
		this.oldcustthing = oldcustthing;
	}

	public String getOldcustvtman() {
		return this.oldcustvtman;
	}

	public void setOldcustvtman(String oldcustvtman) {
		this.oldcustvtman = oldcustvtman;
	}

	public String getOwenerid() {
		return this.owenerid;
	}

	public void setOwenerid(String owenerid) {
		this.owenerid = owenerid;
	}

	public String getOwenername() {
		return this.owenername;
	}

	public void setOwenername(String owenername) {
		this.owenername = owenername;
	}

}