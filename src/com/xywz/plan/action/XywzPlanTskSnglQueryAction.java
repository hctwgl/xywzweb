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
 * 生产排产管理
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanTskSnglQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanTskSnglQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL t  where t.CHANNAL_TYPE='1' ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and t.SPC_MODEL LIKE '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("CONTR_NUM")){
                	sb.append(" and t.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("SCHEDU_NUM")){
                	sb.append(" and t.SCHEDU_NUM = '"+this.getJson().get(key)+"'");
                }else if(key.equals("SCHEDU_STATUS")){
                	sb.append(" and t.SCHEDU_STATUS = '"+this.getJson().get(key)+"'");
                }   
            }
        }
        addOracleLookup("MERCHD_TYPE", "XYWZ_MERCHD_TYPE");
        addOracleLookup("WORKSHOP", "XYWZ_WORKSHOP");
    	setPrimaryKey("t.SPC_MODEL,t.WEIGHT desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
