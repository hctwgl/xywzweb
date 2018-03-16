package com.xywztech.bcrm.customer.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@Action("/addgroupcustquery")
@Results({
    @Result(name="success", type="redirectAction", params = {"actionName" , "addgroupcustquery"})
})
public class AddGroupCustQueryAction extends BaseQueryAction{
	
	@Autowired
     @Qualifier("dsOracle")
     private DataSource ds;
	@Override

	public void prepare() {
		// TODO Auto-generated method stub
		 StringBuilder sb = new StringBuilder("select p.* from ocrm_f_ci_cust_desc p  where p.cust_id not in(select o.cust_id from ocrm_f_ci_group_member o inner join ocrm_f_ci_cust_desc v on v.cust_id = o.cust_id)");
	        for(String key:this.getJson().keySet()){
	            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
	                if(key.equals("CUST_ZH_NAME"))
	                    sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
	                if(key.equals("CUST_ZZDMM"))
	                    sb.append(" and CUST_ID like '%"+this.getJson().get(key)+"%'");
	            }
	        }
			SQL = sb.toString();
	        setPrimaryKey("p.CUST_ID,p.CUST_ZH_NAME desc");
			datasource = ds;
	}
}
