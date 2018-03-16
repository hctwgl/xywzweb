package com.xywztech.bob.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.xywztech.bob.vo.AuthUser;

@ParentPackage("json-default")
@Action(value="/channelTypeQuery", results={
    @Result(name="success", type="json"),
})
public class ChannelTypeQueryAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;     
    
//    public String index() {
//        StringBuilder sb = new StringBuilder("select ct.*,u2.username as create_user_name,u1.username as update_user_name from ocrm_f_mm_channel_type ct " +
//        		"left join sys_users u2 on ct.create_user = u2.userid "+
//        		"left join sys_users u1 on ct.update_user = u1.userid " +
//        		"where 1>0");
//        sb.append(" order by ct.UPDATE_DATE desc");
//        cqs.setPrimaryKey("ct.IS_SMALL");
//        cqs.addOracleLookup("IS_SMALL", "IS_SMALL");
//        
//        
//        this.setJson((Map<String, Object>) cqs.excuteQuery(sb.toString(),this.getStart(),this.getLimit()));       
//        return "success";
//    }
    
	@Override
	public void prepare() {
		// TODO Auto-generated method stub

        StringBuilder sb = new StringBuilder("select ct.*,u2.username as create_user_name,u1.username as update_user_name from ocrm_f_mm_channel_type ct " +
        		"left join (select t1.userid userid, t1.username username, t2.unitid unitid from sys_users t1 inner join sys_units t2 on t1.unitid=t2.id) u2 on ct.create_user = u2.userid "+
        		"left join sys_users u1 on ct.update_user = u1.userid " +
        		"where 1>0");
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
		String userId = auth.getUserId(); 
		String role = "";
		for(GrantedAuthority ga : auth.getAuthorities() ){
		    role += ga.getAuthority()+"$";
		}
		if(role.indexOf("2")>=0){
			sb.append(" and  ct.create_user = '"+userId+"'");  
		}
        setPrimaryKey(" ct.IS_SMALL,ct.UPDATE_DATE desc ");
        setBranchFileldName("u2.unitid");
        addOracleLookup("IS_SMALL", "IS_SMALL");
		SQL = sb.toString();
		datasource = dsOracle;        
	}
}
