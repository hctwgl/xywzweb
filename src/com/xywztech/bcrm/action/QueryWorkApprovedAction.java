package com.xywztech.bcrm.action;

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
@Action(value = "/queryWorkApproved", results = { @Result(name = "success", type = "json"), })
public class QueryWorkApprovedAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource dsOracle;

    AuthUser auth = (AuthUser) SecurityContextHolder.getContext()
    .getAuthentication().getPrincipal();
	@Override
	public void prepare() {

		StringBuilder sb = new StringBuilder(
				"select t.* ,a.USER_NAME as AUTHOR_NAME from wf_worklist t left join admin_auth_account a  on  a.account_name = t.AUTHOR  where 1>0 and  t.ALLREADERSLIST like'%"+auth.getUserId()+"%'");
        
		for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	if(key.equals("WFJOBNAME")||key.equals("WFNAME")||key.equals("AUTHOR"))
            		sb.append(" and t."+key+" like '%"+this.getJson().get(key)+"%'");
            }
        }
		this.setPrimaryKey("t.INSTANCEID");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
