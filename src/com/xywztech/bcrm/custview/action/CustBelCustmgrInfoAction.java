package com.xywztech.bcrm.custview.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;

@SuppressWarnings("serial")
@Action("/cust_bel_custmgr_info")
	public class CustBelCustmgrInfoAction extends BaseQueryAction {
	
		 HttpServletRequest request;

		 @Autowired
	     @Qualifier("dsOracle")
	     private DataSource ds;
		 @Override
		public void prepare() {
			 
			//StringBuilder sb = new StringBuilder("select su.id ,su.user_id,su.manager_type,su.manager_level,su.crm_mail_position ,su.levl,su.telephone,su.is_having_card,su.user_name,su.jobfamilyname,su.educationlevel,su.attendondate,su.economicyear,su.gender,su.graduateschool,su.political,su.defaultproperty,su.gwnames,su.accessionstate,su.age,su.unitname,su.unitid from(select o.id as id,o.user_id as user_id,o.manager_type as manager_type,o.manager_level as manager_level,o.crm_mail_position as crm_mail_position,o.levl as levl,o.telephone as telephone,o.is_having_card as is_having_card,v.user_name as user_name,v.jobfamilyname as jobfamilyname,v.educationlevel as educationlevel,v.attendondate as attendondate,v.economicyear as economicyear,v.gender as gender,v.graduateschool as graduateschool,v.political as political,v.defaultproperty as defaultproperty,v.gwnames as gwnames,v.accessionstate as accessionstate,v.age as age,(select s1.unitname from sys_units s1 left join sys_users s2 on s1.id = s2.unitid where s2.userid = o.user_id) as unitname, (select s1.unitid from sys_units s1 left join sys_users s2 on s1.id =s2.unitid where s2.userid =  o.user_id) as unitid  from ocrm_f_cm_cust_manager_info o inner join v_acrm_userinfo v on o.user_id = v.user_id inner join sys_users s on s.userid = o.user_id)su where 1>0 ");
			StringBuilder sb = new StringBuilder("select t.* from OCRM_F_CI_BELONG_CUSTMGR t where 1>0 ");
			ActionContext ctx = ActionContext.getContext();
	        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	        if(request.getParameter("cust_id")!=null){
				sb.append(" and t.cust_id = '"+request.getParameter("cust_id")+"'"  );
			}
	        if(request.getParameter("main_type")!=null){
				sb.append(" and t.main_type = '"+request.getParameter("main_type")+"'"  );
			}
	        if(request.getParameter("org_id")!=null){
	        	sb.append (" and t.institution IN (SELECT UNITID FROM SYS_UNITS WHERE UNITSEQ LIKE (SELECT UNITSEQ FROM SYS_UNITS WHERE UNITID='"+request.getParameter("org_id")+"')||'%')");
			}
	        
			SQL = sb.toString();
			setPrimaryKey("t.ID desc");
			
//			addOracleLookup("EDUCATIONLEVEL", "EDUCATIONLEVEL");
			datasource = ds;
//			setBranchFileldName("UNITID");
		}
	}
