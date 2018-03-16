package com.xywztech.bcrm.custview.action;

import java.sql.SQLException;
import java.util.Map;

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
import com.xywztech.bob.core.QueryHelper;
import com.xywztech.crm.constance.SystemConstance;

@ParentPackage("json-default")
@Action(value="/customerProductTree", results={
    @Result(name="success", type="json"),
})
public class CustomerProductTreeAction  {
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource ds;  
	private HttpServletRequest request;
	
    private Map<String, Object> JSON;
    public Map<String, Object> getJSON() {
		return JSON;
	}

	public void setJSON(Map<String, Object> jSON) {
		JSON = jSON;
	}
/*
 * 查询客户持有产品树
 */
    public String index() {
    	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        try {
        	StringBuffer sb  = new StringBuffer();
        	if("DB2".equals(SystemConstance.DB_TYPE)){
        		sb.append(" WITH report(CATL_CODE,CATL_NAME,CATL_PARENT,VIEW_DETAIL,CATL_ORDER) AS " +
        			"( SELECT CATL_CODE, CATL_NAME,CATL_PARENT,VIEW_DETAIL,CATL_ORDER " +
        			"FROM OCRM_F_PD_PROD_CATL  " +
        			"WHERE CATL_CODE IN(" +
        			"SELECT DISTINCT CATL_CODE " +
        			"FROM  ACRM_F_AG_AGREEMENT " +
        			"LEFT JOIN OCRM_F_PD_PROD_INFO " +
        			"ON ACRM_F_AG_AGREEMENT.product_id = OCRM_F_PD_PROD_INFO.product_id " +
        			"where 1=1");
        	
	    		//单一客户视图
	        	if(!("").equals(request.getParameter("cust_id"))&&("").equals(request.getParameter("base_id")))
				{
					sb.append(" and ACRM_F_AG_AGREEMENT.CUST_ID = '" + request.getParameter("cust_id")+"'");
				}	
	    		//客户群视图
				else if(("").equals(request.getParameter("cust_id"))&&!("").equals(request.getParameter("base_id")))
				{
					sb.append(" and ACRM_F_AG_AGREEMENT.CUST_ID in ( select ta.cust_id " +
							"from OCRM_F_CI_RELATE_CUST_BASE ta where cust_base_id=" + request.getParameter("base_id")+")");
				}
	           	//客户经理管理视图
				else if(("").equals(request.getParameter("cust_id"))&&("").equals(request.getParameter("base_id"))&&!("").equals(request.getParameter("mgrid"))){
					sb.append(" and ACRM_F_AG_AGREEMENT.CUST_ID in" +
							" (select t.cust_id from OCRM_F_CI_BELONG_CUSTMGR t " +
							"where t.mgr_id = '"+request.getParameter("mgrid")+"')");}
	    	    sb.append(") " +
	        			"UNION ALL " +
	        			"SELECT T1.CATL_CODE, T1.CATL_NAME, T1.CATL_PARENT,T1.VIEW_DETAIL,T1.CATL_ORDER " +
	        			"FROM OCRM_F_PD_PROD_CATL T1, report T2 " +
	        			"WHERE T1.CATL_CODE= T2.CATL_PARENT ) " +
	        			"SELECT DISTINCT CATL_CODE,CATL_NAME,CATL_PARENT,VIEW_DETAIL,CATL_ORDER FROM report ");
        	}else if("ORACLE".equals(SystemConstance.DB_TYPE)){
        		sb.append("SELECT DISTINCT CATL_CODE,CATL_NAME,CATL_PARENT,VIEW_DETAIL,CATL_ORDER FROM OCRM_F_PD_PROD_CATL t "+
        				"connect by t.catl_code = PRIOR t.catl_parent "+
        				"start with t.catl_code in ("+
        				"SELECT DISTINCT CATL_CODE FROM  ACRM_F_AG_AGREEMENT "+
        				"LEFT JOIN OCRM_F_PD_PROD_INFO ON ACRM_F_AG_AGREEMENT.product_id = OCRM_F_PD_PROD_INFO.product_id "+
        				"where 1=1");
        		//单一客户视图
	        	if(!("").equals(request.getParameter("cust_id"))&&("").equals(request.getParameter("base_id")))
				{
					sb.append(" and ACRM_F_AG_AGREEMENT.CUST_ID = '" + request.getParameter("cust_id")+"'");
				}	
	    		//客户群视图
				else if(("").equals(request.getParameter("cust_id"))&&!("").equals(request.getParameter("base_id")))
				{
					sb.append(" and ACRM_F_AG_AGREEMENT.CUST_ID in ( select ta.cust_id " +
							"from OCRM_F_CI_RELATE_CUST_BASE ta where cust_base_id=" + request.getParameter("base_id")+")");
				}
	        	//客户经理管理视图
				else if(("").equals(request.getParameter("cust_id"))&&("").equals(request.getParameter("base_id"))&&!("").equals(request.getParameter("mgrid"))){
					sb.append(" and ACRM_F_AG_AGREEMENT.CUST_ID in" +
							" (select t.cust_id from OCRM_F_CI_BELONG_CUSTMGR t " +
							"where t.mgr_id = '"+request.getParameter("mgrid")+"')");
				}
	        	sb.append(")");
        	}
        	//执行查询动作
        	setJSON(new QueryHelper(sb.toString(), ds.getConnection()).getJSON());
		} catch (SQLException e) {
			e.printStackTrace();
		}
        return "success";
    }
    
}
