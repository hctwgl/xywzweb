package com.xywztech.bcrm.sales.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value = "/marketingNewsQuery", results = { @Result(name = "success", type = "json"), })
public class MarketingNewsQueryAction extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;

	@Override
	public void prepare() {

		AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		String str = auth.getUsername();

		StringBuilder sb = new StringBuilder(
				"select p.*,u.UNITNAME from ocrm_f_wp_info p left join sys_units u on p.PUBLISH_ORG = u.UNITID left join sys_users u1 on p.PUBLISH_USER = u1.USERNAME where p.MESSAGE_TYPE = "
						+ "'3' and p.PUBLISH_USER = '" + str + "'");

		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)
					&& !this.getJson().get(key).equals("")) {
				if (key.equals("MESSAGE_TITLE"))
					sb.append(" and " + key + " like '%"
							+ this.getJson().get(key) + "%'");
				else if (key.equals("PUBLISH_DATES"))
					sb.append(" and PUBLISH_DATE >= to_date('"
							+ this.getJson().get(key) + "','yyyy-MM-dd')");
				else if (key.equals("PUBLISH_DATEE"))
					sb.append(" and PUBLISH_DATE <= to_date('"
							+ this.getJson().get(key) + "','yyyy-MM-dd')");
				else {
					sb.append(" and " + key + " = " + this.getJson().get(key));
				}
			}
		}

		setPrimaryKey("p.PUBLISH_DATE desc,p.MESSAGE_ID");

		SQL = sb.toString();
		datasource = ds;
	}
}
