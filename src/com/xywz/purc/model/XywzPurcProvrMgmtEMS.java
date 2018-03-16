package com.xywz.purc.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the xywz_purc_provr_mgmt_ems database table.
 * 
 */
@Entity
@Table(name="xywz_purc_provr_mgmt_ems")
public class XywzPurcProvrMgmtEMS implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;

	@Column(name="ACCT_NUM")
	private String acctNum;

	@Column(name="EMS_CORP")
	private String emsCorp;

	@Column(name="MEMO")
	private String memo;

	@Column(name="PROVR_NUM")
	private String provrNum;

    public XywzPurcProvrMgmtEMS() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAcctNum() {
		return this.acctNum;
	}

	public void setAcctNum(String acctNum) {
		this.acctNum = acctNum;
	}

	public String getEmsCorp() {
		return this.emsCorp;
	}

	public void setEmsCorp(String emsCorp) {
		this.emsCorp = emsCorp;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getProvrNum() {
		return this.provrNum;
	}

	public void setProvrNum(String provrNum) {
		this.provrNum = provrNum;
	}

}