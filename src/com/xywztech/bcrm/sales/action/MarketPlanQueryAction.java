package com.xywztech.bcrm.sales.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value="/planQuery", results={
    @Result(name="success", type="json"),
})
public class MarketPlanQueryAction extends BaseQueryAction{
    
 
    @Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
    
    
	@Override
	public void prepare() {
        StringBuilder sb = new StringBuilder("select p.*,u.username from ocrm_f_mm_mkt_plan p left join sys_users u on p.CREATE_USER = u.userid where 1>0");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("PLAN_NAME"))
                    sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("MKT_PLAN_STAT"))
                	 sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("createDateS"))
                    sb.append(" and p.CREATE_DATE >=to_date('"+this.getJson().get(key)+"',"+"'yyyy-MM-dd')");
                else if(key.equals("createDateE"))
                	sb.append(" and p.CREATE_DATE <=to_date('"+this.getJson().get(key)+"',"+"'yyyy-MM-dd')");
                else{
                	sb.append(" and "+key+" = "+this.getJson().get(key));
                }
            }
        }     
        
        setPrimaryKey("p.UPDATE_DATE desc,p.MKT_PLAN_STAT");
        addOracleLookup("MKT_PLAN_STAT","PLAN_STATUS");
        SQL=sb.toString();
        datasource = ds;
       
    }


	
}
