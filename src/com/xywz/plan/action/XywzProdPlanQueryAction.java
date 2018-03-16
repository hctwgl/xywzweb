package com.xywz.plan.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;
/*
 * 车间作业通知单管理
 */

@ParentPackage("json-default")
@Action(value="/XywzProdPlanQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzProdPlanQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.PRD_NAME,SPC_MODEL,SUM(WEIGHT) AS WEIGHT " +
    			"  from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t " +
    			"WHERE 1=1 AND T.SCHEDU_STATUS IN ('0','1') " +
    			"GROUP BY t.PRD_NAME,SPC_MODEL" );
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and t.SPC_MODEL like '%"+this.getJson().get(key)+"%'");
                } else if(key.equals("PRD_NAME")){
                	sb.append(" and t.PRD_NAME like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }
        addOracleLookup("PROD_STATE", "XYWZ_PROD_STATE");
        addOracleLookup("WORK_SHOP", "XYWZ_WORKSHOP");
    	setPrimaryKey("t.PLAN_ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
