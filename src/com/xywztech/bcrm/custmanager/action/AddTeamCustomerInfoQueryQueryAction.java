package com.xywztech.bcrm.custmanager.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@Action("/addTeamCustomerInfoQueryQuery")
@Results({@Result(name = "success", type = "redirectAction", params = {
		"actionName", "addTeamCustomerInfoQueryQuery" }) })
public class AddTeamCustomerInfoQueryQueryAction extends BaseQueryAction {

	 @Autowired
     @Qualifier("dsOracle")
     private DataSource ds;
	@Override
	public void prepare() {
		//StringBuilder sb = new StringBuilder("select su.id ,su.user_id,su.manager_type,su.manager_level,su.crm_mail_position ,su.levl,su.telephone,su.is_having_card,su.user_name,su.jobfamilyname,su.educationlevel,su.attendondate,su.economicyear,su.gender,su.graduateschool,su.political,su.defaultproperty,su.gwnames,su.accessionstate,su.age,su.unitname,su.unitid from(select o.id as id,o.user_id as user_id,o.manager_type as manager_type,o.manager_level as manager_level,o.crm_mail_position as crm_mail_position,o.levl as levl,o.telephone as telephone,o.is_having_card as is_having_card,v.user_name as user_name,v.jobfamilyname as jobfamilyname,v.educationlevel as educationlevel,v.attendondate as attendondate,v.economicyear as economicyear,v.gender as gender,v.graduateschool as graduateschool,v.political as political,v.defaultproperty as defaultproperty,v.gwnames as gwnames,v.accessionstate as accessionstate,v.age as age,(select s1.unitname from sys_units s1 left join sys_users s2 on s1.id = s2.unitid where s2.userid = o.user_id) as unitname, (select s1.unitid from sys_units s1 left join sys_users s2 on s1.id =s2.unitid where s2.userid =  o.user_id) as unitid  from ocrm_f_cm_cust_manager_info o inner join v_acrm_userinfo v on o.user_id = v.user_id inner join sys_users s on s.userid = o.user_id)su where 1>0 ");
//		StringBuilder sb = new StringBuilder("select p.id as id,p.cust_zzdm as cust_zzdm ,p.cust_id as cust_id,p.cust_zh_name as cust_zh_name,p.belong_instn as belong_instn " +
//				"from v_acrm_f_ci_cust_info1 p where p.cust_id not in(select oc.cust_id from ocrm_f_cm_mkt_team_cust oc)");
		
		StringBuffer sb = new StringBuffer("select p.* from OCRM_F_CI_CUST_DESC p where 1>0");
		
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key)&& !this.getJson().get(key).equals("")) {
					if (key.equals("CUST_ID")) sb.append(" and CUST_ID like '%"+this.getJson().get(key)+"%'");
//					if (key.equals("CUST_ZZDM1")) sb.append(" and P.CUST_ZZDM like '%"+this.getJson().get(key)+"%'");
//					if (key.equals("CUST_ZH_NAME11")) sb.append(" and P.CUST_ZH_NAME like '%"+this.getJson().get(key)+"%'");
                    if (key.equals("msFlag")){
                       if(this.getJson().get(key).equals("1")){
                           sb.append(" and P.CRE_MS_FLG like '%CRM_YN_002%' ");
                       }
                    }
			}
		}
		SQL = sb.toString();
		setPrimaryKey("p.CUST_ID desc");
		
//		addOracleLookup("ACCESSIONSTATE", "MANAGER_STATUS");

		datasource = ds;
//		setBranchFileldName4("p.BELONG_INSTN");
		
		
	}
}
