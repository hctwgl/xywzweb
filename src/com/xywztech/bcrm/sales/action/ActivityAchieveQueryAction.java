package com.xywztech.bcrm.sales.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value="/mktAchieve", results={@Result(name="success", type="json"),})
public class ActivityAchieveQueryAction extends BaseQueryAction{
    
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;

	@Override
	public void prepare() {
		StringBuilder sb = new StringBuilder("select a.* from OCRM_F_MM_ACTI_ACHIEVEMENT a where 1>0");
		for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("MKT_ACTI_ID"))
                    sb.append(" and a."+key+" = "+this.getJson().get(key));
                else if(key.equals("MKT_ACTI_NAME")){
                	sb.append(" and a."+key+" like '%"+this.getJson().get(key)+"%'");
                }
            }
        }
		SQL=sb.toString();
		setPrimaryKey("a.ACHIEVE_ID");
    	datasource = dsOracle;
	}
}
