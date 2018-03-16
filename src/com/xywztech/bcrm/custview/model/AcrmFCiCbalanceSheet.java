package com.xywztech.bcrm.custview.model;
import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the ACRM_F_CI_CBALANCE_SHEET database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_CBALANCE_SHEET")
public class AcrmFCiCbalanceSheet implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_CBALANCE_SHEET_ID_GENERATOR",sequenceName="ID_SEQUENCE" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_CBALANCE_SHEET_ID_GENERATOR")
	@Column(nullable=false)
	private Long id;

	@Column(name="CUST_ID", length=21)
	private String custId;

	@Column(name="CUST_NAME", length=200)
	private String custName;

	@Column(name="MONTH",length=10)
	private Integer month;

	@Column(name="PERIOD",length=10)
	private String period;

	@Column(name="REMARK",length=100)
	private String remark;

	@Column(precision=17, scale=2)
	private BigDecimal target1;

	@Column(precision=17, scale=2)
	private BigDecimal target10;

	@Column(precision=17, scale=2)
	private BigDecimal target11;

	@Column(precision=17, scale=2)
	private BigDecimal target12;

	@Column(precision=17, scale=2)
	private BigDecimal target13;

	@Column(precision=17, scale=2)
	private BigDecimal target14;

	@Column(precision=17, scale=2)
	private BigDecimal target15;

	@Column(precision=17, scale=2)
	private BigDecimal target16;

	@Column(precision=17, scale=2)
	private BigDecimal target17;

	@Column(precision=17, scale=2)
	private BigDecimal target18;

	@Column(precision=17, scale=2)
	private BigDecimal target19;

	@Column(precision=17, scale=2)
	private BigDecimal target2;

	@Column(precision=17, scale=2)
	private BigDecimal target20;

	@Column(precision=17, scale=2)
	private BigDecimal target21;

	@Column(precision=17, scale=2)
	private BigDecimal target22;

	@Column(precision=17, scale=2)
	private BigDecimal target23;

	@Column(precision=17, scale=2)
	private BigDecimal target24;

	@Column(precision=17, scale=2)
	private BigDecimal target25;

	@Column(name="TARGET26",length=32)
	private String target26;

	@Column(precision=17, scale=2)
	private BigDecimal target27;

	@Column(length=32)
	private String target28;

	@Column(precision=17, scale=2)
	private BigDecimal target29;

	@Column(precision=17, scale=2)
	private BigDecimal target3;

	@Column(precision=17, scale=2)
	private BigDecimal target4;

	@Column(precision=17, scale=2)
	private BigDecimal target5;

	@Column(precision=17, scale=2)
	private BigDecimal target6;

	@Column(precision=17, scale=2)
	private BigDecimal target7;

	@Column(precision=17, scale=2)
	private BigDecimal target8;

	@Column(precision=17, scale=2)
	private BigDecimal target9;

	@Column(name="TM_TYP", length=10)
	private String tmTyp;

	@Column(name="YEAR", length=10)
	private Integer year;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public BigDecimal getTarget1() {
		return target1;
	}

	public void setTarget1(BigDecimal target1) {
		this.target1 = target1;
	}

	public BigDecimal getTarget10() {
		return target10;
	}

	public void setTarget10(BigDecimal target10) {
		this.target10 = target10;
	}

	public BigDecimal getTarget11() {
		return target11;
	}

	public void setTarget11(BigDecimal target11) {
		this.target11 = target11;
	}

	public BigDecimal getTarget12() {
		return target12;
	}

	public void setTarget12(BigDecimal target12) {
		this.target12 = target12;
	}

	public BigDecimal getTarget13() {
		return target13;
	}

	public void setTarget13(BigDecimal target13) {
		this.target13 = target13;
	}

	public BigDecimal getTarget14() {
		return target14;
	}

	public void setTarget14(BigDecimal target14) {
		this.target14 = target14;
	}

	public BigDecimal getTarget15() {
		return target15;
	}

	public void setTarget15(BigDecimal target15) {
		this.target15 = target15;
	}

	public BigDecimal getTarget16() {
		return target16;
	}

	public void setTarget16(BigDecimal target16) {
		this.target16 = target16;
	}

	public BigDecimal getTarget17() {
		return target17;
	}

	public void setTarget17(BigDecimal target17) {
		this.target17 = target17;
	}

	public BigDecimal getTarget18() {
		return target18;
	}

	public void setTarget18(BigDecimal target18) {
		this.target18 = target18;
	}

	public BigDecimal getTarget19() {
		return target19;
	}

	public void setTarget19(BigDecimal target19) {
		this.target19 = target19;
	}

	public BigDecimal getTarget2() {
		return target2;
	}

	public void setTarget2(BigDecimal target2) {
		this.target2 = target2;
	}

	public BigDecimal getTarget20() {
		return target20;
	}

	public void setTarget20(BigDecimal target20) {
		this.target20 = target20;
	}

	public BigDecimal getTarget21() {
		return target21;
	}

	public void setTarget21(BigDecimal target21) {
		this.target21 = target21;
	}

	public BigDecimal getTarget22() {
		return target22;
	}

	public void setTarget22(BigDecimal target22) {
		this.target22 = target22;
	}

	public BigDecimal getTarget23() {
		return target23;
	}

	public void setTarget23(BigDecimal target23) {
		this.target23 = target23;
	}

	public BigDecimal getTarget24() {
		return target24;
	}

	public void setTarget24(BigDecimal target24) {
		this.target24 = target24;
	}

	public BigDecimal getTarget25() {
		return target25;
	}

	public void setTarget25(BigDecimal target25) {
		this.target25 = target25;
	}

	public String getTarget26() {
		return target26;
	}

	public void setTarget26(String target26) {
		this.target26 = target26;
	}

	public BigDecimal getTarget27() {
		return target27;
	}

	public void setTarget27(BigDecimal target27) {
		this.target27 = target27;
	}

	public String getTarget28() {
		return target28;
	}

	public void setTarget28(String target28) {
		this.target28 = target28;
	}

	public BigDecimal getTarget29() {
		return target29;
	}

	public void setTarget29(BigDecimal target29) {
		this.target29 = target29;
	}

	public BigDecimal getTarget3() {
		return target3;
	}

	public void setTarget3(BigDecimal target3) {
		this.target3 = target3;
	}

	public BigDecimal getTarget4() {
		return target4;
	}

	public void setTarget4(BigDecimal target4) {
		this.target4 = target4;
	}

	public BigDecimal getTarget5() {
		return target5;
	}

	public void setTarget5(BigDecimal target5) {
		this.target5 = target5;
	}

	public BigDecimal getTarget6() {
		return target6;
	}

	public void setTarget6(BigDecimal target6) {
		this.target6 = target6;
	}

	public BigDecimal getTarget7() {
		return target7;
	}

	public void setTarget7(BigDecimal target7) {
		this.target7 = target7;
	}

	public BigDecimal getTarget8() {
		return target8;
	}

	public void setTarget8(BigDecimal target8) {
		this.target8 = target8;
	}

	public BigDecimal getTarget9() {
		return target9;
	}

	public void setTarget9(BigDecimal target9) {
		this.target9 = target9;
	}

	public String getTmTyp() {
		return tmTyp;
	}

	public void setTmTyp(String tmTyp) {
		this.tmTyp = tmTyp;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}