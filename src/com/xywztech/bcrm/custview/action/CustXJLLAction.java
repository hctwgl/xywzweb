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
 * 客户现金流量表
 *
 */

@ParentPackage("json-default")

@Action(value="/cust_xjll", results={
    @Result(name="success", type="json")})
public class CustXJLLAction extends BaseQueryAction {

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
		String repTyp = request.getParameter("repTyp").trim();		//报表类型
		String timeTyp = request.getParameter("timeTyp").trim();	//时间类型
		String year = request.getParameter("year");			//年份
		String month = request.getParameter("month");		//月份
		StringBuilder sb = new StringBuilder("" +
				"select B.* from " +
				"(select * from " +
				"ACRM_F_CI_CRD_QYKHCWXX where REP_TYP='"+repTyp+"' and TIME_TYP='"+timeTyp+"' and CUSTOM_ID='"+custId+"' and YEAR="+year+" and MONTH="+month+") A " +
				"left join ACRM_F_CI_CRD_QYXJLLB B on A.CUSTOM_ID=B.CUSTOM_ID and A.YEAR=B.YEAR and A.MONTH=B.MONTH and A.TIME_TYP=B.DATATIME");		
		setPrimaryKey("B.ID");
		if(request.getParameter("start")!=null)
        	start = new Integer(request.getParameter("start")).intValue();
        if(request.getParameter("limit")!=null)
        	limit = new Integer(request.getParameter("limit")).intValue();
        SQL = sb.toString();
        datasource = ds;
	}
}