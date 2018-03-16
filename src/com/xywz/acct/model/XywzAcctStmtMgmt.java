package com.xywz.acct.model;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the xywz_acct_stmt_mgmt database table.
 * 
 */
@Entity
@Table(name="xywz_acct_stmt_mgmt")
public class XywzAcctStmtMgmt implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;

	@Column(name="AMT")
	private BigDecimal amt;

	@Column(name="CONTR_NUM")
	private String contrNum;

    @Temporal( TemporalType.DATE)
	@Column(name="EXP_DT")
	private Date expDt;

    @Temporal( TemporalType.DATE)
	@Column(name="INV_DT")
	private Date invDt;

	@Column(name="INV_NUM")
	private String invNum;

	@Column(name="LOAN")
	private String loan;

	@Column(name="LOAN_INST")
	private BigDecimal loanInst;

	@Column(name="MRN_COST_AMT")
	private BigDecimal mrnCostAmt;

    @Temporal( TemporalType.DATE)
	@Column(name="MRN_COST_DT")
	private Date mrnCostDt;

	@Column(name="RECV_LOAD_BILL")
	private String recvLoadBill;

	@Column(name="REFUND")
	private String refund;

	@Column(name="REFUND_AMT")
	private BigDecimal refundAmt;

    @Temporal( TemporalType.DATE)
	@Column(name="REFUND_DT")
	private Date refundDt;

	@Column(name="SUBT_DOC_BANK")
	private String subtDocBank;

	@Column(name="WEIGHT")
	private BigDecimal weight;
	
	@Column(name="TX_TYP")
	private String txTyp;

    public XywzAcctStmtMgmt() {
    }

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	public String getContrNum() {
		return this.contrNum;
	}

	public void setContrNum(String contrNum) {
		this.contrNum = contrNum;
	}

	public Date getExpDt() {
		return this.expDt;
	}

	public void setExpDt(Date expDt) {
		this.expDt = expDt;
	}

	public Date getInvDt() {
		return this.invDt;
	}

	public void setInvDt(Date invDt) {
		this.invDt = invDt;
	}

	public String getInvNum() {
		return this.invNum;
	}

	public void setInvNum(String invNum) {
		this.invNum = invNum;
	}

	public String getLoan() {
		return this.loan;
	}

	public void setLoan(String loan) {
		this.loan = loan;
	}

	public BigDecimal getLoanInst() {
		return this.loanInst;
	}

	public void setLoanInst(BigDecimal loanInst) {
		this.loanInst = loanInst;
	}

	public BigDecimal getMrnCostAmt() {
		return this.mrnCostAmt;
	}

	public void setMrnCostAmt(BigDecimal mrnCostAmt) {
		this.mrnCostAmt = mrnCostAmt;
	}

	public Date getMrnCostDt() {
		return this.mrnCostDt;
	}

	public void setMrnCostDt(Date mrnCostDt) {
		this.mrnCostDt = mrnCostDt;
	}

	public String getRecvLoadBill() {
		return this.recvLoadBill;
	}

	public void setRecvLoadBill(String recvLoadBill) {
		this.recvLoadBill = recvLoadBill;
	}

	public String getRefund() {
		return this.refund;
	}

	public void setRefund(String refund) {
		this.refund = refund;
	}

	public BigDecimal getRefundAmt() {
		return this.refundAmt;
	}

	public void setRefundAmt(BigDecimal refundAmt) {
		this.refundAmt = refundAmt;
	}

	public Date getRefundDt() {
		return this.refundDt;
	}

	public void setRefundDt(Date refundDt) {
		this.refundDt = refundDt;
	}

	public String getSubtDocBank() {
		return this.subtDocBank;
	}

	public void setSubtDocBank(String subtDocBank) {
		this.subtDocBank = subtDocBank;
	}

	public BigDecimal getWeight() {
		return this.weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}
	
	public String getTxTyp() {
		return this.txTyp;
	}

	public void setTxTyp(String txTyp) {
		this.txTyp = txTyp;
	}

}