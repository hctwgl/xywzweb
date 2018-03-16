package com.xywz.sysm.model;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;


/**
 * The persistent class for the xywz_sysm_msg_rmnd database table.
 * 
 */
@Entity
@Table(name="xywz_sysm_msg_rmnd")
public class XywzSysmMsgRmnd implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="REM_ID")
	private Long remId;

    @Temporal( TemporalType.DATE)
	@Column(name="OPER_DT")
	private Date operDt;

	@Column(name="READ_FLAG")
	private String readFlag;

	@Column(name="RECV_CSTID")
	private String recvCstid;

	@Column(name="RECV_CSTNM")
	private String recvCstnm;

    @Temporal( TemporalType.DATE)
	@Column(name="REM_BEG_DT")
	private Date remBegDt;

	@Column(name="REM_CONTENT")
	private String remContent;

    @Temporal( TemporalType.DATE)
	@Column(name="REM_END_DT")
	private Date remEndDt;

	@Column(name="REM_NAME")
	private String remName;

	@Column(name="REM_TOUCH_CSTID")
	private String remTouchCstid;

	@Column(name="REM_TOUCH_CSTNM")
	private String remTouchCstnm;

	@Column(name="REM_TYPE")
	private String remType;

	@Column(name="VALID_FLAG")
	private String validFlag;
	
	@Column(name="READ_CSTID")
	private String readCstid;

	@Column(name="READ_CSTNM")
	private String readCstnm;

    public XywzSysmMsgRmnd() {
    }

	public Long getRemId() {
		return this.remId;
	}

	public void setRemId(Long remId) {
		this.remId = remId;
	}

	public Date getOperDt() {
		return this.operDt;
	}

	public void setOperDt(Date operDt) {
		this.operDt = operDt;
	}

	public String getReadFlag() {
		return this.readFlag;
	}

	public void setReadFlag(String readFlag) {
		this.readFlag = readFlag;
	}

	public String getRecvCstid() {
		return this.recvCstid;
	}

	public void setRecvCstid(String recvCstid) {
		this.recvCstid = recvCstid;
	}

	public String getRecvCstnm() {
		return this.recvCstnm;
	}

	public void setRecvCstnm(String recvCstnm) {
		this.recvCstnm = recvCstnm;
	}

	public Date getRemBegDt() {
		return this.remBegDt;
	}

	public void setRemBegDt(Date remBegDt) {
		this.remBegDt = remBegDt;
	}

	public String getRemContent() {
		return this.remContent;
	}

	public void setRemContent(String remContent) {
		this.remContent = remContent;
	}

	public Date getRemEndDt() {
		return this.remEndDt;
	}

	public void setRemEndDt(Date remEndDt) {
		this.remEndDt = remEndDt;
	}

	public String getRemName() {
		return this.remName;
	}

	public void setRemName(String remName) {
		this.remName = remName;
	}

	public String getRemTouchCstid() {
		return this.remTouchCstid;
	}

	public void setRemTouchCstid(String remTouchCstid) {
		this.remTouchCstid = remTouchCstid;
	}

	public String getRemTouchCstnm() {
		return this.remTouchCstnm;
	}

	public void setRemTouchCstnm(String remTouchCstnm) {
		this.remTouchCstnm = remTouchCstnm;
	}

	public String getRemType() {
		return this.remType;
	}

	public void setRemType(String remType) {
		this.remType = remType;
	}

	public String getValidFlag() {
		return this.validFlag;
	}

	public void setValidFlag(String validFlag) {
		this.validFlag = validFlag;
	}
	
	public String getReadCstid() {
		return this.readCstid;
	}

	public void setReadCstid(String readCstid) {
		this.readCstid = readCstid;
	}
	
	public String getReadCstnm() {
		return this.readCstnm;
	}

	public void setReadCstnm(String readCstnm) {
		this.readCstnm = readCstnm;
	}

}