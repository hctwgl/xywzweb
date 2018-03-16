package com.xywztech.bcrm.customer.action;


import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;


@ParentPackage("json-default")
@Action(value = "/assignInfo-Action", results = { @Result(name = "success", type = "json")})
public class AccountAssignInfoAction extends BaseQueryAction {
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	
    @Override
	public void prepare() {
		StringBuilder sb = new StringBuilder(
				"select distinct t1.ACCOUNT ,t1.ACCT_NAME,t1.CUST_ID,t1.IS_ASSIGN  from " +
				"(select c.ACCOUNT,c.ACCT_NAME,c.CUST_ID,c.WEB_POSIT_NO,t.ID," +
				"case when t.ID is null then '未分配' else '已分配' end IS_ASSIGN from ACRM_F_CI_DEPOSIT_ACT  c " +
				"left join OCRM_F_CI_ACC_BELONG t " +
				" on c.ACCOUNT = t.ACCOUNT where 1=1)t1 where 1=1 ");
		
	
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("ID"))
					{sb.append(" and " + key + " like '%"
							+ this.getJson().get(key) + "%'");}
				else if (key.equals("ACCT_NAME"))
				{sb.append(" and " + key + " like '%"
						+ this.getJson().get(key) + "%'");}
				else if (key.equals("IS_ASSIGN"))
				{sb.append(" and " + key + " like '%"
						+ this.getJson().get(key) + "%'");}
				
			}
		}
		setPrimaryKey("t1.ACCOUNT");
		setBranchFileldName("t1.WEB_POSIT_NO");
        SQL=sb.toString();
        datasource = ds;
	}
}

