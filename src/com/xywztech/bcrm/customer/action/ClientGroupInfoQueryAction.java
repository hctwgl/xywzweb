package com.xywztech.bcrm.customer.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@Action("/ClientGroupInfoQueryAction")
@Results({@Result(name = "success", type = "redirectAction", params = {
		"actionName", "ClientGroupInfoQueryAction" }) })
public class ClientGroupInfoQueryAction extends BaseQueryAction {

	 @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
	@Override
	
	public void prepare() {
		StringBuilder sb = new StringBuilder(
				"SELECT t.id AS id, t.group_type AS group_type,"+
				" (SELECT count ( * )"+
				" FROM ocrm_f_ci_group_member mem "+
				" WHERE mem.group_no = t.group_no "+
				" AND (mem.member_type = '1' OR mem.member_type = '2')"+
				" AND (mem.app_status = '2' OR mem.app_status = '3'))"+
				" AS group_number,"+
				" (SELECT count ( * )"+
				" FROM ocrm_f_ci_group_member mem "+
				" WHERE mem.group_no = t.group_no "+
				" AND (mem.member_type = '2')"+
				" AND (mem.app_status = '2' OR mem.app_status = '3'))"+
				" AS dwdb_no,"+
				" (SELECT count ( * )"+
				" FROM ocrm_f_ci_group_member mem "+
				" WHERE mem.group_no = t.group_no AND (mem.app_status = '3'))"+
				" AS zhengshi_no, "+
				" (SELECT count ( * )"+
				" FROM ocrm_f_ci_group_member mem "+
				" WHERE mem.group_no = t.group_no AND (mem.app_status = '2'))"+
				" AS daishen_no,"+
				" (SELECT u.unitname "+
				" FROM sys_units u"+
				" WHERE u.unitid = t.group_host_org_no) "+
				" AS group_host_org_no_name, "+
				" t.group_name AS group_name,"+
				" t.group_status AS group_status, "+
				" t.group_root_cust_id AS group_root_cust_id,"+
				" t.update_date AS update_date, "+
				" t.group_memo AS group_memo,"+
				" t.group_no AS group_no, "+
				" t.update_user_id AS update_user_id,"+
				" t.group_host_org_no AS group_host_org_no,  "+
				" t.group_root_address AS group_root_address,"+
				" t.creata_date AS creata_date, "+
				" t.create_user_id AS create_user_id, "+
				" o.cust_zh_name as cust_zh_name, "+
				" a.user_name as create_user_name"+
				" FROM ocrm_f_ci_group_info t  " +
				" left join ocrm_f_ci_cust_desc o on o.cust_id = t.group_root_cust_id" +
				" left join admin_auth_account a on a.account_name = t.CREATE_USER_ID"+
				" WHERE 1 > 0");
//		"select t.id as id,t.group_type as group_type,(select count(*) from ocrm_f_ci_group_member mem where mem.group_no =t.group_no and (mem.member_type='1'or mem.member_type='2') ) as group_number,(select u.unitname from sys_units u where u.unitid = t.group_host_org_no ) as group_host_org_no_name, t.group_name as group_name,t.group_status as group_status,t.group_root_cust_id as group_root_cust_id,t.update_date as update_date,t.group_memo as group_memo,t.group_no as group_no,t.update_user_id as update_user_id,t.group_host_org_no as group_host_org_no,t.group_root_address as group_root_address,t.creata_date as creata_date,t.create_user_id as create_user_id ,t1.cust_zh_name as cust_zh_name from ocrm_f_ci_group_info t inner join v_acrm_f_ci_cust_info t1 on t.group_root_cust_id = t1.cust_id where 1>0");
//		"select t.id as id,t.group_type as group_type,(select count(*) from ocrm_f_ci_group_member mem where mem.group_no =t.group_no and (mem.member_type='1'or mem.member_type='2') ) as group_number,(select u.unitname from sys_units u where u.unitid = t.group_host_org_no ) as group_host_org_no_name, t.group_name as group_name,t.group_status as group_status,t.group_root_cust_id as group_root_cust_id,t.update_date as update_date,t.group_memo as group_memo,t.group_no as group_no,t.update_user_id as update_user_id,t.group_host_org_no as group_host_org_no,t.group_root_address as group_root_address,t.creata_date as creata_date,t.create_user_id as create_user_id from ocrm_f_ci_group_info t where 1>0");
for (String key : this.getJson().keySet()) {
	if (null != this.getJson().get(key)&& !this.getJson().get(key).equals("")) {
	if(key.equals("GROUP_NO")||key.equals("GROUP_NAME")||key.equals("HOST_INSTN")||key.equals("HOST_INSTN")||key.equals("GROUP_TYPE")||key.equals("GROUP_STATUS")||key.equals("GROUP_HOST_ORG_NO")){
		sb.append(" and t." + key + " like " + " '%"+ this.getJson().get(key) + "%'");
	}
	if(key.equals("CUST_ZH_NAME")){
		sb.append(" and o." + key + " like " + " '%"+ this.getJson().get(key) + "%'");
	}
	}
}

SQL = sb.toString();
setPrimaryKey("t.ID ,t.GROUP_NO desc");
//sb.append(" order by t.GROUP_NO desc");


addOracleLookup("GROUP_TYPE", "GROUP_TYP");
addOracleLookup("GROUP_STATUS", "GROUP_STS");
datasource = ds;	
	}
}
