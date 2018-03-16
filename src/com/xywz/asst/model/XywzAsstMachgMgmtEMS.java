package com.xywz.asst.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the xywz_asst_machg_mgmt_ems database table.
 * 
 */
@Entity
@Table(name="xywz_asst_machg_mgmt_ems")
public class XywzAsstMachgMgmtEMS implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;

	@Column(name="ASST_MACHG_ID")
	private String asstMachgId;

	@Column(name="ESM_CORP")
	private String esmCorp;

	@Column(name="ACCT_NUM")
	private String acctNum;

	@Column(name="MEMO")
	private String memo;

    public XywzAsstMachgMgmtEMS() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAsstMachgId() {
		return this.asstMachgId;
	}

	public void setAsstMachgId(String asstMachgId) {
		this.asstMachgId = asstMachgId;
	}

	public String getEsmCorp() {
		return this.esmCorp;
	}

	public void setEsmCorp(String esmCorp) {
		this.esmCorp = esmCorp;
	}

	public String getAcctNum() {
		return this.acctNum;
	}

	public void setAcctNum(String acctNum) {
		this.acctNum = acctNum;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setmemo(String memo) {
		this.memo = memo;
	}

}