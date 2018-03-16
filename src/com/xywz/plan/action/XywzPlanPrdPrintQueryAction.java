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
@Action(value="/XywzPlanPrdPrintQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanPrdPrintQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  " +
    			"where t.CHANNAL_TYPE='1' AND T.SCHEDU_STATUS='0' and t.ISSUES_DT is not null ");
    	String issuesDt = request.getParameter("issuesDt");
//    	String planId = request.getParameter("planId");
    	if(null!=issuesDt&&!issuesDt.equals("")){
    		sb.append(" and t.ISSUES_DT = '"+issuesDt+"'");
    	}
//    	if(null!=planId&&!planId.equals("")){
//    		sb.append(" and t.PALN_ID IN ("+planId+")");
//    	}
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("ISSUES_DT")){
                    sb.append(" and t.ISSUES_DT = '"+this.getJson().get(key)+"'");
                }else if(key.equals("contrNum")){
                	sb.append(" and t.CONTR_NUM LIKE '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("planNum")){
                	sb.append(" and t.PLAN_NUM LIKE '%"+this.getJson().get(key)+"%'");
                }
            }
        }
        addOracleLookup("MERCHD_TYPE", "MERCHD_TYPE");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
