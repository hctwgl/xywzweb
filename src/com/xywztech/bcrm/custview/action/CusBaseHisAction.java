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
@Action(value = "/cusBaseAdujstHis-Action", results = { @Result(name = "success", type = "json")})
public class CusBaseHisAction extends BaseQueryAction {
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;

    @Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String a = request.getParameter("custId");
		StringBuilder sb = new StringBuilder(
				" select c.*,t.USER_NAME from OCRM_F_CI_CUSTINFO_UPHIS  c  LEFT JOIN ADMIN_AUTH_ACCOUNT t on c.UPDATE_USER = t.ACCOUNT_NAME  where 1>0 and c.CUST_ID = '"+a+"' ");
	
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("CUST_ID"))
					{sb.append(" and " + key + " like '%"
							+ this.getJson().get(key) + "%'");}
	
			}
		}
		setPrimaryKey("c.UP_ID");
	//	addOracleLookup("BEFORE_MAIN_TYPE", "MAINTAIN_TYPE");
    //("AFTER_MAIN_TYPE","MAINTAIN_TYPE");
        SQL=sb.toString();
        datasource = ds;
	}
}



