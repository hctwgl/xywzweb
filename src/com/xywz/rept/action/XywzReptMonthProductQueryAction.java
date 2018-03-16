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
@Action(value="/XywzReptMonthProductQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzReptMonthProductQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select a.HS_CODE A_HS_CODE,round(sum(a.qty),3) as B_QTYS,round(sum(a.usd_amt),2) as C_AMTS,round(sum(a.usd_amt)/sum(a.qty),2) as D_PER_AMT " +
    			"from xywz_sale_inv_merchd_dtl a " +
    			"inner join XYWZ_SALE_FRGN_ORDR_CONTR b on a.Contr_Num=b.Contr_Num "+
    			"where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("rptDtFrom")){
                	sb.append(" and b.Sign_Dt >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtTo")){
                	sb.append(" and b.Sign_Dt <= '"+this.getJson().get(key)+"'");
                }   
            }
        }
        
    	sb.append("group by a.hs_code ");
    	sb.append(" union select '总计' A_HS_CODE,round(sum(a.qty),3) as B_QTYS,round(sum(a.usd_amt),2) as C_AMTS,round(sum(a.usd_amt)/sum(a.qty),2) as D_PER_AMT " +
    			"from xywz_sale_inv_merchd_dtl a " +
    			"inner join XYWZ_SALE_FRGN_ORDR_CONTR b on a.Contr_Num=b.Contr_Num "+
    			"where 1=1 ");
    	
    	 for(String key:this.getJson().keySet()){
             if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                 if(key.equals("rptDtFrom")){
                 	sb.append(" and b.Sign_Dt >= '"+this.getJson().get(key)+"'");
                 }else if(key.equals("rptDtTo")){
                 	sb.append(" and b.Sign_Dt <= '"+this.getJson().get(key)+"'");
                 }   
             }
         }
    	SQL=sb.toString();
//    	addOracleLookup("STATS_TYP", "XYWZ_STATS_TYP");
//    	addOracleLookup("TX_TYP", "XYWZ_TX_TYP");
    	datasource = ds;
    }
}
