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
 * 存贷积数使用情况登记表
 * 
 */

@ParentPackage("json-default")
@Action(value = "/dep_ln_asoct_rgst", results = { @Result(name = "success", type = "json") })
public class DepLnAsoctRgstAction extends BaseQueryAction {

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
				+ " from ACRM_F_CI_DEP_LN_ASOCT_USED t1"
				+ " where t1.PRIM_CST_ID = '"+custId+"'");
		setPrimaryKey("t1.LN_AR_ID");
		SQL = sb.toString();
		datasource = ds;
	}
}