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
@Action(value="/mktActivityManegerback", results={
    @Result(name="success", type="json"),
})
public class MktActivityManegerbackAction extends BaseQueryAction {

	 @Autowired
		@Qualifier("dsOracle")
		private DataSource ds;
	 
	 
	 @Override
	public void prepare() {
		 AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

	    	String sqlapp = "  select t.EXECUTOR_NAME,t.EXECUTOR_ID,a.MKT_ACTI_ID, a.MKT_ACTI_NAME,decode(t.deliver, null, 0, t.deliver) as deliver," +
	    			"decode(t.sucess, null, 0, t.sucess) as sucess,Round(decode(t.sucess, null, 0, t.sucess) / t.deliver * 100, 4) as per," +
	    			"a.ASTART_DATE,a1.user_name,a.AEND_DATE,a.CREATE_USER,a.CREATE_DATE  from OCRM_F_MK_MKT_ACTIVITY a," +
	    			"(select sum(case PROGRESS_STAGE  when '2' then  '1' else '0' end) as sucess, count(1) as deliver, mkt_acti_id,EXECUTOR_NAME" +
	    			",EXECUTOR_ID from OCRM_F_MK_MKT_MY_ACTI  group by mkt_acti_id ,EXECUTOR_NAME,EXECUTOR_ID) t, ADMIN_AUTH_ACCOUNT a1 " +
	    			"where a.mkt_acti_id = t.mkt_acti_id and a.create_user=a1.account_name ";
	    	
	    	StringBuilder sb  = new StringBuilder(sqlapp);
	    	
	    	for(String key:this.getJson().keySet()){
	    	     if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
	    	         if(key.equals("EXECUTOR_ID")){
	    	        	 String mgr=this.getJson().get(key).toString();
		                 	String mgrName []=mgr.split(",");
		                 	StringBuilder mgrsb = new StringBuilder();
		 	                for(int i=0;i<mgrName.length;i++){
		 	                	if(i==0)
		 	                		mgrsb.append("'"+mgrName[i]+"'");
		 	                	else
		 	                		mgrsb.append(",'"+mgrName[i]+"'");
		 	                	
		 	                }
		    	             sb.append(" and t.EXECUTOR_ID in ("+mgrsb.toString()+")");
	    	         }
	    	         if(key.equals("MKT_ACTI_NAME"))
	    	             sb.append(" and a.MKT_ACTI_NAME like  '%"+this.getJson().get(key)+"%'");
	    	         if(key.equals("ASTART_DATE_S"))
	    	             sb.append(" and a.ASTART_DATE >= to_date('" +this.getJson().get(key)+"','yyyy-MM-dd')");
	    	         if(key.equals("ASTART_DATE_E"))
	    	             sb.append(" and a.ASTART_DATE <= to_date('" +this.getJson().get(key)+"','yyyy-MM-dd')");
	    	         if(key.equals("AEND_DATE_S"))
	    	             sb.append(" and a.AEND_DATE >= to_date('" +this.getJson().get(key)+"','yyyy-MM-dd')");
	    	         if(key.equals("AEND_DATE_E"))
	    	             sb.append(" and a.AEND_DATE <= to_date('" +this.getJson().get(key)+"','yyyy-MM-dd')");
	    	     }
	        }
	    	
	    	 sb.append(" and t.EXECUTOR_ID in (select aa.account_name from admin_auth_account aa where aa.org_id" +
	    	 		" in (select u.UNITID from sys_units u where u.UNITSEQ like '%"+auth.getUnitId()+"%')) ");
	    	
	    	setPrimaryKey("t.EXECUTOR_ID asc ");

	        	SQL=sb.toString();
	        	datasource = ds;
		}
}
