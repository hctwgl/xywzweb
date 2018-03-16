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
 * 内贸订单管理
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanInlandOderContrQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanInlandOderContrQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t1.* from XYWZ_SALE_INLAND_ORDR_CONTR t1  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("ordrStat")){
                    sb.append(" and t1.ORDR_STAT = '"+this.getJson().get(key)+"'");
                }else if(key.equals("contrNum")){
                	sb.append(" and t1.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("t1.ORDR_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("ORDR_STAT", "XYWZ_ORDR_STAT");
    	datasource = ds;
    }
}
