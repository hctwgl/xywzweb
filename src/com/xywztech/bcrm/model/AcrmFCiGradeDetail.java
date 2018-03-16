package com.xywztech.bcrm.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the ACRM_F_CI_GRADE_DETAIL database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_GRADE_DETAIL")
public class AcrmFCiGradeDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_GRADE_DETAIL_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_GRADE_DETAIL_ID_GENERATOR")
	@Column(nullable=false)
	private Long id;

	@Column(name="CUST_ID")
	private String custId;

	@Column(name="CUST_NAME")
	private String custName;

	@Column(name="CUST_TYPE")
	private String custType;

    @Temporal( TemporalType.DATE)
	@Column(name="ETL_DATE")
	private Date etlDate;

	@Column(name="TARGET1_COUNT")
	private BigDecimal target1Count;

	@Column(name="TARGET1_ID")
	private String target1Id;

	@Column(name="TARGET1_VALUE")
	private BigDecimal target1Value;

	@Column(name="TARGET10_COUNT")
	private BigDecimal target10Count;

	@Column(name="TARGET10_ID")
	private String target10Id;

	@Column(name="TARGET10_VALUE")
	private BigDecimal target10Value;

	@Column(name="TARGET11_COUNT")
	private BigDecimal target11Count;

	@Column(name="TARGET11_ID")
	private String target11Id;

	@Column(name="TARGET11_VALUE")
	private BigDecimal target11Value;

	@Column(name="TARGET12_COUNT")
	private BigDecimal target12Count;

	@Column(name="TARGET12_ID")
	private String target12Id;

	@Column(name="TARGET12_VALUE")
	private BigDecimal target12Value;

	@Column(name="TARGET13_COUNT")
	private BigDecimal target13Count;

	@Column(name="TARGET13_ID")
	private String target13Id;

	@Column(name="TARGET13_VALUE")
	private BigDecimal target13Value;

	@Column(name="TARGET14_COUNT")
	private BigDecimal target14Count;

	@Column(name="TARGET14_ID")
	private String target14Id;

	@Column(name="TARGET14_VALUE")
	private BigDecimal target14Value;

	@Column(name="TARGET15_COUNT")
	private BigDecimal target15Count;

	@Column(name="TARGET15_ID")
	private String target15Id;

	@Column(name="TARGET15_VALUE")
	private BigDecimal target15Value;

	@Column(name="TARGET16_COUNT")
	private BigDecimal target16Count;

	@Column(name="TARGET16_ID")
	private String target16Id;

	@Column(name="TARGET16_VALUE")
	private BigDecimal target16Value;

	@Column(name="TARGET17_COUNT")
	private BigDecimal target17Count;

	@Column(name="TARGET17_ID")
	private String target17Id;

	@Column(name="TARGET17_VALUE")
	private BigDecimal target17Value;

	@Column(name="TARGET18_COUNT")
	private BigDecimal target18Count;

	@Column(name="TARGET18_ID")
	private String target18Id;

	@Column(name="TARGET18_VALUE")
	private BigDecimal target18Value;

	@Column(name="TARGET19_COUNT")
	private BigDecimal target19Count;

	@Column(name="TARGET19_ID")
	private String target19Id;

	@Column(name="TARGET19_VALUE")
	private BigDecimal target19Value;

	@Column(name="TARGET2_COUNT")
	private BigDecimal target2Count;

	@Column(name="TARGET2_ID")
	private String target2Id;

	@Column(name="TARGET2_VALUE")
	private BigDecimal target2Value;

	@Column(name="TARGET20_COUNT")
	private BigDecimal target20Count;

	@Column(name="TARGET20_ID")
	private String target20Id;

	@Column(name="TARGET20_VALUE")
	private BigDecimal target20Value;

	@Column(name="TARGET3_COUNT")
	private BigDecimal target3Count;

	@Column(name="TARGET3_ID")
	private String target3Id;

	@Column(name="TARGET3_VALUE")
	private BigDecimal target3Value;

	@Column(name="TARGET4_COUNT")
	private BigDecimal target4Count;

	@Column(name="TARGET4_ID")
	private String target4Id;

	@Column(name="TARGET4_VALUE")
	private BigDecimal target4Value;

	@Column(name="TARGET5_COUNT")
	private BigDecimal target5Count;

	@Column(name="TARGET5_ID")
	private String target5Id;

	@Column(name="TARGET5_VALUE")
	private BigDecimal target5Value;

	@Column(name="TARGET6_COUNT")
	private BigDecimal target6Count;

	@Column(name="TARGET6_ID")
	private String target6Id;

	@Column(name="TARGET6_VALUE")
	private BigDecimal target6Value;

	@Column(name="TARGET7_COUNT")
	private BigDecimal target7Count;

	@Column(name="TARGET7_ID")
	private String target7Id;

	@Column(name="TARGET7_VALUE")
	private BigDecimal target7Value;

	@Column(name="TARGET8_COUNT")
	private BigDecimal target8Count;

	@Column(name="TARGET8_ID")
	private String target8Id;

	@Column(name="TARGET8_VALUE")
	private BigDecimal target8Value;

	@Column(name="TARGET9_COUNT")
	private BigDecimal target9Count;

	@Column(name="TARGET9_ID")
	private String target9Id;

	@Column(name="TARGET9_VALUE")
	private BigDecimal target9Value;

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

	public String getCustType() {
		return custType;
	}

	public void setCustType(String custType) {
		this.custType = custType;
	}

	public Date getEtlDate() {
		return etlDate;
	}

	public void setEtlDate(Date etlDate) {
		this.etlDate = etlDate;
	}

	public BigDecimal getTarget1Count() {
		return target1Count;
	}

	public void setTarget1Count(BigDecimal target1Count) {
		this.target1Count = target1Count;
	}

	public String getTarget1Id() {
		return target1Id;
	}

	public void setTarget1Id(String target1Id) {
		this.target1Id = target1Id;
	}

	public BigDecimal getTarget1Value() {
		return target1Value;
	}

	public void setTarget1Value(BigDecimal target1Value) {
		this.target1Value = target1Value;
	}

	public BigDecimal getTarget10Count() {
		return target10Count;
	}

	public void setTarget10Count(BigDecimal target10Count) {
		this.target10Count = target10Count;
	}

	public String getTarget10Id() {
		return target10Id;
	}

	public void setTarget10Id(String target10Id) {
		this.target10Id = target10Id;
	}

	public BigDecimal getTarget10Value() {
		return target10Value;
	}

	public void setTarget10Value(BigDecimal target10Value) {
		this.target10Value = target10Value;
	}

	public BigDecimal getTarget11Count() {
		return target11Count;
	}

	public void setTarget11Count(BigDecimal target11Count) {
		this.target11Count = target11Count;
	}

	public String getTarget11Id() {
		return target11Id;
	}

	public void setTarget11Id(String target11Id) {
		this.target11Id = target11Id;
	}

	public BigDecimal getTarget11Value() {
		return target11Value;
	}

	public void setTarget11Value(BigDecimal target11Value) {
		this.target11Value = target11Value;
	}

	public BigDecimal getTarget12Count() {
		return target12Count;
	}

	public void setTarget12Count(BigDecimal target12Count) {
		this.target12Count = target12Count;
	}

	public String getTarget12Id() {
		return target12Id;
	}

	public void setTarget12Id(String target12Id) {
		this.target12Id = target12Id;
	}

	public BigDecimal getTarget12Value() {
		return target12Value;
	}

	public void setTarget12Value(BigDecimal target12Value) {
		this.target12Value = target12Value;
	}

	public BigDecimal getTarget13Count() {
		return target13Count;
	}

	public void setTarget13Count(BigDecimal target13Count) {
		this.target13Count = target13Count;
	}

	public String getTarget13Id() {
		return target13Id;
	}

	public void setTarget13Id(String target13Id) {
		this.target13Id = target13Id;
	}

	public BigDecimal getTarget13Value() {
		return target13Value;
	}

	public void setTarget13Value(BigDecimal target13Value) {
		this.target13Value = target13Value;
	}

	public BigDecimal getTarget14Count() {
		return target14Count;
	}

	public void setTarget14Count(BigDecimal target14Count) {
		this.target14Count = target14Count;
	}

	public String getTarget14Id() {
		return target14Id;
	}

	public void setTarget14Id(String target14Id) {
		this.target14Id = target14Id;
	}

	public BigDecimal getTarget14Value() {
		return target14Value;
	}

	public void setTarget14Value(BigDecimal target14Value) {
		this.target14Value = target14Value;
	}

	public BigDecimal getTarget15Count() {
		return target15Count;
	}

	public void setTarget15Count(BigDecimal target15Count) {
		this.target15Count = target15Count;
	}

	public String getTarget15Id() {
		return target15Id;
	}

	public void setTarget15Id(String target15Id) {
		this.target15Id = target15Id;
	}

	public BigDecimal getTarget15Value() {
		return target15Value;
	}

	public void setTarget15Value(BigDecimal target15Value) {
		this.target15Value = target15Value;
	}

	public BigDecimal getTarget16Count() {
		return target16Count;
	}

	public void setTarget16Count(BigDecimal target16Count) {
		this.target16Count = target16Count;
	}

	public String getTarget16Id() {
		return target16Id;
	}

	public void setTarget16Id(String target16Id) {
		this.target16Id = target16Id;
	}

	public BigDecimal getTarget16Value() {
		return target16Value;
	}

	public void setTarget16Value(BigDecimal target16Value) {
		this.target16Value = target16Value;
	}

	public BigDecimal getTarget17Count() {
		return target17Count;
	}

	public void setTarget17Count(BigDecimal target17Count) {
		this.target17Count = target17Count;
	}

	public String getTarget17Id() {
		return target17Id;
	}

	public void setTarget17Id(String target17Id) {
		this.target17Id = target17Id;
	}

	public BigDecimal getTarget17Value() {
		return target17Value;
	}

	public void setTarget17Value(BigDecimal target17Value) {
		this.target17Value = target17Value;
	}

	public BigDecimal getTarget18Count() {
		return target18Count;
	}

	public void setTarget18Count(BigDecimal target18Count) {
		this.target18Count = target18Count;
	}

	public String getTarget18Id() {
		return target18Id;
	}

	public void setTarget18Id(String target18Id) {
		this.target18Id = target18Id;
	}

	public BigDecimal getTarget18Value() {
		return target18Value;
	}

	public void setTarget18Value(BigDecimal target18Value) {
		this.target18Value = target18Value;
	}

	public BigDecimal getTarget19Count() {
		return target19Count;
	}

	public void setTarget19Count(BigDecimal target19Count) {
		this.target19Count = target19Count;
	}

	public String getTarget19Id() {
		return target19Id;
	}

	public void setTarget19Id(String target19Id) {
		this.target19Id = target19Id;
	}

	public BigDecimal getTarget19Value() {
		return target19Value;
	}

	public void setTarget19Value(BigDecimal target19Value) {
		this.target19Value = target19Value;
	}

	public BigDecimal getTarget2Count() {
		return target2Count;
	}

	public void setTarget2Count(BigDecimal target2Count) {
		this.target2Count = target2Count;
	}

	public String getTarget2Id() {
		return target2Id;
	}

	public void setTarget2Id(String target2Id) {
		this.target2Id = target2Id;
	}

	public BigDecimal getTarget2Value() {
		return target2Value;
	}

	public void setTarget2Value(BigDecimal target2Value) {
		this.target2Value = target2Value;
	}

	public BigDecimal getTarget20Count() {
		return target20Count;
	}

	public void setTarget20Count(BigDecimal target20Count) {
		this.target20Count = target20Count;
	}

	public String getTarget20Id() {
		return target20Id;
	}

	public void setTarget20Id(String target20Id) {
		this.target20Id = target20Id;
	}

	public BigDecimal getTarget20Value() {
		return target20Value;
	}

	public void setTarget20Value(BigDecimal target20Value) {
		this.target20Value = target20Value;
	}

	public BigDecimal getTarget3Count() {
		return target3Count;
	}

	public void setTarget3Count(BigDecimal target3Count) {
		this.target3Count = target3Count;
	}

	public String getTarget3Id() {
		return target3Id;
	}

	public void setTarget3Id(String target3Id) {
		this.target3Id = target3Id;
	}

	public BigDecimal getTarget3Value() {
		return target3Value;
	}

	public void setTarget3Value(BigDecimal target3Value) {
		this.target3Value = target3Value;
	}

	public BigDecimal getTarget4Count() {
		return target4Count;
	}

	public void setTarget4Count(BigDecimal target4Count) {
		this.target4Count = target4Count;
	}

	public String getTarget4Id() {
		return target4Id;
	}

	public void setTarget4Id(String target4Id) {
		this.target4Id = target4Id;
	}

	public BigDecimal getTarget4Value() {
		return target4Value;
	}

	public void setTarget4Value(BigDecimal target4Value) {
		this.target4Value = target4Value;
	}

	public BigDecimal getTarget5Count() {
		return target5Count;
	}

	public void setTarget5Count(BigDecimal target5Count) {
		this.target5Count = target5Count;
	}

	public String getTarget5Id() {
		return target5Id;
	}

	public void setTarget5Id(String target5Id) {
		this.target5Id = target5Id;
	}

	public BigDecimal getTarget5Value() {
		return target5Value;
	}

	public void setTarget5Value(BigDecimal target5Value) {
		this.target5Value = target5Value;
	}

	public BigDecimal getTarget6Count() {
		return target6Count;
	}

	public void setTarget6Count(BigDecimal target6Count) {
		this.target6Count = target6Count;
	}

	public String getTarget6Id() {
		return target6Id;
	}

	public void setTarget6Id(String target6Id) {
		this.target6Id = target6Id;
	}

	public BigDecimal getTarget6Value() {
		return target6Value;
	}

	public void setTarget6Value(BigDecimal target6Value) {
		this.target6Value = target6Value;
	}

	public BigDecimal getTarget7Count() {
		return target7Count;
	}

	public void setTarget7Count(BigDecimal target7Count) {
		this.target7Count = target7Count;
	}

	public String getTarget7Id() {
		return target7Id;
	}

	public void setTarget7Id(String target7Id) {
		this.target7Id = target7Id;
	}

	public BigDecimal getTarget7Value() {
		return target7Value;
	}

	public void setTarget7Value(BigDecimal target7Value) {
		this.target7Value = target7Value;
	}

	public BigDecimal getTarget8Count() {
		return target8Count;
	}

	public void setTarget8Count(BigDecimal target8Count) {
		this.target8Count = target8Count;
	}

	public String getTarget8Id() {
		return target8Id;
	}

	public void setTarget8Id(String target8Id) {
		this.target8Id = target8Id;
	}

	public BigDecimal getTarget8Value() {
		return target8Value;
	}

	public void setTarget8Value(BigDecimal target8Value) {
		this.target8Value = target8Value;
	}

	public BigDecimal getTarget9Count() {
		return target9Count;
	}

	public void setTarget9Count(BigDecimal target9Count) {
		this.target9Count = target9Count;
	}

	public String getTarget9Id() {
		return target9Id;
	}

	public void setTarget9Id(String target9Id) {
		this.target9Id = target9Id;
	}

	public BigDecimal getTarget9Value() {
		return target9Value;
	}

	public void setTarget9Value(BigDecimal target9Value) {
		this.target9Value = target9Value;
	}
}