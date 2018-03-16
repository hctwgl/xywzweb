package com.xywztech.bcrm.custview.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the OCRM_F_CI_PER_CUST_INFO database table.
 * 
 */
@Entity
@Table(name="OCRM_F_CI_PER_CUST_INFO")
public class OcrmFCiPerCustInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="CUST_ID")
	private String custId;//客户号

	@Column(name="BIERH_ADDRESS")
	private String bierhAddress;//籍贯

    @Temporal( TemporalType.DATE)
	private Date birthday;//出生日期

	@Column(name="BURDEN_NUMS")
	private Integer burdenNums;//供养人数

	private String citizenship;//国籍

	@Column(name="CURR_CITY")
	private String currCity;//所在城市

	@Column(name="CURR_CITY_TIME")
	private String currCityTime;//所在城市居住时间

    @Temporal( TemporalType.DATE)
	@Column(name="CURR_WORK_TIME")
	private Date currWorkTime;//现单位工作时间

	@Column(name="CURR_WORK_TYPE")
	private String currWorkType;//单位性质

	@Column(name="CUST_CREDIT_LEVEL")
	private String custCreditLevel;//信用等级

	@Column(name="CUST_EN_NAME")
	private String custEnName;//英文名

	@Column(name="CUST_GRADE")
	private String custGrade;//客户级别

	@Column(name="CUST_ZH_NAME")
	private String custZhName;//中文名

	@Column(name="EDU_LEVEL")
	private String eduLevel;//教育水平

	private String email;//邮箱

	@Column(name="EMP_FLAG")
	private String empFlag;//本行员工标志

	@Column(name="EQUITY_TYPE")
	private String equityType;//产权性质

	private String folk;//民族

    @Temporal( TemporalType.DATE)
	@Column(name="GRADUATE_DATE")
	private Date graduateDate;//毕业时间

	@Column(name="GRADUATE_SCHOOL")
	private String graduateSchool;//毕业学校

	@Column(name="HEALTH_STATUS")
	private String healthStatus;//健康状况

	@Column(name="HOST_ADDR")
	private String hostAddr;//家庭住址

	@Column(name="HOST_POST_NO")
	private String hostPostNo;//家庭地址邮编

	@Column(name="HOST_STATUS")
	private String hostStatus;//居住状况

	@Column(name="HOST_TEL_NUM")
	private String hostTelNum;//家庭联系电话

	@Column(name="HOST_YE_INCO_CURR")
	private String hostYeIncoCurr;//家庭年收入币种

	@Column(name="HOST_YE_INCOME")
	private BigDecimal hostYeIncome;//家庭年收入金额

	@Column(name="HOUSEHOLD_TYPE")
	private String householdType;//户籍性质

	@Column(name="INDU_CODE")
	private String induCode;//所属单位行业

	@Column(name="IS_CURR_BNK_PART")
	private String isCurrBnkPart;//是否本行股东

	@Column(name="IS_ILLN_INSU")
	private String isIllnInsu;//是否参加大病保险

	@Column(name="IS_LIFE_INSU")
	private String isLifeInsu;//是否参加人寿保险

	@Column(name="IS_OWERCAR")
	private String isOwercar;//是否拥有车辆

	@Column(name="IS_PENSION")
	private String isPension;//是否参加养老保险

	@Column(name="IS_UNIT_LEADER")
	private String isUnitLeader;//是否单位控制人

	@Column(name="LABOR_CONT_LIMIT")
	private Integer laborContLimit;//劳动合同期限

	@Column(name="MAIN_INCO_SOUR")
	private String mainIncoSour;//主要收入来源

	@Column(name="MARRG_STATUS")
	private String marrgStatus;//婚姻状况

	@Column(name="MODI_BRCCODE")
	private String modiBrccode;//职务

	@Column(name="MODI_TELLER")
	private String modiTeller;//职业

	@Column(name="OFFICE_PHONE")
	private String officePhone;//办公电话

	@Column(name="OTHER_CONTACT")
	private String otherContact;//其他联系方式

	@Column(name="OTHER_INCO_SOUR")
	private String otherIncoSour;//其他经济来源

	@Column(name="PER_CUST_IDEN")
	private String perCustIden;//私人银行客户标识

	@Column(name="PER_DESC")
	private String perDesc;//个人描述

	@Column(name="PER_MON_INCO_CURR")
	private String perMonIncoCurr;//个人月工资收入币种

	@Column(name="PER_MON_INCOME")
	private BigDecimal perMonIncome;//个人月工资收入

	@Column(name="PER_WORK_PROP")
	private String perWorkProp;//个人从业性质

	@Column(name="PER_YE_INCO_CURR")
	private String perYeIncoCurr;//个人税前年收入币种

	@Column(name="PER_YE_INCOME")
	private BigDecimal perYeIncome;//个人税前年收入金额

	@Column(name="POLITICAL_STAT")
	private String politicalStat;//政治面貌

	@Column(name="QQ_NO")
	private String qqNo;//QQ

	@Column(name="RELIGION_TYPE")
	private String religionType;//宗教信仰

	private String remark;//备注

	private String resume;//个人简历

	@Column(name="SEN_ADDR")
	private String senAddr;//户口所在地

	private String sex;//性别

	@Column(name="SOC_POSI")
	private String socPosi;//社会职务

	@Column(name="TELEPHONE_NUM")
	private String telephoneNum;//移动电话

	@Column(name="UNDE_CUST_TYPE")
	private String undeCustType;//代发工资客户类型

    @Temporal( TemporalType.DATE)
	@Column(name="UPDATE_DATE")
	private Date updateDate;//最近更新日期

	@Column(name="UPDATE_ORG")
	private String updateOrg;//最近更新机构

	@Column(name="UPDATE_SYS")
	private String updateSys;//最近更新系统

	@Column(name="UPDATE_USER")
	private String updateUser;//最近更新人

	@Column(name="USED_NAME")
	private String usedName;//曾用名

	private String weibo;//微博

	@Column(name="WORK_DEPT")
	private String workDept;//单位部门

	@Column(name="WORK_POST_NO")
	private String workPostNo;//办公地址邮编

	@Column(name="WORK_STATE")
	private String workState;//就业状态

    @Temporal( TemporalType.DATE)
	@Column(name="WORK_TIME")
	private Date workTime;//工作时间

	@Column(name="WORK_UNIT")
	private String workUnit;//工作单位名称

	@Column(name="WROK_PLACE")
	private String wrokPlace;//办公地址

    public OcrmFCiPerCustInfo() {
    }

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getBierhAddress() {
		return this.bierhAddress;
	}

	public void setBierhAddress(String bierhAddress) {
		this.bierhAddress = bierhAddress;
	}

	public Date getBirthday() {
		return this.birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Integer getBurdenNums() {
		return this.burdenNums;
	}

	public void setBurdenNums(Integer burdenNums) {
		this.burdenNums = burdenNums;
	}

	public String getCitizenship() {
		return this.citizenship;
	}

	public void setCitizenship(String citizenship) {
		this.citizenship = citizenship;
	}

	public String getCurrCity() {
		return this.currCity;
	}

	public void setCurrCity(String currCity) {
		this.currCity = currCity;
	}

	public String getCurrCityTime() {
		return this.currCityTime;
	}

	public void setCurrCityTime(String currCityTime) {
		this.currCityTime = currCityTime;
	}

	public Date getCurrWorkTime() {
		return this.currWorkTime;
	}

	public void setCurrWorkTime(Date currWorkTime) {
		this.currWorkTime = currWorkTime;
	}

	public String getCurrWorkType() {
		return this.currWorkType;
	}

	public void setCurrWorkType(String currWorkType) {
		this.currWorkType = currWorkType;
	}

	public String getCustCreditLevel() {
		return this.custCreditLevel;
	}

	public void setCustCreditLevel(String custCreditLevel) {
		this.custCreditLevel = custCreditLevel;
	}

	public String getCustEnName() {
		return this.custEnName;
	}

	public void setCustEnName(String custEnName) {
		this.custEnName = custEnName;
	}

	public String getCustGrade() {
		return this.custGrade;
	}

	public void setCustGrade(String custGrade) {
		this.custGrade = custGrade;
	}

	public String getCustZhName() {
		return this.custZhName;
	}

	public void setCustZhName(String custZhName) {
		this.custZhName = custZhName;
	}

	public String getEduLevel() {
		return this.eduLevel;
	}

	public void setEduLevel(String eduLevel) {
		this.eduLevel = eduLevel;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmpFlag() {
		return this.empFlag;
	}

	public void setEmpFlag(String empFlag) {
		this.empFlag = empFlag;
	}

	public String getEquityType() {
		return this.equityType;
	}

	public void setEquityType(String equityType) {
		this.equityType = equityType;
	}

	public String getFolk() {
		return this.folk;
	}

	public void setFolk(String folk) {
		this.folk = folk;
	}

	public Date getGraduateDate() {
		return this.graduateDate;
	}

	public void setGraduateDate(Date graduateDate) {
		this.graduateDate = graduateDate;
	}

	public String getGraduateSchool() {
		return this.graduateSchool;
	}

	public void setGraduateSchool(String graduateSchool) {
		this.graduateSchool = graduateSchool;
	}

	public String getHealthStatus() {
		return this.healthStatus;
	}

	public void setHealthStatus(String healthStatus) {
		this.healthStatus = healthStatus;
	}

	public String getHostAddr() {
		return this.hostAddr;
	}

	public void setHostAddr(String hostAddr) {
		this.hostAddr = hostAddr;
	}

	public String getHostPostNo() {
		return this.hostPostNo;
	}

	public void setHostPostNo(String hostPostNo) {
		this.hostPostNo = hostPostNo;
	}

	public String getHostStatus() {
		return this.hostStatus;
	}

	public void setHostStatus(String hostStatus) {
		this.hostStatus = hostStatus;
	}

	public String getHostTelNum() {
		return this.hostTelNum;
	}

	public void setHostTelNum(String hostTelNum) {
		this.hostTelNum = hostTelNum;
	}

	public String getHostYeIncoCurr() {
		return this.hostYeIncoCurr;
	}

	public void setHostYeIncoCurr(String hostYeIncoCurr) {
		this.hostYeIncoCurr = hostYeIncoCurr;
	}

	public BigDecimal getHostYeIncome() {
		return this.hostYeIncome;
	}

	public void setHostYeIncome(BigDecimal hostYeIncome) {
		this.hostYeIncome = hostYeIncome;
	}

	public String getHouseholdType() {
		return this.householdType;
	}

	public void setHouseholdType(String householdType) {
		this.householdType = householdType;
	}

	public String getInduCode() {
		return this.induCode;
	}

	public void setInduCode(String induCode) {
		this.induCode = induCode;
	}

	public String getIsCurrBnkPart() {
		return this.isCurrBnkPart;
	}

	public void setIsCurrBnkPart(String isCurrBnkPart) {
		this.isCurrBnkPart = isCurrBnkPart;
	}

	public String getIsIllnInsu() {
		return this.isIllnInsu;
	}

	public void setIsIllnInsu(String isIllnInsu) {
		this.isIllnInsu = isIllnInsu;
	}

	public String getIsLifeInsu() {
		return this.isLifeInsu;
	}

	public void setIsLifeInsu(String isLifeInsu) {
		this.isLifeInsu = isLifeInsu;
	}

	public String getIsOwercar() {
		return this.isOwercar;
	}

	public void setIsOwercar(String isOwercar) {
		this.isOwercar = isOwercar;
	}

	public String getIsPension() {
		return this.isPension;
	}

	public void setIsPension(String isPension) {
		this.isPension = isPension;
	}

	public String getIsUnitLeader() {
		return this.isUnitLeader;
	}

	public void setIsUnitLeader(String isUnitLeader) {
		this.isUnitLeader = isUnitLeader;
	}

	public Integer getLaborContLimit() {
		return this.laborContLimit;
	}

	public void setLaborContLimit(Integer laborContLimit) {
		this.laborContLimit = laborContLimit;
	}

	public String getMainIncoSour() {
		return this.mainIncoSour;
	}

	public void setMainIncoSour(String mainIncoSour) {
		this.mainIncoSour = mainIncoSour;
	}

	public String getMarrgStatus() {
		return this.marrgStatus;
	}

	public void setMarrgStatus(String marrgStatus) {
		this.marrgStatus = marrgStatus;
	}

	public String getModiBrccode() {
		return this.modiBrccode;
	}

	public void setModiBrccode(String modiBrccode) {
		this.modiBrccode = modiBrccode;
	}

	public String getModiTeller() {
		return this.modiTeller;
	}

	public void setModiTeller(String modiTeller) {
		this.modiTeller = modiTeller;
	}

	public String getOfficePhone() {
		return this.officePhone;
	}

	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}

	public String getOtherContact() {
		return this.otherContact;
	}

	public void setOtherContact(String otherContact) {
		this.otherContact = otherContact;
	}

	public String getOtherIncoSour() {
		return this.otherIncoSour;
	}

	public void setOtherIncoSour(String otherIncoSour) {
		this.otherIncoSour = otherIncoSour;
	}

	public String getPerCustIden() {
		return this.perCustIden;
	}

	public void setPerCustIden(String perCustIden) {
		this.perCustIden = perCustIden;
	}

	public String getPerDesc() {
		return this.perDesc;
	}

	public void setPerDesc(String perDesc) {
		this.perDesc = perDesc;
	}

	public String getPerMonIncoCurr() {
		return this.perMonIncoCurr;
	}

	public void setPerMonIncoCurr(String perMonIncoCurr) {
		this.perMonIncoCurr = perMonIncoCurr;
	}

	public BigDecimal getPerMonIncome() {
		return this.perMonIncome;
	}

	public void setPerMonIncome(BigDecimal perMonIncome) {
		this.perMonIncome = perMonIncome;
	}

	public String getPerWorkProp() {
		return this.perWorkProp;
	}

	public void setPerWorkProp(String perWorkProp) {
		this.perWorkProp = perWorkProp;
	}

	public String getPerYeIncoCurr() {
		return this.perYeIncoCurr;
	}

	public void setPerYeIncoCurr(String perYeIncoCurr) {
		this.perYeIncoCurr = perYeIncoCurr;
	}

	public BigDecimal getPerYeIncome() {
		return this.perYeIncome;
	}

	public void setPerYeIncome(BigDecimal perYeIncome) {
		this.perYeIncome = perYeIncome;
	}

	public String getPoliticalStat() {
		return this.politicalStat;
	}

	public void setPoliticalStat(String politicalStat) {
		this.politicalStat = politicalStat;
	}

	public String getQqNo() {
		return this.qqNo;
	}

	public void setQqNo(String qqNo) {
		this.qqNo = qqNo;
	}

	public String getReligionType() {
		return this.religionType;
	}

	public void setReligionType(String religionType) {
		this.religionType = religionType;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getResume() {
		return this.resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public String getSenAddr() {
		return this.senAddr;
	}

	public void setSenAddr(String senAddr) {
		this.senAddr = senAddr;
	}

	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSocPosi() {
		return this.socPosi;
	}

	public void setSocPosi(String socPosi) {
		this.socPosi = socPosi;
	}

	public String getTelephoneNum() {
		return this.telephoneNum;
	}

	public void setTelephoneNum(String telephoneNum) {
		this.telephoneNum = telephoneNum;
	}

	public String getUndeCustType() {
		return this.undeCustType;
	}

	public void setUndeCustType(String undeCustType) {
		this.undeCustType = undeCustType;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getUpdateOrg() {
		return this.updateOrg;
	}

	public void setUpdateOrg(String updateOrg) {
		this.updateOrg = updateOrg;
	}

	public String getUpdateSys() {
		return this.updateSys;
	}

	public void setUpdateSys(String updateSys) {
		this.updateSys = updateSys;
	}

	public String getUpdateUser() {
		return this.updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public String getUsedName() {
		return this.usedName;
	}

	public void setUsedName(String usedName) {
		this.usedName = usedName;
	}

	public String getWeibo() {
		return this.weibo;
	}

	public void setWeibo(String weibo) {
		this.weibo = weibo;
	}

	public String getWorkDept() {
		return this.workDept;
	}

	public void setWorkDept(String workDept) {
		this.workDept = workDept;
	}

	public String getWorkPostNo() {
		return this.workPostNo;
	}

	public void setWorkPostNo(String workPostNo) {
		this.workPostNo = workPostNo;
	}

	public String getWorkState() {
		return this.workState;
	}

	public void setWorkState(String workState) {
		this.workState = workState;
	}

	public Date getWorkTime() {
		return this.workTime;
	}

	public void setWorkTime(Date workTime) {
		this.workTime = workTime;
	}

	public String getWorkUnit() {
		return this.workUnit;
	}

	public void setWorkUnit(String workUnit) {
		this.workUnit = workUnit;
	}

	public String getWrokPlace() {
		return this.wrokPlace;
	}

	public void setWrokPlace(String wrokPlace) {
		this.wrokPlace = wrokPlace;
	}

}