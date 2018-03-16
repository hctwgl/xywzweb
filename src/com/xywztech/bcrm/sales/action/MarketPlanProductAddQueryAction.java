package com.xywztech.bcrm.sales.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
				
@Action(value="/marketPlanProductAddQuery", results={
    @Result(name="success", type="json")
})
public class MarketPlanProductAddQueryAction extends BaseQueryAction{
    
	@SuppressWarnings("unused")
	private HttpServletRequest request;
	
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String planId = request.getParameter("planId");
			int a=0;
			Map paramsMap = super.getJson();
			String checkedOrg="";
			String PROD_NAME =(String) paramsMap.get("PROD_NAME");
			String PRODUCT_ID = (String)paramsMap.get("PRODUCT_ID");
			StringBuilder sb = new StringBuilder("select PRODUCT_ID,PROD_NAME from OCRM_F_PD_PROD_INFO where 1>0" +
					" and product_id not in (select PRODUCT_ID from OCRM_F_MM_PLAN_PROD where PLAN_ID="+planId+")");
	        for(String key:this.getJson().keySet()){
	            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
	                if(key.equals("PROD_NAME"))
	                    sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
	                else if(key.equals("PRODUCT_ID"))
	                    sb.append(" and "+key+" like '%"+this.getJson().get(key)+"%'");
	                else{
	                	sb.append(" and "+key+" = "+this.getJson().get(key));
	                }
	            }
	        }
	        	SQL=sb.toString();
				datasource = ds;	
				setPrimaryKey("PRODUCT_ID");
	}
}
