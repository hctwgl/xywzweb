package com.xywztech.bcrm.sales.action;

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
@Action(value="/mktActiOpportunityQuery", results={
    @Result(name="success", type="json")
})
public class MarketActivityOpportunityQueryAction extends BaseQueryAction{
    
	private HttpServletRequest request;
	
    @Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
    
    @Override
	public void prepare(){
    	ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	String activityId = request.getParameter("activityId");
        StringBuilder sb = new StringBuilder("select o.*,u.username from ocrm_f_mm_mkt_opportunity o " +
        		"left join sys_users u on o.oper_user_id = u.userid where o.mkt_acti_id = " +activityId+"");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("MKT_OPPOR_STAT"))
                    sb.append(" and o."+key+"= '"+this.getJson().get(key)+"'");
                else if(key.equals("createDateS"))
                    sb.append(" and o.CREATE_DATE >= '" +this.getJson().get(key)+"'");
                else if(key.equals("createDateE"))
                    sb.append(" and o.CREATE_DATE <= '" +this.getJson().get(key)+"'");
                else{
                	sb.append(" and o."+key+" like '%"+this.getJson().get(key)+"%'");
                }
            }
        }
        setPrimaryKey("o.MKT_OPPOR_STAT,o.update_date desc ");
        addOracleLookup("MKT_OPPOR_STAT", "CHANCE_STATUS");
        addOracleLookup("MKT_OPPOR_TYPE", "OPPOR_TYPE");
        SQL=sb.toString();
        datasource = ds;
    }
}
