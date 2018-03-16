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
import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value="/productEBankQuery", results={
    @Result(name="success", type="json"),
})
public class ProductEBankQueryAction extends BaseQueryAction{
	@Autowired
@Qualifier("dsOracle")	
	private DataSource dsOracle;
	private HttpServletRequest request;
 	@Override
	public void prepare() {

		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get

(StrutsStatics.HTTP_REQUEST);
        StringBuilder sb = new StringBuilder("SELECT t1.*,t3.CUST_ZH_NAME,t4.UNITNAME " +
        		"FROM ACRM_F_CI_ELECBANK_BUINFO  t1 " +
        		"INNER JOIN OCRM_F_PD_PROD_INFO  t2 " +
        		"ON (t1.PRODUCT_ID = t2.PRODUCT_ID) " +
        		"INNER JOIN OCRM_F_CI_CUST_DESC  t3 " +
        		"ON (t1.CUST_ID= t3.CUST_ID) " +
        		"INNER JOIN SYS_UNITS  t4 " +
        		"ON (t1.ORG_ID= t4.UNITID) " +
    	" where 1=1 ");
    	if(!("").equals(request.getParameter("cust_id"))&&("").equals

(request.getParameter("base_id")))
		{
		    sb.append(" and t1.CUST_ID = '" + request.getParameter("cust_id")

+"'");
		}	
		else if(("").equals(request.getParameter("cust_id"))&&!("").equals

(request.getParameter("base_id")))
		{
			sb.append(" and t1.CUST_ID in ( select ta.cust_id " +
					"from OCRM_F_CI_RELATE_CUST_BASE ta where cust_base_id=" + request.getParameter("base_id")+")");
		}	
		else if(("").equals(request.getParameter("cust_id"))&&("").equals(request.getParameter("base_id"))&&!("").equals(request.getParameter("mgrid")))
		{
			sb.append(" and t1.CUST_ID IN (select c.cust_id from  OCRM_F_CI_BELONG_CUSTMGR c where c.mgr_id = '"+request.getParameter("mgrid")+"')");
		}
        sb.append(" and  t2.CATL_CODE=");
        sb.append(request.getParameter("catlCode"));
        setPrimaryKey("t1.ID");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}

