package com.xywztech.bcrm.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value = "/queryworkflowend", results = { @Result(name = "success", type = "json"), })
public class QueryWorkFlowEndAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource dsOracle;

    private HttpServletRequest request;
    
	@Override
	public void prepare() {

		StringBuilder sb = new StringBuilder(
				"select t.* ,a.USER_NAME as AUTHOR_NAME from wf_instance_end t left join admin_auth_account a  on  a.account_name = t.AUTHOR  where 1>0 ");
        
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
