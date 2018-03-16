package com.xywztech.bcrm.custmanager.action;

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
@Action(value = "/monthInfo-Action", results = { @Result(name = "success", type = "json")})
public class MonthInfoAction extends BaseQueryAction {
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;

	
    @Override
	public void prepare() {

		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String a = request.getParameter("worklogId");
		int b = Integer.parseInt(a);
		StringBuilder sb = new StringBuilder(
				" select c.* from OCRM_F_WP_WORKLOG_M_DETAIL c where 1>0 and c.worklog_id = '"+b+"' ");

		

	
		setPrimaryKey("c.ID");
        
        SQL=sb.toString();
        datasource = ds;
	}
}


