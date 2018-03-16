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
@Action(value="/XywzPlanJobLogQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanJobLogQueryAction extends BaseQueryAction {
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
    			"where t.CHANNAL_TYPE='1' and t.SCHEDU_STATUS in ('2','3') ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and t.SPC_MODEL = '"+this.getJson().get(key)+"'");
                }else if(key.equals("CONTR_NUM")){
                	sb.append(" and t.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("WORKSHOP")){
                	sb.append(" and t.WORKSHOP = '"+this.getJson().get(key)+"'");
                }else if(key.equals("SCHEDU_DATE")){
                	sb.append(" and t.SCHEDU_DATE = '"+this.getJson().get(key)+"'");
                } else if(key.equals("PLAN_NUM")){
                	sb.append(" and t.PLAN_NUM LIKE '%"+this.getJson().get(key)+"%'");
                } else if(key.equals("ISSUES_DT")){
                	sb.append(" and t.ISSUES_DT = '"+this.getJson().get(key)+"'");
                }     
            }
        }
        addOracleLookup("MERCHD_TYPE", "XYWZ_MERCHD_TYPE");
        addOracleLookup("WORKSHOP", "XYWZ_WORKSHOP");
    	setPrimaryKey("t.PLAN_ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
