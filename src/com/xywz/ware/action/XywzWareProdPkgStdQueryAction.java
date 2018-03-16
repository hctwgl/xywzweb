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
 * 产品包装标准管理
 */

@ParentPackage("json-default")
@Action(value="/XywzWareProdPkgStdQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzWareProdPkgStdQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from XYWZ_WARE_PROD_PKG_STD t  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("prdName")){
                    sb.append(" and t.PRD_NAME = '"+this.getJson().get(key)+"'");
                }else if(key.equals("spc")){
                	sb.append(" and t.SPC = '"+this.getJson().get(key)+"'");
                } 
            }
        }

    	setPrimaryKey("t.PKG_STD_ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
