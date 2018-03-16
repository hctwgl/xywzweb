package com.xywztech.bcrm.custmanager.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;


@ParentPackage("json-default")
@Action(value = "/monthWork-Action", results = { @Result(name = "success", type = "json")})
public class MonthAction extends BaseQueryAction {
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	
    @Override
	public void prepare() {
		StringBuilder sb = new StringBuilder(
				" select c.* from OCRM_F_WP_WORKLOG  c where 1>0  and c.WORKLOG_TYPE like '%M%'");
		
	
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("ID"))
					{sb.append(" and " + key + " like '%"
							+ this.getJson().get(key) + "%'");}
				else if (key.equals("ORG_ID"))
				{sb.append(" and " + key + " like '%"
						+ this.getJson().get(key) + "%'");}
				else if (key.equals("USER_NAME"))
				{sb.append(" and " + key + " like '%"
						+ this.getJson().get(key) + "%'");}
				else if (key.equals("ADD_START_DATE_FROM"))
					sb.append(" and  c.WORKLOG_DATE >= '"+this.getJson().get(key)+"'" );
				else if (key.equals("ADD_START_DATE_TO"))
					sb.append(" and  WORKLOG_DATE <= '"+this.getJson().get(key)+"'" );
				else {
					sb.append(" and " + key + " = " + this.getJson().get(key));
				}
			}
		}
		setPrimaryKey("c.ID");
        
        SQL=sb.toString();
        datasource = ds;
	}
}


