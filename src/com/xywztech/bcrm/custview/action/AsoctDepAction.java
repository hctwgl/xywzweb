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

/**
 * 关联存款积数表
 * 
 */

@ParentPackage("json-default")
@Action(value = "/asoct_dep", results = { @Result(name = "success", type = "json") })
public class AsoctDepAction extends BaseQueryAction {

	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String custId = request.getParameter("custId");
		StringBuilder sb = new StringBuilder("" + "select t1.*"
				+ " from ACRM_F_CI_ASOCT_DEP_ACML t1"
				+ " where t1.CST_NO = '"+custId+"'"); 
		setPrimaryKey("t1.CST_NO");
		SQL = sb.toString();
		datasource = ds;
	}
}