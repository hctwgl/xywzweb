package com.xywz.acct.action;

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


@ParentPackage("json-default")
@Action(value="/XywzAcctStmtMgmtQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzAcctStmtMgmtQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from xywz_acct_stmt_mgmt t  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("contrNum")){
                    sb.append(" and t.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("invNum")){
                	sb.append(" and t.INV_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("invDtFrom")){
                	sb.append(" and t.INV_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("invDtTo")){
                	sb.append(" and t.INV_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }

    	setPrimaryKey(" t.ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("RECV_LOAD_BILL", "XYWZ_IF_FLAG");
    	addOracleLookup("LOAN", "XYWZ_IF_FLAG");
    	addOracleLookup("REFUND", "XYWZ_IF_FLAG");
    	addOracleLookup("TX_TYP", "XYWZ_TX_TYP");
    	datasource = ds;
    }
}
