
package com.xywztech.bcrm.product.action;


import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.common.CommonAction;

/**
 * @author hujun 2012-12-20 客户统计Action
 * 
 */
@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value = "/productcustomer")

public class ProductCustomerStatisticsAction extends CommonAction {
 	@Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
	
@Override
public void prepare(){
		
    	StringBuffer sb  = new StringBuffer("select a.*　from acrm_f_pd_prod_customer a  where 1=1 ");

        for(String key : this.getJson().keySet()){
        		if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
        			if(null!=key&&key.equals("customerTimeStart1")){
        				sb.append(" and a.OVERPROD_END >= to_date('"+this.getJson().get(key)+"','yyyy-mm-dd')");
        			}
        		    else if(null!=key&&key.equals("customerTimeEnd1")){
    					sb.append("and a.OVERPROD_END <= to_date('"+this.getJson().get(key)+"','yyyy-mm-dd')");
    				}
    				else if(null!=key&&key.equals("budyTimes1")){
    					sb.append(" and  BUDY_TIME >= "+this.getJson().get(key) );
    				}
    				else if (null!=key&&key.equals("customerState")){
    					sb.append(" and  CUST_STATE like '"+this.getJson().get(key)+"'");
    				}
        		}
    		}
        
    	SQL=sb.toString();
    	datasource = ds;
        	
    }
	
  
}


