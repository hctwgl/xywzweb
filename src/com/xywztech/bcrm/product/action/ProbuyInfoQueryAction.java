package com.xywztech.bcrm.product.action;

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
@Action(value="/probuyInfoQuery", results={
    @Result(name="success", type="json"),
})
public class ProbuyInfoQueryAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	public void prepare() {
		// TODO Auto-generated method stub
        StringBuilder sb = new StringBuilder("select ci.* from ocrm_f_ci_p_probuy_info ci where 1>0" );
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("CUST_NAME"))
                    sb.append(" and ci."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("CUST_ID"))
                	sb.append(" and ci."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("CERT_NUM"))
                	sb.append(" and ci."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("PRODUCT_NO"))
                	sb.append(" and ci."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("PRODUCT_NAME"))
                	sb.append(" and ci."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("OPP_TYPE"))
                	sb.append(" and ci."+key+" like '%"+this.getJson().get(key)+"%'");
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
//		if(role.indexOf("2")>=0){
//			sb.append(" and  ci.create_user = '"+userId+"'");  
//		}
        
        setPrimaryKey("ci.ID");
//        setBranchFileldName("u.unitid");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
