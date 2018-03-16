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
 * 仓库出货查询
 */

@ParentPackage("json-default")
@Action(value="/XywzWareInvtyOutQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzWareInvtyOutQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.*,t1.CONTR_NUM CONTR_NUM1,t1.OUT_CUST_NAME OUT_CUST_NAME1 from XYWZ_WARE_INVTY_OUT t " +
    			"LEFT JOIN XYWZ_WARE_INVTY_OUT t1 ON t.AGAIN_OUT_ID = t1.OUT_ID where 1 = 1  ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("contrNum")){
                    sb.append(" and t.CONTR_NUM = '"+this.getJson().get(key)+"'");
                }else if(key.equals("merchdId")){
                	sb.append(" and t.MERCHD_ID = '"+this.getJson().get(key)+"'");
                }else if(key.equals("outWhsDt")){
                	sb.append(" and t.OUT_WHS_DT = '"+this.getJson().get(key)+"'");
                }  
            }
        }

    	setPrimaryKey("t.OUT_ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
