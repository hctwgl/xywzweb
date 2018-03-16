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
@Action(value="/XywzPurcProvrMgmtProductQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPurcProvrMgmtProductQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from xywz_purc_provr_mgmt_product t where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("puchSnglId")){
                    sb.append(" and t.PUCH_SNGL_ID like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("provrNum")){
                    sb.append(" and t.PROVR_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("merchdNum")){
                	sb.append(" and t.MERCHD_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("merchdCnFstNm")){
                	sb.append(" and t.MERCHD_CN_FST_NM like '%"+this.getJson().get(key)+"%'");
                }     
            }
        }

    	setPrimaryKey(" MERCHD_ID desc ");
    	addOracleLookup("PURC_STATUS", "XYWZ_WARE_STATUS");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
