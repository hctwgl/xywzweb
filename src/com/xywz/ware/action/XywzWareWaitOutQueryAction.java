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
 * 待出库商品查询
 */

@ParentPackage("json-default")
@Action(value="/XywzWareWaitOutQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzWareWaitOutQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	String idStr= request.getParameter("idStr");   	
    	
    	StringBuilder sb=new StringBuilder("select t.* from XYWZ_WARE_INVTY_INFO t  where 1=1 ");    	
    	sb.append(" and t.INVTY_ID in ("+idStr+")");   	
    	
    	setPrimaryKey("t.INVTY_ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
