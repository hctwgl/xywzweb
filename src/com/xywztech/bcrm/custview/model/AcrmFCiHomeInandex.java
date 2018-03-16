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
 * The persistent class for the ACRM_F_CI_HOME_INANDEX database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_HOME_INANDEX")
public class AcrmFCiHomeInandex implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_HOME_INANDEX_ID_GENERATOR",sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_HOME_INANDEX_ID_GENERATOR")
	@Column(nullable=false)
	private Long id;

	@Column(name="CUST_ID", length=21)
	private String custId;

	@Column(name="CUST_NAME", length=200)
	private String custName;

	private Integer month;

	@Column(length=10)
	private String period;

	@Column(precision=20, scale=2)
	private BigDecimal target1;

	@Column(precision=20, scale=2)
	private BigDecimal target10;

	@Column(precision=20, scale=2)
	private BigDecimal target11;

	@Column(precision=20, scale=2)
	private BigDecimal target12;

	@Column(precision=20, scale=2)
	private BigDecimal target13;

	@Column(precision=20, scale=2)
	private BigDecimal target14;

	@Column(precision=20, scale=2)
	private BigDecimal target15;

	@Column(precision=20, scale=2)
	private BigDecimal target16;

	@Column(precision=20, scale=2)
	private BigDecimal target17;

	@Column(precision=20, scale=2)
	private BigDecimal target18;

	@Column(precision=20, scale=2)
	private BigDecimal target19;

	@Column(precision=20, scale=2)
	private BigDecimal target2;

	@Column(precision=20, scale=2)
	private BigDecimal target20;

	@Column(precision=20, scale=2)
	private BigDecimal target21;

	@Column(precision=20, scale=2)
	private BigDecimal target22;

	@Column(precision=20, scale=2)
	private BigDecimal target23;

	@Column(precision=20, scale=2)
	private BigDecimal target24;

	@Column(precision=20, scale=2)
	private BigDecimal target25;

	@Column(precision=20, scale=2)
	private BigDecimal target26;

	@Column(precision=20, scale=2)
	private BigDecimal target27;

	@Column(precision=20, scale=2)
	private BigDecimal target28;

	@Column(precision=20, scale=2)
	private BigDecimal target29;

	@Column(precision=20, scale=2)
	private BigDecimal target3;

	@Column(precision=20, scale=2)
	private BigDecimal target30;

	@Column(precision=20, scale=2)
	private BigDecimal target31;

	@Column(precision=20, scale=2)
	private BigDecimal target32;

	@Column(precision=20, scale=2)
	private BigDecimal target33;

	@Column(precision=20, scale=2)
	private BigDecimal target34;

	@Column(precision=20, scale=2)
	private BigDecimal target35;

	@Column(precision=20, scale=2)
	private BigDecimal target36;

	@Column(precision=20, scale=2)
	private BigDecimal target37;

	@Column(precision=20, scale=2)
	private BigDecimal target38;

	@Column(precision=20, scale=2)
	private BigDecimal target39;

	@Column(precision=20, scale=2)
	private BigDecimal target4;

	@Column(precision=20, scale=2)
	private BigDecimal target40;

	@Column(precision=20, scale=2)
	private BigDecimal target41;

	@Column(precision=20, scale=2)
	private BigDecimal target42;

	@Column(length=200)
	private String target43;

	@Column(precision=20, scale=2)
	private BigDecimal target44;

	@Column(precision=20, scale=2)
	private BigDecimal target45;

	@Column(precision=20, scale=2)
	private BigDecimal target5;

	@Column(precision=20, scale=2)
	private BigDecimal target6;

	@Column(precision=20, scale=2)
	private BigDecimal target7;

	@Column(precision=20, scale=2)
	private BigDecimal target8;

	@Column(precision=20, scale=2)
	private BigDecimal target9;

	@Column(name="TM_TYP", length=10)
	private String tmTyp;

	private Integer year;

	public Long getId() {
		return this.id;
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

	public String getCustName() {
		return this.custName;
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
		return this.period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public BigDecimal getTarget1() {
		return this.target1;
	}

	public void setTarget1(BigDecimal target1) {
		this.target1 = target1;
	}

	public BigDecimal getTarget10() {
		return this.target10;
	}

	public void setTarget10(BigDecimal target10) {
		this.target10 = target10;
	}

	public BigDecimal getTarget11() {
		return this.target11;
	}

	public void setTarget11(BigDecimal target11) {
		this.target11 = target11;
	}

	public BigDecimal getTarget12() {
		return this.target12;
	}

	public void setTarget12(BigDecimal target12) {
		this.target12 = target12;
	}

	public BigDecimal getTarget13() {
		return this.target13;
	}

	public void setTarget13(BigDecimal target13) {
		this.target13 = target13;
	}

	public BigDecimal getTarget14() {
		return this.target14;
	}

	public void setTarget14(BigDecimal target14) {
		this.target14 = target14;
	}

	public BigDecimal getTarget15() {
		return this.target15;
	}

	public void setTarget15(BigDecimal target15) {
		this.target15 = target15;
	}

	public BigDecimal getTarget16() {
		return this.target16;
	}

	public void setTarget16(BigDecimal target16) {
		this.target16 = target16;
	}

	public BigDecimal getTarget17() {
		return this.target17;
	}

	public void setTarget17(BigDecimal target17) {
		this.target17 = target17;
	}

	public BigDecimal getTarget18() {
		return this.target18;
	}

	public void setTarget18(BigDecimal target18) {
		this.target18 = target18;
	}

	public BigDecimal getTarget19() {
		return this.target19;
	}

	public void setTarget19(BigDecimal target19) {
		this.target19 = target19;
	}

	public BigDecimal getTarget2() {
		return this.target2;
	}

	public void setTarget2(BigDecimal target2) {
		this.target2 = target2;
	}

	public BigDecimal getTarget20() {
		return this.target20;
	}

	public void setTarget20(BigDecimal target20) {
		this.target20 = target20;
	}

	public BigDecimal getTarget21() {
		return this.target21;
	}

	public void setTarget21(BigDecimal target21) {
		this.target21 = target21;
	}

	public BigDecimal getTarget22() {
		return this.target22;
	}

	public void setTarget22(BigDecimal target22) {
		this.target22 = target22;
	}

	public BigDecimal getTarget23() {
		return this.target23;
	}

	public void setTarget23(BigDecimal target23) {
		this.target23 = target23;
	}

	public BigDecimal getTarget24() {
		return this.target24;
	}

	public void setTarget24(BigDecimal target24) {
		this.target24 = target24;
	}

	public BigDecimal getTarget25() {
		return this.target25;
	}

	public void setTarget25(BigDecimal target25) {
		this.target25 = target25;
	}

	public BigDecimal getTarget26() {
		return this.target26;
	}

	public void setTarget26(BigDecimal target26) {
		this.target26 = target26;
	}

	public BigDecimal getTarget27() {
		return this.target27;
	}

	public void setTarget27(BigDecimal target27) {
		this.target27 = target27;
	}

	public BigDecimal getTarget28() {
		return this.target28;
	}

	public void setTarget28(BigDecimal target28) {
		this.target28 = target28;
	}

	public BigDecimal getTarget29() {
		return this.target29;
	}

	public void setTarget29(BigDecimal target29) {
		this.target29 = target29;
	}

	public BigDecimal getTarget3() {
		return this.target3;
	}

	public void setTarget3(BigDecimal target3) {
		this.target3 = target3;
	}

	public BigDecimal getTarget30() {
		return this.target30;
	}

	public void setTarget30(BigDecimal target30) {
		this.target30 = target30;
	}

	public BigDecimal getTarget31() {
		return this.target31;
	}

	public void setTarget31(BigDecimal target31) {
		this.target31 = target31;
	}

	public BigDecimal getTarget32() {
		return this.target32;
	}

	public void setTarget32(BigDecimal target32) {
		this.target32 = target32;
	}

	public BigDecimal getTarget33() {
		return this.target33;
	}

	public void setTarget33(BigDecimal target33) {
		this.target33 = target33;
	}

	public BigDecimal getTarget34() {
		return this.target34;
	}

	public void setTarget34(BigDecimal target34) {
		this.target34 = target34;
	}

	public BigDecimal getTarget35() {
		return this.target35;
	}

	public void setTarget35(BigDecimal target35) {
		this.target35 = target35;
	}

	public BigDecimal getTarget36() {
		return this.target36;
	}

	public void setTarget36(BigDecimal target36) {
		this.target36 = target36;
	}

	public BigDecimal getTarget37() {
		return this.target37;
	}

	public void setTarget37(BigDecimal target37) {
		this.target37 = target37;
	}

	public BigDecimal getTarget38() {
		return this.target38;
	}

	public void setTarget38(BigDecimal target38) {
		this.target38 = target38;
	}

	public BigDecimal getTarget39() {
		return this.target39;
	}

	public void setTarget39(BigDecimal target39) {
		this.target39 = target39;
	}

	public BigDecimal getTarget4() {
		return this.target4;
	}

	public void setTarget4(BigDecimal target4) {
		this.target4 = target4;
	}

	public BigDecimal getTarget40() {
		return this.target40;
	}

	public void setTarget40(BigDecimal target40) {
		this.target40 = target40;
	}

	public BigDecimal getTarget41() {
		return this.target41;
	}

	public void setTarget41(BigDecimal target41) {
		this.target41 = target41;
	}

	public BigDecimal getTarget42() {
		return this.target42;
	}

	public void setTarget42(BigDecimal target42) {
		this.target42 = target42;
	}

	public String getTarget43() {
		return this.target43;
	}

	public void setTarget43(String target43) {
		this.target43 = target43;
	}

	public BigDecimal getTarget44() {
		return this.target44;
	}

	public void setTarget44(BigDecimal target44) {
		this.target44 = target44;
	}

	public BigDecimal getTarget45() {
		return this.target45;
	}

	public void setTarget45(BigDecimal target45) {
		this.target45 = target45;
	}

	public BigDecimal getTarget5() {
		return this.target5;
	}

	public void setTarget5(BigDecimal target5) {
		this.target5 = target5;
	}

	public BigDecimal getTarget6() {
		return this.target6;
	}

	public void setTarget6(BigDecimal target6) {
		this.target6 = target6;
	}

	public BigDecimal getTarget7() {
		return this.target7;
	}

	public void setTarget7(BigDecimal target7) {
		this.target7 = target7;
	}

	public BigDecimal getTarget8() {
		return this.target8;
	}

	public void setTarget8(BigDecimal target8) {
		this.target8 = target8;
	}

	public BigDecimal getTarget9() {
		return this.target9;
	}

	public void setTarget9(BigDecimal target9) {
		this.target9 = target9;
	}

	public String getTmTyp() {
		return this.tmTyp;
	}

	public void setTmTyp(String tmTyp) {
		this.tmTyp = tmTyp;
	}

	public Integer getYear() {
		return this.year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

}