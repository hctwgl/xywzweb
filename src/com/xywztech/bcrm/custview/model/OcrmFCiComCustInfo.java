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
 * 对公客户基本信息 model
 * @author songxs
 * @since 2012-9-26
 *
 */
@Entity
@Table(name="OCRM_F_CI_COM_CUST_INFO")
public class OcrmFCiComCustInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="CUST_ID")
	private String custId;//客户号

	@Column(name="BUSI_AREA")
	private String busiArea;//经营场地面积

	@Column(name="BUSI_CONDITION")
	private String busiCondition;//经营状况

	@Column(name="BUSI_INCOME")
	private BigDecimal busiIncome;//销售收入

	@Column(name="BUSI_MAIN")
	private String busiMain;//主营业务

	@Column(name="BUSI_POSIT_RIGHTS")
	private String busiPositRights;//经营产地所有权

	@Column(name="BUSI_RAGE")
	private String busiRage;//经营范围

	@Column(name="CREDIT_GRADE")
	private String creditGrade;//信用评级

	@Column(name="CUST_CN_NAME")
	private String custCnName;//客户中文名称

	@Column(name="CUST_EN_NAME")
	private String custEnName;//客户英文名称

	@Column(name="ENT_ASSETS")
	private BigDecimal entAssets;//资产总额

	@Column(name="ENT_BELONG")
	private String entBelong;//企业隶属

	@Column(name="ENT_BUSI_TYPE")
	private String entBusiType;//客户业务类型

	@Column(name="ENT_COUNTRY")
	private String entCountry;//所在国家（地区）

	@Column(name="ENT_CUST_GRADE")
	private String entCustGrade;//客户级别

	@Column(name="ENT_CUST_TYPE")
	private String entCustType;//对公客户类型

	@Column(name="ENT_DEBT")
	private BigDecimal entDebt;//负债总额

	@Column(name="ENT_ECOM_TYPE")
	private String entEcomType;//企业经济性质

	@Column(name="ENT_EMAIL")
	private String entEmail;//公司EMAIL

	@Column(name="ENT_EMPLOYEES")
	private Long entEmployees;//职工人数

	@Column(name="ENT_ENT_ADDR")
	private String entEntAddr;//办公地址

	@Column(name="ENT_HOLDING_TYPE")
	private String entHoldingType;//客户控股类型

	@Column(name="ENT_LINKFAX")
	private String entLinkfax;//传真电话

	@Column(name="ENT_LINKPHONE")
	private String entLinkphone;//联系电话

	@Column(name="ENT_MAIN_INDUSTRY")
	private String entMainIndustry;//行业分类（主营）

	@Column(name="ENT_MASTER")
	private String entMaster;//法定代表人/负责人

	@Column(name="ENT_MASTER_CRET_NUM")
	private String entMasterCretNum;//法定代表人证件号码

	@Column(name="ENT_MASTER_CRET_TYP")
	private String entMasterCretTyp;//法定代表人证件类型

	@Column(name="ENT_OFFICE_ADDR")
	private String entOfficeAddr;//办公地址

	@Column(name="ENT_OFFICE_POST")
	private String entOfficePost;//办公地址邮政编码

	@Column(name="ENT_PROVINCE")
	private String entProvince;//注册地省份、直辖市、自治区

	@Column(name="ENT_REG_ADDR")
	private String entRegAddr;//注册地址

	@Column(name="ENT_REG_AMT")
	private BigDecimal entRegAmt;//注册资本

	@Column(name="ENT_REG_CURR")
	private String entRegCurr;//注册资本币别

	@Column(name="ENT_REG_POST")
	private String entRegPost;//注册地址邮政编码

	@Column(name="ENT_SCALE")
	private String entScale;//企业规模

	@Column(name="ENT_SECOND_INDUSTRY")
	private String entSecondIndustry;//行业分类（副营）

    @Temporal( TemporalType.DATE)
	@Column(name="ENT_SETUP_DATE")
	private Date entSetupDate;//企业成立日期

	@Column(name="ENT_SSZB_AMT")
	private BigDecimal entSszbAmt;//实收资本

	@Column(name="ENT_SSZB_CURR")
	private String entSszbCurr;//实收资本币种

	@Column(name="ENT_WEBSITE")
	private String entWebsite;//公司网址

	@Column(name="GROUP_FLAG")
	private String groupFlag;//集团客户标志

	@Column(name="IF_GEOPONICS")
	private String ifGeoponics;//是否涉农

	@Column(name="IF_INOUT")
	private String ifInout;//是否有进出口权

	@Column(name="IF_IPO")
	private String ifIpo;//是否上市公司

	@Column(name="IF_LIMIT_INDUSTRY")
	private String ifLimitIndustry;//是否有进出口权

	@Column(name="IF_NETBANK")
	private String ifNetbank;//是否网银签约客户

	@Column(name="IF_RELATION")
	private String ifRelation;//是否我行关联方

	@Column(name="IF_SMALLENT")
	private String ifSmallent;//是否小企业

	private String remark;//备注

    @Temporal( TemporalType.DATE)
	@Column(name="UPDATE_DATE")
	private Date updateDate;//最近更新日期

	@Column(name="UPDATE_ORG")
	private String updateOrg;//最近更新机构

	@Column(name="UPDATE_SYS")
	private String updateSys;//最近更新系统

	@Column(name="UPDATE_USER")
	private String updateUser;//最近更新人

    public OcrmFCiComCustInfo() {
    }

	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getBusiArea() {
		return this.busiArea;
	}

	public void setBusiArea(String busiArea) {
		this.busiArea = busiArea;
	}

	public String getBusiCondition() {
		return this.busiCondition;
	}

	public void setBusiCondition(String busiCondition) {
		this.busiCondition = busiCondition;
	}

	public BigDecimal getBusiIncome() {
		return this.busiIncome;
	}

	public void setBusiIncome(BigDecimal busiIncome) {
		this.busiIncome = busiIncome;
	}

	public String getBusiMain() {
		return this.busiMain;
	}

	public void setBusiMain(String busiMain) {
		this.busiMain = busiMain;
	}

	public String getBusiPositRights() {
		return this.busiPositRights;
	}

	public void setBusiPositRights(String busiPositRights) {
		this.busiPositRights = busiPositRights;
	}

	public String getBusiRage() {
		return this.busiRage;
	}

	public void setBusiRage(String busiRage) {
		this.busiRage = busiRage;
	}

	public String getCreditGrade() {
		return this.creditGrade;
	}

	public void setCreditGrade(String creditGrade) {
		this.creditGrade = creditGrade;
	}

	public String getCustCnName() {
		return this.custCnName;
	}

	public void setCustCnName(String custCnName) {
		this.custCnName = custCnName;
	}

	public String getCustEnName() {
		return this.custEnName;
	}

	public void setCustEnName(String custEnName) {
		this.custEnName = custEnName;
	}

	public BigDecimal getEntAssets() {
		return this.entAssets;
	}

	public void setEntAssets(BigDecimal entAssets) {
		this.entAssets = entAssets;
	}

	public String getEntBelong() {
		return this.entBelong;
	}

	public void setEntBelong(String entBelong) {
		this.entBelong = entBelong;
	}

	public String getEntBusiType() {
		return this.entBusiType;
	}

	public void setEntBusiType(String entBusiType) {
		this.entBusiType = entBusiType;
	}

	public String getEntCountry() {
		return this.entCountry;
	}

	public void setEntCountry(String entCountry) {
		this.entCountry = entCountry;
	}

	public String getEntCustGrade() {
		return this.entCustGrade;
	}

	public void setEntCustGrade(String entCustGrade) {
		this.entCustGrade = entCustGrade;
	}

	public String getEntCustType() {
		return this.entCustType;
	}

	public void setEntCustType(String entCustType) {
		this.entCustType = entCustType;
	}

	public BigDecimal getEntDebt() {
		return this.entDebt;
	}

	public void setEntDebt(BigDecimal entDebt) {
		this.entDebt = entDebt;
	}

	public String getEntEcomType() {
		return this.entEcomType;
	}

	public void setEntEcomType(String entEcomType) {
		this.entEcomType = entEcomType;
	}

	public String getEntEmail() {
		return this.entEmail;
	}

	public void setEntEmail(String entEmail) {
		this.entEmail = entEmail;
	}

	public Long getEntEmployees() {
		return this.entEmployees;
	}

	public void setEntEmployees(Long entEmployees) {
		this.entEmployees = entEmployees;
	}

	public String getEntEntAddr() {
		return this.entEntAddr;
	}

	public void setEntEntAddr(String entEntAddr) {
		this.entEntAddr = entEntAddr;
	}

	public String getEntHoldingType() {
		return this.entHoldingType;
	}

	public void setEntHoldingType(String entHoldingType) {
		this.entHoldingType = entHoldingType;
	}

	public String getEntLinkfax() {
		return this.entLinkfax;
	}

	public void setEntLinkfax(String entLinkfax) {
		this.entLinkfax = entLinkfax;
	}

	public String getEntLinkphone() {
		return this.entLinkphone;
	}

	public void setEntLinkphone(String entLinkphone) {
		this.entLinkphone = entLinkphone;
	}

	public String getEntMainIndustry() {
		return this.entMainIndustry;
	}

	public void setEntMainIndustry(String entMainIndustry) {
		this.entMainIndustry = entMainIndustry;
	}

	public String getEntMaster() {
		return this.entMaster;
	}

	public void setEntMaster(String entMaster) {
		this.entMaster = entMaster;
	}

	public String getEntMasterCretNum() {
		return this.entMasterCretNum;
	}

	public void setEntMasterCretNum(String entMasterCretNum) {
		this.entMasterCretNum = entMasterCretNum;
	}

	public String getEntMasterCretTyp() {
		return this.entMasterCretTyp;
	}

	public void setEntMasterCretTyp(String entMasterCretTyp) {
		this.entMasterCretTyp = entMasterCretTyp;
	}

	public String getEntOfficeAddr() {
		return this.entOfficeAddr;
	}

	public void setEntOfficeAddr(String entOfficeAddr) {
		this.entOfficeAddr = entOfficeAddr;
	}

	public String getEntOfficePost() {
		return this.entOfficePost;
	}

	public void setEntOfficePost(String entOfficePost) {
		this.entOfficePost = entOfficePost;
	}

	public String getEntProvince() {
		return this.entProvince;
	}

	public void setEntProvince(String entProvince) {
		this.entProvince = entProvince;
	}

	public String getEntRegAddr() {
		return this.entRegAddr;
	}

	public void setEntRegAddr(String entRegAddr) {
		this.entRegAddr = entRegAddr;
	}

	public BigDecimal getEntRegAmt() {
		return this.entRegAmt;
	}

	public void setEntRegAmt(BigDecimal entRegAmt) {
		this.entRegAmt = entRegAmt;
	}

	public String getEntRegCurr() {
		return this.entRegCurr;
	}

	public void setEntRegCurr(String entRegCurr) {
		this.entRegCurr = entRegCurr;
	}

	public String getEntRegPost() {
		return this.entRegPost;
	}

	public void setEntRegPost(String entRegPost) {
		this.entRegPost = entRegPost;
	}

	public String getEntScale() {
		return this.entScale;
	}

	public void setEntScale(String entScale) {
		this.entScale = entScale;
	}

	public String getEntSecondIndustry() {
		return this.entSecondIndustry;
	}

	public void setEntSecondIndustry(String entSecondIndustry) {
		this.entSecondIndustry = entSecondIndustry;
	}

	public Date getEntSetupDate() {
		return this.entSetupDate;
	}

	public void setEntSetupDate(Date entSetupDate) {
		this.entSetupDate = entSetupDate;
	}

	public BigDecimal getEntSszbAmt() {
		return this.entSszbAmt;
	}

	public void setEntSszbAmt(BigDecimal entSszbAmt) {
		this.entSszbAmt = entSszbAmt;
	}

	public String getEntSszbCurr() {
		return this.entSszbCurr;
	}

	public void setEntSszbCurr(String entSszbCurr) {
		this.entSszbCurr = entSszbCurr;
	}

	public String getEntWebsite() {
		return this.entWebsite;
	}

	public void setEntWebsite(String entWebsite) {
		this.entWebsite = entWebsite;
	}

	public String getGroupFlag() {
		return this.groupFlag;
	}

	public void setGroupFlag(String groupFlag) {
		this.groupFlag = groupFlag;
	}

	public String getIfGeoponics() {
		return this.ifGeoponics;
	}

	public void setIfGeoponics(String ifGeoponics) {
		this.ifGeoponics = ifGeoponics;
	}

	public String getIfInout() {
		return this.ifInout;
	}

	public void setIfInout(String ifInout) {
		this.ifInout = ifInout;
	}

	public String getIfIpo() {
		return this.ifIpo;
	}

	public void setIfIpo(String ifIpo) {
		this.ifIpo = ifIpo;
	}

	public String getIfLimitIndustry() {
		return this.ifLimitIndustry;
	}

	public void setIfLimitIndustry(String ifLimitIndustry) {
		this.ifLimitIndustry = ifLimitIndustry;
	}

	public String getIfNetbank() {
		return this.ifNetbank;
	}

	public void setIfNetbank(String ifNetbank) {
		this.ifNetbank = ifNetbank;
	}

	public String getIfRelation() {
		return this.ifRelation;
	}

	public void setIfRelation(String ifRelation) {
		this.ifRelation = ifRelation;
	}

	public String getIfSmallent() {
		return this.ifSmallent;
	}

	public void setIfSmallent(String ifSmallent) {
		this.ifSmallent = ifSmallent;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

}