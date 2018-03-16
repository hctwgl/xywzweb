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
@Action(value="/XywzPurcProvrMgmtCstFollowQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPurcProvrMgmtCstFollowQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from xywz_purc_provr_mgmt_cst_follow t  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("provrNum")){
                    sb.append(" and t.PROVR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("provrContcr")){
                	sb.append(" and t.PROVR_CONTCR like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("persDtFrom")){
                	sb.append(" and t.PERS_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("persDtTo")){
                	sb.append(" and t.PERS_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }

    	setPrimaryKey("t.ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("RSLT_CLS", "XYWZ_RSLT_CLS");
    	addOracleLookup("IS_NT_CUST_INITV_CONT", "XYWZ_IF_FLAG");
    	datasource = ds;
    }
}
