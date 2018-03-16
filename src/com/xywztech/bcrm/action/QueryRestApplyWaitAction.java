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
@Action(value = "/queryrestapplywait", results = { @Result(name = "success", type = "json"), })
public class QueryRestApplyWaitAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource dsOracle;

	@Override
	public void prepare() {

		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
		String userId = auth.getUserId();
		StringBuilder sb = new StringBuilder(
				"select t1.* ,a.USER_NAME as AUTHOR_NAME from wf_worklist t1 left join admin_auth_account a  on  a.account_name = t1.AUTHOR  where 1>0 " +
				"and t1.currentnodeusers like '%"+userId+"%' ");

        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
            	if(key.equals("INSTANCEID"))
                    sb.append(" and t1."+key+" = '"+this.getJson().get(key)+"'");
            	else if(key.equals("WFJOBNAME")||key.equals("WFNAME")||key.equals("AUTHOR"))
            		sb.append(" and t1."+key+" like '%"+this.getJson().get(key)+"%'");
            }
        }
		this.setPrimaryKey("t1.INSTANCEID");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
