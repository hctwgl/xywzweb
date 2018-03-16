package com.xywz.sale.action;

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
@Action(value="/XywzInvMerchdDtlQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzInvMerchdDtlQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	
    	StringBuilder sb=new StringBuilder("select t1.* from XYWZ_SALE_INV_MERCHD_DTL t1  " +
				"where 1=1 AND t1.INV_NUM<>'' "+
				"AND NOT EXISTS ( "+
					"SELECT 1 "+ 
					"FROM XYWZ_SALE_CSTM_DECL_PACKLIST T2 "+
					"WHERE T1.INV_NUM = T2.INV_NUM AND T1.MODEL = T2.SIZE) ");	
		for(String key:this.getJson().keySet()){
		if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
			System.out.print(key);
			if(key.equals("invNum")){
				sb.append(" and t1.INV_NUM like '%"+this.getJson().get(key)+"%'");
			}   
		}
	}

    	setPrimaryKey("t1.Merchd_ID desc ");
    	SQL=sb.toString();
//    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	datasource = ds;
    }
}
