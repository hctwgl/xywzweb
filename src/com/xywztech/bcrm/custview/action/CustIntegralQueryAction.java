package com.xywztech.bcrm.custview.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;

@Action("/custintegralquery")
@Results({ @Result(name = "success", type = "redirectAction", params = {
		"actionName", "custintegralquery" }) })
public class CustIntegralQueryAction extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;
	@Override
	public void prepare() {
		// TODO Auto-generated method stub
		 ActionContext ctx = ActionContext.getContext();
		 request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		 //String code_id = request.getParameter("nodeid");

		StringBuilder sb = new StringBuilder("select c.* from  OCRM_F_CI_GIFT c");
		
		SQL = sb.toString();
		setPrimaryKey("c.ID desc");
		//addOracleLookup("APP_STATUS", "APP_STATUS");
		datasource = ds;

	}
}
