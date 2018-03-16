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
 * 客户财务信息列表
 *
 */

@ParentPackage("json-default")

@Action(value="/cust_finc", results={
    @Result(name="success", type="json")})
public class CustFincAction extends BaseQueryAction {

	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String custId = request.getParameter("custId").trim();
		StringBuilder sb = new StringBuilder("select t.*,t1.REPORTFORM as REP_TYP_NAME from ACRM_F_CI_CRD_QYKHCWXX t " +
				" left join ACRM_F_CI_CRD_QYBBLX t1 on t1.DM = t.REP_TYP" +
				" where t.CUSTOM_ID='" + custId+"'");		
		setPrimaryKey("t.ID");
		SQL = sb.toString();
		addOracleLookup("TIME_TYP", "CDE0100057");
		addOracleLookup("REP_STS", "CDE0100068");
		datasource = ds;
	}
}