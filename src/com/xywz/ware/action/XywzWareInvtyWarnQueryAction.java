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
 * 仓库汇总
 */

@ParentPackage("json-default")
@Action(value="/XywzWareInvtyWarnQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzWareInvtyWarnQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("SELECT a.*,p.WARN_HI_CNT,p.WARN_LO_CNT,CASE WHEN a.WEIGHT>p.WARN_HI_CNT THEN 1  WHEN a.WEIGHT<p.WARN_LO_CNT THEN -1 ELSE 0 END AS TYPE FROM(select t.SPC_MODEL,t.PRD_NAME,SUM(t.WEIGHT) as WEIGHT from XYWZ_WARE_INVTY_INFO t  GROUP BY t.SPC_MODEL) a ");
    	sb.append(" JOIN XYWZ_WARE_PROD_PKG_STD p ON a.SPC_MODEL =p.SPC AND a.PRD_NAME = p.PRD_NAME");
    	sb.append(" where 1=1");
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("spc")){
                    sb.append(" and a.SPC_MODEL = '"+this.getJson().get(key)+"'");
                }else if(key.equals("weightBegin")){
                	sb.append(" and a.WEIGHT> "+this.getJson().get(key));
                }else if(key.equals("weightEnd")){
                    	sb.append(" and a.WEIGHT < "+this.getJson().get(key));
                } 
            }
        }
    	SQL=sb.toString();
    	datasource = ds;
    }
}
