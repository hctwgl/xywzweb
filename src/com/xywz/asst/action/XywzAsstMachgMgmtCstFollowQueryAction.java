package com.xywz.asst.action;

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
@Action(value="/XywzAsstMachgMgmtCstFollowQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzAsstMachgMgmtCstFollowQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from xywz_asst_machg_mgmt_cst_follow t  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("asstMachgId")){
                    sb.append(" and t.ASST_MACHG_ID like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("asstMachgContcr")){
                	sb.append(" and t.ASST_MACHG_CONTCR like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("followDtFrom")){
                	sb.append(" and t.FOLLOW_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("followDtTo")){
                	sb.append(" and t.FOLLOW_DT <= '"+this.getJson().get(key)+"'");
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
