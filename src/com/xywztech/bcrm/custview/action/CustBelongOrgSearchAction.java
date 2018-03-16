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


@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value = "/custBelongOrgSearchAction", results = { @Result(name = "success", type = "json") })
public class CustBelongOrgSearchAction extends CommonAction {

	// 数据源
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	
	@Override
	public void prepare() {


    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String cust_id = request.getParameter("cust_id");
    	String main_type = request.getParameter("main_type");
        StringBuffer sb = new StringBuffer("select 0 as parent_id ,t.* from OCRM_F_CI_BELONG_ORG t where 1>0");
        if(!main_type.equals("")){
        	sb.append(" and t.main_type = '"+main_type+"'");
        }
        if(!cust_id.equals("")){
        	sb.append(" and t.cust_id = '"+cust_id+"'");
        }
        	SQL=sb.toString();
			datasource = ds;
    
	
	}
	
}
