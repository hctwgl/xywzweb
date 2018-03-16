/**
 * @author hujun
 */
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
 * @author hujun  2012-12-20 客户统计休眠客户Action
 */
@ParentPackage("json-default")
@Action(value = "/productcustomerdormant")

public class ProductCustomerStatisticsDormantAction extends BaseQueryAction {
 	private HttpServletRequest request;
	@Autowired
    @Qualifier("dsOracle")
    private DataSource ds;
	
@Override
public void prepare(){
		
			ActionContext ctx = ActionContext.getContext();
			request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		    String customerState = request.getParameter("customerState");
		
		    StringBuffer sb  = new StringBuffer("select a.*　from acrm_f_pd_prod_customer a  where 1=1");
		    if(customerState!=null){
		    	sb.append(" and a.CUST_STATE  like '%"+customerState+"%'");
		    }
		    SQL = sb.toString();
		    setPrimaryKey("a.CUSTOMER_ID desc");
		    datasource = ds;
		    }
	
}


