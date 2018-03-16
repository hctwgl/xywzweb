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
 * 排产汇总
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanTskSumScheduleQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanTskSumScheduleQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.PRD_NAME,t.SPC_MODEL,SUM(t.WEIGHT) as WEIGHT from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  where t.CHANNAL_TYPE='1' AND SCHEDU_NUM IS NOT NULL  ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and t.SPC_MODEL = '"+this.getJson().get(key)+"'");
                } 
            }
        }
        sb.append(" GROUP BY PRD_NAME,SPC_MODEL");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
