package com.xywztech.bcrm.sales.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value="/channelInfoQuery", results={
    @Result(name="success", type="json"),
})
public class MarketingPlanInfoQueryAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	public void prepare() {
		// TODO Auto-generated method stub
        StringBuilder sb = new StringBuilder("select ci.*,ct.channel_type_name,u.username,o.unitname from ocrm_f_mm_channel_info ci " +
        		"left join ocrm_f_mm_channel_type ct on ci.channel_type_id = ct.channel_type_id "+
        		"left join (select t1.userid userid, t1.username username, t2.unitid unitid from sys_users t1 inner join sys_units t2 on t1.unitid=t2.id) u on ci.CREATE_USER = u.userid " +
        		"left join sys_units o on ci.CREATE_ORG = o.unitid where 1>0");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("CHANNEL_NAME"))
                    sb.append(" and ci."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("createDateS"))
                    sb.append(" and ci.CREATE_DATE >= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
                else if(key.equals("createDateE"))
                    sb.append(" and ci.CREATE_DATE <= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
                else if(key.equals("channelId"))
                    sb.append(" and ci.CHANNEL_ID=" +this.getJson().get(key));
                
                else{
                	sb.append(" and ci."+key+" = "+this.getJson().get(key));
                }
            }
        }
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
		String userId = auth.getUserId();        
		String role = "";
		for(GrantedAuthority ga : auth.getAuthorities() ){
		    role += ga.getAuthority()+"$";
		}
		if(role.indexOf("2")>=0){
			sb.append(" and  ci.create_user = '"+userId+"'");  
		}
        
        setPrimaryKey("ci.UPDATE_DATE desc,ci.channel_id desc");
        setBranchFileldName("u.unitid");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
