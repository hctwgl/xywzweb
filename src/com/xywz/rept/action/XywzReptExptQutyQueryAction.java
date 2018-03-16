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
@Action(value="/XywzReptExptQutyQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzReptExptQutyQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select belg_corp A_EXP_COP,count(Inv_Num) B_EXP_CNT,round(sum(QTY),3) C_EXP_QTY,round(sum(USD_AMT),2) D_EXP_AMT,round(sum(QTY)/C.QTYS*100,3) E_EXP_PCT " +
    			"from XYWZ_SALE_INV_INFO a left join (select sum(m.QTY) as QTYS from XYWZ_SALE_INV_INFO m where 1=1 ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("rptDtFrom")){
                	sb.append(" and m.INV_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtTo")){
                	sb.append(" and m.INV_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }
        
        sb.append(" ) c on 1=1 left join xywz_sale_frgn_ordr_contr b on a.Contr_Num=b.Contr_Num where 1=1 ");
        
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("rptDtFrom")){
                	sb.append(" and a.INV_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtTo")){
                	sb.append(" and a.INV_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }
        
        sb.append(" group by belg_corp ");
        sb.append(" union select '总计' A_EXP_COP,count(Inv_Num) B_EXP_CNT,round(sum(QTY),3) C_EXP_QTY,round(sum(USD_AMT),2) D_EXP_AMT,100.000 E_EXP_PCT " +
    			"from XYWZ_SALE_INV_INFO a where 1=1 ");
        
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("rptDtFrom")){
                	sb.append(" and a.INV_DT >= '"+this.getJson().get(key)+"'");
                }else if(key.equals("rptDtTo")){
                	sb.append(" and a.INV_DT <= '"+this.getJson().get(key)+"'");
                }   
            }
        }
        
//    	setPrimaryKey(" t.ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("A_EXP_COP","XYWZ_SALE_BELG_CORP"); 
    	datasource = ds;
    }
}
