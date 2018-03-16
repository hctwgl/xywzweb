package com.xywztech.bcrm.sales.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value="/channelCust", results={@Result(name="success", type="json"),})
public class ActivityResponseCountQueryAction extends BaseQueryAction{
    
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;

	@Override
	public void prepare() {
		StringBuilder sb = new StringBuilder("select a.* from OCRM_F_MM_ACTI_RESPONSE_COUNT a where 1>0");
		for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("PLAN_ID"))
                    sb.append(" and a."+key+" = "+this.getJson().get(key));
                else if(key.equals("PLAN_NAME")){
                	sb.append(" and a."+key+" like '%"+this.getJson().get(key)+"%'");
                }
            }
        }
		SQL=sb.toString();
		setPrimaryKey("a.count_id");
    	datasource = dsOracle;
	}
}
