package com.xywztech.bcrm.customer.action;

import java.text.SimpleDateFormat;

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
import com.xywztech.bcrm.customer.service.CustomerDepositService;
import com.xywztech.bob.action.BaseQueryAction;

/**
 * 客户归属关系查询Action 
 * auther by:sujm 2012-12-11
 */

@ParentPackage("json-default")
@Action(value = "/customer_belong_info_query", results = { @Result(name = "success", type = "json") })
public class CustomerBelongInfoQueryAction extends BaseQueryAction {

	private HttpServletRequest request;
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	@Autowired
	private CustomerDepositService customerDepositService;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		StringBuilder sb = new StringBuilder("select T.*, de.cust_zh_name, DE.Cust_Lev, cus.main_type "+
						 " from OCRM_F_CI_MANAGED T "+
						" INNER JOIN OCRM_F_CI_CUST_DESC DE "+
						  "  ON DE.CUST_ID = T.CUST_ID "+
						" INNER JOIN OCRM_F_CI_BELONG_CUSTMGR CUS "+
						   " ON CUS.CUST_ID = T.CUST_ID "+
						  " AND CUS.MGR_ID = T.BEFORE_MGR_CODE ");

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("CUST_ID"))
					sb.append(" and T." + key + " like" + " '%"+ this.getJson().get(key) + "%'");
				else if (key.equals("CUST_ZH_NAME")) {
					sb.append(" and DE." + key + " like" + " '%"+ this.getJson().get(key) + "%'");
				} else if (key.equals("ORG_NAME")) {
					sb.append(" and CUS." + key + " like '%"+ this.getJson().get(key) + "%'");
				} else if (key.equals("CUST_LEV")) {
					sb.append(" and DE." + key + " = '"+ this.getJson().get(key) + "'");
				}
			}

			setPrimaryKey("T.CUST_ID DESC ");
			SQL = sb.toString();
			datasource = ds;
		}

	}

}