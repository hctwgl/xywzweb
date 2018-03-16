package com.xywztech.bcrm.customer.action;



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
@Action(value = "/assignQuery-Action", results = { @Result(name = "success", type = "json")})
public class AccountQueryAction extends BaseQueryAction {
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;

    @Override
	public void prepare() {
    	
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String a = request.getParameter("account");
    	
    	
		StringBuilder sb = new StringBuilder(
				" select c.*,t.USER_NAME as USER_NAMES from OCRM_F_CI_ACC_BELONG c left join  ADMIN_AUTH_ACCOUNT t on c.ASSIGN_USER = t.ACCOUNT_NAME where 1>0 and c.account = '"+a+"'");
/*	
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("ID"))
					{sb.append(" and " + key + " like '%"
							+ this.getJson().get(key) + "%'");}
				else if (key.equals("CUST_NAME"))
				{sb.append(" and " + key + " like '%"
						+ this.getJson().get(key) + "%'");}
				else if (key.equals("MGR_ID"))
				{sb.append(" and " + key + " like '%"
						+ this.getJson().get(key) + "%'");}
				
			}
		}*/
		setPrimaryKey("c.ID");
        
        SQL=sb.toString();
        datasource = ds;
	}
}

