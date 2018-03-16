
package com.xywztech.bcrm.product.action;


import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
/**
 * @author hujun 2012-12-20 客户统计详情的Action 
 */
@ParentPackage("json-default")
@Action(value = "/productcustomerdetail")

public class ProductCustomerStatisticsDetailAction extends BaseQueryAction {
 	private HttpServletRequest request;
	@Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
	
@Override
public void prepare(){
		
			ActionContext ctx = ActionContext.getContext();
		    request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);	
			String customerid = request.getParameter("customerid");
			
		    StringBuffer sb  = new StringBuffer("select a.*　from ACRM_F_PD_PROD_CUSTOMERDETAIL a  where 1=1");
		    if(customerid!=null){
		    	sb.append(" and a.CUSTOMER_ID ="+customerid);
		        }
		    
		    SQL = sb.toString();
		    setPrimaryKey("a.CUSTOMER_ID desc");
		    datasource = ds;   	
		    }
	
}


