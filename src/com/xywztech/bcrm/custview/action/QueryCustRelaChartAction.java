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
@Action(value = "/querycustrelachart", results = { @Result(name = "success", type = "json") })
public class QueryCustRelaChartAction extends BaseQueryAction {

	private HttpServletRequest request;

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String customerId = request.getParameter("customerId");

		StringBuilder sb = new StringBuilder(
				"select t.mxtid," + "t.rela_cust_name,"
						+ "t.rela_cust_id,"
						+ "t.cust_id,"
						+ "t2.cust_stat rela_cust_stat,t.cust_name,"
						+ "(select cust_stat from ocrm_f_ci_cust_desc where cust_id ='"
						+ customerId
						+ "') as cust_stat,"
						+ "t.relation_Type,t.relation_Name ,t4.f_value "
						+ "from acrm_f_ci_cust_rale t inner join ocrm_f_ci_cust_desc t2 on"
						+ " (case when t.cust_id = '"
						+ customerId
						+ "' then t.rela_cust_id else t.cust_id end)=t2.cust_id "
						+ " inner join ocrm_sys_lookup_item t4 on t4.f_lookup_id = 'CUS0100038' and t4.f_code = t.relation_name  "
						+ "where t.CUST_ID= '" + customerId
						+ "' or t.rela_cust_id= '" + customerId + "' ");
		SQL = sb.toString();
		// setPrimaryKey("t.mxtid");
		// addOracleLookup("RELATION_TYPE", "CUST_REL_TYPE");
		// addOracleLookup("RELATION_NAME", "CUS0100038");
		datasource = ds;
	}

}
