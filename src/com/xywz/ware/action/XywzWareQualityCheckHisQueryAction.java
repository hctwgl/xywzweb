package com.xywz.ware.action;

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
 * 质量检核历史查询
 */

@ParentPackage("json-default")
@Action(value="/XywzWareQualityCheckHisQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzWareQualityCheckHisQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from XYWZ_WARE_QUALITY_CHECK t  where  1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and t.SPC_MODEL = '"+this.getJson().get(key)+"'");
                }else if(key.equals("CONTR_NUM")){
                	sb.append(" and t.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("WORKSHOP")){
                	sb.append(" and t.WORKSHOP = '"+this.getJson().get(key)+"'");
                }  
            }
        }
        addOracleLookup("MERCHD_TYPE", "XYWZ_MERCHD_TYPE");
        addOracleLookup("CHECK_STATUS", "XYWZ_CHECK_STATUS");
        addOracleLookup("CHANNAL_TYPE", "XYWZ_CHANNAL_TYPE");
        addOracleLookup("WORKSHOP", "XYWZ_WORKSHOP");
    	setPrimaryKey("t.CHECK_ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
