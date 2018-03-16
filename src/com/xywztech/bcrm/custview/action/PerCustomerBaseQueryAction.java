package com.xywztech.bcrm.custview.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.common.CommonAction;

/**
 * 对私客户基本信息查询
 * @author 2012
 * @since 2012-10-10
 */

@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value = "/PerCustomerBaseQueryAction", results = { @Result(name = "success", type = "json")})
public class PerCustomerBaseQueryAction extends CommonAction {
	
	//数据源
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	
	/**
	 *模块功能查询
	 */
    @Override
	public void prepare() {

    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String custId =request.getParameter("custId");
		StringBuilder sb = new StringBuilder(
		"select c.*,b.CERT_TYPE,b.CERT_NUM,t1.USER_NAME as UPDATE_USER_NAME,t2.ORG_NAME as UPDATE_ORG_NAME from OCRM_F_CI_PER_CUST_INFO c  left join OCRM_F_CI_CUST_DESC b on b.CUST_ID = c.CUST_ID");
		sb.append("  left join ADMIN_AUTH_ACCOUNT t1 on t1.ACCOUNT_NAME = c.UPDATE_USER");
		sb.append("  left join ADMIN_AUTH_ORG t2 on t2.ORG_ID = c.UPDATE_ORG");
		sb.append(" where 1=1");
		sb.append("   and c.CUST_ID = '"+custId+"'");

		addOracleLookup("SEX", "DEM0100005");//性别
		addOracleLookup("POLITICAL_STAT", "POL_LANDSCAPE");//政治面貌
		addOracleLookup("FOLK", "DEM0100001");//民族
		addOracleLookup("RELIGION_TYPE", "RELIGION_TYPE");//宗教信仰
		addOracleLookup("CITIZENSHIP", "NAT0100001");//国籍
		addOracleLookup("MARRG_STATUS", "DEM0100003");//婚姻状况
		addOracleLookup("HEALTH_STATUS", "DEM0100016");//健康状况
		addOracleLookup("HOUSEHOLD_TYPE", "HOUSEHOLD_TYPE");//户籍性质
		addOracleLookup("CUST_GRADE", "CDE0100016");//客户级别
		addOracleLookup("CUST_CREDIT_LEVEL", "CDE0100033");//信用等级
		addOracleLookup("EMP_FLAG", "IF_FLAG");//本行员工标志
		addOracleLookup("IS_CURR_BNK_PART", "IF_FLAG");//是否本行股东
		addOracleLookup("UNDE_CUST_TYPE", "IF_FLAG");//代发工资客户类型
		addOracleLookup("EDU_LEVEL", "DEM0100007");//教育水平
		addOracleLookup("WORK_STATE", "WORK_STATE");//就业状态
		addOracleLookup("INDU_CODE", "PAR2100001");//所属单位行业
		addOracleLookup("CURR_WORK_TYPE", "DEM0200002");//单位性质
		addOracleLookup("PER_WORK_PROP", "DEM0100013");//个人从业性质
		addOracleLookup("IS_UNIT_LEADER", "IF_FLAG");//是否单位控制人
		addOracleLookup("MODI_TELLER", "DEM0100013");//职业
		addOracleLookup("HOST_STATUS", "DEM0100014");//居住状况
		addOracleLookup("MAIN_INCO_SOUR", "BCD0100003");//主要收入来源
		addOracleLookup("OTHER_INCO_SOUR", "BCD0100003");//其他经济来源
		addOracleLookup("PER_YE_INCO_CURR", "ACC1300012");//个人税前年收入币种
		addOracleLookup("PER_MON_INCO_CURR", "ACC1300012");//个人月工资收入币种
		addOracleLookup("HOST_YE_INCO_CURR", "ACC1300012");//家庭年收入币种
		addOracleLookup("IS_LIFE_INSU", "IF_FLAG");//是否参加人寿保险
		addOracleLookup("IS_ILLN_INSU", "IF_FLAG");//是否参加大病保险
		addOracleLookup("IS_PENSION", "IF_FLAG");//是否参加养老保险
		addOracleLookup("IS_OWERCAR", "IF_FLAG");//是否拥有车辆
		
        SQL=sb.toString();
        datasource = ds;
	}
}

