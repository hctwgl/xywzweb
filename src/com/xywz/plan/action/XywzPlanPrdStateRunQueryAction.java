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
@Action(value="/XywzPlanPrdStateRunQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanPrdStateRunQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from XYWZ_PLAN_PRD_STATE t where t.PROD_STATE='2'  " );
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and t.SPC_MODEL = '"+this.getJson().get(key)+"'");
                }    
            }
        }
        addOracleLookup("PROD_STATE", "XYWZ_PROD_STATE");
        addOracleLookup("WORK_SHOP", "XYWZ_WORKSHOP");
    	setPrimaryKey("t.PRODID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
