package com.xywz.plan.action;

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
/*
 * 外贸订单管理
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanFrgnOderContrQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanFrgnOderContrQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder("select t.* from (" +
    			"select t1.*" +
    			",T2.CUST_SHT_NM," +
    			"T3.USER_NAME  as SELL_PRINC, " +
    			"T4.USER_NAME as MAK_DOC_PERS, " +
    			"T5.PORT_NAME_CN as PORTOF_DISCHARGE_CN,T6.PORT_NAME_CN as LOAD_TRAFF_PORT_CN," +
    			"T7.REFUND_DT,T7.REFUND_AMT,case when T8.SCHEDU_STATUS is null then '0' else T8.SCHEDU_STATUS end as SCHEDU_STATUS  " +
    			"from  XYWZ_SALE_FRGN_ORDR_CONTR t1 " +
    			"left OUTER JOIN XYWZ_CUST_CUSTINFO T2 "+
    			"ON  T1.CUST_ID = T2.CUST_ID "+
    			"LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT T3 "+
    			"ON T1.SELL_PRINC_ID = T3.ACCOUNT_NAME "+
    			"LEFT OUTER JOIN ADMIN_AUTH_ACCOUNT T4 " +
    			"ON T1.MAK_DOC_PERS_ID = T4.ACCOUNT_NAME " +
    			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T5 "+
    			"ON t1.PORTOF_DISCHARGE = T5.PORT_ID " +
    			"LEFT OUTER JOIN XYWZ_LOGI_PORT_INFO_MGMT T6 "+
    			"ON t1.LOAD_TRAFF_PORT = T6.PORT_ID " +
    			"LEFT OUTER JOIN XYWZ_ACCT_STMT_MGMT T7 "+
    			"ON t1.Contr_Num = T7.Contr_Num " +
    			"LEFT JOIN (select distinct Contr_Num as Contr_Num,SCHEDU_STATUS from XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL where SCHEDU_STATUS='1') T8 " +
    			"ON t1.Contr_Num = T8.Contr_Num  "+
    			") t "+
    			" where 1=1 " );
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("ordrStat")){
                    sb.append(" and t.ORDR_STAT = '"+this.getJson().get(key)+"'");
                }else if(key.equals("contrNum")){
                	sb.append(" and t.CONTR_NUM like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("t.ORDR_ID desc ");
    	SQL=sb.toString();
    	addOracleLookup("ORDR_STAT", "XYWZ_ORDR_STAT");
    	addOracleLookup("IS_ALTER_CERT", "XYWZ_IF_FLAG");
    	addOracleLookup("IS_NT_RECV_LC", "XYWZ_IF_FLAG");
    	addOracleLookup("PAY_MD", "XYWZ_PAY_MD");
    	addOracleLookup("BRGN_MODE","XYWZ_BRGN_MODE");
    	addOracleLookup("CUR","XYWZ_CUR"); 
    	addOracleLookup("BELG_CORP","XYWZ_SALE_BELG_CORP"); 
    	addOracleLookup("CHK_STAT", "XYWZ_IF_FLAG");
    	addOracleLookup("PAY_CODE", "XYWZ_TX_TYP");
    	datasource = ds;
    }
}
