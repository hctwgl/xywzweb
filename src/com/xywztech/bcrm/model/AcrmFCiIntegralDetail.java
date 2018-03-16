package com.xywztech.bcrm.model;

import java.io.Serializable;
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
 * The persistent class for the ACRM_F_CI_INTEGRAL_DETAIL database table.
 * 
 */
@Entity
@Table(name="ACRM_F_CI_INTEGRAL_DETAIL")
public class AcrmFCiIntegralDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ACRM_F_CI_INTEGRAL_DETAIL_ID_GENERATOR", sequenceName="ID_SEQUENCE" ,allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACRM_F_CI_INTEGRAL_DETAIL_ID_GENERATOR")
	@Column(name ="ID",unique=true, nullable=false)
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
	private Long target1Count;

	@Column(name="TARGET1_ID")
	private String target1Id;

	@Column(name="TARGET1_VALUE")
	private Long target1Value;

	@Column(name="TARGET10_COUNT")
	private Long target10Count;

	@Column(name="TARGET10_ID")
	private String target10Id;

	@Column(name="TARGET10_VALUE")
	private Long target10Value;

	@Column(name="TARGET11_COUNT")
	private Long target11Count;

	@Column(name="TARGET11_ID")
	private String target11Id;

	@Column(name="TARGET11_VALUE")
	private Long target11Value;

	@Column(name="TARGET12_COUNT")
	private Long target12Count;

	@Column(name="TARGET12_ID")
	private String target12Id;

	@Column(name="TARGET12_VALUE")
	private Long target12Value;

	@Column(name="TARGET13_COUNT")
	private Long target13Count;

	@Column(name="TARGET13_ID")
	private String target13Id;

	@Column(name="TARGET13_VALUE")
	private Long target13Value;

	@Column(name="TARGET14_COUNT")
	private Long target14Count;

	@Column(name="TARGET14_ID")
	private String target14Id;

	@Column(name="TARGET14_VALUE")
	private Long target14Value;

	@Column(name="TARGET15_COUNT")
	private Long target15Count;

	@Column(name="TARGET15_ID")
	private String target15Id;

	@Column(name="TARGET15_VALUE")
	private Long target15Value;

	@Column(name="TARGET16_COUNT")
	private Long target16Count;

	@Column(name="TARGET16_ID")
	private String target16Id;

	@Column(name="TARGET16_VALUE")
	private Long target16Value;

	@Column(name="TARGET17_COUNT")
	private Long target17Count;

	@Column(name="TARGET17_ID")
	private String target17Id;

	@Column(name="TARGET17_VALUE")
	private Long target17Value;

	@Column(name="TARGET18_COUNT")
	private Long target18Count;

	@Column(name="TARGET18_ID")
	private String target18Id;

	@Column(name="TARGET18_VALUE")
	private Long target18Value;

	@Column(name="TARGET19_COUNT")
	private Long target19Count;

	@Column(name="TARGET19_ID")
	private String target19Id;

	@Column(name="TARGET19_VALUE")
	private Long target19Value;

	@Column(name="TARGET2_COUNT")
	private Long target2Count;

	@Column(name="TARGET2_ID")
	private String target2Id;

	@Column(name="TARGET2_VALUE")
	private Long target2Value;

	@Column(name="TARGET20_COUNT")
	private Long target20Count;

	@Column(name="TARGET20_ID")
	private String target20Id;

	@Column(name="TARGET20_VALUE")
	private Long target20Value;

	@Column(name="TARGET3_COUNT")
	private Long target3Count;

	@Column(name="TARGET3_ID")
	private String target3Id;

	@Column(name="TARGET3_VALUE")
	private Long target3Value;

	@Column(name="TARGET4_COUNT")
	private Long target4Count;

	@Column(name="TARGET4_ID")
	private String target4Id;

	@Column(name="TARGET4_VALUE")
	private Long target4Value;

	@Column(name="TARGET5_COUNT")
	private Long target5Count;

	@Column(name="TARGET5_ID")
	private String target5Id;

	@Column(name="TARGET5_VALUE")
	private Long target5Value;

	@Column(name="TARGET6_COUNT")
	private Long target6Count;

	@Column(name="TARGET6_ID")
	private String target6Id;

	@Column(name="TARGET6_VALUE")
	private Long target6Value;

	@Column(name="TARGET7_COUNT")
	private Long target7Count;

	@Column(name="TARGET7_ID")
	private String target7Id;

	@Column(name="TARGET7_VALUE")
	private Long target7Value;

	@Column(name="TARGET8_COUNT")
	private Long target8Count;

	@Column(name="TARGET8_ID")
	private String target8Id;

	@Column(name="TARGET8_VALUE")
	private Long target8Value;

	@Column(name="TARGET9_COUNT")
	private Long target9Count;

	@Column(name="TARGET9_ID")
	private String target9Id;

	@Column(name="TARGET9_VALUE")
	private Long target9Value;

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

	public Long getTarget1Count() {
		return target1Count;
	}

	public void setTarget1Count(Long target1Count) {
		this.target1Count = target1Count;
	}

	public String getTarget1Id() {
		return target1Id;
	}

	public void setTarget1Id(String target1Id) {
		this.target1Id = target1Id;
	}

	public Long getTarget1Value() {
		return target1Value;
	}

	public void setTarget1Value(Long target1Value) {
		this.target1Value = target1Value;
	}

	public Long getTarget10Count() {
		return target10Count;
	}

	public void setTarget10Count(Long target10Count) {
		this.target10Count = target10Count;
	}

	public String getTarget10Id() {
		return target10Id;
	}

	public void setTarget10Id(String target10Id) {
		this.target10Id = target10Id;
	}

	public Long getTarget10Value() {
		return target10Value;
	}

	public void setTarget10Value(Long target10Value) {
		this.target10Value = target10Value;
	}

	public Long getTarget11Count() {
		return target11Count;
	}

	public void setTarget11Count(Long target11Count) {
		this.target11Count = target11Count;
	}

	public String getTarget11Id() {
		return target11Id;
	}

	public void setTarget11Id(String target11Id) {
		this.target11Id = target11Id;
	}

	public Long getTarget11Value() {
		return target11Value;
	}

	public void setTarget11Value(Long target11Value) {
		this.target11Value = target11Value;
	}

	public Long getTarget12Count() {
		return target12Count;
	}

	public void setTarget12Count(Long target12Count) {
		this.target12Count = target12Count;
	}

	public String getTarget12Id() {
		return target12Id;
	}

	public void setTarget12Id(String target12Id) {
		this.target12Id = target12Id;
	}

	public Long getTarget12Value() {
		return target12Value;
	}

	public void setTarget12Value(Long target12Value) {
		this.target12Value = target12Value;
	}

	public Long getTarget13Count() {
		return target13Count;
	}

	public void setTarget13Count(Long target13Count) {
		this.target13Count = target13Count;
	}

	public String getTarget13Id() {
		return target13Id;
	}

	public void setTarget13Id(String target13Id) {
		this.target13Id = target13Id;
	}

	public Long getTarget13Value() {
		return target13Value;
	}

	public void setTarget13Value(Long target13Value) {
		this.target13Value = target13Value;
	}

	public Long getTarget14Count() {
		return target14Count;
	}

	public void setTarget14Count(Long target14Count) {
		this.target14Count = target14Count;
	}

	public String getTarget14Id() {
		return target14Id;
	}

	public void setTarget14Id(String target14Id) {
		this.target14Id = target14Id;
	}

	public Long getTarget14Value() {
		return target14Value;
	}

	public void setTarget14Value(Long target14Value) {
		this.target14Value = target14Value;
	}

	public Long getTarget15Count() {
		return target15Count;
	}

	public void setTarget15Count(Long target15Count) {
		this.target15Count = target15Count;
	}

	public String getTarget15Id() {
		return target15Id;
	}

	public void setTarget15Id(String target15Id) {
		this.target15Id = target15Id;
	}

	public Long getTarget15Value() {
		return target15Value;
	}

	public void setTarget15Value(Long target15Value) {
		this.target15Value = target15Value;
	}

	public Long getTarget16Count() {
		return target16Count;
	}

	public void setTarget16Count(Long target16Count) {
		this.target16Count = target16Count;
	}

	public String getTarget16Id() {
		return target16Id;
	}

	public void setTarget16Id(String target16Id) {
		this.target16Id = target16Id;
	}

	public Long getTarget16Value() {
		return target16Value;
	}

	public void setTarget16Value(Long target16Value) {
		this.target16Value = target16Value;
	}

	public Long getTarget17Count() {
		return target17Count;
	}

	public void setTarget17Count(Long target17Count) {
		this.target17Count = target17Count;
	}

	public String getTarget17Id() {
		return target17Id;
	}

	public void setTarget17Id(String target17Id) {
		this.target17Id = target17Id;
	}

	public Long getTarget17Value() {
		return target17Value;
	}

	public void setTarget17Value(Long target17Value) {
		this.target17Value = target17Value;
	}

	public Long getTarget18Count() {
		return target18Count;
	}

	public void setTarget18Count(Long target18Count) {
		this.target18Count = target18Count;
	}

	public String getTarget18Id() {
		return target18Id;
	}

	public void setTarget18Id(String target18Id) {
		this.target18Id = target18Id;
	}

	public Long getTarget18Value() {
		return target18Value;
	}

	public void setTarget18Value(Long target18Value) {
		this.target18Value = target18Value;
	}

	public Long getTarget19Count() {
		return target19Count;
	}

	public void setTarget19Count(Long target19Count) {
		this.target19Count = target19Count;
	}

	public String getTarget19Id() {
		return target19Id;
	}

	public void setTarget19Id(String target19Id) {
		this.target19Id = target19Id;
	}

	public Long getTarget19Value() {
		return target19Value;
	}

	public void setTarget19Value(Long target19Value) {
		this.target19Value = target19Value;
	}

	public Long getTarget2Count() {
		return target2Count;
	}

	public void setTarget2Count(Long target2Count) {
		this.target2Count = target2Count;
	}

	public String getTarget2Id() {
		return target2Id;
	}

	public void setTarget2Id(String target2Id) {
		this.target2Id = target2Id;
	}

	public Long getTarget2Value() {
		return target2Value;
	}

	public void setTarget2Value(Long target2Value) {
		this.target2Value = target2Value;
	}

	public Long getTarget20Count() {
		return target20Count;
	}

	public void setTarget20Count(Long target20Count) {
		this.target20Count = target20Count;
	}

	public String getTarget20Id() {
		return target20Id;
	}

	public void setTarget20Id(String target20Id) {
		this.target20Id = target20Id;
	}

	public Long getTarget20Value() {
		return target20Value;
	}

	public void setTarget20Value(Long target20Value) {
		this.target20Value = target20Value;
	}

	public Long getTarget3Count() {
		return target3Count;
	}

	public void setTarget3Count(Long target3Count) {
		this.target3Count = target3Count;
	}

	public String getTarget3Id() {
		return target3Id;
	}

	public void setTarget3Id(String target3Id) {
		this.target3Id = target3Id;
	}

	public Long getTarget3Value() {
		return target3Value;
	}

	public void setTarget3Value(Long target3Value) {
		this.target3Value = target3Value;
	}

	public Long getTarget4Count() {
		return target4Count;
	}

	public void setTarget4Count(Long target4Count) {
		this.target4Count = target4Count;
	}

	public String getTarget4Id() {
		return target4Id;
	}

	public void setTarget4Id(String target4Id) {
		this.target4Id = target4Id;
	}

	public Long getTarget4Value() {
		return target4Value;
	}

	public void setTarget4Value(Long target4Value) {
		this.target4Value = target4Value;
	}

	public Long getTarget5Count() {
		return target5Count;
	}

	public void setTarget5Count(Long target5Count) {
		this.target5Count = target5Count;
	}

	public String getTarget5Id() {
		return target5Id;
	}

	public void setTarget5Id(String target5Id) {
		this.target5Id = target5Id;
	}

	public Long getTarget5Value() {
		return target5Value;
	}

	public void setTarget5Value(Long target5Value) {
		this.target5Value = target5Value;
	}

	public Long getTarget6Count() {
		return target6Count;
	}

	public void setTarget6Count(Long target6Count) {
		this.target6Count = target6Count;
	}

	public String getTarget6Id() {
		return target6Id;
	}

	public void setTarget6Id(String target6Id) {
		this.target6Id = target6Id;
	}

	public Long getTarget6Value() {
		return target6Value;
	}

	public void setTarget6Value(Long target6Value) {
		this.target6Value = target6Value;
	}

	public Long getTarget7Count() {
		return target7Count;
	}

	public void setTarget7Count(Long target7Count) {
		this.target7Count = target7Count;
	}

	public String getTarget7Id() {
		return target7Id;
	}

	public void setTarget7Id(String target7Id) {
		this.target7Id = target7Id;
	}

	public Long getTarget7Value() {
		return target7Value;
	}

	public void setTarget7Value(Long target7Value) {
		this.target7Value = target7Value;
	}

	public Long getTarget8Count() {
		return target8Count;
	}

	public void setTarget8Count(Long target8Count) {
		this.target8Count = target8Count;
	}

	public String getTarget8Id() {
		return target8Id;
	}

	public void setTarget8Id(String target8Id) {
		this.target8Id = target8Id;
	}

	public Long getTarget8Value() {
		return target8Value;
	}

	public void setTarget8Value(Long target8Value) {
		this.target8Value = target8Value;
	}

	public Long getTarget9Count() {
		return target9Count;
	}

	public void setTarget9Count(Long target9Count) {
		this.target9Count = target9Count;
	}

	public String getTarget9Id() {
		return target9Id;
	}

	public void setTarget9Id(String target9Id) {
		this.target9Id = target9Id;
	}

	public Long getTarget9Value() {
		return target9Value;
	}

	public void setTarget9Value(Long target9Value) {
		this.target9Value = target9Value;
	}
}