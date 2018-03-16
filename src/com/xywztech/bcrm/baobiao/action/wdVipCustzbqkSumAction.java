package com.xywztech.bcrm.baobiao.action;

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
@Action(value="/wdVipCustNumSum", results={
    @Result(name="success", type="json"),
})
public class wdVipCustzbqkSumAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	public void prepare() {
		// TODO Auto-generated method stub
        StringBuilder sb = new StringBuilder("select ci.* from ACRM_M_VIP_NUM_COUNT ci where CUST_MANAGER_ID IS NULL and ORG_ID4 IS NOT NULL" );
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("MONTH"))
                    sb.append(" and ci.MONTH = '"+this.getJson().get(key)+"'");
                
                else if(key.equals("instncode"))
                	sb.append(" and (ci.ORG_ID2 = '"+this.getJson().get(key)+"'or ci.ORG_ID4 = '"+this.getJson().get(key)+"')");
               
            }
        }
		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
		String userId = auth.getUserId();        
		String role = "";
		for(GrantedAuthority ga : auth.getAuthorities() ){
		    role += ga.getAuthority()+"$";
		}
//		if(role.indexOf("2")>=0){
//			sb.append(" and  ci.create_user = '"+userId+"'");  
//		}
		
        setPrimaryKey("ci.ORG_ID4");
//        setBranchFileldName("u.unitid");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
