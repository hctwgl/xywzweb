package com.xywztech.bcrm.product.action;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.common.CommonAction;

@SuppressWarnings("serial")
@ParentPackage("json-default")
@Action(value="product-list", results={@Result(name="success", type="json")})
public class ProductTreeAction  extends CommonAction {

	@Autowired
	@Qualifier("dsOracle")	
	private DataSource ds;  
	
	@Override
	public void prepare(){
    	StringBuffer sb  = new StringBuffer("select a.*,b.catl_name　from ocrm_f_pd_prod_info a inner join ocrm_f_pd_prod_catl_view b on a.catl_code=b.catl_code where 1=1 ");
    	for(String key : this.getJson().keySet()){
    		if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){	
				if(null!=key&&key.equals("CATL_CODE")){
					sb.append("  and b.catlseq like (select catlseq from ocrm_f_pd_prod_catl_view where catl_code="
							+this.getJson().get(key)
							+")||'%'");
				}else if(null!=key&&key.equals("PRODUCT_ID")){
					sb.append("  and a.PRODUCT_ID like '%"+this.getJson().get(key)+"%'  ");
				}else if(null!=key&&key.equals("PROD_NAME")){
					sb.append("  and a.PROD_NAME like '%"+this.getJson().get(key)+"%'  ");
				}
				else if(null!=key&&key.equals("PROD_START_DATE_FROM")){
					sb.append(" and  a.PROD_START_DATE>= to_date('"+this.getJson().get(key)+"','yyyy-mm-dd')" );
				}else if(null!=key&&key.equals("PROD_START_DATE_TO")){
					sb.append("  and  a.PROD_START_DATE< to_date('"+this.getJson().get(key)+"','yyyy-mm-dd')");

                }
    		}
		}
    	SQL=sb.toString();
    	datasource = ds;
        	
    }
}
