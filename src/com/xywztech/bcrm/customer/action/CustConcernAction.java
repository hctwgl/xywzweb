package com.xywztech.bcrm.customer.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;
/*
 * 
 * 
 *    mahcao  客户搜索
 * 
 */
@ParentPackage("json-default")
@Action(value="/custConcern", results={
    @Result(name="success", type="json"),
})
public class CustConcernAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;   
 	@Override
	@SuppressWarnings("deprecation")
	public void prepare() {
      
    	StringBuilder sb=new StringBuilder("select c.id,d.* from Ocrm_F_Ci_Attention_Cust_Info c ,Ocrm_F_Ci_Cust_Desc d where c.cust_Id=d.cust_Id ");
    	 for(String key:this.getJson().keySet()){
             if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                 if(key.equals("custZhName"))
                     sb.append(" and d.CUST_ZH_NAME ='"+this.getJson().get(key)+"'");
     
                 else{
                 	sb.append(" and c.cust_id = '"+this.getJson().get(key)+"'");
                 }
             }
         }	
        setPrimaryKey("c.id");

		SQL = sb.toString();
		datasource = dsOracle;
	}
}
