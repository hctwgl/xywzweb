package com.xywz.rept.action;

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
@Action(value="/XywzReptExptMakeDocQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzReptExptMakeDocQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select e.USER_NAME A_USER_NAME,count(Inv_Num) B_EXP_CNT from XYWZ_SALE_INV_INFO a  " +
    			"left join xywz_sale_frgn_ordr_contr b on a.Contr_Num=b.Contr_Num " +
    			" left join   admin_auth_account e on b.Mak_Doc_Pers_Id=e.ACCOUNT_NAME where 1=1");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("rptDtFrom")){
                	sb.append(" and a.INV_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtTo")){
                	sb.append(" and a.INV_DT <= '"+this.getJson().get(key)+"'");
                } 
            }
        }
        sb.append(" group by  e.USER_NAME  ");
//    	setPrimaryKey(" t.ID desc ");
    	SQL=sb.toString();
//    	addOracleLookup("EXP_COP","XYWZ_SALE_BELG_CORP"); 
    	datasource = ds;
    }
}
