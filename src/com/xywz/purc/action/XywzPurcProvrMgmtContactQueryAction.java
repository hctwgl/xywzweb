package com.xywz.purc.action;

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
@Action(value="/XywzPurcProvrMgmtContactQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPurcProvrMgmtContactQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from xywz_purc_provr_mgmt_contact t where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("provrNum")){
                    sb.append(" and t.PROVR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("name")){
                	sb.append(" and t.NAME like '%"+this.getJson().get(key)+"%'");
                }     
            }
        }

    	setPrimaryKey(" ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("GENDER", "XYWZ_GENDER_FLAG");
    	addOracleLookup("IS_NT_PRI_CONT", "XYWZ_IF_FLAG");
    	datasource = ds;
    }
}
