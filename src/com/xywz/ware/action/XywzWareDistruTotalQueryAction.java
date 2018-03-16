package com.xywz.ware.action;

import javax.sql.DataSource;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import com.xywztech.bob.action.BaseQueryAction;

/*
 * 仓库分配汇总
 */

@ParentPackage("json-default")
@Action(value="/XywzWareDistruTotalQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzWareDistruTotalQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	@Override
	public void prepare() {   	

    	StringBuilder sb=new StringBuilder("SELECT a.* FROM(SELECT o.MERCHD_ID,o.CONTR_NUM,o.SPC_MODEL,o.OUT_CUST_NAME,SUM(o.WEIGHT) WEIGHT  FROM XYWZ_WARE_INVTY_OUT o GROUP BY o.MERCHD_ID,o.CONTR_NUM,o.SPC_MODEL,o.OUT_CUST_NAME) a where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and a.SPC_MODEL = '"+this.getJson().get(key)+"'");
                }else if(key.equals("CONTR_NUM")){
                	sb.append(" and a.CONTR_NUM = '"+this.getJson().get(key)+"'");
                }
            }
        }
    	SQL=sb.toString();
    	datasource = ds;
    }
}
