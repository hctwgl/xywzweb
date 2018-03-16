package com.xywztech.bcrm.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value="/ValueAddProductQuery", results={
    @Result(name="success", type="json"),
})
public class ValueAddProductQueryAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	public void prepare() {
        StringBuilder sb = new StringBuilder("select t.* from OCRM_F_CI_INCPRODUCT_INFO t where 1>0");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("serverId"))
                    sb.append(" and t.SERVER_ID ="+this.getJson().get(key));
                else{
                	sb.append(" and t."+key+" = "+this.getJson().get(key));
                }
            }
        }
        setPrimaryKey("t.SERVER_ID desc");
        addOracleLookup("CUST_GRADE", "P_CUST_GRADE");
		SQL = sb.toString();
		datasource = dsOracle;
	}
}
