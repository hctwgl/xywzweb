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
@Action(value="/XywzPurcProvrMgmtCustQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPurcProvrMgmtCustQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from xywz_purc_provr_mgmt_cust t where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("provrTyp")){
                    sb.append(" and t.PROVR_TYP like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("provrStat")){
                	sb.append(" and t.PROVR_STAT like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("provrNum")){
                	sb.append(" and t.PROVR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("provrFullNm")){
                	sb.append(" and t.PROVR_FULL_NM like '%"+this.getJson().get(key)+"%'");
                }else if (key.equals("provrSrc")){
                	sb.append(" and t.PROVR_SRC like '%"+this.getJson().get(key)+"%'");
                }     
            }
        }

    	setPrimaryKey(" PROVR_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("PROVR_TYP", "XYWZ_PROVR_TYP");
    	addOracleLookup("PROVR_SRC", "XYWZ_PROVR_SRC");
    	addOracleLookup("PROVR_STAT", "XYWZ_PROVR_STAT");
    	addOracleLookup("CURR_STP", "XYWZ_CURR_STP");
    	datasource = ds;
    }
}
