

package com.xywztech.bob.action;



import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;

@Action("/integral-Action")
@Results({ @Result(name = "success", type = "redirectAction", params = {
		"actionName", "integral-Action" }) })
public class IntegralChangeAction extends BaseQueryAction {

	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	private HttpServletRequest request;
	@Override
	public void prepare() {
		// TODO Auto-generated method stub
		 ActionContext ctx = ActionContext.getContext();
		 request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
	//	 String code_id = request.getParameter("nodeid");

		StringBuilder sb = new StringBuilder( "select c.*  from OCRM_F_CI_GIFT_EXCHANGE	c where 1>0");
		
		for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){

               if(key.equals("ID"))
               	sb.append(" and c."+key+" = "+this.getJson().get(key)+"");
                else if(key.equals("GIFT_NAME"))
                	sb.append(" and c."+key+" like '%"+this.getJson().get(key)+"%'");

                else if(key.equals("GIFT_TYPE"))
                	sb.append(" and c."+key+" like '%"+this.getJson().get(key)+"%'");
          
                else if(key.equals("CUST_NAME"))
                	sb.append(" and c."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("c.ORDER_STATUS"))
                	sb.append(" and c."+key+" like '%"+this.getJson().get(key)+"%'");
       
                else if(key.equals("orderDateStart")){
					sb.append(" and c.ORDER_DATE>= '"+this.getJson().get(key)+"'" );
				}else if(key.equals("orderDateEnd")){
					sb.append("  and  c.ORDER_DATE<= '"+this.getJson().get(key)+"'");
               
            }
        }}
		
		SQL = sb.toString();
		setPrimaryKey("c.ID desc");
		//addOracleLookup("APP_STATUS", "APP_STATUS");
		datasource = ds;

	}
}

