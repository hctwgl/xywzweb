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
@Action(value="/mktActivityOrgback", results={
    @Result(name="success", type="json"),
})
public class MktActivityOrgbackAction extends BaseQueryAction {

	 @Autowired
		@Qualifier("dsOracle")
		private DataSource ds;
	 
	 
	 @Override
	public void prepare() {
		 AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		 
	    	String sqlapp = " select a1.org_name,a1.org_id,num, per,sucess,deliver from (select a.create_org,count(1) as num, " +
	    			"sum(t.sucess) as sucess ,sum(t.deliver) as deliver,Round(decode(sum(t.sucess), null, 0, sum(t.sucess)) / sum(t1.total) * 100, 4) as per" +
	    			" from OCRM_F_MK_MKT_ACTIVITY a,(select sum(case PROGRESS_STAGE when '2' then '1' else '0' end) as sucess," +
	    			"count(1) as deliver, mkt_acti_id from OCRM_F_MK_MKT_MY_ACTI group by mkt_acti_id ) t,(select count(1) as total ,mkt_acti_id from ocrm_f_mk_acti_customer group by  mkt_acti_id) t1 " +
	    			"where a.mkt_acti_id=t.mkt_acti_id   and t.mkt_acti_id=t1.mkt_acti_id group by a.create_org) t2,admin_auth_org a1 where a1.org_id=t2.create_org ";
	    	
	    	StringBuilder sb  = new StringBuilder(sqlapp);
	    	
	    	for(String key:this.getJson().keySet()){
	    	     if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
	    	         if(key.equals("ORG_ID")){
	    	        	String org=this.getJson().get(key).toString();
	                 	String orgName []=org.split(",");
	                 	StringBuilder orgsb = new StringBuilder();
	 	                for(int i=0;i<orgName.length;i++){
	 	                	if(i==0)
	 	                	orgsb.append("'"+orgName[i]+"'");
	 	                	else
	 	                		orgsb.append(",'"+orgName[i]+"'");
	 	                	
	 	                }
	    	             sb.append(" and  a1.org_id in ("+orgsb.toString()+")");
	    	             }
	    	     }
	        }
	    	
	    	
	    	sb.append(" and  a1.org_id in ( select  org_id from admin_auth_org start with org_id='"+auth.getUnitId()+"' connect by up_org_id= prior org_id )");
	       	setPrimaryKey("a1.ORG_ID asc ");

	        	SQL=sb.toString();
	        	datasource = ds;
		}
}
