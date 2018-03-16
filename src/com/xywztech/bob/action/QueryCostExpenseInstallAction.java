package com.xywztech.bob.action;

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

@ParentPackage("json-default")
@Action(value="/querycostexpenseinstall", results={
    @Result(name="success", type="json")
})
public class QueryCostExpenseInstallAction extends BaseQueryAction{
    
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;
	@Override
	public void prepare() {
    	   
   		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        	StringBuilder s = new StringBuilder
        	   ("select t1.*  from ACRM_F_CI_CONTRIBUTION_S t1 where  t1.CUST_ID='");
        	   s.append(request.getParameter("customerId")+"'");
        	   setPrimaryKey("t1.id");
         	   SQL=s.toString();
               datasource = ds;
    }
    
}





