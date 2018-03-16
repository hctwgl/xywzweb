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
@Action(value="/XywzReptMonthAreaQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzReptMonthAreaQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder(" select e.F_VALUE A_BELG_CORP,d.F_VALUE B_AREA,count(d.F_VALUE) C_CONTRS,round(sum(b.qty),3) D_QTYS,round(sum(b.amt),2) E_AMTS,round(sum(b.amt)/sum(b.qty),3) F_PER_AMT " +
    			"from xywz_sale_frgn_ordr_contr a left join (select contr_num,round(sum(usd_amt),2) amt,round(sum(qty),3) qty from xywz_sale_inv_merchd_dtl group by contr_num) b on a.contr_num=b.contr_num left join XYWZ_CUST_CUSTINFO c " +
    			"on a.cust_id=c.cust_id LEFT JOIN ocrm_sys_lookup_item d ON c.CNTRY_URBN=d.F_CODE AND d.F_LOOKUP_ID='XYWZ_COUNTRY' " +
    			"LEFT JOIN ocrm_sys_lookup_item e ON a.BELG_CORP=e.F_CODE AND e.F_LOOKUP_ID='XYWZ_SALE_BELG_CORP' where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("belgCorp")){
                	sb.append(" and a.BELG_CORP = '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtFrom")){
                	sb.append(" and a.SIGN_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtTo")){
                	sb.append(" and a.SIGN_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }

        sb.append(" group by a.BELG_CORP,c.CNTRY_URBN ");
        
        sb.append(" union select '-' A_BELG_CORP,'总计' B_AREA,count(d.F_VALUE) C_CONTRS,round(sum(b.qty),3) D_QTYS,round(sum(b.amt),2) E_AMTS,round(sum(b.amt)/sum(b.qty),3) F_PER_AMT " +
    			"from xywz_sale_frgn_ordr_contr a left join (select contr_num,round(sum(usd_amt),2) amt,round(sum(qty),3) qty from xywz_sale_inv_merchd_dtl group by contr_num) b on a.contr_num=b.contr_num left join XYWZ_CUST_CUSTINFO c " +
    			"on a.cust_id=c.cust_id LEFT JOIN ocrm_sys_lookup_item d ON c.CNTRY_URBN=d.F_CODE AND d.F_LOOKUP_ID='XYWZ_COUNTRY' " +
    			"LEFT JOIN ocrm_sys_lookup_item e ON a.BELG_CORP=e.F_CODE AND e.F_LOOKUP_ID='XYWZ_SALE_BELG_CORP' where 1=1 ");
        
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("belgCorp")){
                	sb.append(" and a.BELG_CORP = '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtFrom")){
                	sb.append(" and a.SIGN_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtTo")){
                	sb.append(" and a.SIGN_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }
        
    	SQL=sb.toString();
    	datasource = ds;
    }
}
