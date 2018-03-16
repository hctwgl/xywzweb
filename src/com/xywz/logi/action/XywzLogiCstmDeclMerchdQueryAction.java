package com.xywz.logi.action;

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
@Action(value="/XywzLogiCstmDeclMerchdQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzLogiCstmDeclMerchdQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from XYWZ_LOGI_CSTM_DECL_MERCHD t " +
    			"  where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("cstmDeclCnHsCode")){
                    sb.append(" and CSTM_DECL_CN_HS_CODE like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("cstmDeclRltvCd")){
                	sb.append(" and CSTM_DECL_RLTV_CD like '%"+this.getJson().get(key)+"%'");
                }
            }
        }

    	setPrimaryKey("CSTM_DECL_MERCHD_ID desc ");
    	SQL=sb.toString();
    	datasource = ds;
    }
}
