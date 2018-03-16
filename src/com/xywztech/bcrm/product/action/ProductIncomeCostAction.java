package com.xywztech.bcrm.product.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.action.BaseQueryAction;


@ParentPackage("json-default")
@Action(value="product-IncomeCost", results={@Result(name="success", type="json")})
public class ProductIncomeCostAction  extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")	
	private DataSource ds;  
	
	@Override
	public void prepare(){
		
    	StringBuffer sb  = new StringBuffer("select a.*　from acrm_f_pd_prod_incocorp a  where 1=1 ");

        	for(String key : this.getJson().keySet()){
        		if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
        			if(null!=key&&key.equals("prodcut_start")){
        				sb.append("  and PROD_PERIOD >= "+this.getJson().get(key));
        			}
        		else if(null!=key&&key.equals("prodcut_end")){
    					sb.append("and PROD_PERIOD <="+this.getJson().get(key));
    				}
    				else if(null!=key&&key.equals("productName1")){
    					sb.append(" and  PROD_NAME like  '%"+this.getJson().get(key)+"%'" );
    				}
        		}
    		}
        
    	
    	SQL=sb.toString();
    	datasource = ds;
        	
    }
	
}
