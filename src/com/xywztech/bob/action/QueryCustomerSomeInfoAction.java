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
@Action(value="/querycustomersomeinfo", results={
    @Result(name="success", type="json")
})
public class QueryCustomerSomeInfoAction extends BaseQueryAction{
    
	@Autowired
    @Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;
	@Override
    public void prepare() 
	{
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        	StringBuilder s = new StringBuilder
        	   ("select t1.*  from OCRM_F_CI_SOME_INFO t1 where  t1.cust_id='");
        	   s.append(request.getParameter("customerId")+"'");/*
          	   int currentPage =this.getStart()/this.getLimit()+1;
               PagingInfo pi = new PagingInfo(this.getLimit(),currentPage);
        	   QueryHelper qh = new QueryHelper(s.toString(), ds.getConnection(),pi);*/
        	   setPrimaryKey("t1.cust_id");
        	   SQL=s.toString();
   	           datasource = ds;
    }
}