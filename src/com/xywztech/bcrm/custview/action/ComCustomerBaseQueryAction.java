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
 * 
 *对公客户基本信息查询
 * @author songxs
 * @since 2012-9-26
 * 
 */
@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value = "/ComCustomerBaseQuery-Action", results = { @Result(name = "success", type = "json")})
public class ComCustomerBaseQueryAction extends CommonAction {
	
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
		"select c.*,t.CERT_TYPE,t.CERT_NUM,t1.USER_NAME as UPDATE_USER_NAME,t2.ORG_NAME as UPDATE_ORG_NAME," +
		"t3.F_VALUE AS ENT_MAIN_INDUSTRY_NAME,t4.F_VALUE AS ENT_SECOND_INDUSTRY_NAME " +
		"from OCRM_F_CI_COM_CUST_INFO c  left join OCRM_F_CI_CUST_DESC t on t.CUST_ID = c.CUST_ID  ");
		sb.append( " left join ADMIN_AUTH_ACCOUNT t1 on t1.ACCOUNT_NAME = c.UPDATE_USER");
		sb.append( " left join ADMIN_AUTH_ORG t2 on t2.ORG_ID = c.UPDATE_ORG");
		sb.append( " left join OCRM_SYS_LOOKUP_ITEM t3 on t3.F_CODE = c.ENT_MAIN_INDUSTRY ");
		sb.append( " left join OCRM_SYS_LOOKUP_ITEM t4 on t4.F_CODE = c.ENT_SECOND_INDUSTRY");
		sb.append( " where  1=1 ");
		sb.append(" and c.CUST_ID = '"+custId+"'");
	
		
		addOracleLookup("ENT_MASTER_CRET_TYP", "PAR0100021");//法定代表人证件类型
		addOracleLookup("ENT_HOLDING_TYPE", "CDE0100015");//客户控股类型
        addOracleLookup("ENT_MAIN_INDUSTRY", "PAR2100001");//行业分类(主营)
        addOracleLookup("ENT_SECOND_INDUSTRY", "PAR0100021");//行业分类(副营)
        addOracleLookup("ENT_SCALE", "DEM0200004");//企业规模
        addOracleLookup("ENT_BELONG", "CDE0100021");//企业隶属
        addOracleLookup("ENT_ECOM_TYPE", "DEM0200002");//企业经济性质
        addOracleLookup("ENT_CUST_TYPE", "CDE0100018");//对公客户类型
        addOracleLookup("CREDIT_GRADE", "CDE0100033");//信用评级
        addOracleLookup("ENT_CUST_GRADE", "CDE0100016");//客户级别
        addOracleLookup("IF_IPO", "IF_FLAG");//是否上市公司
        addOracleLookup("IF_INOUT", "IF_FLAG");//是否有进出口权
        addOracleLookup("IF_NERBANK", "IF_FLAG");//是否网银签约客户
        addOracleLookup("IF_GEOPONICS", "IF_FLAG");//是否涉农
        addOracleLookup("IF_SMALLENT", "IF_FLAG");//是否小企业
        addOracleLookup("GROUP_FLAG", "IF_FLAG");//集团客户标志
        addOracleLookup("IF_RELATION", "IF_FLAG");//是否我行关联方
        addOracleLookup("IF_LIMIT_INDUSTRY", "IF_FLAG");//是否限制行业
        addOracleLookup("ENT_BUSI_TYPE", "CUST_BSNESSTYPE");//客户业务类型
        addOracleLookup("ENT_COUNTRY", "DEM0100011");//所在国家(地区)
        addOracleLookup("ENT_REG_CURR", "ACC1300012");//注册资本币别
        addOracleLookup("BUSI_POSIT_RIGHTS", "CDE0100042");//经营场地所有权
        addOracleLookup("BUSI_CONDITION", "PAR0900005");//经营状况
        addOracleLookup("CERT_TYPE","COM_CRET_TYPE");//证件类型
        
        SQL=sb.toString();
        datasource = ds;
	}
}
