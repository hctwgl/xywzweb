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
 * 生产计划通知单打印
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanJobAdvsSnglPrintInfoQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanJobAdvsSnglPrintInfoQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	StringBuilder sb=new StringBuilder("select t.SCHEDU_NUM,SCHEDU_DATE,t.PRD_NAME,t.MATERIALS," +
    			"t.SPC_MODEL,t.LEN,t.WEIGHT,t.ZHI_CNT,t.JIAN_CNT,t.MEMO" +
    			" from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  " +
    			"where t.CHANNAL_TYPE='1' and t.SCHEDU_STATUS='1' and t.SCHEDU_DATE is not null " 
    			);
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SCHEDU_DATE")){
                   sb.append(" and t.SCHEDU_DATE = '"+this.getJson().get(key)+"'");
                }else if (key.equals("PRD_NAME")){
                   sb.append(" and t.PRD_NAME = '"+this.getJson().get(key)+"'");
   	            }  
            }
        }
    	SQL=sb.toString();
    	datasource = ds;
    }
}
